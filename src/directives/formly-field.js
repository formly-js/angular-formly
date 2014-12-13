angular.module('formly.render')
.directive('formlyField', function formlyField($http, $compile, $templateCache, formlyConfig) {
	'use strict';
	return {
		restrict: 'AE',
		transclude: true,
		scope: {
			optionsData: '&options',
			formId: '=',
			index: '=',
			fields: '=',
			result: '=formResult',
			form: '=?'
		},
		link: function fieldLink($scope, $element) {
			var templateOptions = 0;
			templateOptions += $scope.options.template ? 1 : 0;
			templateOptions += $scope.options.type ? 1 : 0;
			templateOptions += $scope.options.templateUrl ? 1 : 0;
			if (templateOptions === 0) {
				console.warn('Formly Error: template type \'' + $scope.options.type + '\' not supported. On element:', $element);
				return;
			} else if (templateOptions > 1) {
				throw new Error('Formly Error: You must only provide a type, template, or templateUrl for a field. Provided: ' + JSON.stringify($scope.options));
			}
			var template = $scope.options.template || formlyConfig.getTemplate($scope.options.type);
			if (template) {
				setElementTemplate(template);
			} else {
				var templateUrl = $scope.options.templateUrl || formlyConfig.getTemplateUrl($scope.options.type);
				if (templateUrl) {
					$http.get(templateUrl, {
						cache: $templateCache
					}).then(function(response) {
						setElementTemplate(response.data);
					}, function(error) {
						console.warn('Formly Error: Problem loading template for ' + templateUrl, error);
					});
				}
			}
			function setElementTemplate(templateData) {
				$element.html(templateData);
				$compile($element.contents())($scope);
			}
		},
		controller: function fieldController($scope) {
			$scope.options = $scope.optionsData();
			var type = $scope.options.type;
			if (!type && $scope.options.template) {
				type = 'template';
			} else if (!type && $scope.options.templateUrl) {
				type = 'templateUrl';
			}

			// set field id to link labels and fields
			$scope.id = $scope.formId + type + $scope.options.key + $scope.index;
		}
	};
});
