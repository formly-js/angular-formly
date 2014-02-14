'use strict';
angular.module('formly.render')
.directive('formlyForm', function formlyForm() {
	return {
		restrict: 'AE',
		templateUrl: 'directives/formly-form.html',
		replace: true,
		scope: {
			formId: '@formId',
			fields: '=fields',
			options: '=options',
			result: '=result'
		},
		controller: function formController($scope, $element) {

			$scope.populateResult = function() {
				var formChildren = $element.children();
				var fieldScope;
				angular.forEach(formChildren, function(fieldElement, key){
					// grab fields isolate scope
					fieldScope = angular.element(fieldElement).scope();

					// check if its a form field, otherwise ignore, ie its the button
					if (fieldScope.field) {
						// if a key is set, then save the data with that key in the result object
						// otherwise use the field's index from the fields array
						var dataKey;
						if('key' in fieldScope.field) {
							dataKey = fieldScope.field.key;
						} else {
							dataKey = fieldScope.$index;
						}

						// set value in result
						$scope.result[dataKey] = fieldScope.value;
					}
				});
			};
		}
	};
});