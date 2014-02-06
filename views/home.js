'use strict';
app.controller('home', function($scope) {
	// Public Vars
	$scope.formFields = [
		{
			type: 'email'
		},
		{
			type: 'text',
			label: 'First Name'
		},
		{
			type: 'text',
			label: 'Last Name'
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