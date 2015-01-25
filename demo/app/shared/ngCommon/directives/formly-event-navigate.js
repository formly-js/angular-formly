module.exports = ngModule => {
  ngModule.directive('formlyEventNavigate', function formlyEventNavigateDirective(stateUtils) {
    return {
      restrict: 'A',
      link: function(scope, el, attrs) {
        let tagName = el[0].tagName;
        let expressionRegex = /^(.*?)(\((.*?)(,(.*?))?\))?$/;
        if (tagName === 'A') {
          attrs.$observe('formlyEventNavigate', function(value) {
            if (!value) {
              return;
            }
            let args = getEventArgs(value);
            let href = stateUtils.eventHref(...args);
            el.attr('href', href);
          });
        } else if (tagName === 'BUTTON') {
          el.on('click', action);
          el.on('keyup', function(event) {
            if (event.which === 32 || event.which === 13) {
              action(event);
            }
          });
        } else {
          throw new Error('formly-event-navigate must be on an <a> or <button> tag only!');
        }
        function action() {
          let args = getEventArgs(attrs.formlyEventNavigate);
          stateUtils.eventNavigate(...args);
        }

        function getEventArgs(value) {
          let [,event,,props,,options] = value.match(expressionRegex) || [];
          props = scope.$eval(props);
          options = scope.$eval(options);
          return [(event || '').trim(), props, options];
        }
      }
    };
  });
};
