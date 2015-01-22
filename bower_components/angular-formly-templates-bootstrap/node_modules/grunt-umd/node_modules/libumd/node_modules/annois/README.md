[![build status](https://secure.travis-ci.org/annojs/is.png)](http://travis-ci.org/annojs/is)
# annois - Type checkers for JavaScript

`annois` provides an alternative to [is.js](https://github.com/scottrabin/is-js). Its API is compatible with [generators.js](https://github.com/bebraw/generators.js). This can be handy for `generative testing`.

Usage:

```javascript
var is = require('annois');


// type comparisons
is.object(...);
is.array(...);
is.boolean(...);

// additional comparisons
is.upperCharacter(...);
is.object.with(['name', 'age'], ...);

// see source for more or introspect the library
```

## License

`annois` is available under MIT. See LICENSE for more details.
