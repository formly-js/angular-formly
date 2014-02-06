'use strict';
app.controller('home', function($scope) {
	// Public Vars
	$scope.formFields = [
		{
			type: 'email'
		}
	];
	$scope.formOptions = {
		uniqueFormId: '1234',
		submitCopy: 'Save'
	};
	$scope.submittedData = null;
	$scope.formData = {};

	// Public Methods
	$scope.onSubmit = function onSubmit() {
		$scope.submittedData = $scope.formData;
	};
});