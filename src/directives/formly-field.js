'use strict';
angular.module('formly.render')
.directive('formlyField', function formlyField($http, $compile) {

	var getTemplateUrl = function(type) {
		var templateUrl = '';

		switch(type) {
			case 'hidden' :
				templateUrl = 'directives/formly-field-hidden.html';
				break;
			case 'email':
				templateUrl = 'directives/formly-field-email.html';
				break;
			case 'text':
				templateUrl = 'directives/formly-field-text.html';
				break;
			default :
				templateUrl = '<div>Template "{{options.type}}" not found</div>';
				break;
		}

		return templateUrl;
	};
	
	return {
		restrict: 'AE',
		transclude: true,
		scope: {
			optionsData: '&options',
			formId: '@formId',
			index: '@index',
			value: '=formValue'
		},
		link: function fieldLink($scope, $element, $attr) {
			var templateUrl = getTemplateUrl($scope.options.type);
			$http.get(templateUrl).success(function(data) {
				//template data returned
				$element.html(data);
				$compile($element.contents())($scope);
			});
		},
		controller: function fieldController($scope) {
			$scope.options = $scope.optionsData();
			if ($scope.options.default) {
				$scope.value = $scope.options.default;
			}
			
			// set field id to link labels and fields
			$scope.id = $scope.formId + $scope.options.type + $scope.index;
		}
	};
});