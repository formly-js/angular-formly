[![Build Status](https://travis-ci.org/formly-js/angular-formly.svg)](https://travis-ci.org/formly-js/angular-formly)
[![Coverage Status](https://img.shields.io/coveralls/formly-js/angular-formly.svg)](https://coveralls.io/r/formly-js/angular-formly)

## Angular-Formly: Bootstrap Template
This is a template for Angular-Formly which adds template basic files with no css classes. Each field is wrapped in a div. This library is not standalone and requires angular-formly to be present and loaded.

Example text field:
```html
	<div>
		<label for="{{id}}">
			{{options.label || 'Text'}}
			{{options.required ? '*' : ''}}
		</label>
		<input type="text"
		       id="{{id}}"
		       formly-dynamic-name="options.key"
		       formly-custom-validation="options.validators"
		       placeholder="{{options.placeholder}}"
		       aria-describedby="{{id}}_description"
		       ng-required="options.required"
		       ng-disabled="options.disabled"
		       ng-model="result[options.key || index]">
		<p id="{{id}}_description" ng-if="options.description">{{options.description}}</p>
	</div>
```

### Demo : http://formly-js.github.io/angular-formly-templates-bootstrap/

## Dependencies
- Required to use Formly:
 - Angular
 - Angular-Formly

- Dev dependencies to build Formly
 - npm


See `bower.json` and `index.html` in the `master` branch for a full list / more details

## Install in your project
- Install [Angular-Formly](https://github.com/formly-js/angular-formly)

- Install Angular-Formly: Bootstrap Templates
 `$ bower install angular-formly-templates-bootstrap --save`

- Include the javascript file in your index.html, Formly comes in the following flavors:
 `<script src="bower_components/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.min.js"></script>`

## Documentation

See [Angular-Formly](https://github.com/formly-js/angular-formly) for formly core documentation.

### Common Properties

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

### Fields

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

## Contributing

Please see the [CONTRIBUTING Guidelines](CONTRIBUTING.md).

## Thanks

A special thanks to [Nimbly](http://gonimbly.com) for creating/sponsoring Angular-Formly's development.
Thanks to [Kent C. Dodds](https://github.com/kentcdodds) for his continued support on the project.
