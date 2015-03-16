const ngModule = require('registerModule')(require('ngCommon'));
const stateUtils = require('stateUtils');

require('./components')(ngModule);

const examples = require('./components/data/examples');

module.exports = {
  name: ngModule.name,
  abstract: true,
  styles: require('./index.css'),
  template: require('./index.html'),
  controller: require('./controller'),
  controllerAs: 'vm',
  children: require('./children'),
  resolve: {
    examples: stateUtils.resolveIdentity(examples)
  }
};

