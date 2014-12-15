// Render module for formly to display forms
angular.module('formly.render', []);
// Main Formly Module
angular.module('formly', ['formly.render']);
angular.module('formly.render').directive('formlyCustomValidation', ["formlyUtil", function(formlyUtil) {
	'use strict';

	return {
		require: 'ngModel',
		link: function(scope, el, attrs, ctrl) {
			var validators = scope.$eval(attrs.formlyCustomValidation);
			if (!validators) {
				return;
			}
			
			// setup watchers and parsers
			var hasValidators = ctrl.hasOwnProperty('$validators');
			angular.forEach(validators, function(validator, name) {
				if (hasValidators) {
					var validatorCollection = validator.isAsync ? '$asyncValidators' : '$validators';
					ctrl[validatorCollection][name] = function(modelValue, viewValue) {
						return formlyUtil.formlyEval(scope, validator, modelValue, viewValue);
					};
				} else {
					ctrl.$parsers.unshift(function(viewValue) {
						var isValid = formlyUtil.formlyEval(scope, validator, ctrl.$modelValue, viewValue);
						ctrl.$setValidity(name, isValid);
						return viewValue;
					});
				}
			});
		}
	};
}]);
angular.module('formly.render').directive('formlyDynamicName', function formlyDynamicName() {
	'use strict';
	return {
		restrict: 'A',
		priority: 599, // one after ngIf
		controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
			$element.removeAttr('formly-dynamic-name');
			$attrs.$set('name', $scope.$eval($attrs.formlyDynamicName));
			delete $attrs.formlyDynamicName;
			$scope.$emit('formly-dynamic-name-update');
		}]
	};
});
angular.module('formly.render')
.directive('formlyField', ["$http", "$compile", "$templateCache", "formlyConfig", "formlyUtil", function formlyField($http, $compile, $templateCache, formlyConfig, formlyUtil) {
	'use strict';
	return {
		restrict: 'AE',
		transclude: true,
		scope: {
			options: '=',
			formId: '=?',
			index: '=?',
			fields: '=?',
			result: '=formResult',
			form: '=?'
		},
		controller: ["$scope", function fieldController($scope) {
			// set field id to link labels and fields
			$scope.id = getFieldId();
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
			runExpressions($scope.result);

			// function definitions
			function getFieldId() {
				var type = $scope.options.type;
				if (!type && $scope.options.template) {
					type = 'template';
				} else if (!type && $scope.options.templateUrl) {
					type = 'templateUrl';
				}

				return $scope.formId + type + $scope.options.key + $scope.index;
			}


			function runExpressions(result) {
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
				if (angular.isDefined(newVal)) {
					$scope.result[$scope.options.key || $scope.index] = newVal;
				}
				return $scope.result[$scope.options.key || $scope.index];
			}
		}],
		link: function fieldLink($scope, $element) {
			var templateOptions = 0;
			templateOptions += $scope.options.template ? 1 : 0;
			templateOptions += $scope.options.type ? 1 : 0;
			templateOptions += $scope.options.templateUrl ? 1 : 0;
			if (templateOptions === 0) {
				warn('Formly Warning: template type \'' + $scope.options.type + '\' not supported. On element:', $element);
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
						warn('Formly Warning: Problem loading template for ' + templateUrl, error);
					});
				}
			}
			function setElementTemplate(templateData) {
				$element.html(templateData);
				$compile($element.contents())($scope);
			}
		}
	};

	function warn() {
		if (!formlyConfig.disableWarnings) {
			console.warn.apply(console, arguments);
		}
	}
}]);

