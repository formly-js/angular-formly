'use strict';
app.controller('home', function($scope) {
	// Public Vars
	$scope.formFields = {};
	$scope.formOptions = {
		submitCopy: 'Save'
	};
	$scope.formData = {};
	$scope.submittedData = null;

	// Public Methods
	$scope.onSubmit = function onSubmit() {
		$scope.submittedData = $scope.formData;
	};
});