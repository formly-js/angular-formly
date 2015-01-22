// ng-annotate-main.js
// MIT licensed, see LICENSE file
// Copyright (c) 2013-2014 Olov Lassus <olov.lassus@gmail.com>

"use strict";
var esprima_require_t0 = Date.now();
var esprima = require("esprima").parse;
var esprima_require_t1 = Date.now();
var fmt = require("simple-fmt");
var is = require("simple-is");
var alter = require("alter");
var traverse = require("ordered-ast-traverse");
var EOL = require("os").EOL;
var assert = require("assert");
var ngInject = require("./nginject");
var generateSourcemap = require("./generate-sourcemap");
var Lut = require("./lut");
var scopeTools = require("./scopetools");

var chainedRouteProvider = 1;
var chainedUrlRouterProvider = 2;
var chainedStateProvider = 3;
var chainedRegular = 4;

function match(node, ctx, matchPlugins) {
    var isMethodCall = (
        node.type === "CallExpression" &&
            node.callee.type === "MemberExpression" &&
            node.callee.computed === false
        );

    var matchMethodCalls = (isMethodCall &&
        (matchRegular(node, ctx) || matchNgRoute(node) || matchNgUi(node) || matchHttpProvider(node)));

    return matchMethodCalls ||
        (matchPlugins && matchPlugins(node)) ||
        matchDirectiveReturnObject(node) ||
        matchProviderGet(node);
}

function matchDirectiveReturnObject(node) {
    // return { .. controller: function($scope, $timeout), ...}

    return node.type === "ReturnStatement" &&
        node.argument && node.argument.type === "ObjectExpression" &&
        matchProp("controller", node.argument.properties);
}

function matchProviderGet(node) {
    // (this|self|that).$get = function($scope, $timeout)
    // { ... $get: function($scope, $timeout), ...}
    var memberExpr;
    var self;
    return (node.type === "AssignmentExpression" && (memberExpr = node.left).type === "MemberExpression" &&
        memberExpr.property.name === "$get" &&
        ((self = memberExpr.object).type === "ThisExpression" || (self.type === "Identifier" && is.someof(self.name, ["self", "that"]))) &&
        node.right) ||
        (node.type === "ObjectExpression" && matchProp("$get", node.properties));
}

function matchNgRoute(node) {
    // $routeProvider.when("path", {
    //   ...
    //   controller: function($scope) {},
    //   resolve: {f: function($scope) {}, ..}
    // })

    // we already know that node is a (non-computed) method call
    var callee = node.callee;
    var obj = callee.object; // identifier or expression
    if (!(obj.$chained === chainedRouteProvider || (obj.type === "Identifier" && obj.name === "$routeProvider"))) {
        return false;
    }
    node.$chained = chainedRouteProvider;

    var method = callee.property; // identifier
    if (method.name !== "when") {
        return false;
    }

    var args = node.arguments;
    if (args.length !== 2) {
        return false;
    }
    var configArg = last(args)
    if (configArg.type !== "ObjectExpression") {
        return false;
    }

    var props = configArg.properties;
    var res = [
        matchProp("controller", props)
    ];
    // {resolve: ..}
    res.push.apply(res, matchResolve(props));

    var filteredRes = res.filter(Boolean);
    return (filteredRes.length === 0 ? false : filteredRes);
}

