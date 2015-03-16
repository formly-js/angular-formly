// @ngInject
module.exports = function MainCtrl(examples) {
  var vm = this;

  vm.examples = examples;
  vm.formlyVersion = VERSION;
};
