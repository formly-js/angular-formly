## Formly
Formly for Angular is an AngularJS module which has directives to help customize and render JSON based forms. The directive originated from a need to allow our users to create surveys and distribute them easily. Currently we've can render the form data from JSON and assign a model to form so we can receive the submitted data.

	<formly-form result="formData" fields="formFields" options="formOptions" ng-submit="onSubmit()">
	</formly-form>

### Demo : http://Nimbly.github.io/angular-formly/

## Dependencies
- Required to use Formly:
 - Angular
 - Twitter Bootstrap (CSS Only)

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

You can add a formly-form in your HTML templates as shown below.
```html
	<formly-form result="formData" fields="formFields" options="formOptions" ng-submit="onSubmit()">
	</formly-form>
```  

Example data as it would be set in the controller
```javascript
	$scope.formData = {};
	$scope.formFields = [
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

	$scope.formOptions = {

		//Set the id of the form
		uniqueFormId: 'myFormId',

		//Hide the submit button that is added automaticaly
		//default: false
		hideSubmit: false,

		//Set the text on the default submit button
		//default: Submit
		submitCopy: 'Login'
	};

	$scope.onSubmit = function() {
		console.log('form submitted:', $scope.formData);
	};
```
### Creating Forms
Forms can be customized with the options below.

#### uniqueFormId (string, required)
This is used to identify the form.

#### hideSubmit (boolean, optional)
Hides the submit button. Defaults to false.

#### submitCopy (boolean, optional)
Customize the submit button copy. Defaults to 'Submit'.

### Creating Form Fields
When constructing fields use the options below to customize each field object. You must set at least a `type` or `templateUrl`.

##### type (string)
>`type` is the type of field to be rendered. Either type or templateUrl must be set.

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
##### templateUrl (string)
>`templateUrl` can be set instead of `type` to use a custom html template form field. Set a path relative to the root of the application. ie `directives/custom-field.html`

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
##### disabled (boolean)
>`disabled` is used to add the disabled attribute to a form field.

###### Default
>`undefined`

---
##### placeholder (string)
>`placeholder` is used to add placeholder text to some inputs.

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

##### default (string, optional) 
>The default can be set to the `value` of one of the `options`.

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
		"type": "hidden",
		"default": "hidden_code"
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
