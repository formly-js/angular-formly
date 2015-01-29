// angular-formly version 2.0.1 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["ngFormly"] = factory(require("angular"));
	else
		root["ngFormly"] = factory(root["angular"]);
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
	
	var ngModuleName = "formly";
	
	var angular = __webpack_require__(1);
	var ngModule = angular.module(ngModuleName, []);
	
	__webpack_require__(2)(ngModule);
	__webpack_require__(3)(ngModule);
	__webpack_require__(4)(ngModule);
	
	module.exports = ngModuleName;

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
	  __webpack_require__(8)(ngModule);
	  __webpack_require__(9)(ngModule);
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(14)(ngModule);
	  __webpack_require__(15)(ngModule);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(10)(ngModule);
	  __webpack_require__(11)(ngModule);
	  __webpack_require__(12)(ngModule);
	  __webpack_require__(13)(ngModule);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(1);
	
	module.exports = function (ngModule) {
	  ngModule.provider("formlyUsability", function () {
	    var _this = this;
	    var errorsAndWarningsUrlPrefix = "https://github.com/formly-js/angular-formly/wiki/Errors-and-Warnings#";
	    angular.extend(this, {
	      getFormlyError: getFormlyError,
	      getFieldError: getFieldError,
	      checkWrapper: checkWrapper,
	      checkWrapperTemplate: checkWrapperTemplate,
	      $get: function () {
	        return _this;
	      }
	    });
	
	    function getFieldError(errorInfoSlug, message, field) {
	      return new Error(getErrorMessage(errorInfoSlug, message) + (" Field definition: " + angular.toJson(field)));
	    }
	
	    function getFormlyError(errorInfoSlug, message) {
	      if (!message) {
	        message = errorInfoSlug;
	        errorInfoSlug = null;
	      }
	      return new Error(getErrorMessage(errorInfoSlug, message));
	    }
	
	    function getErrorMessage(errorInfoSlug, message) {
	      var url = "";
	      if (errorInfoSlug !== null) {
	        url = "" + errorsAndWarningsUrlPrefix + "" + errorInfoSlug;
	      }
	      return "Formly Error: " + message + ". " + url;
	    }
	
	    function checkWrapper(wrapper) {
	      if (wrapper.template && wrapper.url) {
	        throw getFormlyError("Template wrappers can only have a url or a template. " + ("This one provided both: " + JSON.stringify(wrapper)));
	      }
	      if (!wrapper.template && !wrapper.url) {
	        throw getFormlyError("Template wrappers must have one of a url or a template. " + ("This one provided neither: " + JSON.stringify(wrapper)));
	      }
	    }
	
	    function checkWrapperTemplate(template, additionalInfo) {
	      if (template.indexOf("<formly-transclude></formly-transclude>") === -1) {
	        throw getFormlyError("Template wrapper templates must use \"<formly-transclude></formly-transclude>\" somewhere in them. " + ("This one does not have \"<formly-transclude></formly-transclude>\" in it: " + template) + "\n" + ("Additional information: " + JSON.stringify(additionalInfo)));
	      }
	    }
	  });
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(1);
	
	module.exports = function (ngModule) {
	  ngModule.provider("formlyConfig", formlyConfig);
	
	  formlyConfig.tests = false ? require("./formlyConfig.test")(ngModule) : null;
	
	  function formlyConfig(formlyUsabilityProvider) {
	    var _this2 = this;
	
	
	    var templateUrlMap = {};
	    var templateMap = {};
	    var templateWrappersMap = {};
	    var defaultTemplateWrapperName = "default";
	    var _this = this;
	    var $log;
	
	    angular.extend(this, {
	      getTemplateUrl: getTemplateUrl,
	      setTemplateUrl: setTemplateUrl,
	      getTemplate: getTemplate,
	      setTemplate: setTemplate,
	      setTemplateWrapper: setTemplateWrapper,
	      getTemplateWrapper: getTemplateWrapper,
	      disableWarnings: false,
	      $get: ["$log", function (log) {
	        $log = log;
	        return _this2;
	      }]
	    });
	
	    function setTemplateUrl(name, templateUrl) {
	      validateSetterApi(name, templateUrl, false, arguments);
	      if (typeof name === "string") {
	        checkOverwrite(name, templateUrlMap, templateUrl, "templateUrls");
	        templateUrlMap[name] = templateUrl;
	      } else {
	        angular.forEach(name, function (templateUrl, name) {
	          setTemplateUrl(name, templateUrl);
	        });
	      }
	    }
	
	    function getTemplateUrl(type) {
	      return templateUrlMap[type];
	    }
	
	    function setTemplate(name, template) {
	      validateSetterApi(name, template, false, arguments);
	      if (typeof name === "string") {
	        checkOverwrite(name, templateMap, template, "templates");
	        templateMap[name] = template;
	      } else {
	        angular.forEach(name, function (template, name) {
	          setTemplate(name, template);
	        });
	      }
	    }
	
	    function getTemplate(type) {
	      return templateMap[type];
	    }
	
	    function validateSetterApi(name, templateOrUrl, isUrl, args) {
	      var templatesName = isUrl ? "templateUrls" : "templates";
	      if (angular.isObject(name)) {
	        return;
	      }
	      if (!angular.isString(name)) {
	        throw formlyUsabilityProvider.getFormlyError(null, "You must provide a name for all " + templatesName + ". You provided: " + JSON.stringify(args));
	      } else if (!angular.isString(templateOrUrl)) {
	        throw formlyUsabilityProvider.getFormlyError(null, "You must provide a string for all " + templatesName + ". You provided: " + JSON.stringify(args));
	      }
	    }
	
	    function setTemplateWrapper(options, name) {
	      /* jshint maxcomplexity:7 */
	      if (angular.isArray(options)) {
	        return options.map(setTemplateWrapper);
	      } else if (angular.isObject(options)) {
	        options.name = options.name || name || defaultTemplateWrapperName;
	        checkTemplateWrapperAPI(options);
	        if (angular.isString(options.types)) {
	          options.types = [options.types];
	        }
	        templateWrappersMap[options.name] = options;
	        return options;
	      } else if (angular.isString(options)) {
	        return setTemplateWrapper({
	          template: options,
	          name: name
	        });
	      }
	    }
	
	    function checkTemplateWrapperAPI(options) {
	      formlyUsabilityProvider.checkWrapper(options);
	      if (options.template) {
	        formlyUsabilityProvider.checkWrapperTemplate(options.template, options);
	      }
	      checkOverwrite(options.name, templateWrappersMap, options, "templateWrappers");
	      if (angular.isDefined(options.types) && (!angular.isArray(options.types) && !angular.isString(options.types))) {
	        throw formlyUsabilityProvider.getFormlyError("Attempted to create a template wrapper with types that is not a string or an array of strings");
	      }
	    }
	
	    function checkOverwrite(property, object, newValue, objectName) {
	      if (!_this.disableWarnings && object.hasOwnProperty(property)) {
	        $log.warn(["Attempting to overwrite " + property + " on " + objectName + " which is currently", "" + JSON.stringify(object[property]) + " with " + JSON.stringify(newValue)].join(" "));
	      }
	    }
	
	    function getTemplateWrapper(name) {
	      return templateWrappersMap[name || defaultTemplateWrapperName];
	    }
	
	  }
	  formlyConfig.$inject = ["formlyUsabilityProvider"];
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyVersion", ("2.0.1"));
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyErrorAndWarningsUrlPrefix", "https://github.com/formly-js/angular-formly/wiki/Errors-and-Warnings#");
	};

/***/ },
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(1);
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyField", formlyField);
	
	  formlyField.tests = false ? require("./formly-field.test")(ngModule) : null;
	
	  function formlyField($http, $q, $compile, $templateCache, formlyConfig, formlyUtil, formlyUsability, formlyWarn) {
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
	
	        // function definitions
	        function runExpressions() {
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
	        }
	
	        function valueGetterSetter(newVal) {
	          if (!$scope.model || !$scope.options.key) {
	            return;
	          }
	          if (angular.isDefined(newVal)) {
	            $scope.model[$scope.options.key] = newVal;
	          }
	          return $scope.model[$scope.options.key];
	        }
	
	        function setFormControl() {
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
	              formlyWarn("couldnt-set-the-formcontrol-after-timems", "Couldn't set the formControl after " + maxTime + "ms", $scope);
	              cleanUp();
	            }
	          }, intervalTime);
	          stopWaitingForDestroy = $scope.$on("$destroy", cleanUp);
	
	          function cleanUp() {
	            stopWaitingForDestroy();
	            $interval.cancel(interval);
	          }
	        }
	      }],
	      link: function fieldLink(scope, el) {
	        apiCheck(scope.options);
	        getTemplate(scope.options).then(transcludeInWrapper(scope.options)).then(setElementTemplate);
	
	        function setElementTemplate(templateEl) {
	          el.html(templateEl.html());
	          $compile(el.contents())(scope);
	        }
	      }
	    };
	
	
	    function getTemplate(options) {
	      var template = options.template || formlyConfig.getTemplate(options.type);
	      var templateUrl = options.templateUrl || formlyConfig.getTemplateUrl(options.type);
	      if (template) {
	        return $q.when(template);
	      } else if (templateUrl) {
	        var httpOptions = { cache: $templateCache };
	        return $http.get(templateUrl, httpOptions).then(function (response) {
	          return response.data;
	        })["catch"](function (error) {
	          formlyWarn("problem-loading-template-for-templateurl", "Problem loading template for " + templateUrl, error);
	        });
	      } else {
	        throw formlyUsability.getFieldError("template-type-type-not-supported", "template type '" + options.type + "' not supported. On element:", options);
	      }
	    }
	
	    function transcludeInWrapper(options) {
	      var templateWrapper = getTemplateWrapperOption(options);
	
	      return function transcludeTemplate(template) {
	        if (!templateWrapper) {
	          return $q.when(angular.element(template));
	        }
	        formlyUsability.checkWrapper(templateWrapper);
	        if (templateWrapper.template) {
	          formlyUsability.checkWrapperTemplate(templateWrapper.template, templateWrapper);
	          return $q.when(doTransclusion(templateWrapper.template));
	        } else {
	          var httpOptions = { cache: $templateCache };
	          return $http.get(templateWrapper.url, httpOptions).then(function (response) {
	            var wrapper = response.data;
	            formlyUsability.checkWrapperTemplate(wrapper, templateWrapper);
	            return doTransclusion(wrapper);
	          })["catch"](function (error) {
	            formlyWarn("proplem-loading-template-for-wrapper", "Problem loading template for wrapper" + JSON.stringify(templateWrapper), error);
	          });
	        }
	
	        function doTransclusion(wrapper) {
	          var wrapperEl = angular.element(wrapper);
	          var transcludeEl = wrapperEl.find("formly-transclude");
	          transcludeEl.replaceWith(template);
	          return wrapperEl;
	        }
	      };
	    }
	
	    function getTemplateWrapperOption(options) {
	      /* jshint maxcomplexity:6 */
	      var templateOption = options.wrapper;
	      // explicit null means no wrapper
	      if (templateOption === null) {
	        return "";
	      }
	      var templateWrapper = templateOption;
	      // nothing specified means use the default wrapper
	      if (!templateOption) {
	        templateWrapper = formlyConfig.getTemplateWrapper();
	      } else if (typeof templateOption === "string") {
	        // string means it's a type
	        templateWrapper = formlyConfig.getTemplateWrapper(templateOption);
	      }
	      return templateWrapper;
	    }
	
	    function apiCheck(options) {
	      var templateOptions = getTemplateOptionsCount(options);
	      if (templateOptions === 0) {
	        throw formlyUsability.getFieldError("you-must-provide-one-of-type-template-or-templateurl-for-a-field", "You must provide one of type, template, or templateUrl for a field", options);
	      } else if (templateOptions > 1) {
	        throw formlyUsability.getFieldError("you-must-only-provide-a-type-template-or-templateurl-for-a-field", "You must only provide a type, template, or templateUrl for a field", options);
	      }
	
	      function getTemplateOptionsCount(options) {
	        var templateOptions = 0;
	        templateOptions += angular.isDefined(options.template) ? 1 : 0;
	        templateOptions += angular.isDefined(options.type) ? 1 : 0;
	        templateOptions += angular.isDefined(options.templateUrl) ? 1 : 0;
	        return templateOptions;
	      }
	    }
	  }
	  formlyField.$inject = ["$http", "$q", "$compile", "$templateCache", "formlyConfig", "formlyUtil", "formlyUsability", "formlyWarn"];
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toArray = function (arr) { return Array.isArray(arr) ? arr : Array.from(arr); };
	
	var _slice = Array.prototype.slice;
	var angular = __webpack_require__(1);
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyForm", formlyForm);
	
	  formlyForm.tests = false ? require("./formly-form.test")(ngModule) : null;
	
	  function formlyForm() {
	    var currentFormId = 1;
	    return {
	      restrict: "E",
	      template: __webpack_require__(16),
	      replace: true,
	      transclude: true,
	      scope: {
	        fields: "=",
	        model: "=",
	        form: "=?"
	      },
	      controller: ["$scope", "formlyUsability", function ($scope, formlyUsability) {
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
	          angular.forEach(watchers, function (watcher) {
	            if (!angular.isDefined(watcher.listener)) {
	              throw formlyUsability.getFieldError("all-field-watchers-must-have-a-listener", "All field watchers must have a listener", field);
	            }
	            var watchExpression = getWatchExpression(watcher, field, index);
	            var watchListener = getWatchListener(watcher, field, index);
	
	            var type = watcher.type || "$watch";
	            watcher.stopWatching = $scope[type](watchExpression, watchListener, watcher.watchDeep);
	          });
	        }
	
	        function getWatchExpression(watcher, field, index) {
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
	          return watchExpression;
	        }
	
	        function getWatchListener(watcher, field, index) {
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
	          return watchListener;
	        }
	
	        function modifyArgs(watcher, index) {
	          for (var _len = arguments.length, originalArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	            originalArgs[_key - 2] = arguments[_key];
	          }
	
	          return [$scope.fields[index]].concat(_toArray(originalArgs), [watcher.stopWatching]);
	        }
	      }]
	    };
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(1);
	
	module.exports = function (ngModule) {
	  ngModule.factory("formlyUtil", function () {
	    return {
	      formlyEval: formlyEval,
	      getFieldId: getFieldId
	    };
	
	    function formlyEval(scope, expression, modelValue, viewValue) {
	      if (angular.isFunction(expression)) {
	        return expression(viewValue, modelValue, scope);
	      } else {
	        return scope.$eval(expression, {
	          $viewValue: viewValue,
	          $modelValue: modelValue
	        });
	      }
	    }
	
	    function getFieldId(formId, options, index) {
	      var type = options.type;
	      if (!type && options.template) {
	        type = "template";
	      } else if (!type && options.templateUrl) {
	        type = "templateUrl";
	      }
	
	      return [formId, type, options.key, index].join("_");
	    }
	  });
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toArray = function (arr) { return Array.isArray(arr) ? arr : Array.from(arr); };
	
	module.exports = function (ngModule) {
	  ngModule.factory("formlyWarn", ["formlyConfig", "formlyErrorAndWarningsUrlPrefix", "$log", function (formlyConfig, formlyErrorAndWarningsUrlPrefix, $log) {
	    return function warn() {
	      if (!formlyConfig.disableWarnings) {
	        var args = Array.prototype.slice.call(arguments);
	        var warnInfoSlug = args.shift();
	        args.unshift("Formly Warning:");
	        args.push("" + formlyErrorAndWarningsUrlPrefix + "" + warnInfoSlug);
	        $log.warn.apply($log, _toArray(args));
	      }
	    };
	  }]);
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ng-form class=\"formly\"\n         name=\"form\"\n         role=\"form\">\n  <div formly-field\n       ng-repeat=\"field in fields track by $index\"\n       ng-if=\"!field.hide\"\n       class=\"formly-field\"\n       options=\"field\"\n       model=\"field.model || model\"\n       fields=\"fields\"\n       form=\"form\"\n       form-id=\"formId\"\n       index=\"$index\">\n  </div>\n  <div ng-transclude></div>\n</ng-form>\n"

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5OGM1YzIwZDNiNWViYjM0ZjhhMSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hbmd1bGFyLWZpeC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seVVzYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlWZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWR5bmFtaWMtbmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1maWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2Zvcm1seVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvZm9ybWx5V2Fybi5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUN0Q0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsK0I7Ozs7OztBQ1hBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCOzs7Ozs7QUNSQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDUEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDTEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ1BBLGdEOzs7Ozs7QUNBQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsRzs7Ozs7O0FDckRBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDekhBOztBQUVBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNKQTs7QUFFQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDSkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLElBQUc7QUFDSCxHOzs7Ozs7QUMvQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsSUFBRztBQUNILEc7Ozs7OztBQ2RBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQSxZQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCw4QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQSxZQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ2xNQTs7QUFFQSxnQ0FBK0IsbURBQW1EOztBQUVsRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBLG1EQUFrRDtBQUNsRCx1REFBc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1gsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFHQUFvRyxhQUFhO0FBQ2pIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsRzs7Ozs7O0FDdEdBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNILEc7Ozs7OztBQ2pDQTs7QUFFQSxnQ0FBK0IsbURBQW1EOztBQUVsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEc7Ozs7OztBQ2hCQSxpYyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiYW5ndWxhclwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJuZ0Zvcm1seVwiXSA9IGZhY3RvcnkocmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm5nRm9ybWx5XCJdID0gZmFjdG9yeShyb290W1wiYW5ndWxhclwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzVfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDk4YzVjMjBkM2I1ZWJiMzRmOGExXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBuZ01vZHVsZU5hbWUgPSBcImZvcm1seVwiO1xuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyLWZpeFwiKTtcbnZhciBuZ01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5nTW9kdWxlTmFtZSwgW10pO1xuXG5yZXF1aXJlKFwiLi9wcm92aWRlcnNcIikobmdNb2R1bGUpO1xucmVxdWlyZShcIi4vc2VydmljZXNcIikobmdNb2R1bGUpO1xucmVxdWlyZShcIi4vZGlyZWN0aXZlc1wiKShuZ01vZHVsZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGVOYW1lO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBzb21lIHZlcnNpb25zIG9mIGFuZ3VsYXIgZG9uJ3QgZXhwb3J0IHRoZSBhbmd1bGFyIG1vZHVsZSBwcm9wZXJseSxcbi8vIHNvIHdlIGdldCBpdCBmcm9tIHdpbmRvdyBpbiB0aGlzIGNhc2UuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xuaWYgKCFhbmd1bGFyLnZlcnNpb24pIHtcbiAgYW5ndWxhciA9IHdpbmRvdy5hbmd1bGFyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hbmd1bGFyLWZpeC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICByZXF1aXJlKFwiLi9mb3JtbHlVc2FiaWxpdHlcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHlDb25maWdcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHlWZXJzaW9uXCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeFwiKShuZ01vZHVsZSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgcmVxdWlyZShcIi4vZm9ybWx5VXRpbFwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seVdhcm5cIikobmdNb2R1bGUpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2VydmljZXMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgcmVxdWlyZShcIi4vZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uXCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5LWR5bmFtaWMtbmFtZVwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seS1maWVsZFwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seS1mb3JtXCIpKG5nTW9kdWxlKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RpcmVjdGl2ZXMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhci1maXhcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLnByb3ZpZGVyKFwiZm9ybWx5VXNhYmlsaXR5XCIsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBlcnJvcnNBbmRXYXJuaW5nc1VybFByZWZpeCA9IFwiaHR0cHM6Ly9naXRodWIuY29tL2Zvcm1seS1qcy9hbmd1bGFyLWZvcm1seS93aWtpL0Vycm9ycy1hbmQtV2FybmluZ3MjXCI7XG4gICAgYW5ndWxhci5leHRlbmQodGhpcywge1xuICAgICAgZ2V0Rm9ybWx5RXJyb3I6IGdldEZvcm1seUVycm9yLFxuICAgICAgZ2V0RmllbGRFcnJvcjogZ2V0RmllbGRFcnJvcixcbiAgICAgIGNoZWNrV3JhcHBlcjogY2hlY2tXcmFwcGVyLFxuICAgICAgY2hlY2tXcmFwcGVyVGVtcGxhdGU6IGNoZWNrV3JhcHBlclRlbXBsYXRlLFxuICAgICAgJGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBnZXRGaWVsZEVycm9yKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UsIGZpZWxkKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSArIChcIiBGaWVsZCBkZWZpbml0aW9uOiBcIiArIGFuZ3VsYXIudG9Kc29uKGZpZWxkKSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZvcm1seUVycm9yKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpIHtcbiAgICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3JJbmZvU2x1ZztcbiAgICAgICAgZXJyb3JJbmZvU2x1ZyA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RXJyb3JNZXNzYWdlKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpIHtcbiAgICAgIHZhciB1cmwgPSBcIlwiO1xuICAgICAgaWYgKGVycm9ySW5mb1NsdWcgIT09IG51bGwpIHtcbiAgICAgICAgdXJsID0gXCJcIiArIGVycm9yc0FuZFdhcm5pbmdzVXJsUHJlZml4ICsgXCJcIiArIGVycm9ySW5mb1NsdWc7XG4gICAgICB9XG4gICAgICByZXR1cm4gXCJGb3JtbHkgRXJyb3I6IFwiICsgbWVzc2FnZSArIFwiLiBcIiArIHVybDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dyYXBwZXIod3JhcHBlcikge1xuICAgICAgaWYgKHdyYXBwZXIudGVtcGxhdGUgJiYgd3JhcHBlci51cmwpIHtcbiAgICAgICAgdGhyb3cgZ2V0Rm9ybWx5RXJyb3IoXCJUZW1wbGF0ZSB3cmFwcGVycyBjYW4gb25seSBoYXZlIGEgdXJsIG9yIGEgdGVtcGxhdGUuIFwiICsgKFwiVGhpcyBvbmUgcHJvdmlkZWQgYm90aDogXCIgKyBKU09OLnN0cmluZ2lmeSh3cmFwcGVyKSkpO1xuICAgICAgfVxuICAgICAgaWYgKCF3cmFwcGVyLnRlbXBsYXRlICYmICF3cmFwcGVyLnVybCkge1xuICAgICAgICB0aHJvdyBnZXRGb3JtbHlFcnJvcihcIlRlbXBsYXRlIHdyYXBwZXJzIG11c3QgaGF2ZSBvbmUgb2YgYSB1cmwgb3IgYSB0ZW1wbGF0ZS4gXCIgKyAoXCJUaGlzIG9uZSBwcm92aWRlZCBuZWl0aGVyOiBcIiArIEpTT04uc3RyaW5naWZ5KHdyYXBwZXIpKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyVGVtcGxhdGUodGVtcGxhdGUsIGFkZGl0aW9uYWxJbmZvKSB7XG4gICAgICBpZiAodGVtcGxhdGUuaW5kZXhPZihcIjxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPlwiKSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgZ2V0Rm9ybWx5RXJyb3IoXCJUZW1wbGF0ZSB3cmFwcGVyIHRlbXBsYXRlcyBtdXN0IHVzZSBcXFwiPGZvcm1seS10cmFuc2NsdWRlPjwvZm9ybWx5LXRyYW5zY2x1ZGU+XFxcIiBzb21ld2hlcmUgaW4gdGhlbS4gXCIgKyAoXCJUaGlzIG9uZSBkb2VzIG5vdCBoYXZlIFxcXCI8Zm9ybWx5LXRyYW5zY2x1ZGU+PC9mb3JtbHktdHJhbnNjbHVkZT5cXFwiIGluIGl0OiBcIiArIHRlbXBsYXRlKSArIFwiXFxuXCIgKyAoXCJBZGRpdGlvbmFsIGluZm9ybWF0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KGFkZGl0aW9uYWxJbmZvKSkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvZm9ybWx5VXNhYmlsaXR5LmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXItZml4XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5wcm92aWRlcihcImZvcm1seUNvbmZpZ1wiLCBmb3JtbHlDb25maWcpO1xuXG4gIGZvcm1seUNvbmZpZy50ZXN0cyA9IE9OX1RFU1QgPyByZXF1aXJlKFwiLi9mb3JtbHlDb25maWcudGVzdFwiKShuZ01vZHVsZSkgOiBudWxsO1xuXG4gIGZ1bmN0aW9uIGZvcm1seUNvbmZpZyhmb3JtbHlVc2FiaWxpdHlQcm92aWRlcikge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG5cbiAgICB2YXIgdGVtcGxhdGVVcmxNYXAgPSB7fTtcbiAgICB2YXIgdGVtcGxhdGVNYXAgPSB7fTtcbiAgICB2YXIgdGVtcGxhdGVXcmFwcGVyc01hcCA9IHt9O1xuICAgIHZhciBkZWZhdWx0VGVtcGxhdGVXcmFwcGVyTmFtZSA9IFwiZGVmYXVsdFwiO1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyICRsb2c7XG5cbiAgICBhbmd1bGFyLmV4dGVuZCh0aGlzLCB7XG4gICAgICBnZXRUZW1wbGF0ZVVybDogZ2V0VGVtcGxhdGVVcmwsXG4gICAgICBzZXRUZW1wbGF0ZVVybDogc2V0VGVtcGxhdGVVcmwsXG4gICAgICBnZXRUZW1wbGF0ZTogZ2V0VGVtcGxhdGUsXG4gICAgICBzZXRUZW1wbGF0ZTogc2V0VGVtcGxhdGUsXG4gICAgICBzZXRUZW1wbGF0ZVdyYXBwZXI6IHNldFRlbXBsYXRlV3JhcHBlcixcbiAgICAgIGdldFRlbXBsYXRlV3JhcHBlcjogZ2V0VGVtcGxhdGVXcmFwcGVyLFxuICAgICAgZGlzYWJsZVdhcm5pbmdzOiBmYWxzZSxcbiAgICAgICRnZXQ6IFtcIiRsb2dcIiwgZnVuY3Rpb24gKGxvZykge1xuICAgICAgICAkbG9nID0gbG9nO1xuICAgICAgICByZXR1cm4gX3RoaXMyO1xuICAgICAgfV1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHNldFRlbXBsYXRlVXJsKG5hbWUsIHRlbXBsYXRlVXJsKSB7XG4gICAgICB2YWxpZGF0ZVNldHRlckFwaShuYW1lLCB0ZW1wbGF0ZVVybCwgZmFsc2UsIGFyZ3VtZW50cyk7XG4gICAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgY2hlY2tPdmVyd3JpdGUobmFtZSwgdGVtcGxhdGVVcmxNYXAsIHRlbXBsYXRlVXJsLCBcInRlbXBsYXRlVXJsc1wiKTtcbiAgICAgICAgdGVtcGxhdGVVcmxNYXBbbmFtZV0gPSB0ZW1wbGF0ZVVybDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChuYW1lLCBmdW5jdGlvbiAodGVtcGxhdGVVcmwsIG5hbWUpIHtcbiAgICAgICAgICBzZXRUZW1wbGF0ZVVybChuYW1lLCB0ZW1wbGF0ZVVybCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRlbXBsYXRlVXJsKHR5cGUpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZVVybE1hcFt0eXBlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRUZW1wbGF0ZShuYW1lLCB0ZW1wbGF0ZSkge1xuICAgICAgdmFsaWRhdGVTZXR0ZXJBcGkobmFtZSwgdGVtcGxhdGUsIGZhbHNlLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNoZWNrT3ZlcndyaXRlKG5hbWUsIHRlbXBsYXRlTWFwLCB0ZW1wbGF0ZSwgXCJ0ZW1wbGF0ZXNcIik7XG4gICAgICAgIHRlbXBsYXRlTWFwW25hbWVdID0gdGVtcGxhdGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2gobmFtZSwgZnVuY3Rpb24gKHRlbXBsYXRlLCBuYW1lKSB7XG4gICAgICAgICAgc2V0VGVtcGxhdGUobmFtZSwgdGVtcGxhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUZW1wbGF0ZSh0eXBlKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGVNYXBbdHlwZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVTZXR0ZXJBcGkobmFtZSwgdGVtcGxhdGVPclVybCwgaXNVcmwsIGFyZ3MpIHtcbiAgICAgIHZhciB0ZW1wbGF0ZXNOYW1lID0gaXNVcmwgPyBcInRlbXBsYXRlVXJsc1wiIDogXCJ0ZW1wbGF0ZXNcIjtcbiAgICAgIGlmIChhbmd1bGFyLmlzT2JqZWN0KG5hbWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghYW5ndWxhci5pc1N0cmluZyhuYW1lKSkge1xuICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5nZXRGb3JtbHlFcnJvcihudWxsLCBcIllvdSBtdXN0IHByb3ZpZGUgYSBuYW1lIGZvciBhbGwgXCIgKyB0ZW1wbGF0ZXNOYW1lICsgXCIuIFlvdSBwcm92aWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeShhcmdzKSk7XG4gICAgICB9IGVsc2UgaWYgKCFhbmd1bGFyLmlzU3RyaW5nKHRlbXBsYXRlT3JVcmwpKSB7XG4gICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLmdldEZvcm1seUVycm9yKG51bGwsIFwiWW91IG11c3QgcHJvdmlkZSBhIHN0cmluZyBmb3IgYWxsIFwiICsgdGVtcGxhdGVzTmFtZSArIFwiLiBZb3UgcHJvdmlkZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkoYXJncykpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFRlbXBsYXRlV3JhcHBlcihvcHRpb25zLCBuYW1lKSB7XG4gICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo3ICovXG4gICAgICBpZiAoYW5ndWxhci5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLm1hcChzZXRUZW1wbGF0ZVdyYXBwZXIpO1xuICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgIG9wdGlvbnMubmFtZSA9IG9wdGlvbnMubmFtZSB8fCBuYW1lIHx8IGRlZmF1bHRUZW1wbGF0ZVdyYXBwZXJOYW1lO1xuICAgICAgICBjaGVja1RlbXBsYXRlV3JhcHBlckFQSShvcHRpb25zKTtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcob3B0aW9ucy50eXBlcykpIHtcbiAgICAgICAgICBvcHRpb25zLnR5cGVzID0gW29wdGlvbnMudHlwZXNdO1xuICAgICAgICB9XG4gICAgICAgIHRlbXBsYXRlV3JhcHBlcnNNYXBbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnM7XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzU3RyaW5nKG9wdGlvbnMpKSB7XG4gICAgICAgIHJldHVybiBzZXRUZW1wbGF0ZVdyYXBwZXIoe1xuICAgICAgICAgIHRlbXBsYXRlOiBvcHRpb25zLFxuICAgICAgICAgIG5hbWU6IG5hbWVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tUZW1wbGF0ZVdyYXBwZXJBUEkob3B0aW9ucykge1xuICAgICAgZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuY2hlY2tXcmFwcGVyKG9wdGlvbnMpO1xuICAgICAgaWYgKG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICAgICAgZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuY2hlY2tXcmFwcGVyVGVtcGxhdGUob3B0aW9ucy50ZW1wbGF0ZSwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgICBjaGVja092ZXJ3cml0ZShvcHRpb25zLm5hbWUsIHRlbXBsYXRlV3JhcHBlcnNNYXAsIG9wdGlvbnMsIFwidGVtcGxhdGVXcmFwcGVyc1wiKTtcbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnR5cGVzKSAmJiAoIWFuZ3VsYXIuaXNBcnJheShvcHRpb25zLnR5cGVzKSAmJiAhYW5ndWxhci5pc1N0cmluZyhvcHRpb25zLnR5cGVzKSkpIHtcbiAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuZ2V0Rm9ybWx5RXJyb3IoXCJBdHRlbXB0ZWQgdG8gY3JlYXRlIGEgdGVtcGxhdGUgd3JhcHBlciB3aXRoIHR5cGVzIHRoYXQgaXMgbm90IGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3NcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tPdmVyd3JpdGUocHJvcGVydHksIG9iamVjdCwgbmV3VmFsdWUsIG9iamVjdE5hbWUpIHtcbiAgICAgIGlmICghX3RoaXMuZGlzYWJsZVdhcm5pbmdzICYmIG9iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgJGxvZy53YXJuKFtcIkF0dGVtcHRpbmcgdG8gb3ZlcndyaXRlIFwiICsgcHJvcGVydHkgKyBcIiBvbiBcIiArIG9iamVjdE5hbWUgKyBcIiB3aGljaCBpcyBjdXJyZW50bHlcIiwgXCJcIiArIEpTT04uc3RyaW5naWZ5KG9iamVjdFtwcm9wZXJ0eV0pICsgXCIgd2l0aCBcIiArIEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKV0uam9pbihcIiBcIikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRlbXBsYXRlV3JhcHBlcihuYW1lKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lIHx8IGRlZmF1bHRUZW1wbGF0ZVdyYXBwZXJOYW1lXTtcbiAgICB9XG5cbiAgfVxuICBmb3JtbHlDb25maWcuJGluamVjdCA9IFtcImZvcm1seVVzYWJpbGl0eVByb3ZpZGVyXCJdO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcHJvdmlkZXJzL2Zvcm1seUNvbmZpZy5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5jb25zdGFudChcImZvcm1seVZlcnNpb25cIiwgVkVSU0lPTik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvZm9ybWx5VmVyc2lvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5jb25zdGFudChcImZvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXhcIiwgXCJodHRwczovL2dpdGh1Yi5jb20vZm9ybWx5LWpzL2FuZ3VsYXItZm9ybWx5L3dpa2kvRXJyb3JzLWFuZC1XYXJuaW5ncyNcIik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeC5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5kaXJlY3RpdmUoXCJmb3JtbHlDdXN0b21WYWxpZGF0aW9uXCIsIFtcImZvcm1seVV0aWxcIiwgZnVuY3Rpb24gKGZvcm1seVV0aWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVxdWlyZTogXCJuZ01vZGVsXCIsXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsLCBhdHRycywgY3RybCkge1xuICAgICAgICB2YXIgdmFsaWRhdG9ycyA9IHNjb3BlLiRldmFsKGF0dHJzLmZvcm1seUN1c3RvbVZhbGlkYXRpb24pO1xuICAgICAgICBpZiAoIXZhbGlkYXRvcnMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXR1cCB3YXRjaGVycyBhbmQgcGFyc2Vyc1xuICAgICAgICB2YXIgaGFzVmFsaWRhdG9ycyA9IGN0cmwuaGFzT3duUHJvcGVydHkoXCIkdmFsaWRhdG9yc1wiKTtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHZhbGlkYXRvcnMsIGZ1bmN0aW9uICh2YWxpZGF0b3IsIG5hbWUpIHtcbiAgICAgICAgICBpZiAoaGFzVmFsaWRhdG9ycykge1xuICAgICAgICAgICAgdmFyIHZhbGlkYXRvckNvbGxlY3Rpb24gPSB2YWxpZGF0b3IuaXNBc3luYyA/IFwiJGFzeW5jVmFsaWRhdG9yc1wiIDogXCIkdmFsaWRhdG9yc1wiO1xuICAgICAgICAgICAgY3RybFt2YWxpZGF0b3JDb2xsZWN0aW9uXVtuYW1lXSA9IGZ1bmN0aW9uIChtb2RlbFZhbHVlLCB2aWV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgdmFsaWRhdG9yLCBtb2RlbFZhbHVlLCB2aWV3VmFsdWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3RybC4kcGFyc2Vycy51bnNoaWZ0KGZ1bmN0aW9uICh2aWV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIHZhbGlkYXRvciwgY3RybC4kbW9kZWxWYWx1ZSwgdmlld1ZhbHVlKTtcbiAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkobmFtZSwgaXNWYWxpZCk7XG4gICAgICAgICAgICAgIHJldHVybiB2aWV3VmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5kaXJlY3RpdmUoXCJmb3JtbHlEeW5hbWljTmFtZVwiLCBmdW5jdGlvbiBmb3JtbHlEeW5hbWljTmFtZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6IFwiQVwiLFxuICAgICAgcHJpb3JpdHk6IDU5OSwgLy8gb25lIGFmdGVyIG5nSWZcbiAgICAgIGNvbnRyb2xsZXI6IFtcIiRzY29wZVwiLCBcIiRlbGVtZW50XCIsIFwiJGF0dHJzXCIsIGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpIHtcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlQXR0cihcImZvcm1seS1keW5hbWljLW5hbWVcIik7XG4gICAgICAgICRhdHRycy4kc2V0KFwibmFtZVwiLCAkc2NvcGUuJGV2YWwoJGF0dHJzLmZvcm1seUR5bmFtaWNOYW1lKSk7XG4gICAgICAgIGRlbGV0ZSAkYXR0cnMuZm9ybWx5RHluYW1pY05hbWU7XG4gICAgICB9XVxuICAgIH07XG4gIH0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGlyZWN0aXZlcy9mb3JtbHktZHluYW1pYy1uYW1lLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyLWZpeFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKFwiZm9ybWx5RmllbGRcIiwgZm9ybWx5RmllbGQpO1xuXG4gIGZvcm1seUZpZWxkLnRlc3RzID0gT05fVEVTVCA/IHJlcXVpcmUoXCIuL2Zvcm1seS1maWVsZC50ZXN0XCIpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZm9ybWx5RmllbGQoJGh0dHAsICRxLCAkY29tcGlsZSwgJHRlbXBsYXRlQ2FjaGUsIGZvcm1seUNvbmZpZywgZm9ybWx5VXRpbCwgZm9ybWx5VXNhYmlsaXR5LCBmb3JtbHlXYXJuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiBcIkFFXCIsXG4gICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgb3B0aW9uczogXCI9XCIsXG4gICAgICAgIG1vZGVsOiBcIj1cIixcbiAgICAgICAgZm9ybUlkOiBcIj0/XCIsXG4gICAgICAgIGluZGV4OiBcIj0/XCIsXG4gICAgICAgIGZpZWxkczogXCI9P1wiLFxuICAgICAgICBmb3JtOiBcIj0/XCJcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBbXCIkc2NvcGVcIiwgXCIkaW50ZXJ2YWxcIiwgZnVuY3Rpb24gZmllbGRDb250cm9sbGVyKCRzY29wZSwgJGludGVydmFsKSB7XG4gICAgICAgIC8vIHNldCBmaWVsZCBpZCB0byBsaW5rIGxhYmVscyBhbmQgZmllbGRzXG4gICAgICAgICRzY29wZS5pZCA9IGZvcm1seVV0aWwuZ2V0RmllbGRJZCgkc2NvcGUuZm9ybUlkLCAkc2NvcGUub3B0aW9ucywgJHNjb3BlLmluZGV4KTtcblxuICAgICAgICBhbmd1bGFyLmV4dGVuZCgkc2NvcGUub3B0aW9ucywge1xuICAgICAgICAgIC8vIGF0dGFjaCB0aGUga2V5IGluIGNhc2UgdGhlIGZvcm1seS1maWVsZCBkaXJlY3RpdmUgaXMgdXNlZCBkaXJlY3RseVxuICAgICAgICAgIGtleTogJHNjb3BlLm9wdGlvbnMua2V5IHx8ICRzY29wZS5pbmRleCB8fCAwLFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZUdldHRlclNldHRlcixcbiAgICAgICAgICBydW5FeHByZXNzaW9uczogcnVuRXhwcmVzc2lvbnMsXG4gICAgICAgICAgbW9kZWxPcHRpb25zOiB7XG4gICAgICAgICAgICBnZXR0ZXJTZXR0ZXI6IHRydWUsXG4gICAgICAgICAgICBhbGxvd0ludmFsaWQ6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGluaXRhbGl6YXRpb25cbiAgICAgICAgcnVuRXhwcmVzc2lvbnMoKTtcbiAgICAgICAgaWYgKCEkc2NvcGUub3B0aW9ucy5ub0Zvcm1Db250cm9sKSB7XG4gICAgICAgICAgc2V0Rm9ybUNvbnRyb2woKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJHNjb3BlLm9wdGlvbnMubW9kZWwpIHtcbiAgICAgICAgICAkc2NvcGUuJHdhdGNoKFwib3B0aW9ucy5tb2RlbFwiLCBydW5FeHByZXNzaW9ucywgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmdW5jdGlvbiBkZWZpbml0aW9uc1xuICAgICAgICBmdW5jdGlvbiBydW5FeHByZXNzaW9ucygpIHtcbiAgICAgICAgICB2YXIgZmllbGQgPSAkc2NvcGUub3B0aW9ucztcbiAgICAgICAgICB2YXIgY3VycmVudFZhbHVlID0gdmFsdWVHZXR0ZXJTZXR0ZXIoKTtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goZmllbGQuZXhwcmVzc2lvblByb3BlcnRpZXMsIGZ1bmN0aW9uIHJ1bkV4cHJlc3Npb24oZXhwcmVzc2lvbiwgcHJvcCkge1xuICAgICAgICAgICAgaWYgKHByb3AgIT09IFwiZGF0YVwiKSB7XG4gICAgICAgICAgICAgIGZpZWxkW3Byb3BdID0gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKCRzY29wZSwgZXhwcmVzc2lvbiwgY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZpZWxkLmRhdGEgPSBmaWVsZC5kYXRhIHx8IHt9O1xuICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goZmllbGQuZXhwcmVzc2lvblByb3BlcnRpZXMuZGF0YSwgZnVuY3Rpb24gcnVuRXhwcmVzc2lvbihkYXRhRXhwcmVzc2lvbiwgZGF0YVByb3ApIHtcbiAgICAgICAgICAgICAgICBmaWVsZC5kYXRhW2RhdGFQcm9wXSA9IGZvcm1seVV0aWwuZm9ybWx5RXZhbCgkc2NvcGUsIGRhdGFFeHByZXNzaW9uLCBjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHZhbHVlR2V0dGVyU2V0dGVyKG5ld1ZhbCkge1xuICAgICAgICAgIGlmICghJHNjb3BlLm1vZGVsIHx8ICEkc2NvcGUub3B0aW9ucy5rZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG5ld1ZhbCkpIHtcbiAgICAgICAgICAgICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldID0gbmV3VmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV07XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXRGb3JtQ29udHJvbCgpIHtcbiAgICAgICAgICB2YXIgc3RvcFdhaXRpbmdGb3JEZXN0cm95O1xuICAgICAgICAgIHZhciBtYXhUaW1lID0gMjAwMDtcbiAgICAgICAgICB2YXIgaW50ZXJ2YWxUaW1lID0gNTtcbiAgICAgICAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgICAgICAgdmFyIGludGVydmFsID0gJGludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGl0ZXJhdGlvbnMrKztcbiAgICAgICAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLm9wdGlvbnMua2V5KSkge1xuICAgICAgICAgICAgICByZXR1cm4gY2xlYW5VcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGZvcm1Db250cm9sID0gJHNjb3BlLmZvcm0gJiYgJHNjb3BlLmZvcm1bJHNjb3BlLmlkXTtcbiAgICAgICAgICAgIGlmIChmb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgICAkc2NvcGUub3B0aW9ucy5mb3JtQ29udHJvbCA9IGZvcm1Db250cm9sO1xuICAgICAgICAgICAgICBjbGVhblVwKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGludGVydmFsVGltZSAqIGl0ZXJhdGlvbnMgPiBtYXhUaW1lKSB7XG4gICAgICAgICAgICAgIGZvcm1seVdhcm4oXCJjb3VsZG50LXNldC10aGUtZm9ybWNvbnRyb2wtYWZ0ZXItdGltZW1zXCIsIFwiQ291bGRuJ3Qgc2V0IHRoZSBmb3JtQ29udHJvbCBhZnRlciBcIiArIG1heFRpbWUgKyBcIm1zXCIsICRzY29wZSk7XG4gICAgICAgICAgICAgIGNsZWFuVXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBpbnRlcnZhbFRpbWUpO1xuICAgICAgICAgIHN0b3BXYWl0aW5nRm9yRGVzdHJveSA9ICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCBjbGVhblVwKTtcblxuICAgICAgICAgIGZ1bmN0aW9uIGNsZWFuVXAoKSB7XG4gICAgICAgICAgICBzdG9wV2FpdGluZ0ZvckRlc3Ryb3koKTtcbiAgICAgICAgICAgICRpbnRlcnZhbC5jYW5jZWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfV0sXG4gICAgICBsaW5rOiBmdW5jdGlvbiBmaWVsZExpbmsoc2NvcGUsIGVsKSB7XG4gICAgICAgIGFwaUNoZWNrKHNjb3BlLm9wdGlvbnMpO1xuICAgICAgICBnZXRUZW1wbGF0ZShzY29wZS5vcHRpb25zKS50aGVuKHRyYW5zY2x1ZGVJbldyYXBwZXIoc2NvcGUub3B0aW9ucykpLnRoZW4oc2V0RWxlbWVudFRlbXBsYXRlKTtcblxuICAgICAgICBmdW5jdGlvbiBzZXRFbGVtZW50VGVtcGxhdGUodGVtcGxhdGVFbCkge1xuICAgICAgICAgIGVsLmh0bWwodGVtcGxhdGVFbC5odG1sKCkpO1xuICAgICAgICAgICRjb21waWxlKGVsLmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cblxuICAgIGZ1bmN0aW9uIGdldFRlbXBsYXRlKG9wdGlvbnMpIHtcbiAgICAgIHZhciB0ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGUgfHwgZm9ybWx5Q29uZmlnLmdldFRlbXBsYXRlKG9wdGlvbnMudHlwZSk7XG4gICAgICB2YXIgdGVtcGxhdGVVcmwgPSBvcHRpb25zLnRlbXBsYXRlVXJsIHx8IGZvcm1seUNvbmZpZy5nZXRUZW1wbGF0ZVVybChvcHRpb25zLnR5cGUpO1xuICAgICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICAgIHJldHVybiAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICAgIH0gZWxzZSBpZiAodGVtcGxhdGVVcmwpIHtcbiAgICAgICAgdmFyIGh0dHBPcHRpb25zID0geyBjYWNoZTogJHRlbXBsYXRlQ2FjaGUgfTtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCh0ZW1wbGF0ZVVybCwgaHR0cE9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgZm9ybWx5V2FybihcInByb2JsZW0tbG9hZGluZy10ZW1wbGF0ZS1mb3ItdGVtcGxhdGV1cmxcIiwgXCJQcm9ibGVtIGxvYWRpbmcgdGVtcGxhdGUgZm9yIFwiICsgdGVtcGxhdGVVcmwsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0RmllbGRFcnJvcihcInRlbXBsYXRlLXR5cGUtdHlwZS1ub3Qtc3VwcG9ydGVkXCIsIFwidGVtcGxhdGUgdHlwZSAnXCIgKyBvcHRpb25zLnR5cGUgKyBcIicgbm90IHN1cHBvcnRlZC4gT24gZWxlbWVudDpcIiwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNjbHVkZUluV3JhcHBlcihvcHRpb25zKSB7XG4gICAgICB2YXIgdGVtcGxhdGVXcmFwcGVyID0gZ2V0VGVtcGxhdGVXcmFwcGVyT3B0aW9uKG9wdGlvbnMpO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gdHJhbnNjbHVkZVRlbXBsYXRlKHRlbXBsYXRlKSB7XG4gICAgICAgIGlmICghdGVtcGxhdGVXcmFwcGVyKSB7XG4gICAgICAgICAgcmV0dXJuICRxLndoZW4oYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWx5VXNhYmlsaXR5LmNoZWNrV3JhcHBlcih0ZW1wbGF0ZVdyYXBwZXIpO1xuICAgICAgICBpZiAodGVtcGxhdGVXcmFwcGVyLnRlbXBsYXRlKSB7XG4gICAgICAgICAgZm9ybWx5VXNhYmlsaXR5LmNoZWNrV3JhcHBlclRlbXBsYXRlKHRlbXBsYXRlV3JhcHBlci50ZW1wbGF0ZSwgdGVtcGxhdGVXcmFwcGVyKTtcbiAgICAgICAgICByZXR1cm4gJHEud2hlbihkb1RyYW5zY2x1c2lvbih0ZW1wbGF0ZVdyYXBwZXIudGVtcGxhdGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgaHR0cE9wdGlvbnMgPSB7IGNhY2hlOiAkdGVtcGxhdGVDYWNoZSB9O1xuICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQodGVtcGxhdGVXcmFwcGVyLnVybCwgaHR0cE9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgd3JhcHBlciA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICBmb3JtbHlVc2FiaWxpdHkuY2hlY2tXcmFwcGVyVGVtcGxhdGUod3JhcHBlciwgdGVtcGxhdGVXcmFwcGVyKTtcbiAgICAgICAgICAgIHJldHVybiBkb1RyYW5zY2x1c2lvbih3cmFwcGVyKTtcbiAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgZm9ybWx5V2FybihcInByb3BsZW0tbG9hZGluZy10ZW1wbGF0ZS1mb3Itd3JhcHBlclwiLCBcIlByb2JsZW0gbG9hZGluZyB0ZW1wbGF0ZSBmb3Igd3JhcHBlclwiICsgSlNPTi5zdHJpbmdpZnkodGVtcGxhdGVXcmFwcGVyKSwgZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZG9UcmFuc2NsdXNpb24od3JhcHBlcikge1xuICAgICAgICAgIHZhciB3cmFwcGVyRWwgPSBhbmd1bGFyLmVsZW1lbnQod3JhcHBlcik7XG4gICAgICAgICAgdmFyIHRyYW5zY2x1ZGVFbCA9IHdyYXBwZXJFbC5maW5kKFwiZm9ybWx5LXRyYW5zY2x1ZGVcIik7XG4gICAgICAgICAgdHJhbnNjbHVkZUVsLnJlcGxhY2VXaXRoKHRlbXBsYXRlKTtcbiAgICAgICAgICByZXR1cm4gd3JhcHBlckVsO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRlbXBsYXRlV3JhcHBlck9wdGlvbihvcHRpb25zKSB7XG4gICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgICB2YXIgdGVtcGxhdGVPcHRpb24gPSBvcHRpb25zLndyYXBwZXI7XG4gICAgICAvLyBleHBsaWNpdCBudWxsIG1lYW5zIG5vIHdyYXBwZXJcbiAgICAgIGlmICh0ZW1wbGF0ZU9wdGlvbiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIH1cbiAgICAgIHZhciB0ZW1wbGF0ZVdyYXBwZXIgPSB0ZW1wbGF0ZU9wdGlvbjtcbiAgICAgIC8vIG5vdGhpbmcgc3BlY2lmaWVkIG1lYW5zIHVzZSB0aGUgZGVmYXVsdCB3cmFwcGVyXG4gICAgICBpZiAoIXRlbXBsYXRlT3B0aW9uKSB7XG4gICAgICAgIHRlbXBsYXRlV3JhcHBlciA9IGZvcm1seUNvbmZpZy5nZXRUZW1wbGF0ZVdyYXBwZXIoKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRlbXBsYXRlT3B0aW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIC8vIHN0cmluZyBtZWFucyBpdCdzIGEgdHlwZVxuICAgICAgICB0ZW1wbGF0ZVdyYXBwZXIgPSBmb3JtbHlDb25maWcuZ2V0VGVtcGxhdGVXcmFwcGVyKHRlbXBsYXRlT3B0aW9uKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0ZW1wbGF0ZVdyYXBwZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBpQ2hlY2sob3B0aW9ucykge1xuICAgICAgdmFyIHRlbXBsYXRlT3B0aW9ucyA9IGdldFRlbXBsYXRlT3B0aW9uc0NvdW50KG9wdGlvbnMpO1xuICAgICAgaWYgKHRlbXBsYXRlT3B0aW9ucyA9PT0gMCkge1xuICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0RmllbGRFcnJvcihcInlvdS1tdXN0LXByb3ZpZGUtb25lLW9mLXR5cGUtdGVtcGxhdGUtb3ItdGVtcGxhdGV1cmwtZm9yLWEtZmllbGRcIiwgXCJZb3UgbXVzdCBwcm92aWRlIG9uZSBvZiB0eXBlLCB0ZW1wbGF0ZSwgb3IgdGVtcGxhdGVVcmwgZm9yIGEgZmllbGRcIiwgb3B0aW9ucyk7XG4gICAgICB9IGVsc2UgaWYgKHRlbXBsYXRlT3B0aW9ucyA+IDEpIHtcbiAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZpZWxkRXJyb3IoXCJ5b3UtbXVzdC1vbmx5LXByb3ZpZGUtYS10eXBlLXRlbXBsYXRlLW9yLXRlbXBsYXRldXJsLWZvci1hLWZpZWxkXCIsIFwiWW91IG11c3Qgb25seSBwcm92aWRlIGEgdHlwZSwgdGVtcGxhdGUsIG9yIHRlbXBsYXRlVXJsIGZvciBhIGZpZWxkXCIsIG9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRUZW1wbGF0ZU9wdGlvbnNDb3VudChvcHRpb25zKSB7XG4gICAgICAgIHZhciB0ZW1wbGF0ZU9wdGlvbnMgPSAwO1xuICAgICAgICB0ZW1wbGF0ZU9wdGlvbnMgKz0gYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy50ZW1wbGF0ZSkgPyAxIDogMDtcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zICs9IGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudHlwZSkgPyAxIDogMDtcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zICs9IGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudGVtcGxhdGVVcmwpID8gMSA6IDA7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZU9wdGlvbnM7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZvcm1seUZpZWxkLiRpbmplY3QgPSBbXCIkaHR0cFwiLCBcIiRxXCIsIFwiJGNvbXBpbGVcIiwgXCIkdGVtcGxhdGVDYWNoZVwiLCBcImZvcm1seUNvbmZpZ1wiLCBcImZvcm1seVV0aWxcIiwgXCJmb3JtbHlVc2FiaWxpdHlcIiwgXCJmb3JtbHlXYXJuXCJdO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGlyZWN0aXZlcy9mb3JtbHktZmllbGQuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdG9BcnJheSA9IGZ1bmN0aW9uIChhcnIpIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyKSA/IGFyciA6IEFycmF5LmZyb20oYXJyKTsgfTtcblxudmFyIF9zbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXItZml4XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5kaXJlY3RpdmUoXCJmb3JtbHlGb3JtXCIsIGZvcm1seUZvcm0pO1xuXG4gIGZvcm1seUZvcm0udGVzdHMgPSBPTl9URVNUID8gcmVxdWlyZShcIi4vZm9ybWx5LWZvcm0udGVzdFwiKShuZ01vZHVsZSkgOiBudWxsO1xuXG4gIGZ1bmN0aW9uIGZvcm1seUZvcm0oKSB7XG4gICAgdmFyIGN1cnJlbnRGb3JtSWQgPSAxO1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogXCJFXCIsXG4gICAgICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vZm9ybWx5LWZvcm0uaHRtbFwiKSxcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgZmllbGRzOiBcIj1cIixcbiAgICAgICAgbW9kZWw6IFwiPVwiLFxuICAgICAgICBmb3JtOiBcIj0/XCJcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBbXCIkc2NvcGVcIiwgXCJmb3JtbHlVc2FiaWxpdHlcIiwgZnVuY3Rpb24gKCRzY29wZSwgZm9ybWx5VXNhYmlsaXR5KSB7XG4gICAgICAgICRzY29wZS5mb3JtSWQgPSBcImZvcm1seV9cIiArIGN1cnJlbnRGb3JtSWQrKztcblxuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgYXR0YWNoS2V5KTsgLy8gYXR0YWNoZXMgYSBrZXkgYmFzZWQgb24gdGhlIGluZGV4IGlmIGEga2V5IGlzbid0IHNwZWNpZmllZFxuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgc2V0dXBXYXRjaGVycyk7IC8vIHNldHVwIHdhdGNoZXJzIGZvciBhbGwgZmllbGRzXG5cbiAgICAgICAgLy8gd2F0Y2ggdGhlIG1vZGVsIGFuZCBldmFsdWF0ZSB3YXRjaCBleHByZXNzaW9ucyB0aGF0IGRlcGVuZCBvbiBpdC5cbiAgICAgICAgJHNjb3BlLiR3YXRjaChcIm1vZGVsXCIsIGZ1bmN0aW9uIG9uUmVzdWx0VXBkYXRlKG5ld1Jlc3VsdCkge1xuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgICAgIC8qanNoaW50IC1XMDMwICovXG4gICAgICAgICAgICBmaWVsZC5ydW5FeHByZXNzaW9ucyAmJiBmaWVsZC5ydW5FeHByZXNzaW9ucyhuZXdSZXN1bHQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICBmdW5jdGlvbiBhdHRhY2hLZXkoZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgZmllbGQua2V5ID0gZmllbGQua2V5IHx8IGluZGV4IHx8IDA7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXR1cFdhdGNoZXJzKGZpZWxkLCBpbmRleCkge1xuICAgICAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZmllbGQud2F0Y2hlcikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHdhdGNoZXJzID0gZmllbGQud2F0Y2hlcjtcbiAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNBcnJheSh3YXRjaGVycykpIHtcbiAgICAgICAgICAgIHdhdGNoZXJzID0gW3dhdGNoZXJzXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHdhdGNoZXJzLCBmdW5jdGlvbiAod2F0Y2hlcikge1xuICAgICAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZCh3YXRjaGVyLmxpc3RlbmVyKSkge1xuICAgICAgICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0RmllbGRFcnJvcihcImFsbC1maWVsZC13YXRjaGVycy1tdXN0LWhhdmUtYS1saXN0ZW5lclwiLCBcIkFsbCBmaWVsZCB3YXRjaGVycyBtdXN0IGhhdmUgYSBsaXN0ZW5lclwiLCBmaWVsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgd2F0Y2hFeHByZXNzaW9uID0gZ2V0V2F0Y2hFeHByZXNzaW9uKHdhdGNoZXIsIGZpZWxkLCBpbmRleCk7XG4gICAgICAgICAgICB2YXIgd2F0Y2hMaXN0ZW5lciA9IGdldFdhdGNoTGlzdGVuZXIod2F0Y2hlciwgZmllbGQsIGluZGV4KTtcblxuICAgICAgICAgICAgdmFyIHR5cGUgPSB3YXRjaGVyLnR5cGUgfHwgXCIkd2F0Y2hcIjtcbiAgICAgICAgICAgIHdhdGNoZXIuc3RvcFdhdGNoaW5nID0gJHNjb3BlW3R5cGVdKHdhdGNoRXhwcmVzc2lvbiwgd2F0Y2hMaXN0ZW5lciwgd2F0Y2hlci53YXRjaERlZXApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0V2F0Y2hFeHByZXNzaW9uKHdhdGNoZXIsIGZpZWxkLCBpbmRleCkge1xuICAgICAgICAgIHZhciB3YXRjaEV4cHJlc3Npb24gPSB3YXRjaGVyLmV4cHJlc3Npb24gfHwgXCJtb2RlbFsnXCIgKyBmaWVsZC5rZXkgKyBcIiddXCI7XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih3YXRjaEV4cHJlc3Npb24pKSB7XG4gICAgICAgICAgICAvLyB3cmFwIHRoZSBmaWVsZCdzIHdhdGNoIGV4cHJlc3Npb24gc28gd2UgY2FuIGNhbGwgaXQgd2l0aCB0aGUgZmllbGQgYXMgdGhlIGZpcnN0IGFyZ1xuICAgICAgICAgICAgLy8gYW5kIHRoZSBzdG9wIGZ1bmN0aW9uIGFzIHRoZSBsYXN0IGFyZyBhcyBhIGhlbHBlclxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsRXhwcmVzc2lvbiA9IHdhdGNoRXhwcmVzc2lvbjtcbiAgICAgICAgICAgIHdhdGNoRXhwcmVzc2lvbiA9IGZ1bmN0aW9uIGZvcm1seVdhdGNoRXhwcmVzc2lvbigpIHtcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBtb2RpZnlBcmdzLmFwcGx5KHVuZGVmaW5lZCwgW3dhdGNoZXIsIGluZGV4XS5jb25jYXQoX3NsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxFeHByZXNzaW9uLmFwcGx5KHVuZGVmaW5lZCwgX3RvQXJyYXkoYXJncykpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdhdGNoRXhwcmVzc2lvbi5kaXNwbGF5TmFtZSA9IFwiRm9ybWx5IFdhdGNoIEV4cHJlc3Npb24gZm9yIGZpZWxkIGZvciBcIiArIGZpZWxkLmtleTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHdhdGNoRXhwcmVzc2lvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFdhdGNoTGlzdGVuZXIod2F0Y2hlciwgZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgdmFyIHdhdGNoTGlzdGVuZXIgPSB3YXRjaGVyLmxpc3RlbmVyO1xuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24od2F0Y2hMaXN0ZW5lcikpIHtcbiAgICAgICAgICAgIC8vIHdyYXAgdGhlIGZpZWxkJ3Mgd2F0Y2ggbGlzdGVuZXIgc28gd2UgY2FuIGNhbGwgaXQgd2l0aCB0aGUgZmllbGQgYXMgdGhlIGZpcnN0IGFyZ1xuICAgICAgICAgICAgLy8gYW5kIHRoZSBzdG9wIGZ1bmN0aW9uIGFzIHRoZSBsYXN0IGFyZyBhcyBhIGhlbHBlclxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsTGlzdGVuZXIgPSB3YXRjaExpc3RlbmVyO1xuICAgICAgICAgICAgd2F0Y2hMaXN0ZW5lciA9IGZ1bmN0aW9uIGZvcm1seVdhdGNoTGlzdGVuZXIoKSB7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gbW9kaWZ5QXJncy5hcHBseSh1bmRlZmluZWQsIFt3YXRjaGVyLCBpbmRleF0uY29uY2F0KF9zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsTGlzdGVuZXIuYXBwbHkodW5kZWZpbmVkLCBfdG9BcnJheShhcmdzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2F0Y2hMaXN0ZW5lci5kaXNwbGF5TmFtZSA9IFwiRm9ybWx5IFdhdGNoIExpc3RlbmVyIGZvciBmaWVsZCBmb3IgXCIgKyBmaWVsZC5rZXk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB3YXRjaExpc3RlbmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbW9kaWZ5QXJncyh3YXRjaGVyLCBpbmRleCkge1xuICAgICAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBvcmlnaW5hbEFyZ3MgPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgICBvcmlnaW5hbEFyZ3NbX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBbJHNjb3BlLmZpZWxkc1tpbmRleF1dLmNvbmNhdChfdG9BcnJheShvcmlnaW5hbEFyZ3MpLCBbd2F0Y2hlci5zdG9wV2F0Y2hpbmddKTtcbiAgICAgICAgfVxuICAgICAgfV1cbiAgICB9O1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyLWZpeFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZmFjdG9yeShcImZvcm1seVV0aWxcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBmb3JtbHlFdmFsOiBmb3JtbHlFdmFsLFxuICAgICAgZ2V0RmllbGRJZDogZ2V0RmllbGRJZFxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBmb3JtbHlFdmFsKHNjb3BlLCBleHByZXNzaW9uLCBtb2RlbFZhbHVlLCB2aWV3VmFsdWUpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZXhwcmVzc2lvbikpIHtcbiAgICAgICAgcmV0dXJuIGV4cHJlc3Npb24odmlld1ZhbHVlLCBtb2RlbFZhbHVlLCBzY29wZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2NvcGUuJGV2YWwoZXhwcmVzc2lvbiwge1xuICAgICAgICAgICR2aWV3VmFsdWU6IHZpZXdWYWx1ZSxcbiAgICAgICAgICAkbW9kZWxWYWx1ZTogbW9kZWxWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWVsZElkKGZvcm1JZCwgb3B0aW9ucywgaW5kZXgpIHtcbiAgICAgIHZhciB0eXBlID0gb3B0aW9ucy50eXBlO1xuICAgICAgaWYgKCF0eXBlICYmIG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICAgICAgdHlwZSA9IFwidGVtcGxhdGVcIjtcbiAgICAgIH0gZWxzZSBpZiAoIXR5cGUgJiYgb3B0aW9ucy50ZW1wbGF0ZVVybCkge1xuICAgICAgICB0eXBlID0gXCJ0ZW1wbGF0ZVVybFwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW2Zvcm1JZCwgdHlwZSwgb3B0aW9ucy5rZXksIGluZGV4XS5qb2luKFwiX1wiKTtcbiAgICB9XG4gIH0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2VydmljZXMvZm9ybWx5VXRpbC5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF90b0FycmF5ID0gZnVuY3Rpb24gKGFycikgeyByZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpID8gYXJyIDogQXJyYXkuZnJvbShhcnIpOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5mYWN0b3J5KFwiZm9ybWx5V2FyblwiLCBbXCJmb3JtbHlDb25maWdcIiwgXCJmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4XCIsIFwiJGxvZ1wiLCBmdW5jdGlvbiAoZm9ybWx5Q29uZmlnLCBmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LCAkbG9nKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgICBpZiAoIWZvcm1seUNvbmZpZy5kaXNhYmxlV2FybmluZ3MpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICB2YXIgd2FybkluZm9TbHVnID0gYXJncy5zaGlmdCgpO1xuICAgICAgICBhcmdzLnVuc2hpZnQoXCJGb3JtbHkgV2FybmluZzpcIik7XG4gICAgICAgIGFyZ3MucHVzaChcIlwiICsgZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCArIFwiXCIgKyB3YXJuSW5mb1NsdWcpO1xuICAgICAgICAkbG9nLndhcm4uYXBwbHkoJGxvZywgX3RvQXJyYXkoYXJncykpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NlcnZpY2VzL2Zvcm1seVdhcm4uanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuZy1mb3JtIGNsYXNzPVxcXCJmb3JtbHlcXFwiXFxuICAgICAgICAgbmFtZT1cXFwiZm9ybVxcXCJcXG4gICAgICAgICByb2xlPVxcXCJmb3JtXFxcIj5cXG4gIDxkaXYgZm9ybWx5LWZpZWxkXFxuICAgICAgIG5nLXJlcGVhdD1cXFwiZmllbGQgaW4gZmllbGRzIHRyYWNrIGJ5ICRpbmRleFxcXCJcXG4gICAgICAgbmctaWY9XFxcIiFmaWVsZC5oaWRlXFxcIlxcbiAgICAgICBjbGFzcz1cXFwiZm9ybWx5LWZpZWxkXFxcIlxcbiAgICAgICBvcHRpb25zPVxcXCJmaWVsZFxcXCJcXG4gICAgICAgbW9kZWw9XFxcImZpZWxkLm1vZGVsIHx8IG1vZGVsXFxcIlxcbiAgICAgICBmaWVsZHM9XFxcImZpZWxkc1xcXCJcXG4gICAgICAgZm9ybT1cXFwiZm9ybVxcXCJcXG4gICAgICAgZm9ybS1pZD1cXFwiZm9ybUlkXFxcIlxcbiAgICAgICBpbmRleD1cXFwiJGluZGV4XFxcIj5cXG4gIDwvZGl2PlxcbiAgPGRpdiBuZy10cmFuc2NsdWRlPjwvZGl2PlxcbjwvbmctZm9ybT5cXG5cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZm9ybWx5LmpzIn0=