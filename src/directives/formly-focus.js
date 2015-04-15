export default function formlyFocus ($timeout, $document) {
  /* jshint -W052 */
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var previousEl = null;
      var el = element[0];
      var doc = $document[0];
      attrs.$observe('formlyFocus', function(value) {
        if (value === 'true') {
          $timeout(function() {
            previousEl = doc.activeElement;
            el.focus();
          }, ~~attrs.focusWait);
        } else if (value === 'false') {
          if (doc.activeElement === el) {
            el.blur();
            if (attrs.hasOwnProperty('refocus') && previousEl) {
              previousEl.focus();
            }
          }
        }
      });
    }
  };
}
