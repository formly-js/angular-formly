let ngModule = require('registerModule')([
  require('../constants')
]);
require('./utils').createProvider(ngModule);
require('./stateUtils').createProvider(ngModule);
module.exports = ngModule.name;
