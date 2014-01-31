# AngularJS directive which takes JSON representing a form and renders to HTML

[TODO - brief summary]

## Demo
http://Nimbly.github.io/angular-formly/

## Dependencies
- required:
	[TODO]
- optional
	[TODO]

See `bower.json` and `index.html` in the `gh-pages` branch for a full list / more details

## Install
1. download the files
	1. Bower
		1. add `"angular-formly": "latest"` to your `bower.json` file then run `bower install` OR run `bower install angular-formly`
2. include the files in your app
	1. `formly.min.js`
	2. `formly.less` OR `formly.min.css` OR `formly.css`
3. include the module in angular (i.e. in `app.js`) - `Nimbly.angular-formly`

See the `gh-pages` branch, files `bower.json` and `index.html` for a full example.


## Documentation
See the `formly.js` file top comments for usage examples and documentation
https://github.com/Nimbly/angular-formly/blob/master/formly.js


## Development

1. `git checkout gh-pages`
	1. run `npm install && bower install`
	2. write your code then run `grunt`
	3. git commit your changes
2. copy over core files (.js and .css/.less for directives) to master branch
	1. `git checkout master`
	2. `git checkout gh-pages formly.js formly.min.js formly.less formly.css formly.min.css`
3. update README, CHANGELOG, bower.json, and do any other final polishing to prepare for publishing
	1. git commit changes
	2. git tag with the version number, i.e. `git tag v1.0.0`
4. create github repo and push
	1. [if remote does not already exist or is incorrect] `git remote add origin [github url]`
	2. `git push origin master --tags` (want to push master branch first so it is the default on github)
	3. `git checkout gh-pages`
	4. `git push origin gh-pages`
5. (optional) register bower component
	1. `bower register angular-formly [git repo url]`
