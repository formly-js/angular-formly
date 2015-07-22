import angular from 'angular-fix';

export default formlyUsability;

// @ngInject
function formlyUsability(formlyApiCheck, formlyErrorAndWarningsUrlPrefix) {
  angular.extend(this, {
    getFormlyError,
    getFieldError,
    checkWrapper,
    checkWrapperTemplate,
    getErrorMessage,
    $get: () => this
  });

  function getFieldError(errorInfoSlug, message, field) {
    if (arguments.length < 3) {
      field = message;
      message = errorInfoSlug;
      errorInfoSlug = null;
    }
    return new Error(getErrorMessage(errorInfoSlug, message) + ` Field definition: ${angular.toJson(field)}`);
  }

  function getFormlyError(errorInfoSlug, message) {
    if (!message) {
      message = errorInfoSlug;
      errorInfoSlug = null;
    }
    return new Error(getErrorMessage(errorInfoSlug, message));
  }

  function getErrorMessage(errorInfoSlug, message) {
    let url = '';
    if (errorInfoSlug !== null) {
      url = `${formlyErrorAndWarningsUrlPrefix}${errorInfoSlug}`;
    }
    return `Formly Error: ${message}. ${url}`;
  }

  function checkWrapper(wrapper) {
    formlyApiCheck.throw(formlyApiCheck.formlyWrapperType, wrapper, {
      prefix: 'formlyConfig.setWrapper',
      urlSuffix: 'setwrapper-validation-failed'
    });
  }

  function checkWrapperTemplate(template, additionalInfo) {
    const formlyTransclude = '<formly-transclude></formly-transclude>';
    if (template.indexOf(formlyTransclude) === -1) {
      throw getFormlyError(
        `Template wrapper templates must use "${formlyTransclude}" somewhere in them. ` +
        `This one does not have "<formly-transclude></formly-transclude>" in it: ${template}` + '\n' +
        `Additional information: ${JSON.stringify(additionalInfo)}`
      );
    }
  }
}
