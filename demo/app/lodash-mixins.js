var _ = require('lodash');
_.mixin({
  startsWith: function startsWithMixin(string, start) {
    return startsOrEndsWith(_.first, string, start);
  },
  endsWith: function endsWithMixin(string, end) {
    return startsOrEndsWith(_.last, string, end);
  },
  isNullOrUndefined: function isNullOrUndefined() {
    return _.isUndefined.apply(_, arguments) || _.isNull.apply(_, arguments);
  },
  getDirectory: function getDirectory(filepath) {
    return filepath.substr(0, _.lastIndexOf(filepath, '/'));
  }
});
function startsOrEndsWith(fn, s1, s2) {
  return s1 && s2 && s1.length >= s2.length && fn(s1, s2.length).join('') === s2;
}
