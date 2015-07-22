export default formlyWarn;

// @ngInject
function formlyWarn(formlyConfig, formlyErrorAndWarningsUrlPrefix, $log) {
  return function warn() {
    if (!formlyConfig.disableWarnings) {
      const args = Array.prototype.slice.call(arguments);
      const warnInfoSlug = args.shift();
      args.unshift('Formly Warning:');
      args.push(`${formlyErrorAndWarningsUrlPrefix}${warnInfoSlug}`);
      $log.warn(...args);
    }
  };
}
