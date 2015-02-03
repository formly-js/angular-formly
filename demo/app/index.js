if (window.location.protocol !== 'http:') {
  window.location.protocol = 'http'; // because not everyone who contributes examples has a paid jsbin account
}
require('angular');
require('bootstrap/dist/css/bootstrap.css');
require('./utilities.css');
require('./index.css');
require('./lodash-mixins');

var moduleName = require('./formlyDemo').name;

angular.element(document).ready(function() {
  angular.bootstrap(document.body, [moduleName]);
  if (ON_DEV) {
    require('./dev.excluded');
  }
});

