angular.module('formly.render')
.directive('formlyField', function formlyField($http, $compile, $templateCache, formlyConfig, formlyUtil) {
	'use strict';
	return {
		restrict: 'AE',
		transclude: true,
		scope: {
			options: '=',
			model: '=',
			formId: '=?',
			index: '=?',
			fields: '=?',
			form: '=?'
		},
		controller: function fieldController($scope, $interval) {
			// set field id to link labels and fields
			$scope.id = formlyUtil.getFieldId($scope.formId, $scope.options, $scope.index);
			angular.extend($scope.options, {
				runExpressions: runExpressions,
				modelOptions: {
					getterSetter: true,
					allowInvalid: true
				}
			});
			$scope.options.runExpressions = runExpressions;
			$scope.value = valueGetterSetter;

			// initalization
			runExpressions();
			if (!$scope.options.noFormControl) {
				setFormControl();
			}
			if ($scope.options.model) {
				$scope.$watch('options.model', runExpressions, true);
			}

			// function definitions

			function runExpressions() {
				var field = $scope.options;
				var currentValue = valueGetterSetter();
				angular.forEach(field.expressionProperties, function runExpression(expression, prop) {
					if (prop !== 'data') {
						field[prop] = formlyUtil.formlyEval($scope, expression, currentValue);
					} else {
						field.data = field.data || {};
						angular.forEach(field.expressionProperties.data, function runExpression(dataExpression, dataProp) {
							field.data[dataProp] = formlyUtil.formlyEval($scope, dataExpression, currentValue);
						});
					}
				});
			}

			function valueGetterSetter(newVal) {
				if (!$scope.model || (!$scope.options.key && !$scope.index)) {
					return;
				}
				if (angular.isDefined(newVal)) {
					$scope.model[$scope.options.key || $scope.index] = newVal;
				}
				return $scope.model[$scope.options.key || $scope.index];
			}

			function setFormControl() {
				var stopWaitingForDestroy;
				var maxTime = 2000;
				var intervalTime = 5;
				var iterations = 0;
				var interval = $interval(function() {
					iterations++;
					if (!angular.isDefined($scope.options.key) && !angular.isDefined($scope.index)) {
						return cleanUp();
					}
					var formControl = $scope.form && $scope.form[$scope.id];
					if (formControl) {
						$scope.options.formControl = formControl;
						cleanUp();
					} else if (intervalTime * iterations > maxTime) {
						formlyUtil.warn('Couldn\'t set the formControl after ' + maxTime + 'ms', $scope);
						cleanUp();
					}
				}, intervalTime);
				stopWaitingForDestroy = $scope.$on('$destroy', cleanUp);

				function cleanUp() {
					stopWaitingForDestroy();
					$interval.cancel(interval);
				}
			}
		},
		link: function fieldLink($scope, $element) {
			var templateOptions = 0;
			templateOptions += $scope.options.template ? 1 : 0;
			templateOptions += $scope.options.type ? 1 : 0;
			templateOptions += $scope.options.templateUrl ? 1 : 0;
			if (templateOptions === 0) {
				formlyUtil.warn('template type \'' + $scope.options.type + '\' not supported. On element:', $element);
				return;
			} else if (templateOptions > 1) {
				formlyUtil.throwErrorWithField('You must only provide a type, template, or templateUrl for a field', $scope.options);
			}
			var template = $scope.options.template || formlyConfig.getTemplate($scope.options.type);
			if (template) {
				setElementTemplate(template);
			} else {
				var templateUrl = $scope.options.templateUrl || formlyConfig.getTemplateUrl($scope.options.type);
				if (templateUrl) {
					$http.get(templateUrl, {
						cache: $templateCache
					}).then(function(response) {
						setElementTemplate(response.data);
					}, function(error) {
						formlyUtil.warn('Problem loading template for ' + templateUrl, error);
					});
				}
			}
			function setElementTemplate(templateData) {
				$element.html(templateData);
				$compile($element.contents())($scope);
			}
		}
	};
});
