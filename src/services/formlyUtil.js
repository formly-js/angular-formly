angular.module('formly.render')
.factory('formlyUtil', function() {
	return {
		throwErrorWithField: throwErrorWithField
	};

	function throwErrorWithField(message, field) {
		throw new Error('Formly Error: ' + message + '. Field definition: ' + angular.toJson(field));
	}
});