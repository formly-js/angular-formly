// "formlyBootstrap" version 2.0.0 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular'], function (angular) {
      return (root.returnExportsGlobal = factory(angular));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require('angular'));
  } else {
    factory(root.angular);
  }
}(this, function (angular) {

angular.module('formlyBootstrap', ['formly'], ["formlyConfigProvider", function configFormlyVanilla(formlyConfigProvider) {
  'use strict';
  var fields = [
    'input', 'radio', 'select', 'textarea', 'number'
  ];

  formlyConfigProvider.setWrapper([
    {
      name: 'bootstrapDescription',
      templateUrl: 'wrappers/formly-wrappers-bootstrap-description.html'
    },
    {
      name: 'bootstrapLabel',
      templateUrl: 'wrappers/formly-wrappers-bootstrap-label.html'
    },
    {
      name: 'bootstrapHasError',
      templateUrl: 'wrappers/formly-wrappers-bootstrap-has-error.html'
    }
  ]);

  angular.forEach(fields, function(fieldName) {
    formlyConfigProvider.setType({
      name: fieldName,
      templateUrl: 'fields/formly-field-' + fieldName + '.html',
      wrapper: ['bootstrapDescription', 'bootstrapLabel', 'bootstrapHasError']
    });
  });

  // checkbox doesn't have a bootstrapLabel wrapper
  formlyConfigProvider.setType({
    name: 'checkbox',
    templateUrl: 'fields/formly-field-checkbox.html',
    wrapper: ['bootstrapDescription', 'bootstrapHasError']
  });

}]);

angular.module('formlyBootstrap').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('fields/formly-field-checkbox.html',
    "<div class=checkbox><label><input type=checkbox class=formly-field-checkbox id={{id}} formly-dynamic-name=id formly-custom-validation=options.validators aria-describedby={{id}}_description ng-required=options.templateOptions.required ng-disabled=options.templateOptions.disabled ng-model=model[options.key]> {{options.templateOptions.label}} {{options.templateOptions.required ? '*' : ''}}</label></div>"
  );


  $templateCache.put('fields/formly-field-input.html',
    "<input type={{options.templateOptions.type}} class=form-control id={{id}} formly-dynamic-name=id formly-custom-validation=options.validators placeholder={{options.templateOptions.placeholder}} aria-describedby={{id}}_description ng-required=options.templateOptions.required ng-disabled=options.templateOptions.disabled ng-model=model[options.key]>"
  );


  $templateCache.put('fields/formly-field-number.html',
    "<input type=number class=form-control id={{id}} formly-dynamic-name=id formly-custom-validation=options.validators placeholder={{options.templateOptions.placeholder}} aria-describedby={{id}}_description ng-required=options.templateOptions.required ng-disabled=options.templateOptions.disabled min={{options.templateOptions.min}} max={{options.templateOptions.max}} ng-model=model[options.key]>"
  );


  $templateCache.put('fields/formly-field-radio.html',
    "<div class=radio-group><div ng-repeat=\"(key, option) in options.templateOptions.options\" class=radio><label><input type=radio formly-dynamic-name=id formly-custom-validation=options.validators id=\"{{id + '_'+ $index}}\" aria-describedby={{id}}_description ng-value=option.value ng-required=options.templateOptions.required ng-model=$parent.model[$parent.options.key]> {{option.name}}</label></div></div>"
  );


  $templateCache.put('fields/formly-field-select.html',
    "<select id={{id}} class=form-control formly-dynamic-name=id formly-custom-validation=options.validators aria-describedby={{id}}_description ng-model=model[options.key] ng-required=options.templateOptions.required ng-disabled=options.templateOptions.disabled ng-options=\"option.value as option.name group by option.group for option in options.templateOptions.options\"></select>"
  );


  $templateCache.put('fields/formly-field-textarea.html',
    "<textarea id={{id}} class=form-control formly-dynamic-name=id formly-custom-validation=options.validators rows={{options.templateOptions.rows}} cols={{options.templateOptions.cols}} placeholder={{options.templateOptions.placeholder}} aria-describedby={{id}}_description ng-required=options.templateOptions.required ng-disabled=options.templateOptions.disabled ng-model=model[options.key]>\n" +
    "</textarea>"
  );


  $templateCache.put('wrappers/formly-wrappers-bootstrap-description.html',
    "<div><formly-transclude></formly-transclude><p id={{id}}_description class=help-block ng-if=options.templateOptions.description>{{options.templateOptions.description}}</p></div>"
  );


  $templateCache.put('wrappers/formly-wrappers-bootstrap-has-error.html',
    "<div class=form-group ng-class=\"{'has-error': options.formControl.$invalid && options.formControl.$touched}\"><formly-transclude></formly-transclude></div>"
  );


  $templateCache.put('wrappers/formly-wrappers-bootstrap-label.html',
    "<div><label for={{id}} class=control-label>{{options.templateOptions.label}} {{options.templateOptions.required ? '*' : ''}}</label><formly-transclude></formly-transclude></div>"
  );

}]);

return "formlyBootstrap";

}));
