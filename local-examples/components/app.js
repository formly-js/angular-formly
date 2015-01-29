(function() {
  'use strict';

  //window.ngFormly.formlyUtils.createDirectives([
  //  {
  //
  //  }
  //]);

  var app = angular.module('app', ['formly'], function(formlyConfigProvider) {
    formlyConfigProvider.setTemplate({
      whatever: '<pre>{{options | json}}</pre>',
      myType: '<input name="{{::id}}" ng-model="model[options.key]">'
    });
    formlyConfigProvider.setTemplateWrapper([
      '<div>',
        '<label for="{{::id}}">{{options.label}}</label>',
        '<formly-transclude></formly-transclude>',
        'This is after! Good for ng-messages!',
      '</div>'
    ].join(' '));
    formlyConfigProvider.setTemplateWrapper({
      types: 'myType',
      template: [
        '<div class="my-type">',
          '<div>This is my own type wrapper!</div>',
          '<formly-transclude></formly-transclude>',
          '<div>this is after on my own type: {{model[options.key]}}</div>',
        '</div>'
      ].join(' ')
    });
  });

  app.controller('MainCtrl', function MainCtrl() {
    var vm = this;

    vm.user = {};

    vm.fields = [
      {
        label: 'My Label',
        type: 'whatever',
        key: 'mine',
        noFormControl: true
      },
      {
        label: 'My Type',
        type: 'myType',
        key: 'myKey'
      }
    ];
  });
  /*

  function getDirectiveWrapper(innerTemplate) {
    var formControl = 'options.formControl';
    var invalid = formControl + '.$invalid';
    var touched = formControl + '.$touched';
    var ors = [
      touched,
      'options.showError',
      '$eval(options.data.showErrorExpression)'
    ].join(' || ');
    var errorExistsAndShouldBeVisible = [
      invalid,
      '(' + ors + ')',
      '!options.data.hideError',
      '!$eval(options.data.hideErrorExpression)'
    ].join(' && ');
    var ngClass = '{\'has-error\':' + errorExistsAndShouldBeVisible + '}';
    return [
      '<div ng-init="options.data.ngInit(options, model, index, form)" ng-class="' + ngClass + '">',
      '<div>',
      '<div ng-if="options.data.loading.$$state.status === 0">Loading...</div>',
      '<div ng-if="options.data.loading.$$state.status !== 0">' + innerTemplate + '</div>',
      '</div>',
      '<div az-form-messages="options.formControl"',
      'options="options"',
      'show-messages="' + errorExistsAndShouldBeVisible + '"></div>',
      '<div ng-if="::options.description" class="text-muted" style="margin-top:16px;">',
      '{{::options.description}}',
      '</div>',
      '</div>'
    ].join(' ');
  }
  */

})();
