# grunt-umd

Grunt task to surround JavaScript code with the [universal module definition](https://github.com/umdjs/umd/).

## Usage

Install this grunt plugin next to your project's grunt.js gruntfile with: `npm install grunt-umd`

Add the following line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-umd');
```

Then configure the task:

```javascript
grunt.initConfig({
    umd: {
        all: {
            options: {
                src: 'path/to/input.js',
                dest: 'path/to/output.js', // optional, if missing the src will be used
                template: 'path/to/template.hbs', // optional, a template from templates subdir
                    // can be specified by name (e.g. 'umd'); if missing, the templates/umd.hbs
                    // file will be used from [libumd](https://github.com/bebraw/libumd)
                objectToExport: 'library', // optional, internal object that will be exported
                amdModuleId: 'id', // optional, if missing the AMD module will be anonymous
                globalAlias: 'alias', // optional, changes the name of the global variable
                indent: 4, // optional (defaults to 2), indent source code. Accepts strings as well
                deps: { // optional
                    'default': ['foo', 'bar'],
                    amd: ['foobar', 'barbar'],
                    cjs: ['foo', 'barbar'],
                    global: ['foobar', 'bar']
                }
            }
        }
    }
});
```

And finally use it:

```bash
grunt umd:all
```

## Templates

The following predefined [Handlebars](http://handlebarsjs.com/)-templates are available:

* `umd` - the default template; the template is based on [umd/returnExports.js](https://github.com/umdjs/umd/blob/master/returnExports.js)
* `unit` - the template that can be helpful to wrap standalone CommonJS/Node modules; it is slightly modified version of `umd` template;
    if `objectToExport` option is not specified then `module.exports` value will be used by default

The template that should be applied can be specified by `template` option (e.g. `'umd'` or `'unit'`).
You can create and use your own template (see predefined templates for examples).
The path to the template file should be set relative to Gruntfile.

## Demo

1. Install dependencies - `npm install`
2. Go to demo - `cd demo`
3. Execute demo - `grunt`

You should see some `/output` after this. Study `Gruntfile.js` to understand how it generates.

## Contributors

* [Alex Lawrence](https://github.com/alexlawrence) - Project founder, previous maintainer
* [Juho Vepsäläinen](https://github.com/bebraw) - Handlerbars fixes etc., current maintainer
* [Stéphane Bachelier](https://github.com/stephanebachelier) - Code indentation option
* [Milan Adamovsky](https://github.com/adamovsky) - Enhanced configurability and Rails assets pipeline support
* [Brian J. Miller](https://github.com/brianjmiller) - Indent only non-empty lines
* [Denis](https://github.com/gamtiq) - Add default value for objectToExport and template option support
* [Boris Cherny](https://github.com/eighttrackmind) - Properly export module IDs containing dashes to browser globals
* [Paulo Gaspar](https://github.com/paulogaspar7) - Fix GitHub user name at repo and homepage URLs
* [tomyouds](https://github.com/tomyouds) - Ignore indent option for empty lines
* [Rameş Aliyev](https://github.com/ramesaliyev) - Browserify example

## License

MIT. See LICENSE for more info.
