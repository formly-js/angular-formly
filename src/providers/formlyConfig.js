import angular from 'angular-fix';
import utils from '../other/utils';

export default formlyConfig;

// @ngInject
function formlyConfig(formlyUsabilityProvider, formlyErrorAndWarningsUrlPrefix, formlyApiCheck) {

  const typeMap = {};
  const templateWrappersMap = {};
  const defaultWrapperName = 'default';
  const _this = this;
  const getError = formlyUsabilityProvider.getFormlyError;

  angular.extend(this, {
    setType,
    getType,
    getTypeHeritage,
    setWrapper,
    getWrapper,
    getWrapperByType,
    removeWrapperByName,
    removeWrappersForType,
    disableWarnings: false,
    extras: {
      disableNgModelAttrsManipulator: false,
      fieldTransform: [],
      ngModelAttrsManipulatorPreferUnbound: false,
      removeChromeAutoComplete: false,
      defaultHideDirective: 'ng-if',
      getFieldId: null,
      explicitAsync: false
    },
    templateManipulators: {
      preWrapper: [],
      postWrapper: []
    },
    $get: () => this
  });

  function setType(options) {
    if (angular.isArray(options)) {
      const allTypes = [];
      angular.forEach(options, item => {
        allTypes.push(setType(item));
      });
      return allTypes;
    } else if (angular.isObject(options)) {
      checkType(options);
      if (options.extends) {
        extendTypeOptions(options);
      }
      typeMap[options.name] = options;
      return typeMap[options.name];
    } else {
      throw getError(`You must provide an object or array for setType. You provided: ${JSON.stringify(arguments)}`);
    }
  }

  function checkType(options) {
    formlyApiCheck.throw(formlyApiCheck.formlyTypeOptions, options, {
      prefix: 'formlyConfig.setType',
      url: 'settype-validation-failed'
    });
    if (!options.overwriteOk) {
      checkOverwrite(options.name, typeMap, options, 'types');
    } else {
      options.overwriteOk = undefined;
    }
  }

  function extendTypeOptions(options) {
    const extendsType = getType(options.extends, true, options);
    extendTypeControllerFunction(options, extendsType);
    extendTypeLinkFunction(options, extendsType);
    extendTypeDefaultOptions(options, extendsType);
    utils.reverseDeepMerge(options, extendsType);
    extendTemplate(options, extendsType);
  }

  function extendTemplate(options, extendsType) {
    if (options.template && extendsType.templateUrl) {
      delete options.templateUrl;
    } else if (options.templateUrl && extendsType.template) {
      delete options.template;
    }
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

  function extendTypeDefaultOptions(options, extendsType) {
    const extendsDO = extendsType.defaultOptions;
    if (!angular.isDefined(extendsDO)) {
      return;
    }
    const optionsDO = options.defaultOptions;
    const optionsDOIsFn = angular.isFunction(optionsDO);
    const extendsDOIsFn = angular.isFunction(extendsDO);
    if (extendsDOIsFn) {
      options.defaultOptions = function defaultOptions(opts, scope) {
        const extendsDefaultOptions = extendsDO(opts, scope);
        const mergedDefaultOptions = {};
        utils.reverseDeepMerge(mergedDefaultOptions, opts, extendsDefaultOptions);
        let extenderOptionsDefaultOptions = optionsDO;
        if (optionsDOIsFn) {
          extenderOptionsDefaultOptions = extenderOptionsDefaultOptions(mergedDefaultOptions, scope);
        }
        utils.reverseDeepMerge(extendsDefaultOptions, extenderOptionsDefaultOptions);
        return extendsDefaultOptions;
      };
    } else if (optionsDOIsFn) {
      options.defaultOptions = function defaultOptions(opts, scope) {
        const newDefaultOptions = {};
        utils.reverseDeepMerge(newDefaultOptions, opts, extendsDO);
        return optionsDO(newDefaultOptions, scope);
      };
    }
  }

  function getType(name, throwError, errorContext) {
    if (!name) {
      return undefined;
    }
    const type = typeMap[name];
    if (!type && throwError === true) {
      throw getError(
        `There is no type by the name of "${name}": ${JSON.stringify(errorContext)}`
      );
    } else {
      return type;
    }
  }

  function getTypeHeritage(parent) {
    const heritage = [];
    let type = parent;
    if (angular.isString(type)) {
      type = getType(parent);
    }
    parent = type.extends;
    while (parent) {
      type = getType(parent);
      heritage.push(type);
      parent = type.extends;
    }
    return heritage;
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
    const shouldThrow = !angular.isArray(options.types) || !options.types.every(angular.isString);
    if (shouldThrow) {
      throw getError(`Attempted to create a template wrapper with types that is not a string or an array of strings`);
    }
  }

  function checkOverwrite(property, object, newValue, objectName) {
    if (object.hasOwnProperty(property)) {
      warn('overwriting-types-or-wrappers', [
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
    /* eslint prefer-const:0 */
    const wrappers = [];
    for (let name in templateWrappersMap) {
      if (templateWrappersMap.hasOwnProperty(name)) {
        if (templateWrappersMap[name].types && templateWrappersMap[name].types.indexOf(type) !== -1) {
          wrappers.push(templateWrappersMap[name]);
        }
      }
    }
    return wrappers;
  }

  function removeWrapperByName(name) {
    const wrapper = templateWrappersMap[name];
    delete templateWrappersMap[name];
    return wrapper;
  }

  function removeWrappersForType(type) {
    const wrappers = getWrapperByType(type);
    if (!wrappers) {
      return undefined;
    }
    if (!angular.isArray(wrappers)) {
      return removeWrapperByName(wrappers.name);
    } else {
      wrappers.forEach((wrapper) => removeWrapperByName(wrapper.name));
      return wrappers;
    }
  }


  function warn() {
    if (!_this.disableWarnings && console.warn) {
      /* eslint no-console:0 */
      const args = Array.prototype.slice.call(arguments);
      const warnInfoSlug = args.shift();
      args.unshift('Formly Warning:');
      args.push(`${formlyErrorAndWarningsUrlPrefix}${warnInfoSlug}`);
      console.warn(...args);
    }
  }
}
