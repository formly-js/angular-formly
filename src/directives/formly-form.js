angular.module('formly.render')
.directive('formlyForm', function formlyForm() {
	'use strict';
	return {
		restrict: 'E',
		templateUrl: 'directives/formly-form.html',
		replace: true,
		transclude: true,
		scope: {
			fields: '=',
			options: '=?',
			result: '=',
			formOnParentScope: '=name'
		},
		compile: function () {
			return {
				post: function (scope, ele, attr) {
					//Post gets called after angular has created the FormController
					//Now pass the FormController back up to the parent scope
					scope.formOnParentScope = scope[attr.name];
				}
			};
		},
		controller: function($scope, $timeout, formlyUtil, $interval) {
			
			angular.forEach($scope.fields, setupWatchers); // setup watchers for all fields

			// watch the result and evaluate watch expressions that depend on it.
			$scope.$watch('result', function onResultUpdate(newResult) {
				angular.forEach($scope.fields, function(field) {
					/*jshint -W030 */
					field.runExpressions && field.runExpressions(newResult);
				});
			}, true);

			// listen for formly-dynamic-name fields to notify that the field name has been set and angular has put the field on the form
			$scope.$on('formly-dynamic-name-update', function(e) {
				e.stopPropagation();
				if (!$scope.formOnParentScope) {
					return;
				}
				$timeout(function() {
					angular.forEach($scope.fields, function(field) {
						var formField = $scope.formOnParentScope[field.key];
						if (formField) {
							field.formField = formField;
						}
					});
				}); // next tick, give angular an event loop to finish compiling
			});

			function setupWatchers(field, index) {
				if (!field.hasOwnProperty('watch') || !angular.isDefined(field.watch)) {
					// must check for own property because of this:
					// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/watch
					// (－‸ლ)   <-- yes, that's a face palm...
					return;
				}
				var watchers = field.watch;
				if (!angular.isArray(watchers)) {
					watchers = [watchers];
				}
				angular.forEach(watchers, function(watcher) {
					var stopWatching;
					if (!angular.isDefined(watcher.listener)) {
						formlyUtil.throwErrorWithField('All field watchers must have a listener', field);
					}
					var watchExpression = watcher.expression || 'result["' + field.key + '" || ' + index + ']';
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