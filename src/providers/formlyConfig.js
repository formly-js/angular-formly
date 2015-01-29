let angular = require('angular-fix');

module.exports = ngModule => {
  ngModule.provider('formlyConfig', formlyConfig);

  formlyConfig.tests = ON_TEST ? require('./formlyConfig.test')(ngModule) : null;

  function formlyConfig(formlyUsabilityProvider) {

    var templateUrlMap = {};
    var templateMap = {};
    var templateWrappersMap = {};
    var defaultTemplateWrapperName = 'default';

    angular.extend(this, {
      getTemplateUrl: getTemplateUrl,
      setTemplateUrl: setTemplateUrl,
      getTemplate: getTemplate,
      setTemplate: setTemplate,
      setTemplateWrapper: setTemplateWrapper,
      getTemplateWrapper: getTemplateWrapper,
      disableWarnings: false,
      $get: () => this
    });

    function setTemplateUrl(name, templateUrl) {
      validateSetterApi(name, templateUrl, false, arguments);
      if (typeof name === 'string') {
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

    function setTemplateWrapper(optionsNameTemplateOrUrl, templateOrUrl, isUrl) {
      if (angular.isString(optionsNameTemplateOrUrl)) {
        if (templateWrapperUsingSimpleApi()) {
          isUrl = templateOrUrl;
          templateOrUrl = optionsNameTemplateOrUrl;
          optionsNameTemplateOrUrl = defaultTemplateWrapperName;
        }
        var options = templateWrappersMap[optionsNameTemplateOrUrl] = {
          [isUrl ? 'url' : 'template']: templateOrUrl, name: optionsNameTemplateOrUrl
        };
        if (!isUrl) {
          formlyUsabilityProvider.checkWrapperTemplate(options.template, options);
        }
      } else {
        setTemplateWrapperWithObject();
      }

      function setTemplateWrapperWithObject() {
        angular.forEach(optionsNameTemplateOrUrl, function(options, name) {
          formlyUsabilityProvider.checkWrapper(options);
          setTemplateWrapper(name, options.template || options.url || options, !!options.url);
        });
      }

      function templateWrapperUsingSimpleApi() {
        return !angular.isDefined(templateOrUrl) || (typeof templateOrUrl === 'boolean' && !angular.isDefined(isUrl));
      }
    }

    function getTemplateWrapper(name) {
      return templateWrappersMap[name || defaultTemplateWrapperName];
    }


  }
};
