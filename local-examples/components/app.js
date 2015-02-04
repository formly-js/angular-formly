(function() {
  'use strict';

  var app = angular.module('app', ['formly', 'formlyBootstrap'], function(formlyConfigProvider) {
  //var app = angular.module('app', ['formly', 'formlyVanilla'], function(formlyConfigProvider) {
  });

  app.controller('MainCtrl', function MainCtrl() {
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
        templateOptions: {
          label: 'My Input',
          description: 'This is an awesome description',
          required: true
        },
        validators: {
          maxlength: '$viewValue.length > 4'
        },
        expressionProperties: {
          'templateOptions.disabled': 'model.mine',
          'templateOptions.required': 'model.mySelect === "coolio2"'
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
      }
    ];
  });

})();
