module.exports = ngModule => {

  let apiCheck = require('api-check')({
    output: {
      prefix: 'angular-formly:',
      docsBaseUrl: require('../other/docsBaseUrl')
    }
  });

  function shapeRequiredIfNot(otherProps, propChecker) {
    if (!angular.isArray(otherProps)) {
      otherProps = [otherProps];
    }
    const type = `specified if these are not specified: \`${otherProps.join(', ')}\` (otherwise it's optional)`;
    function shapeRequiredIfNotDefinition(prop, propName, location, obj) {
      var propExists = obj && obj.hasOwnProperty(propName);
      var otherPropsExist = otherProps.some(function (otherProp) {
        return obj && obj.hasOwnProperty(otherProp);
      });
      //console.log(propName, propExists, prop, otherPropsExist, otherProps.join(', '));
      if (!otherPropsExist && !propExists) {
        return apiCheck.utils.getError(propName, location, type);
      } else if (propExists) {
        return propChecker(prop, propName, location, obj);
      }
    }
    shapeRequiredIfNotDefinition.type = type;
    apiCheck.utils.checkerHelpers.setupChecker(shapeRequiredIfNotDefinition);
    return shapeRequiredIfNotDefinition;
  }

  ngModule.constant('formlyApiCheck', apiCheck);
  if (ON_TEST) {
    require('./formlyApiCheck.test')(ngModule);
  }

  let formlyExpression = apiCheck.oneOfType([apiCheck.string, apiCheck.func]);
  let specifyWrapperType = apiCheck.oneOfType([
    apiCheck.oneOf([null]), apiCheck.typeOrArrayOf(apiCheck.string)
  ]);

  const apiCheckProperty = apiCheck.objectOf(apiCheck.func);

  const apiCheckInstanceProperty = apiCheck.shape.onlyIf('apiCheck', apiCheck.func.withProperties({
    warn: apiCheck.func,
    throw: apiCheck.func,
    shape: apiCheck.func
  }));

  const apiCheckFunctionProperty = apiCheck.shape.onlyIf('apiCheck', apiCheck.oneOf(['throw', 'warn']));

  const formlyWrapperType = apiCheck.shape({
    name: shapeRequiredIfNot('types', apiCheck.string).optional,
    template: apiCheck.shape.ifNot('templateUrl', apiCheck.string).optional,
    templateUrl: apiCheck.shape.ifNot('template', apiCheck.string).optional,
    types: apiCheck.typeOrArrayOf(apiCheck.string).optional,
    overwriteOk: apiCheck.bool.optional,
    validateOptions: apiCheck.func.optional,
    apiCheck: apiCheckProperty.optional,
    apiCheckInstance: apiCheckInstanceProperty.optional,
    apiCheckFunction: apiCheckFunctionProperty.optional,
    apiCheckOptions: apiCheck.object.optional
  }).strict;

  let fieldOptionsApiShape = {
    type: apiCheck.shape.ifNot(['template', 'templateUrl'], apiCheck.string).optional,
    template: apiCheck.shape.ifNot(['type', 'templateUrl'], apiCheck.string).optional,
    templateUrl: apiCheck.shape.ifNot(['type', 'template'], apiCheck.string).optional,
    key: apiCheck.oneOfType([apiCheck.string, apiCheck.number]),
    model: apiCheck.object.optional,
    expressionProperties: apiCheck.objectOf(apiCheck.oneOfType([
      formlyExpression,
      apiCheck.shape({
        expression: formlyExpression,
        message: formlyExpression.optional
      }).strict
    ])).optional,
    data: apiCheck.object.optional,
    templateOptions: apiCheck.object.optional,
    wrapper: specifyWrapperType.optional,
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
        expression: formlyExpression.optional,
        listener: formlyExpression
      })
    ).optional,
    validators: apiCheck.objectOf(apiCheck.oneOfType([
      formlyExpression, apiCheck.shape({
        expression: formlyExpression,
        message: formlyExpression.optional
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
      messages: apiCheck.objectOf(formlyExpression).optional,
      errorExistsAndShouldBeVisible: apiCheck.bool.optional
    }).optional,
    formControl: apiCheck.object.optional,
    value: apiCheck.func.optional,
    runExpressions: apiCheck.func.optional
  };

  let formlyFieldOptions = apiCheck.shape(fieldOptionsApiShape).strict;

  let typeOptionsDefaultOptions = angular.copy(fieldOptionsApiShape);
  typeOptionsDefaultOptions.key = apiCheck.string.optional;

  let formlyTypeOptions = apiCheck.shape({
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
    wrapper: specifyWrapperType.optional,
    data: apiCheck.object.optional,
    validateOptions: apiCheck.func.optional,
    apiCheck: apiCheckProperty.optional,
    apiCheckInstance: apiCheckInstanceProperty.optional,
    apiCheckFunction: apiCheckFunctionProperty.optional,
    apiCheckOptions: apiCheck.object.optional,
    overwriteOk: apiCheck.bool.optional
  }).strict;

  angular.extend(apiCheck, {
    formlyTypeOptions, formlyFieldOptions, formlyExpression, formlyWrapperType
  });
};
