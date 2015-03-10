// @ngInject
module.exports = function MainCtrl($location, examples, $filter, stateUtils, formlyVersion) {
  var vm = this;

  window.$location = $location;
  vm.$location = $location;
  vm.examples = examples;
  vm.onSearchEntered = onSearchEntered;
  vm.formlyVersion = formlyVersion;
  var allTheExamples = [];

  vm.exampleClass = exampleClass;

  angular.forEach(vm.examples, function(category) {
    allTheExamples = allTheExamples.concat(category.examples);
  });

  function onSearchEntered($event, search) {
    var filteredExamples = $filter('filter')(allTheExamples, search);
    if (filteredExamples && (filteredExamples.length === 1 || $event.keyCode === 13)) {
      stateUtils.eventNavigate('exampleSelected', filteredExamples[0]);
      if ($event.keyCode === 13) {
        vm.search = null;
      }
    }
  }

  function exampleClass(example) {
    return {
      active: stateUtils.includesEvent('exampleSelected', example)
    };
  }
};
