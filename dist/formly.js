// angular-formly version 2.0.1 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["angularFormlyModuleName"] = factory(require("angular"));
	else
		root["angularFormlyModuleName"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var moduleName = module.exports = "formly";
	var angular = __webpack_require__(1);
	var ngModule = angular.module(moduleName, []);
	
	__webpack_require__(2)(ngModule);
	__webpack_require__(3)(ngModule);
	__webpack_require__(4)(ngModule);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// some versions of angular don't export the angular module properly,
	// so we get it from window in this case.
	var angular = __webpack_require__(5);
	if (!angular.version) {
	  angular = window.angular;
	}
	module.exports = angular;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(6)(ngModule);
	  __webpack_require__(7)(ngModule);
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(8)(ngModule);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(9)(ngModule);
	  __webpack_require__(10)(ngModule);
	  __webpack_require__(11)(ngModule);
	  __webpack_require__(12)(ngModule);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.provider("formlyConfig", function () {
	    var setTemplateUrl = function (name, templateUrl) {
	      if (typeof name === "string") {
	        templateUrlMap[name] = templateUrl;
	      } else {
	        angular.forEach(name, function (templateUrl, name) {
	          setTemplateUrl(name, templateUrl);
	        });
	      }
	    };
	
	    var getTemplateUrl = function (type) {
	      return templateUrlMap[type];
	    };
	
	    var setTemplate = function (name, template) {
	      if (typeof name === "string") {
	        templateMap[name] = template;
	      } else {
	        angular.forEach(name, function (template, name) {
	          setTemplate(name, template);
	        });
	      }
	    };
	
	    var getTemplate = function (type) {
	      return templateMap[type];
	    };
	
	    var setTemplateWrapper = function (_ref) {
	      var name = _ref.name;
	      var template = _ref.template;
	      var isUrl = _ref.isUrl;
	      if (!template) {
	        template = name;
	        name = templateWrapperName;
	      }
	      templateWrappersMap[name] = { template: template, isUrl: isUrl };
	    };
	
	    var getTemplateWrapper = function (name) {
	      return templateWrappersMap[name || templateWrapperName];
	    };
	
	    var templateUrlMap = {};
	    var templateMap = {};
	    var templateWrappersMap = {};
	    var templateWrapperName = "default";
	
	    angular.extend(this, {
	      getTemplateUrl: getTemplateUrl,
	      setTemplateUrl: setTemplateUrl,
	      getTemplate: getTemplate,
	      setTemplate: setTemplate,
	      setTemplateWrapper: setTemplateWrapper,
	      getTemplateWrapper: getTemplateWrapper,
	      disableWarnings: false,
	      $get: function formlyConfig() {
	        return this;
	      }
	    });
	  });
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyVersion", ("2.0.1"));
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(1);
	
	module.exports = function (ngModule) {
	  ngModule.factory("formlyUtil", ["formlyConfig", function (formlyConfig) {
	    var getFieldError = function (message, field) {
	      return new Error("Formly Error: " + message + ". Field definition: " + angular.toJson(field));
	    };
	
	    var formlyEval = function (scope, expression, modelValue, viewValue) {
	      if (angular.isFunction(expression)) {
	        return expression(viewValue, modelValue, scope);
	      } else {
	        return scope.$eval(expression, {
	          $viewValue: viewValue,
	          $modelValue: modelValue
	        });
	      }
	    };
	
	    var warn = function () {
	      if (!formlyConfig.disableWarnings) {
	        var args = Array.prototype.slice.call(arguments);
	        args.unshift("Formly Warning:");
	        console.warn.apply(console, args);
	      }
	    };
	
	    var getFieldId = function (formId, options, index) {
	      var type = options.type;
	      if (!type && options.template) {
	        type = "template";
	      } else if (!type && options.templateUrl) {
	        type = "templateUrl";
	      }
	
	      return [formId, type, options.key, index].join("_");
	    };
	
	    return {
	      getFieldError: getFieldError,
	      formlyEval: formlyEval,
	      warn: warn,
	      getFieldId: getFieldId
	    };
	  }]);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyCustomValidation", ["formlyUtil", function (formlyUtil) {
	    return {
	      require: "ngModel",
	      link: function (scope, el, attrs, ctrl) {
	        var validators = scope.$eval(attrs.formlyCustomValidation);
	        if (!validators) {
	          return;
	        }
	
	        // setup watchers and parsers
	        var hasValidators = ctrl.hasOwnProperty("$validators");
	        angular.forEach(validators, function (validator, name) {
	          if (hasValidators) {
	            var validatorCollection = validator.isAsync ? "$asyncValidators" : "$validators";
	            ctrl[validatorCollection][name] = function (modelValue, viewValue) {
	              return formlyUtil.formlyEval(scope, validator, modelValue, viewValue);
	            };
	          } else {
	            ctrl.$parsers.unshift(function (viewValue) {
	              var isValid = formlyUtil.formlyEval(scope, validator, ctrl.$modelValue, viewValue);
	              ctrl.$setValidity(name, isValid);
	              return viewValue;
	            });
	          }
	        });
	      }
	    };
	  }]);
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyDynamicName", function formlyDynamicName() {
	    return {
	      restrict: "A",
	      priority: 599, // one after ngIf
	      controller: ["$scope", "$element", "$attrs", function ($scope, $element, $attrs) {
	        $element.removeAttr("formly-dynamic-name");
	        $attrs.$set("name", $scope.$eval($attrs.formlyDynamicName));
	        delete $attrs.formlyDynamicName;
	      }]
	    };
	  });
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(1);
	
	module.exports = function (ngModule) {
	  var formlyField = function ($http, $q, $compile, $templateCache, formlyConfig, formlyUtil) {
	    var getTemplate = function (options) {
	      var template = options.template || formlyConfig.getTemplate(options.type);
	      if (template) {
	        return $q.when(template);
	      } else {
	        var _ret = (function () {
	          var templateUrl = options.templateUrl || formlyConfig.getTemplateUrl(options.type);
	          var httpOptions = { cache: $templateCache };
	          return {
	            v: $http.get(templateUrl, httpOptions).then(function (response) {
	              return response.data;
	            })["catch"](function (error) {
	              formlyUtil.warn("Problem loading template for " + templateUrl, error);
	            })
	          };
	        })();
	
	        if (typeof _ret === "object") return _ret.v;
	      }
	    };
	
	    var apiCheck = function (options) {
	      var getTemplateOptionsCount = function (options) {
	        var templateOptions = 0;
	        templateOptions += angular.isDefined(options.template) ? 1 : 0;
	        templateOptions += angular.isDefined(options.type) ? 1 : 0;
	        templateOptions += angular.isDefined(options.templateUrl) ? 1 : 0;
	        return templateOptions;
	      };
	
	      var templateOptions = getTemplateOptionsCount(options);
	      if (templateOptions === 0) {
	        throw formlyUtil.getFieldError("template type '" + options.type + "' not supported. On element:", options);
	      } else if (templateOptions > 1) {
	        throw formlyUtil.getFieldError("You must only provide a type, template, or templateUrl for a field", options);
	      }
	    };
	
	    return {
	      restrict: "AE",
	      transclude: true,
	      scope: {
	        options: "=",
	        model: "=",
	        formId: "=?",
	        index: "=?",
	        fields: "=?",
	        form: "=?"
	      },
	      controller: ["$scope", "$interval", function fieldController($scope, $interval) {
	        // function definitions
	        var runExpressions = function () {
	          var field = $scope.options;
	          var currentValue = valueGetterSetter();
	          angular.forEach(field.expressionProperties, function runExpression(expression, prop) {
	            if (prop !== "data") {
	              field[prop] = formlyUtil.formlyEval($scope, expression, currentValue);
	            } else {
	              field.data = field.data || {};
	              angular.forEach(field.expressionProperties.data, function runExpression(dataExpression, dataProp) {
	                field.data[dataProp] = formlyUtil.formlyEval($scope, dataExpression, currentValue);
	              });
	            }
	          });
	        };
	
	        var valueGetterSetter = function (newVal) {
	          if (!$scope.model || !$scope.options.key) {
	            return;
	          }
	          if (angular.isDefined(newVal)) {
	            $scope.model[$scope.options.key] = newVal;
	          }
	          return $scope.model[$scope.options.key];
	        };
	
	        var setFormControl = function () {
	          var cleanUp = function () {
	            stopWaitingForDestroy();
	            $interval.cancel(interval);
	          };
	
	          var stopWaitingForDestroy;
	          var maxTime = 2000;
	          var intervalTime = 5;
	          var iterations = 0;
	          var interval = $interval(function () {
	            iterations++;
	            if (!angular.isDefined($scope.options.key)) {
	              return cleanUp();
	            }
	            var formControl = $scope.form && $scope.form[$scope.id];
	            if (formControl) {
	              $scope.options.formControl = formControl;
	              cleanUp();
	            } else if (intervalTime * iterations > maxTime) {
	              formlyUtil.warn("Couldn't set the formControl after " + maxTime + "ms", $scope);
	              cleanUp();
	            }
	          }, intervalTime);
	          stopWaitingForDestroy = $scope.$on("$destroy", cleanUp);
	        };
	
	        // set field id to link labels and fields
	        $scope.id = formlyUtil.getFieldId($scope.formId, $scope.options, $scope.index);
	
	        angular.extend($scope.options, {
	          // attach the key in case the formly-field directive is used directly
	          key: $scope.options.key || $scope.index || 0,
	          value: valueGetterSetter,
	          runExpressions: runExpressions,
	          modelOptions: {
	            getterSetter: true,
	            allowInvalid: true
	          }
	        });
	
	        // initalization
	        runExpressions();
	        if (!$scope.options.noFormControl) {
	          setFormControl();
	        }
	        if ($scope.options.model) {
	          $scope.$watch("options.model", runExpressions, true);
	        }
	      }],
	      link: function fieldLink(scope, el) {
	        var setElementTemplate = function (template) {
	          el.html(template);
	          $compile(el.contents())(scope);
	        };
	
	        apiCheck(scope.options);
	        getTemplate(scope.options).then(setElementTemplate);
	      }
	    };
	
	  };
	  formlyField.$inject = ["$http", "$q", "$compile", "$templateCache", "formlyConfig", "formlyUtil"];
	
	  ngModule.directive("formlyField", formlyField);
	
	  formlyField.test = false ? require("./formlyField.test")(ngModule) : null;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toArray = function (arr) {
	  return Array.isArray(arr) ? arr : Array.from(arr);
	};
	
	var _slice = Array.prototype.slice;
	var angular = __webpack_require__(1);
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyForm", function formlyForm() {
	    var currentFormId = 1;
	    return {
	      restrict: "E",
	      template: __webpack_require__(13),
	      replace: true,
	      transclude: true,
	      scope: {
	        fields: "=",
	        model: "=",
	        form: "=?"
	      },
	      controller: ["$scope", "formlyUtil", function ($scope, formlyUtil) {
	        var attachKey = function (field, index) {
	          field.key = field.key || index || 0;
	        };
	
	        var setupWatchers = function (field, index) {
	          if (!angular.isDefined(field.watcher)) {
	            return;
	          }
	          var watchers = field.watcher;
	          if (!angular.isArray(watchers)) {
	            watchers = [watchers];
	          }
	          angular.forEach(watchers, function (watcher) {
	            if (!angular.isDefined(watcher.listener)) {
	              formlyUtil.getFieldError("All field watchers must have a listener", field);
	            }
	            var watchExpression = getWatchExpression(watcher, field, index);
	            var watchListener = getWatchListener(watcher, field, index);
	
	            var type = watcher.type || "$watch";
	            watcher.stopWatching = $scope[type](watchExpression, watchListener, watcher.watchDeep);
	          });
	        };
	
	        var getWatchExpression = function (watcher, field, index) {
	          var watchExpression = watcher.expression || "model['" + field.key + "']";
	          if (angular.isFunction(watchExpression)) {
	            // wrap the field's watch expression so we can call it with the field as the first arg
	            // and the stop function as the last arg as a helper
	            var originalExpression = watchExpression;
	            watchExpression = function formlyWatchExpression() {
	              var args = modifyArgs.apply(undefined, [watcher, index].concat(_slice.call(arguments)));
	              return originalExpression.apply(undefined, _toArray(args));
	            };
	            watchExpression.displayName = "Formly Watch Expression for field for " + field.key;
	          }
	        };
	
	        var getWatchListener = function (watcher, field, index) {
	          var watchListener = watcher.listener;
	          if (angular.isFunction(watchListener)) {
	            // wrap the field's watch listener so we can call it with the field as the first arg
	            // and the stop function as the last arg as a helper
	            var originalListener = watchListener;
	            watchListener = function formlyWatchListener() {
	              var args = modifyArgs.apply(undefined, [watcher, index].concat(_slice.call(arguments)));
	              return originalListener.apply(undefined, _toArray(args));
	            };
	            watchListener.displayName = "Formly Watch Listener for field for " + field.key;
	          }
	        };
	
	        var modifyArgs = function (watcher, index) {
	          for (var _len = arguments.length, originalArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	            originalArgs[_key - 2] = arguments[_key];
	          }
	
	          return [$scope.fields[index]].concat(_toArray(originalArgs), [watcher.stopWatching]);
	        };
	
	        $scope.formId = "formly_" + currentFormId++;
	
	        angular.forEach($scope.fields, attachKey); // attaches a key based on the index if a key isn't specified
	        angular.forEach($scope.fields, setupWatchers); // setup watchers for all fields
	
	        // watch the model and evaluate watch expressions that depend on it.
	        $scope.$watch("model", function onResultUpdate(newResult) {
	          angular.forEach($scope.fields, function (field) {
	            /*jshint -W030 */
	            field.runExpressions && field.runExpressions(newResult);
	          });
	        }, true);
	      }]
	    };
	  });
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ng-form class=\"formly\"\n         name=\"form\"\n         role=\"form\">\n  <div formly-field\n       ng-repeat=\"field in fields track by $index\"\n       ng-if=\"!field.hide\"\n       class=\"formly-field\"\n       options=\"field\"\n       model=\"field.model || model\"\n       fields=\"fields\"\n       form=\"form\"\n       form-id=\"formId\"\n       index=\"$index\">\n  </div>\n  <div ng-transclude></div>\n</ng-form>\n"

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzZThhNGY0ODYzYzk0ZDdlYTFhMCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuZ3VsYXItZml4L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9kaXJlY3RpdmVzL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvdmlkZXJzL2Zvcm1seUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvdmlkZXJzL2Zvcm1seVZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2Zvcm1seVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9kaXJlY3RpdmVzL2Zvcm1seS1keW5hbWljLW5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RpcmVjdGl2ZXMvZm9ybWx5LWZpZWxkLmpzIiwid2VicGFjazovLy8uL3NyYy9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7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Uzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEc7Ozs7OztBQ3JKQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUdBQW9HLGFBQWE7QUFDakg7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLG1EQUFrRDtBQUNsRCx1REFBc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1gsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBLElBQUc7QUFDSCxHOzs7Ozs7QUNsR0EsaWMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImFuZ3VsYXJcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYW5ndWxhckZvcm1seU1vZHVsZU5hbWVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhbmd1bGFyRm9ybWx5TW9kdWxlTmFtZVwiXSA9IGZhY3Rvcnkocm9vdFtcImFuZ3VsYXJcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV81X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAzZThhNGY0ODYzYzk0ZDdlYTFhMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbW9kdWxlTmFtZSA9IG1vZHVsZS5leHBvcnRzID0gXCJmb3JtbHlcIjtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXItZml4XCIpO1xudmFyIG5nTW9kdWxlID0gYW5ndWxhci5tb2R1bGUobW9kdWxlTmFtZSwgW10pO1xuXG5yZXF1aXJlKFwiLi9wcm92aWRlcnNcIikobmdNb2R1bGUpO1xucmVxdWlyZShcIi4vc2VydmljZXNcIikobmdNb2R1bGUpO1xucmVxdWlyZShcIi4vZGlyZWN0aXZlc1wiKShuZ01vZHVsZSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBzb21lIHZlcnNpb25zIG9mIGFuZ3VsYXIgZG9uJ3QgZXhwb3J0IHRoZSBhbmd1bGFyIG1vZHVsZSBwcm9wZXJseSxcbi8vIHNvIHdlIGdldCBpdCBmcm9tIHdpbmRvdyBpbiB0aGlzIGNhc2UuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xuaWYgKCFhbmd1bGFyLnZlcnNpb24pIHtcbiAgYW5ndWxhciA9IHdpbmRvdy5hbmd1bGFyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvYW5ndWxhci1maXgvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgcmVxdWlyZShcIi4vZm9ybWx5Q29uZmlnXCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5VmVyc2lvblwiKShuZ01vZHVsZSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvcHJvdmlkZXJzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seVV0aWxcIikobmdNb2R1bGUpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3NlcnZpY2VzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvblwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seS1keW5hbWljLW5hbWVcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHktZmllbGRcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHktZm9ybVwiKShuZ01vZHVsZSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvZGlyZWN0aXZlcy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV81X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5wcm92aWRlcihcImZvcm1seUNvbmZpZ1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNldFRlbXBsYXRlVXJsID0gZnVuY3Rpb24gKG5hbWUsIHRlbXBsYXRlVXJsKSB7XG4gICAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGVtcGxhdGVVcmxNYXBbbmFtZV0gPSB0ZW1wbGF0ZVVybDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChuYW1lLCBmdW5jdGlvbiAodGVtcGxhdGVVcmwsIG5hbWUpIHtcbiAgICAgICAgICBzZXRUZW1wbGF0ZVVybChuYW1lLCB0ZW1wbGF0ZVVybCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZ2V0VGVtcGxhdGVVcmwgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlVXJsTWFwW3R5cGVdO1xuICAgIH07XG5cbiAgICB2YXIgc2V0VGVtcGxhdGUgPSBmdW5jdGlvbiAobmFtZSwgdGVtcGxhdGUpIHtcbiAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0ZW1wbGF0ZU1hcFtuYW1lXSA9IHRlbXBsYXRlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKG5hbWUsIGZ1bmN0aW9uICh0ZW1wbGF0ZSwgbmFtZSkge1xuICAgICAgICAgIHNldFRlbXBsYXRlKG5hbWUsIHRlbXBsYXRlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBnZXRUZW1wbGF0ZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGVNYXBbdHlwZV07XG4gICAgfTtcblxuICAgIHZhciBzZXRUZW1wbGF0ZVdyYXBwZXIgPSBmdW5jdGlvbiAoX3JlZikge1xuICAgICAgdmFyIG5hbWUgPSBfcmVmLm5hbWU7XG4gICAgICB2YXIgdGVtcGxhdGUgPSBfcmVmLnRlbXBsYXRlO1xuICAgICAgdmFyIGlzVXJsID0gX3JlZi5pc1VybDtcbiAgICAgIGlmICghdGVtcGxhdGUpIHtcbiAgICAgICAgdGVtcGxhdGUgPSBuYW1lO1xuICAgICAgICBuYW1lID0gdGVtcGxhdGVXcmFwcGVyTmFtZTtcbiAgICAgIH1cbiAgICAgIHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV0gPSB7IHRlbXBsYXRlOiB0ZW1wbGF0ZSwgaXNVcmw6IGlzVXJsIH07XG4gICAgfTtcblxuICAgIHZhciBnZXRUZW1wbGF0ZVdyYXBwZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZSB8fCB0ZW1wbGF0ZVdyYXBwZXJOYW1lXTtcbiAgICB9O1xuXG4gICAgdmFyIHRlbXBsYXRlVXJsTWFwID0ge307XG4gICAgdmFyIHRlbXBsYXRlTWFwID0ge307XG4gICAgdmFyIHRlbXBsYXRlV3JhcHBlcnNNYXAgPSB7fTtcbiAgICB2YXIgdGVtcGxhdGVXcmFwcGVyTmFtZSA9IFwiZGVmYXVsdFwiO1xuXG4gICAgYW5ndWxhci5leHRlbmQodGhpcywge1xuICAgICAgZ2V0VGVtcGxhdGVVcmw6IGdldFRlbXBsYXRlVXJsLFxuICAgICAgc2V0VGVtcGxhdGVVcmw6IHNldFRlbXBsYXRlVXJsLFxuICAgICAgZ2V0VGVtcGxhdGU6IGdldFRlbXBsYXRlLFxuICAgICAgc2V0VGVtcGxhdGU6IHNldFRlbXBsYXRlLFxuICAgICAgc2V0VGVtcGxhdGVXcmFwcGVyOiBzZXRUZW1wbGF0ZVdyYXBwZXIsXG4gICAgICBnZXRUZW1wbGF0ZVdyYXBwZXI6IGdldFRlbXBsYXRlV3JhcHBlcixcbiAgICAgIGRpc2FibGVXYXJuaW5nczogZmFsc2UsXG4gICAgICAkZ2V0OiBmdW5jdGlvbiBmb3JtbHlDb25maWcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9wcm92aWRlcnMvZm9ybWx5Q29uZmlnLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmNvbnN0YW50KFwiZm9ybWx5VmVyc2lvblwiLCBWRVJTSU9OKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9wcm92aWRlcnMvZm9ybWx5VmVyc2lvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyLWZpeFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZmFjdG9yeShcImZvcm1seVV0aWxcIiwgW1wiZm9ybWx5Q29uZmlnXCIsIGZ1bmN0aW9uIChmb3JtbHlDb25maWcpIHtcbiAgICB2YXIgZ2V0RmllbGRFcnJvciA9IGZ1bmN0aW9uIChtZXNzYWdlLCBmaWVsZCkge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIkZvcm1seSBFcnJvcjogXCIgKyBtZXNzYWdlICsgXCIuIEZpZWxkIGRlZmluaXRpb246IFwiICsgYW5ndWxhci50b0pzb24oZmllbGQpKTtcbiAgICB9O1xuXG4gICAgdmFyIGZvcm1seUV2YWwgPSBmdW5jdGlvbiAoc2NvcGUsIGV4cHJlc3Npb24sIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSkge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihleHByZXNzaW9uKSkge1xuICAgICAgICByZXR1cm4gZXhwcmVzc2lvbih2aWV3VmFsdWUsIG1vZGVsVmFsdWUsIHNjb3BlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzY29wZS4kZXZhbChleHByZXNzaW9uLCB7XG4gICAgICAgICAgJHZpZXdWYWx1ZTogdmlld1ZhbHVlLFxuICAgICAgICAgICRtb2RlbFZhbHVlOiBtb2RlbFZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgd2FybiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghZm9ybWx5Q29uZmlnLmRpc2FibGVXYXJuaW5ncykge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgIGFyZ3MudW5zaGlmdChcIkZvcm1seSBXYXJuaW5nOlwiKTtcbiAgICAgICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZ2V0RmllbGRJZCA9IGZ1bmN0aW9uIChmb3JtSWQsIG9wdGlvbnMsIGluZGV4KSB7XG4gICAgICB2YXIgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgICAgIGlmICghdHlwZSAmJiBvcHRpb25zLnRlbXBsYXRlKSB7XG4gICAgICAgIHR5cGUgPSBcInRlbXBsYXRlXCI7XG4gICAgICB9IGVsc2UgaWYgKCF0eXBlICYmIG9wdGlvbnMudGVtcGxhdGVVcmwpIHtcbiAgICAgICAgdHlwZSA9IFwidGVtcGxhdGVVcmxcIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtmb3JtSWQsIHR5cGUsIG9wdGlvbnMua2V5LCBpbmRleF0uam9pbihcIl9cIik7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBnZXRGaWVsZEVycm9yOiBnZXRGaWVsZEVycm9yLFxuICAgICAgZm9ybWx5RXZhbDogZm9ybWx5RXZhbCxcbiAgICAgIHdhcm46IHdhcm4sXG4gICAgICBnZXRGaWVsZElkOiBnZXRGaWVsZElkXG4gICAgfTtcbiAgfV0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3NlcnZpY2VzL2Zvcm1seVV0aWwuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKFwiZm9ybWx5Q3VzdG9tVmFsaWRhdGlvblwiLCBbXCJmb3JtbHlVdGlsXCIsIGZ1bmN0aW9uIChmb3JtbHlVdGlsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlcXVpcmU6IFwibmdNb2RlbFwiLFxuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCwgYXR0cnMsIGN0cmwpIHtcbiAgICAgICAgdmFyIHZhbGlkYXRvcnMgPSBzY29wZS4kZXZhbChhdHRycy5mb3JtbHlDdXN0b21WYWxpZGF0aW9uKTtcbiAgICAgICAgaWYgKCF2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0dXAgd2F0Y2hlcnMgYW5kIHBhcnNlcnNcbiAgICAgICAgdmFyIGhhc1ZhbGlkYXRvcnMgPSBjdHJsLmhhc093blByb3BlcnR5KFwiJHZhbGlkYXRvcnNcIik7XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2YWxpZGF0b3JzLCBmdW5jdGlvbiAodmFsaWRhdG9yLCBuYW1lKSB7XG4gICAgICAgICAgaWYgKGhhc1ZhbGlkYXRvcnMpIHtcbiAgICAgICAgICAgIHZhciB2YWxpZGF0b3JDb2xsZWN0aW9uID0gdmFsaWRhdG9yLmlzQXN5bmMgPyBcIiRhc3luY1ZhbGlkYXRvcnNcIiA6IFwiJHZhbGlkYXRvcnNcIjtcbiAgICAgICAgICAgIGN0cmxbdmFsaWRhdG9yQ29sbGVjdGlvbl1bbmFtZV0gPSBmdW5jdGlvbiAobW9kZWxWYWx1ZSwgdmlld1ZhbHVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIHZhbGlkYXRvciwgbW9kZWxWYWx1ZSwgdmlld1ZhbHVlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN0cmwuJHBhcnNlcnMudW5zaGlmdChmdW5jdGlvbiAodmlld1ZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhciBpc1ZhbGlkID0gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCB2YWxpZGF0b3IsIGN0cmwuJG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KG5hbWUsIGlzVmFsaWQpO1xuICAgICAgICAgICAgICByZXR1cm4gdmlld1ZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvZGlyZWN0aXZlcy9mb3JtbHktY3VzdG9tLXZhbGlkYXRpb24uanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKFwiZm9ybWx5RHluYW1pY05hbWVcIiwgZnVuY3Rpb24gZm9ybWx5RHluYW1pY05hbWUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiBcIkFcIixcbiAgICAgIHByaW9yaXR5OiA1OTksIC8vIG9uZSBhZnRlciBuZ0lmXG4gICAgICBjb250cm9sbGVyOiBbXCIkc2NvcGVcIiwgXCIkZWxlbWVudFwiLCBcIiRhdHRyc1wiLCBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSB7XG4gICAgICAgICRlbGVtZW50LnJlbW92ZUF0dHIoXCJmb3JtbHktZHluYW1pYy1uYW1lXCIpO1xuICAgICAgICAkYXR0cnMuJHNldChcIm5hbWVcIiwgJHNjb3BlLiRldmFsKCRhdHRycy5mb3JtbHlEeW5hbWljTmFtZSkpO1xuICAgICAgICBkZWxldGUgJGF0dHJzLmZvcm1seUR5bmFtaWNOYW1lO1xuICAgICAgfV1cbiAgICB9O1xuICB9KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9kaXJlY3RpdmVzL2Zvcm1seS1keW5hbWljLW5hbWUuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXItZml4XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICB2YXIgZm9ybWx5RmllbGQgPSBmdW5jdGlvbiAoJGh0dHAsICRxLCAkY29tcGlsZSwgJHRlbXBsYXRlQ2FjaGUsIGZvcm1seUNvbmZpZywgZm9ybWx5VXRpbCkge1xuICAgIHZhciBnZXRUZW1wbGF0ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICB2YXIgdGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlIHx8IGZvcm1seUNvbmZpZy5nZXRUZW1wbGF0ZShvcHRpb25zLnR5cGUpO1xuICAgICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICAgIHJldHVybiAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBfcmV0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgdGVtcGxhdGVVcmwgPSBvcHRpb25zLnRlbXBsYXRlVXJsIHx8IGZvcm1seUNvbmZpZy5nZXRUZW1wbGF0ZVVybChvcHRpb25zLnR5cGUpO1xuICAgICAgICAgIHZhciBodHRwT3B0aW9ucyA9IHsgY2FjaGU6ICR0ZW1wbGF0ZUNhY2hlIH07XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHY6ICRodHRwLmdldCh0ZW1wbGF0ZVVybCwgaHR0cE9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgZm9ybWx5VXRpbC53YXJuKFwiUHJvYmxlbSBsb2FkaW5nIHRlbXBsYXRlIGZvciBcIiArIHRlbXBsYXRlVXJsLCBlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBfcmV0ID09PSBcIm9iamVjdFwiKSByZXR1cm4gX3JldC52O1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgYXBpQ2hlY2sgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgdmFyIGdldFRlbXBsYXRlT3B0aW9uc0NvdW50ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHRlbXBsYXRlT3B0aW9ucyA9IDA7XG4gICAgICAgIHRlbXBsYXRlT3B0aW9ucyArPSBhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnRlbXBsYXRlKSA/IDEgOiAwO1xuICAgICAgICB0ZW1wbGF0ZU9wdGlvbnMgKz0gYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy50eXBlKSA/IDEgOiAwO1xuICAgICAgICB0ZW1wbGF0ZU9wdGlvbnMgKz0gYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy50ZW1wbGF0ZVVybCkgPyAxIDogMDtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlT3B0aW9ucztcbiAgICAgIH07XG5cbiAgICAgIHZhciB0ZW1wbGF0ZU9wdGlvbnMgPSBnZXRUZW1wbGF0ZU9wdGlvbnNDb3VudChvcHRpb25zKTtcbiAgICAgIGlmICh0ZW1wbGF0ZU9wdGlvbnMgPT09IDApIHtcbiAgICAgICAgdGhyb3cgZm9ybWx5VXRpbC5nZXRGaWVsZEVycm9yKFwidGVtcGxhdGUgdHlwZSAnXCIgKyBvcHRpb25zLnR5cGUgKyBcIicgbm90IHN1cHBvcnRlZC4gT24gZWxlbWVudDpcIiwgb3B0aW9ucyk7XG4gICAgICB9IGVsc2UgaWYgKHRlbXBsYXRlT3B0aW9ucyA+IDEpIHtcbiAgICAgICAgdGhyb3cgZm9ybWx5VXRpbC5nZXRGaWVsZEVycm9yKFwiWW91IG11c3Qgb25seSBwcm92aWRlIGEgdHlwZSwgdGVtcGxhdGUsIG9yIHRlbXBsYXRlVXJsIGZvciBhIGZpZWxkXCIsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6IFwiQUVcIixcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICBzY29wZToge1xuICAgICAgICBvcHRpb25zOiBcIj1cIixcbiAgICAgICAgbW9kZWw6IFwiPVwiLFxuICAgICAgICBmb3JtSWQ6IFwiPT9cIixcbiAgICAgICAgaW5kZXg6IFwiPT9cIixcbiAgICAgICAgZmllbGRzOiBcIj0/XCIsXG4gICAgICAgIGZvcm06IFwiPT9cIlxuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IFtcIiRzY29wZVwiLCBcIiRpbnRlcnZhbFwiLCBmdW5jdGlvbiBmaWVsZENvbnRyb2xsZXIoJHNjb3BlLCAkaW50ZXJ2YWwpIHtcbiAgICAgICAgLy8gZnVuY3Rpb24gZGVmaW5pdGlvbnNcbiAgICAgICAgdmFyIHJ1bkV4cHJlc3Npb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBmaWVsZCA9ICRzY29wZS5vcHRpb25zO1xuICAgICAgICAgIHZhciBjdXJyZW50VmFsdWUgPSB2YWx1ZUdldHRlclNldHRlcigpO1xuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChmaWVsZC5leHByZXNzaW9uUHJvcGVydGllcywgZnVuY3Rpb24gcnVuRXhwcmVzc2lvbihleHByZXNzaW9uLCBwcm9wKSB7XG4gICAgICAgICAgICBpZiAocHJvcCAhPT0gXCJkYXRhXCIpIHtcbiAgICAgICAgICAgICAgZmllbGRbcHJvcF0gPSBmb3JtbHlVdGlsLmZvcm1seUV2YWwoJHNjb3BlLCBleHByZXNzaW9uLCBjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZmllbGQuZGF0YSA9IGZpZWxkLmRhdGEgfHwge307XG4gICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChmaWVsZC5leHByZXNzaW9uUHJvcGVydGllcy5kYXRhLCBmdW5jdGlvbiBydW5FeHByZXNzaW9uKGRhdGFFeHByZXNzaW9uLCBkYXRhUHJvcCkge1xuICAgICAgICAgICAgICAgIGZpZWxkLmRhdGFbZGF0YVByb3BdID0gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKCRzY29wZSwgZGF0YUV4cHJlc3Npb24sIGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB2YWx1ZUdldHRlclNldHRlciA9IGZ1bmN0aW9uIChuZXdWYWwpIHtcbiAgICAgICAgICBpZiAoISRzY29wZS5tb2RlbCB8fCAhJHNjb3BlLm9wdGlvbnMua2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZXdWYWwpKSB7XG4gICAgICAgICAgICAkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XSA9IG5ld1ZhbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzZXRGb3JtQ29udHJvbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgY2xlYW5VcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0b3BXYWl0aW5nRm9yRGVzdHJveSgpO1xuICAgICAgICAgICAgJGludGVydmFsLmNhbmNlbChpbnRlcnZhbCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBzdG9wV2FpdGluZ0ZvckRlc3Ryb3k7XG4gICAgICAgICAgdmFyIG1heFRpbWUgPSAyMDAwO1xuICAgICAgICAgIHZhciBpbnRlcnZhbFRpbWUgPSA1O1xuICAgICAgICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICAgICAgICB2YXIgaW50ZXJ2YWwgPSAkaW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXRlcmF0aW9ucysrO1xuICAgICAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUub3B0aW9ucy5rZXkpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjbGVhblVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZm9ybUNvbnRyb2wgPSAkc2NvcGUuZm9ybSAmJiAkc2NvcGUuZm9ybVskc2NvcGUuaWRdO1xuICAgICAgICAgICAgaWYgKGZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICAgICRzY29wZS5vcHRpb25zLmZvcm1Db250cm9sID0gZm9ybUNvbnRyb2w7XG4gICAgICAgICAgICAgIGNsZWFuVXAoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW50ZXJ2YWxUaW1lICogaXRlcmF0aW9ucyA+IG1heFRpbWUpIHtcbiAgICAgICAgICAgICAgZm9ybWx5VXRpbC53YXJuKFwiQ291bGRuJ3Qgc2V0IHRoZSBmb3JtQ29udHJvbCBhZnRlciBcIiArIG1heFRpbWUgKyBcIm1zXCIsICRzY29wZSk7XG4gICAgICAgICAgICAgIGNsZWFuVXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBpbnRlcnZhbFRpbWUpO1xuICAgICAgICAgIHN0b3BXYWl0aW5nRm9yRGVzdHJveSA9ICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCBjbGVhblVwKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBzZXQgZmllbGQgaWQgdG8gbGluayBsYWJlbHMgYW5kIGZpZWxkc1xuICAgICAgICAkc2NvcGUuaWQgPSBmb3JtbHlVdGlsLmdldEZpZWxkSWQoJHNjb3BlLmZvcm1JZCwgJHNjb3BlLm9wdGlvbnMsICRzY29wZS5pbmRleCk7XG5cbiAgICAgICAgYW5ndWxhci5leHRlbmQoJHNjb3BlLm9wdGlvbnMsIHtcbiAgICAgICAgICAvLyBhdHRhY2ggdGhlIGtleSBpbiBjYXNlIHRoZSBmb3JtbHktZmllbGQgZGlyZWN0aXZlIGlzIHVzZWQgZGlyZWN0bHlcbiAgICAgICAgICBrZXk6ICRzY29wZS5vcHRpb25zLmtleSB8fCAkc2NvcGUuaW5kZXggfHwgMCxcbiAgICAgICAgICB2YWx1ZTogdmFsdWVHZXR0ZXJTZXR0ZXIsXG4gICAgICAgICAgcnVuRXhwcmVzc2lvbnM6IHJ1bkV4cHJlc3Npb25zLFxuICAgICAgICAgIG1vZGVsT3B0aW9uczoge1xuICAgICAgICAgICAgZ2V0dGVyU2V0dGVyOiB0cnVlLFxuICAgICAgICAgICAgYWxsb3dJbnZhbGlkOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBpbml0YWxpemF0aW9uXG4gICAgICAgIHJ1bkV4cHJlc3Npb25zKCk7XG4gICAgICAgIGlmICghJHNjb3BlLm9wdGlvbnMubm9Gb3JtQ29udHJvbCkge1xuICAgICAgICAgIHNldEZvcm1Db250cm9sKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCRzY29wZS5vcHRpb25zLm1vZGVsKSB7XG4gICAgICAgICAgJHNjb3BlLiR3YXRjaChcIm9wdGlvbnMubW9kZWxcIiwgcnVuRXhwcmVzc2lvbnMsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uIGZpZWxkTGluayhzY29wZSwgZWwpIHtcbiAgICAgICAgdmFyIHNldEVsZW1lbnRUZW1wbGF0ZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xuICAgICAgICAgIGVsLmh0bWwodGVtcGxhdGUpO1xuICAgICAgICAgICRjb21waWxlKGVsLmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgfTtcblxuICAgICAgICBhcGlDaGVjayhzY29wZS5vcHRpb25zKTtcbiAgICAgICAgZ2V0VGVtcGxhdGUoc2NvcGUub3B0aW9ucykudGhlbihzZXRFbGVtZW50VGVtcGxhdGUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgfTtcbiAgZm9ybWx5RmllbGQuJGluamVjdCA9IFtcIiRodHRwXCIsIFwiJHFcIiwgXCIkY29tcGlsZVwiLCBcIiR0ZW1wbGF0ZUNhY2hlXCIsIFwiZm9ybWx5Q29uZmlnXCIsIFwiZm9ybWx5VXRpbFwiXTtcblxuICBuZ01vZHVsZS5kaXJlY3RpdmUoXCJmb3JtbHlGaWVsZFwiLCBmb3JtbHlGaWVsZCk7XG5cbiAgZm9ybWx5RmllbGQudGVzdCA9IE9OX1RFU1QgPyByZXF1aXJlKFwiLi9mb3JtbHlGaWVsZC50ZXN0XCIpKG5nTW9kdWxlKSA6IG51bGw7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvZGlyZWN0aXZlcy9mb3JtbHktZmllbGQuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdG9BcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyKSA/IGFyciA6IEFycmF5LmZyb20oYXJyKTtcbn07XG5cbnZhciBfc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyLWZpeFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKFwiZm9ybWx5Rm9ybVwiLCBmdW5jdGlvbiBmb3JtbHlGb3JtKCkge1xuICAgIHZhciBjdXJyZW50Rm9ybUlkID0gMTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6IFwiRVwiLFxuICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL2Zvcm1seS1mb3JtLmh0bWxcIiksXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIGZpZWxkczogXCI9XCIsXG4gICAgICAgIG1vZGVsOiBcIj1cIixcbiAgICAgICAgZm9ybTogXCI9P1wiXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogW1wiJHNjb3BlXCIsIFwiZm9ybWx5VXRpbFwiLCBmdW5jdGlvbiAoJHNjb3BlLCBmb3JtbHlVdGlsKSB7XG4gICAgICAgIHZhciBhdHRhY2hLZXkgPSBmdW5jdGlvbiAoZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgZmllbGQua2V5ID0gZmllbGQua2V5IHx8IGluZGV4IHx8IDA7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHNldHVwV2F0Y2hlcnMgPSBmdW5jdGlvbiAoZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChmaWVsZC53YXRjaGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgd2F0Y2hlcnMgPSBmaWVsZC53YXRjaGVyO1xuICAgICAgICAgIGlmICghYW5ndWxhci5pc0FycmF5KHdhdGNoZXJzKSkge1xuICAgICAgICAgICAgd2F0Y2hlcnMgPSBbd2F0Y2hlcnNdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2god2F0Y2hlcnMsIGZ1bmN0aW9uICh3YXRjaGVyKSB7XG4gICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKHdhdGNoZXIubGlzdGVuZXIpKSB7XG4gICAgICAgICAgICAgIGZvcm1seVV0aWwuZ2V0RmllbGRFcnJvcihcIkFsbCBmaWVsZCB3YXRjaGVycyBtdXN0IGhhdmUgYSBsaXN0ZW5lclwiLCBmaWVsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgd2F0Y2hFeHByZXNzaW9uID0gZ2V0V2F0Y2hFeHByZXNzaW9uKHdhdGNoZXIsIGZpZWxkLCBpbmRleCk7XG4gICAgICAgICAgICB2YXIgd2F0Y2hMaXN0ZW5lciA9IGdldFdhdGNoTGlzdGVuZXIod2F0Y2hlciwgZmllbGQsIGluZGV4KTtcblxuICAgICAgICAgICAgdmFyIHR5cGUgPSB3YXRjaGVyLnR5cGUgfHwgXCIkd2F0Y2hcIjtcbiAgICAgICAgICAgIHdhdGNoZXIuc3RvcFdhdGNoaW5nID0gJHNjb3BlW3R5cGVdKHdhdGNoRXhwcmVzc2lvbiwgd2F0Y2hMaXN0ZW5lciwgd2F0Y2hlci53YXRjaERlZXApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBnZXRXYXRjaEV4cHJlc3Npb24gPSBmdW5jdGlvbiAod2F0Y2hlciwgZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgdmFyIHdhdGNoRXhwcmVzc2lvbiA9IHdhdGNoZXIuZXhwcmVzc2lvbiB8fCBcIm1vZGVsWydcIiArIGZpZWxkLmtleSArIFwiJ11cIjtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHdhdGNoRXhwcmVzc2lvbikpIHtcbiAgICAgICAgICAgIC8vIHdyYXAgdGhlIGZpZWxkJ3Mgd2F0Y2ggZXhwcmVzc2lvbiBzbyB3ZSBjYW4gY2FsbCBpdCB3aXRoIHRoZSBmaWVsZCBhcyB0aGUgZmlyc3QgYXJnXG4gICAgICAgICAgICAvLyBhbmQgdGhlIHN0b3AgZnVuY3Rpb24gYXMgdGhlIGxhc3QgYXJnIGFzIGEgaGVscGVyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxFeHByZXNzaW9uID0gd2F0Y2hFeHByZXNzaW9uO1xuICAgICAgICAgICAgd2F0Y2hFeHByZXNzaW9uID0gZnVuY3Rpb24gZm9ybWx5V2F0Y2hFeHByZXNzaW9uKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IG1vZGlmeUFyZ3MuYXBwbHkodW5kZWZpbmVkLCBbd2F0Y2hlciwgaW5kZXhdLmNvbmNhdChfc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbEV4cHJlc3Npb24uYXBwbHkodW5kZWZpbmVkLCBfdG9BcnJheShhcmdzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2F0Y2hFeHByZXNzaW9uLmRpc3BsYXlOYW1lID0gXCJGb3JtbHkgV2F0Y2ggRXhwcmVzc2lvbiBmb3IgZmllbGQgZm9yIFwiICsgZmllbGQua2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZ2V0V2F0Y2hMaXN0ZW5lciA9IGZ1bmN0aW9uICh3YXRjaGVyLCBmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgICB2YXIgd2F0Y2hMaXN0ZW5lciA9IHdhdGNoZXIubGlzdGVuZXI7XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih3YXRjaExpc3RlbmVyKSkge1xuICAgICAgICAgICAgLy8gd3JhcCB0aGUgZmllbGQncyB3YXRjaCBsaXN0ZW5lciBzbyB3ZSBjYW4gY2FsbCBpdCB3aXRoIHRoZSBmaWVsZCBhcyB0aGUgZmlyc3QgYXJnXG4gICAgICAgICAgICAvLyBhbmQgdGhlIHN0b3AgZnVuY3Rpb24gYXMgdGhlIGxhc3QgYXJnIGFzIGEgaGVscGVyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxMaXN0ZW5lciA9IHdhdGNoTGlzdGVuZXI7XG4gICAgICAgICAgICB3YXRjaExpc3RlbmVyID0gZnVuY3Rpb24gZm9ybWx5V2F0Y2hMaXN0ZW5lcigpIHtcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBtb2RpZnlBcmdzLmFwcGx5KHVuZGVmaW5lZCwgW3dhdGNoZXIsIGluZGV4XS5jb25jYXQoX3NsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxMaXN0ZW5lci5hcHBseSh1bmRlZmluZWQsIF90b0FycmF5KGFyZ3MpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3YXRjaExpc3RlbmVyLmRpc3BsYXlOYW1lID0gXCJGb3JtbHkgV2F0Y2ggTGlzdGVuZXIgZm9yIGZpZWxkIGZvciBcIiArIGZpZWxkLmtleTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1vZGlmeUFyZ3MgPSBmdW5jdGlvbiAod2F0Y2hlciwgaW5kZXgpIHtcbiAgICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgb3JpZ2luYWxBcmdzID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICAgICAgb3JpZ2luYWxBcmdzW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gWyRzY29wZS5maWVsZHNbaW5kZXhdXS5jb25jYXQoX3RvQXJyYXkob3JpZ2luYWxBcmdzKSwgW3dhdGNoZXIuc3RvcFdhdGNoaW5nXSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmZvcm1JZCA9IFwiZm9ybWx5X1wiICsgY3VycmVudEZvcm1JZCsrO1xuXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBhdHRhY2hLZXkpOyAvLyBhdHRhY2hlcyBhIGtleSBiYXNlZCBvbiB0aGUgaW5kZXggaWYgYSBrZXkgaXNuJ3Qgc3BlY2lmaWVkXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBzZXR1cFdhdGNoZXJzKTsgLy8gc2V0dXAgd2F0Y2hlcnMgZm9yIGFsbCBmaWVsZHNcblxuICAgICAgICAvLyB3YXRjaCB0aGUgbW9kZWwgYW5kIGV2YWx1YXRlIHdhdGNoIGV4cHJlc3Npb25zIHRoYXQgZGVwZW5kIG9uIGl0LlxuICAgICAgICAkc2NvcGUuJHdhdGNoKFwibW9kZWxcIiwgZnVuY3Rpb24gb25SZXN1bHRVcGRhdGUobmV3UmVzdWx0KSB7XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgICAgLypqc2hpbnQgLVcwMzAgKi9cbiAgICAgICAgICAgIGZpZWxkLnJ1bkV4cHJlc3Npb25zICYmIGZpZWxkLnJ1bkV4cHJlc3Npb25zKG5ld1Jlc3VsdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfV1cbiAgICB9O1xuICB9KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmctZm9ybSBjbGFzcz1cXFwiZm9ybWx5XFxcIlxcbiAgICAgICAgIG5hbWU9XFxcImZvcm1cXFwiXFxuICAgICAgICAgcm9sZT1cXFwiZm9ybVxcXCI+XFxuICA8ZGl2IGZvcm1seS1maWVsZFxcbiAgICAgICBuZy1yZXBlYXQ9XFxcImZpZWxkIGluIGZpZWxkcyB0cmFjayBieSAkaW5kZXhcXFwiXFxuICAgICAgIG5nLWlmPVxcXCIhZmllbGQuaGlkZVxcXCJcXG4gICAgICAgY2xhc3M9XFxcImZvcm1seS1maWVsZFxcXCJcXG4gICAgICAgb3B0aW9ucz1cXFwiZmllbGRcXFwiXFxuICAgICAgIG1vZGVsPVxcXCJmaWVsZC5tb2RlbCB8fCBtb2RlbFxcXCJcXG4gICAgICAgZmllbGRzPVxcXCJmaWVsZHNcXFwiXFxuICAgICAgIGZvcm09XFxcImZvcm1cXFwiXFxuICAgICAgIGZvcm0taWQ9XFxcImZvcm1JZFxcXCJcXG4gICAgICAgaW5kZXg9XFxcIiRpbmRleFxcXCI+XFxuICA8L2Rpdj5cXG4gIDxkaXYgbmctdHJhbnNjbHVkZT48L2Rpdj5cXG48L25nLWZvcm0+XFxuXCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2RpcmVjdGl2ZXMvZm9ybWx5LWZvcm0uaHRtbFxuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJmb3JtbHkuanMifQ==