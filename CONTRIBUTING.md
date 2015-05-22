# Contributing

## Questions/Help

Please post questions to [StackOverflow](http://stackoverflow.com/) using the
[angular-formly](http://stackoverflow.com/tags/angular-formly/info) tag. There's also the
[mailing list](https://groups.io/org/groupsio/formly-js) where you can ask/answer questions. Also join us on
[gitter](https://gitter.im/formly-js/angular-formly). We like to say hi :-)

## Issues

If you've found an issue, please submit it in [the issues](https://github.com/formly-js/angular-formly/issues)
with a link to a jsbin that demonstrates the issue (clone [this template](http://jsbin.com/biqesi/edit))

## Pull Requests

If you would like to add functionality, please submit [an issue](https://github.com/formly-js/angular-formly/issues)
first to make sure it's a direction we want to take.

When submitting a Pull Request please submit it to the `master` branch.

Please do the following:
* Follow the existing styles (we have an `.editorconfig` file)
* Document your changes in the README (try to follow the convention you see in the rest of the file)
* Create an example for the website that demonstrates your changes so people can see how your changes work

### Development

1. `git checkout master`
	1. run `npm install`
	2. change your directory to the demo and test your code using `npm start` which runs webpack and hosts the app locally at `http://localhost:8080`
	3. Write your code in ES6 goodness :-)
	4. commit your changes
2. update `README.md`, `CHANGELOG.md`, and do any other final polishing to prepare for publishing
	1. commit changes

*Note:* Please don't commit any changes to the `dist/` directory. This is only committed for releases.

*Another Note:* Due to some inconsistencies with angular versions, always use `require('angular-fix')` rather than simply `require('angular')`

### What do you need help with?

* Tests! Our coverage isn't great...
* Any of the issues in GitHub, let us know if you have some time to fix one. Especially those labeld [PR Please!](https://github.com/formly-js/angular-formly/labels/PRs%20please%21)
* Examples, examples, examples! The website is driven by examples. Please follow the instructions in [this file](https://github.com/formly-js/angular-formly/edit/master/demo/app/states/root/components/data/examples.js) for what you need to do!
