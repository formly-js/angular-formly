import angular from 'angular-fix';
export default addCustomTags;

// @ngInject
function addCustomTags($document) {
  if ($document && $document.get) {
    // IE8 check ->
    // http://stackoverflow.com/questions/10964966/detect-ie-version-prior-to-v9-in-javascript/10965203#10965203
    const document = $document.get(0);
    const div = document.createElement('div');
    div.innerHTML = '<!--[if lt IE 9]><i></i><![endif]-->';
    const isIeLessThan9 = (div.getElementsByTagName('i').length === 1);

    if (isIeLessThan9) {
      // add the custom elements that we need for formly
      const customElements = [
        'formly-field', 'formly-form', 'formly-custom-validation', 'formly-focus', 'formly-transpose'
      ];
      angular.forEach(customElements, el => {
        document.createElement(el);
      });
    }
  }
}
