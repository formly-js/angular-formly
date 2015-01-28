module.exports = ngModule => {
  ngModule.factory('formlyWarn', function (formlyConfig, formlyErrorAndWarningsUrlPrefix, $log) {
    return function warn() {
      if (!formlyConfig.disableWarnings) {
        var args = Array.prototype.slice.call(arguments);
        var warnInfoSlug = args.shift();
        args.unshift('Formly Warning:');
        args.push(`${formlyErrorAndWarningsUrlPrefix}${warnInfoSlug}`);
        $log.warn(...args);
      }
    };
  });
};
