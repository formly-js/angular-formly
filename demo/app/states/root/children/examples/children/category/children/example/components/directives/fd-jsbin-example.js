module.exports = ngModule => {
  ngModule.directive('fdJsbinExample', fdJsbinExample);

  fdJsbinExample.styles = require('./fd-jsbin-example.css');

  function fdJsbinExample() {
    return {
      restrict: 'E',
      scope: {
        jsbinId: '@'
      },
      link: function(scope, el) {
        el.replaceWith(angular.element(`
          <div class="fd-jsbin-example">
            <iframe width="100%"
                    height="100%"
                    src="https://jsbin.com/${scope.jsbinId}/embed?output">
            </iframe>
          </div>
        `));
      }
    };
  }
};
