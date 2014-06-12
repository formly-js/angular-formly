'use strict';
angular.module('formly.render')
.directive('formlyField', function formlyField($http, $compile, $templateCache) {

	var getTemplateUrl = function(type) {
		var templateUrl = '';

		switch(type) {
			case 'textarea':
				templateUrl = 'directives/formly-field-textarea.html';
				break;
			case 'radio':
				templateUrl = 'directives/formly-field-radio.html';
				break;
			case 'select':
				templateUrl = 'directives/formly-field-select.html';
				break;
			case 'number':
				templateUrl = 'directives/formly-field-number.html';
				break;
			case 'checkbox':
				templateUrl = 'directives/formly-field-checkbox.html';
				break;
			case 'password' :
				templateUrl = 'directives/formly-field-password.html';
				break;
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
				templateUrl = null;
				break;
		}

		return templateUrl;
	};
	
	return {
		restrict: 'AE',
		transclude: true,
		scope: {
			optionsData: '&options',
			formId: '=formId',
			index: '=index',
			value: '=formValue'
		},
		link: function fieldLink($scope, $element, $attr) {
			var template = $scope.options.template;
			if (template) {
				setElementTemplate(template);
			} else {
				var templateUrl = $scope.options.templateUrl || getTemplateUrl($scope.options.type);
				if (templateUrl) {
					$http.get(templateUrl, {
						cache: $templateCache
					}).then(function(response) {
						setElementTemplate(response.data);
					}, function(error) {
						console.log('Formly Error: Problem loading template for ' + templateUrl, error);
					});
				} else {
					console.log('Formly Error: template type \'' + $scope.options.type + '\' not supported.');
				}
			}
			function setElementTemplate(templateData) {
				$element.html(templateData);
				$compile($element.contents())($scope);
			}
		},
		controller: function fieldController($scope) {
			$scope.options = $scope.optionsData();
			if (typeof $scope.options.default !== 'undefined') {
				$scope.value = $scope.options.default;
			}
			var type = $scope.options.type;
			if (!type && $scope.options.template) {
				type = 'template';
			} else if (!type && $scope.options.templateUrl) {
				type = 'templateUrl';
			}

			// set field id to link labels and fields
			$scope.id = $scope.formId + type + $scope.index;
		}
	};
});
