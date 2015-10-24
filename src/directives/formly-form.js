import angular from 'angular-fix'

export default formlyForm

/**
 * @ngdoc directive
 * @name formlyForm
 * @restrict AE
 */
// @ngInject
function formlyForm(formlyUsability, formlyWarn, $parse, formlyConfig, $interpolate) {
  let currentFormId = 1
  return {
    restrict: 'AE',
    template: formlyFormGetTemplate,
    replace: true,
    transclude: true,
    scope: {
      fields: '=',
      model: '=',
      form: '=?',
      options: '=?',
    },
    controller: FormlyFormController,
    link: formlyFormLink,
  }

  function formlyFormGetTemplate(el, attrs) {
    const rootEl = getRootEl()
    const fieldRootEl = getFieldRootEl()
    const formId = `formly_${currentFormId++}`
    let parentFormAttributes = ''
    if (attrs.hasOwnProperty('isFieldGroup') && el.parent().parent().hasClass('formly')) {
      parentFormAttributes = copyAttributes(el.parent().parent()[0].attributes)
    }
    return `
        <${rootEl} class="formly"
                 name="${getFormName()}"
                 role="form" ${parentFormAttributes}>
          <${fieldRootEl} formly-field
               ng-repeat="field in fields ${getTrackBy()}"
               ${getHideDirective()}="!field.hide"
               class="formly-field"
               options="field"
               model="field.model || model"
               original-model="model"
               fields="fields"
               form="theFormlyForm"
               form-id="${getFormName()}"
               form-state="options.formState"
               form-options="options"
               index="$index">
          </${fieldRootEl}>
          <div ng-transclude class="${getTranscludeClass()}"></div>
        </${rootEl}>
      `

    function getRootEl() {
      return attrs.rootEl || 'ng-form'
    }

    function getFieldRootEl() {
      return attrs.fieldRootEl || 'div'
    }

    function getHideDirective() {
      return attrs.hideDirective || formlyConfig.extras.defaultHideDirective || 'ng-if'
    }

    function getTrackBy() {
      if (!attrs.trackBy) {
        return ''
      } else {
        return `track by ${attrs.trackBy}`
      }
    }

    function getFormName() {
      let formName = formId
      const bindName = attrs.bindName
      if (bindName) {
        if (angular.version.minor < 3) {
          throw formlyUsability.getFormlyError('bind-name attribute on formly-form not allowed in < angular 1.3')
        }
        // we can do a one-time binding here because we know we're in 1.3.x territory
        formName = `${$interpolate.startSymbol()}::'formly_' + ${bindName}${$interpolate.endSymbol()}`
      }
      return formName
    }

    function getTranscludeClass() {
      return attrs.transcludeClass || ''
    }

    function copyAttributes(attributes) {
      const excluded = ['model', 'form', 'fields', 'options', 'name', 'role', 'class',
        'data-model', 'data-form', 'data-fields', 'data-options', 'data-name']
      const arrayAttrs = []
      angular.forEach(attributes, ({nodeName, value}) => {
        if (nodeName !== 'undefined' && excluded.indexOf(nodeName) === -1) {
          arrayAttrs.push(`${toKebabCase(nodeName)}="${value}"`)
        }
      })
      return arrayAttrs.join(' ')
    }
  }

  // @ngInject
  function FormlyFormController($scope, formlyApiCheck, formlyUtil) {
    setupOptions()
    $scope.model = $scope.model || {}
    setupFields()

    // watch the model and evaluate watch expressions that depend on it.
    $scope.$watch('model', onModelOrFormStateChange, true)
    if ($scope.options.formState) {
      $scope.$watch('options.formState', onModelOrFormStateChange, true)
    }

    function onModelOrFormStateChange() {
      angular.forEach($scope.fields, function runFieldExpressionProperties(field, index) {
        const model = field.model || $scope.model
        const promise = field.runExpressions && field.runExpressions()
        if (field.hideExpression) { // can't use hide with expressionProperties reliably
          const val = model[field.key]
          field.hide = evalCloseToFormlyExpression(field.hideExpression, val, field, index)
        }
        if (field.extras && field.extras.validateOnModelChange && field.formControl) {
          const validate = field.formControl.$validate
          if (promise) {
            promise.then(validate)
          } else {
            validate()
          }
        }
      })
    }

    function setupFields() {
      $scope.fields = $scope.fields || []

      checkDeprecatedOptions($scope.options)

      let fieldTransforms = $scope.options.fieldTransform || formlyConfig.extras.fieldTransform

      if (!angular.isArray(fieldTransforms)) {
        fieldTransforms = [fieldTransforms]
      }

      angular.forEach(fieldTransforms, function transformFields(fieldTransform) {
        if (fieldTransform) {
          $scope.fields = fieldTransform($scope.fields, $scope.model, $scope.options, $scope.form)
          if (!$scope.fields) {
            throw formlyUsability.getFormlyError('fieldTransform must return an array of fields')
          }
        }
      })

      setupModels()

      angular.forEach($scope.fields, attachKey) // attaches a key based on the index if a key isn't specified
      angular.forEach($scope.fields, setupWatchers) // setup watchers for all fields
    }

    function checkDeprecatedOptions(options) {
      if (formlyConfig.extras.fieldTransform && angular.isFunction(formlyConfig.extras.fieldTransform)) {
        formlyWarn(
          'fieldtransform-as-a-function-deprecated',
          'fieldTransform as a function has been deprecated.',
          `Attempted for formlyConfig.extras: ${formlyConfig.extras.fieldTransform.name}`,
          formlyConfig.extras
        )
      } else if (options.fieldTransform && angular.isFunction(options.fieldTransform)) {
        formlyWarn(
          'fieldtransform-as-a-function-deprecated',
          'fieldTransform as a function has been deprecated.',
          `Attempted for form`,
          options
        )
      }
    }

    function setupOptions() {
      formlyApiCheck.throw(
        [formlyApiCheck.formOptionsApi.optional], [$scope.options], {prefix: 'formly-form options check'}
      )
      $scope.options = $scope.options || {}
      $scope.options.formState = $scope.options.formState || {}

      angular.extend($scope.options, {
        updateInitialValue,
        resetModel,
      })

    }

    function updateInitialValue() {
      angular.forEach($scope.fields, field => {
        if (isFieldGroup(field) && field.options) {
          field.options.updateInitialValue()
        } else {
          field.updateInitialValue()
        }
      })
    }

    function resetModel() {
      angular.forEach($scope.fields, field => {
        if (isFieldGroup(field) && field.options) {
          field.options.resetModel()
        } else if (field.resetModel) {
          field.resetModel()
        }
      })
    }

    function setupModels() {
      // a set of field models that are already watched (the $scope.model will have its own watcher)
      const watchedModels = [$scope.model]

      if ($scope.options.formState) {
        // $scope.options.formState will have its own watcher
        watchedModels.push($scope.options.formState)
      }

      angular.forEach($scope.fields, (field) => {
        const isNewModel = initModel(field)

        if (field.model && isNewModel && watchedModels.indexOf(field.model) === -1) {
          $scope.$watch(() => field.model, onModelOrFormStateChange, true)
          watchedModels.push(field.model)
        }
      })
    }

    function initModel(field) {
      let isNewModel = true

      if (angular.isString(field.model)) {
        const expression = field.model
        const index = $scope.fields.indexOf(field)

        isNewModel = !refrencesCurrentlyWatchedModel(expression)

        field.model = evalCloseToFormlyExpression(expression, undefined, field, index)
        if (!field.model) {
          throw formlyUsability.getFieldError(
            'field-model-must-be-initialized',
            'Field model must be initialized. When specifying a model as a string for a field, the result of the' +
            ' expression must have been initialized ahead of time.',
            field)
        }
      }
      return isNewModel
    }

    function refrencesCurrentlyWatchedModel(expression) {
      return ['model', 'formState'].some(item => {
        return formlyUtil.startsWith(expression, `${item}.`) || formlyUtil.startsWith(expression, `${item}[`)
      })
    }

    function attachKey(field, index) {
      if (!isFieldGroup(field)) {
        field.key = field.key || index || 0
      }
    }

    function setupWatchers(field, index) {
      if (isFieldGroup(field) || !angular.isDefined(field.watcher)) {
        return
      }
      let watchers = field.watcher
      if (!angular.isArray(watchers)) {
        watchers = [watchers]
      }
      angular.forEach(watchers, function setupWatcher(watcher) {
        if (!angular.isDefined(watcher.listener)) {
          throw formlyUsability.getFieldError(
            'all-field-watchers-must-have-a-listener',
            'All field watchers must have a listener', field
          )
        }
        const watchExpression = getWatchExpression(watcher, field, index)
        const watchListener = getWatchListener(watcher, field, index)

        const type = watcher.type || '$watch'
        watcher.stopWatching = $scope[type](watchExpression, watchListener, watcher.watchDeep)
      })
    }

    function getWatchExpression(watcher, field, index) {
      let watchExpression = watcher.expression || `model['${field.key}']`
      if (angular.isFunction(watchExpression)) {
        // wrap the field's watch expression so we can call it with the field as the first arg
        // and the stop function as the last arg as a helper
        const originalExpression = watchExpression
        watchExpression = function formlyWatchExpression() {
          const args = modifyArgs(watcher, index, ...arguments)
          return originalExpression(...args)
        }
        watchExpression.displayName = `Formly Watch Expression for field for ${field.key}`
      }
      return watchExpression
    }

    function getWatchListener(watcher, field, index) {
      let watchListener = watcher.listener
      if (angular.isFunction(watchListener)) {
        // wrap the field's watch listener so we can call it with the field as the first arg
        // and the stop function as the last arg as a helper
        const originalListener = watchListener
        watchListener = function formlyWatchListener() {
          const args = modifyArgs(watcher, index, ...arguments)
          return originalListener(...args)
        }
        watchListener.displayName = `Formly Watch Listener for field for ${field.key}`
      }
      return watchListener
    }

    function modifyArgs(watcher, index, ...originalArgs) {
      return [$scope.fields[index], ...originalArgs, watcher.stopWatching]
    }

    function evalCloseToFormlyExpression(expression, val, field, index) {
      const extraLocals = getFormlyFieldLikeLocals(field, index)
      return formlyUtil.formlyEval($scope, expression, val, val, extraLocals)
    }

    function getFormlyFieldLikeLocals(field, index) {
      // this makes it closer to what a regular formlyExpression would be
      return {
        options: field,
        index,
        formState: $scope.options.formState,
        formId: $scope.formId,
      }
    }
  }

  function formlyFormLink(scope, el, attrs) {
    setFormController()
    fixChromeAutocomplete()

    function setFormController() {
      const formId = attrs.name
      scope.formId = formId
      scope.theFormlyForm = scope[formId]
      if (attrs.form) {
        const getter = $parse(attrs.form)
        const setter = getter.assign
        const parentForm = getter(scope.$parent)
        if (parentForm) {
          scope.theFormlyForm = parentForm
          if (scope[formId]) {
            scope.theFormlyForm.$removeControl(scope[formId])
          }

          // this next line is probably one of the more dangerous things that angular-formly does to improve the
          // API for angular-formly forms. It ensures that the NgModelControllers inside of formly-form will be
          // attached to the form that is passed to formly-form rather than the one that formly-form creates
          // this is necessary because it's confusing to have a step between the form you pass in
          // and the fields in that form. It also is because angular doesn't propagate properties like $submitted down
          // to children forms :-( This line was added to solve this issue:
          // https://github.com/formly-js/angular-formly/issues/287
          // luckily, this is how the formController has been accessed by the NgModelController since angular 1.0.0
          // so I expect it will remain this way for the life of angular 1.x
          el.removeData('$formController')
        } else {
          setter(scope.$parent, scope[formId])
        }
      }
      if (!scope.theFormlyForm && !formlyConfig.disableWarnings) {
        /* eslint no-console:0 */
        formlyWarn(
          'formly-form-has-no-formcontroller',
          'Your formly-form does not have a `form` property. Many functions of the form (like validation) may not work',
          el,
          scope
        )
      }
    }

    /*
     * chrome autocomplete lameness
     * see https://code.google.com/p/chromium/issues/detail?id=468153#c14
     * ლ(ಠ益ಠლ)   (╯°□°)╯︵ ┻━┻    (◞‸◟；)
     */
    function fixChromeAutocomplete() {
      const global = formlyConfig.extras.removeChromeAutoComplete === true
      const offInstance = scope.options && scope.options.removeChromeAutoComplete === false
      const onInstance = scope.options && scope.options.removeChromeAutoComplete === true
      if ((global && !offInstance) || onInstance) {
        const input = document.createElement('input')
        input.setAttribute('autocomplete', 'address-level4')
        input.setAttribute('hidden', 'true')
        el[0].appendChild(input)
      }

    }
  }


  // stateless util functions
  function toKebabCase(string) {
    if (string) {
      return string.replace(/([A-Z])/g, $1 => '-' + $1.toLowerCase())
    } else {
      return ''
    }
  }

  function isFieldGroup(field) {
    return field && !!field.fieldGroup
  }
}
