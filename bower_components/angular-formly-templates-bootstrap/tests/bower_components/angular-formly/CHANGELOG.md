Version numbers correspond to `bower.json` version

# Latest (maybe 0.1.0)

## Backward compatible changes:

- Fixed bug with initializing select template.
- Added the ability to do validation on fields with `formly-dynamic-name`.
- Added `formly-custom-validation` directive.
- Added warning in `formly-field` when more than just a type, template, or templateUrl are provided (should only have one)

## Internal Changes

- Moved all demo-only related files to a demo folder and added a symbolic link to src and bower_components so when it's deployed the src and bower_components go with it. This will also allow us to make a symlink in the test directory when it's created.
- Separated out the src folder into three sub folders: `common`, `bootstrap`, and `vanilla`. The build takes `bootstrap` and `vanilla` and builds them separately. They each build with `common`. There is also a separate file for setting up the default template mapping with their types and this is excluded for the `no-templates` build. The final output is: `formly.js`, `formly.bootstrap.js`, and `formly.vanilla.js`. Adding other styles will be very easy. It also should make it possible for us to have directive templates (funcationality for a field).
- Updated the demo to use a built version of formly because templates were such a pain. The Gruntfile has been updated to rebuild bootstrap every time something changes when `grunt watch` is running.
- Moved the `formly-form` template into a file again and added transclusion.

## Breaking changes:

- Added no-template build that builds to `formly.js` and changed vanilla build to `formly.vanilla.js`.
- Removed all options to customize the submit button and now transclude instead. Because there are multiple skins of formly it made little sense to have a template for formly that needed different styling based on the build target (bootstrap vs. vanilla). The `formly-form` directive now transcludes so a submit button can be added there.
- Removed `formlyOptionsProvider` because all useful global customizability is now unecessary.
- Renamed `formlyTemplateProvider` to `formlyConfigProvider` to make it more generic for any future customization needs. The api is the same as before.
- Added `setTemplate` and `getTemplate` to the `formlyConfigProvider` allowing developers to set template strings rather than simply a url.
- Removed `default` property. Interact with the `formData` to set the form data.
- Removed `value` from scope on templates. To access the value, you must now use `result[option.key || $index]`.

# 0.0.16

- The password field no longer uses whitespace trimming.
- Added option to override whitespace trim setting for the password field.
- Revised support for setting the `default` for `select` fields.
- Added notes on contributing.
- Fixed #55 Error: field.watch.listener is undefined.
- Added support for `description` to all form fields.
- Now providing the `result` to each field template authors have the power to associate other values of the result set with the template.
- Adding `requiredExpression` to field options and assinging the field's `required` property based on its evaluation. Works very much like `hideExpression`.
- Added option to use `ng-if` instead of `ng-hide` to hide fields.

# 0.0.14

Botched a publish with npm, so 0.0.13 became 0.0.14, just needed to update the changelog.

# 0.0.13

## Features
Added support for both vanilla and bootstrap templates, I hope that this opens the Formly up for even more default template options for other libraries, ie Ionic or Foundation.

Moved Bootstrap bower dependency to `devDependencies`.

## Breaking Changes
Anyone using the old library and needing bootstrap styles will need to switch to the new bootstrap js.

# 0.0.12

## Features

Adding the `formlyOptionsProvider` which allows developers to set default form options.

Adding `submitButtonTemplate` to the configurable `formlyOptions`. If it has a value, then the button in the `formly-form` directive will be replaced with the compiled (on the scope) version of that value. Also adding twitter classes to the submit button so hopefully this template will be unecessary in some cases.

Adding the `watch` property which has both `expression` and `listener` properties. Formly will set a watcher on its own scope. If the `watch.expression` is a function, it will be wrapped and the first argument to that expression function will be the field, the rest will be the normal watch expression definition. The same is true for `listener`.

## Bug Fixes

## Breaking Changes

# 0.0.11

## Features

Adding the `formlyTemplateProvider` which allows developers to set templateUrls for types. Also allows them to make custom types.

## Bug Fixes

## Breaking Changes

# 0.0.10

## Features

Added `hide` property on fields. Allows devs to conditionally show fields. Also adding `hideExpression` property which is an expression that will be evaluated on the result object (using $parse) to make the api simpler to use.

Added `template` property on fields. Allows devs to have one-liner templates. Mainly used for directives so a single template can be used with options. Also improved the id of fields that use templateUrls or templates.

## Bug Fixes

## Breaking Changes

# 0.0.1

## Features

## Bug Fixes

## Breaking Changes
