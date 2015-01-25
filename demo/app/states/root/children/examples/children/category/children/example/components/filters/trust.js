module.exports = ngModule => {
  ngModule.filter('trust', trustFunction);
  function trustFunction($sce) {
    return function trust(value, type) {
      // Defaults to treating trusted value as `html`
      return $sce.trustAs(type || 'html', value);
    };
  }
};
