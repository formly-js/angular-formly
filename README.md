## Formly
Formly for Angular is an AngularJS module which has directives to help customize and render JSON based forms. The directive originated from a need to allow our users to create surveys and distribute them easily. Currently we've can render the form data from JSON and assign a model to form so we can receive the submitted data.

  <formly-form result="formData" fields="formFields" options="formOptions" ng-submit="onSubmit()">
  </formly-form>

### Demo : http://Nimbly.github.io/angular-formly/

## Dependencies
- Required to use Formly:
 - Angular
 - Twitter Bootstrap

- Dev dependencies to build Formly
 - npm


See `bower.json` and `index.html` in the `master` branch for a full list / more details

## Install in your project
1. Install with Bower  
 `$ bower install angular-formly`

2. Include the files in your index.html  
 `<script src="bower_components/angular-formly/dist/formly.min.js"></script>`

3. Add 'formly' as a required module to your angular app, usually in `app.js`:  
 `var app = angular.module('app', ['ng', 'ui.router', 'formly']);`

## Documentation

```html
  <formly-form result="formData" fields="formFields" options="formOptions" ng-submit="onSubmit()">
  </formly-form>
```  

For options specific to input types see their directive html in `src/directives`  
```javascript
  var formFields = [
    {
      //the key to be used in the result values {... "username": "johndoe" ... }
      key: 'username',

      //default value
      default: 'uberuser'
      type: 'text',
      label: 'Username',
      placeholder: 'johndoe',
      required: true,
      disabled: false, //default: false
    },
    {
      key: 'password'
      type: 'password',
      label: 'Password',
      required: true,
      disabled: false, //default: false
    }

  ];

  var formOptions = {

    //Set the id of the form
    uniqueFormId: 'myFormId',

    //Hide the submit button that is added automaticaly
    //default: false
    hideSubmit: false,

    //Set the text on the default submit button
    //default: Submit
    submitCopy: 'Login'
  };
```  

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
* `grunt dev`: Creates a server for testing at `http://0.0.0.0:4000`
* `grunt publish`: Copies the src folder and bower_components to gh-pages
