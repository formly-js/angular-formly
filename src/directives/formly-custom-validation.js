angular.module('formly.render').directive('formlyCustomValidation', function($parse) {
	'use strict';

	return {
		require: 'ngModel',
		link: function(scope, el, attrs, ctrl) {
			var validators = scope.$eval(attrs.formlyCustomValidation);
			if (!validators) {
				return;
			}
			if (angular.isArray(validators) || (validators.name && validators.validate)) {
				// using old api, convert to the new api
				if (!angular.isArray(validators)) {
					validators = [validators];
				}
				var newValidators = {};
				angular.forEach(validators, function(validator) {
					newValidators[validator.name] = validator.validate;
				});
				validators = newValidators;
			}

			// setup watchers and parsers
			var hasValidators = ctrl.hasOwnProperty('$validators');
			angular.forEach(validators, function(validator, name) {
				if (hasValidators) {
					var validatorCollection = validator.isAsync ? '$asyncValidators' : '$validators';
					ctrl[validatorCollection][name] = function(modelValue, viewValue) {
						return getValidity(validator, name, modelValue || viewValue);
					};
				} else {
					ctrl.$parsers.unshift(function(viewValue) {
						var isValid = getValidity(validator, name, viewValue);
						ctrl.$setValidity(name, isValid);
						return viewValue;
					});
				}
			});

			function getValidity(validator, name, value) {
				var isValid = false;
				if (angular.isFunction(validator)) {
					isValid = validator(value, scope);
				} else {
					var validationScope = angular.extend({
						value: value
					}, scope);
					isValid = $parse(validator)(validationScope);
				}
				return isValid;
			}
		}
	};
});