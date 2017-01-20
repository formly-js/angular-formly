import angular from 'angular-fix'

function isFieldGroup(field) {
  return field && !!field.fieldGroup
}

// @ngInject
export default function FormlyFormController(
  formlyUsability, formlyWarn, formlyConfig, $parse, $scope, formlyApiCheck, formlyUtil) {

  setupOptions()
  $scope.model = $scope.model || {}
  setupFields()

  // watch the model and evaluate watch expressions that depend on it.
  if (!$scope.options.manualModelWatcher) {
    $scope.$watch('model', onModelOrFormStateChange, true)
  } else if (angular.isFunction($scope.options.manualModelWatcher)) {
    $scope.$watch($scope.options.manualModelWatcher, onModelOrFormStateChange, true)
  }

  if ($scope.options.formState) {
    $scope.$watch('options.formState', onModelOrFormStateChange, true)
  }

  function onModelOrFormStateChange() {
    angular.forEach($scope.fields, runFieldExpressionProperties)
  }

  function validateFormControl(formControl, promise) {
    const validate = formControl.$validate
    if (promise) {
      promise.then(() => validate.apply(formControl))
    } else {
      validate()
    }
  }

  function runFieldExpressionProperties(field, index) {
    const model = field.model || $scope.model
    const promise = field.runExpressions && field.runExpressions()
    if (field.hideExpression) { // can't use hide with expressionProperties reliably
      const val = model[field.key]
      field.hide = evalCloseToFormlyExpression(field.hideExpression, val, field, index, {model})
    }
    if (field.extras && field.extras.validateOnModelChange && field.formControl) {
      if (angular.isArray(field.formControl)) {
        angular.forEach(field.formControl, function(formControl) {
          validateFormControl(formControl, promise)
        })
      } else {
        validateFormControl(field.formControl, promise)
      }
    }
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

    if ($scope.options.watchAllExpressions) {
      angular.forEach($scope.fields, setupHideExpressionWatcher)
    }

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
    // we will not set up automatic model watchers if manual mode is set
    const manualModelWatcher = $scope.options.manualModelWatcher

    if ($scope.options.formState) {
      // $scope.options.formState will have its own watcher
      watchedModels.push($scope.options.formState)
    }

    angular.forEach($scope.fields, (field) => {
      const isNewModel = initModel(field)

      if (field.model && isNewModel && watchedModels.indexOf(field.model) === -1 && !manualModelWatcher) {
        $scope.$watch(() => field.model, onModelOrFormStateChange, true)
        watchedModels.push(field.model)
      }
    })
  }

  function setupHideExpressionWatcher(field, index) {
    if (field.hideExpression) { // can't use hide with expressionProperties reliably
      const model = field.model || $scope.model
      $scope.$watch(function hideExpressionWatcher() {
        const val = model[field.key]
        return evalCloseToFormlyExpression(field.hideExpression, val, field, index, {model})
      }, (hide) => field.hide = hide, true)
    }
  }

  function initModel(field) {
    let isNewModel = true

    if (angular.isString(field.model)) {
      const expression = field.model

      isNewModel = !referencesCurrentlyWatchedModel(expression)

      field.model = resolveStringModel(expression)

      $scope.$watch(() => resolveStringModel(expression), (model) => field.model = model)
    }

    return isNewModel

    function resolveStringModel(expression) {
      const index = $scope.fields.indexOf(field)
      const model = evalCloseToFormlyExpression(expression, undefined, field, index, {model: $scope.model})

      if (!model) {
        throw formlyUsability.getFieldError(
          'field-model-must-be-initialized',
          'Field model must be initialized. When specifying a model as a string for a field, the result of the' +
            ' expression must have been initialized ahead of time.',
          field)
      }

      return model
    }
  }

  function referencesCurrentlyWatchedModel(expression) {
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
    if (!angular.isDefined(field.watcher)) {
      return
    }
    let watchers = field.watcher
    if (!angular.isArray(watchers)) {
      watchers = [watchers]
    }
    angular.forEach(watchers, function setupWatcher(watcher) {
      if (!angular.isDefined(watcher.listener) && !watcher.runFieldExpressions) {
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
    let watchExpression
    if (!angular.isUndefined(watcher.expression)) {
      watchExpression = watcher.expression
    } else if (field.key) {
      watchExpression = 'model[\'' + field.key.toString().split('.').join('\'][\'') + '\']'
    }
    if (angular.isFunction(watchExpression)) {
      // wrap the field's watch expression so we can call it with the field as the first arg
      // and the stop function as the last arg as a helper
      const originalExpression = watchExpression
      watchExpression = function formlyWatchExpression() {
        const args = modifyArgs(watcher, index, ...arguments)
        return originalExpression(...args)
      }
      watchExpression.displayName = `Formly Watch Expression for field for ${field.key}`
    } else if (field.model) {
      watchExpression = $parse(watchExpression).bind(null, $scope, {model: field.model})
    }
    return watchExpression
  }

  function getWatchListener(watcher, field, index) {
    let watchListener = watcher.listener
    if (angular.isFunction(watchListener) || watcher.runFieldExpressions) {
      // wrap the field's watch listener so we can call it with the field as the first arg
      // and the stop function as the last arg as a helper
      const originalListener = watchListener
      watchListener = function formlyWatchListener() {
        let value
        if (originalListener) {
          const args = modifyArgs(watcher, index, ...arguments)
          value = originalListener(...args)
        }
        if (watcher.runFieldExpressions) {
          runFieldExpressionProperties(field, index)
        }
        return value
      }
      watchListener.displayName = `Formly Watch Listener for field for ${field.key}`
    }
    return watchListener
  }

  function modifyArgs(watcher, index, ...originalArgs) {
    return [$scope.fields[index], ...originalArgs, watcher.stopWatching]
  }

  function evalCloseToFormlyExpression(expression, val, field, index, extraLocals = {}) {
    extraLocals = angular.extend(getFormlyFieldLikeLocals(field, index), extraLocals)
    return formlyUtil.formlyEval($scope, expression, val, val, extraLocals)
  }

  function getFormlyFieldLikeLocals(field, index) {
    // this makes it closer to what a regular formlyExpression would be
    return {
      model: field.model,
      options: field,
      index,
      formState: $scope.options.formState,
      originalModel: $scope.model,
      formOptions: $scope.options,
      formId: $scope.formId,
    }
  }
}
