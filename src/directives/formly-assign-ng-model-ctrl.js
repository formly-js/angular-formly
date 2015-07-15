import angular from 'angular-fix';
export default formlyAssignNgModelCtrl;

// @ngInject
function formlyAssignNgModelCtrl() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function formlyAssignNgModelCtrl(scope, el, attrs, ngModelCtrlInstance) {
      setFc();
      scope.options.formControl = scope.fc;

      function setFc() {
        // if it exists already then there's more than one fc in this scope (in the formly template)
        if (scope.fc) {
          // if it's not an array already, then this is the second one. If it is, then this is third or later.
          if (!angular.isArray(scope.fc)) {
            scope.fc = [scope.fc];
          }
          scope.fc.push(ngModelCtrlInstance);
        } else {
          scope.fc = ngModelCtrlInstance;
        }
      }
    }
  };

}
