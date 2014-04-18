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
			result: '=result',
			formOnParentScope: '=name'
		},
		controller: function formController($scope, $element) {
		},
		compile: function (scope, iElement, iAttrs, controller, transcludeFn) {
			return {
				post: function (scope, ele, attr, controller) {
					//Post gets called after angular has created the FormController
					//Now pass the FormController back up to the parent scope
					scope.formOnParentScope = scope[attr.name];
				}
			}
		}
	};
});