let ngModule = require('registerModule')(require('ngCommon'));
require('./components/index')(ngModule);

let stateUtils = require('stateUtils');

module.exports = {
  name: ngModule.name,
  url: ':slug',
  template: require('./index.html'),
  controller: require('./controller'),
  controllerAs: 'vm',
  resolve: {
    slug: stateUtils.resolveParameter('slug')
  },
  data: {
    activationEvents: ['exampleSelected', 'navigateToExample']
  }
};

