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

					var watches = {};
					angular.forEach(scope.fields, function(field) {
						if (field.hideExpression) {
							watches[field.hideExpression] = watches[field.hideExpression] || [];
							watches[field.hideExpression].push(field);
						}
					});
					angular.forEach(watches, function(fields, expression) {
						var getter = $parse(expression);
						scope.$watch(function() {
							return getter(scope.result);
						}, function(hide) {
							angular.forEach(fields, function(field) {
								field.hide = hide;
							});
						});
					});
				}
			}
		}
	};
});