function matchNgUi(node) {
    // $stateProvider.state("myState", {
    //     ...
    //     controller: function($scope)
    //     controllerProvider: function($scope)
    //     templateProvider: function($scope)
    //     onEnter: function($scope)
    //     onExit: function($scope)
    // });
    // $stateProvider.state("myState", {... resolve: {f: function($scope) {}, ..} ..})
    // $stateProvider.state("myState", {... views: {... somename: {... controller: fn, controllerProvider: fn, templateProvider: fn, resolve: {f: fn}}}})
    //
    // $urlRouterProvider.when(.., function($scope) {})
    //
    // $modal.open({.. controller: fn, resolve: {f: function($scope) {}, ..}});

    // we already know that node is a (non-computed) method call
    var callee = node.callee;
    var obj = callee.object; // identifier or expression
    var method = callee.property; // identifier
    var args = node.arguments;

    // shortcut for $modal.open({.. controller: fn, resolve: {f: function($scope) {}, ..}});
    if (obj.type === "Identifier" && obj.name === "$modal" && method.name === "open" &&
        args.length === 1 && args[0].type === "ObjectExpression") {
        var props$0 = args[0].properties;
        var res$0 = [matchProp("controller", props$0)];
        res$0.push.apply(res$0, matchResolve(props$0));
        return res$0.filter(Boolean);
    }

    // shortcut for $urlRouterProvider.when(.., function($scope) {})
    if (obj.$chained === chainedUrlRouterProvider || (obj.type === "Identifier" && obj.name === "$urlRouterProvider")) {
        node.$chained = chainedUrlRouterProvider;

        if (method.name === "when" && args.length >= 1) {
            return last(args);
        }
        return false;
    }

    // everything below is for $stateProvider alone
    if (!(obj.$chained === chainedStateProvider || (obj.type === "Identifier" && obj.name === "$stateProvider"))) {
        return false;
    }
    node.$chained = chainedStateProvider;

    if (method.name !== "state") {
        return false;
    }

    // $stateProvider.state({ ... }) and $stateProvider.state("name", { ... })
    if (!(args.length >= 1 && args.length <= 2)) {
        return false;
    }

    var configArg = last(args);
    if (configArg.type !== "ObjectExpression") {
        return false;
    }

    var props = configArg.properties;
    var res = [
        matchProp("controller", props),
        matchProp("controllerProvider", props),
        matchProp("templateProvider", props),
        matchProp("onEnter", props),
        matchProp("onExit", props),
    ];

    // {resolve: ..}
    res.push.apply(res, matchResolve(props));

    // {view: ...}
    var viewObject = matchProp("views", props);
    if (viewObject && viewObject.type === "ObjectExpression") {
        viewObject.properties.forEach(function(prop) {
            if (prop.value.type === "ObjectExpression") {
                res.push(matchProp("controller", prop.value.properties));
                res.push(matchProp("controllerProvider", prop.value.properties));
                res.push(matchProp("templateProvider", prop.value.properties));
                res.push.apply(res, matchResolve(prop.value.properties));
            }
        });
    }

    var filteredRes = res.filter(Boolean);
    return (filteredRes.length === 0 ? false : filteredRes);
}

function matchHttpProvider(node) {
    // $httpProvider.interceptors.push(function($scope) {});
    // $httpProvider.responseInterceptors.push(function($scope) {});

    // we already know that node is a (non-computed) method call
    var callee = node.callee;
    var obj = callee.object; // identifier or expression
    var method = callee.property; // identifier

    return (method.name === "push" &&
        obj.type === "MemberExpression" && !obj.computed &&
        obj.object.name === "$httpProvider" && is.someof(obj.property.name,  ["interceptors", "responseInterceptors"]) &&
        node.arguments.length >= 1 && node.arguments);
}

function matchRegular(node, ctx) {
    // we already know that node is a (non-computed) method call
    var callee = node.callee;
    var obj = callee.object; // identifier or expression
    var method = callee.property; // identifier

    // short-cut implicit config special case:
    // angular.module("MyMod", function(a) {})
    if (obj.name === "angular" && method.name === "module") {
        var args$0 = node.arguments;
        if (args$0.length >= 2) {
            last(args$0).$always = true;
            return last(args$0);
        }
    }

    var matchAngularModule = (obj.$chained === chainedRegular || isReDef(obj, ctx) || isLongDef(obj)) &&
        is.someof(method.name, ["provider", "value", "constant", "bootstrap", "config", "factory", "directive", "filter", "run", "controller", "service", "decorator", "animation", "invoke"]);
    if (!matchAngularModule) {
        return false;
    }
    node.$chained = chainedRegular;

    if (is.someof(method.name, ["value", "constant", "bootstrap"])) {
        return false; // affects matchAngularModule because of chaining
    }

    var args = node.arguments;
    var target = (is.someof(method.name, ["config", "run"]) ?
        args.length === 1 && args[0] :
        args.length === 2 && args[0].type === "Literal" && is.string(args[0].value) && args[1]);

    if (target) {
        target.$always = true;
    }
    return target;
}

// matches with default regexp
//   *.controller("MyCtrl", function($scope, $timeout) {});
//   *.*.controller("MyCtrl", function($scope, $timeout) {});
// matches with --regexp "^require(.*)$"
//   require("app-module").controller("MyCtrl", function($scope) {});
function isReDef(node, ctx) {
    return ctx.re.test(ctx.srcForRange(node.range));
}

