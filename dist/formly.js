// Render module for formly to display forms
angular.module('formly.render', []);
// Main Formly Module
angular.module('formly', ['formly.render']);
'use strict';
angular.module('formly.render').directive('formlyField', [
  '$http',
  '$compile',
  '$templateCache',
  function formlyField($http, $compile, $templateCache) {
    var getTemplateUrl = function (type) {
      var templateUrl = '';
      switch (type) {
      case 'textarea':
        templateUrl = 'directives/formly-field-textarea.html';
        break;
      case 'radio':
        templateUrl = 'directives/formly-field-radio.html';
        break;
      case 'select':
        templateUrl = 'directives/formly-field-select.html';
        break;
      case 'number':
        templateUrl = 'directives/formly-field-number.html';
        break;
      case 'checkbox':
        templateUrl = 'directives/formly-field-checkbox.html';
        break;
      case 'password':
        templateUrl = 'directives/formly-field-password.html';
        break;
      case 'hidden':
        templateUrl = 'directives/formly-field-hidden.html';
        break;
      case 'email':
        templateUrl = 'directives/formly-field-email.html';
        break;
      case 'text':
        templateUrl = 'directives/formly-field-text.html';
        break;
      default:
        templateUrl = null;
        break;
      }
      return templateUrl;
    };
    return {
      restrict: 'AE',
      transclude: true,
      scope: {
        optionsData: '&options',
        formId: '@formId',
        index: '@index',
        value: '=formValue'
      },
      link: function fieldLink($scope, $element, $attr) {
        var templateUrl = getTemplateUrl($scope.options.type);
        if (templateUrl) {
          $http.get(templateUrl, { cache: $templateCache }).success(function (data) {
            //template data returned
            $element.html(data);
            $compile($element.contents())($scope);
          });
        } else {
          console.log('Formly Error: template type \'' + $scope.options.type + '\' not supported.');
        }
      },
      controller: [
        '$scope',
        function fieldController($scope) {
          $scope.options = $scope.optionsData();
          if ($scope.options.default) {
            $scope.value = $scope.options.default;
          }
          // set field id to link labels and fields
          $scope.id = $scope.formId + $scope.options.type + $scope.index;
        }
      ]
    };
  }
]);
'use strict';
angular.module('formly.render').directive('formlyForm', function formlyForm() {
  return {
    restrict: 'AE',
    templateUrl: 'directives/formly-form.html',
    replace: true,
    scope: {
      formId: '@formId',
      fields: '=fields',
      options: '=options',
      result: '=result'
    },
    controller: [
      '$scope',
      '$element',
      function formController($scope, $element) {
        $scope.populateResult = function () {
          var formChildren = $element.children();
          var fieldScope;
          angular.forEach(formChildren, function (fieldElement, key) {
            // grab fields isolate scope
            fieldScope = angular.element(fieldElement).scope();
            // check if its a form field, otherwise ignore, ie its the button
            if (fieldScope.field) {
              // if a key is set, then save the data with that key in the result object
              // otherwise use the field's index from the fields array
              var dataKey;
              if ('key' in fieldScope.field) {
                dataKey = fieldScope.field.key;
              } else {
                dataKey = fieldScope.$index;
              }
              // set value in result
              $scope.result[dataKey] = fieldScope.value;
            }
          });
        };
      }
    ]
  };
});
angular.module('formly.render').run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('directives/formly-field-checkbox.html', '<div class=checkbox><label><input type=checkbox ng-required=options.required ng-disabled=options.disabled ng-model=value>{{options.label || \'Checkbox\'}} {{options.required ? \'*\' : \'\'}}</label></div>');
    $templateCache.put('directives/formly-field-email.html', '<div class=form-group><label for={{id}}>{{options.label || \'Email\'}} {{options.required ? \'*\' : \'\'}}</label><input type=email class=form-control id={{id}} placeholder={{options.placeholder}} ng-required=options.required ng-disabled=options.disabled ng-model=value></div>');
    $templateCache.put('directives/formly-field-hidden.html', '<input type=hidden ng-model=value>');
    $templateCache.put('directives/formly-field-number.html', '<div class=form-group><label for={{id}}>{{options.label || \'Number\'}} {{options.required ? \'*\' : \'\'}}</label><input type=number class=form-control id={{id}} placeholder={{options.placeholder}} ng-required=options.required ng-disabled=options.disabled min={{options.min}} max={{options.max}} ng-minlength={{options.minlength}} ng-maxlength={{options.maxlength}} ng-model=value></div>');
    $templateCache.put('directives/formly-field-password.html', '<div class=form-group><label for={{id}}>{{options.label || \'Password\'}} {{options.required ? \'*\' : \'\'}}</label><input type=password class=form-control id={{id}} ng-required=options.required ng-disabled=options.disabled ng-model=value></div>');
    $templateCache.put('directives/formly-field-radio.html', '<div class=radio-group><label class=control-label>{{options.label}} {{options.required ? \'*\' : \'\'}}</label><div class=radio ng-repeat="(key, option) in options.options"><label><input type=radio name={{id}} id="{{id + \'_\'+ $index}}" ng-value=option.value ng-required=options.required ng-model=$parent.value>{{option.name}}</label></div></div>');
    $templateCache.put('directives/formly-field-select.html', '<div class=form-group><label for={{id}}>{{options.label || \'Select\'}} {{options.required ? \'*\' : \'\'}}</label><select class=form-control id={{id}} ng-model=value ng-required=options.required ng-disabled=options.disabled ng-options="option.name group by option.group for option in options.options"></select></div>');
    $templateCache.put('directives/formly-field-text.html', '<div class=form-group><label for={{id}}>{{options.label || \'Text\'}} {{options.required ? \'*\' : \'\'}}</label><input class=form-control id={{id}} placeholder={{options.placeholder}} ng-required=options.required ng-disabled=options.disabled ng-model=value></div>');
    $templateCache.put('directives/formly-field-textarea.html', '<div class=form-group><label for={{id}}>{{options.label || \'Text\'}} {{options.required ? \'*\' : \'\'}}</label><textarea type=text class=form-control id={{id}} rows={{options.lines}} placeholder={{options.placeholder}} ng-required=options.required ng-disabled=options.disabled ng-model=value>\n' + '\t</textarea></div>');
    $templateCache.put('directives/formly-field.html', '');
    $templateCache.put('directives/formly-form.html', '<form class=formly role=form name={{options.uniqueFormId}}><formly-field ng-repeat="field in fields" options=field form-value=value class=formly-field form-id={{options.uniqueFormId}} index={{$index}}></formly-field><button type=submit ng-hide=options.hideSubmit ng-click=populateResult()>{{options.submitCopy || "Submit"}}</button></form>');
  }
]);