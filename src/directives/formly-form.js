'use strict';
angular.module('formly.render')
.directive('formlyForm', function formlyForm() {
	return {
		restrict: 'AE',
		templateUrl: 'directives/formly-form.html',
		replace: true,
		scope: {
			formId: '@formId',
			fields: '=fields',
			options: '=options',
			result: '=result'
		},
		controller: function formController($scope, $element) {

		}
	};
});