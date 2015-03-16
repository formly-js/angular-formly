let ngModule = require('registerModule')([
  require('../constants')
]);
require('./fd-event-navigate')(ngModule);
module.exports = ngModule.name;
