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
			angular.forEach(validators, function(validator, name) {
				ctrl.$parsers.unshift(function(viewValue) {
					applyValidity(validator, name, viewValue);
					return viewValue;
				});
			});

			function applyValidity(validator, name, value) {
				var isValid = false;
				if (angular.isFunction(validator)) {
					isValid = validator(value, scope);
				} else {
					var validationScope = {
						value: value,
						options: scope.options,
						result: scope.result
					};
					isValid = $parse(validator)(validationScope);
				}
				ctrl.$setValidity(name, isValid);
			}
		}
	};
});