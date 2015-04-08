module.exports = ngModule => {
  ngModule.run(addFormlyNgModelAttrsManipulator);

  function addFormlyNgModelAttrsManipulator(formlyConfig, formlyUsability) {
    if (formlyConfig.extras.disableNgModelAttrsManipulator) {
      return;
    }
    formlyConfig.templateManipulators.preWrapper.push(ngModelAttrsManipulator);


    function ngModelAttrsManipulator(template, options, scope) {
      /* jshint maxcomplexity:6 */
      var el = document.createElement('div');
      var data = options.data;
      if (data.noTouchy) {
        formlyUsability.getFormlyError(
          'data.noTouchy is going to be removed in an upcoming release. This was an awful name to begin with. ' +
          'Please use `data.skipNgModelAttrsManipulator = true` instead.'
        );
      }
      if (data.noTouchy || (data.skipNgModelAttrsManipulator === true)) {
        return template;
      }
      el.innerHTML = template;
      var modelNodes = el.querySelectorAll('[ng-model]');
      if (!modelNodes || !modelNodes.length) {
        return template;
      }

      addIfNotPresent(modelNodes, 'id', scope.id);
      addIfNotPresent(modelNodes, 'name', scope.id);

      addValidation();
      addModelOptions();
      addTemplateOptionsAttrs();


      return el.innerHTML;


      function addValidation() {
        if (angular.isDefined(options.validators) || angular.isDefined(options.validation.messages)) {
          addIfNotPresent(modelNodes, 'formly-custom-validation', '');
        }
      }

      function addModelOptions() {
        if (angular.isDefined(options.modelOptions)) {
          addIfNotPresent(modelNodes, 'ng-model-options', 'options.modelOptions');
          if (options.modelOptions.getterSetter) {
            modelNodes.attr('ng-model', 'options.value');
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

        let ngModelAttributes = getBuiltinAttributes();

        // extend with the user's specifications winning
        angular.extend(ngModelAttributes, options.ngModelAttrs);

        angular.forEach(ngModelAttributes, (val, name) => {
          /* jshint maxcomplexity:10 */
          let attrVal;
          let attrName;
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
          } else if (val.attribute && inEp) {
            attrName = val.attribute;
            attrVal = `{{${ref}}}`;
          } else if (val.attribute && inTo) {
            attrName = val.attribute;
            attrVal = toVal;
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
    function getBuiltinAttributes() {
      let ngModelAttributes = {
        focus: {
          attribute: 'formly-focus'
        }
      };
      const boundOnly = [];
      const bothAttributeAndBound = ['required', 'disabled', 'pattern', 'minlength'];
      const expressionOnly = ['change', 'keydown', 'keyup', 'keypress', 'click', 'focus', 'blur'];
      const attributeOnly = ['placeholder', 'min', 'max', 'tabindex', 'type'];
      if (formlyConfig.extras.ngModelAttrsManipulatorPreferBound) {
        boundOnly.push('maxlength');
      } else {
        bothAttributeAndBound.push('maxlength');
      }

      angular.forEach(boundOnly, item => {
        ngModelAttributes[item] = {bound: 'ng-' + item};
      });

      angular.forEach(bothAttributeAndBound, item => {
        ngModelAttributes[item] = {attribute: item, bound: 'ng-' + item};
      });

      angular.forEach(expressionOnly, item => {
        var propName = 'on' + item.substr(0, 1).toUpperCase() + item.substr(1);
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
};
