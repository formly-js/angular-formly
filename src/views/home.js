'use strict';
app.controller('home', function($scope) {
	// Public Vars
	$scope.formFormat = {};
	$scope.formData = {};
	$scope.submittedData = null;

	// Public Methods
	$scope.onSubmit = function onSubmit() {
		$scope.submittedData = $scope.formData;
	};
});