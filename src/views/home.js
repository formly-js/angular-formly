'use strict';
app.controller('home', function($scope, $parse, $rootScope) {
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
	$scope.formFieldsStr = JSON.stringify($scope.formFields);
	$scope.formOptionsStr = JSON.stringify($scope.formOptions);
	$scope.formFieldsError = false;
	$scope.formOptionsError = false;

	// Public Methods
	$scope.onSubmit = function onSubmit() {
		$scope.submittedData = $scope.formData;
	};

	$scope.toPrettyJSON = function(obj, tabWidth) {
		var strippedObj = angular.copy(obj);
		var result = JSON.stringify(strippedObj, null, Number(tabWidth));
		return result;
	};

	// Private Methods

	// Events
	$scope.$watch('formFieldsStr', function onOptionsUpdated(newValue, OldValue) {
		try {
			$scope.formFields = $parse(newValue)({});
			$scope.formFieldsError = false;
		} catch (e) {
			// eat $parse error
			// console.log('Formly Demo App Error: error parsing data, changes not applied');
			$scope.formFieldsError = true;
		}
	});
	$scope.$watch('formOptionsStr', function onOptionsUpdated(newValue, OldValue) {
		try {
			$scope.formOptions = $parse(newValue)({});
			$scope.formOptionsError = false;
		} catch (e) {
			// eat $parse error
			// console.log('Formly Demo App Error: error parsing data, changes not applied');
			$scope.formOptionsError = true;
		}
	});
});