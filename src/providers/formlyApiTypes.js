module.exports = ngModule => {

  const _ = require('lodash');
  let apiCheck = require('api-check');
  apiCheck.config.output = {
    prefix: 'angular-formly:',
    docsBaseUrl: `https://github.com/formly-js/angular-formly/blob/${VERSION}/other/ERRORS_AND_WARNINGS.md#`
  };

  ngModule.constant('apiCheck', apiCheck);
  if (ON_TEST) {
    require('./formlyApiTypes.test')(ngModule);
  }

  let formlyExpressionType = apiCheck.oneOfType([apiCheck.string, apiCheck.func]);


  let fieldOptionsApiShape = {
    type: apiCheck.shape.ifNot(['template', 'templateUrl'], apiCheck.string).optional,
    template: apiCheck.shape.ifNot(['type', 'templateUrl'], apiCheck.string).optional,
    templateUrl: apiCheck.shape.ifNot(['type', 'template'], apiCheck.string).optional,
    key: apiCheck.oneOfType([apiCheck.string, apiCheck.number]),
    model: apiCheck.object.optional,
    expressionProperties: apiCheck.objectOf(apiCheck.oneOfType([
      formlyExpressionType,
      apiCheck.shape({
        expression: formlyExpressionType,
        message: formlyExpressionType.optional
      }).strict
    ])).optional,
    data: apiCheck.object.optional,
    templateOptions: apiCheck.object.optional,
    wrapper: apiCheck.oneOfType([
      apiCheck.oneOf([null]), apiCheck.typeOrArrayOf(apiCheck.string)
    ]).optional,
    modelOptions: apiCheck.shape({
      updateOn: apiCheck.string.optional,
      debounce: apiCheck.oneOfType([
        apiCheck.object, apiCheck.string
      ]).optional,
      allowInvalid: apiCheck.bool.optional,
      getterSetter: apiCheck.bool.optional,
      timezone: apiCheck.string.optional
    }).optional,
    watcher: apiCheck.typeOrArrayOf(
      apiCheck.shape({
        expression: formlyExpressionType.optional,
        listener: formlyExpressionType
      })
    ).optional,
    validators: apiCheck.objectOf(apiCheck.oneOfType([
      apiCheck.func, apiCheck.shape({
        expression: formlyExpressionType,
        message: formlyExpressionType.optional
      }).strict
    ])).optional,
    noFormControl: apiCheck.bool.optional,
    hide: apiCheck.bool.optional,
    ngModelAttrs: apiCheck.objectOf(apiCheck.shape({
      expression: apiCheck.shape.ifNot(['value', 'attribute', 'bound'], apiCheck.any).optional,
      value: apiCheck.shape.ifNot('expression', apiCheck.any).optional,
      attribute: apiCheck.shape.ifNot('expression', apiCheck.any).optional,
      bound: apiCheck.shape.ifNot('expression', apiCheck.any).optional
    }).strict).optional,
    optionsTypes: apiCheck.typeOrArrayOf(apiCheck.string).optional,
    link: apiCheck.func.optional,
    controller: apiCheck.oneOfType([
      apiCheck.string, apiCheck.func, apiCheck.array
    ]).optional,
    validation: apiCheck.shape({
      show: apiCheck.oneOfType([
        apiCheck.bool, apiCheck.oneOf([null])
      ]).optional,
      messages: apiCheck.objectOf(apiCheck.func).optional,
      errorExistsAndShouldBeVisible: apiCheck.bool.optional
    }).optional,
    formControl: apiCheck.object.optional,
    value: apiCheck.func.optional,
    runExpressions: apiCheck.func.optional
  };

  let fieldOptionsApi = apiCheck.shape(fieldOptionsApiShape).strict;

  let typeOptionsDefaultOptions = _.clone(fieldOptionsApiShape);
  typeOptionsDefaultOptions.key = apiCheck.string.optional;

  let typeOptionsApi = apiCheck.shape({
    name: apiCheck.string,
    template: apiCheck.shape.ifNot('templateUrl', apiCheck.string).optional,
    templateUrl: apiCheck.shape.ifNot('template', apiCheck.string).optional,
    controller: apiCheck.oneOfType([
      apiCheck.func, apiCheck.string, apiCheck.array
    ]).optional,
    link: apiCheck.func.optional,
    defaultOptions: apiCheck.oneOfType([
      apiCheck.func, apiCheck.shape(typeOptionsDefaultOptions)
    ]).optional,
    extends: apiCheck.string.optional,
    wrapper: apiCheck.oneOfType([
      apiCheck.arrayOf(apiCheck.string), apiCheck.string
    ]).optional,
    data: apiCheck.object.optional,
    validateOptions: apiCheck.func.optional,
    overwriteOk: apiCheck.bool.optional
  }).strict;

  ngModule.constant('formlyApiTypes', {
    typeOptionsApi, fieldOptionsApi
  });
};
