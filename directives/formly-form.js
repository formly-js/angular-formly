'use strict';
angular.module('formly.render')
.directive('formlyForm', function formlyForm() {
	return {
		restrict: 'AE',
		templateUrl: 'directives/formly-form.html',
		replace: true,
		scope: {
			formId: '@formId',
			fieldsData: '&fields',
			optionsData: '&options',
			result: '=result'
		},
		controller: function formController($scope, $element) {
			$scope.fields = $scope.fieldsData();
			$scope.options = $scope.optionsData();

			$scope.populateResult = function() {
				var formChildren = $element.children();
				var fieldScope;
				angular.forEach(formChildren, function(field, key){
					// grab fields isolate scope
					fieldScope = angular.element(field).scope();
					$scope.result[fieldScope.$index] = fieldScope.value;
				});
			};
		}
	};
});