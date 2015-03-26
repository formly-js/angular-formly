// @ngInject
module.exports = function MainCtrl(examples, logoSrc) {
  var vm = this;

  vm.examples = examples;
  vm.formlyVersion = VERSION;
  vm.logoSrc = logoSrc;
};
