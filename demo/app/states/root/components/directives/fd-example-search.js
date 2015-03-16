export default ngModule => {
  ngModule.directive('fdExampleSearch', fdExampleSearch);

  require('./fd-example-search.css');

  function fdExampleSearch() {
    return {
      restrict: 'E',
      scope: {
        examples: '='
      },
      template: require('./fd-example-search.html'),
      controllerAs: 'vm',
      bindToController: true,
      controller: function(stateUtils, $filter) {
        var vm = this;


        vm.onSearchEntered = onSearchEntered;
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
      }
    };
  }
};
