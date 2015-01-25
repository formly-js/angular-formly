let ngModule = require('registerModule')(require('ngCommon'));

module.exports = {
  name: ngModule.name,
  url: 'example',
  abstract: true,
  template: '<div ui-view></div>',
  children: require('./children')
};

