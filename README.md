[![Build Status](https://travis-ci.org/formly-js/angular-formly.svg)](https://travis-ci.org/formly-js/angular-formly)
[![Coverage Status](https://img.shields.io/coveralls/formly-js/angular-formly.svg)](https://coveralls.io/r/formly-js/angular-formly)

## Formly
Formly for Angular is an AngularJS module which has directives to help customize and render JSON based forms. The directive originated from a need to allow our users to create surveys and distribute them easily. Currently we've can render the form data from JSON and assign a model to form so we can receive the submitted data.

```html
<formly-form model="formData" fields="formFields"></formly-form>
```

### Demo : http://formly-js.github.io/angular-formly/

## Dependencies
- Required to use Formly:
 - Angular

- Dev dependencies to build Formly
 - npm


See `bower.json` and `index.html` in the `master` branch for a full list / more details

## Install in your project
1. Install with Bower  
 `$ bower install angular-formly --save`

2. Include the javascript file in your index.html, Formly without any form templates. You can create your own or use some of our prebuilt templates which cover basic form types, then extend with your own as needed.

 `<script src="bower_components/angular-formly/dist/formly.min.js"></script>`

  ### Prebuilt Templates
 - [Vanilla Template](https://github.com/formly-js/angular-formly-templates-vanilla#install-in-your-project): no fancy styling, just plain html
 - [Bootstrap Templates](https://github.com/formly-js/angular-formly-templates-bootstrap#install-in-your-project): bootstrap compatible forms, form-groups, etc.

  ### DIY Templates
  Regardless of which flavor you use, you can create your own templates with `formlyConfigProvider`. Use any of the builds above and override all the templates or just the ones you need.

3. Add 'formly' as a required module to your angular app, usually in `app.js`:  
 `var app = angular.module('app', ['ng', 'ui.router', 'formly']);`

## Documentation

*Note:* This `README.md` is for the latest version of `formly`. There have been some changes in the latest version which is not stable. For documentation on the latest stable version, see the [1.0.0 documentation](https://github.com/formly-js/angular-formly/tree/1.0.0)

### Example

Here's an example using the vanilla template properties

You can add a formly-form in your HTML templates as shown below.
```html
<formly-form model="formData" fields="formFields">
	<button ng-click="onSubmit()">Hello World</button>
</formly-form>
```  

Example data as it would be set in the controller
```javascript
	$scope.formData = {};
	$scope.formFields = [
		{
			//the key to be used in the model values {... "username": "johndoe" ... }
			key: 'username',

			type: 'text',
			label: 'Username',
			placeholder: 'johndoe',
			required: true,
			disabled: false, //default: false
			description: 'Descriptive text'
		},
		{
			key: 'password',
			type: 'password',
			label: 'Password',
			required: true,
			disabled: false, //default: false
			expressionProperties: {
				hide: '!model.username' // hide when username is blank
			}
		}

	];

	$scope.onSubmit = function() {
		console.log('form submitted:', $scope.formData);
	};
```
### Creating Form Fields
When constructing fields use the options below to customize each field object. You must set at least a `type`, `template`, or `templateUrl`.

##### type (string)
>`type` is the type of field to be rendered. Either type, template, or templateUrl must be set.

###### Default
>`null`

###### Values
> depends on the template set you're using. See documentation for the specific fieldset you are using.

---
##### template (string)
>`template` can be set instead of `type` or `templateUrl` to use a custom html template form field. Should be used with one-liners mostly (like a directive). Useful for adding functionality to fields.

**Note:** This can be used to add HTML instead of a form field.

Examples:
```html
template: '<p>Some text here</p>'
```

```html
template: '<hr />'
```

###### Default
>`undefined`

---
##### templateUrl (string)
>`templateUrl` can be set instead of `type` or `template` to use a custom html template form field. Set a path relative to the root of the application. ie `directives/custom-field.html`

###### Default
>`undefined`

---
##### key (string)
>By default form models are keyed by location in the form array, you can override this by specifying a `key`.

###### Default
>`undefined`

---
##### model (object)
>By default, the `model` passed to the `formly-field` directive is the same as the `model` passed to the `formly-form`. However, if the field has a `model` specified, then the specified `model` is used for that field (and that field only). Also, a deep watch is added to the `formly-field` directive's scope to run the `expressionProperties` when the specified `model` changes.

###### Default
>`undefined`

---
##### expressionProperties (object)
>`expressionProperties` is an object where the key is a property to be set on the main field config and the value is an expression used to assign that property. One special case is `data` which is an object that behaves the same as `expressionProperties` except the value is assigned to `field.data` rather than just `field`. The expression can be a function or string expression and will be evaluated using `formlyEval` from `formlyUtils` see below for more information.

###### Default
>`undefined`

---
##### data (*)
>`data` is reserved for the developer. You have our guarantee to be able to use this and not worry about future versions of formly overriding your usage and preventing you from upgrading :-)

###### Default
>`undefined`

---
##### modelOptions (object)
>`modelOptions` is used to make your templates easier to work with. Noramlly, you would have to do this in each of your templates: `ng-model="model[options.key || index]"`. However, if you like, you can take advantage of `ng-model-options` via the `modelOptions` property. This will allow you to do `ng-model="value" ng-model-options="options.modelOptions"` not necessarily less verbose, but a little easier to understand. To accomplish this, each `formly-field` adds a `value` function on the scope. It is a traditional getter/setter for you to use in your templates. For more information on ng-model-options, see [these](https://egghead.io/lessons/angularjs-new-in-angular-1-3-ng-model-options-getters-and-setters) [egghead](https://egghead.io/lessons/angularjs-new-in-angular-1-3-ng-model-options-updateon-and-debounce) [lessons](https://egghead.io/lessons/angularjs-new-in-angular-1-3-ngmodeloptions-allows-you-to-set-a-timezone-on-your-model).

##### Default
>`{ getterSetter: true, allowInvalid: true }`

---
##### watcher (object|array of watches)
>`watcher` is an object which has at least two properties called `expression` and `listener`. The `watch.expression` is added to the `formly-form` directive's scope. If it's a function, it will be wrapped and called with the field as the first argument, followed by the normal arguments for a watcher, followed the watcher's `stop` function. If it's not defined, it will default to the value of the field. The `listener` will also be wrapped and called with the field as the first argument, followed by the normal arguments for a watch listener. You can also specify a type (`$watchCollection` or `$watchGroup`) via the `type` property (defaults to `$watch`) and whether you want it to be a deep watch via the `deep` property (defaults to `false`).

How the api differs from a normal `$watch`:

```javascript
// normal watcher
$scope.$watch(function expression(theScope) {}, function listener(newValue, oldValue, theScope) {});

// field watcher
$scope.$watch(function expression(field, theScope, stop) {}, function listener(field, newValue, oldValue, theScope, stop) {});
```

###### Default
>`undefined`

---
##### validators (object)
>`validators` is an object where the keys are the name of the validity (to be passed to `$setValidity`) and the values are functions or expressions which returns true if it is valid. Templates can pass this option to the `formly-custom-validation` directive which will add a parser (or validator, see note) to the `ngModel` controller of the field. The validator can be a function or string expression and will be evaluated using `formlyEval` from `formlyUtils` see below for more information. **Note:** Formly will utilize the `$validators` pipeline (introduced in angular 1.3) if available, otherwise it will fallback to `$parsers`. If you are using angular 1.3, you can also use the `$asyncValidators` pipeline by adding the property `isAsync = true` to your validator function.

###### Default
>`undefined`

## Other Notes

### CSS Classes

The resulting form element has the class `formly` and each field has the class `formly-field`.

### Validation

Formly uses angular's built-in validation mechanisms. See the [angular docs](https://docs.angularjs.org/guide/forms) for more information on this. (Note, if you're using Angular 1.3, formly utilizies the new `$validators` and `$asyncValidators` pipelines, otherwise, it falls back to good old `$parsers`. Either way, your API is the same, though you can't do asynchornous validation with 1.2.x).

The form controller is bound to what you specify as the `form` attribute on the `formly-form` directive. Make sure to specify a name on any `ng-model` in your custom templates to ensure that the `formControl` is added to the `options`. If you're using Angular 1.3, the `name` attribute is interpolateable (you can use `{{id}}`). If you are stuck on 1.2.x, you can use the `formly-dynamic-name` directive where the value is an expression which would return the name (so, `formly-dynamic-name="id"`). Formly will add a `formControl` property to the field, and you can reference that in your template with `options.formControl` to get access to properties like `$invalid` or `$error`. See the bootstrap templates for an example.

You can also specify custom validation in your JSON. See the field called `validators` for more information on this. If you wish to leverage this in a custom template, use the `formly-custom-validation` directive and pass `options.validators` to it.

### Global Config

#### formlyConfigProvider

You can configure formly to use custom templates for specified types (your own "text" template) by injecting the `formlyConfigProvider` in your app's `config` function. The `formlyConfigProvider` has the following functions:

##### setTemplateUrl

Allows you to set a template

```javascript
formlyConfigProvider.setTemplateUrl('radio', 'views/custom-formly-radio.html');
formlyConfigProvider.setTemplateUrl('checkbox', 'views/custom-formly-checkbox.html');

// the same can be accomplished with

formlyConfigProvider.setTemplateUrl({
	radio: 'views/custom-formly-radio.html',
	checkbox: 'views/custom-formly-checkbox.html'
});
```

##### getTemplateUrl

Allows you to get the template

```javascript
formlyConfigProvider.setTemplateUrl('radio', 'views/custom-formly-radio.html');
formlyConfigProvider.getTemplateUrl('radio') === 'views/custom-formly-radio.html'; // true
```

##### setTemplate & getTemplate

Work pretty much the same as the their url counterparts, except they accept an actual template string rather than a url.

##### disableWarnings

Formly gives some useful warnings when you attempt to use a template that doesn't exist or there's a problem loading a template. You can disable these warnings via `formlyConfigProvider.disableWarnings = true`

## Tips and Tricks

Please see [the Wiki](https://github.com/formly-js/angular-formly/wiki) for tips and tricks from the community.

### Expressions

There are four places where you can put expressions. The context in which these expressions are evaluated is important. There are two different types of context and each is explained below:

1) watcher - expression and listener can be functions or expression strings. This is a regular angular `$watch` (depending on the specified `type`) function and it is created on the `formly-form` scope, despite being applied to a specific field. This allows the expressions to run even if the field's scope has been destroyed (via an ng-if like when the field is hidden). The function signature differs from a normal `$watch` however. See above for more details.

2) expressionProperties & validators - these expressions can be functions or expression strings. If it's a function, it's invoked with the arguments `$viewValue`, `$modelValue`, and `scope`. The scope in this case, is the field's scope. If it's an expression string, it is evaluated using `$scope.$eval` with a locals object that has `$viewValue` and `$modelValue` (however, in the case of `expressionProperties`, `$viewValue` will simply be the `$modelValue` because they don't have a hook into the `ngModelController` but we want to keep the api consistent).

## Roadmap

- Perhaps integrate with [angular-form-builder](http://kelp404.github.io/angular-form-builder/)

## Contributing

Please see the [CONTRIBUTING Guidelines](CONTRIBUTING.md).

## Thanks

A special thanks to [Nimbly](http://gonimbly.com) for creating/sponsoring Angular-Formly's development.
Thanks to [Kent C. Dodds](https://github.com/kentcdodds) for his continued support on the project.
