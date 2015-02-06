(function() {
  'use strict';

  var app = angular.module('app', ['formly', 'formlyBootstrap'], function(formlyConfigProvider) {
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
        ngModelAttrs: {
          bound: {
            'ng-maxlength': 6,
            'ng-disabled': false
          },
          unbound: {
            pattern: '"^abcd|^qrst"'
          }
        },
        templateOptions: {
          label: 'My Input',
          required: true,
          description: 'This is an awesome description'
        },
        expressionProperties: {
          'ngModelAttrs.bound["ng-disabled"]': 'model.mine'
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
        type: 'radio',
        key: 'myRadios',
        templateOptions: {
          label: 'Cool Radios',
          options: [
            {name: 'item 1', value: 'coolio'},
            {name: 'item 2', value: 'coolio2'},
            {name: 'item 3', value: 'coolio3'}
          ],
          description: 'Click one!'
        }
      },
      {
        type: 'number',
        key: 'aNumber',
        templateOptions: {
          label: 'Number stuff',
          max: 10,
          min: -10,
          placeholder: '10 is the max, -10 is the min...'
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
