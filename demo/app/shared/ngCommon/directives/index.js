let ngModule = require('registerModule')([
  require('../constants')
]);
require('./formly-event-navigate')(ngModule);
module.exports = ngModule.name;
