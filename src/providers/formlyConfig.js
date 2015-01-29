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
    var $log;

    angular.extend(this, {
      getTemplateUrl: getTemplateUrl,
      setTemplateUrl: setTemplateUrl,
      getTemplate: getTemplate,
      setTemplate: setTemplate,
      setTemplateWrapper: setTemplateWrapper,
      getTemplateWrapper: getTemplateWrapper,
      disableWarnings: false,
      $get: ['$log', (log) => {
        $log = log;
        return this;
      }]
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
      /* jshint maxcomplexity:7 */
      if (angular.isArray(options)) {
        return options.map(setTemplateWrapper);
      } else if (angular.isObject(options)) {
        options.name = options.name || name || defaultTemplateWrapperName;
        checkTemplateWrapperAPI(options);
        if (angular.isString(options.types)) {
          options.types = [options.types];
        }
        templateWrappersMap[options.name] = options;
        return options;
      } else if (angular.isString(options)) {
        return setTemplateWrapper({
          template: options,
          name
        });
      }
    }

    function checkTemplateWrapperAPI(options) {
      formlyUsabilityProvider.checkWrapper(options);
      if (options.template) {
        formlyUsabilityProvider.checkWrapperTemplate(options.template, options);
      }
      checkOverwrite(options.name, templateWrappersMap, options, 'templateWrappers');
      if (angular.isDefined(options.types) && (!angular.isArray(options.types) && !angular.isString(options.types))) {
        throw formlyUsabilityProvider.getFormlyError(
          `Attempted to create a template wrapper with types that is not a string or an array of strings`
        );
      }
    }

    function checkOverwrite(property, object, newValue, objectName) {
      if (!_this.disableWarnings && object.hasOwnProperty(property)) {
        $log.warn([
          `Attempting to overwrite ${property} on ${objectName} which is currently`,
          `${JSON.stringify(object[property])} with ${JSON.stringify(newValue)}`
        ].join(' '));
      }
    }

    function getTemplateWrapper(name) {
      return templateWrappersMap[name || defaultTemplateWrapperName];
    }


  }
};
