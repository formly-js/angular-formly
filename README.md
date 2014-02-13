## Formly
Formly for Angular is an AngularJS module which has directives to help customize and render JSON based forms. The directive originated from a need to allow our users to create surveys and distribute them easily. Currently we've can render the form data from JSON and assign a model to form so we can receive the submitted data.

	<formly-form result="formData" fields="formFields" options="formOptions" ng-submit="onSubmit()">
	</formly-form>

## Demo
http://Nimbly.github.io/angular-formly/

## Dependencies
- required:
	[TODO]
- optional
	[TODO]

See `bower.json` and `index.html` in the `master` branch for a full list / more details

## Install in your project
1. download the files
	1. Bower
		1. run `bower install angular-formly`
2. include the files in your app
	1. `bower_components/angular-formly/dist/formly.min.js`
3. include the module in angular (i.e. in `app.js`) - `formly`
	`var app = angular.module('app', ['ng', 'ui.router', 'formly']);`

## Documentation
[TODO]

## Roadmap

## Release Notes

## Development

1. `git checkout master`
	1. run `npm install && bower install`
	2. test your code using `grunt dev` which hosts the app at `http://localhost:4000`
	3. commit your changes
3. update README, CHANGELOG, bower.json, and do any other final polishing to prepare for publishing
	1. git commit changes

## Grunt targets
* `grunt dev`: Creates a server for testing at `http://localhost:400`
* `grunt publish`: Copies the src folder and bower_components to gh-pages
