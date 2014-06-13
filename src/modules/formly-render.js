// Render module for formly to display forms
angular.module('formly.render', []).provider('formly', function() {

	var templateMap = {
		textarea: 'directives/formly-field-textarea.html',
		radio: 'directives/formly-field-radio.html',
		select: 'directives/formly-field-select.html',
		number: 'directives/formly-field-number.html',
		checkbox: 'directives/formly-field-checkbox.html',
		password: 'directives/formly-field-password.html',
		hidden: 'directives/formly-field-hidden.html',
		email: 'directives/formly-field-email.html',
		text: 'directives/formly-field-text.html'
	};

	function setTemplateUrl(name, templateUrl) {
		if (typeof name === 'string') {
			templateMap[name] = templateUrl;
		} else {
			angular.forEach(name, function(templateUrl, name) {
				setTemplateUrl(name, templateUrl)
			});
		}
	}

	function getTemplateUrl(type) {
		return templateMap[type];
	};

	this.setTemplateUrl = setTemplateUrl;
	this.getTemplateUrl = getTemplateUrl;
	this.$get = function formly() {
		return this;
	}
	
});