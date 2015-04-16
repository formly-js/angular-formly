// some versions of angular don't export the angular module properly,
// so we get it from window in this case.
import angular from 'angular';
if (!angular.version) {
  angular = window.angular;
}
export default angular;
