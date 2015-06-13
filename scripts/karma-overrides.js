var _ = require('lodash');
var path = require('path');
module.exports = function(defaultConfig) {
  defaultConfig.files = _.union([
    here('./node_modules/lodash/index.js'),
    here('./node_modules/api-check/dist/api-check.js'),
    here('./node_modules/angular/angular.js'),
    here('./node_modules/angular-mocks/angular-mocks.js')
  ], defaultConfig.files);
  return defaultConfig;
};

function here(p) {
  return path.resolve(__dirname, '../', p);
}
