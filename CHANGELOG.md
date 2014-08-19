Version numbers correspond to `bower.json` version
# Latest

- Now providing the `result` to each field template authors have the power to associate other values of the result set with the template
- Adding `requiredExpression` to field options and assinging the field's `required` property based on its evaluation. Works very much like `hideExpression`
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