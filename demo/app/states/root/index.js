let ngModule = require('registerModule')(require('ngCommon'));
let stateUtils = require('stateUtils');
let _ = require('lodash');

let examples = require('./components/data/examples');
_.each(examples, function(category) {
  _.each(category.examples, function(example) {
    example.category = category.name;
  });
});

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

