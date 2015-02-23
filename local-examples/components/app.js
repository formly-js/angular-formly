(function() {
  'use strict';

  //var app = angular.module('app', ['formly', 'formlyVanilla'], function(formlyConfigProvider) {
  var app = angular.module('app', ['formly', 'formlyBootstrap'], function(formlyConfigProvider) {
    formlyConfigProvider.extras.ngModelAttrsManipulatorPreferBound = true;

    formlyConfigProvider.setType({
      name: 'custom',
      template: formlyConfigProvider.getType('input').template,
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

    formlyConfigProvider.setType({
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

    vm.user = {};

    vm.realFields = [
      {
        type: 'customExtended',
        key: 'myCustomThing',
        templateOptions: {
          label: 'Custom stuff',
          description: 'This has a link and controller!',
          maxlength: 4
        },
        expressionProperties: {
          'templateOptions.maxlength': function() {
            var val = Math.floor(Math.random() * 10) + 3;
            console.log(val);
            return val;
          }
        },
        link: function(scope, el) {
          console.log(scope, el);
        },
        controller: function($scope, $log) {
          $log.info($scope);
        }
      }
    ];

    vm.fields = [
      {
        type: 'checkbox',
        key: 'mine',
        templateOptions: {
          label: 'My Label',
          description: 'This is an awesome description for a checkbox!',
          required: true
        }
      },
      {
        type: 'input',
        key: 'myKey',
        templateOptions: {
          placeholder: 'This rocks',
          label: 'My Input',
          required: true,
          description: 'This is an awesome description',
          focus: true
        },
        expressionProperties: {
          'templateOptions.label': '$viewValue',
          'templateOptions.customMaxlength': 'model.mine ? 5 : 8',
          'templateOptions.tabindex': 'model.mine ? 0 : -1'
        }
      },
      {
        type: 'select',
        key: 'mySelect',
        templateOptions: {
          label: 'Choose something!',
          options: [
            {},
            {name: 'item 1', value: 'coolio'},
            {name: 'item 2', value: 'coolio2'},
            {name: 'item 3', value: 'coolio3'}
          ]
        }
      },
      {
        type: 'customExtended',
        key: 'myCustomThing',
        templateOptions: {
          label: 'Custom stuff',
          description: 'This has a link and controller!'
        },
        link: function(scope, el) {
          console.log(scope, el);
        },
        controller: function($scope, $log) {
          $log.info($scope);
        }
      },
      {
        type: 'textarea',
        key: 'coolTextarea',
        templateOptions: {
          label: 'Type stuff',
          placeholder: 'Way fun',
          cols: 15,
          rows: 12
        }
      },
      {
        type: 'textarea',
        key: 'coolTextarea',
        templateOptions: {
          label: 'Type stuff',
          placeholder: 'Way fun'
        }
      },
      {
        type: 'radio',
        key: 'myRadios',
        templateOptions: {
          label: 'Cool Radios',
          disabled: true,
          options: [
            {name: 'item 1', value: 'coolio'},
            {name: 'item 2', value: 'coolio2'},
            {name: 'item 3', value: 'coolio3'}
          ],
          description: 'Click one!'
        }
      },
      {
        type: 'input',
        key: 'aNumber',
        templateOptions: {
          type: 'number',
          label: 'Number stuff',
          placeholder: '10 is the max, -10 is the min...',
          description: null,
          max: 10,
          min: -10
        }
      },
      {
        type: 'input',
        key: 'email',
        validators: {
          specialEmail: function(modelValue, viewValue) {
            return $timeout(function() {
              var fn = (modelValue || viewValue) === 'a@b.c' ? $q.when : $q.reject;
              return fn();
            }, 2000);
          }
        },
        templateOptions: {
          type: 'email',
          placeholder: 'Type a@b.c if you want to be valid',
          label: 'Special Email address'
        }
      }
    ];
  });

})();
