export default formlyValidationMessages;


// @ngInject
function formlyValidationMessages() {

  const validationMessages = {
    addTemplateOptionValueMessage,
    addStringMessage,
    messages: {}
  };

  return validationMessages;

  function addTemplateOptionValueMessage(name, prop, prefix, suffix, alternate) {
    validationMessages.messages[name] = templateOptionValue(prop, prefix, suffix, alternate);
  }

  function addStringMessage(name, string) {
    validationMessages.messages[name] = () => string;
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
}
