(function() {
  'use strict';
  var app = angular.module('app', ['formly']);

  app.run(addCustomTypes);
  app.controller('MainCtrl', MainCtrl);

  function addCustomTypes(formlyConfig) {
    formlyConfig.setWrapper({
      name: 'label',
      template: '<label for="{{::id}}">{{to.label}}</label><formly-transclude></formly-transclude>'
    });

    formlyConfig.setType({
      name: 'input',
      template: '<input ng-model="model[options.key]" />',
      wrapper: ['label']
    });
  }

  function MainCtrl($log) {
    var vm = this;

    vm.onSubmit = onSubmit;

    vm.model = {name: {}};

    vm.fields = [
      {
        model: 'model.name',
        key: 'first',
        type: 'input',
        templateOptions: {
          label: 'First Name'
        }
      },
      {
        model: 'model.name',
        key: 'last',
        type: 'input',
        templateOptions: {
          label: 'Last Name'
        }
      },
      {
        key: 'age',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Age'
        }
      }
    ];

    function onSubmit() {
      $log.info('submitted!', vm.model);
    }
  }
})();
