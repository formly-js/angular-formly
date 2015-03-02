const angular = require('angular-fix');
const utils = require('../other/utils');

module.exports = ngModule => {
  ngModule.provider('formlyConfig', formlyConfig);

  formlyConfig.tests = ON_TEST ? require('./formlyConfig.test')(ngModule) : null;

  function formlyConfig(formlyUsabilityProvider, formlyApiCheck) {

    var typeMap = {};
    var templateWrappersMap = {};
    var defaultWrapperName = 'default';
    var _this = this;
    var getError = formlyUsabilityProvider.getFormlyError;
    const allowedTypeProperties = [
      'name', 'template', 'templateUrl', 'controller', 'link',
      'defaultOptions', 'extends', 'wrapper', 'data', 'validateOptions', 'overwriteOk'
    ];

    angular.extend(this, {
      setType,
      getType,
      setWrapper,
      getWrapper,
      getWrapperByType,
      removeWrapperByName,
      removeWrappersForType,
      disableWarnings: false,
      extras: {
        disableNgModelAttrsManipulator: false,
        ngModelAttrsManipulatorPreferBound: false
      },
      templateManipulators: {
        preWrapper: [],
        postWrapper: []
      },
      $get: () => this
    });

    function setType(options) {
      if (angular.isArray(options)) {
        angular.forEach(options, setType);
      } else if (angular.isObject(options)) {
        checkType(options);
        if (options.extends) {
          extendTypeOptions(options);
        }
        typeMap[options.name] = options;
      } else {
        throw getError(`You must provide an object or array for setType. You provided: ${JSON.stringify(arguments)}`);
      }
    }

    function checkType(options) {
      formlyApiCheck.throw(formlyApiCheck.formlyTypeOptions, arguments, {
        prefix: 'formlyConfig.setType',
        url: 'settype-validation-failed'
      });
      if (!options.overwriteOk) {
        checkOverwrite(options.name, typeMap, options, 'types');
      } else {
        options.overwriteOk = undefined;
      }
      formlyUsabilityProvider.checkAllowedProperties(allowedTypeProperties, options);
    }

    function extendTypeOptions(options) {
      const extendsType = getType(options.extends, true, options);
      extendTypeControllerFunction(options, extendsType);
      extendTypeLinkFunction(options, extendsType);
      extendTypeValidateOptionsFunction(options, extendsType);
      extendTypeDefaultOptions(options, extendsType);
      utils.reverseDeepMerge(options, extendsType);
    }

    function extendTypeControllerFunction(options, extendsType) {
      const extendsCtrl = extendsType.controller;
      if (!angular.isDefined(extendsCtrl)) {
        return;
      }
      const optionsCtrl = options.controller;
      if (angular.isDefined(optionsCtrl)) {
        options.controller = function($scope, $controller) {
          $controller(extendsCtrl, {$scope});
          $controller(optionsCtrl, {$scope});
        };
        options.controller.$inject = ['$scope', '$controller'];
      } else {
        options.controller = extendsCtrl;
      }
    }

    function extendTypeLinkFunction(options, extendsType) {
      const extendsFn = extendsType.link;
      if (!angular.isDefined(extendsFn)) {
        return;
      }
      const optionsFn = options.link;
      if (angular.isDefined(optionsFn)) {
        options.link = function() {
          extendsFn(...arguments);
          optionsFn(...arguments);
        };
      } else {
        options.link = extendsFn;
      }
    }

    function extendTypeValidateOptionsFunction(options, extendsType) {
      const extendsFn = extendsType.validateOptions;
      if (!angular.isDefined(extendsFn)) {
        return;
      }
      const optionsFn = options.validateOptions;
      const originalDefaultOptions = options.defaultOptions;
      if (angular.isDefined(optionsFn)) {
        options.validateOptions = function(options) {
          optionsFn(options);
          let mergedOptions = angular.copy(options);
          let defaultOptions = originalDefaultOptions;
          if (defaultOptions) {
            if (angular.isFunction(defaultOptions)) {
              defaultOptions = defaultOptions(mergedOptions);
            }
            utils.reverseDeepMerge(mergedOptions, defaultOptions);
          }
          extendsFn(mergedOptions);
        };
      } else {
        options.validateOptions = extendsFn;
      }
    }

    function extendTypeDefaultOptions(options, extendsType) {
      const extendsDO = extendsType.defaultOptions;
      if (!angular.isDefined(extendsDO)) {
        return;
      }
      const optionsDO = options.defaultOptions;
      const optionsDOIsFn = angular.isFunction(optionsDO);
      const extendsDOIsFn = angular.isFunction(extendsDO);
      if (extendsDOIsFn) {
        options.defaultOptions = function defaultOptions(options) {
          var extendsDefaultOptions = extendsDO(options);
          let mergedDefaultOptions = {};
          utils.reverseDeepMerge(mergedDefaultOptions, options, extendsDefaultOptions);
          if (optionsDOIsFn) {
            return optionsDO(mergedDefaultOptions);
          } else {
            utils.reverseDeepMerge(extendsDefaultOptions, optionsDO);
            return extendsDefaultOptions;
          }
        };
      } else if (optionsDOIsFn) {
        options.defaultOptions = function defaultOptions(options) {
          let newDefaultOptions = {};
          utils.reverseDeepMerge(newDefaultOptions, options, extendsDO);
          return optionsDO(newDefaultOptions);
        };
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


    function warn() {
      if (!_this.disableWarnings) {
        console.warn(...arguments);
      }
    }
  }



};
