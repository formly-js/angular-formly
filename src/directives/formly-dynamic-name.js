module.exports = ngModule => {
  ngModule.directive('formlyDynamicName', function formlyDynamicName() {
    return {
      restrict: 'A',
      priority: 599, // one after ngIf
      controller: function ($scope, $element, $attrs) {
        $element.removeAttr('formly-dynamic-name');
        $attrs.$set('name', $scope.$eval($attrs.formlyDynamicName));
        delete $attrs.formlyDynamicName;
      }
    };
  });
};
