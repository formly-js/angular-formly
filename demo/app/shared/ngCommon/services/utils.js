let _ = require('lodash');

let utils = module.exports = {
  arrayify: arrayify,
  flatten: flatten
};


module.exports.createProvider = ngModule => {
  ngModule.provider('utils', utilsProvider);

  function /* @ngInject */ utilsProvider(_) {
    _.extend(this, utils, {
      $get: function utilsGet() {
        return this;
      }
    });
  }
};

function arrayify(obj) {
  return _.isUndefined(obj) ? obj : angular.isArray(obj) ? obj : [obj];
}

function flatten(items, property, flatItems = []) {
  _.each(items, function(item) {
    flatItems.push(item);
    flatten(item[property], property, flatItems);
  });
  return flatItems;
}
