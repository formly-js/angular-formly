export default formlyFocus;

// @ngInject
function formlyFocus($timeout, $document) {
  return {
    restrict: 'A',
    link: function formlyFocusLink(scope, element, attrs) {
      let previousEl = null;
      const el = element[0];
      const doc = $document[0];
      attrs.$observe('formlyFocus', function respondToFocusExpressionChange(value) {
        /* eslint no-bitwise:0 */ // I know what I'm doing. I promise...
        if (value === 'true') {
          $timeout(function setElementFocus() {
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
