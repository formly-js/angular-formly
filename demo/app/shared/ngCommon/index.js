var deps = [
  require('./services'),
  require('./constants'),
  require('./directives'),
  require('angular-ui-router')
];
require('angular-aria') && deps.push('ngAria');


let ngModule = require('registerModule')(deps);


module.exports.name = ngModule.name;
