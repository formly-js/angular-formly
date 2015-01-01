Version numbers correspond to `bower.json` version

# Latest

## Backward compatible changes:

- Adding class `formly-field` to the fields to make it easier to select them with css selectors.
- Adding optional `form` to what is passed to the formly-field. This gives the developer some flexibility to how they do field validation by not forcing them to rely on the mokey-patching that angular-formly does to each field.
- `formly-custom-validation` supports the new `$validators` api if available (in angular 1.3), otherwise it falls back to `$parsers`.
- `formly-custom-validation` supports `$asyncValidators` by adding `isAsync = true` property to the validation function.
- `formly-form` now passes `formly-field` all of the fields.
- `formlyConfigProvider` now allows you to disable console warnings via `disableWarnings` boolean (defaults to `false`).
- `watcher` can now accept an array of `watcher` objects.
- `watcher` objects can now have `deep` and `type` to have more control over the watch that is created
- `watcher` listners and expressions now take a new last argument which is the deregistration function
- `expressionProperties` introduced to give more control over property values for fields. It adds a `runExpressions` function to each field which is run on every result update and can be run with the result.
- `validator` string expressions now run with `$scope.$eval` and a locals object.
- field definition now has a `modelOptions` for use in `ng-model-options`
- `formly-field` now adds a `value` getter/setter to scope for use in ng-model in combination with `ng-model-options` as well as general helper functionality.
- `formly-form` now will default to the field's `model` property and fallback to the `model` specified to the `formly-form` directive. This allows you to specify a different model for a specific field.

## Breaking changes:

- Changing API to validators.
- Changing the id given to fields. It now also contains the key also. We don't expect anyone was depending on this, but it does change behavior so it's listed as a breaking change.
- Changing from `form` to `ng-form` to allow for nesting forms [as recommended](https://docs.angularjs.org/api/ng/directive/ngForm).
- Changing warning to throwing an error when more than one template option is provided (type, template, or templateUrl). You should never be allowed to do this in the first place.
- `hideExpression` and `requiredExpression` have been removed in favor of `expressionProperties`
- `formly-field` now expects `options` to be a bound property (`=`) rather than an expression (`&`)
- `watch` changed to `watcher` because Firefox defines `watch` on all objects, so determining whether the field had a watch on it was problematic.
- Changing from attribute `name` to `form` on the `formly-form` directive as this makes more sense.
- Removing `options` attribute from `formly-form`. There is no good reason to specify an ID for a form (and certainly no good reason to depend on it), so it is now generated on a counter. The ID was the only attribute left on options, so now `options` is no longer needed.
- Renaming `formField` to `formControl` as this is a more widely used term (specifically bootstrap uses this term).
- Using the field's ID for the `ngModel` name rather than simply `options.key` to ensure there are no collisions and improve consistency. Also adding logic to automatically add the `formControl` to the field's `options` allowing for ease of displaying error messaging and styling and allowing us to remove the `$broadcast` from the dynamic name directive (woot).
- `formly-form` now uses `formly-field` as an attribute instead of an element with a div. I don't expect this to be a real issue, but it may mess with your css if you're being too specific about things or referencing formly-field as an element.
- `formly-form` and `formly-field` changed the name `result` to `model`. This makes things more clear because `result` sounds more like *after* something has happend, and *model* sounds more like the thing that is being represented in real-time in the form. Hopefully this improved terminology will alleviate common confusion about how to preload the form and what the `model`'s relationship is to the `fields`

## Internal Changes

- Upgraded devDependencies to use angular 1.3 so the demo can show off `$asyncValidators`.
- `formly-field`: `formlyId` and `index` are now optional properties

# 1.0.0

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

- Moved all field templates to separate repositories.
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
