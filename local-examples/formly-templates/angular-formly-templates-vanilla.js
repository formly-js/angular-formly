// "formlyVanilla" version 3.0.0 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)
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

angular.module('formlyVanilla', ['formly'], ["formlyConfigProvider", function configFormlyVanilla(formlyConfigProvider) {
  'use strict';

  formlyConfigProvider.setWrapper([
    {
      name: 'vanillaLabel',
      templateUrl: 'wrappers/formly-wrappers-vanilla-label.html'
    }
  ]);

  var commonWrappers = ['vanillaLabel'];

  angular.forEach(['radio', 'select'], function(fieldName) {
    formlyConfigProvider.setType({
      name: fieldName,
      templateUrl: getFieldTemplateUrl(fieldName),
      wrapper: commonWrappers
    });
  });
  formlyConfigProvider.setType({
    name: 'input',
    template: '<input class="formly-field-input" ng-model="model[options.key]">',
    wrapper: commonWrappers
  });

  // textarea has custom defaultOptions
  formlyConfigProvider.setType({
    name: 'textarea',
    template: '<textarea class="formly-field-textarea" ng-model="model[options.key]"></textarea>',
    wrapper: commonWrappers,
    defaultOptions: {
      data: {
        ngModelAttributes: {rows: 'rows', cols: 'cols'}
      }
    }
  });

  // checkbox doesn't have a vanillaLabel wrapper
  formlyConfigProvider.setType({
    name: 'checkbox',
    templateUrl: getFieldTemplateUrl('checkbox')
  });

  formlyConfigProvider.templateManipulators.preWrapper.push(function ariaDescribedBy(template, options, scope) {
    if (options.templateOptions && angular.isDefined(options.templateOptions.description) &&
      options.type !== 'radio' && options.type !== 'checkbox') {
      var el = angular.element('<a></a>');
      el.append(template);
      var modelEls = angular.element(el[0].querySelectorAll('[ng-model]'));
      if (modelEls) {
        el.append(
          '<p id="' + scope.id + '_description"' +
              'class="help-block"' +
              'ng-if="options.templateOptions.description">' +
            '{{options.templateOptions.description}}' +
          '</p>'
        );
        modelEls.attr('aria-describedby', scope.id + '_description');
        return el.html();
      } else {
        return template;
      }
    } else {
      return template;
    }
  });

  function getFieldTemplateUrl(name) {
    return 'fields/formly-field-' + name + '.html';
  }

}]);

angular.module('formlyVanilla').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('fields/formly-field-checkbox.html',
    "<label><input type=checkbox class=formly-field-checkbox ng-model=model[options.key]> {{options.templateOptions.label}} {{options.templateOptions.required ? '*' : ''}}</label>"
  );


  $templateCache.put('fields/formly-field-radio.html',
    "<div ng-repeat=\"(key, option) in options.templateOptions.options\" class=radio><label><input type=radio id=\"{{id + '_'+ $index}}\" ng-value=option.value ng-model=model[options.key]> {{option.name}}</label></div>"
  );


  $templateCache.put('fields/formly-field-select.html',
    "<select ng-model=model[options.key] ng-options=\"option.value as option.name group by option.group for option in options.templateOptions.options\"></select>"
  );


  $templateCache.put('wrappers/formly-wrappers-vanilla-label.html',
    "<div><label for={{id}} class=formly-field-label>{{options.templateOptions.label}} {{options.templateOptions.required ? '*' : ''}}</label><formly-transclude></formly-transclude></div>"
  );

}]);

return "formlyVanilla";

}));
