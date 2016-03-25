import angular from 'angular-fix'

export default formlyForm

/**
 * @ngdoc directive
 * @name formlyForm
 * @restrict AE
 */
// @ngInject
function formlyForm(formlyUsability, formlyWarn, $parse, formlyConfig, $interpolate) {
  let currentFormId = 1
  return {
    restrict: 'AE',
    template: formlyFormGetTemplate,
    replace: true,
    transclude: true,
    scope: {
      fields: '=',
      model: '=',
      form: '=?',
      options: '=?',
    },
    controller: 'FormlyFormController',
    link: formlyFormLink,
  }

  function formlyFormGetTemplate(el, attrs) {
    const rootEl = getRootEl()
    const fieldRootEl = getFieldRootEl()
    const formId = `formly_${currentFormId++}`
    let parentFormAttributes = ''
    if (attrs.hasOwnProperty('isFieldGroup') && el.parent().parent().hasClass('formly')) {
      parentFormAttributes = copyAttributes(el.parent().parent()[0].attributes)
    }
    return `
        <${rootEl} class="formly"
                 name="${getFormName()}"
                 role="form" ${parentFormAttributes}>
          <${fieldRootEl} formly-field
               ng-repeat="field in fields ${getTrackBy()}"
               ${getHideDirective()}="!field.hide"
               class="formly-field"
               options="field"
               model="field.model || model"
               original-model="model"
               fields="fields"
               form="theFormlyForm"
               form-id="${getFormName()}"
               form-state="options.formState"
               form-options="options"
               index="$index">
          </${fieldRootEl}>
          <div ng-transclude class="${getTranscludeClass()}"></div>
        </${rootEl}>
      `

    function getRootEl() {
      return attrs.rootEl || 'ng-form'
    }

    function getFieldRootEl() {
      return attrs.fieldRootEl || 'div'
    }

    function getHideDirective() {
      return attrs.hideDirective || formlyConfig.extras.defaultHideDirective || 'ng-if'
    }

    function getTrackBy() {
      if (!attrs.trackBy) {
        return ''
      } else {
        return `track by ${attrs.trackBy}`
      }
    }

    function getFormName() {
      let formName = formId
      const bindName = attrs.bindName
      if (bindName) {
        if (angular.version.minor < 3) {
          throw formlyUsability.getFormlyError('bind-name attribute on formly-form not allowed in < angular 1.3')
        }
        // we can do a one-time binding here because we know we're in 1.3.x territory
        formName = `${$interpolate.startSymbol()}::'formly_' + ${bindName}${$interpolate.endSymbol()}`
      }
      return formName
    }

    function getTranscludeClass() {
      return attrs.transcludeClass || ''
    }

    function copyAttributes(attributes) {
      const excluded = ['model', 'form', 'fields', 'options', 'name', 'role', 'class',
        'data-model', 'data-form', 'data-fields', 'data-options', 'data-name']
      const arrayAttrs = []
      angular.forEach(attributes, ({nodeName, value}) => {
        if (nodeName !== 'undefined' && excluded.indexOf(nodeName) === -1) {
          arrayAttrs.push(`${toKebabCase(nodeName)}="${value}"`)
        }
      })
      return arrayAttrs.join(' ')
    }
  }

  function formlyFormLink(scope, el, attrs) {
    setFormController()
    fixChromeAutocomplete()

    function setFormController() {
      const formId = attrs.name
      scope.formId = formId
      scope.theFormlyForm = scope[formId]
      if (attrs.form) {
        const getter = $parse(attrs.form)
        const setter = getter.assign
        const parentForm = getter(scope.$parent)
        if (parentForm) {
          scope.theFormlyForm = parentForm
          if (scope[formId]) {
            scope.theFormlyForm.$removeControl(scope[formId])
          }

          // this next line is probably one of the more dangerous things that angular-formly does to improve the
          // API for angular-formly forms. It ensures that the NgModelControllers inside of formly-form will be
          // attached to the form that is passed to formly-form rather than the one that formly-form creates
          // this is necessary because it's confusing to have a step between the form you pass in
          // and the fields in that form. It also is because angular doesn't propagate properties like $submitted down
          // to children forms :-( This line was added to solve this issue:
          // https://github.com/formly-js/angular-formly/issues/287
          // luckily, this is how the formController has been accessed by the NgModelController since angular 1.0.0
          // so I expect it will remain this way for the life of angular 1.x
          el.removeData('$formController')
        } else {
          setter(scope.$parent, scope[formId])
        }
      }
      if (!scope.theFormlyForm && !formlyConfig.disableWarnings) {
        /* eslint no-console:0 */
        formlyWarn(
          'formly-form-has-no-formcontroller',
          'Your formly-form does not have a `form` property. Many functions of the form (like validation) may not work',
          el,
          scope
        )
      }
    }

    /*
     * chrome autocomplete lameness
     * see https://code.google.com/p/chromium/issues/detail?id=468153#c14
     * ლ(ಠ益ಠლ)   (╯°□°)╯︵ ┻━┻    (◞‸◟；)
     */
    function fixChromeAutocomplete() {
      const global = formlyConfig.extras.removeChromeAutoComplete === true
      const offInstance = scope.options && scope.options.removeChromeAutoComplete === false
      const onInstance = scope.options && scope.options.removeChromeAutoComplete === true
      if ((global && !offInstance) || onInstance) {
        const input = document.createElement('input')
        input.setAttribute('autocomplete', 'address-level4')
        input.setAttribute('hidden', 'true')
        el[0].appendChild(input)
      }

    }
  }


  // stateless util functions
  function toKebabCase(string) {
    if (string) {
      return string.replace(/([A-Z])/g, $1 => '-' + $1.toLowerCase())
    } else {
      return ''
    }
  }

}
