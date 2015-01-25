let ngModule = require('registerModule')();
ngModule.constant('_', require('lodash'));
require('./onDev')(ngModule);
module.exports = ngModule.name;
