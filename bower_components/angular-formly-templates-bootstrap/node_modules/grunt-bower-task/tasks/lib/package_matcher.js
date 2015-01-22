module.exports = {

  /**
   * @param pkg - Bower package name
   * @param override_key - can be an exact package name, simplified wildcard or true RegExp
   * @returns {boolean}
   */
  matches: function(pkg, override_key) {
    if (pkg === override_key) {
      return true;
    }

    if (override_key.match(/^\/.*\/$/)) {
      var trueRegexMatcher = new RegExp(override_key.replace(/^\/|\/$/g, ''));
      return trueRegexMatcher.test(pkg);
    }

    if (override_key.indexOf('*') >= 0) {
      override_key = override_key.replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, '\\$&').replace('*', '.+');
      var wildcardMatcher = new RegExp(override_key);
      return wildcardMatcher.test(pkg);
    }

    return false;
  }

};
