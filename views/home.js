'use strict';
app.controller('home', function($scope, $parse) {
	// Public Vars
	$scope.formFields = [{
		type: 'email'
	}, {
		type: 'text',
		label: 'First Name'
	}, {
		type: 'text',
		label: 'Last Name'
	}, {
		type: 'password',
		label: 'Password'
	}, {
		type: 'hidden',
		default: 'secret_code'
	}];
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

	var lastGoodResult;
	$scope.toPrettyJSON = function(obj, tabWidth) {
		try {
			var strippedObj = angular.copy(obj);
			var result = JSON.stringify(strippedObj, null, Number(tabWidth));
			lastGoodResult = result;

			return result;
		} catch (e) {
			// eat $parse error
			return lastGoodResult;
		}
	};
});