angular.module('formly.render')
.directive('formlyForm', function formlyForm() {
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
		controller: ["$scope", "$timeout", "formlyUtil", "$interval", function($scope, $timeout, formlyUtil, $interval) {
			
			angular.forEach($scope.fields, setupWatchers); // setup watchers for all fields

			// watch the result and evaluate watch expressions that depend on it.
			$scope.$watch('result', function onResultUpdate(newResult) {
				angular.forEach($scope.fields, function(field) {
					/*jshint -W030 */
					field.runExpressions && field.runExpressions(newResult);
				});
			}, true);

			// listen for formly-dynamic-name fields to notify that the field name has been set and angular has put the field on the form
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

			function setupWatchers(field, index) {
				var watchers = field.watch;
				if (!angular.isDefined(watchers)) {
					return;
				}
				if (!angular.isArray(watchers)) {
					watchers = [watchers];
				}
				angular.forEach(watchers, function(watcher) {
					var stopWatching;
					if (!angular.isDefined(watcher.listener)) {
						formlyUtil.throwErrorWithField('All field watchers must have a listener', field);
					}
					var watchExpression = watcher.expression || 'result["' + field.key + '" || ' + index + ']';
					if (angular.isFunction(watchExpression)) {
						// wrap the field's watch expression so we can call it with the field as the first arg and the stop function as the last arg as a helper
						watchExpression = function formlyWatchExpression() {
							var args = Array.prototype.slice.call(arguments, 0);
							args.unshift($scope.fields[index]); // don't just use field here to ensure that we've got the right field reference
							args.push(stopWatching);
							return field.watch.expression.apply(this, args);
						};
						watchExpression.displayName = 'Formly Watch Expression for field for ' + field.key;
					}
					var watchListener = watcher.listener;
					if (angular.isFunction(watchListener)) {
						// wrap the field's watch listener so we can call it with the field as the first arg and the stop function as the last arg as a helper
						watchListener = function formlyWatchListener() {
							var args = Array.prototype.slice.call(arguments, 0);
							args.unshift($scope.fields[index]); // don't just use field here to ensure that we've got the right field reference
							args.push(stopWatching);
							return field.watch.listener.apply(this, args);
						};
						watchListener.displayName = 'Formly Watch Listener for field for ' + field.key;
					}
					var type = watcher.type || '$watch';
					stopWatching = $scope[type](watchExpression, watchListener, watcher.watchDeep);
				});
			}
		}]
	};
});
angular.module('formly.render')
.provider('formlyConfig', function() {
	'use strict';

	var templateUrlMap = {};
	var templateMap = {};

	function setTemplateUrl(name, templateUrl) {
		if (typeof name === 'string') {
			templateUrlMap[name] = templateUrl;
		} else {
			angular.forEach(name, function(templateUrl, name) {
				setTemplateUrl(name, templateUrl);
			});
		}
	}

	function getTemplateUrl(type) {
		return templateUrlMap[type];
	}

	function setTemplate(name, template) {
		if (typeof name === 'string') {
			templateMap[name] = template;
		} else {
			angular.forEach(name, function(template, name) {
				setTemplate(name, template);
			});
		}
	}

	function getTemplate(type) {
		return templateMap[type];
	}

	this.getTemplateUrl = getTemplateUrl;
	this.setTemplateUrl = setTemplateUrl;

	this.getTemplate = getTemplate;
	this.setTemplate = setTemplate;

	this.disableWarnings = false;

	this.$get = function formlyConfig() {
		return this;
	};
	
});
angular.module('formly.render')
.factory('formlyUtil', function() {
	return {
		throwErrorWithField: throwErrorWithField,
		formlyEval: formlyEval
	};

	function throwErrorWithField(message, field) {
		throw new Error('Formly Error: ' + message + '. Field definition: ' + angular.toJson(field));
	}

	function formlyEval(scope, expression, modelValue, viewValue) {
		if (angular.isFunction(expression)) {
			return expression(viewValue, modelValue, scope);
		} else {
			return scope.$eval(expression, {
				$viewValue: viewValue,
				$modelValue: modelValue
			});
		}
	}
});
angular.module('formly.render').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directives/formly-form.html',
    "<ng-form class=formly role=form><formly-field ng-repeat=\"field in fields\" class=formly-field options=field form-result=result fields=fields form=formOnParentScope form-id=options.uniqueFormId ng-if=!field.hide index=$index></formly-field><div ng-transclude></div></ng-form>"
  );

}]);
