import angular from 'angular-fix';

function formlyUsability (formlyVersion, formlyApiCheck) {
  var errorsAndWarningsUrlPrefix =
    `https://github.com/formly-js/angular-formly/blob/${formlyVersion}/other/ERRORS_AND_WARNINGS.md#`;
  angular.extend(this, {
    getFormlyError: getFormlyError,
    getFieldError: getFieldError,
    checkWrapper: checkWrapper,
    checkWrapperTemplate: checkWrapperTemplate,
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
      url = `${errorsAndWarningsUrlPrefix}${errorInfoSlug}`;
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
    var formlyTransclude = '<formly-transclude></formly-transclude>';
    if (template.indexOf(formlyTransclude) === -1) {
      throw getFormlyError(
        `Template wrapper templates must use "${formlyTransclude}" somewhere in them. ` +
        `This one does not have "<formly-transclude></formly-transclude>" in it: ${template}` + '\n' +
        `Additional information: ${JSON.stringify(additionalInfo)}`
      );
    }
  }
}
export default formlyUsability;
