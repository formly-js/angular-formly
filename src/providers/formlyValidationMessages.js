module.exports = ngModule => {
  ngModule.factory('formlyValidationMessages', function() {

    var formlyValidationMessages = {
      addTemplateOptionValueMessage,
      addStringMessage,
      messages: {}
    };

    return formlyValidationMessages;

    function addTemplateOptionValueMessage(name, prop, prefix, suffix, alternate) {
      formlyValidationMessages.messages[name] = templateOptionValue(prop, prefix, suffix, alternate);
    }

    function addStringMessage(name, string) {
      formlyValidationMessages.messages[name] = () => string;
    }


    function templateOptionValue(prop, prefix, suffix, alternate) {
      return function getValidationMessage(viewValue, modelValue, scope) {
        if (scope.options.templateOptions[prop]) {
          return `${prefix} ${scope.options.templateOptions[prop]} ${suffix}`;
        } else {
          return alternate;
        }
      };
    }
  });
};
