// This file adds the default templates to the formlyTemplateProvider.
// It is excluded from the no-templates build.
'use strict';
angular.module('formly.render').config(function(formlyTemplateProvider) {
	var fields = [
		'textarea', 'radio', 'select', 'number', 'checkbox',
		'password', 'hidden', 'email', 'text'
	];
	angular.forEach(fields, function(field) {
		formlyTemplateProvider.setTemplateUrl(field, 'fields/formly-field-' + field + '.html');
	});
});