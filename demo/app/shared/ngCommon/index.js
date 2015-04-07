var deps = [
  require('./services'),
  require('./constants'),
  require('./directives'),
  require('angular-ui-router')
];
require('angular-aria') && deps.push('ngAria');
require('angular-animate') && deps.push('ngAnimate');

require('angulartics');
require('angulartics/dist/angulartics-ga.min.js');
deps.push('angulartics');
deps.push('angulartics.google.analytics');


let ngModule = require('registerModule')(deps);

module.exports.name = ngModule.name;
