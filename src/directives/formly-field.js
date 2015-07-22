import angular from 'angular-fix';
import apiCheckFactory from 'api-check';

export default formlyField;

/**
 * @ngdoc directive
 * @name formlyField
 * @restrict AE
 */
// @ngInject
function formlyField($http, $q, $compile, $templateCache, $interpolate, formlyConfig, formlyValidationMessages,
                     formlyApiCheck, formlyUtil, formlyUsability, formlyWarn) {
  const {arrayify} = formlyUtil;

  return {
    restrict: 'AE',
    transclude: true,
    scope: {
      options: '=',
      model: '=',
      formId: '@', // TODO remove formId in a breaking release
      index: '=?',
      fields: '=?',
      formState: '=?',
      formOptions: '=?',
      form: '=?' // TODO require form in a breaking release
    },
    controller: FormlyFieldController,
    link: fieldLink
  };


  // @ngInject
  function FormlyFieldController($scope, $timeout, $parse, $controller) {
    /* eslint max-statements:[2, 31] */
    if ($scope.options.fieldGroup) {
      setupFieldGroup();
      return;
    }

    var fieldType = getFieldType($scope.options);
    simplifyLife($scope.options);
    mergeFieldOptionsWithTypeDefaults($scope.options, fieldType);
    extendOptionsWithDefaults($scope.options, $scope.index);
    checkApi($scope.options);
    // set field id to link labels and fields

    // initalization
    setFieldIdAndName();
    setDefaultValue();
    setInitialValue();
    runExpressions();
    addModelWatcher($scope, $scope.options);
    addValidationMessages($scope.options);
    invokeControllers($scope, $scope.options, fieldType);

    // function definitions
    function runExpressions() {
      // must run on next tick to make sure that the current value is correct.
      $timeout(function runExpressionsOnNextTick() {
        var field = $scope.options;
        var currentValue = valueGetterSetter();
        angular.forEach(field.expressionProperties, function runExpression(expression, prop) {
          var setter = $parse(prop).assign;
          var promise = $q.when(formlyUtil.formlyEval($scope, expression, currentValue, currentValue));
          promise.then(function setFieldValue(value) {
            setter(field, value);
          });
        });
      });
    }

    function valueGetterSetter(newVal) {
      if (angular.isDefined(newVal)) {
        $scope.model[$scope.options.key] = newVal;
      }
      return $scope.model[$scope.options.key];
    }

    function simplifyLife(options) {
      // add a few empty objects (if they don't already exist) so you don't have to undefined check everywhere
      formlyUtil.reverseDeepMerge(options, {
        data: {},
        templateOptions: {},
        validation: {}
      });
      // create $scope.to so template authors can reference to instead of $scope.options.templateOptions
      $scope.to = $scope.options.templateOptions;
      $scope.formOptions = $scope.formOptions || {};
    }

    function setFieldIdAndName() {
      if (angular.isFunction(formlyConfig.extras.getFieldId)) {
        $scope.id = formlyConfig.extras.getFieldId($scope.options, $scope.model, $scope);
      } else {
        const formName = ($scope.form && $scope.form.$name) || $scope.formId;
        $scope.id = formlyUtil.getFieldId(formName, $scope.options, $scope.index);
      }
      $scope.options.id = $scope.id;
      $scope.name = $scope.options.name || $scope.options.id;
      $scope.options.name = $scope.name;
    }

    function setDefaultValue() {
      if (angular.isDefined($scope.options.defaultValue) && !angular.isDefined($scope.model[$scope.options.key])) {
        $scope.model[$scope.options.key] = $scope.options.defaultValue;
      }
    }

    function setInitialValue() {
      $scope.options.initialValue = $scope.model && $scope.model[$scope.options.key];
    }

    function mergeFieldOptionsWithTypeDefaults(options, type) {
      if (type) {
        mergeOptions(options, type.defaultOptions);
      }
      var properOrder = arrayify(options.optionsTypes).reverse(); // so the right things are overridden
      angular.forEach(properOrder, typeName => {
        mergeOptions(options, formlyConfig.getType(typeName, true, options).defaultOptions);
      });
    }

    function mergeOptions(options, extraOptions) {
      if (extraOptions) {
        if (angular.isFunction(extraOptions)) {
          extraOptions = extraOptions(options);
        }
        formlyUtil.reverseDeepMerge(options, extraOptions);
      }
    }

    function extendOptionsWithDefaults(options, index) {
      const key = options.key || index || 0;
      angular.extend(options, {
        // attach the key in case the formly-field directive is used directly
        key,
        value: options.value || valueGetterSetter,
        runExpressions,
        resetModel,
        updateInitialValue
      });
    }

    // initialization functions
    function addModelWatcher(scope, options) {
      if (options.model) {
        scope.$watch('options.model', runExpressions, true);
      }
    }

    function resetModel() {
      $scope.model[$scope.options.key] = $scope.options.initialValue;
      if ($scope.options.formControl) {
        if (angular.isArray($scope.options.formControl)) {
          angular.forEach($scope.options.formControl, function(formControl) {
            resetFormControl(formControl, true);
          });
        } else {
          resetFormControl($scope.options.formControl);
        }
      }
    }

    function resetFormControl(formControl, isMultiNgModel) {
      if (!isMultiNgModel) {
        formControl.$setViewValue($scope.model[$scope.options.key]);
      }

      formControl.$render();
      formControl.$setUntouched();
      formControl.$setPristine();

      // To prevent breaking change requiring a digest to reset $viewModel
      if (!$scope.$root.$$phase) {
        $scope.$digest();
      }
    }

    function updateInitialValue() {
      $scope.options.initialValue = $scope.model[$scope.options.key];
    }

    function addValidationMessages(options) {
      options.validation.messages = options.validation.messages || {};
      angular.forEach(formlyValidationMessages.messages, function createFunctionForMessage(expression, name) {
        if (!options.validation.messages[name]) {
          options.validation.messages[name] = function evaluateMessage(viewValue, modelValue, scope) {
            return formlyUtil.formlyEval(scope, expression, modelValue, viewValue);
          };
        }
      });
    }

    function invokeControllers(scope, options = {}, type = {}) {
      angular.forEach([type.controller, options.controller], controller => {
        if (controller) {
          $controller(controller, {$scope: scope});
        }
      });
    }

    function setupFieldGroup() {
      $scope.options.options = $scope.options.options || {};
      $scope.options.options.formState = $scope.formState;
    }
  }


  // link function
  function fieldLink(scope, el) {
    if (scope.options.fieldGroup) {
      setFieldGroupTemplate();
      return;
    }

    addAttributes();
    addClasses();

    var type = getFieldType(scope.options);
    var args = arguments;
    var thusly = this;
    var fieldCount = 0;
    const fieldManipulators = getManipulators(scope.options, scope.formOptions);
    getFieldTemplate(scope.options)
      .then(runManipulators(fieldManipulators.preWrapper))
      .then(transcludeInWrappers(scope.options, scope.formOptions))
      .then(runManipulators(fieldManipulators.postWrapper))
      .then(setElementTemplate)
      .then(watchFormControl)
      .then(callLinkFunctions)
      .catch(error => {
        formlyWarn(
          'there-was-a-problem-setting-the-template-for-this-field',
          'There was a problem setting the template for this field ',
          scope.options,
          error
        );
      });

    function setFieldGroupTemplate() {
      checkFieldGroupApi(scope.options);
      el.addClass('formly-field-group');
      let extraAttributes = '';
      if (scope.options.elementAttributes) {
        extraAttributes = Object.keys(scope.options.elementAttributes).map(key => {
          return `${key}="${scope.options.elementAttributes[key]}"`;
        }).join(' ');
      }
      let modelValue = 'model';
      scope.options.form = scope.form;
      if (scope.options.key) {
        modelValue = `model['${scope.options.key}']`;
      }
      setElementTemplate(`
          <formly-form model="${modelValue}"
                       fields="options.fieldGroup"
                       options="options.options"
                       form="options.form"
                       class="${scope.options.className}"
                       ${extraAttributes}
                       is-field-group>
          </formly-form>
        `);
    }

    function addAttributes() {
      if (scope.options.elementAttributes) {
        el.attr(scope.options.elementAttributes);
      }
    }

    function addClasses() {
      if (scope.options.className) {
        el.addClass(scope.options.className);
      }
      if (scope.options.type) {
        el.addClass(`formly-field-${scope.options.type}`);
      }
    }

    function setElementTemplate(templateString) {
      el.html(asHtml(templateString));
      $compile(el.contents())(scope);
      return templateString;
    }

    function watchFormControl(templateString) {
      let stopWatchingShowError = angular.noop;
      if (scope.options.noFormControl) {
        return;
      }
      const templateEl = angular.element(`<div>${templateString}</div>`);
      const ngModelNodes = templateEl[0].querySelectorAll('[ng-model],[data-ng-model]');


      if (ngModelNodes) {
        angular.forEach(ngModelNodes, function(ngModelNode) {
          fieldCount++;
          watchFieldNameOrExistence(ngModelNode.getAttribute('name'));
        });
      }

      function watchFieldNameOrExistence(name) {
        const nameExpressionRegex = /\{\{(.*?)}}/;
        const nameExpression = nameExpressionRegex.exec(name);
        if (nameExpression) {
          name = $interpolate(name)(scope);
        }
        watchFieldExistence(name);
      }

      function watchFieldExistence(name) {
        scope.$watch(`form["${name}"]`, function formControlChange(formControl) {
          if (formControl) {
            if (fieldCount > 1) {
              if (!scope.options.formControl) {
                scope.options.formControl = [];
              }
              scope.options.formControl.push(formControl);
            } else {
              scope.options.formControl = formControl;
            }
            scope.fc = scope.options.formControl; // shortcut for template authors
            stopWatchingShowError();
            addShowMessagesWatcher();
          }
        });
      }

      function addShowMessagesWatcher() {
        stopWatchingShowError = scope.$watch(function watchShowValidationChange() {
          const customExpression = formlyConfig.extras.errorExistsAndShouldBeVisibleExpression;
          const {options, fc} = scope;
          if (!fc.$invalid) {
            return false;
          } else if (typeof options.validation.show === 'boolean') {
            return options.validation.show;
          } else if (customExpression) {
            return formlyUtil.formlyEval(scope, customExpression, fc.$modelValue, fc.$viewValue);
          } else {
            let noTouchedButDirty = (angular.isUndefined(fc.$touched) && fc.$dirty);
            return (scope.fc.$touched || noTouchedButDirty);
          }
        }, function onShowValidationChange(show) {
          scope.options.validation.errorExistsAndShouldBeVisible = show;
          scope.showError = show; // shortcut for template authors
        });
      }
    }

    function callLinkFunctions() {
      if (type && type.link) {
        type.link.apply(thusly, args);
      }
      if (scope.options.link) {
        scope.options.link.apply(thusly, args);
      }
    }


    function runManipulators(manipulators) {
      return function runManipulatorsOnTemplate(templateToManipulate) {
        var chain = $q.when(templateToManipulate);
        angular.forEach(manipulators, manipulator => {
          chain = chain.then(template => {
            return $q.when(manipulator(template, scope.options, scope)).then(newTemplate => {
              return angular.isString(newTemplate) ? newTemplate : asHtml(newTemplate);
            });
          });
        });
        return chain;
      };
    }
  }

  // sort-of stateless util functions
  function asHtml(el) {
    var wrapper = angular.element('<a></a>');
    return wrapper.append(el).html();
  }

  function getFieldType(options) {
    return options.type && formlyConfig.getType(options.type);
  }

  function getManipulators(options, formOptions) {
    let preWrapper = [];
    let postWrapper = [];
    addManipulators(options.templateManipulators);
    addManipulators(formOptions.templateManipulators);
    addManipulators(formlyConfig.templateManipulators);
    return {preWrapper, postWrapper};

    function addManipulators(manipulators) {
      /* eslint-disable */ // it doesn't understand this :-(
      const {preWrapper:pre = [], postWrapper:post = []} = (manipulators || {});
      preWrapper = preWrapper.concat(pre);
      postWrapper = postWrapper.concat(post);
      /* eslint-enable */
    }
  }

  function getFieldTemplate(options) {
    function fromOptionsOrType(key, fieldType) {
      if (angular.isDefined(options[key])) {
        return options[key];
      } else if (fieldType && angular.isDefined(fieldType[key])) {
        return fieldType[key];
      }
    }

    let type = formlyConfig.getType(options.type, true, options);
    let template = fromOptionsOrType('template', type);
    let templateUrl = fromOptionsOrType('templateUrl', type);
    if (angular.isUndefined(template) && !templateUrl) {
      throw formlyUsability.getFieldError(
        'type-type-has-no-template',
        `Type '${options.type}' has not template. On element:`, options
      );
    }

    return getTemplate(templateUrl || template, angular.isUndefined(template), options);
  }


  function getTemplate(template, isUrl, options) {
    let templatePromise;
    if (angular.isFunction(template)) {
      templatePromise = $q.when(template(options));
    } else {
      templatePromise = $q.when(template);
    }

    if (!isUrl) {
      return templatePromise;
    } else {
      let httpOptions = {cache: $templateCache};
      return templatePromise
        .then((url) => $http.get(url, httpOptions))
        .then((response) => response.data)
        .catch(function handleErrorGettingATemplate(error) {
          formlyWarn(
            'problem-loading-template-for-templateurl',
            'Problem loading template for ' + template,
            error
          );
        });
    }
  }

  function transcludeInWrappers(options, formOptions) {
    let wrapper = getWrapperOption(options, formOptions);

    return function transcludeTemplate(template) {
      if (!wrapper.length) {
        return $q.when(template);
      }

      wrapper.forEach((aWrapper) => {
        formlyUsability.checkWrapper(aWrapper, options);
        aWrapper.validateOptions && aWrapper.validateOptions(options);
        runApiCheck(aWrapper, options);
      });
      let promises = wrapper.map(w => getTemplate(w.template || w.templateUrl, !w.template));
      return $q.all(promises).then(wrappersTemplates => {
        wrappersTemplates.forEach((wrapperTemplate, index) => {
          formlyUsability.checkWrapperTemplate(wrapperTemplate, wrapper[index]);
        });
        wrappersTemplates.reverse(); // wrapper 0 is wrapped in wrapper 1 and so on...
        let totalWrapper = wrappersTemplates.shift();
        wrappersTemplates.forEach(wrapperTemplate => {
          totalWrapper = doTransclusion(totalWrapper, wrapperTemplate);
        });
        return doTransclusion(totalWrapper, template);
      });
    };
  }

  function doTransclusion(wrapper, template) {
    let superWrapper = angular.element('<a></a>'); // this allows people not have to have a single root in wrappers
    superWrapper.append(wrapper);
    let transcludeEl = superWrapper.find('formly-transclude');
    if (!transcludeEl.length) {
      // try it using our custom find function
      transcludeEl = formlyUtil.findByNodeName(superWrapper, 'formly-transclude');
    }
    transcludeEl.replaceWith(template);
    return superWrapper.html();
  }

  function getWrapperOption(options, formOptions) {
    /* eslint complexity:[2, 6] */
    let wrapper = options.wrapper;
    // explicit null means no wrapper
    if (wrapper === null) {
      return [];
    }

    // nothing specified means use the default wrapper for the type
    if (!wrapper) {
      // get all wrappers that specify they apply to this type
      wrapper = arrayify(formlyConfig.getWrapperByType(options.type));
    } else {
      wrapper = arrayify(wrapper).map(formlyConfig.getWrapper);
    }

    // get all wrappers for that the type specified that it uses.
    var type = formlyConfig.getType(options.type, true, options);
    if (type && type.wrapper) {
      let typeWrappers = arrayify(type.wrapper).map(formlyConfig.getWrapper);
      wrapper = wrapper.concat(typeWrappers);
    }

    // add form wrappers
    if (formOptions.wrapper) {
      let formWrappers = arrayify(formOptions.wrapper).map(formlyConfig.getWrapper);
      wrapper = wrapper.concat(formWrappers);
    }

    // add the default wrapper last
    var defaultWrapper = formlyConfig.getWrapper();
    if (defaultWrapper) {
      wrapper.push(defaultWrapper);
    }
    return wrapper;
  }

  function checkApi(options) {
    formlyApiCheck.throw(formlyApiCheck.formlyFieldOptions, options, {
      prefix: 'formly-field directive',
      url: 'formly-field-directive-validation-failed'
    });
    // validate with the type
    const type = options.type && formlyConfig.getType(options.type);
    if (type) {
      if (type.validateOptions) {
        type.validateOptions(options);
      }
      runApiCheck(type, options, true);
    }
    if (options.expressionProperties && options.expressionProperties.hide) {
      formlyWarn(
        'dont-use-expressionproperties.hide-use-hideexpression-instead',
        'You have specified `hide` in `expressionProperties`. Use `hideExpression` instead',
        options
      );
    }
  }

  function checkFieldGroupApi(options) {
    formlyApiCheck.throw(formlyApiCheck.fieldGroup, options, {
      prefix: 'formly-field directive',
      url: 'formly-field-directive-validation-failed'
    });
  }

  function runApiCheck({apiCheck, apiCheckInstance, apiCheckFunction, apiCheckOptions}, options, forType) {
    runApiCheckForType(apiCheck, apiCheckInstance, apiCheckFunction, apiCheckOptions, options);
    if (forType && options.type) {
      angular.forEach(formlyConfig.getTypeHeritage(options.type), function(type) {
        runApiCheckForType(type.apiCheck, type.apiCheckInstance, type.apiCheckFunction, type.apiCheckOptions, options);
      });
    }
  }

  function runApiCheckForType(apiCheck, apiCheckInstance, apiCheckFunction, apiCheckOptions, options) {
    /* eslint complexity:[2, 8] */
    if (!apiCheck) {
      return;
    }
    const instance = apiCheckInstance || formlyApiCheck;
    if (instance.config.disabled || apiCheckFactory.globalConfig.disabled) {
      return;
    }
    const fn = apiCheckFunction || 'warn';
    if (angular.isFunction(apiCheck)) {
      // this is the new API
      const checkerObjects = apiCheck(instance);
      angular.forEach(checkerObjects, (shape, name) => {
        const checker = instance.shape(shape);
        const checkOptions = angular.extend({
          prefix: `formly-field type ${options.type} for property ${name}`,
          url: formlyApiCheck.config.output.docsBaseUrl + 'formly-field-type-apicheck-failed'
        }, apiCheckOptions);
        instance[fn](checker, options[name], checkOptions);
      });
    } else {
      // TODO this is the deprecated API. Remove this in a breaking change.
      const checker = instance.shape(apiCheck);
      const checkOptions = apiCheckOptions || {
          prefix: `formly-field type ${options.type}`,
          url: formlyApiCheck.config.output.docsBaseUrl + 'formly-field-type-apicheck-failed'
        };
      instance[fn](checker, options, checkOptions);
    }
  }


}
