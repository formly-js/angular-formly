// Render module for formly to display forms
angular.module('formly.render', []);
// Main Formly Module
angular.module('formly', ['formly.render']);
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

	this.$get = function formlyConfig() {
		return this;
	};
	
});
angular.module('formly.render').directive('formlyCustomValidation', ["$parse", function($parse) {
	'use strict';

	return {
		require: 'ngModel',
		link: function(scope, el, attrs, ctrl) {
			var validators = scope.$eval(attrs.formlyCustomValidation);
			if (!validators) {
				return;
			}
			if (!angular.isArray(validators)) {
				validators = [validators];
			}

			// setup watchers and parsers
			angular.forEach(validators, function(validator) {
				ctrl.$parsers.unshift(function(viewValue) {
					applyValidity(validator, viewValue);
					return viewValue;
				});
			});

			function applyValidity(validator, value) {
				if (!validator.validate) {
					return;
				}
				var isValid = false;
				if (angular.isFunction(validator.validate)) {
					isValid = validator.validate(value, scope);
				} else {
					var validationScope = {
						value: value,
						options: scope.options,
						result: scope.result
					};
					isValid = $parse(validator.validate)(validationScope);
				}
				ctrl.$setValidity(validator.name, isValid);
			}
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
.directive('formlyField', ["$http", "$compile", "$templateCache", "$interpolate", "formlyConfig", function formlyField($http, $compile, $templateCache, $interpolate, formlyConfig) {
	'use strict';
	return {
		restrict: 'AE',
		transclude: true,
		scope: {
			optionsData: '&options',
			formId: '=formId',
			index: '=index',
			result: '=formResult'
		},
		link: function fieldLink($scope, $element) {
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
						console.warn('Formly Error: Problem loading template for ' + templateUrl, error);
					});
				} else {
					console.warn('Formly Error: template type \'' + $scope.options.type + '\' not supported.');
				}
			}
			function setElementTemplate(templateData) {
				var startSym = $interpolate.startSymbol();
				var endSym = $interpolate.endSymbol();
				if (startSym !== '{{') {
					templateData = templateData.replace(/\{\{/g, startSym);
				}
				if (endSym !== '}}') {
					templateData = templateData.replace(/\}\}/g, endSym);
				}
				$element.html(templateData);
				$compile($element.contents())($scope);
			}
		},
		controller: ["$scope", function fieldController($scope) {
			$scope.options = $scope.optionsData();
			var type = $scope.options.type;
			if (!type && $scope.options.template) {
				type = 'template';
			} else if (!type && $scope.options.templateUrl) {
				type = 'templateUrl';
			}

			// set field id to link labels and fields
			$scope.id = $scope.formId + type + $scope.index;
		}]
	};
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
		controller: ["$scope", "$element", "$parse", function($scope, $element, $parse) {
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
				window.setTimeout(function() {
					angular.forEach($scope.fields, function(field) {
						var formField = $scope.formOnParentScope[field.key];
						if (formField) {
							field.formField = formField;
						}
					});
				}); // next tick, give angular an event loop to finish compiling
			});

		}]
	};
});
angular.module('formly.render').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('fields/formly-field-checkbox.html',
    "<div class=checkbox ng-class=\"{'has-error': options.formField.$invalid}\"><label><input type=checkbox id={{id}} formly-dynamic-name=options.key formly-custom-validation=options.validators aria-describedby={{id}}_description ng-required=options.required ng-disabled=options.disabled ng-model=\"result[options.key || index]\"> {{options.label || 'Checkbox'}} {{options.required ? '*' : ''}}</label><p id={{id}}_description class=help-block ng-if=options.description>{{options.description}}</p></div>"
  );


  $templateCache.put('fields/formly-field-email.html',
    "<div class=form-group ng-class=\"{'has-error': options.formField.$invalid}\"><label for={{id}}>{{options.label || 'Email'}} {{options.required ? '*' : ''}}</label><input type=email class=form-control id={{id}} formly-dynamic-name=options.key formly-custom-validation=options.validators placeholder={{options.placeholder}} aria-describedby={{id}}_description ng-required=options.required ng-disabled=options.disabled ng-model=\"result[options.key || index]\"><p id={{id}}_description class=help-block ng-if=options.description>{{options.description}}</p></div>"
  );


  $templateCache.put('fields/formly-field-hidden.html',
    "<input type=hidden ng-model=\"result[options.key || index]\">"
  );


  $templateCache.put('fields/formly-field-number.html',
    "<div class=form-group ng-class=\"{'has-error': options.formField.$invalid}\"><label for={{id}}>{{options.label || 'Number'}} {{options.required ? '*' : ''}}</label><input type=number class=form-control id={{id}} formly-dynamic-name=options.key formly-custom-validation=options.validators placeholder={{options.placeholder}} aria-describedby={{id}}_description ng-required=options.required ng-disabled=options.disabled min={{options.min}} max={{options.max}} ng-minlength={{options.minlength}} ng-maxlength={{options.maxlength}} ng-model=\"result[options.key || index]\"><p id={{id}}_description class=help-block ng-if=options.description>{{options.description}}</p></div>"
  );


  $templateCache.put('fields/formly-field-password.html',
    "<div class=form-group ng-class=\"{'has-error': options.formField.$invalid}\"><label for={{id}}>{{options.label || 'Password'}} {{options.required ? '*' : ''}}</label><input type=password class=form-control id={{id}} formly-dynamic-name=options.key formly-custom-validation=options.validators aria-describedby={{id}}_description ng-required=options.required ng-disabled=options.disabled ng-trim=\"{{options.trimWhitespace || false}}\" ng-model=\"result[options.key || index]\"><p id={{id}}_description class=help-block ng-if=options.description>{{options.description}}</p></div>"
  );


  $templateCache.put('fields/formly-field-radio.html',
    "<div class=radio-group ng-class=\"{'has-error': options.formField.$invalid}\"><label class=control-label>{{options.label}} {{options.required ? '*' : ''}}</label><div class=radio ng-repeat=\"(key, option) in options.options\"><label><input type=radio formly-dynamic-name=options.key formly-custom-validation=options.validators id=\"{{id + '_'+ $index}}\" aria-describedby={{id}}_description ng-value=option.value ng-required=options.required ng-model=\"$parent.result[$parent.options.key || $parent.index]\"> {{option.name}}</label><p id={{id}}_description class=help-block ng-if=option.description>{{option.description}}</p></div></div>"
  );


  $templateCache.put('fields/formly-field-select.html',
    "<div class=form-group ng-class=\"{'has-error': options.formField.$invalid}\"><label for={{id}}>{{options.label || 'Select'}} {{options.required ? '*' : ''}}</label><select class=form-control id={{id}} formly-dynamic-name=options.key formly-custom-validation=options.validators aria-describedby={{id}}_description ng-model=\"result[options.key || index]\" ng-required=options.required ng-disabled=options.disabled ng-options=\"option.value as option.name group by option.group for option in options.options\"></select><p id={{id}}_description class=help-block ng-if=options.description>{{options.description}}</p></div>"
  );


  $templateCache.put('fields/formly-field-text.html',
    "<div class=form-group ng-class=\"{'has-error': options.formField.$invalid}\"><label for={{id}}>{{options.label || 'Text'}} {{options.required ? '*' : ''}}</label><input type=text class=form-control id={{id}} formly-dynamic-name=options.key formly-custom-validation=options.validators placeholder={{options.placeholder}} aria-describedby={{id}}_description ng-required=options.required ng-disabled=options.disabled ng-model=\"result[options.key || index]\"><p id={{id}}_description class=help-block ng-if=options.description>{{options.description}}</p></div>"
  );


  $templateCache.put('fields/formly-field-textarea.html',
    "<div class=form-group ng-class=\"{'has-error': options.formField.$invalid}\"><label for={{id}}>{{options.label || 'Text'}} {{options.required ? '*' : ''}}</label><textarea type=text class=form-control id={{id}} formly-dynamic-name=options.key formly-custom-validation=options.validators rows={{options.lines}} placeholder={{options.placeholder}} aria-describedby={{id}}_description ng-required=options.required ng-disabled=options.disabled ng-model=\"result[options.key || index]\">\n" +
    "\t</textarea><p id={{id}}_description class=help-block ng-if=options.description>{{options.description}}</p></div>"
  );

}]);
angular.module('formly.render').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directives/formly-form.html',
    "<form class=formly role=form><formly-field ng-repeat=\"field in fields\" options=field form-result=result form-id=options.uniqueFormId ng-if=!field.hide index=$index></formly-field><div ng-transclude></div></form>"
  );

}]);

// This file adds the default templates to the formlyConfigProvider.
// It is excluded from the no-templates build.
angular.module('formly.render').config(["formlyConfigProvider", function(formlyConfigProvider) {
	'use strict';
	var fields = [
		'textarea', 'radio', 'select', 'number', 'checkbox',
		'password', 'hidden', 'email', 'text'
	];
	angular.forEach(fields, function(field) {
		formlyConfigProvider.setTemplateUrl(field, 'fields/formly-field-' + field + '.html');
	});
}]);