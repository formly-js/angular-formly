module.exports = ngModule => {
  ngModule.run(addFormlyNgModelAttrsManipulator);

  function addFormlyNgModelAttrsManipulator(formlyConfig) {
    if (formlyConfig.extras.disableNgModelAttrsManipulator) {
      return;
    }
    formlyConfig.templateManipulators.preWrapper.push(ngModelAttrsManipulator);


    function ngModelAttrsManipulator(template, options, scope) {
      /* jshint maxcomplexity:7 */
      var el = angular.element('<a></a>');
      var data = options.data;
      if (data.noTouchy) {
        return template;
      }
      el.append(template);
      var modelEls = angular.element(el[0].querySelectorAll('[ng-model]'));
      if (!modelEls || !modelEls.length) {
        return template;
      }

      addIfNotPresent(modelEls, 'id', scope.id);
      addIfNotPresent(modelEls, 'name', scope.id);

      if (angular.isDefined(options.validators)) {
        addIfNotPresent(modelEls, 'formly-custom-validation', 'options.validators');
      }
      if (angular.isDefined(options.modelOptions)) {
        addIfNotPresent(modelEls, 'ng-model-options', 'options.modelOptions');
        if (options.modelOptions.getterSetter) {
          modelEls.attr('ng-model', 'options.value');
        }
      }
      addTemplateOptionsAttrs();

      return el.html();


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
            addIfNotPresent(modelEls, attrName, attrVal);
          }
        });
      }

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

      function addIfNotPresent(el, attr, val) {
        if (!el.attr(attr)) {
          el.attr(attr, val);
        }
      }
    }
  }
};
