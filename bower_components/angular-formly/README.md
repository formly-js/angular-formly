[![Build Status](https://travis-ci.org/formly-js/angular-formly.svg)](https://travis-ci.org/formly-js/angular-formly)
[![Coverage Status](https://img.shields.io/coveralls/formly-js/angular-formly.svg)](https://coveralls.io/r/formly-js/angular-formly)

## Formly
Formly for Angular is an AngularJS module which has directives to help customize and render JSON based forms. The directive originated from a need to allow our users to create surveys and distribute them easily. Currently we've can render the form data from JSON and assign a model to form so we can receive the submitted data.

```html
	<formly-form result="formData" fields="formFields" options="formOptions" ng-submit="onSubmit()">
	</formly-form>
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

You can add a formly-form in your HTML templates as shown below.
```html
	<formly-form result="formData" fields="formFields" options="formOptions" ng-submit="onSubmit()">
		<button type="submit">Hello World</button>
	</formly-form>
```  

Example data as it would be set in the controller
```javascript
	$scope.formData = {};
	$scope.formFields = [
		{
			//the key to be used in the result values {... "username": "johndoe" ... }
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
			hideExpression: '!username' // hide when username is blank
		}

	];

	$scope.formOptions = {
		//Set the id of the form
		uniqueFormId: 'myFormId'
	};

	$scope.onSubmit = function() {
		console.log('form submitted:', $scope.formData);
	};
```
### Creating Forms
Forms can be customized with the options below.

### Creating Form Fields
When constructing fields use the options below to customize each field object. You must set at least a `type`, `template`, or `templateUrl`.

##### type (string)
>`type` is the type of field to be rendered. Either type, template, or templateUrl must be set.

###### Default
>`null`

###### Values
> [`text`](#text-form-field),
> [`textarea`](#textarea-form-field),
> [`radio`](#radio-form-field)
> [`select`](#select-form-field)
> [`number`](#number-form-field)
> [`checkbox`](#checkbox-form-field),
> [`password`](#password-form-field),
> [`hidden`](#hidden-form-field),
> [`email`](#email-form-field)

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
>By default form results are keyed by location in the form array, you can override this by specifying a `key`. 

###### Default
>`undefined`

---
##### label (string)
>`label` is used to add an html label to each field.

###### Default
>A default is set for each field based on its type. ie `Text`, `Checkbox`, `Password`

---
##### required (boolean)
>`required` is used to add the required attribute to a form field.

###### Default
>`undefined`

---
##### requiredExpression (expression string)
>`requiredExpression` is used to conditionally require the input. Evaluates on the `result` and uses the `required` property on the field.

###### Default
>`undefined`

---
##### hideExpression (expression string)
>`hideExpression` is used to conditionally show the input. Evaluates on the `result` and uses the `hide` property on the field.

###### Default
>`undefined`

---
##### hide (boolean)
>`hide` is used to conditionally show the input. When true, the input is hidden (meant to be used with a watch).

###### Default
>`undefined`

---
##### disabled (boolean)
>`disabled` is used to add the disabled attribute to a form field.

###### Default
>`undefined`

---
##### placeholder (string)
>`placeholder` is used to add placeholder text to some inputs.

###### Default
>`undefined`

---
##### description (string)
>`description` is used to add descriptive text to all inputs.

###### Default
>`undefined`

---
##### data (*)
>`data` is reserved for the developer. You have our guarantee to be able to use this and not worry about future versions of formly overriding your usage and preventing you from upgrading :-)

###### Default
>`undefined`

---
##### watch.expression (object)
>`watch` has two properties called `expression` and `listener`. The `watch.expression` is added to the formly directive's scope. If it's a function, it will be wrapped and called with the field as the first argument, followed by the normal arguments for a watcher. The `listener` will also be wrapped and called with the field as the first argument, followed by hte normal arguments for a watch listener.

For example:

```javascript
// normal watcher
$scope.$watch(function expression(theScope) {}, function listener(newValue, oldValue, theScope) {});

// field watcher
$scope.$watch(function expression(field, theScope) {}, function listener(field, newValue, oldValue, theScope) {});
```

###### Default
>`undefined`

---
##### validators (object|array)
>`validators` is an object or array of validator objects. A validator has two properties called `name` and `validate`. Templates can pass this option to the `formly-custom-validation` directive which will add a parser to the `ngModel` controller of the field. The `validate` property can be a function which is passed the `$viewValue` of the field and the field's scope. It can also be an expression which will be evaluated with `value` (the `$viewValue`), `result`, and `options` of the field available. The `name` property is used as the name of the validity state (the name of the object on `$error`).

###### Default
>`undefined`

### Form Fields
Below is a detailed description of each form fields and its custom properties.

#### Text form field
>The text field allows single line input with a input element set to `type='text'`. It doesn't have any custom properties.

##### default (string, optional)

_Example text field_
```json
	{
		"type": "text",
		"key": "firstName",
		"placeholder": "jane doe",
		"label": "First name"
	}
```

---
#### Textarea form field
>The textarea field creates multiline input with a textarea element.

##### default (string, optional)

##### lines (number, optional)
>`lines` sets the rows attribute for the textarea element. If unset, the default is 2 lines.

_Example textarea field_
```json
	{
		"type": "textarea",
		"key": "about",
		"placeholder": "I like puppies",
		"label": "Tell me about yourself",
		"lines": 4
	}
```

---
#### Checkbox form field
>The checkbox field allows checkbox input with a input element set to `type='checkbox'`. It doesn't have any custom properties.

##### default (boolean, optional)

_Example checkbox field_
```json
	{
		"type": "checkbox",
		"key": "checkThis",
		"label": "Check this box",
		"default": true
	}
```

---
#### Radio form field
>The radio field allows multiple choice input with a series of linked inputs, with `type='radio'`.

##### options (array, required)
>`options` is an array of options for the radio form field to display. Each option should be an object with a `name`(string) and `value`(string or number).

_Example radio field_
```json
	{
		"key": "triedEmber",
		"type": "radio",
		"label": "Have you tried EmberJs yet?",
		"default": "no",
		"options": [
			{
				"name": "Yes, and I love it!",
				"value": "yesyes"
			},
			{
				"name": "Yes, but I'm not a fan...",
				"value": "yesno"
			},
			{
				"name": "Nope",
				"value": "no"
			}
		]
	}
```

---
#### Select form field
>The select field allows selection via dropdown using the select element.

##### default (number, optional)
>The default can be set to the index of one of the `options`.

##### options (array, required)
>`options` is an array of options for the select form field to display. Each option should be an object with a `name`(string). You may optionally add a `group` to some or all of your options.

_Example select field_
```json
	{
		"key": "transportation",
		"type": "select",
		"label": "How do you get around in the city",
		"options": [
			{
				"name": "Car"
			},
			{
				"name": "Helicopter"
			},
			{
				"name": "Sport Utility Vehicle"
			},
			{
				"name": "Bicycle",
				"group": "low emissions"
			},
			{
				"name": "Skateboard",
				"group": "low emissions"
			},
			{
				"name": "Walk",
				"group": "low emissions"
			},
			{
				"name": "Bus",
				"group": "low emissions"
			},
			{
				"name": "Scooter",
				"group": "low emissions"
			},
			{
				"name": "Train",
				"group": "low emissions"
			},
			{
				"name": "Hot Air Baloon",
				"group": "low emissions"
			}
		]
	}
```

---
#### Number form field
>The number field allows input that is restricted to numbers. Browsers also provide minimal ui to increase and decrease the current value.

##### default (number, optional)

##### min (number, optional)
>`min` sets minimum acceptable value for the input.

##### max (number, optional)
>`max` sets maximum acceptable value for the input.

##### minlength (number, optional)
>`minlength` sets minimum number of characters for the input. If a number less than this value it will not be submitted with the form. eg 1000 is 4 characters long and if `minlength` is set to 5, it would not be sent. Currently there is no error displayed to the user if they do not meet the requirement.

##### maxlength (number, optional)
>`maxlength` sets maximum number of characters for the input. If a number is greater than this value it will not be submitted with the form. eg 1000 is 4 characters long and if `maxlength` is set to 2, it would not be sent. Currently there is no error displayed to the user if they do not meet the requirement.

_Example number field_
```json
	{
		"key": "love",
		"type": "number",
		"label": "How much love?",
		"default": 2,
		"min": 0,
		"max": 100,
		"required": true
	}
```

---
#### Password form field
>The password field allows password input, it uses an input with `type='password'`.
##### default (string, optional)

##### trimWhitespace (boolean, optional)
Unlike other formly fields, which use Angular's default setting to trim leading and trailing whitespace, the password field captures whitespace. You can override this by setting `trimWhitespace` to `true`.

_Example password field_
```json
	{
		"key": "password",
		"type": "password",
		"label": "Password"
	}
```

---
#### Hidden form field
>The hidden field allows hidden input, it uses an input with `type='hidden'`.

##### default (number or string, required)

_Example password field_
```json
	{
		"key": "hiddenCode",
		"type": "hidden"
	}
```

---
#### Email form field
>The email field allows email input, it uses an input with `type='email'`. Browsers will provide basic email address validation by default.

##### default (string, optional)

_Example password field_
```json
	{
		"key": "email",
		"type": "email",
		"placeholder": "janedoe@gmail.com"
	}
```

## Other Notes

### Validation

Formly uses angular's built-in validation mechanisms. See the [angular docs](https://docs.angularjs.org/guide/forms) for more information on this.

The form name is what you specify on the `formly-form` directive as the `name` attribute. If you're using a custom template, to specify a field name use the `formly-dynamic-name` directive where the value is an expression which would return the name. This expression is only run once, and it is run immediately. Formly will add a `formField` property to the field, and you can reference that in your template with `options.formField` to get access to properties like `$invalid` or `$error`. See the bootstrap templates for an example.
 
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

## Tips and Tricks

Please see [the Wiki](https://github.com/formly-js/angular-formly/wiki) for tips and tricks from the community.

## Roadmap

- Split out the templates into other repositories

## Contributing

Please see the [CONTRIBUTING Guidelines](CONTRIBUTING.md).

## Thanks

A special thanks to [Nimbly](http://gonimbly.com) for creating/sponsoring Angular-Formly's development.
Thanks to [Kent C. Dodds](https://github.com/kentcdodds) for his continued support on the project.