// Long form: angular.module(*).controller("MyCtrl", function($scope, $timeout) {});
function isLongDef(node) {
    return node.callee &&
        node.callee.object && node.callee.object.name === "angular" &&
        node.callee.property && node.callee.property.name === "module";
}

function last(arr) {
    return arr[arr.length - 1];
}

function matchProp(name, props) {
    for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (prop.key.type === "Identifier" && prop.key.name === name) {
            return prop.value; // FunctionExpression or ArrayExpression
        }
    }
    return null;
}

function matchResolve(props) {
    var resolveObject = matchProp("resolve", props);
    if (resolveObject && resolveObject.type === "ObjectExpression") {
        return resolveObject.properties.map(function(prop) {
            return prop.value;
        });
    }
    return [];
};

function stringify(arr, quot) {
    return "[" + arr.map(function(arg) {
        return quot + arg.name + quot;
    }).join(", ") + "]";
}

function insertArray(functionExpression, fragments, quot) {
    var range = functionExpression.range;

    var args = stringify(functionExpression.params, quot);
    fragments.push({
        start: range[0],
        end: range[0],
        str: args.slice(0, -1) + ", ",
    });
    fragments.push({
        start: range[1],
        end: range[1],
        str: "]",
    });
}

function replaceArray(array, fragments, quot) {
    var functionExpression = last(array.elements);

    if (functionExpression.params.length === 0) {
        return removeArray(array, fragments);
    }
    var args = stringify(functionExpression.params, quot);
    fragments.push({
        start: array.range[0],
        end: functionExpression.range[0],
        str: args.slice(0, -1) + ", ",
    });
}

function removeArray(array, fragments) {
    var functionExpression = last(array.elements);

    fragments.push({
        start: array.range[0],
        end: functionExpression.range[0],
        str: "",
    });
    fragments.push({
        start: functionExpression.range[1],
        end: array.range[1],
        str: "",
    });
}

function judgeSuspects(ctx) {
    var suspects = ctx.suspects;
    var mode = ctx.mode;
    var fragments = ctx.fragments;
    var quot = ctx.quot;

    for (var i = 0; i < suspects.length; i++) {
        var target = suspects[i];

        if (target.$once) {
            continue;
        }
        target.$once = true;

        if (!target.$always) {
            var $caller = target.$caller;
            for (; $caller && $caller.$chained !== chainedRegular; $caller = $caller.$caller) {
            }
            if (!$caller) {
                continue;
            }
        }

        target = jumpOverIife(target);
        var followedTarget = followReference(target);
        if (followedTarget) {
            if (followedTarget.$once) {
                continue;
            }
            followedTarget.$once = true;
            target = followedTarget;
        }

        if (mode === "rebuild" && isAnnotatedArray(target)) {
            replaceArray(target, fragments, quot);
        } else if (mode === "remove" && isAnnotatedArray(target)) {
            removeArray(target, fragments);
        } else if (is.someof(mode, ["add", "rebuild"]) && isFunctionExpressionWithArgs(target)) {
            insertArray(target, fragments, quot);
        } else {
            // if it's not array or function-expression, then it's a candidate for foo.$inject = [..]
            judgeInjectArraySuspect(target, ctx);
        }
    }
}

function followReference(node) {
    if (!scopeTools.isReference(node)) {
        return null;
    }

    var scope = node.$scope.lookup(node.name);
    if (!scope) {
        return null;
    }

    var parent = scope.getNode(node.name).$parent;
    var kind = scope.getKind(node.name);
    var ptype = parent.type;

    if (is.someof(kind, ["const", "let", "var"])) {
        assert(ptype === "VariableDeclarator");
        return parent.init;
    } else if (kind === "fun") {
        assert(ptype === "FunctionDeclaration" || ptype === "FunctionExpression")
        return parent;
    }

    // other kinds should not be handled ("param", "caught")

    return null;
}

