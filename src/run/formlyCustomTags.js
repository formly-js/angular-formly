import angular from 'angular-fix'
export default addCustomTags

// @ngInject
function addCustomTags($document) {
  // IE8 check ->
  // https://msdn.microsoft.com/en-us/library/cc196988(v=vs.85).aspx
  if ($document && $document.documentMode < 9) {
    const document = $document.get(0)
    // add the custom elements that we need for formly
    const customElements = [
      'formly-field', 'formly-form',
    ]
    angular.forEach(customElements, el => {
      document.createElement(el)
    })
  }
}
