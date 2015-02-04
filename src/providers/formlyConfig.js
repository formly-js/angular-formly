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

    function getType(name) {
      return typeMap[name];
    }

    function checkType(options) {
      if (!options.name) {
        throw getError(`You must provide a name for setType. You provided: ${JSON.stringify(arguments)}`);
      } else if (!options.template && !options.templateUrl) {
        throw getError(
          `You must provide a template OR templateUrl for setType. You provided neither: ${JSON.stringify(arguments)}`
        );
      } else if (options.template && options.templateUrl) {
        throw getError(
          `You must provide a template OR templateUrl for setType. You provided both: ${JSON.stringify(arguments)}`
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
      if (wrappers.length === 1) {
        return wrappers[0];
      } else if (wrappers.length > 1) {
        return wrappers;
      }
      // otherwise nothing
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