function judgeInjectArraySuspect(node, ctx) {
    // /*@ngInject*/ var foo = function($scope) {} and
    // /*@ngInject*/ function foo($scope) {} and
    // /*@ngInject*/ foo.bar[0] = function($scope) {}
    var d0 = null;
    var nr0 = node.range[0];
    var nr1 = node.range[1];
    if (node.type === "VariableDeclaration" && node.declarations.length === 1 &&
        (d0 = node.declarations[0]).init && ctx.isFunctionExpressionWithArgs(d0.init)) {
        var isSemicolonTerminated = (ctx.src[nr1 - 1] === ";");
        addRemoveInjectArray(d0.init.params, nr0, isSemicolonTerminated ? nr1 : d0.init.range[1], d0.id.name);
    } else if (ctx.isFunctionDeclarationWithArgs(node)) {
        addRemoveInjectArray(node.params, nr0, nr1, node.id.name);
    } else if (node.type === "ExpressionStatement" && node.expression.type === "AssignmentExpression" &&
        ctx.isFunctionExpressionWithArgs(node.expression.right)) {
        var isSemicolonTerminated$0 = (ctx.src[nr1 - 1] === ";");
        var name = ctx.srcForRange(node.expression.left.range);
        addRemoveInjectArray(node.expression.right.params, nr0, isSemicolonTerminated$0 ? nr1 : node.expression.right.range[1], name);
    }

    function getIndent(pos) {
        var src = ctx.src;
        var lineStart = src.lastIndexOf("\n", pos - 1) + 1;
        var i = lineStart;
        for (; src[i] === " " || src[i] === "\t"; i++) {
        }
        return src.slice(lineStart, i);
    }

    function addRemoveInjectArray(params, posBeforeFunctionDeclaration, posAfterFunctionDeclaration, name) {
        var indent = getIndent(posAfterFunctionDeclaration);

        var nextNode = ctx.lut.findNodeFromPos(posAfterFunctionDeclaration);
        var prevNode = ctx.lut.findNodeBeforePos(posBeforeFunctionDeclaration);

        function hasInjectArray(node) {
            var lvalue;
            var assignment;
            return (node && node.type === "ExpressionStatement" && (assignment = node.expression).type === "AssignmentExpression" &&
                assignment.operator === "=" &&
                (lvalue = assignment.left).type === "MemberExpression" &&
                ((lvalue.computed === false && ctx.srcForRange(lvalue.object.range) === name && lvalue.property.name === "$inject") ||
                    (lvalue.computed === true && ctx.srcForRange(lvalue.object.range) === name && lvalue.property.type === "Literal" && lvalue.property.value === "$inject")));
        }

        function skipNewline(pos) {
            if (ctx.src[pos] === "\n") {
                return pos + 1;
            } else if (ctx.src.slice(pos, pos + 2) === "\r\n") {
                return pos + 2;
            }
            return pos;
        }

        var hasArrayBefore = hasInjectArray(prevNode);
        var hasArrayAfter = hasInjectArray(nextNode);

        var hasArray = hasArrayBefore || hasArrayAfter;
        var start = hasArrayBefore ? prevNode.range[0]: posAfterFunctionDeclaration;
        var end = hasArrayBefore ? skipNewline(prevNode.range[1]) : nextNode.range[1];

        var str = fmt("{0}{1}{2}.$inject = {3};", EOL, indent, name, ctx.stringify(params, ctx.quot));

        if (ctx.mode === "rebuild" && hasArray) {
            ctx.fragments.push({
                start: start,
                end: end,
                str: str,
            });
        } else if (ctx.mode === "remove" && hasArray) {
            ctx.fragments.push({
                start: start,
                end: end,
                str: "",
            });
        } else if (is.someof(ctx.mode, ["add", "rebuild"]) && !hasArray) {
            ctx.fragments.push({
                start: posAfterFunctionDeclaration,
                end: posAfterFunctionDeclaration,
                str: str,
            });
        }
    }
}

function jumpOverIife(node) {
    var outerfn;
    var outerbody;
    if (node.type === "CallExpression" &&
        (outerfn = node.callee).type === "FunctionExpression" &&
        (outerbody = outerfn.body.body).length === 1 &&
        outerbody[0].type === "ReturnStatement" && outerbody[0].argument) {
        return outerbody[0].argument;
    }
    return node;
}

function addModuleContextDependentSuspect(target, ctx) {
    ctx.suspects.push(target);
}

function addModuleContextIndependentSuspect(target, ctx) {
    target.$always = true;
    ctx.suspects.push(target);
}

