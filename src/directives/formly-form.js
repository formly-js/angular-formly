'use strict';
angular.module('formly.render')
.directive('formlyForm', function formlyForm(formlyOptions, $compile) {
	return {
		restrict: 'AE',
		templateUrl: 'directives/formly-form.html',
		replace: true,
		scope: {
			fields: '=',
			options: '=?',
			result: '=',
			formOnParentScope: '=name'
		},
		compile: function (scope, iElement, iAttrs, controller, transcludeFn) {
			return {
				post: function (scope, ele, attr, controller) {
					scope.options = angular.extend(formlyOptions.getOptions(), scope.options);
					if (scope.options.submitButtonTemplate) {
						ele.find('button').replaceWith($compile(scope.options.submitButtonTemplate)(scope));
					}
					//Post gets called after angular has created the FormController
					//Now pass the FormController back up to the parent scope
					scope.formOnParentScope = scope[attr.name];
				}
			}
		},
		controller: function($scope, $element, $parse) {
			// setup watches for watchExpressions
			angular.forEach($scope.fields, function(field, index) {
				if (angular.isDefined(field.watch)) {
					var watchExpression = field.watch.expression;
					if (angular.isFunction(watchExpression)) {
						// wrap the field's watch expression so we can call it with the field as the first arg as a helper
						watchExpression = function() {
							var args = Array.prototype.slice.call(arguments, 0);
							args.unshift(field);
							return field.watch.expression.apply(this, args);
						}
					}

					$scope.$watch(watchExpression, function() {
						// wrap the field's watch listener so we can call it with the field as the first arg as a helper
						var args = Array.prototype.slice.call(arguments, 0);
						args.unshift(field);
						return field.watch.listener.apply(this, args);
					});
				}
			});
			$scope.$watch('result', function(newValue) {
				angular.forEach($scope.fields, function(field, index) {
					if (field.hideExpression) {
						field.hide = $parse(field.hideExpression)($scope.result);
					}
				});
			}, true);
		}
	};
});