'use strict';
angular.module('formly.render')
.provider('formlyOptions', function() {

	var options = {
		uniqueFormId: null,
		submitCopy: "Submit",
		hideSubmit: false,
		submitButtonTemplate: null
	};

	function setOption(name, value) {
		if (typeof name === 'string') {
			options[name] = value;
		} else {
			angular.forEach(name, function(val, name) {
				setOption(name, val);
			});
		}
	}

	function getOptions() {
		// copy to avoid third-parties manipulating the options outside of the api.
		return angular.copy(options);
	}

	this.setOption = setOption;
	this.getOptions = getOptions;
	this.$get = function formlyOptions() {
		return this;
	}
	
});