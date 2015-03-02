(function() {
  'use strict';

  //var app = angular.module('app', ['formly', 'formlyVanilla'], function(formlyConfig) {
  var app = angular.module('app', ['formly', 'formlyBootstrap']).run(function(formlyConfig, formlyVersion) {
    //apiCheck.disable();
    formlyConfig.extras.ngModelAttrsManipulatorPreferBound = true;


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

    vm.user = {};

    vm.realFields = [
      {
        type: 'customExtended',
        key: 'myCustomThing',
        label: 'Custom stuff',
        templateOptions: {
          description: 'This has a link and controller!',
          maxlength: 4
        },
        expressionProperties: {
          'templateOptions.maxlength': function() {
            return Math.floor(Math.random() * 10) + 3;
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
        key: 'maxLength',
        templateOptions: {
          type: 'number',
          label: 'Max Length',
          onChange: function(value, options, scope) {
            scope.formState.maxLength = value;
          }
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
          focus: true,
          addonRight: {
            class: 'glyphicon glyphicon-ok'
          }
        },
        expressionProperties: {
          'templateOptions.label': '$viewValue',
          'templateOptions.maxlength': 'formState.maxLength',
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
            {display: 'item 1', id: 'coolio'},
            {display: 'item 2', id: 'coolio2'},
            {display: 'item 3', id: 'coolio3'}
          ],
          valueProp: 'id',
          labelProp: 'display'
        }
      },
      {
        type: 'multiCheckbox',
        key: 'multipleOptions',
        templateOptions: {
          label: 'Multiple Options',
          options: [
            {label: 'Cool cat', value: {a: 'b'}},
            {label: 'Cool Dog', value: {c: 'd'}},
            {label: 'Cool Frog', value: true},
            {label: 'Cool Log', value: 34}
          ],
          labelProp: 'label'
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
