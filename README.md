[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/formly-js/angular-formly?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/formly-js/angular-formly.svg)](https://travis-ci.org/formly-js/angular-formly)

# angular-formly

Formly for Angular is an AngularJS module which has directives to help customize and render JavaScript configured forms.
The directive originated from a need to allow our users to create surveys and distribute them easily. Buckle up, because
angular-formly is very powerful.

```html
<formly-form model="formData" fields="formFields"></formly-form>
```

## NOTICE: UPGRADING FROM 2.0 to 3.0?

There were some [significant changes](https://github.com/formly-js/angular-formly/blob/master/CHANGELOG.md) that you'll
want to be aware of. In order to upgrade and get all the cool features, you're going to need to change your field
configurations. [Here is a tool](http://jsbin.com/ruwoke) that should help make that process easier. Also, if you are
not able to update the configuration very easily, see
[this issue](https://github.com/formly-js/angular-formly/issues/162) for ideas on how to ease things a little.

## Demo

http://formly-js.github.io/angular-formly/

## NG-NL Talk

[![JavaScript Powered Forms](other/ng-nl-talk.png)](http://youtu.be/o90TMDL3OYc)

## Dependencies

 - [Angular](https://angularjs.org/) - HTML enhanced for web apps
 - [apiCheck.js](https://github.com/kentcdodds/apiCheck.js) - VanillaJS version of ReactJS propTypes

## Install in your project
1. Install with bower or npm (or just download the script)

 `$ bower install angular api-check angular-formly --save`

 or

 `$ npm install angular api-check angular-formly --save`

2. Include the javascript file in your index.html, Formly without any form templates. You can create your own or use
some of our prebuilt templates which cover basic form types, then extend with your own as needed.

```html
<script src="node_modules/api-check/dist/apiCheck.min.js"></script>
<script src="node_modules/angular/angular.min.js"></script>
<script src="node_modules/angular-formly/dist/formly.min.js"></script>
```

and

```javascript
angular.module('yourModule', ['formly']);
```

or

```javascript
var angular = require('angular');
angular.module('yourModule', [require('angular-formly')]);
```

### Prebuilt Templates

While it is recommended to create your own templates for ultimate customization and flexibility, there are prebuilt
templates you can use:

 - [Vanilla HTML](https://github.com/formly-js/angular-formly-templates-vanilla)
 - [Bootstrap](https://github.com/formly-js/angular-formly-templates-bootstrap)
 - [LumX](https://github.com/formly-js/angular-formly-templates-lumx)
 - [angular-material](https://github.com/formly-js/angular-formly-templates-material) (WIP)
 - [Ionic](https://github.com/formly-js/angular-formly-templates-ionic): (WIP, owner needed)
 - [Foundation](https://github.com/formly-js/angular-formly-templates-foundation): (WIP, owner needed)

### DIY Templates

Regardless of which flavor you use (or if you use no flavor at all), you can create your own templates with
`formlyConfigProvider`. This is the recommended approach if you want to customize your templates at all.

## Documentation

*Note:* This `README.md` is for the latest version of `formly`. Be sure to check that you're reading the right docs!

`https://github.com/formly-js/angular-formly/tree/{{YOUR_VERSION}} <-- insert your version`

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
    type: 'input',
    templateOptions: {
      label: 'Username',
      placeholder: 'johndoe',
      required: true,
      description: 'Descriptive text'
    }
  },
  {
    key: 'password',
    type: 'input',
    templateOptions: {
      type: 'password',
      label: 'Password',
      required: true
    },
    expressionProperties: {
      'templateOptions.disabled': '!model.username' // disabled when username is blank
    }
  }
];

$scope.onSubmit = function() {
  console.log('form submitted:', $scope.formData);
};
```

### Creating Form Fields
When constructing fields use the options below to customize each field object. You must set at least a `type`,
`template`, or `templateUrl`.

### Valid field options

You can only specify these properties. Additional properties will result in an error. If you need custom properties, use
`templateOptions` or `data`.

##### type (string)
>`type` is the type of field to be rendered. Either type, template, or templateUrl must be set.

---
##### template (string)
>`template` can be set instead of `type` or `templateUrl` to use a custom html template form field. Should be used with
one-liners mostly (like a directive). Useful for adding functionality to fields.

**Note:** This can be used to add HTML instead of a form field.

Examples:
```html
template: '<p>Some text here</p>'
```

```html
template: '<hr />'
```

---
##### templateUrl (string)
>`templateUrl` can be set instead of `type` or `template` to use a custom html template form field. Set a path relative
to the root of the application. ie `directives/custom-field.html`

---
##### key (string)
>By default form models are keyed by location in the form array, you can override this by specifying a `key`.

---
##### hide (boolean)
>Whether to hide the field (uses `ng-if`)

---
##### model (object)
>By default, the `model` passed to the `formly-field` directive is the same as the `model` passed to the `formly-form`.
However, if the field has a `model` specified, then the specified `model` is used for that field (and that field only).
Also, a deep watch is added to the `formly-field` directive's scope to run the `expressionProperties` when the specified
`model` changes.

---
##### expressionProperties (object)
>`expressionProperties` is an object where the key is a property to be set on the main field config (can be an angular
expression) and the value is an expression used to assign that property. The expression can be a function or string
expression and will be evaluated using `formlyEval` from `formlyUtils` see below for more information. The returned
value is wrapped in `$q.when` so you can return a promise from your function :-)

For example:

```javascript
vm.fields = [
  {
    key: 'myThing',
    type: 'someType',
    expressionProperties: {
      'templateOptions.label': '$viewValue', // this would make the label change to what the user has typed

       // this would set that property on data to be whether or not model.myThing.length > 5
      'data.someproperty.somethingdeeper.whateveryouwant': 'model.myThing.length > 5'
    }
  }
];
```

---
##### data (*)
>`data` is reserved for the developer. You have our guarantee to be able to use this and not worry about future versions
of formly overriding your usage and preventing you from upgrading :-)

---
##### templateOptions (*)
>`templateOptions` is reserved for the templates. Any template-specific options go in here. Look at your specific
template implementation to know the options required for this.

---
##### wrapper (string|array of strings)
>`wrapper` makes reference to `setWrapper` in the formlyConfigProvider. It is expected to be the name of the wrapper
specified there. The formly field will be wrapped by the first wrapper, then the second, then the third, etc.

---
##### ngModelAttrs (object)
>`ngModelAttrs` is used in an angular-formly created templateManipulator to automatically add attributes to the ng-model
element of field templates. You will likely not use this often. This object is a little complex, but extremely powerful.
It's best to explain this api via an example. See the bottom for the example of this api.

---
##### controller (controller name|controller function)
>`controller` is a great way to add custom behavior to a specific field. You can also set the controller to a type as
well. It is injectable with the $scope of the field, and anything else you have in your injector.

---
##### link (link function)
>`link` allows you to specify a link function. It is invoked after your template has finished compiling. You are passed
the normal arguments for a normal link function.

---
##### optionsTypes (string|array of strings)
>`optionsTypes` allows you to specify extra types to get options from. Duplicate options are overridden in later
priority (index `1` will override index `0` properties). Also, these are applied *after* the `type`'s `defaultOptions`
and hence will override any duplicates of those properties as well.

---
##### modelOptions (object)
>`modelOptions` allows you to take advantage of `ng-model-options` directive. Formly's built-in templateManipulator (see
below) will add this attribute to your `ng-model` element automatically if this property exists. Note, if you use the
`getter/setter` option, formly's templateManipulator will change the value of `ng-model` to `options.value` which is a
getterSetter that formly adds to field options. For more information on ng-model-options, see
[these](https://egghead.io/lessons/angularjs-new-in-angular-1-3-ng-model-options-getters-and-setters)
[egghead](https://egghead.io/lessons/angularjs-new-in-angular-1-3-ng-model-options-updateon-and-debounce)
[lessons](https://egghead.io/lessons/angularjs-new-in-angular-1-3-ngmodeloptions-allows-you-to-set-a-timezone-on-your-model).

---
##### watcher (object|array of watches)
>`watcher` is an object which has at least two properties called `expression` and `listener`. The `watch.expression` is
added to the `formly-form` directive's scope. If it's a function, it will be wrapped and called with the field as the
first argument, followed by the normal arguments for a watcher, followed the watcher's `stop` function. If it's not
defined, it will default to the value of the field. The `listener` will also be wrapped and called with the field as the
first argument, followed by the normal arguments for a watch listener. You can also specify a type (`$watchCollection`
or `$watchGroup`) via the `type` property (defaults to `$watch`) and whether you want it to be a deep watch via the
`deep` property (defaults to `false`).

How the api differs from a normal `$watch`:

```javascript
// normal watcher
$scope.$watch(function expression(theScope) {}, function listener(newValue, oldValue, theScope) {});

// field watcher
$scope.$watch(function expression(field, theScope, stop) {}, function listener(field, newValue, oldValue, theScope, stop) {});
```

---
##### validators (object)
>`validators` is an object where the keys are the name of the validity (to be passed to `$setValidity`) and the values
are functions or expressions which returns true if it is valid. Templates can pass this option to the
`formly-custom-validation` directive which will add a parser (or validator, see note) to the `ngModel` controller of
the field. The validator can be a function or string expression and will be evaluated using `formlyEval` from
`formlyUtils` see below for more information.

>**Async validation**: All function validators can return true/false/Promise. A validator passes if it returns true or
a promise that is resolved. A validator fails if it returns false or a promise that is rejected.

>**1.2**: Formly defaults to use the `$validators` api, which is only available in angular 1.3. If you are using 1.2,
then the `$parsers` api is used which doesn't support async validation out of the box. However, formly will keep track
of the validations for you and ensure that the most recently resolved/rejected promise is what takes priority. Also,
while the validation is in flight, formly emulates the `$pending` api of 1.3 for your use in 1.2 as well, so you can
safely use this and upgrade to 1.3 without worrying about the upgrade path for this api. You're welcome :-)

> **NOTE**: You can alternatively specify a validator as an object with an `expression` and a `message`. This will
unify how templates reference messages for when the validator has failed. Also, this should be used only for one-off
messages (use `ng-messages-include` for generic messages). `message` in this case should be an expression that is
evaluated in exactly the same way a validator is evaluated. The `formly-custom-validation` directive will then add an
object to the field options called `validationMessages` which is a map of functions where the key is the validation name
and the value is a to function which returns the evaluated message.

---
##### validation (object)
>`validation` is an object with a few useful properties mostly handy when used in combination with ng-messages

>`validation.messages` a map of functions mapped to message names. These messages come from the validators. Invoke
these and angular-formly will evaluate them using `formlyUtil.formlyEval` (which is how validators themselves are
evaluated.

>`validation.errorExistsAndShouldBeVisible` a boolean indicating whether an error message should be shown. Because you
generally only want to show error messages when the user has interacted with a specific field, this value is set to
true based on this rule: `field invalid && (field touched || validation.show)`

>`validation.show` is a boolean you as the developer can set to specify to force `errorExistsAndShouldBeVisible`
to be set to true when there are `$errors`. This is useful when you're trying to call the user's attention to some
fields for some reason.

## Added Properties

Formly will add a few properties to your field config for convenience in templates

### formControl

This is the [NgModelController](https://docs.angularjs.org/api/ng/type/ngModel.NgModelController) for the field. It
provides you with awesome stuff like `$errors` :-)

### value

This is a getter/setter function for the value that your field is representing. Useful when using `getterSetter: true`
in the `modelOptions` (in fact, if you don't disable the templateManipulator that comes built-in with formly, it will
automagically change your field's `ng-model` attribute to use `value`.

### runExpressions

It is not likely that you'll ever want to invoke this function. It simply runs the `expressionProperties` expressions.
It is used internally and you shouldn't have to use it, but you can if you want to.

## CSS Classes

The resulting form element has the class `formly` and each field has the class `formly-field`.

## Validation

Formly uses angular's built-in validation mechanisms. See the [angular docs](https://docs.angularjs.org/guide/forms) for
more information on this. (Note, if you're using Angular 1.3, formly utilizies the new `$validators` and
`$asyncValidators` pipelines, otherwise, it falls back to good old `$parsers`. Either way, your API is the same, though
you can't do asynchornous validation with 1.2.x).

The form controller is bound to what you specify as the `form` attribute on the `formly-form` directive. Make sure to
specify a name on any `ng-model` in your custom templates to ensure that the `formControl` is added to the `options`. If
you're using Angular 1.3, the `name` attribute is interpolateable (you can use `{{id}}`). If you are stuck on 1.2.x, you
can use the `formly-dynamic-name` directive where the value is an expression which would return the name (so,
`formly-dynamic-name="id"`). Formly will add a `formControl` property to the field, and you can reference that in your
template with `options.formControl` to get access to properties like `$invalid` or `$error`. See the bootstrap templates
for an example.

You can also specify custom validation in your JSON. See the field called `validators` for more information on this. If
you wish to leverage this in a custom template, use the `formly-custom-validation` directive and pass
`options.validators` to it.

## directives

### formly-form

This the the main directive you'll use throughout your code. A word of advice, create your own directive that wraps this
one. This will make any upgrades easier if the api changes at all. If you want an example of how to do this, file an
issue and I'll demonstrate :-D

The attributes allowed on the directive are as follows:

#### model

The model to be represented by the form.

#### fields

The field configurations for building the form

#### form

The variable to bind the `NgFormController` to.

#### root-el

You will not likely use this often. The value given will control what is used for the formly-form's root element. It
defaults to an `ng-form`, but if you want it to use a `form` or a `div` then you would specify `root-el="form"` or
`root-el="div"` (respectively). If you choose anything except a `form` or `ng-form`, make sure to wrap it in your own
`ng-form` or `form` and provide that with a `name`. Then pass that `name` to the `form` attribute so all the
`formControls` of the fields will have somewhere to be added to.

### formly-field

You will not likely need to use this directive, but if you do just know that unless you're using it inside `formly-form`
you're fields are not going to get all the treatment (like `watchers` for example).

#### options

The field config. Must have a `type` OR `template` OR `templateUrl`. Everything else is optional, but it is limited to
the options mentioned above. Any extra options will result in an error.

#### model

The model for the field to represent

#### formId

The id of the form, used to generate the id for the field which is used in the `name` (for the `formControl`) and the id
of the field (useful for a `label`'s `for` attribute)

#### index

The index of the field, used if `key` is not defined on the field.

#### fields

The other fields. As convenience if needed.

#### form

The `NgFormController` that will be used to get and set the `formControl` for the field.

### formly-custom-validation

This is an attribute directive. The given value should be a `validators` object.

### formly-focus

This is an attribute directive. It will watch the given value and focus the element when the given value is truthy. You
can also optionally add a `refocus` attribute and this will cause focus to be returned to the previous element with
focus when the `formly-focus` value is set to falsey (unless the user has clicked away from the focused element).

## formlyConfigProvider

This is where you'll be configuring angular-formly to inform it of your templates and other options. You can do most
things in either the `config` function with the `formlyConfigProvider` or in the `run` function with the `formlyConfig`.

### setType

Allows you to specify a custom type

```javascript
// object api (single type with a template)
formlyConfig.setType({
  name: 'input',
  template: '<input ng-model="[options.key]" />'
});
// with a templateUrl
formlyConfig.setType({
  name: 'checkbox',
  templateUrl: 'custom-formly-fields-checkbox.html'
});

// array api (multiple types)hi
formlyConfig.setType([
  {
    name: 'radio',
    templateUrl: 'custom-formly-fields-radio.html'
  },
  {
    name: 'button',
    templateUrl: '<button ng-click="options.templateOptions">{{options.label}}</button>'
  }
]);

// also, you can specify wrappers for a type
formlyConfig.setType({
  name: 'select',
  templateUrl: 'custom-formly-fields-select.html',
  wrapper: ['inner', 'outer', 'evenOuterOuter']
});

// you can also set default options for fields of this type. This can be done with or without a template or templateUrl
// useful when combined with the field's `optionsTypes` property.
formlyConfig.setType({
  name: 'phone',
  defaultOptions: {
    templateOptions: {
      pattern: '^1[2-9]\d{2}[2-9]\d{6}$'
    }
  }
});

// you also have the option to specify a controller and a link function
formlyConfig.setType({
  name: 'uploadButton',
  controller: function($scope, $upload) {
    $scope.onUploadClicked = function(file) {
      return $upload.start(file); // whatever...
    }
  },
  link: function(scope, el) {
    el.addClass('manipulate-the-dom');
  }
});
```

#### name (string, required)

The name of the template type. You use this in the `type` option of a field.

#### template (string)

The template for the field. This is required if there is no `templateUrl` or `defaultOptions`. Angular-formly will throw
an error if this is present with a `templateUrl` (but works fine with `defaultOptions`).

#### templateUrl (string)

A url pointing to a template for the field. This is required if there is no `template` or `defaultOptions`.
Angular-formly will throw an error if this is present with a `template` (but works fine with `defaultOptions`).

#### defaultOptions (object|function)

Options to be used by default for the field. These are merged with the field options for all fields of this type as well
as all fields specifying this type as an `optionsTypes`. This is required if there is no `template` or `templateUrl`
specified. And works fine if supplied in addition to either. If a function is supplied, it will be passed the options of
the field and is supposed to return the default options (don't do the merging yourself, just pass what you want to be
used for the default for this configuration).

#### extends (string)

This allows you to extend the functionality of other types. It merges the options specified with the parent's options
and it will even gracefully handle situations where the parent has link/controller/defaultOptions functions as well.
Note: in the case of a wrapper conflict, don't use this feature as it just gets too complicated, create a new type
instead.

#### wrapper (string|array of strings)

Specify the name of wrappers that you want fields of this type to be wrapped in by default.

#### controller (string|injectable function)

This function will be invoked (using the `$controller` service) at the end of the `formly-field` controller (before the
field's `controller` if specified). It can inject anything in the `$injector` as well as the `$scope` of the
`formly-field`. If it is a string, it must be the name of a controller that has been registered with angular. If this
type extends another, this function will be run *after* the parent controller function is run.

#### link (function)

This function will be invoked after the `formly-field` link function has been invoked (before the field's `link` if
specified). It is invoked with all the normal arguments of a regular link function. If the type extends another, this
function will be run *after* the parent link function is run.

#### apiCheck (objectOf(func))

This is specific to the use of the `apiCheck.js` library. This is the preferred method for validating options as it
allows for tooling to discover what the api to your type is.

```javascript
ngModule.constant('yourOwnCheck', apiCheck({
  output: {prefix: 'you app/lib name'}
}));
ngModule.run(function(formlyConfig, yourOwnCheck) {
  formlyConfig.setType({
    name: 'input',
    template: '<input class="to.className" ng-model="model[options.key]" />',
    apiCheck: {
      templateOptions: yourOwnCheck.shape({
        className: yourOwnCheck.string
      })
    },
    apiCheckInstance: yourOwnCheck
  });
});
```

#### apiCheckInstance (apiCheck instance)

Your own instance of apiCheck so you have the correct prefix/suffix/url/etc.

#### apiCheckFunction ('throw' or 'warn')

Allows you to customize whether your check throws and error or simple warns. Defaults to warn.

#### apiCheckOptions (object)

The options to use when the check fails. Defaults to something sensible.

#### validateOptions (function)

Note: It is recommended that you use `apiCheck` with `apiCheckInstance` rather than `validateOptions`.

This function will be invoked with the options of the field after it has been merged with it's `optionsDefaults` and
any types that its type `extends`. Feel free to log warnings to the console or throw errors here to help users use your
types correctly. Recommended: Use [apiCheck.js](https://github.com/kentcdodds/apiCheck.js) as this is what formly uses
and will already be available to you. You can inject this dependency with `apiCheck`. You can use it like so:

```javascript
ngModule.run(function(formlyConfig, yourOwnCheck) {
  formlyConfig.setType({
    name: 'input',
    template: '<input ng-model="model[options.key]" />',
    validateOptions: function(options) {
      yourOwnCheck.throw(yourOwnCheck.object, arguments);
    }
  });
});
```

### setWrapper, getWrapper, getWrapperByType, removeWrapperByName, & removeWrappersForType

Allows you to set a template for your formly templates. You can have a default (used by all templates), named template
wrappers, and typed template wrappers (used by fields with the specified type). All template wrappers must follow these
rules
 - Use `<formly-transclude></formly-transclude>` in them to specify where the field template should be placed.
 - Have at least one, and only one of `templateUrl` or `template`
 - Not override another by name or type

For example:

```javascript
// simple argument api
formlyConfigProvider.setWrapper(
  '<div>This is the default because <formly-transclude></formly-transclude> there is no name specified</div>'
);
formlyConfigProvider.setWrapper(
  '<div>This is not the default because <formly-transclude></formly-transclude> there is a name specified</div>',
  'theName'
);

// object api
formlyConfigProvider.setWrapper({
  name: 'inputWrapper', // optional. Defaults to name || types.join(' ') || 'default'
  template: 'the template with <formly-transclude></formly-transclude> in it', // must have this OR templateUrl
  templateUrl: 'path/to/template.html', // the resulting template MUST have <formly-transclude></formly-transclude> in it and must have templateUrl OR template (not both)
  types: 'stringOrArray' // this can be a string or an array of strings that map to types specified by setTemplate and setTemplateUrl
});

// array api
formlyConfigProvider.setWrapper([
  { /* same configuration as the object api */ },
  { /* same configuration as the object api */ },
  { /* same configuration as the object api */ },
  { /* same configuration as the object api */ }
]);
```

`removeWrapperByName` and `removeWrappersForType` are helpful if you're using a template library but want to customize
your own wrappers. The api is simple:

```javascript
formlyConfigProvider.removeWrapperByName('inputWrapper'); // removes the wrapper that's called 'inputWrapper'
formlyConfigProvider.removeWrappersForType('select'); // removes all wrappers that apply to the type of 'select'
```

Also, note, that if you want to remove the default wrapper, this is done by passing `'default'` to the
`removeWrapperByName` function.

Another note, you can instead override wrappers (and types as well) without a warning if you specify an
`overwriteOk: true` property.

See [the website](https://formly-js.github.io/angular-formly/) for examples on usage

### templateManipulators

This allows you to manipulate the template of a specific field. This gives you a great deal of power without sacrificing
performance by having bindings which you will never need as well as save repetition in your templates. The api to this
feature is as follows:

```javascript
// note, most of the formlyConfigProvider functions can
// actually be done in the `run` function as well using `formlyConfig`.
formlyConfigProvider.templateManipulators.preWrapper.push(function(template, options, scope) {
  // determine if you wish to do anything with this template,
  // manipulated as needed, and return either the old template,
  // the new template, or a promise that will resolve with the
  // new template... for example
  if (options.data.addWarningMessage) {
    return template + '<div>This is a warning message!!!</div>';
  } else {
    return template;
  }
});

// or, if you wanted to load a template, you would do it in the
// run function so you can get $http, and $templateCache, then do:
formlyConfig.templateManipulators.preWrapper.push(function(template, options, scope) {
  return $http.get('the/template.html', {cache: $templateCache}).then(function(response) {
    return response.data.replace('where-the-template-goes', template);
  });
});
```

#### ngModelAttrsTemplateManipulator

Note! This is probably one of the coolest parts of angular-formly! There is a *built-in* `templateManipulator` that
automatically adds attributes to the `ng-model` element(s) of your templates for you. Here are the things you need to
know about it:

- It will never override existing attributes
- To prevent it from running on your field, simply set `data: {noTouchy: true}` and this template manipulator will skip
yours
- This can be disabled globally by setting `formlyConfigProvider.extras.disableNgModelAttrsManipulator = true`
- It wont do anything to the template if it can't find any elements with the attribute `ng-model`.
- It first goes through the `bound` and `unbound` `ngModelAttrs` specified for the field (read more about that above)
- It adds a `name` and `id` attribute (the `scope.id` for both of them)
- It adds the `formly-custom-validation` directive if the field has `options.validators`
- It adds `ng-model-options` directive if the field has `options.modelOptions`
- It utilizes the `ngModelAttrs` api to add a bunch of attributes automagically. This is probably one of the coolest
things about angular-formly. See below for examples of how to use this.

```javascript
{
  templateOptions: {
    placeholder: 'This will be automagically added',
    required: true, // will add a required attribute
    maxlength: 6, // this would add a maxlength attribute, but see expressionProperties
    onBlur: 'options.data.hasBeenBlurred = true' // this adds ng-blur
  },
  expressionProperties: {
    'templateOptions.maxlength': 'someExpression' // this adds the ng-maxlength attribute
  }
}
```

This is incredibly powerful because it makes the templates require much less bloat AND it allows you to avoid paying the
cost of watchers that you'd never use (like a field that will never be required for example).

Here are the built-in supported attributes

> both attribute or regular attribute -> required, disabled, pattern, maxlength, and minlength
> attribute only -> placeholder, min, max, tabindex, and type
> expression types -> onChange, onKeydown, onKeyup, onKeypress, onClick, onFocus, and onBlur

You can add more custom attributes using the `ngModelAttrs` api. It's a little complex, but quite powerful.


### disableWarnings

Formly gives some useful warnings when you attempt to use a template that doesn't exist or there's a problem loading a
template. You can disable these warnings via `formlyConfigProvider.disableWarnings = true`

## formlyValidationMessages

This service allows you to control what messages gets added to each field's `validation.messages` which can ultimately
be used in an `ng-messages` context to great effect. It has a `messages` property which is what is used to attach the
`messages` to the field's config. The messages here should be set as angular expressions (or functions) similar to how
`expressionProperties` or `validators` works. You can always interact with `messages` on your own, but there are two
helper methods in this service

### addTemplateOptionValueMessage

```javascript
formlyValidationMessages.addTemplateOptionValueMessage(name, prop, prefix, suffix, alternate);
// for example
formlyValidationMessages.addTemplateOptionValueMessage('max', 'max', 'The max value allowed is', '', 'Too big');
formlyValidationMessages.addTemplateOptionValueMessage('minlength', 'minlength', '', 'is the minimum length', 'Too short');
formlyValidationMessages.addTemplateOptionValueMessage('pattern', 'patternValidationMessage', '', '', 'Invalid Input');

// the last could be used like so:
var field = {
  type: 'whatever',
  templateOptions: {
    pattern: /some_crazyPattern/,
    patternValidationMessage: '"Needs to match " + options.templateOptions.pattern'
  }
};
```

### addStringMessage

```javascript
formlyValidationMessages.addStringMessage(name, string);
// for example
formlyValidationMessages.addStringMessage('required', 'This field is required');
```

## Tips and Tricks

Please see [the Wiki](https://github.com/formly-js/angular-formly/wiki) for tips and tricks from the community.

## Expressions

There are four places where you can put expressions. The context in which these expressions are evaluated is important.
There are two different types of context and each is explained below:

1) watcher - expression and listener can be functions or expression strings. This is a regular angular `$watch`
(depending on the specified `type`) function and it is created on the `formly-form` scope, despite being applied to a
specific field. This allows the expressions to run even if the field's scope has been destroyed (via an ng-if like when
the field is hidden). The function signature differs from a normal `$watch` however. See above for more details.

2) expressionProperties, validators, & messages - these expressions can be functions or expression strings. If it's a
function, it's invoked with the arguments `$viewValue`, `$modelValue`, and `scope`. The scope in this case, is the
field's scope. If it's an expression string, it is evaluated using `$scope.$eval` with a locals object that has
`$viewValue` and `$modelValue` (however, in the case of `expressionProperties`, `$viewValue` will simply be the
`$modelValue` because ok into the `ngModelController` but we want to keep the api consistent).

## Custom Templates

You have a lot of freedom when it comes to writing templates. You don't even need to use the `model` which means that
you can have fields that are just part of the look and feel of your form. Because of angular-formly's
[ngModelAttrsTemplateManipulator](#ngmodelattrstemplatemanipulator), you really only have to put the `ng-model` element
where you want it (if you want it at all) and formly will take care of most of the rest. If you want to have any extra
properties, you have pretty much full reign over the `options.templateOptions` object. Just be aware that angular-formly
does make use of common parameters like `required` or `onClick` to automatically add attributes to `ng-model` elements.

## apiCheck

angular-formly uses [apiCheck.js](https://github.com/kentcdodds/apiCheck.js) to do type validation to help you use
formly correctly. If you wish to disable this (in production that is recommended) then simply inject `apiCheck` and
disable it with `apiCheck.disable()`.

## Roadmap

- See the [issues labeled enhancement](labels/enhancement)

## Contributing

Please see the [CONTRIBUTING Guidelines](CONTRIBUTING.md).

## Thanks

A special thanks to [Nimbly](http://gonimbly.com) for creating/sponsoring Angular-Formly's development.
Thanks to [Kent C. Dodds](https://github.com/kentcdodds) for his continued support on the project.

---

# Appendix

## ngModelAttrs example

This api is a little complex. Hopefully these examples will be instructive.

Config like this:

```javascript
{
  ngModelAttrs: {
    myCustomValue: {
      bound: 'ng-my-custom-value',
      attribute: 'my-custom-value'
    }
  },
  templateOptions: {
    myCustomValue: 3
  }
}
```

Would yield something like this:

```html
<input ng-model="model[options.key]" my-custom-value="3" />
```

The value is simply placed on the element using the attribute specified in `attribute`.

Whereas if you changed the config to have an expressionProperty like this:

```javascript
{
  ngModelAttrs: {
    myCustomValue: {
      bound: 'ng-my-custom-value',
      attribute: 'my-custom-value'
    }
  },
  templateOptions: {
    myCustomValue: 3
  },
  expressionProperties: {
    'templateOptions.myCustomValue': 'someEvaluationToGetCustomValue'
  }
}
```

Then the output would look like this:

```html
<input ng-model="model[options.key]" ng-my-custom-value="options.templateOptions['myCustomValue']" />
```

Because the value of `templateOptions.myCustomValue` can change, it now uses the `bound` version of the attribute.
However, if there is no `bound` version specified, but it is still an expression property like so:

```javascript
{
  ngModelAttrs: {
    myCustomValue: {
      attribute: 'my-custom-value'
    }
  },
  templateOptions: {
    myCustomValue: 3
  },
  expressionProperties: {
    'templateOptions.myCustomValue': 'someEvaluationToGetCustomValue'
  }
}
```

Then the output would look like this:

```html
<input ng-model="model[options.key]" my-custom-value="{{options.templateOptions['myCustomValue']}}" />
```

You also have `expression`. For `expression` a config like this:

```javascript
{
  ngModelAttrs: {
    doAction: {
      expression: 'do-something-awesome'
    }
  },
  templateOptions: {
    doAction: 'options.data.actionDone = true'
  }
}
```

Would result in output like this:

```html
<input ng-model="model[options.key]" do-something-awesome="$eval(options.templateOptions['doAction'])" />
```

However, if the `templateOptions.doAction` is a function instead, like this:

```javascript
{
  ngModelAttrs: {
    doAction: {
      expression: 'do-something-awesome'
    }
  },
  templateOptions: {
    doAction: function(value, options, scope, $event) {
      options.data.actionDone = true;
    }
  }
}
```

Then the output would look more like this:

```html
<input ng-model="model[options.key]" do-something-awesome="options.templateOptions['doAction'](model[options.key], options, this, $event)" />
```

Which allows you to have access to the `value`, `options`, `scope`, and `$event` as you see in the example.

Finally, you can specify the custom attribute as a `value`. In this case, a config like this:

```javascript
{
  ngModelAttrs: {
    '{{options.data.whatever}}': {
      value: 'my-whatever-attribute'
    }
  }
}
```

```html
<input ng-model="model[options.key]" my-whatever-attribute="{{options.data.whatever}}" />
```

Which gives you the liberty to specify exactly the value you wish for your attribute in the template.

