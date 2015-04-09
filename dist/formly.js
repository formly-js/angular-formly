// angular-formly version 6.0.0-beta.0 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("api-check"), require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["api-check", "angular"], factory);
	else if(typeof exports === 'object')
		exports["ngFormly"] = factory(require("api-check"), require("angular"));
	else
		root["ngFormly"] = factory(root["apiCheck"], root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_9__) {
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
	
	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var apiCheck = __webpack_require__(2);
	if (!apiCheck) {
	  throw new Error("angular-formly requires the library apiCheck.js! Please include it! " + __webpack_require__(3) + "apicheckjs-dependency-required");
	}
	var ngModuleName = "formly";
	var angular = __webpack_require__(4);
	var ngModule = angular.module(ngModuleName, []);
	
	__webpack_require__(5)(ngModule);
	__webpack_require__(6)(ngModule);
	__webpack_require__(7)(ngModule);
	__webpack_require__(8)(ngModule);
	
	module.exports = ngModuleName;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = "https://github.com/formly-js/angular-formly/blob/" + ("6.0.0-beta.0") + "/other/ERRORS_AND_WARNINGS.md#";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// some versions of angular don't export the angular module properly,
	// so we get it from window in this case.
	var angular = __webpack_require__(9);
	if (!angular.version) {
	  angular = window.angular;
	}
	module.exports = angular;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(10)(ngModule);
	  __webpack_require__(11)(ngModule);
	  __webpack_require__(12)(ngModule);
	  __webpack_require__(13)(ngModule);
	  __webpack_require__(14)(ngModule);
	  __webpack_require__(15)(ngModule);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(16)(ngModule);
	  __webpack_require__(17)(ngModule);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(18)(ngModule);
	  __webpack_require__(19)(ngModule);
	  __webpack_require__(20)(ngModule);
	  __webpack_require__(21)(ngModule);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(22)(ngModule);
	  __webpack_require__(23)(ngModule);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	
	  var apiCheck = __webpack_require__(2)({
	    output: {
	      prefix: "angular-formly:",
	      docsBaseUrl: __webpack_require__(3)
	    }
	  });
	
	  function shapeRequiredIfNot(otherProps, propChecker) {
	    if (!angular.isArray(otherProps)) {
	      otherProps = [otherProps];
	    }
	    var type = "specified if these are not specified: `" + otherProps.join(", ") + "` (otherwise it's optional)";
	    function shapeRequiredIfNotDefinition(prop, propName, location, obj) {
	      var propExists = obj && obj.hasOwnProperty(propName);
	      var otherPropsExist = otherProps.some(function (otherProp) {
	        return obj && obj.hasOwnProperty(otherProp);
	      });
	      //console.log(propName, propExists, prop, otherPropsExist, otherProps.join(', '));
	      if (!otherPropsExist && !propExists) {
	        return apiCheck.utils.getError(propName, location, type);
	      } else if (propExists) {
	        return propChecker(prop, propName, location, obj);
	      }
	    }
	    shapeRequiredIfNotDefinition.type = type;
	    apiCheck.utils.checkerHelpers.setupChecker(shapeRequiredIfNotDefinition);
	    return shapeRequiredIfNotDefinition;
	  }
	
	  ngModule.constant("formlyApiCheck", apiCheck);
	  if (false) {
	    require("./formlyApiCheck.test")(ngModule);
	  }
	
	  var formlyExpression = apiCheck.oneOfType([apiCheck.string, apiCheck.func]);
	  var specifyWrapperType = apiCheck.oneOfType([apiCheck.oneOf([null]), apiCheck.typeOrArrayOf(apiCheck.string)]);
	
	  var apiCheckProperty = apiCheck.objectOf(apiCheck.func);
	
	  var apiCheckInstanceProperty = apiCheck.shape.onlyIf("apiCheck", apiCheck.func.withProperties({
	    warn: apiCheck.func,
	    "throw": apiCheck.func,
	    shape: apiCheck.func
	  }));
	
	  var apiCheckFunctionProperty = apiCheck.shape.onlyIf("apiCheck", apiCheck.oneOf(["throw", "warn"]));
	
	  var formlyWrapperType = apiCheck.shape({
	    name: shapeRequiredIfNot("types", apiCheck.string).optional,
	    template: apiCheck.shape.ifNot("templateUrl", apiCheck.string).optional,
	    templateUrl: apiCheck.shape.ifNot("template", apiCheck.string).optional,
	    types: apiCheck.typeOrArrayOf(apiCheck.string).optional,
	    overwriteOk: apiCheck.bool.optional,
	    validateOptions: apiCheck.func.optional,
	    apiCheck: apiCheckProperty.optional,
	    apiCheckInstance: apiCheckInstanceProperty.optional,
	    apiCheckFunction: apiCheckFunctionProperty.optional,
	    apiCheckOptions: apiCheck.object.optional
	  }).strict;
	
	  var fieldOptionsApiShape = {
	    type: apiCheck.shape.ifNot(["template", "templateUrl"], apiCheck.string).optional,
	    template: apiCheck.shape.ifNot(["type", "templateUrl"], apiCheck.string).optional,
	    templateUrl: apiCheck.shape.ifNot(["type", "template"], apiCheck.string).optional,
	    key: apiCheck.oneOfType([apiCheck.string, apiCheck.number]),
	    model: apiCheck.object.optional,
	    expressionProperties: apiCheck.objectOf(apiCheck.oneOfType([formlyExpression, apiCheck.shape({
	      expression: formlyExpression,
	      message: formlyExpression.optional
	    }).strict])).optional,
	    data: apiCheck.object.optional,
	    templateOptions: apiCheck.object.optional,
	    wrapper: specifyWrapperType.optional,
	    modelOptions: apiCheck.shape({
	      updateOn: apiCheck.string.optional,
	      debounce: apiCheck.oneOfType([apiCheck.object, apiCheck.string]).optional,
	      allowInvalid: apiCheck.bool.optional,
	      getterSetter: apiCheck.bool.optional,
	      timezone: apiCheck.string.optional
	    }).optional,
	    watcher: apiCheck.typeOrArrayOf(apiCheck.shape({
	      expression: formlyExpression.optional,
	      listener: formlyExpression
	    })).optional,
	    validators: apiCheck.objectOf(apiCheck.oneOfType([formlyExpression, apiCheck.shape({
	      expression: formlyExpression,
	      message: formlyExpression.optional
	    }).strict])).optional,
	    noFormControl: apiCheck.bool.optional,
	    hide: apiCheck.bool.optional,
	    ngModelAttrs: apiCheck.objectOf(apiCheck.shape({
	      expression: apiCheck.shape.ifNot(["value", "attribute", "bound"], apiCheck.any).optional,
	      value: apiCheck.shape.ifNot("expression", apiCheck.any).optional,
	      attribute: apiCheck.shape.ifNot("expression", apiCheck.any).optional,
	      bound: apiCheck.shape.ifNot("expression", apiCheck.any).optional
	    }).strict).optional,
	    optionsTypes: apiCheck.typeOrArrayOf(apiCheck.string).optional,
	    link: apiCheck.func.optional,
	    controller: apiCheck.oneOfType([apiCheck.string, apiCheck.func, apiCheck.array]).optional,
	    validation: apiCheck.shape({
	      show: apiCheck.oneOfType([apiCheck.bool, apiCheck.oneOf([null])]).optional,
	      messages: apiCheck.objectOf(formlyExpression).optional,
	      errorExistsAndShouldBeVisible: apiCheck.bool.optional
	    }).optional,
	    formControl: apiCheck.object.optional,
	    value: apiCheck.func.optional,
	    runExpressions: apiCheck.func.optional,
	    resetModel: apiCheck.func.optional,
	    updateInitialValue: apiCheck.func.optional,
	    initialValue: apiCheck.any.optional
	  };
	
	  var formlyFieldOptions = apiCheck.shape(fieldOptionsApiShape).strict;
	
	  var typeOptionsDefaultOptions = angular.copy(fieldOptionsApiShape);
	  typeOptionsDefaultOptions.key = apiCheck.string.optional;
	
	  var formlyTypeOptions = apiCheck.shape({
	    name: apiCheck.string,
	    template: apiCheck.shape.ifNot("templateUrl", apiCheck.string).optional,
	    templateUrl: apiCheck.shape.ifNot("template", apiCheck.string).optional,
	    controller: apiCheck.oneOfType([apiCheck.func, apiCheck.string, apiCheck.array]).optional,
	    link: apiCheck.func.optional,
	    defaultOptions: apiCheck.oneOfType([apiCheck.func, apiCheck.shape(typeOptionsDefaultOptions)]).optional,
	    "extends": apiCheck.string.optional,
	    wrapper: specifyWrapperType.optional,
	    data: apiCheck.object.optional,
	    validateOptions: apiCheck.func.optional,
	    apiCheck: apiCheckProperty.optional,
	    apiCheckInstance: apiCheckInstanceProperty.optional,
	    apiCheckFunction: apiCheckFunctionProperty.optional,
	    apiCheckOptions: apiCheck.object.optional,
	    overwriteOk: apiCheck.bool.optional
	  }).strict;
	
	  angular.extend(apiCheck, {
	    formlyTypeOptions: formlyTypeOptions, formlyFieldOptions: formlyFieldOptions, formlyExpression: formlyExpression, formlyWrapperType: formlyWrapperType
	  });
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(4);
	
	module.exports = function (ngModule) {
	  ngModule.provider("formlyUsability", ["formlyVersion", "formlyApiCheck", function (formlyVersion, formlyApiCheck) {
	    var _this = this;
	
	    var errorsAndWarningsUrlPrefix = "https://github.com/formly-js/angular-formly/blob/" + formlyVersion + "/other/ERRORS_AND_WARNINGS.md#";
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
	      formlyApiCheck["throw"](formlyApiCheck.formlyWrapperType, arguments, {
	        prefix: "formlyConfig.setWrapper",
	        urlSuffix: "setwrapper-validation-failed"
	      });
	    }
	
	    function checkWrapperTemplate(template, additionalInfo) {
	      var formlyTransclude = "<formly-transclude></formly-transclude>";
	      if (template.indexOf(formlyTransclude) === -1) {
	        throw getFormlyError("Template wrapper templates must use \"" + formlyTransclude + "\" somewhere in them. " + ("This one does not have \"<formly-transclude></formly-transclude>\" in it: " + template) + "\n" + ("Additional information: " + JSON.stringify(additionalInfo)));
	      }
	    }
	  }]);
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(4);
	var utils = __webpack_require__(24);
	
	module.exports = function (ngModule) {
	  ngModule.provider("formlyConfig", formlyConfig);
	
	  formlyConfig.tests = false ? require("./formlyConfig.test")(ngModule) : null;
	
	  function formlyConfig(formlyUsabilityProvider, formlyApiCheck) {
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
	      removeWrapperByName: removeWrapperByName,
	      removeWrappersForType: removeWrappersForType,
	      disableWarnings: false,
	      extras: {
	        disableNgModelAttrsManipulator: false,
	        ngModelAttrsManipulatorPreferBound: false,
	        removeChromeAutoComplete: false
	      },
	      templateManipulators: {
	        preWrapper: [],
	        postWrapper: []
	      },
	      $get: function () {
	        return _this2;
	      }
	    });
	
	    function setType(options) {
	      if (angular.isArray(options)) {
	        angular.forEach(options, setType);
	      } else if (angular.isObject(options)) {
	        checkType(options);
	        if (options["extends"]) {
	          extendTypeOptions(options);
	        }
	        typeMap[options.name] = options;
	      } else {
	        throw getError("You must provide an object or array for setType. You provided: " + JSON.stringify(arguments));
	      }
	    }
	
	    function checkType(options) {
	      formlyApiCheck["throw"](formlyApiCheck.formlyTypeOptions, arguments, {
	        prefix: "formlyConfig.setType",
	        url: "settype-validation-failed"
	      });
	      if (!options.overwriteOk) {
	        checkOverwrite(options.name, typeMap, options, "types");
	      } else {
	        options.overwriteOk = undefined;
	      }
	    }
	
	    function extendTypeOptions(options) {
	      var extendsType = getType(options["extends"], true, options);
	      extendTypeControllerFunction(options, extendsType);
	      extendTypeLinkFunction(options, extendsType);
	      extendTypeValidateOptionsFunction(options, extendsType);
	      extendTypeDefaultOptions(options, extendsType);
	      utils.reverseDeepMerge(options, extendsType);
	    }
	
	    function extendTypeControllerFunction(options, extendsType) {
	      var extendsCtrl = extendsType.controller;
	      if (!angular.isDefined(extendsCtrl)) {
	        return;
	      }
	      var optionsCtrl = options.controller;
	      if (angular.isDefined(optionsCtrl)) {
	        options.controller = function ($scope, $controller) {
	          $controller(extendsCtrl, { $scope: $scope });
	          $controller(optionsCtrl, { $scope: $scope });
	        };
	        options.controller.$inject = ["$scope", "$controller"];
	      } else {
	        options.controller = extendsCtrl;
	      }
	    }
	
	    function extendTypeLinkFunction(options, extendsType) {
	      var extendsFn = extendsType.link;
	      if (!angular.isDefined(extendsFn)) {
	        return;
	      }
	      var optionsFn = options.link;
	      if (angular.isDefined(optionsFn)) {
	        options.link = function () {
	          extendsFn.apply(undefined, arguments);
	          optionsFn.apply(undefined, arguments);
	        };
	      } else {
	        options.link = extendsFn;
	      }
	    }
	
	    function extendTypeValidateOptionsFunction(options, extendsType) {
	      var extendsFn = extendsType.validateOptions;
	      if (!angular.isDefined(extendsFn)) {
	        return;
	      }
	      var optionsFn = options.validateOptions;
	      var originalDefaultOptions = options.defaultOptions;
	      if (angular.isDefined(optionsFn)) {
	        options.validateOptions = function (options) {
	          optionsFn(options);
	          var mergedOptions = angular.copy(options);
	          var defaultOptions = originalDefaultOptions;
	          if (defaultOptions) {
	            if (angular.isFunction(defaultOptions)) {
	              defaultOptions = defaultOptions(mergedOptions);
	            }
	            utils.reverseDeepMerge(mergedOptions, defaultOptions);
	          }
	          extendsFn(mergedOptions);
	        };
	      } else {
	        options.validateOptions = extendsFn;
	      }
	    }
	
	    function extendTypeDefaultOptions(options, extendsType) {
	      var extendsDO = extendsType.defaultOptions;
	      if (!angular.isDefined(extendsDO)) {
	        return;
	      }
	      var optionsDO = options.defaultOptions;
	      var optionsDOIsFn = angular.isFunction(optionsDO);
	      var extendsDOIsFn = angular.isFunction(extendsDO);
	      if (extendsDOIsFn) {
	        options.defaultOptions = function defaultOptions(options) {
	          var extendsDefaultOptions = extendsDO(options);
	          var mergedDefaultOptions = {};
	          utils.reverseDeepMerge(mergedDefaultOptions, options, extendsDefaultOptions);
	          var extenderOptionsDefaultOptions = optionsDO;
	          if (optionsDOIsFn) {
	            extenderOptionsDefaultOptions = extenderOptionsDefaultOptions(mergedDefaultOptions);
	          }
	          utils.reverseDeepMerge(extendsDefaultOptions, extenderOptionsDefaultOptions);
	          return extendsDefaultOptions;
	        };
	      } else if (optionsDOIsFn) {
	        options.defaultOptions = function defaultOptions(options) {
	          var newDefaultOptions = {};
	          utils.reverseDeepMerge(newDefaultOptions, options, extendsDO);
	          return optionsDO(newDefaultOptions);
	        };
	      }
	    }
	
	    function getType(name, throwError, errorContext) {
	      if (!name) {
	        return undefined;
	      }
	      var type = typeMap[name];
	      if (!type && throwError === true) {
	        throw getError("There is no type by the name of \"" + name + "\": " + JSON.stringify(errorContext));
	      } else {
	        return type;
	      }
	    }
	
	    function setWrapper(_x, _x2) {
	      var _again = true;
	
	      _function: while (_again) {
	        _again = false;
	        var options = _x,
	            name = _x2;
	
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
	          _x = {
	            template: options,
	            name: name
	          };
	          _again = true;
	          continue _function;
	        }
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
	      if (!options.overwriteOk) {
	        checkOverwrite(options.name, templateWrappersMap, options, "templateWrappers");
	      } else {
	        delete options.overwriteOk;
	      }
	      checkWrapperTypes(options);
	    }
	
	    function checkWrapperTypes(options) {
	      var shouldThrow = !angular.isArray(options.types) || !options.types.every(angular.isString);
	      if (shouldThrow) {
	        throw getError("Attempted to create a template wrapper with types that is not a string or an array of strings");
	      }
	    }
	
	    function checkOverwrite(property, object, newValue, objectName) {
	      if (object.hasOwnProperty(property)) {
	        warn(["Attempting to overwrite " + property + " on " + objectName + " which is currently", "" + JSON.stringify(object[property]) + " with " + JSON.stringify(newValue), "To supress this warning, specify the property \"overwriteOk: true\""].join(" "));
	      }
	    }
	
	    function getWrapper(name) {
	      return templateWrappersMap[name || defaultWrapperName];
	    }
	
	    function getWrapperByType(type) {
	      /* jshint maxcomplexity:6 */
	      var wrappers = [];
	      for (var name in templateWrappersMap) {
	        if (templateWrappersMap.hasOwnProperty(name)) {
	          if (templateWrappersMap[name].types && templateWrappersMap[name].types.indexOf(type) !== -1) {
	            wrappers.push(templateWrappersMap[name]);
	          }
	        }
	      }
	      return wrappers;
	    }
	
	    function removeWrapperByName(name) {
	      var wrapper = templateWrappersMap[name];
	      delete templateWrappersMap[name];
	      return wrapper;
	    }
	
	    function removeWrappersForType(type) {
	      var wrappers = getWrapperByType(type);
	      if (!wrappers) {
	        return;
	      }
	      if (!angular.isArray(wrappers)) {
	        return removeWrapperByName(wrappers.name);
	      } else {
	        wrappers.forEach(function (wrapper) {
	          return removeWrapperByName(wrapper.name);
	        });
	        return wrappers;
	      }
	    }
	
	    function warn() {
	      if (!_this.disableWarnings) {
	        console.warn.apply(console, arguments);
	      }
	    }
	  }
	  formlyConfig.$inject = ["formlyUsabilityProvider", "formlyApiCheck"];
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyVersion", ("6.0.0-beta.0"));
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyErrorAndWarningsUrlPrefix", "https://github.com/formly-js/angular-formly/blob/" + ("6.0.0-beta.0") + "/other/ERRORS_AND_WARNINGS.md#");
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.factory("formlyValidationMessages", function () {
	
	    var formlyValidationMessages = {
	      addTemplateOptionValueMessage: addTemplateOptionValueMessage,
	      addStringMessage: addStringMessage,
	      messages: {}
	    };
	
	    return formlyValidationMessages;
	
	    function addTemplateOptionValueMessage(name, prop, prefix, suffix, alternate) {
	      formlyValidationMessages.messages[name] = templateOptionValue(prop, prefix, suffix, alternate);
	    }
	
	    function addStringMessage(name, string) {
	      formlyValidationMessages.messages[name] = function () {
	        return string;
	      };
	    }
	
	    function templateOptionValue(prop, prefix, suffix, alternate) {
	      return function getValidationMessage(viewValue, modelValue, scope) {
	        if (scope.options.templateOptions[prop]) {
	          return "" + prefix + " " + scope.options.templateOptions[prop] + " " + suffix;
	        } else {
	          return alternate;
	        }
	      };
	    }
	  });
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var utils = __webpack_require__(24);
	
	module.exports = function (ngModule) {
	  ngModule.factory("formlyUtil", formlyUtil);
	
	  formlyUtil.tests = false ? require("./formlyUtil.test")(ngModule) : null;
	
	  function formlyUtil() {
	    return utils;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	module.exports = function (ngModule) {
	  ngModule.factory("formlyWarn", ["formlyConfig", "formlyErrorAndWarningsUrlPrefix", "$log", function (formlyConfig, formlyErrorAndWarningsUrlPrefix, $log) {
	    return function warn() {
	      if (!formlyConfig.disableWarnings) {
	        var args = Array.prototype.slice.call(arguments);
	        var warnInfoSlug = args.shift();
	        args.unshift("Formly Warning:");
	        args.push("" + formlyErrorAndWarningsUrlPrefix + "" + warnInfoSlug);
	        $log.warn.apply($log, _toConsumableArray(args));
	      }
	    };
	  }]);
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyCustomValidation", formlyCustomValidation);
	
	  formlyCustomValidation.tests = false ? require("./formly-custom-validation.test")(ngModule) : null;
	
	  function formlyCustomValidation(formlyUtil, $q) {
	    return {
	      restrict: "A",
	      require: "ngModel",
	      link: function link(scope, el, attrs, ctrl) {
	        var opts = scope.options;
	        if (opts.validators) {
	          checkValidators(opts.validators);
	        }
	        opts.validation.messages = opts.validation.messages || {};
	        angular.forEach(opts.validation.messages, function (message, key) {
	          opts.validation.messages[key] = function () {
	            return formlyUtil.formlyEval(scope, message, ctrl.$modelValue, ctrl.$viewValue);
	          };
	        });
	
	        var useNewValidatorsApi = ctrl.hasOwnProperty("$validators") && !attrs.hasOwnProperty("useParsers");
	        angular.forEach(opts.validators, function (validator, name) {
	          var message = validator.message;
	          if (message) {
	            opts.validation.messages[name] = function () {
	              return formlyUtil.formlyEval(scope, message, ctrl.$modelValue, ctrl.$viewValue);
	            };
	          }
	          validator = angular.isObject(validator) ? validator.expression : validator;
	          var isPossiblyAsync = !angular.isString(validator);
	          if (useNewValidatorsApi) {
	            setupWithValidators();
	          } else {
	            setupWithParsers();
	          }
	
	          function setupWithValidators() {
	            var validatorCollection = isPossiblyAsync ? "$asyncValidators" : "$validators";
	            ctrl[validatorCollection][name] = function (modelValue, viewValue) {
	              var value = formlyUtil.formlyEval(scope, validator, modelValue, viewValue);
	              if (isPossiblyAsync) {
	                return isPromiseLike(value) ? value : value ? $q.when(value) : $q.reject(value);
	              } else {
	                return value;
	              }
	            };
	          }
	
	          function setupWithParsers() {
	            var inFlightValidator = undefined;
	            ctrl.$parsers.unshift(function (viewValue) {
	              var isValid = formlyUtil.formlyEval(scope, validator, ctrl.$modelValue, viewValue);
	              if (isPromiseLike(isValid)) {
	                ctrl.$pending = ctrl.$pending || {};
	                ctrl.$pending[name] = true;
	                inFlightValidator = isValid;
	                isValid.then(function () {
	                  if (inFlightValidator === isValid) {
	                    ctrl.$setValidity(name, true);
	                  }
	                })["catch"](function () {
	                  if (inFlightValidator === isValid) {
	                    ctrl.$setValidity(name, false);
	                  }
	                })["finally"](function () {
	                  if (Object.keys(ctrl.$pending).length === 1) {
	                    delete ctrl.$pending;
	                  } else {
	                    delete ctrl.$pending[name];
	                  }
	                });
	              } else {
	                ctrl.$setValidity(name, isValid);
	              }
	              return viewValue;
	            });
	          }
	        });
	      }
	    };
	
	    function isPromiseLike(obj) {
	      return obj && angular.isFunction(obj.then);
	    }
	
	    function checkValidators(validators) {
	      var allowedProperties = ["expression", "message"];
	      var validatorsWithExtraProps = {};
	      angular.forEach(validators, function (validator, name) {
	        if (angular.isString(validator)) {
	          return;
	        }
	        var extraProps = [];
	        angular.forEach(validator, function (v, key) {
	          if (allowedProperties.indexOf(key) === -1) {
	            extraProps.push(key);
	          }
	        });
	        if (extraProps.length) {
	          validatorsWithExtraProps[name] = extraProps;
	        }
	      });
	      if (Object.keys(validatorsWithExtraProps).length) {
	        throw new Error(["Validators are only allowed to be functions or objects that have " + allowedProperties.join(", ") + ".", "You provided some extra properties: " + JSON.stringify(validatorsWithExtraProps)].join(" "));
	      }
	    }
	  }
	  formlyCustomValidation.$inject = ["formlyUtil", "$q"];
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(4);
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyField", formlyField);
	
	  formlyField.tests = false ? require("./formly-field.test")(ngModule) : null;
	
	  /**
	   * @ngdoc directive
	   * @name formlyField
	   * @restrict AE
	   */
	  function formlyField($http, $q, $compile, $templateCache, formlyConfig, formlyValidationMessages, formlyApiCheck, formlyUtil, formlyUsability, formlyWarn) {
	    return {
	      restrict: "AE",
	      transclude: true,
	      scope: {
	        options: "=",
	        model: "=",
	        formId: "@",
	        index: "=?",
	        fields: "=?",
	        formState: "=?",
	        form: "=?"
	      },
	      controller: ["$scope", "$timeout", "$parse", "$controller", function fieldController($scope, $timeout, $parse, $controller) {
	        var opts = $scope.options;
	        var fieldType = opts.type && formlyConfig.getType(opts.type);
	        simplifyLife(opts);
	        mergeFieldOptionsWithTypeDefaults(opts, fieldType);
	        extendOptionsWithDefaults(opts, $scope.index);
	        checkApi(opts);
	        // set field id to link labels and fields
	        $scope.id = formlyUtil.getFieldId($scope.formId, opts, $scope.index);
	
	        // initalization
	        runExpressions();
	        setFormControl($scope, opts);
	        addModelWatcher($scope, opts);
	        addValidationMessages(opts);
	        // simplify things
	        // create $scope.to so template authors can reference to instead of $scope.options.templateOptions
	        $scope.to = $scope.options.templateOptions;
	        invokeControllers($scope, opts, fieldType);
	
	        // function definitions
	        function runExpressions() {
	          $timeout(function () {
	            // must run on next tick to make sure that the current value is correct.
	            var field = $scope.options;
	            var currentValue = valueGetterSetter();
	            angular.forEach(field.expressionProperties, function runExpression(expression, prop) {
	              var setter = $parse(prop).assign;
	              var promise = $q.when(formlyUtil.formlyEval($scope, expression, currentValue));
	              promise.then(function (value) {
	                setter(field, value);
	              });
	            });
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
	
	        function simplifyLife(options) {
	          // add a few empty objects (if they don't already exist) so you don't have to undefined check everywhere
	          formlyUtil.reverseDeepMerge(options, {
	            data: {},
	            templateOptions: {},
	            validation: {}
	          });
	        }
	
	        function mergeFieldOptionsWithTypeDefaults(options, type) {
	          if (type) {
	            mergeOptions(options, type.defaultOptions);
	          }
	          var properOrder = arrayify(options.optionsTypes).reverse(); // so the right things are overridden
	          angular.forEach(properOrder, function (typeName) {
	            mergeOptions(options, formlyConfig.getType(typeName, true, options).defaultOptions);
	          });
	        }
	
	        function mergeOptions(options, extraOptions) {
	          if (extraOptions) {
	            if (angular.isFunction(extraOptions)) {
	              extraOptions = extraOptions(options);
	            }
	            formlyUtil.reverseDeepMerge(options, extraOptions);
	          }
	        }
	
	        function extendOptionsWithDefaults(options, index) {
	          var key = options.key || index || 0;
	          var initialValue = $scope.model && $scope.model[key];
	          angular.extend(options, {
	            // attach the key in case the formly-field directive is used directly
	            key: key,
	            value: valueGetterSetter,
	            runExpressions: runExpressions,
	            resetModel: resetModel,
	            updateInitialValue: updateInitialValue,
	            initialValue: initialValue
	          });
	        }
	
	        // initialization functions
	        function setFormControl(scope, options) {
	          if (options.noFormControl) {
	            return;
	          }
	          scope.$watch("form[\"" + scope.id + "\"]", function (formControl) {
	            if (formControl) {
	              scope.fc = formControl; // shortcut for template authors
	              scope.options.formControl = formControl;
	              addShowMessagesWatcher(scope, options);
	            }
	          });
	        }
	
	        function addModelWatcher(scope, options) {
	          if (options.model) {
	            scope.$watch("options.model", runExpressions, true);
	          }
	        }
	
	        function addShowMessagesWatcher(scope, options) {
	          scope.$watch(function () {
	            if (typeof scope.options.validation.show === "boolean") {
	              return scope.fc.$invalid && scope.options.validation.show;
	            } else {
	              var noTouchedButDirty = angular.isUndefined(scope.fc.$touched) && scope.fc.$dirty;
	              return scope.fc.$invalid && (scope.fc.$touched || noTouchedButDirty);
	            }
	          }, function (show) {
	            options.validation.errorExistsAndShouldBeVisible = show;
	            scope.showError = show; // shortcut for template authors
	          });
	        }
	
	        function resetModel() {
	          $scope.model[$scope.options.key] = $scope.options.initialValue;
	          if ($scope.options.formControl) {
	            $scope.options.formControl.$setViewValue($scope.model[$scope.options.key]);
	            $scope.options.formControl.$render();
	          }
	        }
	
	        function updateInitialValue() {
	          $scope.options.initialValue = $scope.model[$scope.options.key];
	        }
	
	        function addValidationMessages(options) {
	          options.validation.messages = options.validation.messages || {};
	          angular.forEach(formlyValidationMessages.messages, function (expression, name) {
	            if (!options.validation.messages[name]) {
	              options.validation.messages[name] = function (viewValue, modelValue, scope) {
	                return formlyUtil.formlyEval(scope, expression, modelValue, viewValue);
	              };
	            }
	          });
	        }
	
	        function invokeControllers(scope) {
	          var options = arguments[1] === undefined ? {} : arguments[1];
	          var type = arguments[2] === undefined ? {} : arguments[2];
	
	          angular.forEach([type.controller, options.controller], function (controller) {
	            if (controller) {
	              $controller(controller, { $scope: scope });
	            }
	          });
	        }
	      }],
	      link: function fieldLink(scope, el) {
	        var type = scope.options.type && formlyConfig.getType(scope.options.type);
	        var args = arguments;
	        var thusly = this;
	        getFieldTemplate(scope.options).then(runManipulators(formlyConfig.templateManipulators.preWrapper)).then(transcludeInWrappers(scope.options)).then(runManipulators(formlyConfig.templateManipulators.postWrapper)).then(setElementTemplate)["catch"](function (error) {
	          formlyWarn("there-was-a-problem-setting-the-template-for-this-field", "There was a problem setting the template for this field ", scope.options, error);
	        });
	
	        function setElementTemplate(templateEl) {
	          el.html(asHtml(templateEl));
	          $compile(el.contents())(scope);
	          if (type && type.link) {
	            type.link.apply(thusly, args);
	          }
	          if (scope.options.link) {
	            scope.options.link.apply(thusly, args);
	          }
	        }
	
	        function runManipulators(manipulators) {
	          return function runManipulatorsOnTemplate(template) {
	            var chain = $q.when(template);
	            angular.forEach(manipulators, function (manipulator) {
	              chain = chain.then(function (template) {
	                return $q.when(manipulator(template, scope.options, scope)).then(function (newTemplate) {
	                  return angular.isString(newTemplate) ? newTemplate : asHtml(newTemplate);
	                });
	              });
	            });
	            return chain;
	          };
	        }
	      }
	    };
	
	    function asHtml(el) {
	      var wrapper = angular.element("<a></a>");
	      return wrapper.append(el).html();
	    }
	
	    function getFieldTemplate(options) {
	      var type = formlyConfig.getType(options.type, true, options);
	      var template = options.template || type && type.template;
	      var templateUrl = options.templateUrl || type && type.templateUrl;
	      if (!template && !templateUrl) {
	        throw formlyUsability.getFieldError("type-type-has-no-template", "Type '" + options.type + "' has not template. On element:", options);
	      }
	      return getTemplate(template || templateUrl, !template);
	    }
	
	    function getTemplate(template, isUrl) {
	      if (!isUrl) {
	        return $q.when(template);
	      } else {
	        var httpOptions = { cache: $templateCache };
	        return $http.get(template, httpOptions).then(function (response) {
	          return response.data;
	        })["catch"](function (error) {
	          formlyWarn("problem-loading-template-for-templateurl", "Problem loading template for " + template, error);
	        });
	      }
	    }
	
	    function transcludeInWrappers(options) {
	      var wrapper = getWrapperOption(options);
	
	      return function transcludeTemplate(template) {
	        if (!wrapper.length) {
	          return $q.when(template);
	        }
	
	        wrapper.forEach(function (wrapper) {
	          formlyUsability.checkWrapper(wrapper, options);
	          wrapper.validateOptions && wrapper.validateOptions(options);
	          runApiCheck(wrapper, options);
	        });
	        var promises = wrapper.map(function (w) {
	          return getTemplate(w.template || w.templateUrl, !w.template);
	        });
	        return $q.all(promises).then(function (wrappersTemplates) {
	          wrappersTemplates.forEach(function (wrapperTemplate, index) {
	            formlyUsability.checkWrapperTemplate(wrapperTemplate, wrapper[index]);
	          });
	          wrappersTemplates.reverse(); // wrapper 0 is wrapped in wrapper 1 and so on...
	          var totalWrapper = wrappersTemplates.shift();
	          wrappersTemplates.forEach(function (wrapperTemplate) {
	            totalWrapper = doTransclusion(totalWrapper, wrapperTemplate);
	          });
	          return doTransclusion(totalWrapper, template);
	        });
	      };
	    }
	
	    function doTransclusion(wrapper, template) {
	      var superWrapper = angular.element("<a></a>"); // this allows people not have to have a single root in wrappers
	      superWrapper.append(wrapper);
	      var transcludeEl = superWrapper.find("formly-transclude");
	      if (!transcludeEl.length) {
	        //try it using our custom find function
	        transcludeEl = formlyUtil.findByNodeName(superWrapper, "formly-transclude");
	      }
	      transcludeEl.replaceWith(template);
	      return superWrapper.html();
	    }
	
	    function getWrapperOption(options) {
	      var wrapper = options.wrapper;
	      // explicit null means no wrapper
	      if (wrapper === null) {
	        return [];
	      }
	
	      // nothing specified means use the default wrapper for the type
	      if (!wrapper) {
	        // get all wrappers that specify they apply to this type
	        wrapper = arrayify(formlyConfig.getWrapperByType(options.type));
	      } else {
	        wrapper = arrayify(wrapper).map(formlyConfig.getWrapper);
	      }
	
	      // get all wrappers for that this type specified that it uses.
	      var type = formlyConfig.getType(options.type, true, options);
	      if (type && type.wrapper) {
	        var typeWrappers = arrayify(type.wrapper).map(formlyConfig.getWrapper);
	        wrapper = wrapper.concat(typeWrappers);
	      }
	
	      // add the default wrapper last
	      var defaultWrapper = formlyConfig.getWrapper();
	      if (defaultWrapper) {
	        wrapper.push(defaultWrapper);
	      }
	      return wrapper;
	    }
	
	    function checkApi(options) {
	      formlyApiCheck["throw"](formlyApiCheck.formlyFieldOptions, arguments, {
	        prefix: "formly-field directive",
	        url: "formly-field-directive-validation-failed"
	      });
	      // validate with the type
	      var type = options.type && formlyConfig.getType(options.type);
	      if (type) {
	        if (type.validateOptions) {
	          type.validateOptions(options);
	        }
	        runApiCheck(type, options);
	      }
	    }
	
	    function runApiCheck(_ref, options) {
	      var apiCheck = _ref.apiCheck;
	      var apiCheckInstance = _ref.apiCheckInstance;
	      var apiCheckFunction = _ref.apiCheckFunction;
	      var apiCheckOptions = _ref.apiCheckOptions;
	
	      if (!apiCheck) {
	        return;
	      }
	      var instance = apiCheckInstance || formlyApiCheck;
	      var fn = apiCheckFunction || "warn";
	      var shape = instance.shape(apiCheck);
	      instance[fn](shape, [options], apiCheckOptions || {
	        prefix: "formly-field " + name,
	        url: formlyApiCheck.config.output.docsBaseUrl + "formly-field-type-apicheck-failed"
	      });
	    }
	  }
	  formlyField.$inject = ["$http", "$q", "$compile", "$templateCache", "formlyConfig", "formlyValidationMessages", "formlyApiCheck", "formlyUtil", "formlyUsability", "formlyWarn"];
	
	  function arrayify(obj) {
	    if (obj && !angular.isArray(obj)) {
	      obj = [obj];
	    } else if (!obj) {
	      obj = [];
	    }
	    return obj;
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _slice = Array.prototype.slice;
	var angular = __webpack_require__(4);
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyForm", formlyForm);
	
	  formlyForm.tests = false ? require("./formly-form.test")(ngModule) : null;
	
	  /**
	   * @ngdoc directive
	   * @name formlyForm
	   * @restrict E
	   */
	  function formlyForm(formlyUsability, $parse, formlyApiCheck, formlyConfig) {
	    var currentFormId = 1;
	    var optionsApi = [formlyApiCheck.shape({
	      formState: formlyApiCheck.object.optional,
	      resetModel: formlyApiCheck.func.optional,
	      updateInitialValue: formlyApiCheck.func.optional,
	      removeChromeAutoComplete: formlyApiCheck.bool.optional
	    }).strict.optional];
	    return {
	      restrict: "E",
	      template: function template(el, attrs) {
	        /* jshint -W033 */ // this because jshint is broken I guess...
	        var rootEl = attrs.rootEl || "ng-form";
	        var formName = "formly_" + currentFormId++;
	        return "\n          <" + rootEl + " class=\"formly\"\n                   name=\"" + formName + "\"\n                   role=\"form\">\n            <div formly-field\n                 ng-repeat=\"field in fields track by $index\"\n                 ng-if=\"!field.hide\"\n                 class=\"formly-field {{field.type ? 'formly-field-' + field.type : ''}}\"\n                 options=\"field\"\n                 model=\"field.model || model\"\n                 fields=\"fields\"\n                 form=\"" + formName + "\"\n                 form-id=\"" + formName + "\"\n                 form-state=\"options.formState\"\n                 index=\"$index\">\n            </div>\n            <div ng-transclude></div>\n          </" + rootEl + ">\n        ";
	      },
	      replace: true,
	      transclude: true,
	      scope: {
	        fields: "=",
	        model: "=",
	        form: "=?",
	        options: "=?"
	      },
	      controller: ["$scope", function controller($scope) {
	        setupOptions();
	        $scope.model = $scope.model || {};
	        $scope.fields = $scope.fields || [];
	
	        angular.forEach($scope.fields, attachKey); // attaches a key based on the index if a key isn't specified
	        angular.forEach($scope.fields, setupWatchers); // setup watchers for all fields
	
	        // watch the model and evaluate watch expressions that depend on it.
	        $scope.$watch("model", function onResultUpdate(newResult) {
	          angular.forEach($scope.fields, function (field) {
	            /*jshint -W030 */
	            field.runExpressions && field.runExpressions(newResult);
	          });
	        }, true);
	
	        function setupOptions() {
	          formlyApiCheck["throw"](optionsApi, [$scope.options], { prefix: "formly-form options check" });
	          $scope.options = $scope.options || {};
	          $scope.options.formState = $scope.options.formState || {};
	
	          angular.extend($scope.options, {
	            updateInitialValue: updateInitialValue,
	            resetModel: resetModel
	          });
	        }
	
	        function updateInitialValue() {
	          angular.forEach($scope.fields, function (field) {
	            return field.updateInitialValue();
	          });
	        }
	
	        function resetModel() {
	          angular.forEach($scope.fields, function (field) {
	            return field.resetModel();
	          });
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
	              return originalExpression.apply(undefined, _toConsumableArray(args));
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
	              return originalListener.apply(undefined, _toConsumableArray(args));
	            };
	            watchListener.displayName = "Formly Watch Listener for field for " + field.key;
	          }
	          return watchListener;
	        }
	
	        function modifyArgs(watcher, index) {
	          for (var _len = arguments.length, originalArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	            originalArgs[_key - 2] = arguments[_key];
	          }
	
	          return [$scope.fields[index]].concat(originalArgs, [watcher.stopWatching]);
	        }
	      }],
	      link: function link(scope, el, attrs) {
	        if (attrs.form) {
	          var formId = attrs.name;
	          $parse(attrs.form).assign(scope.$parent, scope[formId]);
	        }
	
	        // chrome autocomplete lameness
	        // see https://code.google.com/p/chromium/issues/detail?id=468153#c14
	        // ლ(ಠ益ಠლ)   (╯°□°)╯︵ ┻━┻    (◞‸◟；)
	        var global = formlyConfig.extras.removeChromeAutoComplete === true;
	        var offInstance = scope.options && scope.options.removeChromeAutoComplete === false;
	        var onInstance = scope.options && scope.options.removeChromeAutoComplete === true;
	        if (global && !offInstance || onInstance) {
	          var input = document.createElement("input");
	          input.setAttribute("autocomplete", "address-level4");
	          input.setAttribute("hidden", true);
	          el[0].appendChild(input);
	        }
	      }
	    };
	  }
	  formlyForm.$inject = ["formlyUsability", "$parse", "formlyApiCheck", "formlyConfig"];
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyFocus", ["$timeout", "$document", function ($timeout, $document) {
	    /* jshint -W052 */
	    return {
	      restrict: "A",
	      link: function link(scope, element, attrs) {
	        var previousEl = null;
	        var el = element[0];
	        var doc = $document[0];
	        attrs.$observe("formlyFocus", function (value) {
	          if (value === "true") {
	            $timeout(function () {
	              previousEl = doc.activeElement;
	              el.focus();
	            }, ~ ~attrs.focusWait);
	          } else if (value === "false") {
	            if (doc.activeElement === el) {
	              el.blur();
	              if (attrs.hasOwnProperty("refocus") && previousEl) {
	                previousEl.focus();
	              }
	            }
	          }
	        });
	      }
	    };
	  }]);
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.run(addFormlyNgModelAttrsManipulator);
	
	  function addFormlyNgModelAttrsManipulator(formlyConfig, formlyUsability) {
	    if (formlyConfig.extras.disableNgModelAttrsManipulator) {
	      return;
	    }
	    formlyConfig.templateManipulators.preWrapper.push(ngModelAttrsManipulator);
	
	    function ngModelAttrsManipulator(template, options, scope) {
	      /* jshint maxcomplexity:6 */
	      var el = document.createElement("div");
	      var data = options.data;
	      if (data.noTouchy) {
	        formlyUsability.getFormlyError("data.noTouchy is going to be removed in an upcoming release. This was an awful name to begin with. " + "Please use `data.skipNgModelAttrsManipulator = true` instead.");
	      }
	      if (data.noTouchy || data.skipNgModelAttrsManipulator === true) {
	        return template;
	      }
	      el.innerHTML = template;
	      var modelNodes = el.querySelectorAll("[ng-model]");
	      if (!modelNodes || !modelNodes.length) {
	        return template;
	      }
	
	      addIfNotPresent(modelNodes, "id", scope.id);
	      addIfNotPresent(modelNodes, "name", scope.id);
	
	      addValidation();
	      addModelOptions();
	      addTemplateOptionsAttrs();
	
	      return el.innerHTML;
	
	      function addValidation() {
	        if (angular.isDefined(options.validators) || angular.isDefined(options.validation.messages)) {
	          addIfNotPresent(modelNodes, "formly-custom-validation", "");
	        }
	      }
	
	      function addModelOptions() {
	        if (angular.isDefined(options.modelOptions)) {
	          addIfNotPresent(modelNodes, "ng-model-options", "options.modelOptions");
	          if (options.modelOptions.getterSetter) {
	            modelNodes.attr("ng-model", "options.value");
	          }
	        }
	      }
	
	      function addTemplateOptionsAttrs() {
	        if (!options.templateOptions && !options.expressionProperties) {
	          // no need to run these if there are no templateOptions or expressionProperties
	          return;
	        }
	        var to = options.templateOptions || {};
	        var ep = options.expressionProperties || {};
	
	        var ngModelAttributes = getBuiltinAttributes();
	
	        // extend with the user's specifications winning
	        angular.extend(ngModelAttributes, options.ngModelAttrs);
	
	        angular.forEach(ngModelAttributes, function (val, name) {
	          /* jshint maxcomplexity:10 */
	          var attrVal = undefined;
	          var attrName = undefined;
	          var ref = "options.templateOptions['" + name + "']";
	          var toVal = to[name];
	          var epVal = getEpValue(ep, name);
	
	          var inTo = angular.isDefined(toVal);
	          var inEp = angular.isDefined(epVal);
	          if (val.value) {
	            // I realize this looks backwards, but it's right, trust me...
	            attrName = val.value;
	            attrVal = name;
	          } else if (val.expression && inTo) {
	            attrName = val.expression;
	            if (angular.isString(to[name])) {
	              attrVal = "$eval(" + ref + ")";
	            } else if (angular.isFunction(to[name])) {
	              attrVal = "" + ref + "(model[options.key], options, this, $event)";
	            } else {
	              throw new Error("options.templateOptions." + name + " must be a string or function: " + JSON.stringify(options));
	            }
	          } else if (val.bound && inEp) {
	            attrName = val.bound;
	            attrVal = ref;
	          } else if (val.attribute && inEp) {
	            attrName = val.attribute;
	            attrVal = "{{" + ref + "}}";
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
	      var ngModelAttributes = {
	        focus: {
	          attribute: "formly-focus"
	        }
	      };
	      var boundOnly = [];
	      var bothAttributeAndBound = ["required", "disabled", "pattern", "minlength"];
	      var expressionOnly = ["change", "keydown", "keyup", "keypress", "click", "focus", "blur"];
	      var attributeOnly = ["placeholder", "min", "max", "tabindex", "type"];
	      if (formlyConfig.extras.ngModelAttrsManipulatorPreferBound) {
	        boundOnly.push("maxlength");
	      } else {
	        bothAttributeAndBound.push("maxlength");
	      }
	
	      angular.forEach(boundOnly, function (item) {
	        ngModelAttributes[item] = { bound: "ng-" + item };
	      });
	
	      angular.forEach(bothAttributeAndBound, function (item) {
	        ngModelAttributes[item] = { attribute: item, bound: "ng-" + item };
	      });
	
	      angular.forEach(expressionOnly, function (item) {
	        var propName = "on" + item.substr(0, 1).toUpperCase() + item.substr(1);
	        ngModelAttributes[propName] = { expression: "ng-" + item };
	      });
	
	      angular.forEach(attributeOnly, function (item) {
	        ngModelAttributes[item] = { attribute: item };
	      });
	      return ngModelAttributes;
	    }
	
	    function getEpValue(ep, name) {
	      return ep["templateOptions." + name] || ep["templateOptions['" + name + "']"] || ep["templateOptions[\"" + name + "\"]"];
	    }
	
	    function addIfNotPresent(nodes, attr, val) {
	      angular.forEach(nodes, function (node) {
	        if (!node.getAttribute(attr)) {
	          node.setAttribute(attr, val);
	        }
	      });
	    }
	  }
	  addFormlyNgModelAttrsManipulator.$inject = ["formlyConfig", "formlyUsability"];
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.run(addCustomTags);
	
	  function addCustomTags($document) {
	
	    if ($document && $document.get) {
	      //IE8 check ->
	      // http://stackoverflow.com/questions/10964966/detect-ie-version-prior-to-v9-in-javascript/10965203#10965203
	      var document = $document.get(0);
	      var div = document.createElement("div");
	      div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
	      var isIeLessThan9 = div.getElementsByTagName("i").length === 1;
	
	      if (isIeLessThan9) {
	        //add the custom elements that we need for formly
	        var customElements = ["formly-field", "formly-form", "formly-custom-validation", "formly-focus", "formly-transpose"];
	
	        for (var i = 0; i < customElements.length; i++) {
	          document.createElement(customElements[i]);
	        }
	      }
	    }
	  }
	  addCustomTags.$inject = ["$document"];
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(4);
	
	module.exports = { formlyEval: formlyEval, getFieldId: getFieldId, reverseDeepMerge: reverseDeepMerge, findByNodeName: findByNodeName };
	
	function formlyEval(scope, expression, modelValue, viewValue) {
	  if (angular.isFunction(expression)) {
	    return expression(viewValue, modelValue, scope);
	  } else {
	    return scope.$eval(expression, {
	      $viewValue: viewValue || modelValue,
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
	
	function reverseDeepMerge(dest) {
	  angular.forEach(arguments, function (src, index) {
	    if (!index) {
	      return;
	    }
	    angular.forEach(src, function (val, prop) {
	      if (!angular.isDefined(dest[prop])) {
	        dest[prop] = angular.copy(val);
	      } else if (objAndSameType(dest[prop], val)) {
	        reverseDeepMerge(dest[prop], val);
	      }
	    });
	  });
	}
	
	function objAndSameType(obj1, obj2) {
	  return angular.isObject(obj1) && angular.isObject(obj2) && Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2);
	}
	
	//recurse down a node tree to find a node with matching nodeName, for custom tags jQuery.find doesn't work in IE8
	function findByNodeName(el, nodeName) {
	  if (!el.prop) {
	    // not a jQuery or jqLite object -> wrap it
	    el = angular.element(el);
	  }
	
	  if (el.prop("nodeName") === nodeName.toUpperCase()) {
	    return el;
	  }
	
	  var c = el.children();
	  for (var i = 0; c && i < c.length; i++) {
	    var node = findByNodeName(c[i], nodeName);
	    if (node) {
	      return node;
	    }
	  }
	}

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0YWQ1MjE5NjJlNWRhYjdlNDliNSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jb21tb24uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImFwaUNoZWNrXCIsXCJhbWRcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanMyXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzXCI6XCJhcGktY2hlY2tcIn0iLCJ3ZWJwYWNrOi8vLy4vb3RoZXIvZG9jc0Jhc2VVcmwuanMiLCJ3ZWJwYWNrOi8vLy4vYW5ndWxhci1maXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcnVuL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5QXBpQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seVVzYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlWZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvZm9ybWx5VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcy9mb3JtbHlXYXJuLmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWZpZWxkLmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9mb3JtbHktZm9jdXMuanMiLCJ3ZWJwYWNrOi8vLy4vcnVuL2Zvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yLmpzIiwid2VicGFjazovLy8uL3J1bi9mb3JtbHlDdXN0b21UYWdzLmpzIiwid2VicGFjazovLy8uL290aGVyL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7Ozs7QUN0Q0EsT0FBTSxDQUFDLE9BQU8sR0FBRyxtQkFBTyxDQUFDLENBQWdCLENBQUMsQzs7Ozs7Ozs7QUNBMUMsS0FBTSxRQUFRLEdBQUcsbUJBQU8sQ0FBQyxDQUFXLENBQUMsQ0FBQztBQUN0QyxLQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2IsU0FBTSxJQUFJLEtBQUssQ0FDYixzRUFBc0UsR0FDcEUsbUJBQU8sQ0FBQyxDQUFxQixDQUFDLEdBQUcsZ0NBQWdDLENBQ3BFLENBQUM7RUFDSDtBQUNELEtBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQztBQUM5QixLQUFNLE9BQU8sR0FBRyxtQkFBTyxDQUFDLENBQWUsQ0FBQyxDQUFDO0FBQ3pDLEtBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVB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ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYXBpLWNoZWNrXCIpLCByZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhcGktY2hlY2tcIiwgXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5nRm9ybWx5XCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYXBpLWNoZWNrXCIpLCByZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wibmdGb3JtbHlcIl0gPSBmYWN0b3J5KHJvb3RbXCJhcGlDaGVja1wiXSwgcm9vdFtcImFuZ3VsYXJcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNGFkNTIxOTYyZTVkYWI3ZTQ5YjVcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaW5kZXguY29tbW9uJyk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5qc1xuICoqLyIsImNvbnN0IGFwaUNoZWNrID0gcmVxdWlyZSgnYXBpLWNoZWNrJyk7XG5pZiAoIWFwaUNoZWNrKSB7XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAnYW5ndWxhci1mb3JtbHkgcmVxdWlyZXMgdGhlIGxpYnJhcnkgYXBpQ2hlY2suanMhIFBsZWFzZSBpbmNsdWRlIGl0ISAnICtcbiAgICAgIHJlcXVpcmUoJy4vb3RoZXIvZG9jc0Jhc2VVcmwnKSArICdhcGljaGVja2pzLWRlcGVuZGVuY3ktcmVxdWlyZWQnXG4gICk7XG59XG5jb25zdCBuZ01vZHVsZU5hbWUgPSAnZm9ybWx5JztcbmNvbnN0IGFuZ3VsYXIgPSByZXF1aXJlKCcuL2FuZ3VsYXItZml4Jyk7XG5jb25zdCBuZ01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5nTW9kdWxlTmFtZSwgW10pO1xuXG5yZXF1aXJlKCcuL3Byb3ZpZGVycycpKG5nTW9kdWxlKTtcbnJlcXVpcmUoJy4vc2VydmljZXMnKShuZ01vZHVsZSk7XG5yZXF1aXJlKCcuL2RpcmVjdGl2ZXMnKShuZ01vZHVsZSk7XG5yZXF1aXJlKCcuL3J1bicpKG5nTW9kdWxlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZU5hbWU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5jb21tb24uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiYXBpQ2hlY2tcIixcImFtZFwiOlwiYXBpLWNoZWNrXCIsXCJjb21tb25qczJcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanNcIjpcImFwaS1jaGVja1wifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IGBodHRwczovL2dpdGh1Yi5jb20vZm9ybWx5LWpzL2FuZ3VsYXItZm9ybWx5L2Jsb2IvJHtWRVJTSU9OfS9vdGhlci9FUlJPUlNfQU5EX1dBUk5JTkdTLm1kI2A7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9vdGhlci9kb2NzQmFzZVVybC5qc1xuICoqLyIsIi8vIHNvbWUgdmVyc2lvbnMgb2YgYW5ndWxhciBkb24ndCBleHBvcnQgdGhlIGFuZ3VsYXIgbW9kdWxlIHByb3Blcmx5LFxuLy8gc28gd2UgZ2V0IGl0IGZyb20gd2luZG93IGluIHRoaXMgY2FzZS5cbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xuaWYgKCFhbmd1bGFyLnZlcnNpb24pIHtcbiAgYW5ndWxhciA9IHdpbmRvdy5hbmd1bGFyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vYW5ndWxhci1maXgvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgcmVxdWlyZSgnLi9mb3JtbHlBcGlDaGVjaycpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZSgnLi9mb3JtbHlVc2FiaWxpdHknKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoJy4vZm9ybWx5Q29uZmlnJykobmdNb2R1bGUpO1xuICByZXF1aXJlKCcuL2Zvcm1seVZlcnNpb24nKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoJy4vZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCcpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZSgnLi9mb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMnKShuZ01vZHVsZSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIHJlcXVpcmUoJy4vZm9ybWx5VXRpbCcpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZSgnLi9mb3JtbHlXYXJuJykobmdNb2R1bGUpO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3NlcnZpY2VzL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIHJlcXVpcmUoJy4vZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uJykobmdNb2R1bGUpO1xuICByZXF1aXJlKCcuL2Zvcm1seS1maWVsZCcpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZSgnLi9mb3JtbHktZm9ybScpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZSgnLi9mb3JtbHktZm9jdXMnKShuZ01vZHVsZSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vZGlyZWN0aXZlcy9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICByZXF1aXJlKCcuL2Zvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yJykobmdNb2R1bGUpO1xuICByZXF1aXJlKCcuL2Zvcm1seUN1c3RvbVRhZ3MnKShuZ01vZHVsZSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcnVuL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYW5ndWxhclwiXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG5cbiAgbGV0IGFwaUNoZWNrID0gcmVxdWlyZSgnYXBpLWNoZWNrJykoe1xuICAgIG91dHB1dDoge1xuICAgICAgcHJlZml4OiAnYW5ndWxhci1mb3JtbHk6JyxcbiAgICAgIGRvY3NCYXNlVXJsOiByZXF1aXJlKCcuLi9vdGhlci9kb2NzQmFzZVVybCcpXG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBzaGFwZVJlcXVpcmVkSWZOb3Qob3RoZXJQcm9wcywgcHJvcENoZWNrZXIpIHtcbiAgICBpZiAoIWFuZ3VsYXIuaXNBcnJheShvdGhlclByb3BzKSkge1xuICAgICAgb3RoZXJQcm9wcyA9IFtvdGhlclByb3BzXTtcbiAgICB9XG4gICAgY29uc3QgdHlwZSA9IGBzcGVjaWZpZWQgaWYgdGhlc2UgYXJlIG5vdCBzcGVjaWZpZWQ6IFxcYCR7b3RoZXJQcm9wcy5qb2luKCcsICcpfVxcYCAob3RoZXJ3aXNlIGl0J3Mgb3B0aW9uYWwpYDtcbiAgICBmdW5jdGlvbiBzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgICB2YXIgcHJvcEV4aXN0cyA9IG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcE5hbWUpO1xuICAgICAgdmFyIG90aGVyUHJvcHNFeGlzdCA9IG90aGVyUHJvcHMuc29tZShmdW5jdGlvbiAob3RoZXJQcm9wKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCk7XG4gICAgICB9KTtcbiAgICAgIC8vY29uc29sZS5sb2cocHJvcE5hbWUsIHByb3BFeGlzdHMsIHByb3AsIG90aGVyUHJvcHNFeGlzdCwgb3RoZXJQcm9wcy5qb2luKCcsICcpKTtcbiAgICAgIGlmICghb3RoZXJQcm9wc0V4aXN0ICYmICFwcm9wRXhpc3RzKSB7XG4gICAgICAgIHJldHVybiBhcGlDaGVjay51dGlscy5nZXRFcnJvcihwcm9wTmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgICAgfSBlbHNlIGlmIChwcm9wRXhpc3RzKSB7XG4gICAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgICB9XG4gICAgfVxuICAgIHNoYXBlUmVxdWlyZWRJZk5vdERlZmluaXRpb24udHlwZSA9IHR5cGU7XG4gICAgYXBpQ2hlY2sudXRpbHMuY2hlY2tlckhlbHBlcnMuc2V0dXBDaGVja2VyKHNoYXBlUmVxdWlyZWRJZk5vdERlZmluaXRpb24pO1xuICAgIHJldHVybiBzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uO1xuICB9XG5cbiAgbmdNb2R1bGUuY29uc3RhbnQoJ2Zvcm1seUFwaUNoZWNrJywgYXBpQ2hlY2spO1xuICBpZiAoT05fVEVTVCkge1xuICAgIHJlcXVpcmUoJy4vZm9ybWx5QXBpQ2hlY2sudGVzdCcpKG5nTW9kdWxlKTtcbiAgfVxuXG4gIGxldCBmb3JtbHlFeHByZXNzaW9uID0gYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmZ1bmNdKTtcbiAgbGV0IHNwZWNpZnlXcmFwcGVyVHlwZSA9IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgYXBpQ2hlY2sub25lT2YoW251bGxdKSwgYXBpQ2hlY2sudHlwZU9yQXJyYXlPZihhcGlDaGVjay5zdHJpbmcpXG4gIF0pO1xuXG4gIGNvbnN0IGFwaUNoZWNrUHJvcGVydHkgPSBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5mdW5jKTtcblxuICBjb25zdCBhcGlDaGVja0luc3RhbmNlUHJvcGVydHkgPSBhcGlDaGVjay5zaGFwZS5vbmx5SWYoJ2FwaUNoZWNrJywgYXBpQ2hlY2suZnVuYy53aXRoUHJvcGVydGllcyh7XG4gICAgd2FybjogYXBpQ2hlY2suZnVuYyxcbiAgICB0aHJvdzogYXBpQ2hlY2suZnVuYyxcbiAgICBzaGFwZTogYXBpQ2hlY2suZnVuY1xuICB9KSk7XG5cbiAgY29uc3QgYXBpQ2hlY2tGdW5jdGlvblByb3BlcnR5ID0gYXBpQ2hlY2suc2hhcGUub25seUlmKCdhcGlDaGVjaycsIGFwaUNoZWNrLm9uZU9mKFsndGhyb3cnLCAnd2FybiddKSk7XG5cbiAgY29uc3QgZm9ybWx5V3JhcHBlclR5cGUgPSBhcGlDaGVjay5zaGFwZSh7XG4gICAgbmFtZTogc2hhcGVSZXF1aXJlZElmTm90KCd0eXBlcycsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgdGVtcGxhdGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZVVybCcsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgdGVtcGxhdGVVcmw6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZScsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgdHlwZXM6IGFwaUNoZWNrLnR5cGVPckFycmF5T2YoYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgICBvdmVyd3JpdGVPazogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgICB2YWxpZGF0ZU9wdGlvbnM6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gICAgYXBpQ2hlY2s6IGFwaUNoZWNrUHJvcGVydHkub3B0aW9uYWwsXG4gICAgYXBpQ2hlY2tJbnN0YW5jZTogYXBpQ2hlY2tJbnN0YW5jZVByb3BlcnR5Lm9wdGlvbmFsLFxuICAgIGFwaUNoZWNrRnVuY3Rpb246IGFwaUNoZWNrRnVuY3Rpb25Qcm9wZXJ0eS5vcHRpb25hbCxcbiAgICBhcGlDaGVja09wdGlvbnM6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbFxuICB9KS5zdHJpY3Q7XG5cbiAgbGV0IGZpZWxkT3B0aW9uc0FwaVNoYXBlID0ge1xuICAgIHR5cGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KFsndGVtcGxhdGUnLCAndGVtcGxhdGVVcmwnXSwgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgICB0ZW1wbGF0ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoWyd0eXBlJywgJ3RlbXBsYXRlVXJsJ10sIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgdGVtcGxhdGVVcmw6IGFwaUNoZWNrLnNoYXBlLmlmTm90KFsndHlwZScsICd0ZW1wbGF0ZSddLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICAgIGtleTogYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLm51bWJlcl0pLFxuICAgIG1vZGVsOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gICAgZXhwcmVzc2lvblByb3BlcnRpZXM6IGFwaUNoZWNrLm9iamVjdE9mKGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgICBmb3JtbHlFeHByZXNzaW9uLFxuICAgICAgYXBpQ2hlY2suc2hhcGUoe1xuICAgICAgICBleHByZXNzaW9uOiBmb3JtbHlFeHByZXNzaW9uLFxuICAgICAgICBtZXNzYWdlOiBmb3JtbHlFeHByZXNzaW9uLm9wdGlvbmFsXG4gICAgICB9KS5zdHJpY3RcbiAgICBdKSkub3B0aW9uYWwsXG4gICAgZGF0YTogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICAgIHRlbXBsYXRlT3B0aW9uczogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICAgIHdyYXBwZXI6IHNwZWNpZnlXcmFwcGVyVHlwZS5vcHRpb25hbCxcbiAgICBtb2RlbE9wdGlvbnM6IGFwaUNoZWNrLnNoYXBlKHtcbiAgICAgIHVwZGF0ZU9uOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWwsXG4gICAgICBkZWJvdW5jZTogYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICAgICAgYXBpQ2hlY2sub2JqZWN0LCBhcGlDaGVjay5zdHJpbmdcbiAgICAgIF0pLm9wdGlvbmFsLFxuICAgICAgYWxsb3dJbnZhbGlkOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsLFxuICAgICAgZ2V0dGVyU2V0dGVyOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsLFxuICAgICAgdGltZXpvbmU6IGFwaUNoZWNrLnN0cmluZy5vcHRpb25hbFxuICAgIH0pLm9wdGlvbmFsLFxuICAgIHdhdGNoZXI6IGFwaUNoZWNrLnR5cGVPckFycmF5T2YoXG4gICAgICBhcGlDaGVjay5zaGFwZSh7XG4gICAgICAgIGV4cHJlc3Npb246IGZvcm1seUV4cHJlc3Npb24ub3B0aW9uYWwsXG4gICAgICAgIGxpc3RlbmVyOiBmb3JtbHlFeHByZXNzaW9uXG4gICAgICB9KVxuICAgICkub3B0aW9uYWwsXG4gICAgdmFsaWRhdG9yczogYXBpQ2hlY2sub2JqZWN0T2YoYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICAgIGZvcm1seUV4cHJlc3Npb24sIGFwaUNoZWNrLnNoYXBlKHtcbiAgICAgICAgZXhwcmVzc2lvbjogZm9ybWx5RXhwcmVzc2lvbixcbiAgICAgICAgbWVzc2FnZTogZm9ybWx5RXhwcmVzc2lvbi5vcHRpb25hbFxuICAgICAgfSkuc3RyaWN0XG4gICAgXSkpLm9wdGlvbmFsLFxuICAgIG5vRm9ybUNvbnRyb2w6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gICAgaGlkZTogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgICBuZ01vZGVsQXR0cnM6IGFwaUNoZWNrLm9iamVjdE9mKGFwaUNoZWNrLnNoYXBlKHtcbiAgICAgIGV4cHJlc3Npb246IGFwaUNoZWNrLnNoYXBlLmlmTm90KFsndmFsdWUnLCAnYXR0cmlidXRlJywgJ2JvdW5kJ10sIGFwaUNoZWNrLmFueSkub3B0aW9uYWwsXG4gICAgICB2YWx1ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ2V4cHJlc3Npb24nLCBhcGlDaGVjay5hbnkpLm9wdGlvbmFsLFxuICAgICAgYXR0cmlidXRlOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgnZXhwcmVzc2lvbicsIGFwaUNoZWNrLmFueSkub3B0aW9uYWwsXG4gICAgICBib3VuZDogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ2V4cHJlc3Npb24nLCBhcGlDaGVjay5hbnkpLm9wdGlvbmFsXG4gICAgfSkuc3RyaWN0KS5vcHRpb25hbCxcbiAgICBvcHRpb25zVHlwZXM6IGFwaUNoZWNrLnR5cGVPckFycmF5T2YoYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgICBsaW5rOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICAgIGNvbnRyb2xsZXI6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgICBhcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmZ1bmMsIGFwaUNoZWNrLmFycmF5XG4gICAgXSkub3B0aW9uYWwsXG4gICAgdmFsaWRhdGlvbjogYXBpQ2hlY2suc2hhcGUoe1xuICAgICAgc2hvdzogYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICAgICAgYXBpQ2hlY2suYm9vbCwgYXBpQ2hlY2sub25lT2YoW251bGxdKVxuICAgICAgXSkub3B0aW9uYWwsXG4gICAgICBtZXNzYWdlczogYXBpQ2hlY2sub2JqZWN0T2YoZm9ybWx5RXhwcmVzc2lvbikub3B0aW9uYWwsXG4gICAgICBlcnJvckV4aXN0c0FuZFNob3VsZEJlVmlzaWJsZTogYXBpQ2hlY2suYm9vbC5vcHRpb25hbFxuICAgIH0pLm9wdGlvbmFsLFxuICAgIGZvcm1Db250cm9sOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gICAgdmFsdWU6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gICAgcnVuRXhwcmVzc2lvbnM6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gICAgcmVzZXRNb2RlbDogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgICB1cGRhdGVJbml0aWFsVmFsdWU6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gICAgaW5pdGlhbFZhbHVlOiBhcGlDaGVjay5hbnkub3B0aW9uYWxcbiAgfTtcblxuICBsZXQgZm9ybWx5RmllbGRPcHRpb25zID0gYXBpQ2hlY2suc2hhcGUoZmllbGRPcHRpb25zQXBpU2hhcGUpLnN0cmljdDtcblxuICBsZXQgdHlwZU9wdGlvbnNEZWZhdWx0T3B0aW9ucyA9IGFuZ3VsYXIuY29weShmaWVsZE9wdGlvbnNBcGlTaGFwZSk7XG4gIHR5cGVPcHRpb25zRGVmYXVsdE9wdGlvbnMua2V5ID0gYXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsO1xuXG4gIGxldCBmb3JtbHlUeXBlT3B0aW9ucyA9IGFwaUNoZWNrLnNoYXBlKHtcbiAgICBuYW1lOiBhcGlDaGVjay5zdHJpbmcsXG4gICAgdGVtcGxhdGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZVVybCcsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgdGVtcGxhdGVVcmw6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZScsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgY29udHJvbGxlcjogYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICAgIGFwaUNoZWNrLmZ1bmMsIGFwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2suYXJyYXlcbiAgICBdKS5vcHRpb25hbCxcbiAgICBsaW5rOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICAgIGRlZmF1bHRPcHRpb25zOiBhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgICAgYXBpQ2hlY2suZnVuYywgYXBpQ2hlY2suc2hhcGUodHlwZU9wdGlvbnNEZWZhdWx0T3B0aW9ucylcbiAgICBdKS5vcHRpb25hbCxcbiAgICBleHRlbmRzOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWwsXG4gICAgd3JhcHBlcjogc3BlY2lmeVdyYXBwZXJUeXBlLm9wdGlvbmFsLFxuICAgIGRhdGE6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgICB2YWxpZGF0ZU9wdGlvbnM6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gICAgYXBpQ2hlY2s6IGFwaUNoZWNrUHJvcGVydHkub3B0aW9uYWwsXG4gICAgYXBpQ2hlY2tJbnN0YW5jZTogYXBpQ2hlY2tJbnN0YW5jZVByb3BlcnR5Lm9wdGlvbmFsLFxuICAgIGFwaUNoZWNrRnVuY3Rpb246IGFwaUNoZWNrRnVuY3Rpb25Qcm9wZXJ0eS5vcHRpb25hbCxcbiAgICBhcGlDaGVja09wdGlvbnM6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgICBvdmVyd3JpdGVPazogYXBpQ2hlY2suYm9vbC5vcHRpb25hbFxuICB9KS5zdHJpY3Q7XG5cbiAgYW5ndWxhci5leHRlbmQoYXBpQ2hlY2ssIHtcbiAgICBmb3JtbHlUeXBlT3B0aW9ucywgZm9ybWx5RmllbGRPcHRpb25zLCBmb3JtbHlFeHByZXNzaW9uLCBmb3JtbHlXcmFwcGVyVHlwZVxuICB9KTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9wcm92aWRlcnMvZm9ybWx5QXBpQ2hlY2suanNcbiAqKi8iLCJ2YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXItZml4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICBuZ01vZHVsZS5wcm92aWRlcignZm9ybWx5VXNhYmlsaXR5JywgZnVuY3Rpb24oZm9ybWx5VmVyc2lvbiwgZm9ybWx5QXBpQ2hlY2spIHtcbiAgICB2YXIgZXJyb3JzQW5kV2FybmluZ3NVcmxQcmVmaXggPVxuICAgICAgYGh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtbHktanMvYW5ndWxhci1mb3JtbHkvYmxvYi8ke2Zvcm1seVZlcnNpb259L290aGVyL0VSUk9SU19BTkRfV0FSTklOR1MubWQjYDtcbiAgICBhbmd1bGFyLmV4dGVuZCh0aGlzLCB7XG4gICAgICBnZXRGb3JtbHlFcnJvcjogZ2V0Rm9ybWx5RXJyb3IsXG4gICAgICBnZXRGaWVsZEVycm9yOiBnZXRGaWVsZEVycm9yLFxuICAgICAgY2hlY2tXcmFwcGVyOiBjaGVja1dyYXBwZXIsXG4gICAgICBjaGVja1dyYXBwZXJUZW1wbGF0ZTogY2hlY2tXcmFwcGVyVGVtcGxhdGUsXG4gICAgICAkZ2V0OiAoKSA9PiB0aGlzXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBnZXRGaWVsZEVycm9yKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UsIGZpZWxkKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgZmllbGQgPSBtZXNzYWdlO1xuICAgICAgICBtZXNzYWdlID0gZXJyb3JJbmZvU2x1ZztcbiAgICAgICAgZXJyb3JJbmZvU2x1ZyA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSArIGAgRmllbGQgZGVmaW5pdGlvbjogJHthbmd1bGFyLnRvSnNvbihmaWVsZCl9YCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Rm9ybWx5RXJyb3IoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkge1xuICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvckluZm9TbHVnO1xuICAgICAgICBlcnJvckluZm9TbHVnID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgRXJyb3IoZ2V0RXJyb3JNZXNzYWdlKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkge1xuICAgICAgbGV0IHVybCA9ICcnO1xuICAgICAgaWYgKGVycm9ySW5mb1NsdWcgIT09IG51bGwpIHtcbiAgICAgICAgdXJsID0gYCR7ZXJyb3JzQW5kV2FybmluZ3NVcmxQcmVmaXh9JHtlcnJvckluZm9TbHVnfWA7XG4gICAgICB9XG4gICAgICByZXR1cm4gYEZvcm1seSBFcnJvcjogJHttZXNzYWdlfS4gJHt1cmx9YDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dyYXBwZXIod3JhcHBlcikge1xuICAgICAgZm9ybWx5QXBpQ2hlY2sudGhyb3coZm9ybWx5QXBpQ2hlY2suZm9ybWx5V3JhcHBlclR5cGUsIGFyZ3VtZW50cywge1xuICAgICAgICBwcmVmaXg6ICdmb3JtbHlDb25maWcuc2V0V3JhcHBlcicsXG4gICAgICAgIHVybFN1ZmZpeDogJ3NldHdyYXBwZXItdmFsaWRhdGlvbi1mYWlsZWQnXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dyYXBwZXJUZW1wbGF0ZSh0ZW1wbGF0ZSwgYWRkaXRpb25hbEluZm8pIHtcbiAgICAgIHZhciBmb3JtbHlUcmFuc2NsdWRlID0gJzxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPic7XG4gICAgICBpZiAodGVtcGxhdGUuaW5kZXhPZihmb3JtbHlUcmFuc2NsdWRlKSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgZ2V0Rm9ybWx5RXJyb3IoXG4gICAgICAgICAgYFRlbXBsYXRlIHdyYXBwZXIgdGVtcGxhdGVzIG11c3QgdXNlIFwiJHtmb3JtbHlUcmFuc2NsdWRlfVwiIHNvbWV3aGVyZSBpbiB0aGVtLiBgICtcbiAgICAgICAgICBgVGhpcyBvbmUgZG9lcyBub3QgaGF2ZSBcIjxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPlwiIGluIGl0OiAke3RlbXBsYXRlfWAgKyAnXFxuJyArXG4gICAgICAgICAgYEFkZGl0aW9uYWwgaW5mb3JtYXRpb246ICR7SlNPTi5zdHJpbmdpZnkoYWRkaXRpb25hbEluZm8pfWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3Byb3ZpZGVycy9mb3JtbHlVc2FiaWxpdHkuanNcbiAqKi8iLCJjb25zdCBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhci1maXgnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi4vb3RoZXIvdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIG5nTW9kdWxlLnByb3ZpZGVyKCdmb3JtbHlDb25maWcnLCBmb3JtbHlDb25maWcpO1xuXG4gIGZvcm1seUNvbmZpZy50ZXN0cyA9IE9OX1RFU1QgPyByZXF1aXJlKCcuL2Zvcm1seUNvbmZpZy50ZXN0JykobmdNb2R1bGUpIDogbnVsbDtcblxuICBmdW5jdGlvbiBmb3JtbHlDb25maWcoZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIsIGZvcm1seUFwaUNoZWNrKSB7XG5cbiAgICB2YXIgdHlwZU1hcCA9IHt9O1xuICAgIHZhciB0ZW1wbGF0ZVdyYXBwZXJzTWFwID0ge307XG4gICAgdmFyIGRlZmF1bHRXcmFwcGVyTmFtZSA9ICdkZWZhdWx0JztcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBnZXRFcnJvciA9IGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLmdldEZvcm1seUVycm9yO1xuXG4gICAgYW5ndWxhci5leHRlbmQodGhpcywge1xuICAgICAgc2V0VHlwZSxcbiAgICAgIGdldFR5cGUsXG4gICAgICBzZXRXcmFwcGVyLFxuICAgICAgZ2V0V3JhcHBlcixcbiAgICAgIGdldFdyYXBwZXJCeVR5cGUsXG4gICAgICByZW1vdmVXcmFwcGVyQnlOYW1lLFxuICAgICAgcmVtb3ZlV3JhcHBlcnNGb3JUeXBlLFxuICAgICAgZGlzYWJsZVdhcm5pbmdzOiBmYWxzZSxcbiAgICAgIGV4dHJhczoge1xuICAgICAgICBkaXNhYmxlTmdNb2RlbEF0dHJzTWFuaXB1bGF0b3I6IGZhbHNlLFxuICAgICAgICBuZ01vZGVsQXR0cnNNYW5pcHVsYXRvclByZWZlckJvdW5kOiBmYWxzZSxcbiAgICAgICAgcmVtb3ZlQ2hyb21lQXV0b0NvbXBsZXRlOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlTWFuaXB1bGF0b3JzOiB7XG4gICAgICAgIHByZVdyYXBwZXI6IFtdLFxuICAgICAgICBwb3N0V3JhcHBlcjogW11cbiAgICAgIH0sXG4gICAgICAkZ2V0OiAoKSA9PiB0aGlzXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzZXRUeXBlKG9wdGlvbnMpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKG9wdGlvbnMsIHNldFR5cGUpO1xuICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgIGNoZWNrVHlwZShvcHRpb25zKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZXh0ZW5kcykge1xuICAgICAgICAgIGV4dGVuZFR5cGVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHR5cGVNYXBbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBnZXRFcnJvcihgWW91IG11c3QgcHJvdmlkZSBhbiBvYmplY3Qgb3IgYXJyYXkgZm9yIHNldFR5cGUuIFlvdSBwcm92aWRlZDogJHtKU09OLnN0cmluZ2lmeShhcmd1bWVudHMpfWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShvcHRpb25zKSB7XG4gICAgICBmb3JtbHlBcGlDaGVjay50aHJvdyhmb3JtbHlBcGlDaGVjay5mb3JtbHlUeXBlT3B0aW9ucywgYXJndW1lbnRzLCB7XG4gICAgICAgIHByZWZpeDogJ2Zvcm1seUNvbmZpZy5zZXRUeXBlJyxcbiAgICAgICAgdXJsOiAnc2V0dHlwZS12YWxpZGF0aW9uLWZhaWxlZCdcbiAgICAgIH0pO1xuICAgICAgaWYgKCFvcHRpb25zLm92ZXJ3cml0ZU9rKSB7XG4gICAgICAgIGNoZWNrT3ZlcndyaXRlKG9wdGlvbnMubmFtZSwgdHlwZU1hcCwgb3B0aW9ucywgJ3R5cGVzJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLm92ZXJ3cml0ZU9rID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZFR5cGVPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgIGNvbnN0IGV4dGVuZHNUeXBlID0gZ2V0VHlwZShvcHRpb25zLmV4dGVuZHMsIHRydWUsIG9wdGlvbnMpO1xuICAgICAgZXh0ZW5kVHlwZUNvbnRyb2xsZXJGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgICBleHRlbmRUeXBlTGlua0Z1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICAgIGV4dGVuZFR5cGVWYWxpZGF0ZU9wdGlvbnNGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgICBleHRlbmRUeXBlRGVmYXVsdE9wdGlvbnMob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0ZW5kVHlwZUNvbnRyb2xsZXJGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSkge1xuICAgICAgY29uc3QgZXh0ZW5kc0N0cmwgPSBleHRlbmRzVHlwZS5jb250cm9sbGVyO1xuICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChleHRlbmRzQ3RybCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9uc0N0cmwgPSBvcHRpb25zLmNvbnRyb2xsZXI7XG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9uc0N0cmwpKSB7XG4gICAgICAgIG9wdGlvbnMuY29udHJvbGxlciA9IGZ1bmN0aW9uKCRzY29wZSwgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAkY29udHJvbGxlcihleHRlbmRzQ3RybCwgeyRzY29wZX0pO1xuICAgICAgICAgICRjb250cm9sbGVyKG9wdGlvbnNDdHJsLCB7JHNjb3BlfSk7XG4gICAgICAgIH07XG4gICAgICAgIG9wdGlvbnMuY29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGNvbnRyb2xsZXInXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMuY29udHJvbGxlciA9IGV4dGVuZHNDdHJsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZFR5cGVMaW5rRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICAgIGNvbnN0IGV4dGVuZHNGbiA9IGV4dGVuZHNUeXBlLmxpbms7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNGbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9uc0ZuID0gb3B0aW9ucy5saW5rO1xuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnNGbikpIHtcbiAgICAgICAgb3B0aW9ucy5saW5rID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZXh0ZW5kc0ZuKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgICAgb3B0aW9uc0ZuKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLmxpbmsgPSBleHRlbmRzRm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0ZW5kVHlwZVZhbGlkYXRlT3B0aW9uc0Z1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKSB7XG4gICAgICBjb25zdCBleHRlbmRzRm4gPSBleHRlbmRzVHlwZS52YWxpZGF0ZU9wdGlvbnM7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNGbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9uc0ZuID0gb3B0aW9ucy52YWxpZGF0ZU9wdGlvbnM7XG4gICAgICBjb25zdCBvcmlnaW5hbERlZmF1bHRPcHRpb25zID0gb3B0aW9ucy5kZWZhdWx0T3B0aW9ucztcbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zRm4pKSB7XG4gICAgICAgIG9wdGlvbnMudmFsaWRhdGVPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgIG9wdGlvbnNGbihvcHRpb25zKTtcbiAgICAgICAgICBsZXQgbWVyZ2VkT3B0aW9ucyA9IGFuZ3VsYXIuY29weShvcHRpb25zKTtcbiAgICAgICAgICBsZXQgZGVmYXVsdE9wdGlvbnMgPSBvcmlnaW5hbERlZmF1bHRPcHRpb25zO1xuICAgICAgICAgIGlmIChkZWZhdWx0T3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihkZWZhdWx0T3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgZGVmYXVsdE9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucyhtZXJnZWRPcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2UobWVyZ2VkT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBleHRlbmRzRm4obWVyZ2VkT3B0aW9ucyk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLnZhbGlkYXRlT3B0aW9ucyA9IGV4dGVuZHNGbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlbmRUeXBlRGVmYXVsdE9wdGlvbnMob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICAgIGNvbnN0IGV4dGVuZHNETyA9IGV4dGVuZHNUeXBlLmRlZmF1bHRPcHRpb25zO1xuICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChleHRlbmRzRE8pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdGlvbnNETyA9IG9wdGlvbnMuZGVmYXVsdE9wdGlvbnM7XG4gICAgICBjb25zdCBvcHRpb25zRE9Jc0ZuID0gYW5ndWxhci5pc0Z1bmN0aW9uKG9wdGlvbnNETyk7XG4gICAgICBjb25zdCBleHRlbmRzRE9Jc0ZuID0gYW5ndWxhci5pc0Z1bmN0aW9uKGV4dGVuZHNETyk7XG4gICAgICBpZiAoZXh0ZW5kc0RPSXNGbikge1xuICAgICAgICBvcHRpb25zLmRlZmF1bHRPcHRpb25zID0gZnVuY3Rpb24gZGVmYXVsdE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICAgIGNvbnN0IGV4dGVuZHNEZWZhdWx0T3B0aW9ucyA9IGV4dGVuZHNETyhvcHRpb25zKTtcbiAgICAgICAgICBjb25zdCBtZXJnZWREZWZhdWx0T3B0aW9ucyA9IHt9O1xuICAgICAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2UobWVyZ2VkRGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMsIGV4dGVuZHNEZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgbGV0IGV4dGVuZGVyT3B0aW9uc0RlZmF1bHRPcHRpb25zID0gb3B0aW9uc0RPO1xuICAgICAgICAgIGlmIChvcHRpb25zRE9Jc0ZuKSB7XG4gICAgICAgICAgICBleHRlbmRlck9wdGlvbnNEZWZhdWx0T3B0aW9ucyA9IGV4dGVuZGVyT3B0aW9uc0RlZmF1bHRPcHRpb25zKG1lcmdlZERlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShleHRlbmRzRGVmYXVsdE9wdGlvbnMsIGV4dGVuZGVyT3B0aW9uc0RlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICByZXR1cm4gZXh0ZW5kc0RlZmF1bHRPcHRpb25zO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zRE9Jc0ZuKSB7XG4gICAgICAgIG9wdGlvbnMuZGVmYXVsdE9wdGlvbnMgPSBmdW5jdGlvbiBkZWZhdWx0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgICAgbGV0IG5ld0RlZmF1bHRPcHRpb25zID0ge307XG4gICAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShuZXdEZWZhdWx0T3B0aW9ucywgb3B0aW9ucywgZXh0ZW5kc0RPKTtcbiAgICAgICAgICByZXR1cm4gb3B0aW9uc0RPKG5ld0RlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUeXBlKG5hbWUsIHRocm93RXJyb3IsIGVycm9yQ29udGV4dCkge1xuICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICB2YXIgdHlwZSA9IHR5cGVNYXBbbmFtZV07XG4gICAgICBpZiAoIXR5cGUgJiYgdGhyb3dFcnJvciA9PT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBnZXRFcnJvcihcbiAgICAgICAgICBgVGhlcmUgaXMgbm8gdHlwZSBieSB0aGUgbmFtZSBvZiBcIiR7bmFtZX1cIjogJHtKU09OLnN0cmluZ2lmeShlcnJvckNvbnRleHQpfWBcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFdyYXBwZXIob3B0aW9ucywgbmFtZSkge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5tYXAod3JhcHBlck9wdGlvbnMgPT4gc2V0V3JhcHBlcih3cmFwcGVyT3B0aW9ucykpO1xuICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgIG9wdGlvbnMudHlwZXMgPSBnZXRPcHRpb25zVHlwZXMob3B0aW9ucyk7XG4gICAgICAgIG9wdGlvbnMubmFtZSA9IGdldE9wdGlvbnNOYW1lKG9wdGlvbnMsIG5hbWUpO1xuICAgICAgICBjaGVja1dyYXBwZXJBUEkob3B0aW9ucyk7XG4gICAgICAgIHRlbXBsYXRlV3JhcHBlcnNNYXBbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnM7XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzU3RyaW5nKG9wdGlvbnMpKSB7XG4gICAgICAgIHJldHVybiBzZXRXcmFwcGVyKHtcbiAgICAgICAgICB0ZW1wbGF0ZTogb3B0aW9ucyxcbiAgICAgICAgICBuYW1lXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9wdGlvbnNUeXBlcyhvcHRpb25zKSB7XG4gICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhvcHRpb25zLnR5cGVzKSkge1xuICAgICAgICByZXR1cm4gW29wdGlvbnMudHlwZXNdO1xuICAgICAgfVxuICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnR5cGVzKSkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy50eXBlcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRPcHRpb25zTmFtZShvcHRpb25zLCBuYW1lKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5uYW1lIHx8IG5hbWUgfHwgb3B0aW9ucy50eXBlcy5qb2luKCcgJykgfHwgZGVmYXVsdFdyYXBwZXJOYW1lO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrV3JhcHBlckFQSShvcHRpb25zKSB7XG4gICAgICBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5jaGVja1dyYXBwZXIob3B0aW9ucyk7XG4gICAgICBpZiAob3B0aW9ucy50ZW1wbGF0ZSkge1xuICAgICAgICBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5jaGVja1dyYXBwZXJUZW1wbGF0ZShvcHRpb25zLnRlbXBsYXRlLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIGlmICghb3B0aW9ucy5vdmVyd3JpdGVPaykge1xuICAgICAgICBjaGVja092ZXJ3cml0ZShvcHRpb25zLm5hbWUsIHRlbXBsYXRlV3JhcHBlcnNNYXAsIG9wdGlvbnMsICd0ZW1wbGF0ZVdyYXBwZXJzJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgb3B0aW9ucy5vdmVyd3JpdGVPaztcbiAgICAgIH1cbiAgICAgIGNoZWNrV3JhcHBlclR5cGVzKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrV3JhcHBlclR5cGVzKG9wdGlvbnMpIHtcbiAgICAgIGxldCBzaG91bGRUaHJvdyA9ICFhbmd1bGFyLmlzQXJyYXkob3B0aW9ucy50eXBlcykgfHwgIW9wdGlvbnMudHlwZXMuZXZlcnkoYW5ndWxhci5pc1N0cmluZyk7XG4gICAgICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICAgICAgdGhyb3cgZ2V0RXJyb3IoYEF0dGVtcHRlZCB0byBjcmVhdGUgYSB0ZW1wbGF0ZSB3cmFwcGVyIHdpdGggdHlwZXMgdGhhdCBpcyBub3QgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2Ygc3RyaW5nc2ApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrT3ZlcndyaXRlKHByb3BlcnR5LCBvYmplY3QsIG5ld1ZhbHVlLCBvYmplY3ROYW1lKSB7XG4gICAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICB3YXJuKFtcbiAgICAgICAgICBgQXR0ZW1wdGluZyB0byBvdmVyd3JpdGUgJHtwcm9wZXJ0eX0gb24gJHtvYmplY3ROYW1lfSB3aGljaCBpcyBjdXJyZW50bHlgLFxuICAgICAgICAgIGAke0pTT04uc3RyaW5naWZ5KG9iamVjdFtwcm9wZXJ0eV0pfSB3aXRoICR7SlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpfWAsXG4gICAgICAgICAgYFRvIHN1cHJlc3MgdGhpcyB3YXJuaW5nLCBzcGVjaWZ5IHRoZSBwcm9wZXJ0eSBcIm92ZXJ3cml0ZU9rOiB0cnVlXCJgXG4gICAgICAgIF0uam9pbignICcpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXcmFwcGVyKG5hbWUpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWUgfHwgZGVmYXVsdFdyYXBwZXJOYW1lXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXcmFwcGVyQnlUeXBlKHR5cGUpIHtcbiAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgICAgIHZhciB3cmFwcGVycyA9IFtdO1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiB0ZW1wbGF0ZVdyYXBwZXJzTWFwKSB7XG4gICAgICAgIGlmICh0ZW1wbGF0ZVdyYXBwZXJzTWFwLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgaWYgKHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV0udHlwZXMgJiYgdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXS50eXBlcy5pbmRleE9mKHR5cGUpICE9PSAtMSkge1xuICAgICAgICAgICAgd3JhcHBlcnMucHVzaCh0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3cmFwcGVycztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVXcmFwcGVyQnlOYW1lKG5hbWUpIHtcbiAgICAgIHZhciB3cmFwcGVyID0gdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXTtcbiAgICAgIGRlbGV0ZSB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdO1xuICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlV3JhcHBlcnNGb3JUeXBlKHR5cGUpIHtcbiAgICAgIHZhciB3cmFwcGVycyA9IGdldFdyYXBwZXJCeVR5cGUodHlwZSk7XG4gICAgICBpZiAoIXdyYXBwZXJzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghYW5ndWxhci5pc0FycmF5KHdyYXBwZXJzKSkge1xuICAgICAgICByZXR1cm4gcmVtb3ZlV3JhcHBlckJ5TmFtZSh3cmFwcGVycy5uYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdyYXBwZXJzLmZvckVhY2goKHdyYXBwZXIpID0+IHJlbW92ZVdyYXBwZXJCeU5hbWUod3JhcHBlci5uYW1lKSk7XG4gICAgICAgIHJldHVybiB3cmFwcGVycztcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgICBpZiAoIV90aGlzLmRpc2FibGVXYXJuaW5ncykge1xuICAgICAgICBjb25zb2xlLndhcm4oLi4uYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIG5nTW9kdWxlLmNvbnN0YW50KCdmb3JtbHlWZXJzaW9uJywgVkVSU0lPTik7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seVZlcnNpb24uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUuY29uc3RhbnQoXG4gICAgJ2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXgnLFxuICAgIGBodHRwczovL2dpdGh1Yi5jb20vZm9ybWx5LWpzL2FuZ3VsYXItZm9ybWx5L2Jsb2IvJHtWRVJTSU9OfS9vdGhlci9FUlJPUlNfQU5EX1dBUk5JTkdTLm1kI2BcbiAgKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9wcm92aWRlcnMvZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICBuZ01vZHVsZS5mYWN0b3J5KCdmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMgPSB7XG4gICAgICBhZGRUZW1wbGF0ZU9wdGlvblZhbHVlTWVzc2FnZSxcbiAgICAgIGFkZFN0cmluZ01lc3NhZ2UsXG4gICAgICBtZXNzYWdlczoge31cbiAgICB9O1xuXG4gICAgcmV0dXJuIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcztcblxuICAgIGZ1bmN0aW9uIGFkZFRlbXBsYXRlT3B0aW9uVmFsdWVNZXNzYWdlKG5hbWUsIHByb3AsIHByZWZpeCwgc3VmZml4LCBhbHRlcm5hdGUpIHtcbiAgICAgIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlc1tuYW1lXSA9IHRlbXBsYXRlT3B0aW9uVmFsdWUocHJvcCwgcHJlZml4LCBzdWZmaXgsIGFsdGVybmF0ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkU3RyaW5nTWVzc2FnZShuYW1lLCBzdHJpbmcpIHtcbiAgICAgIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlc1tuYW1lXSA9ICgpID0+IHN0cmluZztcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHRlbXBsYXRlT3B0aW9uVmFsdWUocHJvcCwgcHJlZml4LCBzdWZmaXgsIGFsdGVybmF0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGdldFZhbGlkYXRpb25NZXNzYWdlKHZpZXdWYWx1ZSwgbW9kZWxWYWx1ZSwgc2NvcGUpIHtcbiAgICAgICAgaWYgKHNjb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zW3Byb3BdKSB7XG4gICAgICAgICAgcmV0dXJuIGAke3ByZWZpeH0gJHtzY29wZS5vcHRpb25zLnRlbXBsYXRlT3B0aW9uc1twcm9wXX0gJHtzdWZmaXh9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gYWx0ZXJuYXRlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5qc1xuICoqLyIsImNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi4vb3RoZXIvdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIG5nTW9kdWxlLmZhY3RvcnkoJ2Zvcm1seVV0aWwnLCBmb3JtbHlVdGlsKTtcblxuICBmb3JtbHlVdGlsLnRlc3RzID0gT05fVEVTVCA/IHJlcXVpcmUoJy4vZm9ybWx5VXRpbC50ZXN0JykobmdNb2R1bGUpIDogbnVsbDtcblxuICBmdW5jdGlvbiBmb3JtbHlVdGlsKCkge1xuICAgIHJldHVybiB1dGlscztcbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3NlcnZpY2VzL2Zvcm1seVV0aWwuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUuZmFjdG9yeSgnZm9ybWx5V2FybicsIGZ1bmN0aW9uIChmb3JtbHlDb25maWcsIGZvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXgsICRsb2cpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gd2FybigpIHtcbiAgICAgIGlmICghZm9ybWx5Q29uZmlnLmRpc2FibGVXYXJuaW5ncykge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciB3YXJuSW5mb1NsdWcgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgIGFyZ3MudW5zaGlmdCgnRm9ybWx5IFdhcm5pbmc6Jyk7XG4gICAgICAgIGFyZ3MucHVzaChgJHtmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4fSR7d2FybkluZm9TbHVnfWApO1xuICAgICAgICAkbG9nLndhcm4oLi4uYXJncyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vc2VydmljZXMvZm9ybWx5V2Fybi5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICBuZ01vZHVsZS5kaXJlY3RpdmUoJ2Zvcm1seUN1c3RvbVZhbGlkYXRpb24nLCBmb3JtbHlDdXN0b21WYWxpZGF0aW9uKTtcblxuICBmb3JtbHlDdXN0b21WYWxpZGF0aW9uLnRlc3RzID0gT05fVEVTVCA/IHJlcXVpcmUoJy4vZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uLnRlc3QnKShuZ01vZHVsZSkgOiBudWxsO1xuXG4gIGZ1bmN0aW9uIGZvcm1seUN1c3RvbVZhbGlkYXRpb24oZm9ybWx5VXRpbCwgJHEpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbCwgYXR0cnMsIGN0cmwpIHtcbiAgICAgICAgY29uc3Qgb3B0cyA9IHNjb3BlLm9wdGlvbnM7XG4gICAgICAgIGlmIChvcHRzLnZhbGlkYXRvcnMpIHtcbiAgICAgICAgICBjaGVja1ZhbGlkYXRvcnMob3B0cy52YWxpZGF0b3JzKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRzLnZhbGlkYXRpb24ubWVzc2FnZXMgPSBvcHRzLnZhbGlkYXRpb24ubWVzc2FnZXMgfHwge307XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChvcHRzLnZhbGlkYXRpb24ubWVzc2FnZXMsIChtZXNzYWdlLCBrZXkpID0+IHtcbiAgICAgICAgICBvcHRzLnZhbGlkYXRpb24ubWVzc2FnZXNba2V5XSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIG1lc3NhZ2UsIGN0cmwuJG1vZGVsVmFsdWUsIGN0cmwuJHZpZXdWYWx1ZSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICB2YXIgdXNlTmV3VmFsaWRhdG9yc0FwaSA9IGN0cmwuaGFzT3duUHJvcGVydHkoJyR2YWxpZGF0b3JzJykgJiYgIWF0dHJzLmhhc093blByb3BlcnR5KCd1c2VQYXJzZXJzJyk7XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChvcHRzLnZhbGlkYXRvcnMsIGZ1bmN0aW9uKHZhbGlkYXRvciwgbmFtZSkge1xuICAgICAgICAgIHZhciBtZXNzYWdlID0gdmFsaWRhdG9yLm1lc3NhZ2U7XG4gICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIG9wdHMudmFsaWRhdGlvbi5tZXNzYWdlc1tuYW1lXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgbWVzc2FnZSwgY3RybC4kbW9kZWxWYWx1ZSwgY3RybC4kdmlld1ZhbHVlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbGlkYXRvciA9IGFuZ3VsYXIuaXNPYmplY3QodmFsaWRhdG9yKSA/IHZhbGlkYXRvci5leHByZXNzaW9uIDogdmFsaWRhdG9yO1xuICAgICAgICAgIHZhciBpc1Bvc3NpYmx5QXN5bmMgPSAhYW5ndWxhci5pc1N0cmluZyh2YWxpZGF0b3IpO1xuICAgICAgICAgIGlmICh1c2VOZXdWYWxpZGF0b3JzQXBpKSB7XG4gICAgICAgICAgICBzZXR1cFdpdGhWYWxpZGF0b3JzKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldHVwV2l0aFBhcnNlcnMoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBzZXR1cFdpdGhWYWxpZGF0b3JzKCkge1xuICAgICAgICAgICAgdmFyIHZhbGlkYXRvckNvbGxlY3Rpb24gPSBpc1Bvc3NpYmx5QXN5bmMgPyAnJGFzeW5jVmFsaWRhdG9ycycgOiAnJHZhbGlkYXRvcnMnO1xuICAgICAgICAgICAgY3RybFt2YWxpZGF0b3JDb2xsZWN0aW9uXVtuYW1lXSA9IGZ1bmN0aW9uKG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIHZhbGlkYXRvciwgbW9kZWxWYWx1ZSwgdmlld1ZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKGlzUG9zc2libHlBc3luYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc1Byb21pc2VMaWtlKHZhbHVlKSA/IHZhbHVlIDogdmFsdWUgPyAkcS53aGVuKHZhbHVlKSA6ICRxLnJlamVjdCh2YWx1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIHNldHVwV2l0aFBhcnNlcnMoKSB7XG4gICAgICAgICAgICBsZXQgaW5GbGlnaHRWYWxpZGF0b3I7XG4gICAgICAgICAgICBjdHJsLiRwYXJzZXJzLnVuc2hpZnQoZnVuY3Rpb24odmlld1ZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhciBpc1ZhbGlkID0gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCB2YWxpZGF0b3IsIGN0cmwuJG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChpc1Byb21pc2VMaWtlKGlzVmFsaWQpKSB7XG4gICAgICAgICAgICAgICAgY3RybC4kcGVuZGluZyA9IGN0cmwuJHBlbmRpbmcgfHwge307XG4gICAgICAgICAgICAgICAgY3RybC4kcGVuZGluZ1tuYW1lXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaW5GbGlnaHRWYWxpZGF0b3IgPSBpc1ZhbGlkO1xuICAgICAgICAgICAgICAgIGlzVmFsaWQudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoaW5GbGlnaHRWYWxpZGF0b3IgPT09IGlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkobmFtZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGluRmxpZ2h0VmFsaWRhdG9yID09PSBpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KG5hbWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhjdHJsLiRwZW5kaW5nKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGN0cmwuJHBlbmRpbmc7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY3RybC4kcGVuZGluZ1tuYW1lXTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShuYW1lLCBpc1ZhbGlkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdmlld1ZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaXNQcm9taXNlTGlrZShvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgYW5ndWxhci5pc0Z1bmN0aW9uKG9iai50aGVuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1ZhbGlkYXRvcnModmFsaWRhdG9ycykge1xuICAgICAgdmFyIGFsbG93ZWRQcm9wZXJ0aWVzID0gWydleHByZXNzaW9uJywgJ21lc3NhZ2UnXTtcbiAgICAgIHZhciB2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMgPSB7fTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2YWxpZGF0b3JzLCAodmFsaWRhdG9yLCBuYW1lKSA9PiB7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHZhbGlkYXRvcikpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV4dHJhUHJvcHMgPSBbXTtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHZhbGlkYXRvciwgKHYsIGtleSkgPT4ge1xuICAgICAgICAgIGlmIChhbGxvd2VkUHJvcGVydGllcy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICBleHRyYVByb3BzLnB1c2goa2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZXh0cmFQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICB2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHNbbmFtZV0gPSBleHRyYVByb3BzO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChPYmplY3Qua2V5cyh2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMpLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoW1xuICAgICAgICAgIGBWYWxpZGF0b3JzIGFyZSBvbmx5IGFsbG93ZWQgdG8gYmUgZnVuY3Rpb25zIG9yIG9iamVjdHMgdGhhdCBoYXZlICR7YWxsb3dlZFByb3BlcnRpZXMuam9pbignLCAnKX0uYCxcbiAgICAgICAgICBgWW91IHByb3ZpZGVkIHNvbWUgZXh0cmEgcHJvcGVydGllczogJHtKU09OLnN0cmluZ2lmeSh2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMpfWBcbiAgICAgICAgXS5qb2luKCcgJykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uLmpzXG4gKiovIiwibGV0IGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyLWZpeCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKCdmb3JtbHlGaWVsZCcsIGZvcm1seUZpZWxkKTtcblxuICBmb3JtbHlGaWVsZC50ZXN0cyA9IE9OX1RFU1QgPyByZXF1aXJlKCcuL2Zvcm1seS1maWVsZC50ZXN0JykobmdNb2R1bGUpIDogbnVsbDtcblxuICAvKipcbiAgICogQG5nZG9jIGRpcmVjdGl2ZVxuICAgKiBAbmFtZSBmb3JtbHlGaWVsZFxuICAgKiBAcmVzdHJpY3QgQUVcbiAgICovXG4gIGZ1bmN0aW9uIGZvcm1seUZpZWxkKCRodHRwLCAkcSwgJGNvbXBpbGUsICR0ZW1wbGF0ZUNhY2hlLCBmb3JtbHlDb25maWcsIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcywgZm9ybWx5QXBpQ2hlY2ssXG4gICAgICAgICAgICAgICAgICAgICAgIGZvcm1seVV0aWwsIGZvcm1seVVzYWJpbGl0eSwgZm9ybWx5V2Fybikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0FFJyxcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICBzY29wZToge1xuICAgICAgICBvcHRpb25zOiAnPScsXG4gICAgICAgIG1vZGVsOiAnPScsXG4gICAgICAgIGZvcm1JZDogJ0AnLFxuICAgICAgICBpbmRleDogJz0/JyxcbiAgICAgICAgZmllbGRzOiAnPT8nLFxuICAgICAgICBmb3JtU3RhdGU6ICc9PycsXG4gICAgICAgIGZvcm06ICc9PydcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiBmaWVsZENvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJHBhcnNlLCAkY29udHJvbGxlcikge1xuICAgICAgICB2YXIgb3B0cyA9ICRzY29wZS5vcHRpb25zO1xuICAgICAgICB2YXIgZmllbGRUeXBlID0gb3B0cy50eXBlICYmIGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdHMudHlwZSk7XG4gICAgICAgIHNpbXBsaWZ5TGlmZShvcHRzKTtcbiAgICAgICAgbWVyZ2VGaWVsZE9wdGlvbnNXaXRoVHlwZURlZmF1bHRzKG9wdHMsIGZpZWxkVHlwZSk7XG4gICAgICAgIGV4dGVuZE9wdGlvbnNXaXRoRGVmYXVsdHMob3B0cywgJHNjb3BlLmluZGV4KTtcbiAgICAgICAgY2hlY2tBcGkob3B0cyk7XG4gICAgICAgIC8vIHNldCBmaWVsZCBpZCB0byBsaW5rIGxhYmVscyBhbmQgZmllbGRzXG4gICAgICAgICRzY29wZS5pZCA9IGZvcm1seVV0aWwuZ2V0RmllbGRJZCgkc2NvcGUuZm9ybUlkLCBvcHRzLCAkc2NvcGUuaW5kZXgpO1xuXG4gICAgICAgIC8vIGluaXRhbGl6YXRpb25cbiAgICAgICAgcnVuRXhwcmVzc2lvbnMoKTtcbiAgICAgICAgc2V0Rm9ybUNvbnRyb2woJHNjb3BlLCBvcHRzKTtcbiAgICAgICAgYWRkTW9kZWxXYXRjaGVyKCRzY29wZSwgb3B0cyk7XG4gICAgICAgIGFkZFZhbGlkYXRpb25NZXNzYWdlcyhvcHRzKTtcbiAgICAgICAgLy8gc2ltcGxpZnkgdGhpbmdzXG4gICAgICAgIC8vIGNyZWF0ZSAkc2NvcGUudG8gc28gdGVtcGxhdGUgYXV0aG9ycyBjYW4gcmVmZXJlbmNlIHRvIGluc3RlYWQgb2YgJHNjb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zXG4gICAgICAgICRzY29wZS50byA9ICRzY29wZS5vcHRpb25zLnRlbXBsYXRlT3B0aW9ucztcbiAgICAgICAgaW52b2tlQ29udHJvbGxlcnMoJHNjb3BlLCBvcHRzLCBmaWVsZFR5cGUpO1xuXG4gICAgICAgIC8vIGZ1bmN0aW9uIGRlZmluaXRpb25zXG4gICAgICAgIGZ1bmN0aW9uIHJ1bkV4cHJlc3Npb25zKCkge1xuICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkgeyAvLyBtdXN0IHJ1biBvbiBuZXh0IHRpY2sgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGN1cnJlbnQgdmFsdWUgaXMgY29ycmVjdC5cbiAgICAgICAgICAgIHZhciBmaWVsZCA9ICRzY29wZS5vcHRpb25zO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IHZhbHVlR2V0dGVyU2V0dGVyKCk7XG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goZmllbGQuZXhwcmVzc2lvblByb3BlcnRpZXMsIGZ1bmN0aW9uIHJ1bkV4cHJlc3Npb24oZXhwcmVzc2lvbiwgcHJvcCkge1xuICAgICAgICAgICAgICB2YXIgc2V0dGVyID0gJHBhcnNlKHByb3ApLmFzc2lnbjtcbiAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSAkcS53aGVuKGZvcm1seVV0aWwuZm9ybWx5RXZhbCgkc2NvcGUsIGV4cHJlc3Npb24sIGN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzZXR0ZXIoZmllbGQsIHZhbHVlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHZhbHVlR2V0dGVyU2V0dGVyKG5ld1ZhbCkge1xuICAgICAgICAgIGlmICghJHNjb3BlLm1vZGVsIHx8ICEkc2NvcGUub3B0aW9ucy5rZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG5ld1ZhbCkpIHtcbiAgICAgICAgICAgICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldID0gbmV3VmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV07XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzaW1wbGlmeUxpZmUob3B0aW9ucykge1xuICAgICAgICAgIC8vIGFkZCBhIGZldyBlbXB0eSBvYmplY3RzIChpZiB0aGV5IGRvbid0IGFscmVhZHkgZXhpc3QpIHNvIHlvdSBkb24ndCBoYXZlIHRvIHVuZGVmaW5lZCBjaGVjayBldmVyeXdoZXJlXG4gICAgICAgICAgZm9ybWx5VXRpbC5yZXZlcnNlRGVlcE1lcmdlKG9wdGlvbnMsIHtcbiAgICAgICAgICAgIGRhdGE6IHt9LFxuICAgICAgICAgICAgdGVtcGxhdGVPcHRpb25zOiB7fSxcbiAgICAgICAgICAgIHZhbGlkYXRpb246IHt9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBtZXJnZUZpZWxkT3B0aW9uc1dpdGhUeXBlRGVmYXVsdHMob3B0aW9ucywgdHlwZSkge1xuICAgICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICBtZXJnZU9wdGlvbnMob3B0aW9ucywgdHlwZS5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBwcm9wZXJPcmRlciA9IGFycmF5aWZ5KG9wdGlvbnMub3B0aW9uc1R5cGVzKS5yZXZlcnNlKCk7IC8vIHNvIHRoZSByaWdodCB0aGluZ3MgYXJlIG92ZXJyaWRkZW5cbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2gocHJvcGVyT3JkZXIsIHR5cGVOYW1lID0+IHtcbiAgICAgICAgICAgIG1lcmdlT3B0aW9ucyhvcHRpb25zLCBmb3JtbHlDb25maWcuZ2V0VHlwZSh0eXBlTmFtZSwgdHJ1ZSwgb3B0aW9ucykuZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbWVyZ2VPcHRpb25zKG9wdGlvbnMsIGV4dHJhT3B0aW9ucykge1xuICAgICAgICAgIGlmIChleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZXh0cmFPcHRpb25zKSkge1xuICAgICAgICAgICAgICBleHRyYU9wdGlvbnMgPSBleHRyYU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtbHlVdGlsLnJldmVyc2VEZWVwTWVyZ2Uob3B0aW9ucywgZXh0cmFPcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBleHRlbmRPcHRpb25zV2l0aERlZmF1bHRzKG9wdGlvbnMsIGluZGV4KSB7XG4gICAgICAgICAgY29uc3Qga2V5ID0gb3B0aW9ucy5rZXkgfHwgaW5kZXggfHwgMDtcbiAgICAgICAgICBjb25zdCBpbml0aWFsVmFsdWUgPSAkc2NvcGUubW9kZWwgJiYgJHNjb3BlLm1vZGVsW2tleV07XG4gICAgICAgICAgYW5ndWxhci5leHRlbmQob3B0aW9ucywge1xuICAgICAgICAgICAgLy8gYXR0YWNoIHRoZSBrZXkgaW4gY2FzZSB0aGUgZm9ybWx5LWZpZWxkIGRpcmVjdGl2ZSBpcyB1c2VkIGRpcmVjdGx5XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVHZXR0ZXJTZXR0ZXIsXG4gICAgICAgICAgICBydW5FeHByZXNzaW9ucyxcbiAgICAgICAgICAgIHJlc2V0TW9kZWwsXG4gICAgICAgICAgICB1cGRhdGVJbml0aWFsVmFsdWUsXG4gICAgICAgICAgICBpbml0aWFsVmFsdWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGluaXRpYWxpemF0aW9uIGZ1bmN0aW9uc1xuICAgICAgICBmdW5jdGlvbiBzZXRGb3JtQ29udHJvbChzY29wZSwgb3B0aW9ucykge1xuICAgICAgICAgIGlmIChvcHRpb25zLm5vRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKCdmb3JtW1wiJyArIHNjb3BlLmlkICsgJ1wiXScsIGZ1bmN0aW9uKGZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICBpZiAoZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgc2NvcGUuZmMgPSBmb3JtQ29udHJvbDsgLy8gc2hvcnRjdXQgZm9yIHRlbXBsYXRlIGF1dGhvcnNcbiAgICAgICAgICAgICAgc2NvcGUub3B0aW9ucy5mb3JtQ29udHJvbCA9IGZvcm1Db250cm9sO1xuICAgICAgICAgICAgICBhZGRTaG93TWVzc2FnZXNXYXRjaGVyKHNjb3BlLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZE1vZGVsV2F0Y2hlcihzY29wZSwgb3B0aW9ucykge1xuICAgICAgICAgIGlmIChvcHRpb25zLm1vZGVsKSB7XG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goJ29wdGlvbnMubW9kZWwnLCBydW5FeHByZXNzaW9ucywgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkU2hvd01lc3NhZ2VzV2F0Y2hlcihzY29wZSwgb3B0aW9ucykge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2NvcGUub3B0aW9ucy52YWxpZGF0aW9uLnNob3cgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICByZXR1cm4gc2NvcGUuZmMuJGludmFsaWQgJiYgc2NvcGUub3B0aW9ucy52YWxpZGF0aW9uLnNob3c7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsZXQgbm9Ub3VjaGVkQnV0RGlydHkgPSAoYW5ndWxhci5pc1VuZGVmaW5lZChzY29wZS5mYy4kdG91Y2hlZCkgJiYgc2NvcGUuZmMuJGRpcnR5KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmZjLiRpbnZhbGlkICYmIChzY29wZS5mYy4kdG91Y2hlZCB8fCBub1RvdWNoZWRCdXREaXJ0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24oc2hvdykge1xuICAgICAgICAgICAgb3B0aW9ucy52YWxpZGF0aW9uLmVycm9yRXhpc3RzQW5kU2hvdWxkQmVWaXNpYmxlID0gc2hvdztcbiAgICAgICAgICAgIHNjb3BlLnNob3dFcnJvciA9IHNob3c7IC8vIHNob3J0Y3V0IGZvciB0ZW1wbGF0ZSBhdXRob3JzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZXNldE1vZGVsKCkge1xuICAgICAgICAgICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldID0gJHNjb3BlLm9wdGlvbnMuaW5pdGlhbFZhbHVlO1xuICAgICAgICAgIGlmICgkc2NvcGUub3B0aW9ucy5mb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgJHNjb3BlLm9wdGlvbnMuZm9ybUNvbnRyb2wuJHNldFZpZXdWYWx1ZSgkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XSk7XG4gICAgICAgICAgICAkc2NvcGUub3B0aW9ucy5mb3JtQ29udHJvbC4kcmVuZGVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlSW5pdGlhbFZhbHVlKCkge1xuICAgICAgICAgICRzY29wZS5vcHRpb25zLmluaXRpYWxWYWx1ZSA9ICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkVmFsaWRhdGlvbk1lc3NhZ2VzKG9wdGlvbnMpIHtcbiAgICAgICAgICBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgPSBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgfHwge307XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlcywgZnVuY3Rpb24oZXhwcmVzc2lvbiwgbmFtZSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXNbbmFtZV0pIHtcbiAgICAgICAgICAgICAgb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzW25hbWVdID0gZnVuY3Rpb24odmlld1ZhbHVlLCBtb2RlbFZhbHVlLCBzY29wZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIGV4cHJlc3Npb24sIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpbnZva2VDb250cm9sbGVycyhzY29wZSwgb3B0aW9ucyA9IHt9LCB0eXBlID0ge30pIHtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goW3R5cGUuY29udHJvbGxlciwgb3B0aW9ucy5jb250cm9sbGVyXSwgY29udHJvbGxlciA9PiB7XG4gICAgICAgICAgICBpZiAoY29udHJvbGxlcikge1xuICAgICAgICAgICAgICAkY29udHJvbGxlcihjb250cm9sbGVyLCB7JHNjb3BlOiBzY29wZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24gZmllbGRMaW5rKHNjb3BlLCBlbCkge1xuICAgICAgICB2YXIgdHlwZSA9IHNjb3BlLm9wdGlvbnMudHlwZSAmJiBmb3JtbHlDb25maWcuZ2V0VHlwZShzY29wZS5vcHRpb25zLnR5cGUpO1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgdmFyIHRodXNseSA9IHRoaXM7XG4gICAgICAgIGdldEZpZWxkVGVtcGxhdGUoc2NvcGUub3B0aW9ucylcbiAgICAgICAgICAudGhlbihydW5NYW5pcHVsYXRvcnMoZm9ybWx5Q29uZmlnLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnByZVdyYXBwZXIpKVxuICAgICAgICAgIC50aGVuKHRyYW5zY2x1ZGVJbldyYXBwZXJzKHNjb3BlLm9wdGlvbnMpKVxuICAgICAgICAgIC50aGVuKHJ1bk1hbmlwdWxhdG9ycyhmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucG9zdFdyYXBwZXIpKVxuICAgICAgICAgIC50aGVuKHNldEVsZW1lbnRUZW1wbGF0ZSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgZm9ybWx5V2FybihcbiAgICAgICAgICAgICAgJ3RoZXJlLXdhcy1hLXByb2JsZW0tc2V0dGluZy10aGUtdGVtcGxhdGUtZm9yLXRoaXMtZmllbGQnLFxuICAgICAgICAgICAgICAnVGhlcmUgd2FzIGEgcHJvYmxlbSBzZXR0aW5nIHRoZSB0ZW1wbGF0ZSBmb3IgdGhpcyBmaWVsZCAnLFxuICAgICAgICAgICAgICBzY29wZS5vcHRpb25zLFxuICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBzZXRFbGVtZW50VGVtcGxhdGUodGVtcGxhdGVFbCkge1xuICAgICAgICAgIGVsLmh0bWwoYXNIdG1sKHRlbXBsYXRlRWwpKTtcbiAgICAgICAgICAkY29tcGlsZShlbC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgaWYgKHR5cGUgJiYgdHlwZS5saW5rKSB7XG4gICAgICAgICAgICB0eXBlLmxpbmsuYXBwbHkodGh1c2x5LCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNjb3BlLm9wdGlvbnMubGluaykge1xuICAgICAgICAgICAgc2NvcGUub3B0aW9ucy5saW5rLmFwcGx5KHRodXNseSwgYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcnVuTWFuaXB1bGF0b3JzKG1hbmlwdWxhdG9ycykge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBydW5NYW5pcHVsYXRvcnNPblRlbXBsYXRlKHRlbXBsYXRlKSB7XG4gICAgICAgICAgICB2YXIgY2hhaW4gPSAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChtYW5pcHVsYXRvcnMsIG1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgICAgICAgY2hhaW4gPSBjaGFpbi50aGVuKHRlbXBsYXRlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihtYW5pcHVsYXRvcih0ZW1wbGF0ZSwgc2NvcGUub3B0aW9ucywgc2NvcGUpKS50aGVuKG5ld1RlbXBsYXRlID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzU3RyaW5nKG5ld1RlbXBsYXRlKSA/IG5ld1RlbXBsYXRlIDogYXNIdG1sKG5ld1RlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFzSHRtbChlbCkge1xuICAgICAgdmFyIHdyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJzxhPjwvYT4nKTtcbiAgICAgIHJldHVybiB3cmFwcGVyLmFwcGVuZChlbCkuaHRtbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZpZWxkVGVtcGxhdGUob3B0aW9ucykge1xuICAgICAgbGV0IHR5cGUgPSBmb3JtbHlDb25maWcuZ2V0VHlwZShvcHRpb25zLnR5cGUsIHRydWUsIG9wdGlvbnMpO1xuICAgICAgbGV0IHRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZSB8fCB0eXBlICYmIHR5cGUudGVtcGxhdGU7XG4gICAgICBsZXQgdGVtcGxhdGVVcmwgPSBvcHRpb25zLnRlbXBsYXRlVXJsIHx8IHR5cGUgJiYgdHlwZS50ZW1wbGF0ZVVybDtcbiAgICAgIGlmICghdGVtcGxhdGUgJiYgIXRlbXBsYXRlVXJsKSB7XG4gICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGaWVsZEVycm9yKFxuICAgICAgICAgICd0eXBlLXR5cGUtaGFzLW5vLXRlbXBsYXRlJyxcbiAgICAgICAgICBgVHlwZSAnJHtvcHRpb25zLnR5cGV9JyBoYXMgbm90IHRlbXBsYXRlLiBPbiBlbGVtZW50OmAsIG9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRUZW1wbGF0ZSh0ZW1wbGF0ZSB8fCB0ZW1wbGF0ZVVybCwgIXRlbXBsYXRlKTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGdldFRlbXBsYXRlKHRlbXBsYXRlLCBpc1VybCkge1xuICAgICAgaWYgKCFpc1VybCkge1xuICAgICAgICByZXR1cm4gJHEud2hlbih0ZW1wbGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaHR0cE9wdGlvbnMgPSB7Y2FjaGU6ICR0ZW1wbGF0ZUNhY2hlfTtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCh0ZW1wbGF0ZSwgaHR0cE9wdGlvbnMpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICBmb3JtbHlXYXJuKFxuICAgICAgICAgICAgJ3Byb2JsZW0tbG9hZGluZy10ZW1wbGF0ZS1mb3ItdGVtcGxhdGV1cmwnLFxuICAgICAgICAgICAgJ1Byb2JsZW0gbG9hZGluZyB0ZW1wbGF0ZSBmb3IgJyArIHRlbXBsYXRlLFxuICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2NsdWRlSW5XcmFwcGVycyhvcHRpb25zKSB7XG4gICAgICBsZXQgd3JhcHBlciA9IGdldFdyYXBwZXJPcHRpb24ob3B0aW9ucyk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiB0cmFuc2NsdWRlVGVtcGxhdGUodGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKCF3cmFwcGVyLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdyYXBwZXIuZm9yRWFjaCgod3JhcHBlcikgPT4ge1xuICAgICAgICAgIGZvcm1seVVzYWJpbGl0eS5jaGVja1dyYXBwZXIod3JhcHBlciwgb3B0aW9ucyk7XG4gICAgICAgICAgd3JhcHBlci52YWxpZGF0ZU9wdGlvbnMgJiYgd3JhcHBlci52YWxpZGF0ZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgcnVuQXBpQ2hlY2sod3JhcHBlciwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSB3cmFwcGVyLm1hcCh3ID0+IGdldFRlbXBsYXRlKHcudGVtcGxhdGUgfHwgdy50ZW1wbGF0ZVVybCwgIXcudGVtcGxhdGUpKTtcbiAgICAgICAgcmV0dXJuICRxLmFsbChwcm9taXNlcykudGhlbih3cmFwcGVyc1RlbXBsYXRlcyA9PiB7XG4gICAgICAgICAgd3JhcHBlcnNUZW1wbGF0ZXMuZm9yRWFjaCgod3JhcHBlclRlbXBsYXRlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgZm9ybWx5VXNhYmlsaXR5LmNoZWNrV3JhcHBlclRlbXBsYXRlKHdyYXBwZXJUZW1wbGF0ZSwgd3JhcHBlcltpbmRleF0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLnJldmVyc2UoKTsgLy8gd3JhcHBlciAwIGlzIHdyYXBwZWQgaW4gd3JhcHBlciAxIGFuZCBzbyBvbi4uLlxuICAgICAgICAgIGxldCB0b3RhbFdyYXBwZXIgPSB3cmFwcGVyc1RlbXBsYXRlcy5zaGlmdCgpO1xuICAgICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLmZvckVhY2god3JhcHBlclRlbXBsYXRlID0+IHtcbiAgICAgICAgICAgIHRvdGFsV3JhcHBlciA9IGRvVHJhbnNjbHVzaW9uKHRvdGFsV3JhcHBlciwgd3JhcHBlclRlbXBsYXRlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gZG9UcmFuc2NsdXNpb24odG90YWxXcmFwcGVyLCB0ZW1wbGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkb1RyYW5zY2x1c2lvbih3cmFwcGVyLCB0ZW1wbGF0ZSkge1xuICAgICAgbGV0IHN1cGVyV3JhcHBlciA9IGFuZ3VsYXIuZWxlbWVudCgnPGE+PC9hPicpOyAvLyB0aGlzIGFsbG93cyBwZW9wbGUgbm90IGhhdmUgdG8gaGF2ZSBhIHNpbmdsZSByb290IGluIHdyYXBwZXJzXG4gICAgICBzdXBlcldyYXBwZXIuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgbGV0IHRyYW5zY2x1ZGVFbCA9IHN1cGVyV3JhcHBlci5maW5kKCdmb3JtbHktdHJhbnNjbHVkZScpO1xuICAgICAgaWYgKCF0cmFuc2NsdWRlRWwubGVuZ3RoKSB7XG4gICAgICAgIC8vdHJ5IGl0IHVzaW5nIG91ciBjdXN0b20gZmluZCBmdW5jdGlvblxuICAgICAgICB0cmFuc2NsdWRlRWwgPSBmb3JtbHlVdGlsLmZpbmRCeU5vZGVOYW1lKHN1cGVyV3JhcHBlciwgJ2Zvcm1seS10cmFuc2NsdWRlJyk7XG4gICAgICB9XG4gICAgICB0cmFuc2NsdWRlRWwucmVwbGFjZVdpdGgodGVtcGxhdGUpO1xuICAgICAgcmV0dXJuIHN1cGVyV3JhcHBlci5odG1sKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0V3JhcHBlck9wdGlvbihvcHRpb25zKSB7XG4gICAgICBsZXQgd3JhcHBlciA9IG9wdGlvbnMud3JhcHBlcjtcbiAgICAgIC8vIGV4cGxpY2l0IG51bGwgbWVhbnMgbm8gd3JhcHBlclxuICAgICAgaWYgKHdyYXBwZXIgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuXG4gICAgICAvLyBub3RoaW5nIHNwZWNpZmllZCBtZWFucyB1c2UgdGhlIGRlZmF1bHQgd3JhcHBlciBmb3IgdGhlIHR5cGVcbiAgICAgIGlmICghd3JhcHBlcikge1xuICAgICAgICAvLyBnZXQgYWxsIHdyYXBwZXJzIHRoYXQgc3BlY2lmeSB0aGV5IGFwcGx5IHRvIHRoaXMgdHlwZVxuICAgICAgICB3cmFwcGVyID0gYXJyYXlpZnkoZm9ybWx5Q29uZmlnLmdldFdyYXBwZXJCeVR5cGUob3B0aW9ucy50eXBlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3cmFwcGVyID0gYXJyYXlpZnkod3JhcHBlcikubWFwKGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKTtcbiAgICAgIH1cblxuICAgICAgLy8gZ2V0IGFsbCB3cmFwcGVycyBmb3IgdGhhdCB0aGlzIHR5cGUgc3BlY2lmaWVkIHRoYXQgaXQgdXNlcy5cbiAgICAgIHZhciB0eXBlID0gZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0aW9ucy50eXBlLCB0cnVlLCBvcHRpb25zKTtcbiAgICAgIGlmICh0eXBlICYmIHR5cGUud3JhcHBlcikge1xuICAgICAgICBsZXQgdHlwZVdyYXBwZXJzID0gYXJyYXlpZnkodHlwZS53cmFwcGVyKS5tYXAoZm9ybWx5Q29uZmlnLmdldFdyYXBwZXIpO1xuICAgICAgICB3cmFwcGVyID0gd3JhcHBlci5jb25jYXQodHlwZVdyYXBwZXJzKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWRkIHRoZSBkZWZhdWx0IHdyYXBwZXIgbGFzdFxuICAgICAgdmFyIGRlZmF1bHRXcmFwcGVyID0gZm9ybWx5Q29uZmlnLmdldFdyYXBwZXIoKTtcbiAgICAgIGlmIChkZWZhdWx0V3JhcHBlcikge1xuICAgICAgICB3cmFwcGVyLnB1c2goZGVmYXVsdFdyYXBwZXIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tBcGkob3B0aW9ucykge1xuICAgICAgZm9ybWx5QXBpQ2hlY2sudGhyb3coZm9ybWx5QXBpQ2hlY2suZm9ybWx5RmllbGRPcHRpb25zLCBhcmd1bWVudHMsIHtcbiAgICAgICAgcHJlZml4OiAnZm9ybWx5LWZpZWxkIGRpcmVjdGl2ZScsXG4gICAgICAgIHVybDogJ2Zvcm1seS1maWVsZC1kaXJlY3RpdmUtdmFsaWRhdGlvbi1mYWlsZWQnXG4gICAgICB9KTtcbiAgICAgIC8vIHZhbGlkYXRlIHdpdGggdGhlIHR5cGVcbiAgICAgIGNvbnN0IHR5cGUgPSBvcHRpb25zLnR5cGUgJiYgZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0aW9ucy50eXBlKTtcbiAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlLnZhbGlkYXRlT3B0aW9ucykge1xuICAgICAgICAgIHR5cGUudmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJ1bkFwaUNoZWNrKHR5cGUsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bkFwaUNoZWNrKHthcGlDaGVjaywgYXBpQ2hlY2tJbnN0YW5jZSwgYXBpQ2hlY2tGdW5jdGlvbiwgYXBpQ2hlY2tPcHRpb25zfSwgb3B0aW9ucykge1xuICAgICAgaWYgKCFhcGlDaGVjaykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBpbnN0YW5jZSA9IGFwaUNoZWNrSW5zdGFuY2UgfHwgZm9ybWx5QXBpQ2hlY2s7XG4gICAgICBjb25zdCBmbiA9IGFwaUNoZWNrRnVuY3Rpb24gfHwgJ3dhcm4nO1xuICAgICAgY29uc3Qgc2hhcGUgPSBpbnN0YW5jZS5zaGFwZShhcGlDaGVjayk7XG4gICAgICBpbnN0YW5jZVtmbl0oc2hhcGUsIFtvcHRpb25zXSwgYXBpQ2hlY2tPcHRpb25zIHx8IHtcbiAgICAgICAgcHJlZml4OiBgZm9ybWx5LWZpZWxkICR7bmFtZX1gLFxuICAgICAgICB1cmw6IGZvcm1seUFwaUNoZWNrLmNvbmZpZy5vdXRwdXQuZG9jc0Jhc2VVcmwgKyAnZm9ybWx5LWZpZWxkLXR5cGUtYXBpY2hlY2stZmFpbGVkJ1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiBhcnJheWlmeShvYmopIHtcbiAgICBpZiAob2JqICYmICFhbmd1bGFyLmlzQXJyYXkob2JqKSkge1xuICAgICAgb2JqID0gW29ial07XG4gICAgfSBlbHNlIGlmICghb2JqKSB7XG4gICAgICBvYmogPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2RpcmVjdGl2ZXMvZm9ybWx5LWZpZWxkLmpzXG4gKiovIiwibGV0IGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyLWZpeCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKCdmb3JtbHlGb3JtJywgZm9ybWx5Rm9ybSk7XG5cbiAgZm9ybWx5Rm9ybS50ZXN0cyA9IE9OX1RFU1QgPyByZXF1aXJlKCcuL2Zvcm1seS1mb3JtLnRlc3QnKShuZ01vZHVsZSkgOiBudWxsO1xuXG4gIC8qKlxuICAgKiBAbmdkb2MgZGlyZWN0aXZlXG4gICAqIEBuYW1lIGZvcm1seUZvcm1cbiAgICogQHJlc3RyaWN0IEVcbiAgICovXG4gIGZ1bmN0aW9uIGZvcm1seUZvcm0oZm9ybWx5VXNhYmlsaXR5LCAkcGFyc2UsIGZvcm1seUFwaUNoZWNrLCBmb3JtbHlDb25maWcpIHtcbiAgICB2YXIgY3VycmVudEZvcm1JZCA9IDE7XG4gICAgdmFyIG9wdGlvbnNBcGkgPSBbXG4gICAgICBmb3JtbHlBcGlDaGVjay5zaGFwZSh7XG4gICAgICAgIGZvcm1TdGF0ZTogZm9ybWx5QXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICAgICAgICByZXNldE1vZGVsOiBmb3JtbHlBcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICAgICAgICB1cGRhdGVJbml0aWFsVmFsdWU6IGZvcm1seUFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gICAgICAgIHJlbW92ZUNocm9tZUF1dG9Db21wbGV0ZTogZm9ybWx5QXBpQ2hlY2suYm9vbC5vcHRpb25hbFxuICAgICAgfSkuc3RyaWN0Lm9wdGlvbmFsXG4gICAgXTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBmdW5jdGlvbihlbCwgYXR0cnMpIHtcbiAgICAgICAgLyoganNoaW50IC1XMDMzICovIC8vIHRoaXMgYmVjYXVzZSBqc2hpbnQgaXMgYnJva2VuIEkgZ3Vlc3MuLi5cbiAgICAgICAgY29uc3Qgcm9vdEVsID0gYXR0cnMucm9vdEVsIHx8ICduZy1mb3JtJztcbiAgICAgICAgY29uc3QgZm9ybU5hbWUgPSBgZm9ybWx5XyR7Y3VycmVudEZvcm1JZCsrfWA7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgPCR7cm9vdEVsfSBjbGFzcz1cImZvcm1seVwiXG4gICAgICAgICAgICAgICAgICAgbmFtZT1cIiR7Zm9ybU5hbWV9XCJcbiAgICAgICAgICAgICAgICAgICByb2xlPVwiZm9ybVwiPlxuICAgICAgICAgICAgPGRpdiBmb3JtbHktZmllbGRcbiAgICAgICAgICAgICAgICAgbmctcmVwZWF0PVwiZmllbGQgaW4gZmllbGRzIHRyYWNrIGJ5ICRpbmRleFwiXG4gICAgICAgICAgICAgICAgIG5nLWlmPVwiIWZpZWxkLmhpZGVcIlxuICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm1seS1maWVsZCB7e2ZpZWxkLnR5cGUgPyAnZm9ybWx5LWZpZWxkLScgKyBmaWVsZC50eXBlIDogJyd9fVwiXG4gICAgICAgICAgICAgICAgIG9wdGlvbnM9XCJmaWVsZFwiXG4gICAgICAgICAgICAgICAgIG1vZGVsPVwiZmllbGQubW9kZWwgfHwgbW9kZWxcIlxuICAgICAgICAgICAgICAgICBmaWVsZHM9XCJmaWVsZHNcIlxuICAgICAgICAgICAgICAgICBmb3JtPVwiJHtmb3JtTmFtZX1cIlxuICAgICAgICAgICAgICAgICBmb3JtLWlkPVwiJHtmb3JtTmFtZX1cIlxuICAgICAgICAgICAgICAgICBmb3JtLXN0YXRlPVwib3B0aW9ucy5mb3JtU3RhdGVcIlxuICAgICAgICAgICAgICAgICBpbmRleD1cIiRpbmRleFwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IG5nLXRyYW5zY2x1ZGU+PC9kaXY+XG4gICAgICAgICAgPC8ke3Jvb3RFbH0+XG4gICAgICAgIGA7XG4gICAgICB9LFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICBzY29wZToge1xuICAgICAgICBmaWVsZHM6ICc9JyxcbiAgICAgICAgbW9kZWw6ICc9JyxcbiAgICAgICAgZm9ybTogJz0/JyxcbiAgICAgICAgb3B0aW9uczogJz0/J1xuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICBzZXR1cE9wdGlvbnMoKTtcbiAgICAgICAgJHNjb3BlLm1vZGVsID0gJHNjb3BlLm1vZGVsIHx8IHt9O1xuICAgICAgICAkc2NvcGUuZmllbGRzID0gJHNjb3BlLmZpZWxkcyB8fCBbXTtcblxuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgYXR0YWNoS2V5KTsgLy8gYXR0YWNoZXMgYSBrZXkgYmFzZWQgb24gdGhlIGluZGV4IGlmIGEga2V5IGlzbid0IHNwZWNpZmllZFxuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgc2V0dXBXYXRjaGVycyk7IC8vIHNldHVwIHdhdGNoZXJzIGZvciBhbGwgZmllbGRzXG5cbiAgICAgICAgLy8gd2F0Y2ggdGhlIG1vZGVsIGFuZCBldmFsdWF0ZSB3YXRjaCBleHByZXNzaW9ucyB0aGF0IGRlcGVuZCBvbiBpdC5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnbW9kZWwnLCBmdW5jdGlvbiBvblJlc3VsdFVwZGF0ZShuZXdSZXN1bHQpIHtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgIC8qanNoaW50IC1XMDMwICovXG4gICAgICAgICAgICBmaWVsZC5ydW5FeHByZXNzaW9ucyAmJiBmaWVsZC5ydW5FeHByZXNzaW9ucyhuZXdSZXN1bHQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICBmdW5jdGlvbiBzZXR1cE9wdGlvbnMoKSB7XG4gICAgICAgICAgZm9ybWx5QXBpQ2hlY2sudGhyb3cob3B0aW9uc0FwaSwgWyRzY29wZS5vcHRpb25zXSwge3ByZWZpeDogJ2Zvcm1seS1mb3JtIG9wdGlvbnMgY2hlY2snfSk7XG4gICAgICAgICAgJHNjb3BlLm9wdGlvbnMgPSAkc2NvcGUub3B0aW9ucyB8fCB7fTtcbiAgICAgICAgICAkc2NvcGUub3B0aW9ucy5mb3JtU3RhdGUgPSAkc2NvcGUub3B0aW9ucy5mb3JtU3RhdGUgfHwge307XG5cbiAgICAgICAgICBhbmd1bGFyLmV4dGVuZCgkc2NvcGUub3B0aW9ucywge1xuICAgICAgICAgICAgdXBkYXRlSW5pdGlhbFZhbHVlLFxuICAgICAgICAgICAgcmVzZXRNb2RlbFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVJbml0aWFsVmFsdWUoKSB7XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIGZpZWxkID0+IGZpZWxkLnVwZGF0ZUluaXRpYWxWYWx1ZSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlc2V0TW9kZWwoKSB7XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIGZpZWxkID0+IGZpZWxkLnJlc2V0TW9kZWwoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhdHRhY2hLZXkoZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgZmllbGQua2V5ID0gZmllbGQua2V5IHx8IGluZGV4IHx8IDA7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXR1cFdhdGNoZXJzKGZpZWxkLCBpbmRleCkge1xuICAgICAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZmllbGQud2F0Y2hlcikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHdhdGNoZXJzID0gZmllbGQud2F0Y2hlcjtcbiAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNBcnJheSh3YXRjaGVycykpIHtcbiAgICAgICAgICAgIHdhdGNoZXJzID0gW3dhdGNoZXJzXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHdhdGNoZXJzLCBmdW5jdGlvbih3YXRjaGVyKSB7XG4gICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKHdhdGNoZXIubGlzdGVuZXIpKSB7XG4gICAgICAgICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGaWVsZEVycm9yKFxuICAgICAgICAgICAgICAgICdhbGwtZmllbGQtd2F0Y2hlcnMtbXVzdC1oYXZlLWEtbGlzdGVuZXInLFxuICAgICAgICAgICAgICAgICdBbGwgZmllbGQgd2F0Y2hlcnMgbXVzdCBoYXZlIGEgbGlzdGVuZXInLCBmaWVsZFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHdhdGNoRXhwcmVzc2lvbiA9IGdldFdhdGNoRXhwcmVzc2lvbih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpO1xuICAgICAgICAgICAgdmFyIHdhdGNoTGlzdGVuZXIgPSBnZXRXYXRjaExpc3RlbmVyKHdhdGNoZXIsIGZpZWxkLCBpbmRleCk7XG5cbiAgICAgICAgICAgIHZhciB0eXBlID0gd2F0Y2hlci50eXBlIHx8ICckd2F0Y2gnO1xuICAgICAgICAgICAgd2F0Y2hlci5zdG9wV2F0Y2hpbmcgPSAkc2NvcGVbdHlwZV0od2F0Y2hFeHByZXNzaW9uLCB3YXRjaExpc3RlbmVyLCB3YXRjaGVyLndhdGNoRGVlcCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRXYXRjaEV4cHJlc3Npb24od2F0Y2hlciwgZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgdmFyIHdhdGNoRXhwcmVzc2lvbiA9IHdhdGNoZXIuZXhwcmVzc2lvbiB8fCBgbW9kZWxbJyR7ZmllbGQua2V5fSddYDtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHdhdGNoRXhwcmVzc2lvbikpIHtcbiAgICAgICAgICAgIC8vIHdyYXAgdGhlIGZpZWxkJ3Mgd2F0Y2ggZXhwcmVzc2lvbiBzbyB3ZSBjYW4gY2FsbCBpdCB3aXRoIHRoZSBmaWVsZCBhcyB0aGUgZmlyc3QgYXJnXG4gICAgICAgICAgICAvLyBhbmQgdGhlIHN0b3AgZnVuY3Rpb24gYXMgdGhlIGxhc3QgYXJnIGFzIGEgaGVscGVyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxFeHByZXNzaW9uID0gd2F0Y2hFeHByZXNzaW9uO1xuICAgICAgICAgICAgd2F0Y2hFeHByZXNzaW9uID0gZnVuY3Rpb24gZm9ybWx5V2F0Y2hFeHByZXNzaW9uKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IG1vZGlmeUFyZ3Mod2F0Y2hlciwgaW5kZXgsIC4uLmFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbEV4cHJlc3Npb24oLi4uYXJncyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2F0Y2hFeHByZXNzaW9uLmRpc3BsYXlOYW1lID0gYEZvcm1seSBXYXRjaCBFeHByZXNzaW9uIGZvciBmaWVsZCBmb3IgJHtmaWVsZC5rZXl9YDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHdhdGNoRXhwcmVzc2lvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFdhdGNoTGlzdGVuZXIod2F0Y2hlciwgZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgdmFyIHdhdGNoTGlzdGVuZXIgPSB3YXRjaGVyLmxpc3RlbmVyO1xuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24od2F0Y2hMaXN0ZW5lcikpIHtcbiAgICAgICAgICAgIC8vIHdyYXAgdGhlIGZpZWxkJ3Mgd2F0Y2ggbGlzdGVuZXIgc28gd2UgY2FuIGNhbGwgaXQgd2l0aCB0aGUgZmllbGQgYXMgdGhlIGZpcnN0IGFyZ1xuICAgICAgICAgICAgLy8gYW5kIHRoZSBzdG9wIGZ1bmN0aW9uIGFzIHRoZSBsYXN0IGFyZyBhcyBhIGhlbHBlclxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsTGlzdGVuZXIgPSB3YXRjaExpc3RlbmVyO1xuICAgICAgICAgICAgd2F0Y2hMaXN0ZW5lciA9IGZ1bmN0aW9uIGZvcm1seVdhdGNoTGlzdGVuZXIoKSB7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gbW9kaWZ5QXJncyh3YXRjaGVyLCBpbmRleCwgLi4uYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsTGlzdGVuZXIoLi4uYXJncyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2F0Y2hMaXN0ZW5lci5kaXNwbGF5TmFtZSA9IGBGb3JtbHkgV2F0Y2ggTGlzdGVuZXIgZm9yIGZpZWxkIGZvciAke2ZpZWxkLmtleX1gO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gd2F0Y2hMaXN0ZW5lcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1vZGlmeUFyZ3Mod2F0Y2hlciwgaW5kZXgsIC4uLm9yaWdpbmFsQXJncykge1xuICAgICAgICAgIHJldHVybiBbJHNjb3BlLmZpZWxkc1tpbmRleF0sIC4uLm9yaWdpbmFsQXJncywgd2F0Y2hlci5zdG9wV2F0Y2hpbmddO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbGluayhzY29wZSwgZWwsIGF0dHJzKSB7XG4gICAgICAgIGlmIChhdHRycy5mb3JtKSB7XG4gICAgICAgICAgY29uc3QgZm9ybUlkID0gYXR0cnMubmFtZTtcbiAgICAgICAgICAkcGFyc2UoYXR0cnMuZm9ybSkuYXNzaWduKHNjb3BlLiRwYXJlbnQsIHNjb3BlW2Zvcm1JZF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hyb21lIGF1dG9jb21wbGV0ZSBsYW1lbmVzc1xuICAgICAgICAvLyBzZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2ODE1MyNjMTRcbiAgICAgICAgLy8g4YOaKOCyoOebiuCyoOGDmikgICAo4pWvwrDilqHCsCnila/vuLUg4pS74pSB4pS7ICAgICjil57igLjil5/vvJspXG4gICAgICAgIGNvbnN0IGdsb2JhbCA9IGZvcm1seUNvbmZpZy5leHRyYXMucmVtb3ZlQ2hyb21lQXV0b0NvbXBsZXRlID09PSB0cnVlO1xuICAgICAgICBjb25zdCBvZmZJbnN0YW5jZSA9IHNjb3BlLm9wdGlvbnMgJiYgc2NvcGUub3B0aW9ucy5yZW1vdmVDaHJvbWVBdXRvQ29tcGxldGUgPT09IGZhbHNlO1xuICAgICAgICBjb25zdCBvbkluc3RhbmNlID0gc2NvcGUub3B0aW9ucyAmJiBzY29wZS5vcHRpb25zLnJlbW92ZUNocm9tZUF1dG9Db21wbGV0ZSA9PT0gdHJ1ZTtcbiAgICAgICAgaWYgKChnbG9iYWwgJiYgIW9mZkluc3RhbmNlKSB8fCBvbkluc3RhbmNlKSB7XG4gICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnYXV0b2NvbXBsZXRlJywgJ2FkZHJlc3MtbGV2ZWw0Jyk7XG4gICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgICBlbFswXS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vZGlyZWN0aXZlcy9mb3JtbHktZm9ybS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICBuZ01vZHVsZS5kaXJlY3RpdmUoJ2Zvcm1seUZvY3VzJywgZnVuY3Rpb24oJHRpbWVvdXQsICRkb2N1bWVudCkge1xuICAgIC8qIGpzaGludCAtVzA1MiAqL1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBwcmV2aW91c0VsID0gbnVsbDtcbiAgICAgICAgdmFyIGVsID0gZWxlbWVudFswXTtcbiAgICAgICAgdmFyIGRvYyA9ICRkb2N1bWVudFswXTtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoJ2Zvcm1seUZvY3VzJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICBpZiAodmFsdWUgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHByZXZpb3VzRWwgPSBkb2MuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sIH5+YXR0cnMuZm9jdXNXYWl0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICBpZiAoZG9jLmFjdGl2ZUVsZW1lbnQgPT09IGVsKSB7XG4gICAgICAgICAgICAgIGVsLmJsdXIoKTtcbiAgICAgICAgICAgICAgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KCdyZWZvY3VzJykgJiYgcHJldmlvdXNFbCkge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzRWwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vZGlyZWN0aXZlcy9mb3JtbHktZm9jdXMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUucnVuKGFkZEZvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKTtcblxuICBmdW5jdGlvbiBhZGRGb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcihmb3JtbHlDb25maWcsIGZvcm1seVVzYWJpbGl0eSkge1xuICAgIGlmIChmb3JtbHlDb25maWcuZXh0cmFzLmRpc2FibGVOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucHJlV3JhcHBlci5wdXNoKG5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKTtcblxuXG4gICAgZnVuY3Rpb24gbmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IodGVtcGxhdGUsIG9wdGlvbnMsIHNjb3BlKSB7XG4gICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHZhciBkYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgICAgaWYgKGRhdGEubm9Ub3VjaHkpIHtcbiAgICAgICAgZm9ybWx5VXNhYmlsaXR5LmdldEZvcm1seUVycm9yKFxuICAgICAgICAgICdkYXRhLm5vVG91Y2h5IGlzIGdvaW5nIHRvIGJlIHJlbW92ZWQgaW4gYW4gdXBjb21pbmcgcmVsZWFzZS4gVGhpcyB3YXMgYW4gYXdmdWwgbmFtZSB0byBiZWdpbiB3aXRoLiAnICtcbiAgICAgICAgICAnUGxlYXNlIHVzZSBgZGF0YS5za2lwTmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IgPSB0cnVlYCBpbnN0ZWFkLidcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChkYXRhLm5vVG91Y2h5IHx8IChkYXRhLnNraXBOZ01vZGVsQXR0cnNNYW5pcHVsYXRvciA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgICAgfVxuICAgICAgZWwuaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gICAgICB2YXIgbW9kZWxOb2RlcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuZy1tb2RlbF0nKTtcbiAgICAgIGlmICghbW9kZWxOb2RlcyB8fCAhbW9kZWxOb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgICAgfVxuXG4gICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxOb2RlcywgJ2lkJywgc2NvcGUuaWQpO1xuICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsTm9kZXMsICduYW1lJywgc2NvcGUuaWQpO1xuXG4gICAgICBhZGRWYWxpZGF0aW9uKCk7XG4gICAgICBhZGRNb2RlbE9wdGlvbnMoKTtcbiAgICAgIGFkZFRlbXBsYXRlT3B0aW9uc0F0dHJzKCk7XG5cblxuICAgICAgcmV0dXJuIGVsLmlubmVySFRNTDtcblxuXG4gICAgICBmdW5jdGlvbiBhZGRWYWxpZGF0aW9uKCkge1xuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy52YWxpZGF0b3JzKSB8fCBhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMpKSB7XG4gICAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsTm9kZXMsICdmb3JtbHktY3VzdG9tLXZhbGlkYXRpb24nLCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkTW9kZWxPcHRpb25zKCkge1xuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy5tb2RlbE9wdGlvbnMpKSB7XG4gICAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsTm9kZXMsICduZy1tb2RlbC1vcHRpb25zJywgJ29wdGlvbnMubW9kZWxPcHRpb25zJyk7XG4gICAgICAgICAgaWYgKG9wdGlvbnMubW9kZWxPcHRpb25zLmdldHRlclNldHRlcikge1xuICAgICAgICAgICAgbW9kZWxOb2Rlcy5hdHRyKCduZy1tb2RlbCcsICdvcHRpb25zLnZhbHVlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFkZFRlbXBsYXRlT3B0aW9uc0F0dHJzKCkge1xuICAgICAgICBpZiAoIW9wdGlvbnMudGVtcGxhdGVPcHRpb25zICYmICFvcHRpb25zLmV4cHJlc3Npb25Qcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgLy8gbm8gbmVlZCB0byBydW4gdGhlc2UgaWYgdGhlcmUgYXJlIG5vIHRlbXBsYXRlT3B0aW9ucyBvciBleHByZXNzaW9uUHJvcGVydGllc1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0byA9IG9wdGlvbnMudGVtcGxhdGVPcHRpb25zIHx8IHt9O1xuICAgICAgICBjb25zdCBlcCA9IG9wdGlvbnMuZXhwcmVzc2lvblByb3BlcnRpZXMgfHwge307XG5cbiAgICAgICAgbGV0IG5nTW9kZWxBdHRyaWJ1dGVzID0gZ2V0QnVpbHRpbkF0dHJpYnV0ZXMoKTtcblxuICAgICAgICAvLyBleHRlbmQgd2l0aCB0aGUgdXNlcidzIHNwZWNpZmljYXRpb25zIHdpbm5pbmdcbiAgICAgICAgYW5ndWxhci5leHRlbmQobmdNb2RlbEF0dHJpYnV0ZXMsIG9wdGlvbnMubmdNb2RlbEF0dHJzKTtcblxuICAgICAgICBhbmd1bGFyLmZvckVhY2gobmdNb2RlbEF0dHJpYnV0ZXMsICh2YWwsIG5hbWUpID0+IHtcbiAgICAgICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eToxMCAqL1xuICAgICAgICAgIGxldCBhdHRyVmFsO1xuICAgICAgICAgIGxldCBhdHRyTmFtZTtcbiAgICAgICAgICBjb25zdCByZWYgPSBgb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNbJyR7bmFtZX0nXWA7XG4gICAgICAgICAgY29uc3QgdG9WYWwgPSB0b1tuYW1lXTtcbiAgICAgICAgICBjb25zdCBlcFZhbCA9IGdldEVwVmFsdWUoZXAsIG5hbWUpO1xuXG4gICAgICAgICAgY29uc3QgaW5UbyA9IGFuZ3VsYXIuaXNEZWZpbmVkKHRvVmFsKTtcbiAgICAgICAgICBjb25zdCBpbkVwID0gYW5ndWxhci5pc0RlZmluZWQoZXBWYWwpO1xuICAgICAgICAgIGlmICh2YWwudmFsdWUpIHtcbiAgICAgICAgICAgIC8vIEkgcmVhbGl6ZSB0aGlzIGxvb2tzIGJhY2t3YXJkcywgYnV0IGl0J3MgcmlnaHQsIHRydXN0IG1lLi4uXG4gICAgICAgICAgICBhdHRyTmFtZSA9IHZhbC52YWx1ZTtcbiAgICAgICAgICAgIGF0dHJWYWwgPSBuYW1lO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmFsLmV4cHJlc3Npb24gJiYgaW5Ubykge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSB2YWwuZXhwcmVzc2lvbjtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHRvW25hbWVdKSkge1xuICAgICAgICAgICAgICBhdHRyVmFsID0gYCRldmFsKCR7cmVmfSlgO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24odG9bbmFtZV0pKSB7XG4gICAgICAgICAgICAgIGF0dHJWYWwgPSBgJHtyZWZ9KG1vZGVsW29wdGlvbnMua2V5XSwgb3B0aW9ucywgdGhpcywgJGV2ZW50KWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgYG9wdGlvbnMudGVtcGxhdGVPcHRpb25zLiR7bmFtZX0gbXVzdCBiZSBhIHN0cmluZyBvciBmdW5jdGlvbjogJHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWwuYm91bmQgJiYgaW5FcCkge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYm91bmQ7XG4gICAgICAgICAgICBhdHRyVmFsID0gcmVmO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmFsLmF0dHJpYnV0ZSAmJiBpbkVwKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5hdHRyaWJ1dGU7XG4gICAgICAgICAgICBhdHRyVmFsID0gYHt7JHtyZWZ9fX1gO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmFsLmF0dHJpYnV0ZSAmJiBpblRvKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5hdHRyaWJ1dGU7XG4gICAgICAgICAgICBhdHRyVmFsID0gdG9WYWw7XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWwuYm91bmQgJiYgaW5Ubykge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYm91bmQ7XG4gICAgICAgICAgICBhdHRyVmFsID0gcmVmO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0ck5hbWUpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJWYWwpKSB7XG4gICAgICAgICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxOb2RlcywgYXR0ck5hbWUsIGF0dHJWYWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVXRpbGl0eSBmdW5jdGlvbnNcbiAgICBmdW5jdGlvbiBnZXRCdWlsdGluQXR0cmlidXRlcygpIHtcbiAgICAgIGxldCBuZ01vZGVsQXR0cmlidXRlcyA9IHtcbiAgICAgICAgZm9jdXM6IHtcbiAgICAgICAgICBhdHRyaWJ1dGU6ICdmb3JtbHktZm9jdXMnXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb25zdCBib3VuZE9ubHkgPSBbXTtcbiAgICAgIGNvbnN0IGJvdGhBdHRyaWJ1dGVBbmRCb3VuZCA9IFsncmVxdWlyZWQnLCAnZGlzYWJsZWQnLCAncGF0dGVybicsICdtaW5sZW5ndGgnXTtcbiAgICAgIGNvbnN0IGV4cHJlc3Npb25Pbmx5ID0gWydjaGFuZ2UnLCAna2V5ZG93bicsICdrZXl1cCcsICdrZXlwcmVzcycsICdjbGljaycsICdmb2N1cycsICdibHVyJ107XG4gICAgICBjb25zdCBhdHRyaWJ1dGVPbmx5ID0gWydwbGFjZWhvbGRlcicsICdtaW4nLCAnbWF4JywgJ3RhYmluZGV4JywgJ3R5cGUnXTtcbiAgICAgIGlmIChmb3JtbHlDb25maWcuZXh0cmFzLm5nTW9kZWxBdHRyc01hbmlwdWxhdG9yUHJlZmVyQm91bmQpIHtcbiAgICAgICAgYm91bmRPbmx5LnB1c2goJ21heGxlbmd0aCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm90aEF0dHJpYnV0ZUFuZEJvdW5kLnB1c2goJ21heGxlbmd0aCcpO1xuICAgICAgfVxuXG4gICAgICBhbmd1bGFyLmZvckVhY2goYm91bmRPbmx5LCBpdGVtID0+IHtcbiAgICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbaXRlbV0gPSB7Ym91bmQ6ICduZy0nICsgaXRlbX07XG4gICAgICB9KTtcblxuICAgICAgYW5ndWxhci5mb3JFYWNoKGJvdGhBdHRyaWJ1dGVBbmRCb3VuZCwgaXRlbSA9PiB7XG4gICAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW2l0ZW1dID0ge2F0dHJpYnV0ZTogaXRlbSwgYm91bmQ6ICduZy0nICsgaXRlbX07XG4gICAgICB9KTtcblxuICAgICAgYW5ndWxhci5mb3JFYWNoKGV4cHJlc3Npb25Pbmx5LCBpdGVtID0+IHtcbiAgICAgICAgdmFyIHByb3BOYW1lID0gJ29uJyArIGl0ZW0uc3Vic3RyKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBpdGVtLnN1YnN0cigxKTtcbiAgICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbcHJvcE5hbWVdID0ge2V4cHJlc3Npb246ICduZy0nICsgaXRlbX07XG4gICAgICB9KTtcblxuICAgICAgYW5ndWxhci5mb3JFYWNoKGF0dHJpYnV0ZU9ubHksIGl0ZW0gPT4ge1xuICAgICAgICBuZ01vZGVsQXR0cmlidXRlc1tpdGVtXSA9IHthdHRyaWJ1dGU6IGl0ZW19O1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmdNb2RlbEF0dHJpYnV0ZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RXBWYWx1ZShlcCwgbmFtZSkge1xuICAgICAgcmV0dXJuIGVwWyd0ZW1wbGF0ZU9wdGlvbnMuJyArIG5hbWVdIHx8XG4gICAgICAgIGVwW2B0ZW1wbGF0ZU9wdGlvbnNbJyR7bmFtZX0nXWBdIHx8XG4gICAgICAgIGVwW2B0ZW1wbGF0ZU9wdGlvbnNbXCIke25hbWV9XCJdYF07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkSWZOb3RQcmVzZW50KG5vZGVzLCBhdHRyLCB2YWwpIHtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChub2Rlcywgbm9kZSA9PiB7XG4gICAgICAgIGlmICghbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cikpIHtcbiAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShhdHRyLCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9ydW4vZm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUucnVuKGFkZEN1c3RvbVRhZ3MpO1xuXG4gIGZ1bmN0aW9uIGFkZEN1c3RvbVRhZ3MoJGRvY3VtZW50KSB7XG5cbiAgICBpZiAoJGRvY3VtZW50ICYmICRkb2N1bWVudC5nZXQpIHtcbiAgICAgIC8vSUU4IGNoZWNrIC0+XG4gICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwOTY0OTY2L2RldGVjdC1pZS12ZXJzaW9uLXByaW9yLXRvLXY5LWluLWphdmFzY3JpcHQvMTA5NjUyMDMjMTA5NjUyMDNcbiAgICAgIHZhciBkb2N1bWVudCA9ICRkb2N1bWVudC5nZXQoMCk7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gJzwhLS1baWYgbHQgSUUgOV0+PGk+PC9pPjwhW2VuZGlmXS0tPic7XG4gICAgICB2YXIgaXNJZUxlc3NUaGFuOSA9IChkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2knKS5sZW5ndGggPT09IDEpO1xuXG4gICAgICBpZiAoaXNJZUxlc3NUaGFuOSkge1xuICAgICAgICAvL2FkZCB0aGUgY3VzdG9tIGVsZW1lbnRzIHRoYXQgd2UgbmVlZCBmb3IgZm9ybWx5XG4gICAgICAgIHZhciBjdXN0b21FbGVtZW50cyA9XG4gICAgICAgICAgWydmb3JtbHktZmllbGQnLCAnZm9ybWx5LWZvcm0nLCAnZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uJywgJ2Zvcm1seS1mb2N1cycsICdmb3JtbHktdHJhbnNwb3NlJ107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXN0b21FbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoY3VzdG9tRWxlbWVudHNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcnVuL2Zvcm1seUN1c3RvbVRhZ3MuanNcbiAqKi8iLCJjb25zdCBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhci1maXgnKTtcblxuZXhwb3J0IGRlZmF1bHQge2Zvcm1seUV2YWwsIGdldEZpZWxkSWQsIHJldmVyc2VEZWVwTWVyZ2UsIGZpbmRCeU5vZGVOYW1lfTtcblxuZnVuY3Rpb24gZm9ybWx5RXZhbChzY29wZSwgZXhwcmVzc2lvbiwgbW9kZWxWYWx1ZSwgdmlld1ZhbHVlKSB7XG4gIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZXhwcmVzc2lvbikpIHtcbiAgICByZXR1cm4gZXhwcmVzc2lvbih2aWV3VmFsdWUsIG1vZGVsVmFsdWUsIHNjb3BlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc2NvcGUuJGV2YWwoZXhwcmVzc2lvbiwge1xuICAgICAgJHZpZXdWYWx1ZTogdmlld1ZhbHVlIHx8IG1vZGVsVmFsdWUsXG4gICAgICAkbW9kZWxWYWx1ZTogbW9kZWxWYWx1ZVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEZpZWxkSWQoZm9ybUlkLCBvcHRpb25zLCBpbmRleCkge1xuICB2YXIgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgaWYgKCF0eXBlICYmIG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICB0eXBlID0gJ3RlbXBsYXRlJztcbiAgfSBlbHNlIGlmICghdHlwZSAmJiBvcHRpb25zLnRlbXBsYXRlVXJsKSB7XG4gICAgdHlwZSA9ICd0ZW1wbGF0ZVVybCc7XG4gIH1cblxuICByZXR1cm4gW2Zvcm1JZCwgdHlwZSwgb3B0aW9ucy5rZXksIGluZGV4XS5qb2luKCdfJyk7XG59XG5cblxuZnVuY3Rpb24gcmV2ZXJzZURlZXBNZXJnZShkZXN0KSB7XG4gIGFuZ3VsYXIuZm9yRWFjaChhcmd1bWVudHMsIChzcmMsIGluZGV4KSA9PiB7XG4gICAgaWYgKCFpbmRleCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhbmd1bGFyLmZvckVhY2goc3JjLCAodmFsLCBwcm9wKSA9PiB7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGRlc3RbcHJvcF0pKSB7XG4gICAgICAgIGRlc3RbcHJvcF0gPSBhbmd1bGFyLmNvcHkodmFsKTtcbiAgICAgIH0gZWxzZSBpZiAob2JqQW5kU2FtZVR5cGUoZGVzdFtwcm9wXSwgdmFsKSkge1xuICAgICAgICByZXZlcnNlRGVlcE1lcmdlKGRlc3RbcHJvcF0sIHZhbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvYmpBbmRTYW1lVHlwZShvYmoxLCBvYmoyKSB7XG4gIHJldHVybiBhbmd1bGFyLmlzT2JqZWN0KG9iajEpICYmIGFuZ3VsYXIuaXNPYmplY3Qob2JqMikgJiZcbiAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqMSkgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmoyKTtcbn1cblxuLy9yZWN1cnNlIGRvd24gYSBub2RlIHRyZWUgdG8gZmluZCBhIG5vZGUgd2l0aCBtYXRjaGluZyBub2RlTmFtZSwgZm9yIGN1c3RvbSB0YWdzIGpRdWVyeS5maW5kIGRvZXNuJ3Qgd29yayBpbiBJRThcbmZ1bmN0aW9uIGZpbmRCeU5vZGVOYW1lKGVsLCBub2RlTmFtZSkge1xuICBpZiAoIWVsLnByb3ApIHsgLy8gbm90IGEgalF1ZXJ5IG9yIGpxTGl0ZSBvYmplY3QgLT4gd3JhcCBpdFxuICAgIGVsID0gYW5ndWxhci5lbGVtZW50KGVsKTtcbiAgfVxuXG4gIGlmIChlbC5wcm9wKCdub2RlTmFtZScpID09PSBub2RlTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgdmFyIGMgPSBlbC5jaGlsZHJlbigpO1xuICBmb3IodmFyIGkgPSAwOyBjICYmIGkgPCBjLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG5vZGUgPSBmaW5kQnlOb2RlTmFtZShjW2ldLCBub2RlTmFtZSk7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vb3RoZXIvdXRpbHMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJmb3JtbHkuanMifQ==