import angular from 'angular-fix';

export default addFormlyNgModelAttrsManipulator;

// @ngInject
function addFormlyNgModelAttrsManipulator(formlyConfig, $interpolate) {
  if (formlyConfig.extras.disableNgModelAttrsManipulator) {
    return;
  }
  formlyConfig.templateManipulators.preWrapper.push(ngModelAttrsManipulator);


  function ngModelAttrsManipulator(template, options, scope) {
    const node = document.createElement('div');
    const data = options.data;
    if (data.skipNgModelAttrsManipulator === true) {
      return template;
    }

    node.innerHTML = template;

    const modelNodes = getNgModelNodes(node, data.skipNgModelAttrsManipulator);
    if (!modelNodes || !modelNodes.length) {
      return template;
    }

    addIfNotPresent(modelNodes, 'id', scope.id);
    addIfNotPresent(modelNodes, 'name', scope.name || scope.id);

    addValidation();
    addModelOptions();
    addTemplateOptionsAttrs();


    return node.innerHTML;


    function addValidation() {
      if (angular.isDefined(options.validators) || angular.isDefined(options.validation.messages)) {
        addIfNotPresent(modelNodes, 'formly-custom-validation', '');
      }
    }

    function addModelOptions() {
      if (angular.isDefined(options.modelOptions)) {
        addIfNotPresent(modelNodes, 'ng-model-options', 'options.modelOptions');
        if (options.modelOptions.getterSetter) {
          angular.forEach(modelNodes, modelNode => {
            modelNode.setAttribute('ng-model', 'options.value');
          });
        }
      }
    }

    function addTemplateOptionsAttrs() {
      if (!options.templateOptions && !options.expressionProperties) {
        // no need to run these if there are no templateOptions or expressionProperties
        return;
      }
      const to = options.templateOptions || {};
      const ep = options.expressionProperties || {};

      const ngModelAttributes = getBuiltInAttributes();

      // extend with the user's specifications winning
      angular.extend(ngModelAttributes, options.ngModelAttrs);

      // Feel free to make this more simple :-)
      angular.forEach(ngModelAttributes, (val, name) => {
        /* eslint complexity:[2, 14] */
        let attrVal, attrName;
        const ref = `options.templateOptions['${name}']`;
        const toVal = to[name];
        const epVal = getEpValue(ep, name);

        const inTo = angular.isDefined(toVal);
        const inEp = angular.isDefined(epVal);
        if (val.value) {
          // I realize this looks backwards, but it's right, trust me...
          attrName = val.value;
          attrVal = name;
        } else if (val.expression && inTo) {
          attrName = val.expression;
          if (angular.isString(to[name])) {
            attrVal = `$eval(${ref})`;
          } else if (angular.isFunction(to[name])) {
            attrVal = `${ref}(model[options.key], options, this, $event)`;
          } else {
            throw new Error(
              `options.templateOptions.${name} must be a string or function: ${JSON.stringify(options)}`
            );
          }
        } else if (val.bound && inEp) {
          attrName = val.bound;
          attrVal = ref;
        } else if ((val.attribute || val.boolean) && inEp) {
          attrName = val.attribute || val.boolean;
          attrVal = `${$interpolate.startSymbol()}${ref}${$interpolate.endSymbol()}`;
        } else if (val.attribute && inTo) {
          attrName = val.attribute;
          attrVal = toVal;
        } else if (val.boolean) {
          if (inTo && !inEp && toVal) {
            attrName = val.boolean;
            attrVal = true;
          } else {
            /* eslint no-empty:0 */
            // empty to illustrate that a boolean will not be added via val.bound
            // if you want it added via val.bound, then put it in expressionProperties
          }
        } else if (val.bound && inTo) {
          attrName = val.bound;
          attrVal = ref;
        }

        if (angular.isDefined(attrName) && angular.isDefined(attrVal)) {
          addIfNotPresent(modelNodes, attrName, attrVal);
        }
      });
    }
  }

  // Utility functions
  function getNgModelNodes(node, skip) {
    const selectorNot = angular.isString(skip) ? `:not(${skip})` : '';
    const skipNot = ':not([formly-skip-ng-model-attrs-manipulator])';
    const query = `[ng-model]${selectorNot}${skipNot}, [data-ng-model]${selectorNot}${skipNot}`;
    return node.querySelectorAll(query);
  }

  function getBuiltInAttributes() {
    const ngModelAttributes = {
      focus: {
        attribute: 'formly-focus'
      }
    };
    const boundOnly = [];
    const bothBooleanAndBound = ['required', 'disabled'];
    const bothAttributeAndBound = ['pattern', 'minlength'];
    const expressionOnly = ['change', 'keydown', 'keyup', 'keypress', 'click', 'focus', 'blur'];
    const attributeOnly = ['placeholder', 'min', 'max', 'tabindex', 'type'];
    if (formlyConfig.extras.ngModelAttrsManipulatorPreferUnbound) {
      bothAttributeAndBound.push('maxlength');
    } else {
      boundOnly.push('maxlength');
    }

    angular.forEach(boundOnly, item => {
      ngModelAttributes[item] = {bound: 'ng-' + item};
    });

    angular.forEach(bothBooleanAndBound, item => {
      ngModelAttributes[item] = {boolean: item, bound: 'ng-' + item};
    });

    angular.forEach(bothAttributeAndBound, item => {
      ngModelAttributes[item] = {attribute: item, bound: 'ng-' + item};
    });

    angular.forEach(expressionOnly, item => {
      const propName = 'on' + item.substr(0, 1).toUpperCase() + item.substr(1);
      ngModelAttributes[propName] = {expression: 'ng-' + item};
    });

    angular.forEach(attributeOnly, item => {
      ngModelAttributes[item] = {attribute: item};
    });
    return ngModelAttributes;
  }

  function getEpValue(ep, name) {
    return ep['templateOptions.' + name] ||
      ep[`templateOptions['${name}']`] ||
      ep[`templateOptions["${name}"]`];
  }

  function addIfNotPresent(nodes, attr, val) {
    angular.forEach(nodes, node => {
      if (!node.getAttribute(attr)) {
        node.setAttribute(attr, val);
      }
    });
  }
}
