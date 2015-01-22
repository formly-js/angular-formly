var upperCase = require('upper-case');

/**
 * Check if a string is upper case.
 *
 * @param  {String}  string
 * @return {Boolean}
 */
module.exports = function (string, locale) {
  return upperCase(string, locale) === string;
};
