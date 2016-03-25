import angular from 'angular-fix'

import formlyApiCheck from './providers/formlyApiCheck'
import formlyErrorAndWarningsUrlPrefix from './other/docsBaseUrl'
import formlyUsability from './providers/formlyUsability'
import formlyConfig from './providers/formlyConfig'
import formlyValidationMessages from './providers/formlyValidationMessages'
import formlyUtil from './services/formlyUtil'
import formlyWarn from './services/formlyWarn'

import formlyCustomValidation from './directives/formly-custom-validation'
import formlyField from './directives/formly-field'
import formlyFocus from './directives/formly-focus'
import formlyForm from './directives/formly-form'
import FormlyFormController from './directives/formly-form.controller'

import formlyNgModelAttrsManipulator from './run/formlyNgModelAttrsManipulator'
import formlyCustomTags from './run/formlyCustomTags'

const ngModuleName = 'formly'

export default ngModuleName

const ngModule = angular.module(ngModuleName, [])

ngModule.constant('formlyApiCheck', formlyApiCheck)
ngModule.constant('formlyErrorAndWarningsUrlPrefix', formlyErrorAndWarningsUrlPrefix)
ngModule.constant('formlyVersion', VERSION) // <-- webpack variable

ngModule.provider('formlyUsability', formlyUsability)
ngModule.provider('formlyConfig', formlyConfig)

ngModule.factory('formlyValidationMessages', formlyValidationMessages)
ngModule.factory('formlyUtil', formlyUtil)
ngModule.factory('formlyWarn', formlyWarn)

ngModule.directive('formlyCustomValidation', formlyCustomValidation)
ngModule.directive('formlyField', formlyField)
ngModule.directive('formlyFocus', formlyFocus)
ngModule.directive('formlyForm', formlyForm)
ngModule.controller('FormlyFormController', FormlyFormController)

ngModule.run(formlyNgModelAttrsManipulator)
ngModule.run(formlyCustomTags)
