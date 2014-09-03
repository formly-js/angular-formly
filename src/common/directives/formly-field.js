angular.module('formly.render')
.directive('formlyField', function formlyField($http, $compile, $templateCache, $interpolate, formlyConfig) {
	'use strict';
	return {
		restrict: 'AE',
		transclude: true,
		scope: {
			optionsData: '&options',
			formId: '=formId',
			index: '=index',
			result: '=formResult'
		},
		link: function fieldLink($scope, $element) {
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
				} else {
					console.warn('Formly Error: template type \'' + $scope.options.type + '\' not supported.');
				}
			}
			function setElementTemplate(templateData) {
				var startSym = $interpolate.startSymbol();
				var endSym = $interpolate.endSymbol();
				if (startSym !== '{{') {
					templateData = templateData.replace(/\{\{/g, startSym);
				}
				if (endSym !== '}}') {
					templateData = templateData.replace(/\}\}/g, endSym);
				}
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
			$scope.id = $scope.formId + type + $scope.index;
		}
	};
});
