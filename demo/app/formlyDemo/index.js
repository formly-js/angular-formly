let _ = require('lodash');
let stateUtils = require('stateUtils');
let utils = require('ngCommon/services/utils');
// do this before requiring the state modules because they use stateUtils which registers it with the common module.
let azCommonModuleName = require('ngCommon').name;

let rootStates = require('../states');
let allStates = stateUtils.getStates(rootStates);
let allStateModules = utils.flatten(rootStates, 'children');

let deps = _.union([
  azCommonModuleName
], _.pluck(allStateModules, 'name'));

let ngModule = require('registerModule')(deps);
module.exports.name = ngModule.name;

ngModule.config(config);

function config($urlRouterProvider, $httpProvider, $compileProvider, $stateProvider, onDev) {
  $httpProvider.useApplyAsync();

  $compileProvider.debugInfoEnabled(onDev);

  // setup states
  _.each(allStates, function(state) {
    $stateProvider.state(state);
  });

  $urlRouterProvider.otherwise('/');
}
