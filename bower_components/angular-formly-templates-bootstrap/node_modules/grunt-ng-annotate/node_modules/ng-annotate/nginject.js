// nginject-comments.js
// MIT licensed, see LICENSE file
// Copyright (c) 2013-2014 Olov Lassus <olov.lassus@gmail.com>

"use strict";

const is = require("simple-is");
const fmt = require("simple-fmt");

module.exports = {
    inspectComments: inspectComments,
    inspectCallExpression: inspectCallExpression,
};

function inspectCallExpression(node, ctx) {
    if (node.type === "CallExpression" && node.callee.type === "Identifier" && node.callee.name === "ngInject" && node.arguments.length === 1) {
        addSuspect(node.arguments[0], ctx);
    }
}

function inspectComments(ctx) {
    const comments = ctx.comments;
    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        const pos = comment.value.indexOf("@ngInject");
        if (pos === -1) {
            continue;
        }

        const target = ctx.lut.findNodeFromPos(comment.range[1]);
        if (!target) {
            continue;
        }

        addSuspect(target, ctx);
    }
}

function addSuspect(target, ctx) {
    if (target.type === "ObjectExpression") {
        // /*@ngInject*/ {f1: function(a), .., {f2: function(b)}}
        addObjectExpression(target, ctx);
    } else if (target.type === "AssignmentExpression" && target.right.type === "ObjectExpression") {
        // /*@ngInject*/ f(x.y = {f1: function(a), .., {f2: function(b)}})
        addObjectExpression(target.right, ctx);
    } else if (target.type === "ExpressionStatement" && target.expression.type === "AssignmentExpression" && target.expression.right.type === "ObjectExpression") {
        // /*@ngInject*/ x.y = {f1: function(a), .., {f2: function(b)}}
        addObjectExpression(target.expression.right, ctx);
    } else if (target.type === "VariableDeclaration" && target.declarations.length === 1 && target.declarations[0].init && target.declarations[0].init.type === "ObjectExpression") {
        // /*@ngInject*/ var x = {f1: function(a), .., {f2: function(b)}}
        addObjectExpression(target.declarations[0].init, ctx);
    } else if (target.type === "Property") {
        // {/*@ngInject*/ justthisone: function(a), ..}
        ctx.addModuleContextIndependentSuspect(target.value, ctx);
    } else {
        // /*@ngInject*/ function(a) {}
        ctx.addModuleContextIndependentSuspect(target, ctx);
    }
}

function addObjectExpression(node, ctx) {
    nestedObjectValues(node).forEach(function(n) {
        ctx.addModuleContextIndependentSuspect(n, ctx);
    });
}

function nestedObjectValues(node, res) {
    res = res || [];

    node.properties.forEach(function(prop) {
        const v = prop.value;
        if (is.someof(v.type, ["FunctionExpression", "ArrayExpression"])) {
            res.push(v);
        } else if (v.type === "ObjectExpression") {
            nestedObjectValues(v, res);
        }
    });

    return res;
}
