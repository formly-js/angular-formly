var _ = require('lodash');
var count = 1; // prevents modules from ever having the same name
module.exports = common => {
  let deps;
  if (_.isArray(common)) {
    deps = common;
  } else if (common && common.name) {
    deps = [common.name];
  } else {
    deps = [];
  }
  let modName = `formly${count++}Module${_.random(999999)}`;
  return angular.module(modName, deps);
};
