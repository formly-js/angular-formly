const utils = require('../other/utils');

module.exports = ngModule => {
  ngModule.factory('formlyUtil', formlyUtil);

  formlyUtil.tests = ON_TEST ? require('./formlyUtil.test')(ngModule) : null;

  function formlyUtil() {
    return utils;
  }
};
