# Sentence Case

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

Sentence case a string.

Supports Unicode (non-ASCII characters) and non-string entities, such as objects with a `toString` property, numbers and booleans. Empty values (`null` and `undefined`) will result in an empty string.

## Installation

```bash
npm install sentence-case --save
```

## Usage

```javascript
var sentenceCase = require('sentence-case');

sentenceCase(null);              //=> ""
sentenceCase('string');          //=> "string"
sentenceCase('dot.case');        //=> "dot case"
sentenceCase('camelCase');       //=> "camel case"
sentenceCase('Beyoncé Knowles'); //=> "beyoncé knowles"
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/sentence-case.svg?style=flat
[npm-url]: https://npmjs.org/package/sentence-case
[travis-image]: https://img.shields.io/travis/blakeembrey/sentence-case.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/sentence-case
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/sentence-case.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/sentence-case?branch=master