function isAnnotatedArray(node) {
    return node.type === "ArrayExpression" && node.elements.length >= 1 && last(node.elements).type === "FunctionExpression";
}
function isFunctionExpressionWithArgs(node) {
    return node.type === "FunctionExpression" && node.params.length >= 1;
}
function isFunctionDeclarationWithArgs(node) {
    return node.type === "FunctionDeclaration" && node.params.length >= 1;
}

module.exports = function ngAnnotate(src, options) {
    var mode = (options.add && options.remove ? "rebuild" :
        options.remove ? "remove" :
            options.add ? "add" : null);

    if (!mode) {
        return {src: src};
    }

    var quot = options.single_quotes ? "'" : '"';
    var re = (options.regexp ? new RegExp(options.regexp) : /^[a-zA-Z0-9_\$\.\s]+$/);
    var ast;
    var stats = {};
    try {
        stats.esprima_require_t0 = esprima_require_t0;
        stats.esprima_require_t1 = esprima_require_t1;
        stats.esprima_parse_t0 = Date.now();

        ast = esprima(src, {
            range: true,
            comment: true,
        });

        stats.esprima_parse_t1 = Date.now();
    } catch(e) {
        return {
            errors: ["error: couldn't process source due to parse error", e.message],
        };
    }

    // Fix Program node range (https://code.google.com/p/esprima/issues/detail?id=541)
    ast.range[0] = 0;

    // append a dummy-node to ast so that lut.findNodeFromPos(lastPos) returns something
    ast.body.push({
        type: "DebuggerStatement",
        range: [ast.range[1], ast.range[1]],
    });

    // detach comments from ast
    // [{type: "Block"|"Line", value: str, range: [from,to]}, ..]
    var comments = ast.comments;
    ast.comments = null;

    // all source modifications are built up as operations in the
    // fragments array, later sent to alter in one shot
    var fragments = [];

    // suspects is built up with suspect nodes by match.
    // A suspect node will get annotations added / removed if it
    // fulfills the arrayexpression or functionexpression look,
    // and if it is in the correct context (inside an angular
    // module definition) - alternatively is forced to ignore
    // context with node.$always = true
    var suspects = [];

    var lut = new Lut(ast, src);

    scopeTools.setupScopeAndReferences(ast);

    var ctx = {
        mode: mode,
        quot: quot,
        src: src,
        srcForRange: function(range) {
            return src.slice(range[0], range[1]);
        },
        re: re,
        comments: comments,
        fragments: fragments,
        suspects: suspects,
        lut: lut,
        isFunctionExpressionWithArgs: isFunctionExpressionWithArgs,
        isFunctionDeclarationWithArgs: isFunctionDeclarationWithArgs,
        isAnnotatedArray: isAnnotatedArray,
        addModuleContextDependentSuspect: addModuleContextDependentSuspect,
        addModuleContextIndependentSuspect: addModuleContextIndependentSuspect,
        stringify: stringify,
    };

    var plugins = options.plugin || [];
    function matchPlugins(node, isMethodCall) {
        for (var i = 0; i < plugins.length; i++) {
            var res = plugins[i].match(node, isMethodCall);
            if (res) {
                return res;
            }
        }
        return false;
    }
    var matchPluginsOrNull = (plugins.length === 0 ? null : matchPlugins);

    ngInject.inspectComments(ctx);
    plugins.forEach(function(plugin) {
        plugin.init(ctx);
    });

    var recentCaller = undefined; // micro-optimization
    var callerIds = [];
    traverse(ast, {pre: function(node) {
        node.$caller = recentCaller;
        if (node.type === "CallExpression") {
            callerIds.push(node);
            recentCaller = node;
            ngInject.inspectCallExpression(node, ctx);
        }

    }, post: function(node) {
        if (node === recentCaller) {
            callerIds.pop();
            recentCaller = last(callerIds);
        }

        var targets = match(node, ctx, matchPluginsOrNull);
        if (!targets) {
            return;
        }
        if (!is.array(targets)) {
            targets = [targets];
        }

        for (var i = 0; i < targets.length; i++) {
            addModuleContextDependentSuspect(targets[i], ctx);
        }
    }});

    judgeSuspects(ctx);

    var out = alter(src, fragments);
    var result = {
        src: out,
        _stats: stats,
    };

    if (options.sourcemap) {
        stats.sourcemap_t0 = Date.now();
        result.map = generateSourcemap(src, fragments, options.inFile, options.sourceroot);
        stats.sourcemap_t1 = Date.now();
    }

    return result;
}
