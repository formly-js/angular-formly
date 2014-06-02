'use strict';
angular.module('formly.render')
.directive('formlyForm', function formlyForm($parse) {
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
					angular.forEach(scope.fields, function(field) {
						if (field.hideExpression) {
						var getter = $parse(field.hideExpression);
						scope.$watch(function() {
							return getter(scope.result);
						}, function(hide) {
							field.hide = hide;
						});
						}
					});
				}
			}
		}
	};
});