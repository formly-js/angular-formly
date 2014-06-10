'use strict';
angular.module('formly.render')
.directive('formlyForm', function formlyForm() {
	return {
		restrict: 'AE',
		templateUrl: 'directives/formly-form.html',
		replace: true,
		scope: {
			fields: '=fields',
			options: '=options',
			result: '=result',
			formOnParentScope: '=name'
		},
		compile: function (scope, iElement, iAttrs, controller, transcludeFn) {
			return {
				post: function (scope, ele, attr, controller) {
					//Post gets called after angular has created the FormController
					//Now pass the FormController back up to the parent scope
					scope.formOnParentScope = scope[attr.name];
				}
			}
		},
		controller: function($scope, $element, $parse) {
			$scope.$watch('result', function(newValue) {
			angular.forEach($scope.fields, function(field, index) {
					if (field.hideExpression) {
						var getter = $parse(field.hideExpression);
						field.hide = getter($scope.result);
					}
				});
			}, true);
		}
	};
});