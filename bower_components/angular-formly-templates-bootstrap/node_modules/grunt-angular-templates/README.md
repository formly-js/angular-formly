# grunt-angular-templates

[![Build Status](https://travis-ci.org/ericclemmons/grunt-angular-templates.svg)](https://travis-ci.org/ericclemmons/grunt-angular-templates)
[![Dependencies](https://david-dm.org/ericclemmons/grunt-angular-templates.svg)](https://david-dm.org/ericclemmons/grunt-angular-templates)
[![devDependencies](https://david-dm.org/ericclemmons/grunt-angular-templates/dev-status.svg)](https://david-dm.org/ericclemmons/grunt-angular-templates#info=devDependencies&view=table)

> Speed up your AngularJS app by automatically minifying, combining,
> and automatically caching your HTML templates with `$templateCache`.

Here's an example of the output created by this task from multiple `.html` files:

```js
angular.module('app').run(["$templateCache", function($templateCache) {
  $templateCache.put("home.html",
    // contents for home.html ...
  );
  ...
  $templateCache.put("src/app/templates/button.html",
    // contents for button.html
  );
}]);
```

Then, when you use `ng-include` or `templateUrl` with `$routeProvider`,
the template is already loaded without an extra AJAX request!


## Table of Contents

- [Installation](#installation)
- [Options](#options)
- [Usage](#usage)
- [Examples](#examples)
- [Changelog](#changelog)
- [License](#license)


## Installation

*This plugin requires [Grunt][1] `~0.4.0`*

*Usemin integration requires [grunt-usemin][5] `~2.0.0`*

Install the plugin:

    $ npm install grunt-angular-templates --save-dev

Enable the plugin within your `Gruntfile`:

```js
grunt.loadNpmTasks('grunt-angular-templates');
```


## Options

### angular

> Global namespace for Angular.

If you use `angular.noConflict()`, then set this value to whatever you
re-assign angular to.  Otherwise, it defaults to `angular`.

### bootstrap

> Callback to modify the bootstraper that registers the templates with `$templateCache`.

By default, the bootstrap script wraps `function($templateCache) { ... }` with:

```js
angular.module('app').run(['$templateCache', ... ]);
```

If you want to create your own wrapper so you register the templates as an
AMD or CommonJS module, set the `bootstrap` option to something like:

```js
bootstrap: function(module, script) {
  return 'module.exports[module] = ' + script + ';';
}
```

### concat

> Name of `concat` target to append the compiled template path to.

This is especially handy if you combine your scripts using
[grunt-contrib-concat][4] or [grunt-usemin][5].

### htmlmin

> Object containing [htmlmin options][2] that will *significantly* reduce
the filesize of the compiled templates.

Without this, the HTML (whitespace and all) will be faithfully compiled
down into the final `.js` file.  Minifying that file will only cut down
on the *Javascript* code, not the *HTML* within the strings.

I recommend using the following settings for production:

```js
htmlmin: {
  collapseBooleanAttributes:      true,
  collapseWhitespace:             true,
  removeAttributeQuotes:          true,
  removeComments:                 true, // Only if you don't use comment directives!
  removeEmptyAttributes:          true,
  removeRedundantAttributes:      true,
  removeScriptTypeAttributes:     true,
  removeStyleLinkTypeAttributes:  true
}
```

### module

> `String` of the `angular.module` to register templates with.

If not specified, it will automatically be the name of the `ngtemplates`
subtask (e.g. `app`, based on the examples below).

### prefix

> `String` to prefix template URLs with.
Defaults to `''`

If you need to use absolute urls:

```js
ngtemplates: {
  app: {
    options: {
      prefix: '/'
    }
  }
}
```

If you serve static assets from another directory, you specify that as well.

### source

> Callback to modify the template's source code.

If you would like to prepend a comment, strip whitespace, or do
post-processing on the HTML that `ngtemplates` doesn't otherwise do,
use this function.

### append

Normally grunt-angular-templates creates a new file at `dest`. 
This option makes it append the compiled templates to the `dest` file rather than replace its contents.
This is just a useful alternative to creating a temporary `dest` file and concatting it to your application.


### standalone

> Boolean indicated if the templates are part of an existing module or a standalone.
Defaults to `false`.

- If the value is `false`, the module will look like `angular.module('app')`, meaning `app` module is retrieved.
- If the value is `true`, the module will look like `angular.module('app', [])`, meaning `app` module is created.

### url

> Callback to modify the template's `$templateCache` URL.

Normally, this isn't needed as specifying your files with `cwd`
ensures that URLs load via both AJAX and `$templateCache`.

### usemin

> Path to `<!-- build:js [path/to/output.js] -->` usemin target

This should be the output path of the compiled JS indicated in your HTML,
such as `path/to/output.js` shown here.

## Usage


### Compiling HTML Templates

After configuring your `ngtemplates` task, you can either run the
task directly:

    $ grunt ngtemplates

Or, bake it into an existing task:

```js
grunt.registerTask('default', [ 'jshint', 'ngtemplates', 'concat' ]);
```

### Including Compiled Templates

Finally, you have to load the compiled templates' `.js` file into your
application.


#### Using HTML

```html
<script src="templates.js"></script>
```


#### Using Grunt's `concat` task:

This is my personal preference, since you don't have to worry about
what the destination file is actually called.

```js
concat:   {
  app:    {
    src:  [ '**.js', '<%= ngtemplates.app.dest %>' ]
    dest: [ 'app.js' ]
  }
}
```

#### Using [grunt-usemin][5]

Using the following HTML as an example:

```html
<!-- build:js dist/vendors.js -->
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-resource/angular-resource.js"></script>
<!-- endbuild -->
```

**Do not use the `concat` option**, even though grunt-usemin generates a `concat.generated`
object behind the scenes.  Instead, use the `usemin` option to indicate the anticipated
output filepath from grunt-usemin.

```js
ngtemplates:  {
  app:        {
    src:      '**.html',
    dest:     'template.js',
    options:  {
      usemin: 'dist/vendors.js' // <~~ This came from the <!-- build:js --> block
    }
  }
}
```

**Note**: Earlier versions of grunt-usemin (*correctly, in my opinion*) would have generated
a `concat['dist/vendors.js']` object for each build section in the HTML.  Now,
because there's a single `concat.generated` object with **all** JS/CSS files within it,
I'm back-tracking the proper `concat` target for you.

## Examples


### Register HTML Templates in `app` Module

```js
ngtemplates:  {
  app:        {
    src:      '**.html',
    dest:     'templates.js'
  }
}
```


### Register Relative Template URLs

Normally, your app, templates, & server are in separate folders, which means
that the template URL is **different** from the file path.

```js
ngtemplates:  {
  app:        {
    cwd:      'src/app',
    src:      'templates/**.html',
    dest:     'build/app.templates.js'
  }
}
```

This will store the template URL as `templates/home.html` instead of
`src/app/templates/home.html`, which would cause a 404.


### Minify Template HTML

Simply pass the [same options][2] as the `htmlmin` task:

```js
ngtemplates:    {
  app:          {
    src:        '**.html',
    dest:       'templates.js',
    options:    {
      htmlmin:  { collapseWhitespace: true, collapseBooleanAttributes: true }
    }
  }
}
```

Or, if you already have an existing `htmlmin` task, you can reference it:

```js
ngtemplates:    {
  app:          {
    src:        '**.html',
    dest:       'templates.js',
    options:    {
      htmlmin:  '<%= htmlmin.app %>'
    }
  }
}
```


### Customize Template URL

Suppose you only use `ngtemplates` when on production, but locally you serve
templates via Node, sans the `.html` extension.

You can specify a `url` callback to further customize the registered URL:

```js
ngtemplates:  {
  app:        {
    src:      '**.html',
    dest:     'templates.js',
    options:  {
      url:    function(url) { return url.replace('.html', ''); }
    }
  }
}
```


### Customize Output

Some people like [AMD & RequireJS][3] and would like wrap the output
in AMD or something else (don't ask me why!):

```js
ngtemplates:      {
  app:            {
    src:          '**.html',
    dest:         'templates.js',
    options:      {
      bootstrap:  function(module, script) {
        return 'define(module, [], function() { return { init: ' + script + ' }; });';
      }
    }
  }
}
```

You will be able to custom everything surrounding `$templateCache.put(...)`.


## Changelog

- v0.5.7 – Improve error messages ([#100](https://github.com/ericclemmons/grunt-angular-templates/pull/100))
- v0.5.6 – Updated `html-minifier` to correct whitespace issues. ([96](https://github.com/ericclemmons/grunt-angular-templates/pull/96))
- v0.5.5 – Add `append` option to concat, not overwrite the `dest`. ([#89](https://github.com/ericclemmons/grunt-angular-templates/pull/89))
- v0.5.4 – Specifying an invalid `usemin` option still creates file ([#84](https://github.com/ericclemmons/grunt-angular-templates/pull/84))
- v0.5.3 – Fix bug with Underscore templates ([#79](https://github.com/ericclemmons/grunt-angular-templates/pull/79))
- v0.5.2 – Fix `usemin` matching issue on Windows ([#80](https://github.com/ericclemmons/grunt-angular-templates/pull/80))
- v0.5.1 – Add `usemin` option form v0.4.10
- v0.5.0 – Works with `grunt-usemin` ([#44](https://github.com/ericclemmons/grunt-angular-templates/issues/44))
- v0.4.10 – Add `usemin` option
- v0.4.9 – Improve `prefix` and support for URLs ([#57](https://github.com/ericclemmons/grunt-angular-templates/pull/57))
- v0.4.8 – Compiled assets are JSHint-able ([#58](https://github.com/ericclemmons/grunt-angular-templates/pull/58))
- v0.4.7 – Fix bug for when htmlmin is not an Object ([#56](https://github.com/ericclemmons/grunt-angular-templates/issues/56))
- v0.4.6 – Add `prefix` option for easier URL prefixes ([#53](https://github.com/ericclemmons/grunt-angular-templates/pull/53))
- v0.4.5 – Attempt to better normalize templates based on current OS ([#52](https://github.com/ericclemmons/grunt-angular-templates/pull/52))
- v0.4.4 – Fixed regression caused by `htmlmin` ([#54](https://github.com/ericclemmons/grunt-angular-templates/pull/54))
- v0.4.3 - `options.concat` targets on Windows convert `/` to `\\`. [#48](https://github.com/ericclemmons/grunt-angular-templates/issues/48)
- v0.4.2 - Fix for using `grunt-env` to change environments. Thanks to @FredrikAppelros ([#20](https://github.com/ericclemmons/grunt-express-server/pull/20))
- v0.4.1 – Fix bug with empty files.
- v0.4.0 – Complete rewrite.
- v0.3.12 – Whoops, forgot to make `htmlmin` a regular dependency. Thanks  @rubenv ([#37](https://github.com/ericclemmons/grunt-angular-templates/pull/37))
- v0.3.11 – Add `htmlmin` option that supports both an `{ ... }` and `<%= htmlmin.options %>` for existing tasks.
- v0.3.10 – Fix *unknown concat target* bug on windows, thanks to @trask ([#31](https://github.com/ericclemmons/grunt-angular-templates/pull/31))
- v0.3.9 – Allow the creation of a new module via `module.define`, thanks to @sidwood ([#28](https://github.com/ericclemmons/grunt-angular-templates/pull/28))
- v0.3.8 – Fix error that occurs when adding 0-length files, thanks to @robertklep ([#27](https://github.com/ericclemmons/grunt-angular-templates/pull/27))
- v0.3.7 – Add `noConflict` option to work with [angular.noConflict](https://github.com/angular/angular.js/pull/1535), thanks to @mbrevoort ([#26](https://github.com/ericclemmons/grunt-angular-templates/pull/26))
- v0.3.6 – Fix issue with dading to `concat` task when it's an array, thanks to @codefather ([#23](https://github.com/ericclemmons/grunt-angular-templates/pull/23))
- v0.3.5 – Preserver line endings in templates, thanks to @groner ([#21](https://github.com/ericclemmons/grunt-angular-templates/pull/21))
- v0.3.4 – Attempt to fix a bug with `Path`, thanks to @cgross ([#19](https://github.com/ericclemmons/grunt-angular-templates/issues/19))
- v0.3.3 – Add `concat` option for automatically adding compiled template file to existing `concat` (or `usemin`-created) task, thanks to @cgross ([#17](https://github.com/ericclemmons/grunt-angular-templates/pull/17))
- v0.3.2 – Add `module` option for setting which module the templates will be added to, thanks to @sidwood ([#20](https://github.com/ericclemmons/grunt-angular-templates/pull/20))
- v0.3.1 – Add `prepend` option for modifying final `$templateCache` IDs, thanks to @mbarchein. ([#16](https://github.com/ericclemmons/grunt-angular-templates/pull/16))
- v0.3.0 – **BC break** - Templates are added to an existing module (e.g. `myapp`) rather than being their own `myapp.templates` module to be manually included, thanks to @geddesign. ([#10](https://github.com/ericclemmons/grunt-angular-templates/issues/10))
- v0.2.2 – Escape backslashes, thanks to @dallonf. ([#9](https://github.com/ericclemmons/grunt-angular-templates/pull/9))
- v0.2.1 – Remove `./bin/grunt-angular-templates`.  No need for it!
- v0.2.0 – Update to Grunt 0.4, thanks to @jgrund. ([#5](https://github.com/ericclemmons/grunt-angular-templates/issues/5))
- v0.1.3 – Convert `\\` to `/` in template IDs (for on win32 systems) ([#3](https://github.com/ericclemmons/grunt-angular-templates/issues/3))
- v0.1.2 – Added NPM keywords
- v0.1.1 – [Fails to combine multiple templates](https://github.com/ericclemmons/grunt-angular-templates/issues/1). Added directions to README on how to integrate with AngularJS app. Integrated with TravisCI
- v0.1.0 – Released to [NPM](https://npmjs.org/package/grunt-angular-templates)


## License

Copyright (c) 2013 Eric Clemmons
Licensed under the MIT license.


[1]: http://gruntjs.com/
[2]: https://github.com/gruntjs/grunt-contrib-htmlmin
[3]: http://requirejs.org/docs/whyamd.html
[4]: https://github.com/gruntjs/grunt-contrib-concat
[5]: https://github.com/yeoman/grunt-usemin


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/ericclemmons/grunt-angular-templates/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

