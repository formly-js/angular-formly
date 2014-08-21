'use strict';
angular.module('formly.render')
.provider('formlyTemplate', function() {

	var templateMap = {};

	function setTemplateUrl(name, templateUrl) {
		if (typeof name === 'string') {
			templateMap[name] = templateUrl;
		} else {
			angular.forEach(name, function(templateUrl, name) {
				setTemplateUrl(name, templateUrl);
			});
		}
	}

	function getTemplateUrl(type) {
		return templateMap[type];
	};

	this.setTemplateUrl = setTemplateUrl;
	this.getTemplateUrl = getTemplateUrl;
	this.$get = function formlyTemplate() {
		return this;
	}
	
});