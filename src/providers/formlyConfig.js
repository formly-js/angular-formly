module.exports = ngModule => {
  ngModule.provider('formlyConfig', function() {

    var templateUrlMap = {};
    var templateMap = {};
    var templateWrappersMap = {};
    var templateWrapperName = 'default';

    angular.extend(this, {
      getTemplateUrl: getTemplateUrl,
      setTemplateUrl: setTemplateUrl,
      getTemplate: getTemplate,
      setTemplate: setTemplate,
      setTemplateWrapper: setTemplateWrapper,
      getTemplateWrapper: getTemplateWrapper,
      disableWarnings: false,
      $get: function formlyConfig() {
        return this;
      }
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

    function setTemplateWrapper({name, template, isUrl}) {
      if (!template) {
        template = name;
        name = templateWrapperName;
      }
      templateWrappersMap[name] = {template, isUrl};
    }

    function getTemplateWrapper(name) {
      return templateWrappersMap[name || templateWrapperName];
    }


  });
};
