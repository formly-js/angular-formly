# ng-annotate
ng-annotate adds and removes AngularJS dependency injection annotations.
It is non-intrusive so your source code stays exactly the same otherwise.
No lost comments or moved lines.

Without annotations:

    angular.module("MyMod").controller("MyCtrl", function($scope, $timeout) {
    });

With annotations:

    angular.module("MyMod").controller("MyCtrl", ["$scope", "$timeout", function($scope, $timeout) {
    }]);

Annotations are useful because with them you're able to minify your source code using your
favorite JS minifier.


## How does ng-annotate compare to ngmin?
If you are currently using ngmin then this is probably your first question. In short:
ng-annotate is much faster, finds more declarations to annotate (including ui-router),
treats your source code better, is actively maintained and has a bunch of extra features
on top of that. A much more elaborated answer can be found in
["The future of ngmin and ng-annotate"](https://github.com/btford/ngmin/issues/93).

*Migrating from ngmin*:
`ng-annotate -a -` is similar to `ngmin` (use stdin and
stdout). `ng-annotate -a in.js -o out.js` is similar to `ngmin in.js out.js`. Grunt users
can migrate easily by installing
[grunt-ng-annotate](https://www.npmjs.org/package/grunt-ng-annotate) and replacing `ngmin`
with `ngAnnotate` in their Gruntfile. Scroll down for information about other tools.


## Installation and usage
    npm install -g ng-annotate

Then run it as `ng-annotate OPTIONS <file>`. The errors (if any) will go to stderr,
the transpiled output to stdout.

Use the `--add` (`-a`) option to add annotations where non-existing,
use `--remove` (`-r`) to remove all existing annotations,
use `--add --remove` (`-ar`) to rebuild all annotations.

Use the `-o` option to write output to file.

Provide `-` instead of an input `<file>` to read input from stdin.

Use the `--sourcemap` option to generate an inline sourcemap.

Use the `--sourceroot` option to set the sourceRoot property of the generated sourcemap.

Use the `--single_quotes` option to output `'$scope'` instead of `"$scope"`.

Use the `--regexp` option to restrict matching further or to expand matching.
See description further down.

Use the `--plugin` option to load a user plugin with the provided path (*experimental*, 
0.9.x may change API). See [plugin-example.js](plugin-example.js) for more info.

Use the `--stats` option to print statistics on stderr (*experimental*).


## Highly recommended: enable ng-strict-di in your minified builds
`<div ng-app="myApp" ng-strict-di>`

Do that in your ng-annotate processed builds and AngularJS will let you know if there are
any missing dependency injection annotations. This is an upcoming feature in AngularJS 1.3
([docs](https://docs.angularjs.org/api/ng/directive/ngApp)).

A future version of ng-annotate may get support for adding the `ng-strict-di` attribute
automatically so you don't have to think about it.


## Tools support
* [Grunt](http://gruntjs.com/): [grunt-ng-annotate](https://www.npmjs.org/package/grunt-ng-annotate) by [Michał Gołębiowski](https://github.com/mzgol)
* [Browserify](http://browserify.org/): [browserify-ngannotate](https://www.npmjs.org/package/browserify-ngannotate) by [Owen Smith](https://github.com/omsmith)
* [Brunch](http://brunch.io/): [ng-annotate-uglify-js-brunch](https://www.npmjs.org/package/ng-annotate-uglify-js-brunch) by [Kagami Hiiragi](https://github.com/Kagami)
* [Gulp](http://gulpjs.com/): [gulp-ng-annotate](https://www.npmjs.org/package/gulp-ng-annotate/) by [Kagami Hiiragi](https://github.com/Kagami)
* [Broccoli](https://github.com/broccolijs/broccoli): [broccoli-ng-annotate](https://www.npmjs.org/package/broccoli-ng-annotate) by [Gilad Peleg](https://github.com/pgilad)
* [Rails asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html): [ngannotate-rails](https://rubygems.org/gems/ngannotate-rails) by [Kari Ikonen](https://github.com/kikonen)
* [Grails asset pipeline](https://github.com/bertramdev/asset-pipeline): [angular-annotate-asset-pipeline](https://github.com/craigburke/angular-annotate-asset-pipeline) by [Craig Burke](https://github.com/craigburke)
* [Webpack](http://webpack.github.io/): [ng-annotate-webpack-plugin](https://www.npmjs.org/package/ng-annotate-webpack-plugin) by [Chris Liechty](https://github.com/cliechty)
* Something missing? Contributions welcome - create plugin and submit a README pull request!


## Changes
See [CHANGES.md](CHANGES.md).


## Why?
 * Keep your code base clutter free from annotations but add them in your build step
 prior to minimizing
 * De-clutter an existing code base by removing annotations, non-intrusively
 * If you must store annotations in the repo (for any reason) then checkout,
 remove them, code and refactor without annotations, add them back and commit.
 Alternatively checkout, code and refactor (ignoring annotations), rebuild them and commit.


## Declaration forms
ng-annotate understands the two common declaration forms:

Long form:

    angular.module("MyMod").controller("MyCtrl", function($scope, $timeout) {
    });

Short form:

    myMod.controller("MyCtrl", function($scope, $timeout) {
    });

It's not limited to `.controller` of course. It understands `.config`, `.factory`,
`.directive`, `.filter`, `.run`, `.controller`, `.provider`, `.service`, `.animation` and
`.invoke`.

For short forms it does not need to see the declaration of `myMod` so you can run it
on your individual source files without concatenating. If ng-annotate detects a short form
false positive then you can use the `--regexp` option to limit the module identifier.
Examples: `--regexp "^myMod$"` (match only `myMod`) or `--regexp "^$"` (ignore short forms).
You can also use `--regexp` to opt-in for more advanced method callee matching, for
example `--regexp "^require(.*)$"` to detect and transform
`require('app-module').controller(..)`. Not using the option is the same as passing
`--regexp "^[a-zA-Z0-9_\$\.\s]+$"`, which means that the callee can be a (non-unicode)
identifier (`foo`), possibly with dot notation (`foo.bar`).

ng-annotate understands `angular.module("MyMod", function(dep) ..)` as an alternative to
`angular.module("MyMod").config(function(dep) ..)`.

ng-annotate understands `this.$get = function($scope) ..` and
`{.., $get: function($scope) ..}` inside a `provider`. `self` and `that` can be used as
aliases for `this`.

ng-annotate understands `return {.., controller: function($scope) ..}` inside a
`directive`.

ng-annotate understands `$provide.decorator("bar", function($scope) ..)` and other methods
on `provide` such as `factory`.

ng-annotate understands `$routeProvider.when("path", { .. })`.

ng-annotate understands `$httpProvider.interceptors.push(function($scope) ..)` and
`$httpProvider.responseInterceptors.push(function($scope) ..)`.

ng-annotate understands [ui-router](https://github.com/angular-ui/ui-router) (`$stateProvider` and
`$urlRouterProvider`).

ng-annotate understands `$modal.open` ([angular-ui/bootstrap](http://angular-ui.github.io/bootstrap/)).
*experimental*

ng-annotate understands chaining.

ng-annotate understands IIFE's and attempts to match through them, so
`(function() { return function($scope) .. })()` works anywhere
`function($scope) ..` does (for any IIFE args and params).


## Reference-following
*experimental*

ng-annotate follows references. This works iff the referenced declaration is
a) a function declaration or
b) a variable declaration with an initializer.
Modifications to a reference outside of its declaration site are ignored by ng-annotate.

These examples will get annotated:

    function MyCtrl($scope, $timeout) {
    }
    var MyCtrl2 = function($scope) {};

    angular.module("MyMod").controller("MyCtrl", MyCtrl);
    angular.module("MyMod").controller("MyCtrl", MyCtrl2);


## Explicit annotations
You can prepend a function expression with `/* @ngInject */` to explicitly state that this
function should get annotated. ng-annotate will leave the comment intact and will thus still
be able to also remove or rewrite such annotations. Alternatively, you can wrap an expression
inside an `ngInject(..)` function call. Use `/* @ngInject */` or `ngInject(..)` as an occasional
workaround when ng-annotate doesn't support your code style but feel free to open an issue
also.

    x = /* @ngInject */ function($scope) {};
    obj = {controller: /*@ngInject*/ function($scope) {}};
    obj.bar = /*@ngInject*/ function($scope) {};

    function ngInject(f) { return f } // define this once in your program
    x = ngInject(function($scope) {});
    obj = {controller: ngInject(function($scope) {})};
    obj.bar = ngInject(function($scope) {});

    =>

    x = /* @ngInject */ ["$scope", function($scope) {}];
    obj = {controller: /*@ngInject*/ ["$scope", function($scope) {}]};
    obj.bar = /*@ngInject*/ ["$scope", function($scope) {}];

    function ngInject(f) { return f } // define this once in your program
    x = ngInject(["$scope", function($scope) {}]);
    obj = {controller: ngInject(["$scope", function($scope) {}])};
    obj.bar = ngInject(["$scope", function($scope) {}]);

Prepended to an object literal, `/* @ngInject */` will annotate all of its contained
function expressions, recursively:

	obj = /*@ngInject*/ {
	    controller: function($scope) {},
	    resolve: { data: function(Service) {} },
	};

	obj = ngInject({
	    controller: function($scope) {},
	    resolve: { data: function(Service) {} },
	});

	=>

	obj = /*@ngInject*/ {
	    controller: ["$scope", function($scope) {}],
	    resolve: { data: ["Service", function(Service) {}] },
	};

	obj = ngInject({
	    controller: ["$scope", function($scope) {}],
	    resolve: { data: ["Service", function(Service) {}] },
	});


Prepended to a function statement, to a single variable declaration initialized with a
function expression or to an assignment where the rvalue is a function expression,
 `/* @ngInject */` will attach an `$inject` array to the function:

    // @ngInject
    function Foo($scope) {}

    // @ngInject
    var foo = function($scope) {}

    // @ngInject
    module.exports = function($scope) {}

    =>

    // @ngInject
    function Foo($scope) {}
    Foo.$inject = ["$scope"];

    // @ngInject
    var foo = function($scope) {}
    foo.$inject = ["$scope"];

    // @ngInject
    module.exports = function($scope) {}
    module.exports.$inject = ["$scope"];


## Issues and compatibility
If ng-annotate does not handle a construct you're using, if there's a bug or if you have a feature
request then please [file an issue](https://github.com/olov/ng-annotate/issues?state=open).


## Build and test
ng-annotate is written in ES6 constlet style and uses [defs.js](https://github.com/olov/defs)
to transpile to ES5. See [BUILD.md](BUILD.md) for build and test instructions.


## License
`MIT`, see [LICENSE](LICENSE) file.

ng-annotate is written by [Olov Lassus](https://github.com/olov) with the kind help by
[contributors](https://github.com/olov/ng-annotate/graphs/contributors).
[Follow @olov](https://twitter.com/olov) on Twitter for updates about ng-annotate.


## Performance
ng-annotate is designed to be very fast (in general limited by parse speed).
It traverses the AST exactly once and transforms it without the need for an AST -> source
decompilation step.


## Library (API)
ng-annotate can be used as a library. See [ng-annotate.js](ng-annotate.js) for further info about
options and return value.

    var ngAnnotate = require("ng-annotate");
    var somePlugin = require("./some/path/some-plugin");
    var res = ngAnnotate(src, {add: true, plugin: [somePlugin], sourcemap: true, sourceroot: "/path/to/source/root"});
    var errorstringArray = res.errors;
    var transformedSource = res.src;
    var transformedSourceMap = res.map;
