import angular from 'angular-fix'
import {contains} from '../other/utils'

export default addFormlyNgModelAttrsManipulator

// @ngInject
function addFormlyNgModelAttrsManipulator(formlyConfig, $interpolate) {
  if (formlyConfig.extras.disableNgModelAttrsManipulator) {
    return
  }
  formlyConfig.templateManipulators.preWrapper.push(ngModelAttrsManipulator)


  function ngModelAttrsManipulator(template, options, scope) {
    const node = document.createElement('div')
    const skip = options.extras && options.extras.skipNgModelAttrsManipulator
    if (skip === true) {
      return template
    }
    node.innerHTML = template

    const modelNodes = getNgModelNodes(node, skip)
    if (!modelNodes || !modelNodes.length) {
      return template
    }

    addIfNotPresent(modelNodes, 'id', scope.id)
    addIfNotPresent(modelNodes, 'name', scope.name || scope.id)

    addValidation()
    alterNgModelAttr()
    addModelOptions()
    addTemplateOptionsAttrs()
    addNgModelElAttrs()


    return node.innerHTML


    function addValidation() {
      if (angular.isDefined(options.validators) || angular.isDefined(options.validation.messages)) {
        addIfNotPresent(modelNodes, 'formly-custom-validation', '')
      }
    }

    function alterNgModelAttr() {
      if (isPropertyAccessor(options.key)) {
        addRegardlessOfPresence(modelNodes, 'ng-model', 'model.' + options.key)
      }
    }

    function addModelOptions() {
      if (angular.isDefined(options.modelOptions)) {
        addIfNotPresent(modelNodes, 'ng-model-options', 'options.modelOptions')
        if (options.modelOptions.getterSetter) {
          addRegardlessOfPresence(modelNodes, 'ng-model', 'options.value')
        }
      }
    }

    function addTemplateOptionsAttrs() {
      if (!options.templateOptions && !options.expressionProperties) {
        // no need to run these if there are no templateOptions or expressionProperties
        return
      }
      const to = options.templateOptions || {}
      const ep = options.expressionProperties || {}

      const ngModelAttributes = getBuiltInAttributes()

      // extend with the user's specifications winning
      angular.extend(ngModelAttributes, options.ngModelAttrs)

      // Feel free to make this more simple :-)
      angular.forEach(ngModelAttributes, (val, name) => {
        /* eslint complexity:[2, 14] */
        let attrVal, attrName
        const ref = `options.templateOptions['${name}']`
        const toVal = to[name]
        const epVal = getEpValue(ep, name)

        const inTo = angular.isDefined(toVal)
        const inEp = angular.isDefined(epVal)
        if (val.value) {
          // I realize this looks backwards, but it's right, trust me...
          attrName = val.value
          attrVal = name
        } else if (val.statement && inTo) {
          attrName = val.statement
          if (angular.isString(to[name])) {
            attrVal = `$eval(${ref})`
          } else if (angular.isFunction(to[name])) {
            attrVal = `${ref}(model[options.key], options, this, $event)`
          } else {
            throw new Error(
              `options.templateOptions.${name} must be a string or function: ${JSON.stringify(options)}`
            )
          }
        } else if (val.bound && inEp) {
          attrName = val.bound
          attrVal = ref
        } else if ((val.attribute || val.boolean) && inEp) {
          attrName = val.attribute || val.boolean
          attrVal = `${$interpolate.startSymbol()}${ref}${$interpolate.endSymbol()}`
        } else if (val.attribute && inTo) {
          attrName = val.attribute
          attrVal = toVal
        } else if (val.boolean) {
          if (inTo && !inEp && toVal) {
            attrName = val.boolean
            attrVal = true
          } else {
            /* eslint no-empty:0 */
            // empty to illustrate that a boolean will not be added via val.bound
            // if you want it added via val.bound, then put it in expressionProperties
          }
        } else if (val.bound && inTo) {
          attrName = val.bound
          attrVal = ref
        }

        if (angular.isDefined(attrName) && angular.isDefined(attrVal)) {
          addIfNotPresent(modelNodes, attrName, attrVal)
        }
      })
    }

    function addNgModelElAttrs() {
      angular.forEach(options.ngModelElAttrs, (val, name) => {
        addRegardlessOfPresence(modelNodes, name, val)
      })
    }
  }

  // Utility functions
  function getNgModelNodes(node, skip) {
    const selectorNot = angular.isString(skip) ? `:not(${skip})` : ''
    const skipNot = ':not([formly-skip-ng-model-attrs-manipulator])'
    const query = `[ng-model]${selectorNot}${skipNot}, [data-ng-model]${selectorNot}${skipNot}`
    try {
      return node.querySelectorAll(query)
    } catch (e) {
      //this code is needed for IE8, as it does not support the CSS3 ':not' selector
      //it should be removed when IE8 support is dropped
      return getNgModelNodesFallback(node, skip)
    }
  }

  function getNgModelNodesFallback(node, skip) {
    const allNgModelNodes = node.querySelectorAll('[ng-model], [data-ng-model]')
    const matchingNgModelNodes = []

    //make sure this array is compatible with NodeList type by adding an 'item' function
    matchingNgModelNodes.item = function(i) {
      return this[i]
    }

    for (let i = 0; i < allNgModelNodes.length; i++) {
      const ngModelNode = allNgModelNodes[i]
      if (!ngModelNode.hasAttribute('formly-skip-ng-model-attrs-manipulator') &&
        !(angular.isString(skip) && nodeMatches(ngModelNode, skip))) {
        matchingNgModelNodes.push(ngModelNode)
      }
    }

    return matchingNgModelNodes
  }

  function nodeMatches(node, selector) {
    const div = document.createElement('div')
    div.innerHTML = node.outerHTML
    return div.querySelector(selector)
  }

  function getBuiltInAttributes() {
    const ngModelAttributes = {
      focus: {
        attribute: 'formly-focus',
      },
    }
    const boundOnly = []
    const bothBooleanAndBound = ['required', 'disabled']
    const bothAttributeAndBound = ['pattern', 'minlength']
    const statementOnly = ['change', 'keydown', 'keyup', 'keypress', 'click', 'focus', 'blur']
    const attributeOnly = ['placeholder', 'min', 'max', 'step', 'tabindex', 'type']
    if (formlyConfig.extras.ngModelAttrsManipulatorPreferUnbound) {
      bothAttributeAndBound.push('maxlength')
    } else {
      boundOnly.push('maxlength')
    }

    angular.forEach(boundOnly, item => {
      ngModelAttributes[item] = {bound: 'ng-' + item}
    })

    angular.forEach(bothBooleanAndBound, item => {
      ngModelAttributes[item] = {boolean: item, bound: 'ng-' + item}
    })

    angular.forEach(bothAttributeAndBound, item => {
      ngModelAttributes[item] = {attribute: item, bound: 'ng-' + item}
    })

    angular.forEach(statementOnly, item => {
      const propName = 'on' + item.substr(0, 1).toUpperCase() + item.substr(1)
      ngModelAttributes[propName] = {statement: 'ng-' + item}
    })

    angular.forEach(attributeOnly, item => {
      ngModelAttributes[item] = {attribute: item}
    })
    return ngModelAttributes
  }

  function getEpValue(ep, name) {
    return ep['templateOptions.' + name] ||
      ep[`templateOptions['${name}']`] ||
      ep[`templateOptions["${name}"]`]
  }

  function addIfNotPresent(nodes, attr, val) {
    angular.forEach(nodes, node => {
      if (!node.getAttribute(attr)) {
        node.setAttribute(attr, val)
      }
    })
  }

  function addRegardlessOfPresence(nodes, attr, val) {
    angular.forEach(nodes, node => {
      node.setAttribute(attr, val)
    })
  }

  function isPropertyAccessor(key) {
    return contains(key, '.') || (contains(key, '[') && contains(key, ']'))
  }
}
