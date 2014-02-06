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
		controller: function formController($scope) {
			$scope.fields = $scope.fieldsData();
			$scope.options = $scope.optionsData();

			$scope.populateResult = function() {
				angular.forEach($scope.fields, function(field, index){
					$scope.result[index] = field.value;
				});
			};
		}
	};
});