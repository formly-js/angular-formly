'use strict';
app.controller('home', function($scope, $parse, formlyOptions, $window, usingCustomTypeTemplates) {
	// Public Methods
	$scope.onSubmit = function onSubmit() {
		$scope.submittedData = $scope.formData;
	};

	$scope.toPrettyJSON = function(obj, tabWidth) {
		var strippedObj = angular.copy(obj);
		var result = JSON.stringify(strippedObj, null, Number(tabWidth));
		return result;
	};

	$scope.toggleCustomTypeTemplates = function() {
		if (usingCustomTypeTemplates) {
			$window.localStorage.removeItem('useCustomTypeTemplates');
		} else {
			$window.localStorage.setItem('useCustomTypeTemplates', 'true');
		}
		// reload state
		$window.location.reload();
	};

	// Private Methods

	// Events
	$scope.$watch('formFieldsStr', function onOptionsUpdated(newValue, OldValue) {
		try {
			$scope.formFields = $parse(newValue)({});
			$scope.formFieldsError = false;
		} catch (e) {
			$scope.formFieldsError = true;
		}
	});
	$scope.$watch('formOptionsStr', function onOptionsUpdated(newValue, OldValue) {
		try {
			$scope.formOptions = $parse(newValue)({});
			$scope.formOptionsError = false;
		} catch (e) {
			$scope.formOptionsError = true;
		}
	});

	// Public Vars
	if (usingCustomTypeTemplates) {
		$scope.typeTemplatesButton = 'Use Built-in Type Templates';
	} else {
		$scope.typeTemplatesButton = 'Use Custom Type Templates';
	}

	$scope.preConfiguredOptions = formlyOptions.getOptions();

	$scope.formFields = [{
		key: 'firstName',
		type: 'text',
		label: 'First Name',
		placeholder: 'Jane'
	}, {
		key: 'lastName',
		type: 'text',
		label: 'Last Name',
		placeholder: 'Doe'
	}, {
		key: 'email',
		type: 'email',
		placeholder: 'janedoe@gmail.com'
	}, {
		key: 'about',
		type: 'textarea',
		label: 'Tell me about yourself',
		placeholder: 'I like puppies',
		lines: 4
	}, {
		key: 'triedEmber',
		type: 'radio',
		label: 'Have you tried EmberJs yet?',
		default: 'no',
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
		key: 'angularFan',
		type: 'text',
		label: 'Angular Fan?',
		disabled: true,
		default: 'yes',
		required: true
	}, {
		key: 'love',
		type: 'number',
		label: 'How much love?',
		default: 2,
		min: 0,
		max: 100,
		required: true
	}, {
		key: 'seeWhatYouType',
		type: 'customTemplate',
		templateUrl: 'views/custom-template.html',
		label: 'Do you like seeing what you type?'
	}, {
		key: 'useDirective',
		template: '<div custom-field add-smile="true"></div>',
		type: 'customField',
		label: 'Do you want the power?'
	}, {
		key: 'transportation',
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
		key: 'password',
		type: 'password',
		label: 'Password'
	}, {
		key: 'checkThis',
		type: 'checkbox',
		label: 'Check this here (to reveal something secret...)'
	}, {
		key: 'hiddenWhenUnchecked',
		type: 'text',
		label: 'Conditional input',
		placeholder: 'This is a big secret! Try typing "joe"',
		hideExpression: '!checkThis'
	}, {
		key: 'showWhenJoe',
		type: 'text',
		label: 'You typed Joe! You found me!',
		placeholder: 'hideExpressions are evaluated on the result',
		hideExpression: 'hiddenWhenUnchecked !== "joe"'
	}, {
		key:'secretCode',
		type: 'hidden',
		default: 'secret_code'
	}];

	$scope.hiddenFormFields = [
		{
			key: 'field',
			type: 'textarea',
			label: 'This is a special form field',
			placeholder: 'It has a watch property with an expression function that depends on something outside the result...',
			watch: {
				expression: function(field) {
					return !/joe/ig.test($scope.formData.hiddenWhenUnchecked);
				},
				listener: function(field, _new) {
					field.hide = _new;
				}
			}
		}
	];

	$scope.formOptions = {
		uniqueFormId: 'formly',
		submitCopy: 'Save',
		hideSubmit: false
	};
	$scope.hiddenFormOptions = {
		uniqueFormId: 'hiddenFormly',
		hideSubmit: true
	};
	$scope.submittedData = null;
	$scope.formData = {};
	$scope.hiddenFormData = {};
	$scope.formFieldsStr = $scope.toPrettyJSON($scope.formFields, 4);
	$scope.formOptionsStr = $scope.toPrettyJSON($scope.formOptions, 4);
	$scope.formFieldsError = false;
	$scope.formOptionsError = false;
});