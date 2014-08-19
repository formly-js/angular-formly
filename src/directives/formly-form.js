'use strict';
angular.module('formly.render')
.directive('formlyForm', function formlyForm(formlyOptions, $compile) {
	var templateHide = 'ng-hide="field.hide"';
	var fieldsTemplate = [
		'<formly-field ng-repeat="field in fields"',
					  'options="field"',
					  'form-result="result"',
					  'form-value="result[field.key||$index]"',
					  'form-id="options.uniqueFormId"',
					  'ng-hide="field.hide"',
					  'index="$index">',
		'</formly-field>'
	].join(' ')
	return {
		restrict: 'AE',
		template: function(el, attr) {
			var useNgIf = formlyOptions.getOptions().useNgIfToHide;
			return [
				'<form class="formly" role="form">',
					'<div class="ng-hide">fields</div>',
					'<button type="submit"',
							'ng-show="!options.hideSubmit">',
						'{{options.submitCopy || "Submit"}}',
					'</button>',
				'</form>'
			].join(' ');
		},
		replace: true,
		scope: {
			fields: '=',
			options: '=?',
			result: '=',
			formOnParentScope: '=name'
		},
		compile: function () {
			return {
				post: function (scope, ele, attr, controller) {
					scope.options = angular.extend(formlyOptions.getOptions(), scope.options);
					if (scope.options.submitButtonTemplate) {
						ele.find('button').replaceWith($compile(scope.options.submitButtonTemplate)(scope));
					}
					var template = fieldsTemplate;
					if (scope.options.useNgIfToHide) {
						template = template.replace(templateHide, 'ng-if="!field.hide"');
					}
					ele.find('div').replaceWith($compile(template)(scope));
					//Post gets called after angular has created the FormController
					//Now pass the FormController back up to the parent scope
					scope.formOnParentScope = scope[attr.name];
				}
			}
		},
		controller: function($scope, $element, $parse) {
			// setup watches for watchExpressions
			angular.forEach($scope.fields, function(field, index) {
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
					if (field.requiredExpression) {
						field.required = $parse(field.requiredExpression)($scope.result);
					}
				});
			}, true);
		}
	};
});