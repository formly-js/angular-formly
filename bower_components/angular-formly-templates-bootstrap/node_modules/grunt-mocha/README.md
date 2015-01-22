# grunt-mocha

> Automatically run *client-side* mocha specs via grunt/mocha/PhantomJS

For a grunt task for server-side mocha tests, see [grunt-mocha-test](https://github.com/pghalliday/grunt-mocha-test) or [grunt-simple-mocha](https://github.com/yaymukund/grunt-simple-mocha)

## Getting Started

This plugin requires Grunt `~0.4.0`. Use a `0.1.x` tag of this plugin to use with Grunt `~0.3.0`.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mocha --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mocha');
```

## Mocha task
_Run this task with the `grunt mocha` command._

### Settings

#### files/src

Type: `String|Array`

This defines which HTML spec files to run using PhantomJS. These are the same files you would open to run tests in a browser.

There are a number of options available. Please review the [minimatch options here](https://github.com/isaacs/minimatch#options).

Example:
```js
mocha: {
  test: {
    src: ['tests/**/*.html'],
  },
},
```

#### dest
Type: `String`
Default: `undefined`

Write reporter output to a file. Useful if you need a file to feed your CI bot.

Example:
```js
mocha: {
  test: {
    options: {
      reporter: 'XUnit'
    },
    src: ['tests/**/*.html'],
    dest: './test/output/xunit.out',
  },
},
```

#### options.run
Type: `Boolean`
Default: `false`

**NOTE:** This will probably default to true in `0.5`.

grunt-mocha injects a script into the PhantomJS instance that loads your HTML spec files. The file sets up a reporter and listeners so the output can be output in the command line. This option will call `mocha.run()` after the script is injected, ensuring that the proper listeners are setup.

You may want to set this to false if your files are loaded asynchronously via AMD and call `mocha.run` in your own callback.

In HTML spec:
```html
<!-- run mocha after all test are loaded -->
<script type="text/javascript" charset="utf-8">
  // Only tests run in real browser, injected script run if options.run == true
  if (navigator.userAgent.indexOf('PhantomJS') < 0) {
    mocha.run();
  }
</script>
```

Gruntfile:
```js
mocha: {
  test: {
    src: ['tests/**/*.html'],
    options: {
      run: true,
    },
  },
},
```

#### options.urls
Type: `Array|String`
Default: `[]`

Instead of files, hit these URLs. Usually used in conjunction with the connect task to spin up a server for testing.

```js
connect: {
  server: {
    options: {
      port: 8888,
      base: '.',
    },
  },
},
mocha: {
  test: {
    options: {
      urls: [ 'http://localhost:8888/example/test/test2.html' ],
    },
  },
},
```

Then run:
```
grunt connect mocha
```

#### options.timeout
Type: `Number`
Default: `5000`

PhantomJS timeout in milliseconds. If nothing happens within 5 seconds, exit.

Example:
```js
mocha: {
  test: {
    src: ['tests/**/*.html'],
    options: {
      timeout: 10000,
    },
  },
},
```

#### options.bail
Type: `Boolean`
Default: `false`

Call `grunt.warn` and exit the grunt task on the first failed test. This only calls `grunt.warn` after the entire spec file is finished.

Example:
```js
mocha: {
  test: {
    src: ['tests/**/*.html'],
    options: {
      bail: true,
    },
  },
},
```

#### options.growlOnSuccess
Type: `Boolean`
Default: `true`

Display a Growl notification when all tests successfully pass.

Example:
```js
mocha: {
  test: {
    src: ['tests/**/*.html'],
    options: {
      growlOnSuccess: false,
    },
  },
},
```

#### options.log
Type: `Boolean`
Default: `false`

Print any `console.log` calls from PhantomJS to the command line. Only used for very quick and dirty debugging. It is highly recommended that you open the failing spec file in a browser so you can use much richer debugging tools.

Example:
```js
mocha: {
  test: {
    src: ['tests/**/*.html'],
    options: {
      log: true,
    },
  },
},
```

#### options.logErrors
Type: `Boolean`
Default: `false`

Fail and output script errors.

Example:
```js
mocha: {
  test: {
    src: ['tests/**/*.html'],
    options: {
      logErrors: true,
    },
  },
},
```

#### options.mocha
Type: `Object`

A mocha options simple object. Very few options are currently supported. Actually, I think `grep` is the only one.

Example:
```js
mocha: {
  test: {
    src: ['tests/**/*.html'],
    options: {
      mocha: {
        grep: 'router*'
      }
    }
  },
},
```

#### options.reporter
Type: `String`
Default: `'Dot'`

The reporter to use. **Note:** XUnit and those types of reporters should probably use the `dest` option.

Example:
```js
mocha: {
  test: {
    files: ['tests/**/*.html'],
    options: {
      reporter: 'Nyan',
    }
  },
},
```

Custom reporter example:
Example:
```js
mocha: {
  test: {
    files: ['tests/**/*.html'],
    options {
      reporter: './path/to/custom/reporter', // included via require
    },
  },
},
```

## Hacks

The PhantomJS -> Grunt superdimensional conduit uses `alert`. If you have disabled or aliased alert in your app, this won't work. I have conveniently set a global `PHANTOMJS` on `window` so you can conditionally override alert in your app.

## Examples

### Vanilla JS

#### Option 1 (recommended)

- Write mocha task description in grunt config using and specify `run: true` option (see [this task's Gruntfile.js](Gruntfile.js) for details);
- Check for PhantomJS `userAgent` in a test html file and run tests only in a real browser (see [test2.html](example/test/test2.html) for details).

In this case you shouldn't include [bridge.js](phantomjs/bridge.js) (it will be included automatically) and tests will be run from [bridge.js](phantomjs/bridge.js).

#### Option 2

Alternatively, include `bridge.js` from `tasks/phantomjs` after you include `mocha.js` and run `mocha.setup` in your HTML file. The helper will override `mocha.setup` if it detects PhantomJS. See [test.html](example/test/test.html).

### AMD

Mocha **must** be included via script tag in the header. There is no need to load Mocha via AMD. You may load other testing libs via AMD if that gives you a fuzzy feeling.

Example setup with AMD (advanced): https://gist.github.com/2655876

## License
Copyright (c) 2013 Kelly Miyashiro
Licensed under the MIT license.
