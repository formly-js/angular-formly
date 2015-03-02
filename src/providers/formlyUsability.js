var angular = require('angular-fix');

module.exports = ngModule => {
  ngModule.provider('formlyUsability', function(formlyVersion) {
    var errorsAndWarningsUrlPrefix =
      `https://github.com/formly-js/angular-formly/blob/${formlyVersion}/other/ERRORS_AND_WARNINGS.md#`;
    angular.extend(this, {
      getFormlyError: getFormlyError,
      getFieldError: getFieldError,
      checkWrapper: checkWrapper,
      checkWrapperTemplate: checkWrapperTemplate,
      checkAllowedProperties,
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

    function checkWrapper(wrapper, options) {
      if (wrapper.template && wrapper.templateUrl) {
        throw getFormlyError(
          'Template wrappers can only have a templateUrl or a template. ' +
          `This one provided both: ${JSON.stringify(wrapper)}`
        );
      }
      if (!wrapper.template && !wrapper.templateUrl) {
        throw getFormlyError(
          'Template wrappers must have one of a templateUrl or a template. ' +
          `This one provided neither: ${JSON.stringify(wrapper)}`
        );
      }
      wrapper.validateOptions && wrapper.validateOptions(options);
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

    function checkAllowedProperties(allowedProperties, obj, context) {
      var extraProps = Object.keys(obj).filter(prop => allowedProperties.indexOf(prop) === -1);
      if (extraProps.length) {
        let extraPropsJSON = JSON.stringify(extraProps.join(', '));
        let allowedPropsJSON = JSON.stringify(allowedProperties.join(', '));
        throw getFieldError(
          'you-have-specified-properties-for-context-that-are-not-allowed',
          [
            `You have specified properties for ${context} that are not allowed: ${extraPropsJSON}`,
            `Allowed properties are: ${allowedPropsJSON}`
          ].join('\n'),
          obj
        );
      }
    }


  });
};
