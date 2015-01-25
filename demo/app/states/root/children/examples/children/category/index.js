let ngModule = require('registerModule')(require('ngCommon'));
let stateUtils = require('stateUtils');

module.exports = {
  name: ngModule.name,
  url: ':category',
  abstract: true,
  template: '<div ui-view></div>',
  children: require('./children'),
  resolve: {
    category: stateUtils.resolveParameter('category')
  }
};

