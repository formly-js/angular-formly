# Contributing

## Issues

If you've found an issue, please submit it in [the issues](https://github.com/formly-js/angular-formly/issues) with a link to a jsbin that demonstrates the issue (clone [this template](http://jsbin.com/biqesi/edit))

## Pull Requests

If you would like to add functionality, please submit [an issue](https://github.com/formly-js/angular-formly/issues) first to make sure it's a direction we want to take.

When submitting a Pull Request please submit it to the `master` branch.

Please do the following:
* Follow the existing styles (we have an `.editorconfig` file)
* Document your changes in the README
* Create an example that demonstrates your changes so people can see how your changes work

### Development

1. `git checkout master`
	1. run `npm install`
	2. change your directory to the demo and test your code using `npm run start` which runs webpack and hosts the app locally at `http://localhost:8080`
	3. Write your code in ES6 goodness :-)
	5. run `npm run build` in both the root directory *and* the demo directory
	4. commit your changes
2. update `README.md`, `CHANGELOG.md`, and do any other final polishing to prepare for publishing
	1. git commit changes

*Note:* There's a symlink for `dist` in the `demo` folders. Just FYI...

*Another Note:* Due to some inconsistencies with angular versions, always use `require('angular-fix')` rather than simply `require('angular')`

### npm scripts

There are actually two `package.json` files. One for the library and one for the demo. There are also two webpack configs for each of these (one for dev config and the other for the uglifying). Running `npm run build` in both folders will run webpack with each of those configs.

In the demo, you can run `npm run start` to start the development server.

### Grunt targets
* `grunt deploy`: Publishes the demo to gh-pages (note, only publishes current state of the demo, so make sure that you build that folder before you run this).

### What do you need help with?

* Tests! We don't have any... But we do have the scaffolding for them. See the top of the `formly-field.js` file for an example of how to hook those up.
* Any of the issues in GitHub, let us know if you have some time to fix one. Especially those labeld [PR Please!](https://github.com/formly-js/angular-formly/labels/PRs%20please%21)
* Examples, examples, examples! The website is driven by examples. Please follow the instructions in [this file](https://github.com/formly-js/angular-formly/edit/master/demo/app/states/root/components/data/examples.js) for what you need to do!
