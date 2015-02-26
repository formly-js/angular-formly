Angular formly provides you with some handy warnings and errors to keep you from using it incorrectly. It will direct
you to these for additional help. If these don't help you, please reproduce the issue using
[this jsbin template](http://jsbin.com/biqesi/edit) and
[file an issue on GitHub](https://github.com/formly-js/angular-formly/issues) or
[join us on Gitter](https://gitter.im/formly-js/angular-formly).

# Couldn't set the formControl after {time}ms

For every field, Angular formly will attempt to set a property on the `options` called `formControl`. This is the
`NgModelController` for that field. Possible reasons you could be seeing this are:

1. The field has no form on the scope (shouldn't happen if you're using the latest version and the `formly-form`
directive)
2. The element with the `ng-model` attribute for the field's template doesn't use the `name` property with the `id`
property of the scope (i.e. `name={{::id}}` or in angular 1.2 `formly-dynamic-name="id"`) <-- this is the most likely
reason

Fixes for this warning are:

1. Add the appropriate attribute to the element with the `ng-model` attribute for the field's template so it has a name
(as mentioned above)
2. On the field options, specify `noFormControl: true`

# Problem loading template for {templateUrl}

If you provide a `templateUrl` as a property for a formly field or for a preconfigured template type, formly will
attempt to load that template using `$http` with the `$templateCache`. If this request fails for some reason, you will
see this warning.

Fixes for this warning are:

1. Make sure that the URL is correct and that you're able to reach that URL (paste it into your browser to test)
2. Use `template` instead of `templateUrl`. This can be a little crazy for bigger templates. However, if you use
Webpack's `raw-loader` then it's as simple as `require('./my-formly-template.html')`. This is what I do, and it's a
beautiful thing :-)

# template type {type} not supported.

You may see this as `template type undefined not supported` if you do, you failed to specify a type, template or
templateUrl for a field. You must specify at least one. If you do see a type there then it is likely that the specified
type was never registered with the `formlyConfigProvider` using `setTemplate` or `setTemplateUrl`. Do that.

# You must provide one of type, template, or templateUrl for a field

I feel like this is fairly self explanatory. Make sure you're only specifying one of the three options there for each
field.

# You must only provide a type, template, or templateUrl for a field

Same as above.

# setType validation failed

If you're looking at this, file a bug for me to put more info here. Basically you're calling `setType` and you aren't
passing all the required data or you're passing the wrong properties/types. `name` is the only required property. If
you're passing this, then it's likely that you're either passing an extra property that isn't allowed or you're passing
the wrong data type for a property. Look at the output for what you passed and compare it with what you're allowed to
pass.

# formly-field directive validation failed

You need to make sure that the field config for all of your fields is correct according the specification. apiCheck
should print out something that helps you understand what this is. If it's not good enough, file an issue and I'll look
and improving it!

# You have specified properties for {context} that are not allowed

Formly will warn you when specifying properties that are not allowed for a few things (fields or types for example).
This is to help you use formly correctly. To fix this, remove or move any of the specified extra properties to one of
the allowed properties. In the case of a field, move them to to either the `data` or `templateOptions` property
(`templateOptions` if it's used by the template for the field, and `data` for everything else).

# All field watchers must have a listener

If you're using the `watcher` property, it can be an object (called a `watcher` object) or an array of `watcher`
objects. Either way, all watchers must have a `listener` property which is a string (expression) or a function. The
`expression` property is optional and you will not receive a warning for this property. See the documentation for more
information.

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

# Notes

It is recommended to disable warnings in production using `formlyConfigProvider.disableWarnings = true`. Note: This will
not disable thrown errors, only the `console.warn` messages.
