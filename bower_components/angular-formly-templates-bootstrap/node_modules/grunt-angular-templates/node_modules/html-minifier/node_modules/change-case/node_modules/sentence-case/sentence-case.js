var lowerCase = require('lower-case');

var NON_WORD_REGEXP       = require('./vendor/non-word-regexp');
var CAMEL_CASE_REGEXP     = require('./vendor/camel-case-regexp');
var TRAILING_DIGIT_REGEXP = require('./vendor/trailing-digit-regexp');

/**
 * Sentence case a string.
 *
 * @param  {String} str
 * @return {String}
 */
module.exports = function (str, locale) {
  if (str == null) {
    return '';
  }

  str = String(str)
    // Enable camel case support.
    .replace(CAMEL_CASE_REGEXP, '$1 $2')
    // Add a space after any digit groups.
    .replace(TRAILING_DIGIT_REGEXP, '$1 $2')
    // Remove all non-word characters and replace with a single space.
    .replace(NON_WORD_REGEXP, ' ')
    // Trim whitespace around the string.
    .replace(/^ | $/g, '');

  // Lower case the entire string.
  return lowerCase(str, locale);
};
