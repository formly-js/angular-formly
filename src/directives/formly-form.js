import angular from 'angular-fix';

/**
 * @ngdoc directive
 * @name formlyForm
 * @restrict E
 */
export default function formlyForm(formlyUsability, $parse, formlyApiCheck, formlyConfig) {
  var currentFormId = 1;
  var optionsApi = [
    formlyApiCheck.shape({
      formState: formlyApiCheck.object.optional,
      resetModel: formlyApiCheck.func.optional,
      updateInitialValue: formlyApiCheck.func.optional,
      removeChromeAutoComplete: formlyApiCheck.bool.optional
    }).strict.optional
  ];
  return {
    restrict: 'E',
    template: function(el, attrs) {
      /* jshint -W033 */ // this because jshint is broken I guess...
      const rootEl = attrs.rootEl || 'ng-form';
      const formName = `formly_${currentFormId++}`;
      return `
        <${rootEl} class="formly"
                 name="${formName}"
                 role="form">
          <div formly-field
               ng-repeat="field in fields track by $index"
               ng-if="!field.hide"
               class="formly-field {{field.type ? 'formly-field-' + field.type : ''}}"
               options="field"
               model="field.model || model"
               fields="fields"
               form="${formName}"
               form-id="${formName}"
               form-state="options.formState"
               index="$index">
          </div>
          <div ng-transclude></div>
        </${rootEl}>
      `;
    },
    replace: true,
    transclude: true,
    scope: {
      fields: '=',
      model: '=',
      form: '=?',
      options: '=?'
    },
    controller: function($scope) {
      setupOptions();
      $scope.model = $scope.model || {};
      $scope.fields = $scope.fields || [];

      angular.forEach($scope.fields, attachKey); // attaches a key based on the index if a key isn't specified
      angular.forEach($scope.fields, setupWatchers); // setup watchers for all fields

      // watch the model and evaluate watch expressions that depend on it.
      $scope.$watch('model', function onResultUpdate(newResult) {
        angular.forEach($scope.fields, function(field) {
          /*jshint -W030 */
          field.runExpressions && field.runExpressions(newResult);
        });
      }, true);

      function setupOptions() {
        formlyApiCheck.throw(optionsApi, [$scope.options], {prefix: 'formly-form options check'});
        $scope.options = $scope.options || {};
        $scope.options.formState = $scope.options.formState || {};

        angular.extend($scope.options, {
          updateInitialValue,
          resetModel
        });

      }

      function updateInitialValue() {
        angular.forEach($scope.fields, field => field.updateInitialValue());
      }

      function resetModel() {
        angular.forEach($scope.fields, field => field.resetModel());
      }

      function attachKey(field, index) {
        field.key = field.key || index || 0;
      }

      function setupWatchers(field, index) {
        if (!angular.isDefined(field.watcher)) {
          return;
        }
        var watchers = field.watcher;
        if (!angular.isArray(watchers)) {
          watchers = [watchers];
        }
        angular.forEach(watchers, function(watcher) {
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
    },
    link(scope, el, attrs) {
      if (attrs.form) {
        const formId = attrs.name;
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
