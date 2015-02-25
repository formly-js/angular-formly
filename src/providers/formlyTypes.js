module.exports = ngModule => {

  let apiCheck = require('api-check');
  apiCheck.config.output = {
    prefix: 'angular-formly:',
    docsBaseUrl: `https://github.com/formly-js/angular-formly/blob/${VERSION}/other/ERRORS_AND_WARNINGS.md#`
  };

  ngModule.constant('apiCheck', apiCheck);

  let fieldOptionsApi = apiCheck.shape({
    type: apiCheck.any.optional,
    template: apiCheck.any.optional,
    templateUrl: apiCheck.any.optional,
    key: apiCheck.any.optional,
    model: apiCheck.any.optional,
    expressionProperties: apiCheck.any.optional,
    data: apiCheck.any.optional,
    templateOptions: apiCheck.any.optional,
    wrapper: apiCheck.any.optional,
    modelOptions: apiCheck.any.optional,
    watcher: apiCheck.any.optional,
    validators: apiCheck.any.optional,
    noFormControl: apiCheck.bool.optional,
    hide: apiCheck.bool.optional,
    ngModelAttrs: apiCheck.any.optional,
    optionsTypes: apiCheck.any.optional,
    link: apiCheck.any.optional,
    controller: apiCheck.any.optional,
    validation: apiCheck.any.optional,
    formControl: apiCheck.any.optional,
    value: apiCheck.any.optional,
    runExpressions: apiCheck.any.optional
  });

  let typeOptionsApi = apiCheck.shape({
    name: apiCheck.string,
    template: apiCheck.shape.ifNot('templateUrl', apiCheck.string).optional,
    templateUrl: apiCheck.shape.ifNot('template', apiCheck.string).optional,
    controller: apiCheck.oneOfType([
      apiCheck.func, apiCheck.string, apiCheck.array
    ]).optional,
    link: apiCheck.func.optional,
    defaultOptions: apiCheck.oneOfType([
      apiCheck.func, fieldOptionsApi
    ]).optional,
    extends: apiCheck.string.optional,
    wrapper: apiCheck.oneOfType([
      apiCheck.arrayOf(apiCheck.string), apiCheck.string
    ]).optional,
    data: apiCheck.object.optional,
    validateOptions: apiCheck.func.optional,
    overwriteOk: apiCheck.bool.optional
  });

  typeOptionsApi.strict = true;

  ngModule.constant('formlyApiTypes', {
    typeOptionsApi, fieldOptionsApi
  });
};
