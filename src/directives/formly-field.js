'use strict';
angular.module('formly.render')
.directive('formlyField', function formlyField($http, $compile) {

	var getTemplateUrl = function(type) {
		var templateUrl = '';

		switch(type) {
			case 'email':
				templateUrl = 'directives/formly-field-email.html';
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
		replace: true,
		scope: {
			optionsData: '&options',
			formId: '@formId',
			index: '@index'
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
			if (!$scope.options.value) {
				$scope.options.value = 1;
			};

			//set field id to link labels and fields
			$scope.id = $scope.formId + $scope.options.type + $scope.index;
		}
	};
});