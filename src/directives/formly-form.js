import angular from 'angular-fix';

export default formlyForm;

/**
 * @ngdoc directive
 * @name formlyForm
 * @restrict E
 */
// @ngInject
function formlyForm(formlyUsability, $parse, formlyApiCheck, formlyConfig) {
  var currentFormId = 1;
  return {
    restrict: 'E',
    template: function formlyFormGetTemplate(el, attrs) {
      /* jshint -W033 */ // this because jshint is broken I guess...
      const rootEl = getRootEl();
      const fieldRootEl = getFieldRootEl();
      const formId = `formly_${currentFormId++}`;
      let parentFormAttributes;
      if (attrs.hasOwnProperty('isFieldGroup') && el.parent().parent().hasClass('formly')) {
        parentFormAttributes = copyAttributes(el.parent().parent()[0].attributes);
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
               fields="fields"
               form="${formId}"
               form-id="${formId}"
               form-state="options.formState"
               index="$index">
          </${fieldRootEl}>
          <div ng-transclude></div>
        </${rootEl}>
      `;

      function getRootEl() {
        return attrs.rootEl || 'ng-form';
      }

      function getFieldRootEl() {
        return attrs.fieldRootEl || 'div';
      }

      function getHideDirective() {
        return attrs.hideDirective || formlyConfig.extras.defaultHideDirective || 'ng-if';
      }

      function getTrackBy() {
        if (!attrs.trackBy) {
          return '';
        } else {
          return `track by ${attrs.trackBy}`;
        }
      }

      function getFormName() {
        let formName = formId;
        const bindName = attrs.bindName;
        if (bindName) {
          if (angular.version.minor < 3) {
            throw formlyUsability.getFormlyError('bind-name attribute on formly-form not allowed in > angular 1.3');
          }
          // we can do a one-time binding here because we know we're in 1.3.x territory
          formName = `{{::'formly_' + ${bindName}}}`;
        }
        return formName;
      }

      function copyAttributes(attributes) {
        const excluded = ['model', 'form', 'fields', 'options', 'name', 'role', 'class'];
        const arrayAttrs = [];
        angular.forEach(attributes, ({nodeName, nodeValue}) => {
          if (nodeName !== 'undefined' && excluded.indexOf(nodeName) === -1) {
            arrayAttrs.push(`${toKebabCase(nodeName)}="${nodeValue}"`);
          }
        });
        return arrayAttrs.join(' ');
      }

      function toKebabCase(string) {
        if (string) {
          return string.replace(/([A-Z])/g, $1 => '-' + $1.toLowerCase());
        } else {
          return '';
        }
      }
    },
    replace: true,
    transclude: true,
    scope: {
      fields: '=',
      model: '=',
      form: '=?',
      options: '=?'
    },
    controller: /* @ngInject */ function FormlyFormController($scope, formlyUtil) {
      setupOptions();
      $scope.model = $scope.model || {};
      $scope.fields = $scope.fields || [];

      angular.forEach($scope.fields, attachKey); // attaches a key based on the index if a key isn't specified
      angular.forEach($scope.fields, setupWatchers); // setup watchers for all fields

      // watch the model and evaluate watch expressions that depend on it.
      $scope.$watch('model', onModelOrFormStateChange, true);
      if ($scope.options.formState) {
        $scope.$watch('options.formState', onModelOrFormStateChange, true);
      }

      function onModelOrFormStateChange() {
        angular.forEach($scope.fields, function runFieldExpressionProperties(field, index) {
          /*jshint -W030 */
          const model = field.model || $scope.model;
          field.runExpressions && field.runExpressions(model);
          if (field.hideExpression) { // can't use hide with expressionProperties reliably
            const val = model[field.key];
            // this makes it closer to what a regular expressionProperty would be
            const extraLocals = {
              options: field,
              index: index,
              formState: $scope.options.formState,
              formId: $scope.formId
            };
            field.hide = formlyUtil.formlyEval($scope, field.hideExpression, val, val, extraLocals);
          }
        });
      }

      function setupOptions() {
        formlyApiCheck.throw(
          [formlyApiCheck.formOptionsApi.optional], [$scope.options], {prefix: 'formly-form options check'}
        );
        $scope.options = $scope.options || {};
        $scope.options.formState = $scope.options.formState || {};

        angular.extend($scope.options, {
          updateInitialValue,
          resetModel
        });

      }

      function updateInitialValue() {
        angular.forEach($scope.fields, field => {
          if (isFieldGroup(field)) {
            field.options.updateInitialValue();
          } else {
            field.updateInitialValue();
          }
        });
      }

      function resetModel() {
        angular.forEach($scope.fields, field => {
          if (isFieldGroup(field)) {
            field.options.resetModel();
          } else {
            field.resetModel();
          }
        });
      }

      function attachKey(field, index) {
        if (!isFieldGroup(field)) {
          field.key = field.key || index || 0;
        }
      }

      function setupWatchers(field, index) {
        if (isFieldGroup(field) || !angular.isDefined(field.watcher)) {
          return;
        }
        var watchers = field.watcher;
        if (!angular.isArray(watchers)) {
          watchers = [watchers];
        }
        angular.forEach(watchers, function setupWatcher(watcher) {
          if (!angular.isDefined(watcher.listener)) {
            throw formlyUsability.getFieldError(
              'all-field-watchers-must-have-a-listener',
              'All field watchers must have a listener', field
            );
          }
          var watchExpression = getWatchExpression(watcher, field, index);
          var watchListener = getWatchListener(watcher, field, index);

          var type = watcher.type || '$watch';
          watcher.stopWatching = $scope[type](watchExpression, watchListener, watcher.watchDeep);
        });
      }

      function getWatchExpression(watcher, field, index) {
        var watchExpression = watcher.expression || `model['${field.key}']`;
        if (angular.isFunction(watchExpression)) {
          // wrap the field's watch expression so we can call it with the field as the first arg
          // and the stop function as the last arg as a helper
          var originalExpression = watchExpression;
          watchExpression = function formlyWatchExpression() {
            var args = modifyArgs(watcher, index, ...arguments);
            return originalExpression(...args);
          };
          watchExpression.displayName = `Formly Watch Expression for field for ${field.key}`;
        }
        return watchExpression;
      }

      function getWatchListener(watcher, field, index) {
        var watchListener = watcher.listener;
        if (angular.isFunction(watchListener)) {
          // wrap the field's watch listener so we can call it with the field as the first arg
          // and the stop function as the last arg as a helper
          var originalListener = watchListener;
          watchListener = function formlyWatchListener() {
            var args = modifyArgs(watcher, index, ...arguments);
            return originalListener(...args);
          };
          watchListener.displayName = `Formly Watch Listener for field for ${field.key}`;
        }
        return watchListener;
      }

      function modifyArgs(watcher, index, ...originalArgs) {
        return [$scope.fields[index], ...originalArgs, watcher.stopWatching];
      }

      function isFieldGroup(field) {
        return field && !!field.fieldGroup;
      }
    },
    link(scope, el, attrs) {
      const formId = attrs.name;
      scope.formId = formId;
      if (attrs.form) {
        $parse(attrs.form).assign(scope.$parent, scope[formId]);
      }

      // chrome autocomplete lameness
      // see https://code.google.com/p/chromium/issues/detail?id=468153#c14
      // ლ(ಠ益ಠლ)   (╯°□°)╯︵ ┻━┻    (◞‸◟；)
      const global = formlyConfig.extras.removeChromeAutoComplete === true;
      const offInstance = scope.options && scope.options.removeChromeAutoComplete === false;
      const onInstance = scope.options && scope.options.removeChromeAutoComplete === true;
      if ((global && !offInstance) || onInstance) {
        const input = document.createElement('input');
        input.setAttribute('autocomplete', 'address-level4');
        input.setAttribute('hidden', true);
        el[0].appendChild(input);
      }
    }
  };
}
