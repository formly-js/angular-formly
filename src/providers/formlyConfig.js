let angular = require('angular-fix');

module.exports = ngModule => {
  ngModule.provider('formlyConfig', formlyConfig);

  formlyConfig.tests = ON_TEST ? require('./formlyConfig.test')(ngModule) : null;

  function formlyConfig(formlyUsabilityProvider) {

    var typeMap = {};
    var templateWrappersMap = {};
    var defaultWrapperName = 'default';
    var _this = this;
    var getError = formlyUsabilityProvider.getFormlyError;

    angular.extend(this, {
      setType: setType,
      getType: getType,
      setWrapper: setWrapper,
      getWrapper: getWrapper,
      getWrapperByType: getWrapperByType,
      removeWrapperByName: removeWrapperByName,
      removeWrappersForType: removeWrappersForType,
      disableWarnings: false,
      templateManipulators: {
        preWrapper: [ngModelAttrsManipulator],
        postWrapper: []
      },
      $get: () => this
    });

    function setType(options) {
      if (angular.isArray(options)) {
        angular.forEach(options, setType);
      } else if (angular.isObject(options)) {
        checkType(options);
        typeMap[options.name] = options;
      } else {
        throw getError(`You must provide an object or array for setType. You provided: ${JSON.stringify(arguments)}`);
      }
    }

    function getType(name, throwError, errorContext) {
      if (!name) {
        return undefined;
      }
      var type = typeMap[name];
      if (!type && throwError === true) {
        throw getError(
          `There is no type by the name of "${name}": ${JSON.stringify(errorContext)}`
        );
      } else {
        return type;
      }
    }

    function checkType(options) {
      if (!options.name) {
        throw getError(`You must provide a name for setType. You provided: ${JSON.stringify(arguments)}`);
      } else if (!options.defaultOptions && !options.template && !options.templateUrl) {
        throw getError(
          `You must provide defaultOptions OR a template OR templateUrl for setType. ` +
          `You provided none of these: ${JSON.stringify(arguments)}`
        );
      } else if (options.template && options.templateUrl) {
        throw getError(
          `You must provide at most a template OR templateUrl for setType. ` +
          `You provided both: ${JSON.stringify(arguments)}`
        );
      }
      if (!options.overwriteOk) {
        checkOverwrite(options.name, typeMap, options, 'types');
      } else {
        delete options.overwriteOk;
      }
    }

    function setWrapper(options, name) {
      if (angular.isArray(options)) {
        return options.map(wrapperOptions => setWrapper(wrapperOptions));
      } else if (angular.isObject(options)) {
        options.types = getOptionsTypes(options);
        options.name = getOptionsName(options, name);
        checkWrapperAPI(options);
        templateWrappersMap[options.name] = options;
        return options;
      } else if (angular.isString(options)) {
        return setWrapper({
          template: options,
          name
        });
      }
    }

    function getOptionsTypes(options) {
      if (angular.isString(options.types)) {
        return [options.types];
      }
      if (!angular.isDefined(options.types)) {
        return [];
      } else {
        return options.types;
      }
    }

    function getOptionsName(options, name) {
      return options.name || name || options.types.join(' ') || defaultWrapperName;
    }

    function checkWrapperAPI(options) {
      formlyUsabilityProvider.checkWrapper(options);
      if (options.template) {
        formlyUsabilityProvider.checkWrapperTemplate(options.template, options);
      }
      if (!options.overwriteOk) {
        checkOverwrite(options.name, templateWrappersMap, options, 'templateWrappers');
      } else {
        delete options.overwriteOk;
      }
      checkWrapperTypes(options);
    }

    function checkWrapperTypes(options) {
      let shouldThrow = !angular.isArray(options.types) || !options.types.every(angular.isString);
      if (shouldThrow) {
        throw getError(`Attempted to create a template wrapper with types that is not a string or an array of strings`);
      }
    }

    function checkOverwrite(property, object, newValue, objectName) {
      if (object.hasOwnProperty(property)) {
        warn([
          `Attempting to overwrite ${property} on ${objectName} which is currently`,
          `${JSON.stringify(object[property])} with ${JSON.stringify(newValue)}`,
          `To supress this warning, specify the property "overwriteOk: true"`
        ].join(' '));
      }
    }

    function getWrapper(name) {
      return templateWrappersMap[name || defaultWrapperName];
    }

    function getWrapperByType(type) {
      /* jshint maxcomplexity:6 */
      var wrappers = [];
      for (var name in templateWrappersMap) {
        if (templateWrappersMap.hasOwnProperty(name)) {
          if (templateWrappersMap[name].types && templateWrappersMap[name].types.indexOf(type) !== -1) {
            wrappers.push(templateWrappersMap[name]);
          }
        }
      }
      return wrappers;
    }

    function removeWrapperByName(name) {
      var wrapper = templateWrappersMap[name];
      delete templateWrappersMap[name];
      return wrapper;
    }

    function removeWrappersForType(type) {
      var wrappers = getWrapperByType(type);
      if (!wrappers) {
        return;
      }
      if (!angular.isArray(wrappers)) {
        return removeWrapperByName(wrappers.name);
      } else {
        wrappers.forEach((wrapper) => removeWrapperByName(wrapper.name));
        return wrappers;
      }
    }

    function ngModelAttrsManipulator(template, options, scope) {
      /* jshint maxcomplexity:7 */
      var el = angular.element('<a></a>');
      var data = options.data;
      if (data.noTouchy) {
        return template;
      }
      el.append(template);
      var modelEls = angular.element(el[0].querySelectorAll('[ng-model]'));
      if (!modelEls || !modelEls.length) {
        return template;
      }
      addNgModelAttrs(options.ngModelAttrs);

      addIfNotPresent(modelEls, 'id', scope.id);
      addIfNotPresent(modelEls, 'name', scope.id);

      if (angular.isDefined(options.validators)) {
        addIfNotPresent(modelEls, 'formly-custom-validation', 'options.validators');
      }
      if (angular.isDefined(options.modelOptions)) {
        addIfNotPresent(modelEls, 'ng-model-options', 'options.modelOptions');
        if (options.modelOptions.getterSetter) {
          modelEls.attr('ng-model', 'options.value');
        }
      }
      addTemplateOptionsAttrs();

      return el.html();


      function addTemplateOptionsAttrs() {
        // if the field has specified values for these, then we want to add the attributes and watch them for changes.
        var boundAttributes = angular.extend(data.ngModelBoundAttributes || {}, {
          'ng-disabled': 'disabled',
          'ng-required': 'required',
          'ng-pattern': 'pattern',
          'ng-maxlength': 'maxlength',
          'ng-minlength': 'minlength'
        });
        var invokedAttributes = angular.extend(data.ngModelInvokedAttributes || {}, {
          'ng-change': 'onChange',
          'ng-keydown': 'onKeydown',
          'ng-keyup': 'onKeyup',
          'ng-keypress': 'onKeypress',
          'ng-click': 'onClick',
          'ng-focus': 'onFocus',
          'ng-blur': 'onBlur'
        });
        // attributes are wrapped in curly braces
        var attributes = angular.extend(data.ngModelAttributes || {}, {
          'formly-focus': 'focus',
          placeholder: 'placeholder',
          min: 'min',
          max: 'max',
          tabindex: 'tabindex',
          type: 'type'
        });

        addDefinedAttributes(modelEls, boundAttributes, options);
        addDefinedAttributes(modelEls, attributes, options, '{{', '}}');
        addDefinedAttributes(modelEls, invokedAttributes, options,
          (val) => angular.isString(val) ? '$eval(' : '',
          (val) => angular.isString(val) ? ')' : '(model[options.key], options, this, $event)'
        );
      }

      function addNgModelAttrs(ngModelAttrs) {
        ngModelAttrs = ngModelAttrs || {};
        angular.forEach(ngModelAttrs.bound, function(val, attr) {
          addIfNotPresent(modelEls, attr, `options.ngModelAttrs.bound['${attr}']`);
        });
        angular.forEach(ngModelAttrs.unbound, function(val, attr) {
          addIfNotPresent(modelEls, attr, scope.$eval(val));
        });
      }

      function addDefinedAttributes(els, attrs, options, prefix = '', suffix = '') {
        /* jshint maxcomplexity:6 */
        var to = options.templateOptions;
        var ep = options.expressionProperties;
        if (!to && !ep) {
          return; // no reason to iterate if these don't exist...
        } else {
          to = to || {};
          ep = ep || {};
        }
        angular.forEach(attrs, (val, attrName) => {
          // if it's defined as a property on template options, or if it's an expression property,
          // then we'll add the attribute (and hence the watchers)
          if (angular.isDefined(to[val]) || angular.isDefined(ep['templateOptions.' + val])) {
            var valPrefix = angular.isFunction(prefix) ? prefix(val) : prefix;
            var valSuffix = angular.isFunction(suffix) ? suffix(val) : suffix;
            addIfNotPresent(els, `${attrName}`, `${valPrefix}options.templateOptions['${val}']${valSuffix}`);
          }
        });
      }

      function addIfNotPresent(el, attr, val) {
        if (!el.attr(attr)) {
          el.attr(attr, val);
        }
      }
    }

    function warn() {
      if (!_this.disableWarnings) {
        console.warn(...arguments);
      }
    }
  }



};
