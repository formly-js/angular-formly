module.exports = ngModule => {
  ngModule.run(addFormlyNgModelAttrsManipulator);

  function addFormlyNgModelAttrsManipulator(formlyConfig) {
    if (formlyConfig.extras.disableNgModelAttrsManipulator) {
      return;
    }
    formlyConfig.templateManipulators.preWrapper.push(ngModelAttrsManipulator);
  }


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
    addNgModelAttrs(options.ngModelAttrs);

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
      // if the field has specified values for these, then we want to add the attributes and watch them for changes.
      var boundAttributes = angular.extend(data.ngModelBoundAttributes || {}, {
        'ng-disabled': 'disabled',
        'ng-required': 'required',
        'ng-pattern': 'pattern',
        'ng-maxlength': 'maxlength',
        'ng-minlength': 'minlength'
      });
      var invokedAttributes = angular.extend(data.ngModelInvokedAttributes || {}, {
        'ng-change': 'onChange',
        'ng-keydown': 'onKeydown',
        'ng-keyup': 'onKeyup',
        'ng-keypress': 'onKeypress',
        'ng-click': 'onClick',
        'ng-focus': 'onFocus',
        'ng-blur': 'onBlur'
      });
      // attributes are wrapped in curly braces
      var attributes = angular.extend(data.ngModelAttributes || {}, {
        'formly-focus': 'focus',
        placeholder: 'placeholder',
        min: 'min',
        max: 'max',
        tabindex: 'tabindex',
        type: 'type'
      });

      addDefinedAttributes(modelEls, boundAttributes, options);
      addDefinedAttributes(modelEls, attributes, options, '{{', '}}');
      addDefinedAttributes(modelEls, invokedAttributes, options,
        (val) => angular.isString(val) ? '$eval(' : '',
        (val) => angular.isString(val) ? ')' : '(model[options.key], options, this, $event)'
      );
    }

    function addNgModelAttrs(ngModelAttrs) {
      ngModelAttrs = ngModelAttrs || {};
      angular.forEach(ngModelAttrs.bound, function(val, attr) {
        addIfNotPresent(modelEls, attr, `options.ngModelAttrs.bound['${attr}']`);
      });
      angular.forEach(ngModelAttrs.unbound, function(val, attr) {
        addIfNotPresent(modelEls, attr, scope.$eval(val));
      });
    }

    function addDefinedAttributes(els, attrs, options, prefix = '', suffix = '') {
      /* jshint maxcomplexity:6 */
      var to = options.templateOptions;
      var ep = options.expressionProperties;
      if (!to && !ep) {
        return; // no reason to iterate if these don't exist...
      } else {
        to = to || {};
        ep = ep || {};
      }
      angular.forEach(attrs, (val, attrName) => {
        // if it's defined as a property on template options, or if it's an expression property,
        // then we'll add the attribute (and hence the watchers)
        if (angular.isDefined(to[val]) || angular.isDefined(ep['templateOptions.' + val])) {
          var valPrefix = angular.isFunction(prefix) ? prefix(val) : prefix;
          var valSuffix = angular.isFunction(suffix) ? suffix(val) : suffix;
          addIfNotPresent(els, `${attrName}`, `${valPrefix}options.templateOptions['${val}']${valSuffix}`);
        }
      });
    }

    function addIfNotPresent(el, attr, val) {
      if (!el.attr(attr)) {
        el.attr(attr, val);
      }
    }
  }
};
