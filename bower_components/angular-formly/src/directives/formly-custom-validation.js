angular.module('formly.render').directive('formlyCustomValidation', function($parse) {
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
});