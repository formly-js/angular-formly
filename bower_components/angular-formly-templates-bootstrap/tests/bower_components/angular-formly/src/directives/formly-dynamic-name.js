angular.module('formly.render').directive('formlyDynamicName', function formlyDynamicName() {
	'use strict';
	return {
		restrict: 'A',
		priority: 599, // one after ngIf
		controller: function($scope, $element, $attrs) {
			$element.removeAttr('formly-dynamic-name');
			$attrs.$set('name', $scope.$eval($attrs.formlyDynamicName));
			delete $attrs.formlyDynamicName;
			$scope.$emit('formly-dynamic-name-update');
		}
	};
});