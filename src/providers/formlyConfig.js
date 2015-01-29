let angular = require('angular-fix');

module.exports = ngModule => {
  ngModule.provider('formlyConfig', formlyConfig);

  formlyConfig.tests = ON_TEST ? require('./formlyConfig.test')(ngModule) : null;

  function formlyConfig(formlyUsabilityProvider) {

    var templateUrlMap = {};
    var templateMap = {};
    var templateWrappersMap = {};
    var defaultTemplateWrapperName = 'default';
    var _this = this;

    angular.extend(this, {
      getTemplateUrl: getTemplateUrl,
      setTemplateUrl: setTemplateUrl,
      getTemplate: getTemplate,
      setTemplate: setTemplate,
      setTemplateWrapper: setTemplateWrapper,
      getTemplateWrapper: getTemplateWrapper,
      getTemplateWrapperByType: getTemplateWrapperByType,
      disableWarnings: false,
      $get: () => this
    });

    function setTemplateUrl(name, templateUrl) {
      validateSetterApi(name, templateUrl, false, arguments);
      if (typeof name === 'string') {
        checkOverwrite(name, templateUrlMap, templateUrl, 'templateUrls');
        templateUrlMap[name] = templateUrl;
      } else {
        angular.forEach(name, function(templateUrl, name) {
          setTemplateUrl(name, templateUrl);
        });
      }
    }

    function getTemplateUrl(type) {
      return templateUrlMap[type];
    }

    function setTemplate(name, template) {
      validateSetterApi(name, template, false, arguments);
      if (typeof name === 'string') {
        checkOverwrite(name, templateMap, template, 'templates');
        templateMap[name] = template;
      } else {
        angular.forEach(name, function(template, name) {
          setTemplate(name, template);
        });
      }
    }

    function getTemplate(type) {
      return templateMap[type];
    }

    function validateSetterApi(name, templateOrUrl, isUrl, args) {
      var templatesName = isUrl ? 'templateUrls' : 'templates';
      if (angular.isObject(name)) {
        return;
      }
      if (!angular.isString(name)) {
        throw formlyUsabilityProvider.getFormlyError(
          null,
          `You must provide a name for all ${templatesName}. You provided: ${JSON.stringify(args)}`
        );
      } else if (!angular.isString(templateOrUrl)) {
        throw formlyUsabilityProvider.getFormlyError(
          null,
          `You must provide a string for all ${templatesName}. You provided: ${JSON.stringify(args)}`
        );
      }
    }

    function setTemplateWrapper(options, name) {
      if (angular.isArray(options)) {
        return options.map(setTemplateWrapper);
      } else if (angular.isObject(options)) {
        options.types = getOptionsTypes(options);
        options.name = getOptionsName(options, name);
        checkTemplateWrapperAPI(options);
        templateWrappersMap[options.name] = options;
        return options;
      } else if (angular.isString(options)) {
        return setTemplateWrapper({
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
      return options.name || name || options.types.join(' ') || defaultTemplateWrapperName;
    }

    function checkTemplateWrapperAPI(options) {
      formlyUsabilityProvider.checkWrapper(options);
      if (options.template) {
        formlyUsabilityProvider.checkWrapperTemplate(options.template, options);
      }
      checkOverwrite(options.name, templateWrappersMap, options, 'templateWrappers');
      checkTemplateWrapperTypes(options);
    }

    function checkTemplateWrapperTypes(options) {
      let shouldThrow = !angular.isArray(options.types) || !options.types.every(angular.isString);
      if (shouldThrow) {
        throw formlyUsabilityProvider.getFormlyError(
          `Attempted to create a template wrapper with types that is not a string or an array of strings`
        );
      }
      let wrapperWithSameType = options.types.some(getTemplateWrapperByType);
      if (wrapperWithSameType) {
        throw formlyUsabilityProvider.getFormlyError([
          `Attempted to create a template wrapper with types that have already been specified for another template.`,
          `Original wrapper: ${JSON.stringify(wrapperWithSameType)}, you specified: ${JSON.stringify(options)}`
        ].join(' '));
      }
    }

    function checkOverwrite(property, object, newValue, objectName) {
      if (!_this.disableWarnings && object.hasOwnProperty(property)) {
        console.warn([
          `Attempting to overwrite ${property} on ${objectName} which is currently`,
          `${JSON.stringify(object[property])} with ${JSON.stringify(newValue)}`
        ].join(' '));
      }
    }

    function getTemplateWrapper(name) {
      return templateWrappersMap[name || defaultTemplateWrapperName];
    }

    function getTemplateWrapperByType(type) {
      for (var name in templateWrappersMap) {
        if (templateWrappersMap.hasOwnProperty(name)) {
          if (templateWrappersMap[name].types && templateWrappersMap[name].types.indexOf(type) !== -1) {
            return templateWrappersMap[name];
          }
        }
      }
    }


  }
};
