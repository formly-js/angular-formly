'use strict';
app.controller('home', function($scope, $parse, $window, usingCustomTypeTemplates) {
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
	$scope.$watch('formDataStr', function onDataUpdated(newValue, OldValue) {
		try {
			$scope.formData = $parse(newValue)({});
			$scope.formDataError = false;
		} catch (e) {
			$scope.formDataError = true;
		}
	});

	// Public Vars
	if (usingCustomTypeTemplates) {
		$scope.typeTemplatesButton = 'Use Built-in Type Templates';
	} else {
		$scope.typeTemplatesButton = 'Use Custom Type Templates';
	}

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
		key: 'emailRequired',
		type: 'checkbox',
		label: 'Email required',
		description: 'Do you really want us to have your email?'
	}, {	
		key: 'email',
		type: 'email',
		placeholder: 'janedoe@gmail.com',
		description: 'We won\'t spam you',
		requiredExpression: 'emailRequired'
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
		options: [
			{
				name: 'Yes, and I love it!',
				value: 'yesyes'
			}, {
				name: 'Yes, but I\'m not a fan...',
				value: 'yesno',
				description: 'Help me!'
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
		required: true
	}, {
		key: 'love',
		type: 'number',
		label: 'How much love?',
		min: 0,
		max: 100,
		required: true
	}, {
		key: 'inlineCustom',
		type: 'inline-custom',
		label: 'Example of setTemplate'
	}, {
		key: 'seeWhatYouType',
		type: 'customTemplate',
		templateUrl: 'views/custom-template.html',
		label: 'do you like seeing what you type?',
		nameKey: 'firstName'
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
        value: 'car',
				group: 'inefficiently'
			}, {
				name: 'Helicopter',
				value: 'helicopter',
				group: 'inefficiently'
			}, {
				name: 'Sport Utility Vehicle',
				value: 'sport-utility-vehicle',
				group: 'inefficiently'
			}, {
				name: 'Bicycle',
				value: 'bicycle',
				group: 'efficiently'
			}, {
				name: 'Skateboard',
				value: 'skateboard',
				group: 'efficiently'
			}, {
				name: 'Walk',
				value: 'walk',
				group: 'efficiently'
			}, {
				name: 'Bus',
				value: 'bus',
				group: 'efficiently'
			}, {
				name: 'Scooter',
				value: 'scooter',
				group: 'efficiently'
			}, {
				name: 'Train',
				value: 'train',
				group: 'efficiently'
			}, {
				name: 'Hot Air Balloon',
				value: 'hot-air-balloon',
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
		label: 'Check this here',
		description: 'To reveal something secret...'
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
		type: 'hidden'
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
		uniqueFormId: 'formly'
	};
	$scope.hiddenFormOptions = {
		uniqueFormId: 'hiddenFormly'
	};
	$scope.submittedData = null;
	$scope.formData = {
		triedEmber: 'no',
		transportation: 'hot-air-balloon',
		angularFan: 'yes',
		love: 2,
		secretCode: 'secret_code'
	};
	$scope.hiddenFormData = {};
	$scope.formFieldsStr = $scope.toPrettyJSON($scope.formFields, 4);
	$scope.formDataStr = $scope.toPrettyJSON($scope.formData, 4);
	$scope.formFieldsError = false;
	$scope.formDataError = false;
});