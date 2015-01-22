[![build status](https://secure.travis-ci.org/bebraw/libumd.png)](http://travis-ci.org/bebraw/libumd)
# libumd - Wraps given JavaScript code with UMD

## Usage

```js
var umdify = require('libumd');

...

var result = umdify(js, options);
```

options (all are optional by default):

```js
{
    indent: 4, // defaults to 2. can be a string as well, ie. '  ' would work
    template: 'path to template or template name', // defaults to 'umd'
    globalAlias: 'alias', // name of the global variable
    deps: { // dependencies
        'default': ['foo', 'bar'],
        amd: ['foobar', 'barbar'],
        cjs: ['foo', 'barbar'],
        global: ['foobar', 'bar']
    }
}
```

> Note that indentation does not apply to UMD block, only to the code that it contains

## Default Templates

The library comes with a couple of UMD variants. See `/templates`. In addition you may use one of your own as long as it is formatted using Handlebars syntax and follows the same naming conventions as the ones provided with the project.

## License

`libumd` is available under MIT. See LICENSE for more details.

