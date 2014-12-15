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