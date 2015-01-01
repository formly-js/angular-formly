angular.module('formly.render')
.factory('formlyUtil', function(formlyConfig) {
  'use strict';
	return {
		throwErrorWithField: throwErrorWithField,
		formlyEval: formlyEval,
		warn: warn,
		getFieldId: getFieldId
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

	function warn() {
		if (!formlyConfig.disableWarnings) {
			var args = Array.prototype.slice.call(arguments);
			args.unshift('Formly Warning:');
			console.warn.apply(console, args);
		}
	}

	function getFieldId(formId, options, index) {
		var type = options.type;
		if (!type && options.template) {
			type = 'template';
		} else if (!type && options.templateUrl) {
			type = 'templateUrl';
		}

		return [formId, type, options.key, index].join('_');
	}

});