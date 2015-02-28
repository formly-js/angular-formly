// @ngInject
module.exports = function ExampleCtrl(examples, category, slug, _, stateUtils) {
  var vm = this;
  let selectedCategory = _.find(examples, {name: category});
  if (!selectedCategory) {
    redirectBySlug(slug);
  } else {
    vm.example = _.find(selectedCategory.examples, {slug});
    if (!vm.example) {
      redirectBySlug(slug);
    }
  }


  function redirectBySlug(slug) {

    let exampleNewLocation;
    let newCategoryLocation;
    _.each(examples, category => {
      newCategoryLocation = category;
      exampleNewLocation = _.find(category.examples, {slug});
      return !exampleNewLocation;
    });
    if (exampleNewLocation) {
      stateUtils.eventNavigate('navigateToExample', {category: newCategoryLocation.name, slug});
    }
  }
};
