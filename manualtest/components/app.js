(function() {
  'use strict';
  window.ngFormly.formlyUtils.setTemplates([

  ]);

  var app = angular.module('app', ['formly']);

  app.controller('MainCtrl', function MainCtrl() {
    var vm = this;

    vm.fields = [
      {
        type: 'whatever',
        key: 'mine'
      }
    ];
  });

})();
