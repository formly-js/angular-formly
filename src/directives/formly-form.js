angular.module('formly.render')
.directive('formlyForm', function formlyForm() {
	'use strict';
	var currentFormId = 1;
	return {
		restrict: 'E',
		templateUrl: 'directives/formly-form.html',
		replace: true,
		transclude: true,
		scope: {
			fields: '=',
			model: '=',
			form: '=?'
		},
		controller: function($scope, formlyUtil) {
			$scope.formId = 'formly_' + currentFormId++;
			
			angular.forEach($scope.fields, setupWatchers); // setup watchers for all fields

			// watch the model and evaluate watch expressions that depend on it.
			$scope.$watch('model', function onResultUpdate(newResult) {
				angular.forEach($scope.fields, function(field) {
					/*jshint -W030 */
					field.runExpressions && field.runExpressions(newResult);
				});
			}, true);

			function setupWatchers(field, index) {
				if (!angular.isDefined(field.watcher)) {
					return;
				}
				var watchers = field.watcher;
				if (!angular.isArray(watchers)) {
					watchers = [watchers];
				}
				angular.forEach(watchers, function(watcher) {
					var stopWatching;
					if (!angular.isDefined(watcher.listener)) {
						formlyUtil.throwErrorWithField('All field watchers must have a listener', field);
					}
					var watchExpression = watcher.expression || 'model["' + field.key + '" || ' + index + ']';
					if (angular.isFunction(watchExpression)) {
						// wrap the field's watch expression so we can call it with the field as the first arg and the stop function as the last arg as a helper
						var originalExpression = watchExpression;
						watchExpression = function formlyWatchExpression() {
							var args = Array.prototype.slice.call(arguments, 0);
							args.unshift($scope.fields[index]); // don't just use field here to ensure that we've got the right field reference
							args.push(stopWatching);
							return originalExpression.apply(this, args);
						};
						watchExpression.displayName = 'Formly Watch Expression for field for ' + field.key;
					}
					var watchListener = watcher.listener;
					if (angular.isFunction(watchListener)) {
						// wrap the field's watch listener so we can call it with the field as the first arg and the stop function as the last arg as a helper
						var originalListener = watchListener;
						watchListener = function formlyWatchListener() {
							var args = Array.prototype.slice.call(arguments, 0);
							args.unshift($scope.fields[index]); // don't just use field here to ensure that we've got the right field reference
							args.push(stopWatching);
							return originalListener.apply(this, args);
						};
						watchListener.displayName = 'Formly Watch Listener for field for ' + field.key;
					}
					var type = watcher.type || '$watch';
					stopWatching = $scope[type](watchExpression, watchListener, watcher.watchDeep);
				});
			}
		}
	};
});