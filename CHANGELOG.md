# 6.16.1

## Bug Fixes

- [@zeddever](https://github.com/zeddever) found and fixed a bug [#377](/../../pull/377) with `resetModel` and fieldGroups which have yet to be initialized.
- Fixed the same bug with fields which have yet to be initialized.

# 6.16.0

## New Features

- You can now force the built-in `ngModelAttrsManipulator` to skip specific `ng-model` elements by specifying `data.skipNgModelAttrsManipulator = 'query-selector'` or placing the attribute `formly-skip-ng-model-attrs-manipulator` on the element. [#358](/../../issues/358) closed by [@douglas-mason](https://github.com/douglas-mason) (His first open source contribution!)

# 6.15.2

## Bug Fixes

- Support copying `data-` prefixed `formly-form` attributes for `fieldGroups`.

# 6.15.1

## Bug Fixes

- Adding `LICENSE` back to the repo directly rather than using a symbolic link because it doesn't quite work well that way...

# 6.15.0

## New Features

- `fieldGroup` can now have a `data` object. It should always have had one...

# 6.14.1

## Bug Fixes

- `api-check` didn't handle an array of `formControl`s on field options which was introduced in `6.12.0-beta.0`

## Internal Changes

- npm scripts which use environment variables now use `better-npm-run` by [@benoror](https://github.com/benoror) so it can run cross platform [#305](/../../issues/305)

# 6.14.0

## New Features

- Added `fieldTransform` to the `formly-form` options as well as `formlyConfig.extras` to allow you to modify/convert the fields before angular-formly handles them or validates them. So you can now have your own custom field configuration and then simply use this function to modify them into something that angular-formly recognizes. Big thanks to [@stevebluck](https://github.com/stevebluck) for this one! (His first open source contribution!) [#343](/../../issues/343)
- Added `data` property to `formly-form` options.

# 6.13.2

## Enhancements

- Adding warning when you use `expressionProperties.hide` indicating you should use `hideExpression` instead.
- Fixing warning in `formly-form` to use `formlyWarn` instead so it is properly disabled.

# 6.13.1

## Bug Fixes

- Fixing issue where `fieldGroup` was not sharing it's parent's form. Thanks [@benoror](https://github.com/benoror) [#347](/../../issues/347)

# 6.13.0

## Bug Fixes

- Adding the ability to specify a `name` property on a field [#341](/../../issues/341)

# 6.12.0

## Other Improvements

- Fixing some issues with eslint
- Officially releasing 6.12.0

# 6.12.0-beta.1

## Bug Fixes

- No longer hard coding `{{` and `}}` and instead using the `$interpolateProvider` [#331](/../../issues/331)

# 6.12.0-beta.0

## New Features

- Adding the ability to specify multiple `ng-model`s in a single template. The `options.formControl` and `fc` shortcut in this scenario will be an array of `NgModelController`s. Huge thanks to [ckniffen](https://github.com/ckniffen) for implementing this!

## Other Improvements

- Seriously simplifying how the `formControl` is set. Another huge thanks to [ckniffen](https://github.com/ckniffen)!

# 6.11.4

## Bug Fixes

- Fixing issue related to [#287](/../../287) by completely removing all references to the `FormController` that formly-form creates if a `FormController` is passed to `<formly-form>` thus making it much easier to reason about due to some poor design choices on the API for nested `FormControllers` (specifically `$submitted` not propagating down to children forms).

# 6.11.3

## Bug Fixes

- Fixing issue when you don't pass `form-options` to `formly-field`

# 6.11.2

## Bug Fixes

- Fixing issue when someone uses `formly-field` explicitly without passing `formOptions`, you get an error thrown from `templateManipulators`

# 6.11.2

## Bug Fixes

- Fixing issue where the `formly-form` was setting the incorrect property for the `form`. [#328](/../../328)

# 6.11.1

## Bug Fixes

- Fixing issue with the form not getting set properly. Also resolving confusion with passing an existing `FormController` to `formly-form` by simply assigning `formly-form`'s `form` to the existing one rather than overriding it. [#328](/../../328)

# 6.11.0

## New Features

- Adding `templateManipulators` object of functions to the field config object [#309](/../../issues/309)
- Adding `templateManipulators` object to form options which will apply to all fields in the form. [#309](/../../issues/309)
- Adding `wrapper` to form options which will apply to all fields in the form. [#309](/../../issues/309)
- Adding `jspm` to `package.json` for improved `jspm` support [#321](/../../issues/321)

# 6.10.2

## Bug Fixes

- Fixing issue where the `$viewValue` passed to `expressionProperties` is always `undefined`. Thanks [@maku](https://github.com/maku)! [#322](/../../issues/322)

# 6.10.1

## Bug Fixes

- Fixing refactor issue with missing `$inject` annotations for `formly-form`.

# 6.10.0

## New Features

- Adding `key` to `fieldGroup` which allows you to easily handle nested properties of objects.

# 6.9.0

## New Features

- Adding the ability to specify a `model` as a string which will be parsed as an (almost) `formlyExpression` (just like `hideExpression`) and used to assign the model. [#311](/../../issues/311)

# 6.8.2

## Bug Fixes

- Fixing `api-check` for `debounce` in `modelOptions` [#312](/../../issues/312)

# 6.8.1

## Bug Fixes

- Removing source-maps entirely for the unminified build.

# 6.8.0

## New Features

- Adding `formlyConfig.extras.getFieldId` to allow you to specify a function which will be used to generate the field ID for all of the fields.

# 6.7.0

## New Features

- Adding `id` property on the field config object allowing you to specify the name/id for a field (which can be used in templates).

# 6.6.0

## New Features

- Adding ability for `model` to be set to `'formState'` allowing easier assignment to a non-model model for fields that are UI related not model related.

# 6.5.4

## Bug Fixes

- Fixed problem with `form` and `formId` not getting set properly.

# 6.5.3

## Bug Fixes

- Ensuring that the `formId` is properly set based on the generated (or provided) name.

# 6.5.2

## Bug Fixes

- Allowing `fieldGroup`s to be nested.

# 6.5.1

## Bug Fixes

- Allowing the use of the `data` prefix for `ng-model` in custom templates. Thanks [tleruitte](https://github.com/tleruitte)!

# 6.5.0

## New Features

- Adding `formlyConfig.extra.errorExistsAndShouldBeVisibleExpression` allowing you to override the default behavior of when `options.validation.errorExistsAndShouldBeVisible` (and it's shortcut: `showError`) is set to true.

# 6.4.2

- Official Release (no changes from 6.4.2-beta.0)

# 6.4.2-beta.0

## Bug Fixes

- Fixing support for browserify [#186](/../../issues/186) by removing inline sourcemaps.

# 6.4.1

## Bug Fixes

- `extends` and `template`/`templateUrl` issue. Thanks [ckniffen](https://github.com/ckniffen)!
- `formControl`/`fc` not getting set when the `ng-model` is on a `div`. Thanks [TheMcMurder](https://github.com/TheMcMurder)

# 6.4.0

- Official Release (no changes from 6.4.0-beta.6)

# 6.4.0-beta.6

## Bug Fixes

- Fixing issue with `resetModel` where it wasn't resetting the form's `$touched` and `$dirty` states [#278](/../../issues/278)

# 6.4.0-beta.5

## New Features

- Adding `field-root-el` attribute to `<formly-form>` [#276](/../../issues/276)

# 6.4.0-beta.4

## New Features

- Ability to add custom attributes to a `formly-field` as well as the `ng-form` of a `fieldGroup` using new property called `elementAttributes`

## Improvement

- Making `hideExpression` function more like a `formlyExpression`. Not exactly the same still...

# 6.4.0-beta.3

## New Features

- Adding watch to `formState` to run expressionProperties [#270](/../../issues/270)
- Adding `hideExpression` to the field to overcome issues with `ng-if` [#271](/../../issues/271)

# 6.4.0-beta.2

## New Features

- Adding `model`, `options`, `hide`, and `form` to a `formGroup` to allow you to control those properties.
- `formState` is the same object for `formGroup`s as the parent's `formState`.

## Bug Fixes

- Properly handling `resetModel` and `updateInitialValues` for `formGroup`s

# 6.4.0-beta.1

## New Features

- Adding convenience `formly-field-group` class to `formly-field` that has a `fieldGroup`.

# 6.4.0-beta.0

## Improvements

- No longer watching the `field.type` for the field's class because this can't ever change and simply adding the class itself

## New Features

- Adding the ability to specify a `className` on a field which will get added to the `formly-field`.
- Adding the ability to have `fieldGroups` THIS IS HUGE!!!

# 6.3.4

## Improvements

- No longer need to specify `noFormControl` to be `false`. Formly is smart enough to know if you have an `ng-model` in your template.

# 6.3.3

## Bug Fixes

- Adding the ability to force formly to watch your fields for a `formControl` by setting `noFormControl` to `false`.

# 6.3.2

## Bug Fixes

- Correctly setting the `initialValue` *after* setting the `defaultValue`.

# 6.3.1

## Bug Fixes

- Fixing falsy issue with `defaultValue`

# 6.3.0

## New Features

- Adding `defaultValue` property onto the `field` config. Normally you want to initialize the model, but this allows you to defer that to angular-formly.

# 6.2.0

## New Features

- Adding `track-by` attribute to `formly-form` to allow you to specify how you would like the `formly-form` `ng-repeat` to track your fields. [#246](/../../issues/246)
- Adding ability to specify a function (which can optionally return a promise) for both `template` and `templateUrl`. Thanks [@ckniffen](https://github.com/ckniffen)!

## Bug Fixes

- Fixing issue [#266](/../../issues/266) where the form control wasn't set when using a custom name.

## Notable Changes (non-breaking)

- Removing default `track by $index` to allow developers to change fields without index issues. Should not break current developers usage.

# 6.1.0

## New Features

- Adding `hide-directive` to give developers control over how the `formly-form` hides fields.

# 6.0.1

## Internal Fixes

- Fixing `api-check` `devDependency` version.

# 6.0.0

- Official release!

# 6.0.0-beta.10

## Features

- You can now specify a name for your form via the `bind-name` property. This is to resolve [#252](/../../issues/252). It only works for >= angular 1.3 and is hopefully not going to be needed commonly.

# 6.0.0-beta.9

## Bug Fixes

- Annotating function properly

# 6.0.0-beta.8

## Internal Changes

- Going all the way with es6 modules with some help from [@sparty02](https://github.com/sparty02) (Thanks!). This should also fix some issues with browserify because we're no longer requiring our tests in the source.

# 6.0.0-beta.7

## Other

- Broke stuff

# 6.0.0-beta.6

## Bug Fixes

- Fixed issue [#239](/../../issues/239) with by adding a `boolean` type for `ngModelAttrs` specifically for `required` and `disabled`.

## Breaking Changes

- Changed `ngModelAttrsManipulatorPreferBound` to `ngModelAttrsManipulatorPreferUnbound` because it's the more common case to want this enabled.

# 6.0.0-beta.5

## Other

- Accidentally released the beta version without the beta tag.

# 6.0.0-beta.4 (deprecated)

## Breaking Changes

- Fixing the Formly Expression string version to be consistent with the change for the function version as far as not using the `|| $modelValue` for the `$viewValue`;

# 6.0.0-beta.3

## Breaking Changes

- Removing deprecated `data.noTouchy` in favor of the new `data.skipNgModelAttrsManipulator`. Makes so much more sense.

# 6.0.0-beta.2

## Bug Fixes

- Updating to the latest beta version of `api-check` which has a bug fix in it.

# 6.0.0-beta.1

## Breaking Changes

- Updated to `api-check` version 7.0.0-beta.1. It should be released to a non-beta version before angular-formly 6.0.0 comes out of beta.

# 6.0.0-beta.0

## Breaking Changes

- A Formly Expression (used for `validators`, `expressionProperties`, and `validation.messages`) when providing a function, used to pass `$viewValue` as the first parameter and was calculated as: `$viewValue || $modelValue`. `$viewValue` is still the first parameter, but it no longer uses `|| $modelValue` so you need to do undefined/null checking.
- Now using `apiCheck` to check the `options` passed to `formly-form`
- Now initializing the `model` and `fields` if they haven't been initialized, which will throw an error if the attribute is not present.

# 5.2.1

## Bug Fixes

- Changing `fixChromeAutoComplete` to `removeChromeAutoComplete`. This release is coming immediately after the previous so hopefully nobody's using the feature yet.

# 5.2.0 - deprecated

## Features

- Added `options.fixChromeAutoComplete` to `formly-form` options as well as `formlyConfig.extras.fixChromeAutoComplete`

## Bug Fixes

- Fixing issue with the `resetModel` where if the model is `null` things break.

# 5.2.0-beta.1

## Other changes

- Botched the other beta release...

# 5.2.0-beta.0

## Features

- Adding the ability to reset a form's model back to its original state (also adding the ability to reset what the "original state" is)

# 5.1.2

## Other Fixes

- Changing the peerDependency to include beta versions of angular.

# 5.1.1

## Bug Fixes

- Fixes ([#231](/../../issues/231)). Code borrowed from @koenweyn's PR.

# 5.1.0

## Features

- You can now specify `validation.messages` formly expressions.

## Internal Breaking Changes

- `formly-custom-validation` (internal directive) no longer allows you to specify your own custom validation object but instead simply relies on the scope having an `options.validators` property. It already depended on some other stuff from the scope and it's so specific to angular-formly that this should not cause an issue for anyone.

# 5.0.3

## Bug Fixes

- Removing the requirement to have the `form` attribute.

# 5.0.2

## Bug Fixes

- Really fixed ([#222](/../../issues/222)) this time

# 5.0.1

## Bug Fixes

- Fixed issue where the `form` attribute on the `<formly-form>` directive would not actually do anything :-(

# 5.0.0

## Breaking Changes

- formly-field scope attribute `formId` is now an attribute, not a two-way binding
- the `form` of a `formly-form` is now generated to avoid siblings overriding each other

## Other

- Removed migration warning about changing from `result` to `model`.
- Removed migration warning about changing from `name` to `form`.

# 4.2.5

## Other

- Moving where the logos are
- Ignoring the `other` directory

# 4.2.3

## Other

- Trouble with 4.2.2... :-(

# 4.2.2

## Other

- Had trouble with release 4.2.1
- Updating documentation... Big time.

# 4.2.1

## Other

- Had trouble release 4.2.0

# 4.2.0

## Improvements

- Thanks to @koenweyn, we now can support IE8 (with polyfills).

# 4.1.0

## Improvements

- No longer using `setInterval` to get the form control but using a `watch` instead which gives you the power to have a read-only version of the field that switches to a named input later. I feel like it's worth the watcher. However, this means users will no longer get warnings about the inability to set the form control :-( Still worth it.

# 4.0.11

## Bug Fixes

- Extending with default options where the extender is also a function would result in pretty much a noop for the extendee's options. Fixed that :-)

# 4.0.10

## Internal Changes

 - Adding ngdoc annotations to some of the directives

## Bug Fixes

 - Restricting formly-focus and formly-custom-validation to attributes as they were never meant to be allowed as elements.

# 4.0.9

## Bug Fixes

- The key should be defaulted before apiCheck runs on the formly-field.

# 4.0.8

## Bug Fixes

- I guess I didn't actually fix the `peerDependencies` like I thought I had... Don't test something, then change it without testing again...

# 4.0.7

## New Features and Internal Changes

- Updating error messaging for when a type has no template or templateUrl.
- Fixing the URL for error messages

## Bug Fixes

- Fixing issue with `peerDependencies` (npm) and `dependencies` (bower) where you were unable to install the beta versions of angular.

# 4.0.6

## Bug Fixes

- Allowing the use of validators as formlyExpressions (both strings and functions)

# 4.0.5

## New Features

- Adding `apiCheckOptions`

# 4.0.4

## New Features

- Adding `apiCheck` and it's kids `apiCheckInstance` and `apiCheckFunction`.

# 4.0.3

## Bug Fixes

- Fixing bower dependency with api-check rename

# 4.0.2

## Bug Fixes

- Fixing issue with external dependencies

# 4.0.1

## New Features

- `formly-form` now takes `options` which can specify `formData` which will be passed to the field on the new `form-data` attribute. This is useful for sharing data between fields. ([#187](/../../issues/187))
- `formlyConfig.setWrapper` now allows you to specify `validateOptions` which will be used similar to `type.validateOptions`.  ([#192](/../../issues/192))

# 4.0.0

## Breaking Changes

- Upgrading api-check to create a custom instance of api-check. This comes with a breaking change. formly used to add `apiCheck` as a constant but no longer does. Instead, it adds `formlyApiCheck` as a constant and that is the instance of apiCheck for `angular-formly`.

## Bug Fixes

- wrapper apiCheck was incorrect for `setType`.
- no longer shipping with lodash... whoops :-/

# 3.3.2

## Bug Fixes

- Bug fix ([#188](/../../issues/188)). The `options.messages` type was wrong.

# 3.3.1

## New Features

- Updated `api-check` to 3.0.0. It's awesome. Also added field checking to types.

# 3.3.0

## New Features

- `api-check` is now a dependency of angular-formly. It is bundled with `angular-formly` to prevent a breaking change and `angular-formly` exposes it as an injectable constant via `apiCheck`.
- `formlyConfig.setType` now allows you to specify `validateOptions` which will pass the user's specified options for validation. The author is responsible for logging warnings or throwing errors. Recommended to use `apiCheck.js` which will be shipped as a dependency for `angular-formly` soon. This also supports `extends`.

## Other Changes

- `formly-form` no longer throwing an error when the `scope.model` is falsey.
- `formlyConfig.setType` no longer throws an error when you neglect to specify a `template`, `templateUrl`, or `defaultOptions` because with `extends` you could create a type that's meant to be extended.

# 3.2.7

## Bug Fixes

- Evidently... `angular.isBoolean` does not exist...

# 3.2.6

## Bug Fixes & New Features

- Introducing `showError` as a scope variable in `formly-field`s. It's a shortcut for `options.validation.errorExistsAndShouldBeVisible`. Also, fixing an issue where a non-boolean value for `validation.show` would be used. Also, `validation.show` will only set these to `true` if the form control is also `$invalid` which was the original intent.

# 3.2.5

## Bug Fixes

- The `extends` for `defaultOptions` in the case where both were functions was not calling the child properly. It was calling with the parent's result, but it should be called with the parent's result merged with the options.

# 3.2.4

## New Features

- Because the attribute html `maxlength` prevents the user from inputing anything longer than the specified length, `formlyNgModelAttrsManipulator` allows you to specify that you want to use the `bound` version only (i.e. `ng-maxlength`). This adds a watcher, but is a better user experience. Set `formlyConfig.extras.ngModelAttrsManipulatorPreferBound = true` to enable this.

# 3.2.3

## Bug Fixes

Missed something sorta crutial in that last release...

# 3.2.2

## Bug Fixes

- `formly-field`'s scope property `options.validation.errorExistsAndShouldBeVisible` wasn't giving preference to `validation.show` and it should. Also, only adding the watcher when a formControl is set on the field's options.

# 3.2.1

## New Features

- `to` gets set in the scope of the `formly-field` BEFORE controllers are invoked so the controllers can reference `to` as well.
- a new variable gets added to the scope called `fc` which is a shortcut for `scope.options.formControl`.

# 3.2.0

## New Features

- `setType` now allows a new property called `extends` which allows you to extend the functionality of other types. It even handles `link`, `controller`, and `defaultOptions` functions really nicely. This is an awesome addition!
- `setType` now throws errors if you specify anything but the allowed properties for types which further helps you use formly correctly.
- The error/warning url now points to a file that's in the repo which ensures that the warning and error descriptions will live with the code they were written for.

# 3.1.6

## Bug Fixes

- `formlyNgModelAttrsManipulator` was not allowing specifying the value of `0` because falsiness funniness of JavaScript (－‸ლ)

# 3.1.5

## Bug Fixes

- `formly-field` fields were supposed to be able to specify `null` as the `wrapper` property. This was not the case and has been updated (with tests to prevent this from surfacing again).

# 3.1.4

## Bug Fixes

- `formlyUtil.reverseDeepMerge` fixes. There were issues with `defaultOptions` overriding the specified options. This fixes those issues.

# 3.1.3

## Bug Fixes

- `formly-field` convenience scope variable `to` got messed up when using `defaultOptions` for types. This version fixes that.

# 3.1.2

## New Features

- `formly-field` now adds a convenience scope variable `to` to scope which is just pointing to `options.templateOptions`. This should make the templates a little more terse (albeit maybe a little less obvious to read).

# 3.1.1

## Bug Fixes

- `expressionProperties` never actually passed the `$viewValue` to be used in the expressions. This was ok because in this context you could just use `$modelValue`, but we want to keep our expressions as consistent as possible so this bug was fixed.

# 3.1.0

## Slight breaking changes

- `ngModelAttrs` has had an api change. The new api is complex, but much more powerful and useful. Few are using the original api as it's brand new, so I decided to not make a new major version.

# 3.0.12

## Other Changes

- 3.0.11 didn't have a full build...

# 3.0.11

## Backward compatible changes and new features

- `validators` now supports async validators in 1.2. The API is identical between the two. It also emulates `$pending`.

# 3.0.10

## Other Changes

- Fixed some mistakes in the README.md

# 3.0.9

## Bug Fixes

- `validators` api validation was not checking if the validator was a string (as in, an expression) and was throwing an error if it was.

# 3.0.8

## Bug Fixes

- `ngModelAttrsManipulator` was not applying the `invokable` attributes properly.

# 3.0.7

## Backward compatible changes and new features

- `formly-field` now adds a new object the the field config called `validation` which has a few useful properties: `show` which is specified by the user and `messages` and `errorExistsAndShouldBeVisible` which is set by formly.
- `formlyConfig` now has `extras.disableNgModelAttrsManipulator` which can be used to disable the `ngModelAttrsManipulator`. Let me know if you want to do this and maybe we can fix the manipulator for your use case.

## Bug Fixes

- `formly-field` `runExpression` now runs inside a `$timeout` to ensure that the value is current

## Breaking changes:

- `formly-form` switching the `no-root-el` attribute for a new attribute called `root-el` which can be used to control the root element of a formly-form. Defaults to an `ng-form` but if you wish, you can change it to a `form` by specifying `root-el="form"` or a `div` by specifying `root-el="div"`. I believe only one person was using this feature, so I decided to not make a major version change for this #politics

# 3.0.6

## Backward compatible changes and new features

- Allowing validators to be specified as objects that have `expression` and `messages` on them. This is opening the way for including built-in support for `ng-messages` in the future. For now, templates can support `ng-messages` with this enhanced api. Specifying a validator the old way works just fine.
- When a validator has a `message` property, a function is added to `options.validationMessages` which will use `formlyUtil.formlyEval` to evaluate the message expression to get the value for the message.

# 3.0.5

## Backward compatible changes and new features

- The `ngModelAttrsManipulator` pre-wrapper `templateManipulator` now adds more invoked attributes (like `ng-blur` etc). More can be specified with `data.ngModelInvokedAttributes`.
- Adding `options.modelOptions` to the list of things that will be auto-added to the `ng-model` element if it exists. Woot! When `options.modelOptions.getterSetter` is set to true, then it will change the `ng-model` value to `options.value` which is the getter setter every field gets.

## Bug Fixes

- The `ngModelAttrsManipulator` used to simply bind the `ng-click` to the `templateOptions.onClick` which wouldn't actually do anything. The new invoked attributes now actually invokes the expression.

# 3.0.4

## Backward compatible changes and new features

- Adding `controller` and `link` functions to both the field types and the field configs. You can now specify specific behaviors for components without the need to create an entire directive for it. Pretty neat huh? :-)

# 3.0.3

## Backward compatible changes and new features

- Adding optional `no-ng-form` attribute to the `formly-form`.

# 3.0.2

- Updated README and CHANGELOG

# 3.0.1

- Botched 3.0.0

# 3.0.0

## Backward compatible changes and new features

- all fields will now have a the `key` value default to the index of the field if it isn't given a value. This makes it much easier to reference the model in templates (instead of `model[options.key || index]` you can now simply do `model[options.key]`.
- adding an angular constant called `formlyVersion` that could be useful and stuff.
- new feature: **Template Wrappers** are useful for templates that share many of the same things (like validation with ng-messages or labels). See README and tests for documentation
- new feature: **formlyConfig.setType** allows you to specify a type that has a `name`, `template` OR `templateUrl`, and `wrapper(s)`.
- `expressionProperties` can now accept promises! :D Thanks @djsmith42!
- `formly-focus` new directive that allows you to easily add focus to a focusable element. This is for your templates primarily.
- Any properties specified on a formly field that are not explicitly part of the api will result in an error thrown. Use `data` or `templateOptions` for custom field values.
- **AWESOME** new feature: `formlyConfigProvider.templateManipulators`. This allows you to manipulate templates on a per-field basis prior to them being compiled. This gives you a TON of power over your templates. Game changer I'd say... :-) Currently you have `preWrapper` and `postWrapper` arrays to interact with, but I'm thinking of removing wrappers altogether in favor of this more powerful and more simple api.
- `ngModelAttrs` new field config option. Allows you to dynamically add attributes to the `ng-model` element of a field's template. Uses `formlyConfigProvider.templateManipulators.preWrapper`
- Adding the ability to specify default options for field types and adding the concept of a default option-only field type. Adding `optionsTypes` to the field config options for this.

## Breaking changes:

- now throwing errors throughout the api to validate it is being used appropriately.
- removing `setTemplate` and `setTemplateUrl` in favor of the new `setType` api.
- `expressionProperties` has been simplified and improved. No longer can you specify a `data` object. Instead you specify an expression that the result of the expression will be assigned to (uses the `$parse` service).

## Internal Changes

- Adding links to all errors and warnings. Should hopefully help people resolve issues faster.
- If you're using angular 1.3.0 and have the ability to use the `validators` pipeline, now all `validators` that are functions (rather than string expressions) run through the `$asyncValidators` pipeline because there is negligible performance implications and it simplifies the validators api because you no longer need to specify isAsync on the function.

# 2.0.0

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
