// This file adds the default templates to the formlyConfigProvider.
// It is excluded from the no-templates build.
angular.module('formly.render').config(function(formlyConfigProvider) {
	'use strict';
	var fields = [
		'textarea', 'radio', 'select', 'number', 'checkbox',
		'password', 'hidden', 'email', 'text'
	];
	angular.forEach(fields, function(field) {
		formlyConfigProvider.setTemplateUrl(field, 'fields/formly-field-' + field + '.html');
	});
});