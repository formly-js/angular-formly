var angular = require('angular-fix');

module.exports = ngModule => {
  ngModule.provider('formlyUsability', function () {
    var errorsAndWarningsUrlPrefix = 'https://github.com/formly-js/angular-formly/wiki/Errors-and-Warnings#';
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
      if (wrapper.template && wrapper.url) {
        throw getFormlyError(
          'Template wrappers can only have a url or a template. ' +
          `This one provided both: ${JSON.stringify(wrapper)}`
        );
      }
      if (!wrapper.template && !wrapper.url) {
        throw getFormlyError(
          'Template wrappers must have one of a url or a template. ' +
          `This one provided neither: ${JSON.stringify(wrapper)}`
        );
      }
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

  });
};
