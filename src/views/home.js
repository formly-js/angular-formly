'use strict';
app.controller('home', function($scope, $parse, $rootScope) {
	// Public Vars
	$scope.formFields = [{
		type: 'email',
		placeholder: 'janedoe@gmail.com'
	}, {
		type: 'text',
		label: 'First Name',
		placeholder: 'Jane'
	}, {
		type: 'text',
		label: 'Last Name',
		placeholder: 'Doe',
		required: true
	}, {
		type: 'radio',
		label: 'Have you tried EmberJs yet?',
		options: [
			{
				name: 'Yes, and I love it!',
				value: 'yesyes'
			}, {
				name: 'Yes, but I\'m not a fan...',
				value: 'yesno'
			}, {
				name: 'Nope',
				value: 'no'
			}
		]
	}, {
		type: 'text',
		label: 'Angular Fan?',
		disabled: true,
		default: 'yes',
		required: true
	}, {
		type: 'number',
		label: 'How much love?',
		default: 2,
		min: 0,
		max: 100,
		required: true
	}, {
		type: 'select',
		label: 'How do you get around in the city',
		options: [
			{
				name: 'Car',
				group: 'inefficiently'
			}, {
				name: 'Helicopter',
				group: 'inefficiently'
			}, {
				name: 'Sport Utility Vehicle',
				group: 'inefficiently'
			}, {
				name: 'Bicycle',
				group: 'efficiently'
			}, {
				name: 'Skateboard',
				group: 'efficiently'
			}, {
				name: 'Walk',
				group: 'efficiently'
			}, {
				name: 'Bus',
				group: 'efficiently'
			}, {
				name: 'Scooter',
				group: 'efficiently'
			}, {
				name: 'Train',
				group: 'efficiently'
			}, {
				name: 'Hot Air Baloon',
				group: 'efficiently'
			}
		]
	}, {
		type: 'password',
		label: 'Password'
	}, {
		type: 'checkbox',
		label: 'Check this here',
		required: true
	}, {
		type: 'hidden',
		default: 'secret_code'
	}];
	$scope.formOptions = {
		uniqueFormId: 'simpleform',
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