Angular formly provides you with some handy warnings and errors to keep you from using it incorrectly. It will direct
you to these for additional help. If these don't help you, please reproduce the issue using
[this jsbin template](http://jsbin.com/biqesi/edit) and
[file an issue on GitHub](https://github.com/formly-js/angular-formly/issues) or
[join us on Gitter](https://gitter.im/formly-js/angular-formly).

# apiCheck.js dependency required

angular-formly has two dependencies: angular and [apiCheck.js](https://github.com/kentcdodds/apiCheck.js). You need to
make sure you include apiCheck on the page for angular-formly to work. If you're using something like webpack or
browserify, this should just work and you shouldn't be seeing this. If you are in that case, please file a bug. However
if you're using just script tags, make sure to include the apiCheck.js script on the page.

# Problem loading template for {templateUrl}

If you provide a `templateUrl` as a property for a formly field or for a preconfigured template type, formly will
attempt to load that template using `$http` with the `$templateCache`. If this request fails for some reason, you will
see this warning.

Fixes for this warning are:

1. Make sure that the URL is correct and that you're able to reach that URL (paste it into your browser to test)
2. Use `template` instead of `templateUrl`. This can be a little crazy for bigger templates. However, if you use
Webpack's `raw-loader` then it's as simple as `require('./my-formly-template.html')`. This is what I do, and it's a
beautiful thing :-)

# Overwriting types or wrappers

If you wish to override an existing type or wrapper, you must specify `overwriteOk: true`.

# Type {type} has no template

This means that you're specifying a type for a field that doesn't not have a template or templateUrl. For a field to
be shown it must either have a `template`, `templateUrl`, or a `type` that has a `template` or `templateUrl`.

# You must provide one of type, template, or templateUrl for a field

I feel like this is fairly self explanatory. Make sure you're only specifying one of the three options there for each
field.

# You must only provide a type, template, or templateUrl for a field

Same as above.

# setType validation failed

Basically you're calling `setType` and you aren't passing all the required data or you're passing the wrong
properties/types. `name` is the only required property. If you're passing this, then it's likely that you're either
passing an extra property that isn't allowed or you're passing the wrong data type for a property. Look at the output
for what you passed and compare it with what you're allowed to pass.

# setWrapper validation failed

Similar to [setType validation failed](#settype-validation-failed) above, however the `name` property is only required
if no `types` property is specified.

# formly-field directive validation failed

You need to make sure that the field config for all of your fields is correct according the specification. apiCheck
should print out something that helps you understand what this is. If it's not good enough, file an issue and I'll look
and improving it!

# All field watchers must have a listener

If you're using the `watcher` property, it can be an object (called a `watcher` object) or an array of `watcher`
objects. Either way, all watchers must have a `listener` property which is a string (expression) or a function. The
`expression` property is optional and you will not receive a warning for this property. See the documentation for more
information.

# formly-field {type} apiCheck failed

Formly types can specify an `apiCheck` property which uses the `apiCheck.js` library to validate the options you
provide (after they have been merged with the `optionsTypes` but before the `defaultOptions` of the type). You will see
this warning if your options fail the apiCheck validation. Look at the warning, there's generally something there to
indicate what you're missing. If you can't figure it out, or it's not clear, please file an issue!

# There was a problem setting the template for this field

In the `link` function of the `formly-field` directive, a number of things happen. If any of these goes wrong, you'll
see this warning logged to the console and your field will never be added. Here are a few things to check if you see
this error:

- Make sure you haven't seen any other warnings. If you have, fix those first.
- If you have any [`templateManipulators`](https://github.com/formly-js/angular-formly/#templatemanipulators) running,
make sure those aren't throwing errors. Formly ships with one `templateManipulator` built-in. If you believe this is the
reason you're seeing the error, please
[file an issue with a reproducible example](https://github.com/formly-js/angular-formly/blob/master/CONTRIBUTING.md#issues).
- If your field specifies [`wrappers`](https://github.com/formly-js/angular-formly#wrapper-stringarray-of-strings),
or the template for your field type specifies any wrappers, or you register any wrappers for that field type (or with
the name `default`) then make sure that there is nothing wrong with these wrappers. It is likely that formly will let
you know that something is wrong with the wrappers if there is.
- Make sure that there's not an issue in the template itself. Angular will throw a parse error if this is the case, so
you should know if this is the issue.

# formly-form has no FormController

This can happen when you are specifying your own `root-el` on the `formly-form` and you don't pass an existing
`FormController` (from another `<form>` or `<ng-form>`) to the `formly-form`. To fix the problem, make sure that if you
must use a different `root-el` that you pass it an existing `FormController` like so:

```javascript
<form name="vm.myForm">
  <formly-form model="vm.model" fields="vm.fields" form="vm.myForm" root-el="div"></formly-form>
</form>
```

# Field model must be initialized

Because of how the `model` property is evaluated when it's a string, it is not possible for angular-formly to initialize
your model to an empty object for you. Because of this, if your expression evaluates to an undefined value, then this
will be overridden by the value you specify for `formly-form`. Hence, you must initialize the actual `model` to which
your expression evaluates.

# Don't use expressionProperties.hide, use hideExpression instead

This is due to limitations with expressionProperties and ng-if not working together very nicely. Essentially, if you are
initializing your field to be hidden, then its controller function never runs, which means its `runExpressions` function
is never initialized, which means the condition you specify in `expressionProperties.hide` will never be evaluated and
the field will always remain hidden.

To get around this, use `hideExpression` instead which is run on the `formly-form` level rather than the `formly-field`
level. It's almost exactly the same API as a normal `formly-field` `expressionProperty` and you should never notice a
difference. The main difference is that the `$scope` on which it is evaluated is not the `formly-field` scope like a
normal `expressionProperties` expression, but rather the `formly-form` scope, which means that in the function version
of the expression, the scope you're passed wont have all the properties you may be expecting.

See documentation [here](http://docs.angular-formly.com/docs/field-configuration-object#hideexpression-string--function)
and an example [here](http://angular-formly.com/#/example/field-options/hide-fields)

# FieldTransform as a function deprecated

To allow for plugin like functionality, `fieldTransform` functions on `formlyConfig.extras` and `formly-form.options`
are now deprecated. Moving forward fieldTransform will accept an array of `fieldTransform` functions. This makes it possible
to have multiple fieldTransforms. Note, `fieldTransform` functions will be removed in a major release.

# Notes

It is recommended to disable warnings in production using `formlyConfigProvider.disableWarnings = true`. Note: This will
not disable thrown errors, only the `console.warn` messages.
