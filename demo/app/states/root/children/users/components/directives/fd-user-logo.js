export default ngModule => {
  ngModule.directive('fdUserLogo', fdUserLogo);

  require('./fd-user-logo.css');
  function fdUserLogo() {
    return {
      restrict: 'E',
      template: require('./fd-user-logo.html'),
      scope: {
        shrink: '=',
        logo: '=',
        centerVertically: '@'
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: angular.noop
    };
  }
};
