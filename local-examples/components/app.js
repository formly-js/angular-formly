(function() {
  'use strict';

  //var app = angular.module('app', ['formly', 'formlyVanilla'], function(formlyConfig) {
  var app = angular.module('app', ['formly', 'formlyBootstrap']).run(function(formlyConfig, formlyVersion) {
    //apiCheck.disable();
    formlyConfig.extras.ngModelAttrsManipulatorPreferBound = true;
    var myCheck = window.apiCheck({
      output: {prefix: 'my check'}
    });


    var label = formlyConfig.getWrapper('bootstrapLabel');
    label.validateOptions = function(options) {
      console.log(arguments);
    };

    formlyConfig.setType({
      name: 'nullWrappers',
      wrapper: null
    });

    formlyConfig.setType({
      name: 'custom',
      template: formlyConfig.getType('input').template,
      defaultOptions: {
        ngModelAttrs: {
          '/^hello$/': {
            value: 'ng-pattern'
          }
        }
      },
      apiCheck: {
        templateOptions: myCheck.shape({
          description: myCheck.string
        })
      },
      apiCheckInstance: myCheck,
      apiCheckFunction: 'throw',
      controller: function($scope) {
        console.log($scope);
      },
      link: function(scope, el) {
        setTimeout(function() {
          var desc = angular.element(el[0].querySelector('.help-block'));
          var input = el.find('input');
          desc.addClass('ng-hide');
          input.on('focus', function() {
            desc.removeClass('ng-hide');
          });
          input.on('blur', function() {
            desc.addClass('ng-hide');
          });
        });
      }
    });

    formlyConfig.setType({
      name: 'customExtended',
      extends: 'custom',
      controller: function($scope) {
        console.log('extended', $scope);
      },
      link: function(scope, el) {
        console.log('This is an extended link', scope, el);
      },
      defaultOptions: {
        validators: {
          //custom: {
          //  expression: '$viewValue === "custom"',
          //  message: '$viewValue + " is not \"custom\""'
          //}
        }
      }
    });
  });

  app.run(function(formlyConfig, $http, $templateCache) {
    formlyConfig.templateManipulators.postWrapper.push(function(template) {
      return $http.get('components/wrapper.html', {
        cache: $templateCache
      }).then(function(response) {
        return response.data.replace('<my-own-transclude></my-own-transclude>', template);
      });
    });
  });

  app.controller('MainCtrl', function MainCtrl($timeout, $q) {
    var vm = this;

    vm.formData = {
          "name": "John",
          "address": {
              "streetnum": "145 Elm St.",
              "city": "Atlanta"
          }
    };

    vm.formFields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'Name'
        }
      },
      {
        model: 'model.address',
        fieldGroup: [
          {
            key: 'streetnum',
            type: 'input',
            templateOptions: {
              label: 'Street Num'
            }
          },
          {
            key: 'city',
            type: 'input',
            templateOptions: {
              label: 'City'
            }
          }
        ]
      }
    ];
  });

})();
