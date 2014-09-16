angular.module('formly.render')
.directive('formlyForm', function formlyForm($timeout) {
	'use strict';
	return {
		restrict: 'E',
		templateUrl: 'directives/formly-form.html',
		replace: true,
		transclude: true,
		scope: {
			fields: '=',
			options: '=?',
			result: '=',
			formOnParentScope: '=name'
		},
		compile: function () {
			return {
				post: function (scope, ele, attr) {
					//Post gets called after angular has created the FormController
					//Now pass the FormController back up to the parent scope
					scope.formOnParentScope = scope[attr.name];
				}
			};
		},
		controller: function($scope, $element, $parse) {
			// setup watches for watchExpressions
			angular.forEach($scope.fields, function(field) {
				if (angular.isDefined(field.watch) &&
					angular.isDefined(field.watch.expression) &&
					angular.isDefined(field.watch.listener)) {
					var watchExpression = field.watch.expression;
					if (angular.isFunction(watchExpression)) {
						// wrap the field's watch expression so we can call it with the field as the first arg as a helper
						watchExpression = function() {
							var args = Array.prototype.slice.call(arguments, 0);
							args.unshift(field);
							return field.watch.expression.apply(this, args);
						};
					}

					$scope.$watch(watchExpression, function() {
						// wrap the field's watch listener so we can call it with the field as the first arg as a helper
						var args = Array.prototype.slice.call(arguments, 0);
						args.unshift(field);
						return field.watch.listener.apply(this, args);
					});
				}
			});
			$scope.$watch('result', function onResultUpdate() {
				angular.forEach($scope.fields, function(field) {
					if (field.hideExpression) {
						field.hide = $parse(field.hideExpression)($scope.result);
					}
					if (field.requiredExpression) {
						field.required = $parse(field.requiredExpression)($scope.result);
					}
				});
			}, true);
			$scope.$on('formly-dynamic-name-update', function(e) {
				e.stopPropagation();
				if (!$scope.formOnParentScope) {
					return;
				}
				$timeout(function() {
					angular.forEach($scope.fields, function(field) {
						var formField = $scope.formOnParentScope[field.key];
						if (formField) {
							field.formField = formField;
						}
					});
				}); // next tick, give angular an event loop to finish compiling
			});
		}
	};
});