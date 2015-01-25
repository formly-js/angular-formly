// @ngInject
module.exports = function ExampleCtrl(examples, category, slug, _) {
  var vm = this;
  let {examples: examplesList} = _.find(examples, {name: category});
  vm.example = _.find(examplesList, {slug});
};
