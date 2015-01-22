# Contributing

## Issues

If you've found an issue, please submit it in [the issues](https://github.com/formly-js/angular-formly/issues) with a link to a plunker that demonstrates the issue (use [this template](http://plnkr.co/edit/tpl:1R3t4fvpXcJyiu96ICY5?p=preview))

## Pull Requests

If you would like to add functionality, please submit [an issue](https://github.com/formly-js/angular-formly/issues) first to make sure it's a direction we want to take.

When submitting a Pull Request please submit it to the `master` branch.

Please do the following:
* Follow the existing styles
** Use the third option here: http://blogs.msdn.com/b/cyrusn/archive/2004/09/14/229474.aspx (Thats how we roll)
* Update the README with documentation so people can read how your changes work
* Update the example so people can see how your changes work

### Development

1. `git checkout master`
	1. run `npm install && bower install`
	2. test your code using `grunt dev` which hosts the app at `http://localhost:4000`
	3. commit your changes
3. update README, CHANGELOG, bower.json, and do any other final polishing to prepare for publishing
	1. git commit changes

*Note:* There's a symlink for `src` and `bower_components` in the `demo` and `tests` folders. Just FYI...

### Grunt targets
* `grunt dev`: Creates a server for testing at `http://0.0.0.0:4000`
* `grunt build`: Creates the dist
* `grunt publish`: Copies the src folder and bower_components to gh-pages

### What do you need help with?

* Tests! We don't have any... But we do have the scaffolding for them.
* Any of the issues in GitHub, let us know if you have some time to fix one.
