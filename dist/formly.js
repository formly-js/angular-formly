// angular-formly version 3.0.0 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

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
	  __webpack_require__(10)(ngModule);
	  __webpack_require__(11)(ngModule);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(12)(ngModule);
	  __webpack_require__(13)(ngModule);
	  __webpack_require__(14)(ngModule);
	  __webpack_require__(15)(ngModule);
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
	      if (arguments.length < 3) {
	        field = message;
	        message = errorInfoSlug;
	        errorInfoSlug = null;
	      }
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
	      var formlyTransclude = "<formly-transclude></formly-transclude>";
	      if (template.indexOf(formlyTransclude) === -1) {
	        throw getFormlyError("Template wrapper templates must use \"" + formlyTransclude + "\" somewhere in them. " + ("This one does not have \"<formly-transclude></formly-transclude>\" in it: " + template) + "\n" + ("Additional information: " + JSON.stringify(additionalInfo)));
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
	
	
	    var typeMap = {};
	    var templateWrappersMap = {};
	    var defaultWrapperName = "default";
	    var _this = this;
	    var getError = formlyUsabilityProvider.getFormlyError;
	
	    angular.extend(this, {
	      setType: setType,
	      getType: getType,
	      setWrapper: setWrapper,
	      getWrapper: getWrapper,
	      getWrapperByType: getWrapperByType,
	      disableWarnings: false,
	      $get: function () {
	        return _this2;
	      }
	    });
	
	    function setType(options) {
	      if (angular.isArray(options)) {
	        angular.forEach(options, setType);
	      } else if (angular.isObject(options)) {
	        checkType(options);
	        typeMap[options.type] = options;
	      } else {
	        throw getError("You must provide an object or array for setType. You provided: " + JSON.stringify(arguments));
	      }
	    }
	
	    function getType(type) {
	      return typeMap[type];
	    }
	
	    function checkType(options) {
	      if (!options.type) {
	        throw getError("You must provide a type for setType. You provided: " + JSON.stringify(arguments));
	      } else if (!options.template && !options.templateUrl) {
	        throw getError("You must provide a template OR templateUrl for setType. You provided neither: " + JSON.stringify(arguments));
	      } else if (options.template && options.templateUrl) {
	        throw getError("You must provide a template OR templateUrl for setType. You provided both: " + JSON.stringify(arguments));
	      }
	      checkOverwrite(options.type, typeMap, options, "types");
	    }
	
	    function setWrapper(options, name) {
	      if (angular.isArray(options)) {
	        return options.map(function (wrapperOptions) {
	          return setWrapper(wrapperOptions);
	        });
	      } else if (angular.isObject(options)) {
	        options.types = getOptionsTypes(options);
	        options.name = getOptionsName(options, name);
	        checkWrapperAPI(options);
	        templateWrappersMap[options.name] = options;
	        return options;
	      } else if (angular.isString(options)) {
	        return setWrapper({
	          template: options,
	          name: name
	        });
	      }
	    }
	
	    function getOptionsTypes(options) {
	      if (angular.isString(options.types)) {
	        return [options.types];
	      }
	      if (!angular.isDefined(options.types)) {
	        return [];
	      } else {
	        return options.types;
	      }
	    }
	
	    function getOptionsName(options, name) {
	      return options.name || name || options.types.join(" ") || defaultWrapperName;
	    }
	
	    function checkWrapperAPI(options) {
	      formlyUsabilityProvider.checkWrapper(options);
	      if (options.template) {
	        formlyUsabilityProvider.checkWrapperTemplate(options.template, options);
	      }
	      checkOverwrite(options.name, templateWrappersMap, options, "templateWrappers");
	      checkWrapperTypes(options);
	    }
	
	    function checkWrapperTypes(options) {
	      var shouldThrow = !angular.isArray(options.types) || !options.types.every(angular.isString);
	      if (shouldThrow) {
	        throw getError("Attempted to create a template wrapper with types that is not a string or an array of strings");
	      }
	      var wrapperWithSameType = options.types.some(getWrapperByType);
	      if (wrapperWithSameType) {
	        throw getError(["Attempted to create a template wrapper with types that have already been specified for another template.", "Original wrapper: " + JSON.stringify(wrapperWithSameType) + ", you specified: " + JSON.stringify(options)].join(" "));
	      }
	    }
	
	    function checkOverwrite(property, object, newValue, objectName) {
	      if (object.hasOwnProperty(property)) {
	        warn(["Attempting to overwrite " + property + " on " + objectName + " which is currently", "" + JSON.stringify(object[property]) + " with " + JSON.stringify(newValue)].join(" "));
	      }
	    }
	
	    function getWrapper(name) {
	      return templateWrappersMap[name || defaultWrapperName];
	    }
	
	    function getWrapperByType(type) {
	      for (var name in templateWrappersMap) {
	        if (templateWrappersMap.hasOwnProperty(name)) {
	          if (templateWrappersMap[name].types && templateWrappersMap[name].types.indexOf(type) !== -1) {
	            return templateWrappersMap[name];
	          }
	        }
	      }
	    }
	
	    function warn() {
	      if (!_this.disableWarnings) {
	        console.warn.apply(console, arguments);
	      }
	    }
	
	  }
	  formlyConfig.$inject = ["formlyUsabilityProvider"];
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyVersion", ("3.0.0"));
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
	        apiCheck($scope.options);
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
	        getFieldTemplate(scope.options).then(transcludeInWrapper(scope.options)).then(setElementTemplate);
	
	        function setElementTemplate(templateEl) {
	          el.html(asHtml(templateEl));
	          $compile(el.contents())(scope);
	        }
	      }
	    };
	
	    function asHtml(el) {
	      var wrapper = angular.element("<a></a>");
	      return wrapper.append(el).html();
	    }
	
	    function getFieldTemplate(options) {
	      var type = formlyConfig.getType(options.type);
	      var template = options.template || type.template;
	      var templateUrl = options.templateUrl || type.templateUrl;
	      if (!template && !templateUrl) {
	        throw formlyUsability.getFieldError("template-type-type-not-supported", "template type '" + options.type + "' not supported. On element:", options);
	      }
	      return getTemplate(template || templateUrl, !template);
	    }
	
	
	    function getTemplate(template, isUrl) {
	      if (template) {
	        return $q.when(template);
	      } else if (isUrl) {
	        var httpOptions = { cache: $templateCache };
	        return $http.get(template, httpOptions).then(function (response) {
	          return response.data;
	        })["catch"](function (error) {
	          formlyWarn("problem-loading-template-for-templateurl", "Problem loading template for " + template, error);
	        });
	      }
	    }
	
	    function transcludeInWrapper(options) {
	      var wrapper = getWrapperOption(options);
	
	      return function transcludeTemplate(template) {
	        if (!wrapper) {
	          return $q.when(angular.element(template));
	        } else if (angular.isArray(wrapper)) {
	          var promises = wrapper.map(function (w) {
	            return getTemplate(w.template || w.templateUrl, !w.template);
	          });
	          return $q.all(promises).then(function (wrappers) {
	            wrappers.reverse(); // wrapper 0 is wrapped in wrapper 1 and so on...
	            var totalWrapper = wrappers.shift();
	            angular.forEach(wrappers, function (wrapper) {
	              totalWrapper = doTransclusion(totalWrapper, wrapper);
	            });
	            return doTransclusion(totalWrapper, template);
	          });
	        } else {
	          formlyUsability.checkWrapper(wrapper);
	          var t = wrapper.template || wrapper.templateUrl;
	          return getTemplate(t, !wrapper.template).then(function (wrapperTemplate) {
	            formlyUsability.checkWrapperTemplate(wrapperTemplate, wrapper);
	            return doTransclusion(wrapperTemplate, template);
	          });
	        }
	      };
	    }
	
	    function doTransclusion(wrapper, template) {
	      var wrapperEl = angular.element(wrapper);
	      var transcludeEl = wrapperEl.find("formly-transclude");
	      transcludeEl.replaceWith(template);
	      return wrapperEl;
	    }
	
	    function getWrapperOption(options) {
	      /* jshint maxcomplexity:6 */
	      var templateOption = options.wrapper;
	      // explicit null means no wrapper
	      if (templateOption === null) {
	        return "";
	      }
	      var wrapper = templateOption;
	      // nothing specified means use the default wrapper for the type
	      if (!templateOption) {
	        wrapper = formlyConfig.getWrapperByType(options.type) || formlyConfig.getWrapper();
	      } else if (angular.isString(templateOption)) {
	        // string means it's a type
	        wrapper = formlyConfig.getWrapper(templateOption);
	      } else if (angular.isArray(templateOption)) {
	        // array means wrap the wrappers
	        wrapper = templateOption.map(function (wrapperName) {
	          return formlyConfig.getWrapper(wrapperName);
	        });
	      }
	      return wrapper;
	    }
	
	    function apiCheck(options) {
	      var templateOptions = getTemplateOptionsCount(options);
	      if (templateOptions === 0) {
	        throw formlyUsability.getFieldError("you-must-provide-one-of-type-template-or-templateurl-for-a-field", "You must provide one of type, template, or templateUrl for a field", options);
	      } else if (templateOptions > 1) {
	        throw formlyUsability.getFieldError("you-must-only-provide-a-type-template-or-templateurl-for-a-field", "You must only provide a type, template, or templateUrl for a field", options);
	      }
	
	      // check that only allowed properties are provided
	      var allowedProperties = ["type", "template", "templateUrl", "key", "model", "expressionProperties", "data", "templateOptions", "wrapper", "modelOptions", "watcher", "validators"];
	      var extraProps = Object.keys(options).filter(function (prop) {
	        return allowedProperties.indexOf(prop) === -1;
	      });
	      if (extraProps.length) {
	        throw formlyUsability.getFieldError("You have specified field properties that are not allowed: " + JSON.stringify(extraProps.join(", ")), options);
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toArray = function (arr) { return Array.isArray(arr) ? arr : Array.from(arr); };
	
	var _slice = Array.prototype.slice;
	var angular = __webpack_require__(1);
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyForm", formlyForm);
	
	  formlyForm.tests = false ? require("./formly-form.test")(ngModule) : null;
	
	  function formlyForm(formlyUsability) {
	    var currentFormId = 1;
	    return {
	      restrict: "E",
	      template: __webpack_require__(16),
	      replace: true,
	      transclude: true,
	      scope: {
	        fields: "=",
	        model: "=?", // we'll do our own warning to help with migrations
	        form: "=?"
	      },
	      controller: ["$scope", function ($scope) {
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
	      }],
	      link: function (scope, el, attrs) {
	        if (attrs.hasOwnProperty("result")) {
	          throw formlyUsability.getFormlyError("The \"result\" attribute on a formly-form is no longer valid. Use \"model\" instead");
	        }
	        if (attrs.name !== "form") {
	          // then they specified their own name
	          throw formlyUsability.getFormlyError("The \"name\" attribute on a formly-form is no longer valid. Use \"form\" instead");
	        }
	        if (!attrs.hasOwnProperty("model") || !scope.model) {
	          throw formlyUsability.getFormlyError("The \"model\" attribute is required on a formly-form.");
	        }
	      }
	    };
	  }
	  formlyForm.$inject = ["formlyUsability"];
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ng-form class=\"formly\"\n         name=\"form\"\n         role=\"form\">\n  <div formly-field\n       ng-repeat=\"field in fields track by $index\"\n       ng-if=\"!field.hide\"\n       class=\"formly-field\"\n       options=\"field\"\n       model=\"field.model || model\"\n       fields=\"fields\"\n       form=\"form\"\n       form-id=\"formId\"\n       index=\"$index\">\n  </div>\n  <div ng-transclude></div>\n</ng-form>\n"

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4ZWM0OTk2NjhjMjRjY2YxMDE3YyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hbmd1bGFyLWZpeC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seVVzYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlWZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2Zvcm1seVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvZm9ybWx5V2Fybi5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1keW5hbWljLW5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9mb3JtbHktZmllbGQuanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9mb3JtbHktZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUN0Q0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsK0I7Ozs7OztBQ1hBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCOzs7Ozs7QUNSQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDUEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDTEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ1BBLGdEOzs7Ozs7QUNBQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsRzs7Ozs7O0FDM0RBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDM0lBOztBQUVBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNKQTs7QUFFQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDSkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsRzs7Ozs7O0FDakNBOztBQUVBLGdDQUErQixtREFBbUQ7O0FBRWxGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsRzs7Ozs7O0FDaEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsRzs7Ozs7O0FDL0JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLElBQUc7QUFDSCxHOzs7Ozs7QUNkQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQSxZQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0EsZ0NBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBLFlBQVc7QUFDWCxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDaE9BOztBQUVBLGdDQUErQixtREFBbUQ7O0FBRWxGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUEsbURBQWtEO0FBQ2xELHVEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWCxVQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUdBQW9HLGFBQWE7QUFDakg7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ25IQSxpYyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiYW5ndWxhclwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJuZ0Zvcm1seVwiXSA9IGZhY3RvcnkocmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm5nRm9ybWx5XCJdID0gZmFjdG9yeShyb290W1wiYW5ndWxhclwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzVfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDhlYzQ5OTY2OGMyNGNjZjEwMTdjXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBuZ01vZHVsZU5hbWUgPSBcImZvcm1seVwiO1xuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyLWZpeFwiKTtcbnZhciBuZ01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5nTW9kdWxlTmFtZSwgW10pO1xuXG5yZXF1aXJlKFwiLi9wcm92aWRlcnNcIikobmdNb2R1bGUpO1xucmVxdWlyZShcIi4vc2VydmljZXNcIikobmdNb2R1bGUpO1xucmVxdWlyZShcIi4vZGlyZWN0aXZlc1wiKShuZ01vZHVsZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGVOYW1lO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBzb21lIHZlcnNpb25zIG9mIGFuZ3VsYXIgZG9uJ3QgZXhwb3J0IHRoZSBhbmd1bGFyIG1vZHVsZSBwcm9wZXJseSxcbi8vIHNvIHdlIGdldCBpdCBmcm9tIHdpbmRvdyBpbiB0aGlzIGNhc2UuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xuaWYgKCFhbmd1bGFyLnZlcnNpb24pIHtcbiAgYW5ndWxhciA9IHdpbmRvdy5hbmd1bGFyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hbmd1bGFyLWZpeC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICByZXF1aXJlKFwiLi9mb3JtbHlVc2FiaWxpdHlcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHlDb25maWdcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHlWZXJzaW9uXCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeFwiKShuZ01vZHVsZSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgcmVxdWlyZShcIi4vZm9ybWx5VXRpbFwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seVdhcm5cIikobmdNb2R1bGUpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2VydmljZXMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgcmVxdWlyZShcIi4vZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uXCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5LWR5bmFtaWMtbmFtZVwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seS1maWVsZFwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seS1mb3JtXCIpKG5nTW9kdWxlKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RpcmVjdGl2ZXMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhci1maXhcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLnByb3ZpZGVyKFwiZm9ybWx5VXNhYmlsaXR5XCIsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBlcnJvcnNBbmRXYXJuaW5nc1VybFByZWZpeCA9IFwiaHR0cHM6Ly9naXRodWIuY29tL2Zvcm1seS1qcy9hbmd1bGFyLWZvcm1seS93aWtpL0Vycm9ycy1hbmQtV2FybmluZ3MjXCI7XG4gICAgYW5ndWxhci5leHRlbmQodGhpcywge1xuICAgICAgZ2V0Rm9ybWx5RXJyb3I6IGdldEZvcm1seUVycm9yLFxuICAgICAgZ2V0RmllbGRFcnJvcjogZ2V0RmllbGRFcnJvcixcbiAgICAgIGNoZWNrV3JhcHBlcjogY2hlY2tXcmFwcGVyLFxuICAgICAgY2hlY2tXcmFwcGVyVGVtcGxhdGU6IGNoZWNrV3JhcHBlclRlbXBsYXRlLFxuICAgICAgJGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBnZXRGaWVsZEVycm9yKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UsIGZpZWxkKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgZmllbGQgPSBtZXNzYWdlO1xuICAgICAgICBtZXNzYWdlID0gZXJyb3JJbmZvU2x1ZztcbiAgICAgICAgZXJyb3JJbmZvU2x1ZyA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSArIChcIiBGaWVsZCBkZWZpbml0aW9uOiBcIiArIGFuZ3VsYXIudG9Kc29uKGZpZWxkKSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZvcm1seUVycm9yKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpIHtcbiAgICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3JJbmZvU2x1ZztcbiAgICAgICAgZXJyb3JJbmZvU2x1ZyA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RXJyb3JNZXNzYWdlKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpIHtcbiAgICAgIHZhciB1cmwgPSBcIlwiO1xuICAgICAgaWYgKGVycm9ySW5mb1NsdWcgIT09IG51bGwpIHtcbiAgICAgICAgdXJsID0gXCJcIiArIGVycm9yc0FuZFdhcm5pbmdzVXJsUHJlZml4ICsgXCJcIiArIGVycm9ySW5mb1NsdWc7XG4gICAgICB9XG4gICAgICByZXR1cm4gXCJGb3JtbHkgRXJyb3I6IFwiICsgbWVzc2FnZSArIFwiLiBcIiArIHVybDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dyYXBwZXIod3JhcHBlcikge1xuICAgICAgaWYgKHdyYXBwZXIudGVtcGxhdGUgJiYgd3JhcHBlci51cmwpIHtcbiAgICAgICAgdGhyb3cgZ2V0Rm9ybWx5RXJyb3IoXCJUZW1wbGF0ZSB3cmFwcGVycyBjYW4gb25seSBoYXZlIGEgdXJsIG9yIGEgdGVtcGxhdGUuIFwiICsgKFwiVGhpcyBvbmUgcHJvdmlkZWQgYm90aDogXCIgKyBKU09OLnN0cmluZ2lmeSh3cmFwcGVyKSkpO1xuICAgICAgfVxuICAgICAgaWYgKCF3cmFwcGVyLnRlbXBsYXRlICYmICF3cmFwcGVyLnVybCkge1xuICAgICAgICB0aHJvdyBnZXRGb3JtbHlFcnJvcihcIlRlbXBsYXRlIHdyYXBwZXJzIG11c3QgaGF2ZSBvbmUgb2YgYSB1cmwgb3IgYSB0ZW1wbGF0ZS4gXCIgKyAoXCJUaGlzIG9uZSBwcm92aWRlZCBuZWl0aGVyOiBcIiArIEpTT04uc3RyaW5naWZ5KHdyYXBwZXIpKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyVGVtcGxhdGUodGVtcGxhdGUsIGFkZGl0aW9uYWxJbmZvKSB7XG4gICAgICB2YXIgZm9ybWx5VHJhbnNjbHVkZSA9IFwiPGZvcm1seS10cmFuc2NsdWRlPjwvZm9ybWx5LXRyYW5zY2x1ZGU+XCI7XG4gICAgICBpZiAodGVtcGxhdGUuaW5kZXhPZihmb3JtbHlUcmFuc2NsdWRlKSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgZ2V0Rm9ybWx5RXJyb3IoXCJUZW1wbGF0ZSB3cmFwcGVyIHRlbXBsYXRlcyBtdXN0IHVzZSBcXFwiXCIgKyBmb3JtbHlUcmFuc2NsdWRlICsgXCJcXFwiIHNvbWV3aGVyZSBpbiB0aGVtLiBcIiArIChcIlRoaXMgb25lIGRvZXMgbm90IGhhdmUgXFxcIjxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPlxcXCIgaW4gaXQ6IFwiICsgdGVtcGxhdGUpICsgXCJcXG5cIiArIChcIkFkZGl0aW9uYWwgaW5mb3JtYXRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkoYWRkaXRpb25hbEluZm8pKSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Byb3ZpZGVycy9mb3JtbHlVc2FiaWxpdHkuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhci1maXhcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLnByb3ZpZGVyKFwiZm9ybWx5Q29uZmlnXCIsIGZvcm1seUNvbmZpZyk7XG5cbiAgZm9ybWx5Q29uZmlnLnRlc3RzID0gT05fVEVTVCA/IHJlcXVpcmUoXCIuL2Zvcm1seUNvbmZpZy50ZXN0XCIpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZm9ybWx5Q29uZmlnKGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cblxuICAgIHZhciB0eXBlTWFwID0ge307XG4gICAgdmFyIHRlbXBsYXRlV3JhcHBlcnNNYXAgPSB7fTtcbiAgICB2YXIgZGVmYXVsdFdyYXBwZXJOYW1lID0gXCJkZWZhdWx0XCI7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgZ2V0RXJyb3IgPSBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5nZXRGb3JtbHlFcnJvcjtcblxuICAgIGFuZ3VsYXIuZXh0ZW5kKHRoaXMsIHtcbiAgICAgIHNldFR5cGU6IHNldFR5cGUsXG4gICAgICBnZXRUeXBlOiBnZXRUeXBlLFxuICAgICAgc2V0V3JhcHBlcjogc2V0V3JhcHBlcixcbiAgICAgIGdldFdyYXBwZXI6IGdldFdyYXBwZXIsXG4gICAgICBnZXRXcmFwcGVyQnlUeXBlOiBnZXRXcmFwcGVyQnlUeXBlLFxuICAgICAgZGlzYWJsZVdhcm5pbmdzOiBmYWxzZSxcbiAgICAgICRnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHNldFR5cGUob3B0aW9ucykge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2gob3B0aW9ucywgc2V0VHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgICAgY2hlY2tUeXBlKG9wdGlvbnMpO1xuICAgICAgICB0eXBlTWFwW29wdGlvbnMudHlwZV0gPSBvcHRpb25zO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgZ2V0RXJyb3IoXCJZb3UgbXVzdCBwcm92aWRlIGFuIG9iamVjdCBvciBhcnJheSBmb3Igc2V0VHlwZS4gWW91IHByb3ZpZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3VtZW50cykpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFR5cGUodHlwZSkge1xuICAgICAgcmV0dXJuIHR5cGVNYXBbdHlwZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKG9wdGlvbnMpIHtcbiAgICAgIGlmICghb3B0aW9ucy50eXBlKSB7XG4gICAgICAgIHRocm93IGdldEVycm9yKFwiWW91IG11c3QgcHJvdmlkZSBhIHR5cGUgZm9yIHNldFR5cGUuIFlvdSBwcm92aWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeShhcmd1bWVudHMpKTtcbiAgICAgIH0gZWxzZSBpZiAoIW9wdGlvbnMudGVtcGxhdGUgJiYgIW9wdGlvbnMudGVtcGxhdGVVcmwpIHtcbiAgICAgICAgdGhyb3cgZ2V0RXJyb3IoXCJZb3UgbXVzdCBwcm92aWRlIGEgdGVtcGxhdGUgT1IgdGVtcGxhdGVVcmwgZm9yIHNldFR5cGUuIFlvdSBwcm92aWRlZCBuZWl0aGVyOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3VtZW50cykpO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnRlbXBsYXRlICYmIG9wdGlvbnMudGVtcGxhdGVVcmwpIHtcbiAgICAgICAgdGhyb3cgZ2V0RXJyb3IoXCJZb3UgbXVzdCBwcm92aWRlIGEgdGVtcGxhdGUgT1IgdGVtcGxhdGVVcmwgZm9yIHNldFR5cGUuIFlvdSBwcm92aWRlZCBib3RoOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3VtZW50cykpO1xuICAgICAgfVxuICAgICAgY2hlY2tPdmVyd3JpdGUob3B0aW9ucy50eXBlLCB0eXBlTWFwLCBvcHRpb25zLCBcInR5cGVzXCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFdyYXBwZXIob3B0aW9ucywgbmFtZSkge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5tYXAoZnVuY3Rpb24gKHdyYXBwZXJPcHRpb25zKSB7XG4gICAgICAgICAgcmV0dXJuIHNldFdyYXBwZXIod3JhcHBlck9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICBvcHRpb25zLnR5cGVzID0gZ2V0T3B0aW9uc1R5cGVzKG9wdGlvbnMpO1xuICAgICAgICBvcHRpb25zLm5hbWUgPSBnZXRPcHRpb25zTmFtZShvcHRpb25zLCBuYW1lKTtcbiAgICAgICAgY2hlY2tXcmFwcGVyQVBJKG9wdGlvbnMpO1xuICAgICAgICB0ZW1wbGF0ZVdyYXBwZXJzTWFwW29wdGlvbnMubmFtZV0gPSBvcHRpb25zO1xuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc1N0cmluZyhvcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gc2V0V3JhcHBlcih7XG4gICAgICAgICAgdGVtcGxhdGU6IG9wdGlvbnMsXG4gICAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRPcHRpb25zVHlwZXMob3B0aW9ucykge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcob3B0aW9ucy50eXBlcykpIHtcbiAgICAgICAgcmV0dXJuIFtvcHRpb25zLnR5cGVzXTtcbiAgICAgIH1cbiAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy50eXBlcykpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudHlwZXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0T3B0aW9uc05hbWUob3B0aW9ucywgbmFtZSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubmFtZSB8fCBuYW1lIHx8IG9wdGlvbnMudHlwZXMuam9pbihcIiBcIikgfHwgZGVmYXVsdFdyYXBwZXJOYW1lO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrV3JhcHBlckFQSShvcHRpb25zKSB7XG4gICAgICBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5jaGVja1dyYXBwZXIob3B0aW9ucyk7XG4gICAgICBpZiAob3B0aW9ucy50ZW1wbGF0ZSkge1xuICAgICAgICBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5jaGVja1dyYXBwZXJUZW1wbGF0ZShvcHRpb25zLnRlbXBsYXRlLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIGNoZWNrT3ZlcndyaXRlKG9wdGlvbnMubmFtZSwgdGVtcGxhdGVXcmFwcGVyc01hcCwgb3B0aW9ucywgXCJ0ZW1wbGF0ZVdyYXBwZXJzXCIpO1xuICAgICAgY2hlY2tXcmFwcGVyVHlwZXMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyVHlwZXMob3B0aW9ucykge1xuICAgICAgdmFyIHNob3VsZFRocm93ID0gIWFuZ3VsYXIuaXNBcnJheShvcHRpb25zLnR5cGVzKSB8fCAhb3B0aW9ucy50eXBlcy5ldmVyeShhbmd1bGFyLmlzU3RyaW5nKTtcbiAgICAgIGlmIChzaG91bGRUaHJvdykge1xuICAgICAgICB0aHJvdyBnZXRFcnJvcihcIkF0dGVtcHRlZCB0byBjcmVhdGUgYSB0ZW1wbGF0ZSB3cmFwcGVyIHdpdGggdHlwZXMgdGhhdCBpcyBub3QgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2Ygc3RyaW5nc1wiKTtcbiAgICAgIH1cbiAgICAgIHZhciB3cmFwcGVyV2l0aFNhbWVUeXBlID0gb3B0aW9ucy50eXBlcy5zb21lKGdldFdyYXBwZXJCeVR5cGUpO1xuICAgICAgaWYgKHdyYXBwZXJXaXRoU2FtZVR5cGUpIHtcbiAgICAgICAgdGhyb3cgZ2V0RXJyb3IoW1wiQXR0ZW1wdGVkIHRvIGNyZWF0ZSBhIHRlbXBsYXRlIHdyYXBwZXIgd2l0aCB0eXBlcyB0aGF0IGhhdmUgYWxyZWFkeSBiZWVuIHNwZWNpZmllZCBmb3IgYW5vdGhlciB0ZW1wbGF0ZS5cIiwgXCJPcmlnaW5hbCB3cmFwcGVyOiBcIiArIEpTT04uc3RyaW5naWZ5KHdyYXBwZXJXaXRoU2FtZVR5cGUpICsgXCIsIHlvdSBzcGVjaWZpZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkob3B0aW9ucyldLmpvaW4oXCIgXCIpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja092ZXJ3cml0ZShwcm9wZXJ0eSwgb2JqZWN0LCBuZXdWYWx1ZSwgb2JqZWN0TmFtZSkge1xuICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgd2FybihbXCJBdHRlbXB0aW5nIHRvIG92ZXJ3cml0ZSBcIiArIHByb3BlcnR5ICsgXCIgb24gXCIgKyBvYmplY3ROYW1lICsgXCIgd2hpY2ggaXMgY3VycmVudGx5XCIsIFwiXCIgKyBKU09OLnN0cmluZ2lmeShvYmplY3RbcHJvcGVydHldKSArIFwiIHdpdGggXCIgKyBKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSldLmpvaW4oXCIgXCIpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXcmFwcGVyKG5hbWUpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWUgfHwgZGVmYXVsdFdyYXBwZXJOYW1lXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXcmFwcGVyQnlUeXBlKHR5cGUpIHtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gdGVtcGxhdGVXcmFwcGVyc01hcCkge1xuICAgICAgICBpZiAodGVtcGxhdGVXcmFwcGVyc01hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIGlmICh0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdLnR5cGVzICYmIHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV0udHlwZXMuaW5kZXhPZih0eXBlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgICBpZiAoIV90aGlzLmRpc2FibGVXYXJuaW5ncykge1xuICAgICAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuICBmb3JtbHlDb25maWcuJGluamVjdCA9IFtcImZvcm1seVVzYWJpbGl0eVByb3ZpZGVyXCJdO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcHJvdmlkZXJzL2Zvcm1seUNvbmZpZy5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5jb25zdGFudChcImZvcm1seVZlcnNpb25cIiwgVkVSU0lPTik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvZm9ybWx5VmVyc2lvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5jb25zdGFudChcImZvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXhcIiwgXCJodHRwczovL2dpdGh1Yi5jb20vZm9ybWx5LWpzL2FuZ3VsYXItZm9ybWx5L3dpa2kvRXJyb3JzLWFuZC1XYXJuaW5ncyNcIik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeC5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyLWZpeFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZmFjdG9yeShcImZvcm1seVV0aWxcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBmb3JtbHlFdmFsOiBmb3JtbHlFdmFsLFxuICAgICAgZ2V0RmllbGRJZDogZ2V0RmllbGRJZFxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBmb3JtbHlFdmFsKHNjb3BlLCBleHByZXNzaW9uLCBtb2RlbFZhbHVlLCB2aWV3VmFsdWUpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZXhwcmVzc2lvbikpIHtcbiAgICAgICAgcmV0dXJuIGV4cHJlc3Npb24odmlld1ZhbHVlLCBtb2RlbFZhbHVlLCBzY29wZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2NvcGUuJGV2YWwoZXhwcmVzc2lvbiwge1xuICAgICAgICAgICR2aWV3VmFsdWU6IHZpZXdWYWx1ZSxcbiAgICAgICAgICAkbW9kZWxWYWx1ZTogbW9kZWxWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWVsZElkKGZvcm1JZCwgb3B0aW9ucywgaW5kZXgpIHtcbiAgICAgIHZhciB0eXBlID0gb3B0aW9ucy50eXBlO1xuICAgICAgaWYgKCF0eXBlICYmIG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICAgICAgdHlwZSA9IFwidGVtcGxhdGVcIjtcbiAgICAgIH0gZWxzZSBpZiAoIXR5cGUgJiYgb3B0aW9ucy50ZW1wbGF0ZVVybCkge1xuICAgICAgICB0eXBlID0gXCJ0ZW1wbGF0ZVVybFwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW2Zvcm1JZCwgdHlwZSwgb3B0aW9ucy5rZXksIGluZGV4XS5qb2luKFwiX1wiKTtcbiAgICB9XG4gIH0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2VydmljZXMvZm9ybWx5VXRpbC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF90b0FycmF5ID0gZnVuY3Rpb24gKGFycikgeyByZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpID8gYXJyIDogQXJyYXkuZnJvbShhcnIpOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5mYWN0b3J5KFwiZm9ybWx5V2FyblwiLCBbXCJmb3JtbHlDb25maWdcIiwgXCJmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4XCIsIFwiJGxvZ1wiLCBmdW5jdGlvbiAoZm9ybWx5Q29uZmlnLCBmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LCAkbG9nKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgICBpZiAoIWZvcm1seUNvbmZpZy5kaXNhYmxlV2FybmluZ3MpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICB2YXIgd2FybkluZm9TbHVnID0gYXJncy5zaGlmdCgpO1xuICAgICAgICBhcmdzLnVuc2hpZnQoXCJGb3JtbHkgV2FybmluZzpcIik7XG4gICAgICAgIGFyZ3MucHVzaChcIlwiICsgZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCArIFwiXCIgKyB3YXJuSW5mb1NsdWcpO1xuICAgICAgICAkbG9nLndhcm4uYXBwbHkoJGxvZywgX3RvQXJyYXkoYXJncykpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NlcnZpY2VzL2Zvcm1seVdhcm4uanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmRpcmVjdGl2ZShcImZvcm1seUN1c3RvbVZhbGlkYXRpb25cIiwgW1wiZm9ybWx5VXRpbFwiLCBmdW5jdGlvbiAoZm9ybWx5VXRpbCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXF1aXJlOiBcIm5nTW9kZWxcIixcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWwsIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIHZhciB2YWxpZGF0b3JzID0gc2NvcGUuJGV2YWwoYXR0cnMuZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbik7XG4gICAgICAgIGlmICghdmFsaWRhdG9ycykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldHVwIHdhdGNoZXJzIGFuZCBwYXJzZXJzXG4gICAgICAgIHZhciBoYXNWYWxpZGF0b3JzID0gY3RybC5oYXNPd25Qcm9wZXJ0eShcIiR2YWxpZGF0b3JzXCIpO1xuICAgICAgICBhbmd1bGFyLmZvckVhY2godmFsaWRhdG9ycywgZnVuY3Rpb24gKHZhbGlkYXRvciwgbmFtZSkge1xuICAgICAgICAgIGlmIChoYXNWYWxpZGF0b3JzKSB7XG4gICAgICAgICAgICB2YXIgdmFsaWRhdG9yQ29sbGVjdGlvbiA9IHZhbGlkYXRvci5pc0FzeW5jID8gXCIkYXN5bmNWYWxpZGF0b3JzXCIgOiBcIiR2YWxpZGF0b3JzXCI7XG4gICAgICAgICAgICBjdHJsW3ZhbGlkYXRvckNvbGxlY3Rpb25dW25hbWVdID0gZnVuY3Rpb24gKG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCB2YWxpZGF0b3IsIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdHJsLiRwYXJzZXJzLnVuc2hpZnQoZnVuY3Rpb24gKHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgaXNWYWxpZCA9IGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgdmFsaWRhdG9yLCBjdHJsLiRtb2RlbFZhbHVlLCB2aWV3VmFsdWUpO1xuICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShuYW1lLCBpc1ZhbGlkKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHZpZXdWYWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGlyZWN0aXZlcy9mb3JtbHktY3VzdG9tLXZhbGlkYXRpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmRpcmVjdGl2ZShcImZvcm1seUR5bmFtaWNOYW1lXCIsIGZ1bmN0aW9uIGZvcm1seUR5bmFtaWNOYW1lKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogXCJBXCIsXG4gICAgICBwcmlvcml0eTogNTk5LCAvLyBvbmUgYWZ0ZXIgbmdJZlxuICAgICAgY29udHJvbGxlcjogW1wiJHNjb3BlXCIsIFwiJGVsZW1lbnRcIiwgXCIkYXR0cnNcIiwgZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuICAgICAgICAkZWxlbWVudC5yZW1vdmVBdHRyKFwiZm9ybWx5LWR5bmFtaWMtbmFtZVwiKTtcbiAgICAgICAgJGF0dHJzLiRzZXQoXCJuYW1lXCIsICRzY29wZS4kZXZhbCgkYXR0cnMuZm9ybWx5RHluYW1pY05hbWUpKTtcbiAgICAgICAgZGVsZXRlICRhdHRycy5mb3JtbHlEeW5hbWljTmFtZTtcbiAgICAgIH1dXG4gICAgfTtcbiAgfSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kaXJlY3RpdmVzL2Zvcm1seS1keW5hbWljLW5hbWUuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXItZml4XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5kaXJlY3RpdmUoXCJmb3JtbHlGaWVsZFwiLCBmb3JtbHlGaWVsZCk7XG5cbiAgZm9ybWx5RmllbGQudGVzdHMgPSBPTl9URVNUID8gcmVxdWlyZShcIi4vZm9ybWx5LWZpZWxkLnRlc3RcIikobmdNb2R1bGUpIDogbnVsbDtcblxuICBmdW5jdGlvbiBmb3JtbHlGaWVsZCgkaHR0cCwgJHEsICRjb21waWxlLCAkdGVtcGxhdGVDYWNoZSwgZm9ybWx5Q29uZmlnLCBmb3JtbHlVdGlsLCBmb3JtbHlVc2FiaWxpdHksIGZvcm1seVdhcm4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6IFwiQUVcIixcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICBzY29wZToge1xuICAgICAgICBvcHRpb25zOiBcIj1cIixcbiAgICAgICAgbW9kZWw6IFwiPVwiLFxuICAgICAgICBmb3JtSWQ6IFwiPT9cIixcbiAgICAgICAgaW5kZXg6IFwiPT9cIixcbiAgICAgICAgZmllbGRzOiBcIj0/XCIsXG4gICAgICAgIGZvcm06IFwiPT9cIlxuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IFtcIiRzY29wZVwiLCBcIiRpbnRlcnZhbFwiLCBmdW5jdGlvbiBmaWVsZENvbnRyb2xsZXIoJHNjb3BlLCAkaW50ZXJ2YWwpIHtcbiAgICAgICAgYXBpQ2hlY2soJHNjb3BlLm9wdGlvbnMpO1xuICAgICAgICAvLyBzZXQgZmllbGQgaWQgdG8gbGluayBsYWJlbHMgYW5kIGZpZWxkc1xuICAgICAgICAkc2NvcGUuaWQgPSBmb3JtbHlVdGlsLmdldEZpZWxkSWQoJHNjb3BlLmZvcm1JZCwgJHNjb3BlLm9wdGlvbnMsICRzY29wZS5pbmRleCk7XG5cbiAgICAgICAgYW5ndWxhci5leHRlbmQoJHNjb3BlLm9wdGlvbnMsIHtcbiAgICAgICAgICAvLyBhdHRhY2ggdGhlIGtleSBpbiBjYXNlIHRoZSBmb3JtbHktZmllbGQgZGlyZWN0aXZlIGlzIHVzZWQgZGlyZWN0bHlcbiAgICAgICAgICBrZXk6ICRzY29wZS5vcHRpb25zLmtleSB8fCAkc2NvcGUuaW5kZXggfHwgMCxcbiAgICAgICAgICB2YWx1ZTogdmFsdWVHZXR0ZXJTZXR0ZXIsXG4gICAgICAgICAgcnVuRXhwcmVzc2lvbnM6IHJ1bkV4cHJlc3Npb25zLFxuICAgICAgICAgIG1vZGVsT3B0aW9uczoge1xuICAgICAgICAgICAgZ2V0dGVyU2V0dGVyOiB0cnVlLFxuICAgICAgICAgICAgYWxsb3dJbnZhbGlkOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBpbml0YWxpemF0aW9uXG4gICAgICAgIHJ1bkV4cHJlc3Npb25zKCk7XG4gICAgICAgIGlmICghJHNjb3BlLm9wdGlvbnMubm9Gb3JtQ29udHJvbCkge1xuICAgICAgICAgIHNldEZvcm1Db250cm9sKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCRzY29wZS5vcHRpb25zLm1vZGVsKSB7XG4gICAgICAgICAgJHNjb3BlLiR3YXRjaChcIm9wdGlvbnMubW9kZWxcIiwgcnVuRXhwcmVzc2lvbnMsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZnVuY3Rpb24gZGVmaW5pdGlvbnNcbiAgICAgICAgZnVuY3Rpb24gcnVuRXhwcmVzc2lvbnMoKSB7XG4gICAgICAgICAgdmFyIGZpZWxkID0gJHNjb3BlLm9wdGlvbnM7XG4gICAgICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IHZhbHVlR2V0dGVyU2V0dGVyKCk7XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGZpZWxkLmV4cHJlc3Npb25Qcm9wZXJ0aWVzLCBmdW5jdGlvbiBydW5FeHByZXNzaW9uKGV4cHJlc3Npb24sIHByb3ApIHtcbiAgICAgICAgICAgIGlmIChwcm9wICE9PSBcImRhdGFcIikge1xuICAgICAgICAgICAgICBmaWVsZFtwcm9wXSA9IGZvcm1seVV0aWwuZm9ybWx5RXZhbCgkc2NvcGUsIGV4cHJlc3Npb24sIGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmaWVsZC5kYXRhID0gZmllbGQuZGF0YSB8fCB7fTtcbiAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGZpZWxkLmV4cHJlc3Npb25Qcm9wZXJ0aWVzLmRhdGEsIGZ1bmN0aW9uIHJ1bkV4cHJlc3Npb24oZGF0YUV4cHJlc3Npb24sIGRhdGFQcm9wKSB7XG4gICAgICAgICAgICAgICAgZmllbGQuZGF0YVtkYXRhUHJvcF0gPSBmb3JtbHlVdGlsLmZvcm1seUV2YWwoJHNjb3BlLCBkYXRhRXhwcmVzc2lvbiwgY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB2YWx1ZUdldHRlclNldHRlcihuZXdWYWwpIHtcbiAgICAgICAgICBpZiAoISRzY29wZS5tb2RlbCB8fCAhJHNjb3BlLm9wdGlvbnMua2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZXdWYWwpKSB7XG4gICAgICAgICAgICAkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XSA9IG5ld1ZhbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0Rm9ybUNvbnRyb2woKSB7XG4gICAgICAgICAgdmFyIHN0b3BXYWl0aW5nRm9yRGVzdHJveTtcbiAgICAgICAgICB2YXIgbWF4VGltZSA9IDIwMDA7XG4gICAgICAgICAgdmFyIGludGVydmFsVGltZSA9IDU7XG4gICAgICAgICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgICAgICAgIHZhciBpbnRlcnZhbCA9ICRpbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdGVyYXRpb25zKys7XG4gICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5vcHRpb25zLmtleSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNsZWFuVXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBmb3JtQ29udHJvbCA9ICRzY29wZS5mb3JtICYmICRzY29wZS5mb3JtWyRzY29wZS5pZF07XG4gICAgICAgICAgICBpZiAoZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLm9wdGlvbnMuZm9ybUNvbnRyb2wgPSBmb3JtQ29udHJvbDtcbiAgICAgICAgICAgICAgY2xlYW5VcCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbnRlcnZhbFRpbWUgKiBpdGVyYXRpb25zID4gbWF4VGltZSkge1xuICAgICAgICAgICAgICBmb3JtbHlXYXJuKFwiY291bGRudC1zZXQtdGhlLWZvcm1jb250cm9sLWFmdGVyLXRpbWVtc1wiLCBcIkNvdWxkbid0IHNldCB0aGUgZm9ybUNvbnRyb2wgYWZ0ZXIgXCIgKyBtYXhUaW1lICsgXCJtc1wiLCAkc2NvcGUpO1xuICAgICAgICAgICAgICBjbGVhblVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgaW50ZXJ2YWxUaW1lKTtcbiAgICAgICAgICBzdG9wV2FpdGluZ0ZvckRlc3Ryb3kgPSAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgY2xlYW5VcCk7XG5cbiAgICAgICAgICBmdW5jdGlvbiBjbGVhblVwKCkge1xuICAgICAgICAgICAgc3RvcFdhaXRpbmdGb3JEZXN0cm95KCk7XG4gICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKGludGVydmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1dLFxuICAgICAgbGluazogZnVuY3Rpb24gZmllbGRMaW5rKHNjb3BlLCBlbCkge1xuICAgICAgICBnZXRGaWVsZFRlbXBsYXRlKHNjb3BlLm9wdGlvbnMpLnRoZW4odHJhbnNjbHVkZUluV3JhcHBlcihzY29wZS5vcHRpb25zKSkudGhlbihzZXRFbGVtZW50VGVtcGxhdGUpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNldEVsZW1lbnRUZW1wbGF0ZSh0ZW1wbGF0ZUVsKSB7XG4gICAgICAgICAgZWwuaHRtbChhc0h0bWwodGVtcGxhdGVFbCkpO1xuICAgICAgICAgICRjb21waWxlKGVsLmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhc0h0bWwoZWwpIHtcbiAgICAgIHZhciB3cmFwcGVyID0gYW5ndWxhci5lbGVtZW50KFwiPGE+PC9hPlwiKTtcbiAgICAgIHJldHVybiB3cmFwcGVyLmFwcGVuZChlbCkuaHRtbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZpZWxkVGVtcGxhdGUob3B0aW9ucykge1xuICAgICAgdmFyIHR5cGUgPSBmb3JtbHlDb25maWcuZ2V0VHlwZShvcHRpb25zLnR5cGUpO1xuICAgICAgdmFyIHRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZSB8fCB0eXBlLnRlbXBsYXRlO1xuICAgICAgdmFyIHRlbXBsYXRlVXJsID0gb3B0aW9ucy50ZW1wbGF0ZVVybCB8fCB0eXBlLnRlbXBsYXRlVXJsO1xuICAgICAgaWYgKCF0ZW1wbGF0ZSAmJiAhdGVtcGxhdGVVcmwpIHtcbiAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZpZWxkRXJyb3IoXCJ0ZW1wbGF0ZS10eXBlLXR5cGUtbm90LXN1cHBvcnRlZFwiLCBcInRlbXBsYXRlIHR5cGUgJ1wiICsgb3B0aW9ucy50eXBlICsgXCInIG5vdCBzdXBwb3J0ZWQuIE9uIGVsZW1lbnQ6XCIsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdldFRlbXBsYXRlKHRlbXBsYXRlIHx8IHRlbXBsYXRlVXJsLCAhdGVtcGxhdGUpO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gZ2V0VGVtcGxhdGUodGVtcGxhdGUsIGlzVXJsKSB7XG4gICAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgICAgcmV0dXJuICRxLndoZW4odGVtcGxhdGUpO1xuICAgICAgfSBlbHNlIGlmIChpc1VybCkge1xuICAgICAgICB2YXIgaHR0cE9wdGlvbnMgPSB7IGNhY2hlOiAkdGVtcGxhdGVDYWNoZSB9O1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHRlbXBsYXRlLCBodHRwT3B0aW9ucykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICBmb3JtbHlXYXJuKFwicHJvYmxlbS1sb2FkaW5nLXRlbXBsYXRlLWZvci10ZW1wbGF0ZXVybFwiLCBcIlByb2JsZW0gbG9hZGluZyB0ZW1wbGF0ZSBmb3IgXCIgKyB0ZW1wbGF0ZSwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2NsdWRlSW5XcmFwcGVyKG9wdGlvbnMpIHtcbiAgICAgIHZhciB3cmFwcGVyID0gZ2V0V3JhcHBlck9wdGlvbihvcHRpb25zKTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHRyYW5zY2x1ZGVUZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICAgICAgICBpZiAoIXdyYXBwZXIpIHtcbiAgICAgICAgICByZXR1cm4gJHEud2hlbihhbmd1bGFyLmVsZW1lbnQodGVtcGxhdGUpKTtcbiAgICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzQXJyYXkod3JhcHBlcikpIHtcbiAgICAgICAgICB2YXIgcHJvbWlzZXMgPSB3cmFwcGVyLm1hcChmdW5jdGlvbiAodykge1xuICAgICAgICAgICAgcmV0dXJuIGdldFRlbXBsYXRlKHcudGVtcGxhdGUgfHwgdy50ZW1wbGF0ZVVybCwgIXcudGVtcGxhdGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiAkcS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24gKHdyYXBwZXJzKSB7XG4gICAgICAgICAgICB3cmFwcGVycy5yZXZlcnNlKCk7IC8vIHdyYXBwZXIgMCBpcyB3cmFwcGVkIGluIHdyYXBwZXIgMSBhbmQgc28gb24uLi5cbiAgICAgICAgICAgIHZhciB0b3RhbFdyYXBwZXIgPSB3cmFwcGVycy5zaGlmdCgpO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHdyYXBwZXJzLCBmdW5jdGlvbiAod3JhcHBlcikge1xuICAgICAgICAgICAgICB0b3RhbFdyYXBwZXIgPSBkb1RyYW5zY2x1c2lvbih0b3RhbFdyYXBwZXIsIHdyYXBwZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZG9UcmFuc2NsdXNpb24odG90YWxXcmFwcGVyLCB0ZW1wbGF0ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9ybWx5VXNhYmlsaXR5LmNoZWNrV3JhcHBlcih3cmFwcGVyKTtcbiAgICAgICAgICB2YXIgdCA9IHdyYXBwZXIudGVtcGxhdGUgfHwgd3JhcHBlci50ZW1wbGF0ZVVybDtcbiAgICAgICAgICByZXR1cm4gZ2V0VGVtcGxhdGUodCwgIXdyYXBwZXIudGVtcGxhdGUpLnRoZW4oZnVuY3Rpb24gKHdyYXBwZXJUZW1wbGF0ZSkge1xuICAgICAgICAgICAgZm9ybWx5VXNhYmlsaXR5LmNoZWNrV3JhcHBlclRlbXBsYXRlKHdyYXBwZXJUZW1wbGF0ZSwgd3JhcHBlcik7XG4gICAgICAgICAgICByZXR1cm4gZG9UcmFuc2NsdXNpb24od3JhcHBlclRlbXBsYXRlLCB0ZW1wbGF0ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZG9UcmFuc2NsdXNpb24od3JhcHBlciwgdGVtcGxhdGUpIHtcbiAgICAgIHZhciB3cmFwcGVyRWwgPSBhbmd1bGFyLmVsZW1lbnQod3JhcHBlcik7XG4gICAgICB2YXIgdHJhbnNjbHVkZUVsID0gd3JhcHBlckVsLmZpbmQoXCJmb3JtbHktdHJhbnNjbHVkZVwiKTtcbiAgICAgIHRyYW5zY2x1ZGVFbC5yZXBsYWNlV2l0aCh0ZW1wbGF0ZSk7XG4gICAgICByZXR1cm4gd3JhcHBlckVsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdyYXBwZXJPcHRpb24ob3B0aW9ucykge1xuICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgdmFyIHRlbXBsYXRlT3B0aW9uID0gb3B0aW9ucy53cmFwcGVyO1xuICAgICAgLy8gZXhwbGljaXQgbnVsbCBtZWFucyBubyB3cmFwcGVyXG4gICAgICBpZiAodGVtcGxhdGVPcHRpb24gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICB9XG4gICAgICB2YXIgd3JhcHBlciA9IHRlbXBsYXRlT3B0aW9uO1xuICAgICAgLy8gbm90aGluZyBzcGVjaWZpZWQgbWVhbnMgdXNlIHRoZSBkZWZhdWx0IHdyYXBwZXIgZm9yIHRoZSB0eXBlXG4gICAgICBpZiAoIXRlbXBsYXRlT3B0aW9uKSB7XG4gICAgICAgIHdyYXBwZXIgPSBmb3JtbHlDb25maWcuZ2V0V3JhcHBlckJ5VHlwZShvcHRpb25zLnR5cGUpIHx8IGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKCk7XG4gICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNTdHJpbmcodGVtcGxhdGVPcHRpb24pKSB7XG4gICAgICAgIC8vIHN0cmluZyBtZWFucyBpdCdzIGEgdHlwZVxuICAgICAgICB3cmFwcGVyID0gZm9ybWx5Q29uZmlnLmdldFdyYXBwZXIodGVtcGxhdGVPcHRpb24pO1xuICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzQXJyYXkodGVtcGxhdGVPcHRpb24pKSB7XG4gICAgICAgIC8vIGFycmF5IG1lYW5zIHdyYXAgdGhlIHdyYXBwZXJzXG4gICAgICAgIHdyYXBwZXIgPSB0ZW1wbGF0ZU9wdGlvbi5tYXAoZnVuY3Rpb24gKHdyYXBwZXJOYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKHdyYXBwZXJOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcGlDaGVjayhvcHRpb25zKSB7XG4gICAgICB2YXIgdGVtcGxhdGVPcHRpb25zID0gZ2V0VGVtcGxhdGVPcHRpb25zQ291bnQob3B0aW9ucyk7XG4gICAgICBpZiAodGVtcGxhdGVPcHRpb25zID09PSAwKSB7XG4gICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGaWVsZEVycm9yKFwieW91LW11c3QtcHJvdmlkZS1vbmUtb2YtdHlwZS10ZW1wbGF0ZS1vci10ZW1wbGF0ZXVybC1mb3ItYS1maWVsZFwiLCBcIllvdSBtdXN0IHByb3ZpZGUgb25lIG9mIHR5cGUsIHRlbXBsYXRlLCBvciB0ZW1wbGF0ZVVybCBmb3IgYSBmaWVsZFwiLCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSBpZiAodGVtcGxhdGVPcHRpb25zID4gMSkge1xuICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0RmllbGRFcnJvcihcInlvdS1tdXN0LW9ubHktcHJvdmlkZS1hLXR5cGUtdGVtcGxhdGUtb3ItdGVtcGxhdGV1cmwtZm9yLWEtZmllbGRcIiwgXCJZb3UgbXVzdCBvbmx5IHByb3ZpZGUgYSB0eXBlLCB0ZW1wbGF0ZSwgb3IgdGVtcGxhdGVVcmwgZm9yIGEgZmllbGRcIiwgb3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIHRoYXQgb25seSBhbGxvd2VkIHByb3BlcnRpZXMgYXJlIHByb3ZpZGVkXG4gICAgICB2YXIgYWxsb3dlZFByb3BlcnRpZXMgPSBbXCJ0eXBlXCIsIFwidGVtcGxhdGVcIiwgXCJ0ZW1wbGF0ZVVybFwiLCBcImtleVwiLCBcIm1vZGVsXCIsIFwiZXhwcmVzc2lvblByb3BlcnRpZXNcIiwgXCJkYXRhXCIsIFwidGVtcGxhdGVPcHRpb25zXCIsIFwid3JhcHBlclwiLCBcIm1vZGVsT3B0aW9uc1wiLCBcIndhdGNoZXJcIiwgXCJ2YWxpZGF0b3JzXCJdO1xuICAgICAgdmFyIGV4dHJhUHJvcHMgPSBPYmplY3Qua2V5cyhvcHRpb25zKS5maWx0ZXIoZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgcmV0dXJuIGFsbG93ZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcCkgPT09IC0xO1xuICAgICAgfSk7XG4gICAgICBpZiAoZXh0cmFQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZpZWxkRXJyb3IoXCJZb3UgaGF2ZSBzcGVjaWZpZWQgZmllbGQgcHJvcGVydGllcyB0aGF0IGFyZSBub3QgYWxsb3dlZDogXCIgKyBKU09OLnN0cmluZ2lmeShleHRyYVByb3BzLmpvaW4oXCIsIFwiKSksIG9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRUZW1wbGF0ZU9wdGlvbnNDb3VudChvcHRpb25zKSB7XG4gICAgICAgIHZhciB0ZW1wbGF0ZU9wdGlvbnMgPSAwO1xuICAgICAgICB0ZW1wbGF0ZU9wdGlvbnMgKz0gYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy50ZW1wbGF0ZSkgPyAxIDogMDtcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zICs9IGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudHlwZSkgPyAxIDogMDtcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zICs9IGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudGVtcGxhdGVVcmwpID8gMSA6IDA7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZU9wdGlvbnM7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZvcm1seUZpZWxkLiRpbmplY3QgPSBbXCIkaHR0cFwiLCBcIiRxXCIsIFwiJGNvbXBpbGVcIiwgXCIkdGVtcGxhdGVDYWNoZVwiLCBcImZvcm1seUNvbmZpZ1wiLCBcImZvcm1seVV0aWxcIiwgXCJmb3JtbHlVc2FiaWxpdHlcIiwgXCJmb3JtbHlXYXJuXCJdO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGlyZWN0aXZlcy9mb3JtbHktZmllbGQuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdG9BcnJheSA9IGZ1bmN0aW9uIChhcnIpIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyKSA/IGFyciA6IEFycmF5LmZyb20oYXJyKTsgfTtcblxudmFyIF9zbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXItZml4XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5kaXJlY3RpdmUoXCJmb3JtbHlGb3JtXCIsIGZvcm1seUZvcm0pO1xuXG4gIGZvcm1seUZvcm0udGVzdHMgPSBPTl9URVNUID8gcmVxdWlyZShcIi4vZm9ybWx5LWZvcm0udGVzdFwiKShuZ01vZHVsZSkgOiBudWxsO1xuXG4gIGZ1bmN0aW9uIGZvcm1seUZvcm0oZm9ybWx5VXNhYmlsaXR5KSB7XG4gICAgdmFyIGN1cnJlbnRGb3JtSWQgPSAxO1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogXCJFXCIsXG4gICAgICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vZm9ybWx5LWZvcm0uaHRtbFwiKSxcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgZmllbGRzOiBcIj1cIixcbiAgICAgICAgbW9kZWw6IFwiPT9cIiwgLy8gd2UnbGwgZG8gb3VyIG93biB3YXJuaW5nIHRvIGhlbHAgd2l0aCBtaWdyYXRpb25zXG4gICAgICAgIGZvcm06IFwiPT9cIlxuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IFtcIiRzY29wZVwiLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5mb3JtSWQgPSBcImZvcm1seV9cIiArIGN1cnJlbnRGb3JtSWQrKztcblxuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgYXR0YWNoS2V5KTsgLy8gYXR0YWNoZXMgYSBrZXkgYmFzZWQgb24gdGhlIGluZGV4IGlmIGEga2V5IGlzbid0IHNwZWNpZmllZFxuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgc2V0dXBXYXRjaGVycyk7IC8vIHNldHVwIHdhdGNoZXJzIGZvciBhbGwgZmllbGRzXG5cbiAgICAgICAgLy8gd2F0Y2ggdGhlIG1vZGVsIGFuZCBldmFsdWF0ZSB3YXRjaCBleHByZXNzaW9ucyB0aGF0IGRlcGVuZCBvbiBpdC5cbiAgICAgICAgJHNjb3BlLiR3YXRjaChcIm1vZGVsXCIsIGZ1bmN0aW9uIG9uUmVzdWx0VXBkYXRlKG5ld1Jlc3VsdCkge1xuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgICAgIC8qanNoaW50IC1XMDMwICovXG4gICAgICAgICAgICBmaWVsZC5ydW5FeHByZXNzaW9ucyAmJiBmaWVsZC5ydW5FeHByZXNzaW9ucyhuZXdSZXN1bHQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICBmdW5jdGlvbiBhdHRhY2hLZXkoZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgZmllbGQua2V5ID0gZmllbGQua2V5IHx8IGluZGV4IHx8IDA7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXR1cFdhdGNoZXJzKGZpZWxkLCBpbmRleCkge1xuICAgICAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZmllbGQud2F0Y2hlcikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHdhdGNoZXJzID0gZmllbGQud2F0Y2hlcjtcbiAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNBcnJheSh3YXRjaGVycykpIHtcbiAgICAgICAgICAgIHdhdGNoZXJzID0gW3dhdGNoZXJzXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHdhdGNoZXJzLCBmdW5jdGlvbiAod2F0Y2hlcikge1xuICAgICAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZCh3YXRjaGVyLmxpc3RlbmVyKSkge1xuICAgICAgICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0RmllbGRFcnJvcihcImFsbC1maWVsZC13YXRjaGVycy1tdXN0LWhhdmUtYS1saXN0ZW5lclwiLCBcIkFsbCBmaWVsZCB3YXRjaGVycyBtdXN0IGhhdmUgYSBsaXN0ZW5lclwiLCBmaWVsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgd2F0Y2hFeHByZXNzaW9uID0gZ2V0V2F0Y2hFeHByZXNzaW9uKHdhdGNoZXIsIGZpZWxkLCBpbmRleCk7XG4gICAgICAgICAgICB2YXIgd2F0Y2hMaXN0ZW5lciA9IGdldFdhdGNoTGlzdGVuZXIod2F0Y2hlciwgZmllbGQsIGluZGV4KTtcblxuICAgICAgICAgICAgdmFyIHR5cGUgPSB3YXRjaGVyLnR5cGUgfHwgXCIkd2F0Y2hcIjtcbiAgICAgICAgICAgIHdhdGNoZXIuc3RvcFdhdGNoaW5nID0gJHNjb3BlW3R5cGVdKHdhdGNoRXhwcmVzc2lvbiwgd2F0Y2hMaXN0ZW5lciwgd2F0Y2hlci53YXRjaERlZXApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0V2F0Y2hFeHByZXNzaW9uKHdhdGNoZXIsIGZpZWxkLCBpbmRleCkge1xuICAgICAgICAgIHZhciB3YXRjaEV4cHJlc3Npb24gPSB3YXRjaGVyLmV4cHJlc3Npb24gfHwgXCJtb2RlbFsnXCIgKyBmaWVsZC5rZXkgKyBcIiddXCI7XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih3YXRjaEV4cHJlc3Npb24pKSB7XG4gICAgICAgICAgICAvLyB3cmFwIHRoZSBmaWVsZCdzIHdhdGNoIGV4cHJlc3Npb24gc28gd2UgY2FuIGNhbGwgaXQgd2l0aCB0aGUgZmllbGQgYXMgdGhlIGZpcnN0IGFyZ1xuICAgICAgICAgICAgLy8gYW5kIHRoZSBzdG9wIGZ1bmN0aW9uIGFzIHRoZSBsYXN0IGFyZyBhcyBhIGhlbHBlclxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsRXhwcmVzc2lvbiA9IHdhdGNoRXhwcmVzc2lvbjtcbiAgICAgICAgICAgIHdhdGNoRXhwcmVzc2lvbiA9IGZ1bmN0aW9uIGZvcm1seVdhdGNoRXhwcmVzc2lvbigpIHtcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBtb2RpZnlBcmdzLmFwcGx5KHVuZGVmaW5lZCwgW3dhdGNoZXIsIGluZGV4XS5jb25jYXQoX3NsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxFeHByZXNzaW9uLmFwcGx5KHVuZGVmaW5lZCwgX3RvQXJyYXkoYXJncykpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdhdGNoRXhwcmVzc2lvbi5kaXNwbGF5TmFtZSA9IFwiRm9ybWx5IFdhdGNoIEV4cHJlc3Npb24gZm9yIGZpZWxkIGZvciBcIiArIGZpZWxkLmtleTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHdhdGNoRXhwcmVzc2lvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFdhdGNoTGlzdGVuZXIod2F0Y2hlciwgZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgdmFyIHdhdGNoTGlzdGVuZXIgPSB3YXRjaGVyLmxpc3RlbmVyO1xuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24od2F0Y2hMaXN0ZW5lcikpIHtcbiAgICAgICAgICAgIC8vIHdyYXAgdGhlIGZpZWxkJ3Mgd2F0Y2ggbGlzdGVuZXIgc28gd2UgY2FuIGNhbGwgaXQgd2l0aCB0aGUgZmllbGQgYXMgdGhlIGZpcnN0IGFyZ1xuICAgICAgICAgICAgLy8gYW5kIHRoZSBzdG9wIGZ1bmN0aW9uIGFzIHRoZSBsYXN0IGFyZyBhcyBhIGhlbHBlclxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsTGlzdGVuZXIgPSB3YXRjaExpc3RlbmVyO1xuICAgICAgICAgICAgd2F0Y2hMaXN0ZW5lciA9IGZ1bmN0aW9uIGZvcm1seVdhdGNoTGlzdGVuZXIoKSB7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gbW9kaWZ5QXJncy5hcHBseSh1bmRlZmluZWQsIFt3YXRjaGVyLCBpbmRleF0uY29uY2F0KF9zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsTGlzdGVuZXIuYXBwbHkodW5kZWZpbmVkLCBfdG9BcnJheShhcmdzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2F0Y2hMaXN0ZW5lci5kaXNwbGF5TmFtZSA9IFwiRm9ybWx5IFdhdGNoIExpc3RlbmVyIGZvciBmaWVsZCBmb3IgXCIgKyBmaWVsZC5rZXk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB3YXRjaExpc3RlbmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbW9kaWZ5QXJncyh3YXRjaGVyLCBpbmRleCkge1xuICAgICAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBvcmlnaW5hbEFyZ3MgPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgICBvcmlnaW5hbEFyZ3NbX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBbJHNjb3BlLmZpZWxkc1tpbmRleF1dLmNvbmNhdChfdG9BcnJheShvcmlnaW5hbEFyZ3MpLCBbd2F0Y2hlci5zdG9wV2F0Y2hpbmddKTtcbiAgICAgICAgfVxuICAgICAgfV0sXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsLCBhdHRycykge1xuICAgICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoXCJyZXN1bHRcIikpIHtcbiAgICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0Rm9ybWx5RXJyb3IoXCJUaGUgXFxcInJlc3VsdFxcXCIgYXR0cmlidXRlIG9uIGEgZm9ybWx5LWZvcm0gaXMgbm8gbG9uZ2VyIHZhbGlkLiBVc2UgXFxcIm1vZGVsXFxcIiBpbnN0ZWFkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRycy5uYW1lICE9PSBcImZvcm1cIikge1xuICAgICAgICAgIC8vIHRoZW4gdGhleSBzcGVjaWZpZWQgdGhlaXIgb3duIG5hbWVcbiAgICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0Rm9ybWx5RXJyb3IoXCJUaGUgXFxcIm5hbWVcXFwiIGF0dHJpYnV0ZSBvbiBhIGZvcm1seS1mb3JtIGlzIG5vIGxvbmdlciB2YWxpZC4gVXNlIFxcXCJmb3JtXFxcIiBpbnN0ZWFkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXR0cnMuaGFzT3duUHJvcGVydHkoXCJtb2RlbFwiKSB8fCAhc2NvcGUubW9kZWwpIHtcbiAgICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0Rm9ybWx5RXJyb3IoXCJUaGUgXFxcIm1vZGVsXFxcIiBhdHRyaWJ1dGUgaXMgcmVxdWlyZWQgb24gYSBmb3JtbHktZm9ybS5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZvcm1seUZvcm0uJGluamVjdCA9IFtcImZvcm1seVVzYWJpbGl0eVwiXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvcm0uanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuZy1mb3JtIGNsYXNzPVxcXCJmb3JtbHlcXFwiXFxuICAgICAgICAgbmFtZT1cXFwiZm9ybVxcXCJcXG4gICAgICAgICByb2xlPVxcXCJmb3JtXFxcIj5cXG4gIDxkaXYgZm9ybWx5LWZpZWxkXFxuICAgICAgIG5nLXJlcGVhdD1cXFwiZmllbGQgaW4gZmllbGRzIHRyYWNrIGJ5ICRpbmRleFxcXCJcXG4gICAgICAgbmctaWY9XFxcIiFmaWVsZC5oaWRlXFxcIlxcbiAgICAgICBjbGFzcz1cXFwiZm9ybWx5LWZpZWxkXFxcIlxcbiAgICAgICBvcHRpb25zPVxcXCJmaWVsZFxcXCJcXG4gICAgICAgbW9kZWw9XFxcImZpZWxkLm1vZGVsIHx8IG1vZGVsXFxcIlxcbiAgICAgICBmaWVsZHM9XFxcImZpZWxkc1xcXCJcXG4gICAgICAgZm9ybT1cXFwiZm9ybVxcXCJcXG4gICAgICAgZm9ybS1pZD1cXFwiZm9ybUlkXFxcIlxcbiAgICAgICBpbmRleD1cXFwiJGluZGV4XFxcIj5cXG4gIDwvZGl2PlxcbiAgPGRpdiBuZy10cmFuc2NsdWRlPjwvZGl2PlxcbjwvbmctZm9ybT5cXG5cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZm9ybWx5LmpzIn0=