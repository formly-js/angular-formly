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

    function setTemplateWrapper(optionsNameOrTemplate, templateOrUrl, isUrl) {
      if (!this.disableWarnings) {
        console.warn('setTemplateWrapper is still experimental. The api may change. Use at your own risk');
      }
      if (typeof optionsNameOrTemplate === 'string') {
        if (!templateOrUrl) {
          isUrl = templateOrUrl;
          templateOrUrl = optionsNameOrTemplate;
          optionsNameOrTemplate = defaultTemplateWrapperName;
        }
        templateWrappersMap[optionsNameOrTemplate] = {[isUrl ? 'url' : 'template']: templateOrUrl};
      } else {
        angular.forEach(optionsNameOrTemplate, function(options, name) {
          formlyUsabilityProvider.checkWrapper(options);
          if (options.template) {
            formlyUsabilityProvider.checkWrapperTemplate(options.template, options);
          }
          setTemplateWrapper(name, options.template || options.url, !!options.url);
        });
      }
    }

    function getTemplateWrapper(name) {
      return templateWrappersMap[name || defaultTemplateWrapperName];
    }


  }
};
