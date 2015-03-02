// angular-formly-templates-bootstrap version 4.0.0 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ngFormly"), require("apiCheck"), require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["ngFormly", "apiCheck", "angular"], factory);
	else if(typeof exports === 'object')
		exports["ngFormlyTemplatesBootstrap"] = factory(require("ngFormly"), require("apiCheck"), require("angular"));
	else
		root["ngFormlyTemplatesBootstrap"] = factory(root["ngFormly"], root["apiCheck"], root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_8__) {
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
	
	var ngModuleName = "formlyBootstrap";
	var angular = __webpack_require__(4);
	var ngModule = angular.module(ngModuleName, [__webpack_require__(2)]);
	ngModule.constant("formlyBootstrapApiCheck", __webpack_require__(3)({
	  output: {
	    prefix: "angular-formly-bootstrap"
	  }
	}));
	ngModule.constant("formlyBootstrapVersion", ("4.0.0"));
	
	__webpack_require__(5)(ngModule);
	__webpack_require__(6)(ngModule);
	__webpack_require__(7)(ngModule);
	
	module.exports = ngModuleName;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// some versions of angular don't export the angular module properly,
	// so we get it from window in this case.
	var angular = __webpack_require__(8);
	if (!angular.version) {
	  angular = window.angular;
	}
	module.exports = angular;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.config(addWrappers);
	
	  function addWrappers(formlyConfigProvider) {
	    formlyConfigProvider.setWrapper([{ name: "bootstrapLabel", template: __webpack_require__(17) }, { name: "bootstrapHasError", template: __webpack_require__(18) }]);
	  }
	  addWrappers.$inject = ["formlyConfigProvider"];
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(9)(ngModule);
	  __webpack_require__(10)(ngModule);
	  __webpack_require__(11)(ngModule);
	  __webpack_require__(12)(ngModule);
	  __webpack_require__(13)(ngModule);
	  __webpack_require__(14)(ngModule);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var addons = _interopRequire(__webpack_require__(15));
	
	var description = _interopRequire(__webpack_require__(16));
	
	module.exports = function (ngModule) {
	  addons(ngModule);
	  description(ngModule);
	};
	
	//export default ngModule => {
	//  require('./addons')(ngModule);
	//  require('./description')(ngModule);
	//};
	//

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.config(addCheckboxType);
	
	  function addCheckboxType(formlyConfigProvider, formlyBootstrapApiCheck) {
	    formlyConfigProvider.setType({
	      name: "checkbox",
	      template: __webpack_require__(19),
	      wrapper: ["bootstrapHasError"],
	      validateOptions: function validateOptions(options) {
	        formlyBootstrapApiCheck.warn(formlyBootstrapApiCheck.shape({
	          templateOptions: formlyBootstrapApiCheck.shape({
	            label: formlyBootstrapApiCheck.string
	          })
	        }), arguments, {
	          prefix: "checkbox type"
	        });
	      }
	    });
	  }
	  addCheckboxType.$inject = ["formlyConfigProvider", "formlyBootstrapApiCheck"];
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.config(addCheckboxType);
	
	  function addCheckboxType(formlyConfigProvider, formlyBootstrapApiCheck) {
	    formlyConfigProvider.setType({
	      name: "multiCheckbox",
	      template: __webpack_require__(20),
	      wrapper: ["bootstrapLabel", "bootstrapHasError"],
	      validateOptions: function validateOptions(options) {
	        formlyBootstrapApiCheck.warn(formlyBootstrapApiCheck.shape({
	          templateOptions: formlyBootstrapApiCheck.shape({
	            options: formlyBootstrapApiCheck.arrayOf(formlyBootstrapApiCheck.object),
	            labelProp: formlyBootstrapApiCheck.string.optional,
	            valueProp: formlyBootstrapApiCheck.string.optional
	          })
	        }), arguments, {
	          prefix: "multiCheckbox type"
	        });
	      },
	      controller: /* @ngInject */["$scope", function controller($scope) {
	        var to = $scope.to;
	        var opts = $scope.options;
	        $scope.multiCheckbox = {
	          checked: [],
	          change: setModel
	        };
	
	        function setModel() {
	          $scope.model[opts.key] = [];
	          angular.forEach($scope.multiCheckbox.checked, function (checkbox, index) {
	            if (checkbox) {
	              $scope.model[opts.key].push(to.options[index][to.valueProp || "value"]);
	            }
	          });
	        }
	      }]
	    });
	  }
	  addCheckboxType.$inject = ["formlyConfigProvider", "formlyBootstrapApiCheck"];
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.config(addInputType);
	
	  function addInputType(formlyConfigProvider) {
	    formlyConfigProvider.setType({
	      name: "input",
	      template: "<input class=\"form-control\" ng-model=\"model[options.key]\">",
	      wrapper: ["bootstrapLabel", "bootstrapHasError"]
	    });
	  }
	  addInputType.$inject = ["formlyConfigProvider"];
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.config(addRadioType);
	
	  function addRadioType(formlyConfigProvider, formlyBootstrapApiCheck) {
	    formlyConfigProvider.setType({
	      name: "radio",
	      template: __webpack_require__(21),
	      wrapper: ["bootstrapLabel", "bootstrapHasError"],
	      validateOptions: function validateOptions(options) {
	        formlyBootstrapApiCheck.warn(formlyBootstrapApiCheck.shape({
	          templateOptions: formlyBootstrapApiCheck.shape({
	            options: formlyBootstrapApiCheck.arrayOf(formlyBootstrapApiCheck.object),
	            labelProp: formlyBootstrapApiCheck.string.optional,
	            valueProp: formlyBootstrapApiCheck.string.optional
	          })
	        }), arguments, {
	          prefix: "radio type"
	        });
	      }
	    });
	  }
	  addRadioType.$inject = ["formlyConfigProvider", "formlyBootstrapApiCheck"];
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.config(addSelectType);
	
	  function addSelectType(formlyConfigProvider, formlyBootstrapApiCheck) {
	    formlyConfigProvider.setType({
	      name: "select",
	      template: __webpack_require__(22),
	      wrapper: ["bootstrapLabel", "bootstrapHasError"],
	      validateOptions: function validateOptions(options) {
	        formlyBootstrapApiCheck.warn(formlyBootstrapApiCheck.shape({
	          templateOptions: formlyBootstrapApiCheck.shape({
	            options: formlyBootstrapApiCheck.arrayOf(formlyBootstrapApiCheck.object),
	            labelProp: formlyBootstrapApiCheck.string.optional,
	            valueProp: formlyBootstrapApiCheck.string.optional,
	            groupProp: formlyBootstrapApiCheck.string.optional
	          })
	        }), arguments, {
	          prefix: "select type"
	        });
	      }
	    });
	  }
	  addSelectType.$inject = ["formlyConfigProvider", "formlyBootstrapApiCheck"];
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.config(addTextareaType);
	
	  function addTextareaType(formlyConfigProvider, formlyBootstrapApiCheck) {
	    formlyConfigProvider.setType({
	      name: "textarea",
	      template: "<textarea class=\"form-control\" ng-model=\"model[options.key]\"></textarea>",
	      wrapper: ["bootstrapLabel", "bootstrapHasError"],
	      defaultOptions: {
	        ngModelAttrs: {
	          rows: { attribute: "rows" },
	          cols: { attribute: "cols" }
	        }
	      },
	      validateOptions: function validateOptions(options) {
	        formlyBootstrapApiCheck.warn(formlyBootstrapApiCheck.shape({
	          templateOptions: formlyBootstrapApiCheck.shape({
	            rows: formlyBootstrapApiCheck.number.optional,
	            cols: formlyBootstrapApiCheck.number.optional
	          })
	        }), arguments, {
	          prefix: "textarea type"
	        });
	      }
	    });
	  }
	  addTextareaType.$inject = ["formlyConfigProvider", "formlyBootstrapApiCheck"];
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.run(addAddonsManipulator);
	
	  function addAddonsManipulator(formlyConfig, formlyBootstrapApiCheck) {
	    var addonTemplate = __webpack_require__(23);
	    var addonChecker = formlyBootstrapApiCheck.shape({
	      "class": formlyBootstrapApiCheck.string.optional,
	      text: formlyBootstrapApiCheck.string.optional
	    }).strict.optional;
	    formlyConfig.templateManipulators.preWrapper.push(function (template, options) {
	      if (options.type !== "input" || !options.templateOptions.addonLeft && !options.templateOptions.addonRight) {
	        return template;
	      }
	      formlyBootstrapApiCheck.warn(formlyBootstrapApiCheck.shape({
	        templateOptions: formlyBootstrapApiCheck.shape({
	          addonLeft: addonChecker,
	          addonRight: addonChecker
	        })
	      }), { length: 1, 0: options });
	      return addonTemplate.replace("<formly-transclude></formly-transclude>", template);
	    });
	  }
	  addAddonsManipulator.$inject = ["formlyConfig", "formlyBootstrapApiCheck"];
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.run(addDescriptionManipulator);
	
	  function addDescriptionManipulator(formlyConfig) {
	    formlyConfig.templateManipulators.preWrapper.push(function ariaDescribedBy(template, options, scope) {
	      if (angular.isDefined(options.templateOptions.description) && options.type !== "radio" && options.type !== "checkbox") {
	        var el = document.createElement("div");
	        el.appendChild(angular.element(template)[0]);
	        var modelEls = angular.element(el.querySelectorAll("[ng-model]"));
	        if (modelEls) {
	          el.appendChild(angular.element("<p id=\"" + scope.id + "_description\"" + "class=\"help-block\"" + "ng-if=\"to.description\">" + "{{to.description}}" + "</p>")[0]);
	          modelEls.attr("aria-describedby", scope.id + "_description");
	          return el.innerHTML;
	        } else {
	          return template;
	        }
	      } else {
	        return template;
	      }
	    });
	  }
	  addDescriptionManipulator.$inject = ["formlyConfig"];
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div>\n  <label for=\"{{id}}\" class=\"control-label\">\n    {{to.label}}\n    {{to.required ? '*' : ''}}\n  </label>\n  <formly-transclude></formly-transclude>\n</div>\n"

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': showError}\">\n  <formly-transclude></formly-transclude>\n</div>\n"

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"checkbox\">\n\t<label>\n\t\t<input type=\"checkbox\"\n           class=\"formly-field-checkbox\"\n\t\t       ng-model=\"model[options.key]\">\n\t\t{{to.label}}\n\t\t{{to.required ? '*' : ''}}\n\t</label>\n</div>\n"

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"radio-group\">\n  <div ng-repeat=\"(key, option) in to.options\" class=\"checkbox\">\n    <label>\n      <input type=\"checkbox\"\n             id=\"{{id + '_'+ $index}}\"\n             ng-model=\"multiCheckbox.checked[$index]\"\n             ng-change=\"multiCheckbox.change()\">\n      {{option[to.labelProp || 'name']}}\n    </label>\n  </div>\n</div>\n"

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"radio-group\">\n  <div ng-repeat=\"(key, option) in to.options\" class=\"radio\">\n    <label>\n      <input type=\"radio\"\n             id=\"{{id + '_'+ $index}}\"\n             ng-value=\"option[to.valueProp || 'value']\"\n             ng-model=\"model[options.key]\">\n      {{option[to.labelProp || 'name']}}\n    </label>\n  </div>\n</div>\n"

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<select class=\"form-control\"\n        ng-model=\"model[options.key]\"\n        ng-options=\"option[to.valueProp || 'value'] as option[to.labelProp || 'name'] group by option[to.groupProp || 'group'] for option in to.options\">\n</select>\n"

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div ng-class=\"{'input-group': to.addonLeft || to.addonRight}\">\n    <div class=\"input-group-addon\" ng-if=\"to.addonLeft\">\n        <i class=\"{{to.addonLeft.class}}\" ng-if=\"to.addonLeft.class\"></i>\n        <span ng-if=\"to.addonLeft.text\">{{to.addonLeft.text}}</span>\n    </div>\n    <formly-transclude></formly-transclude>\n    <div class=\"input-group-addon\" ng-if=\"to.addonRight\">\n        <i class=\"{{to.addonRight.class}}\" ng-if=\"to.addonRight.class\"></i>\n        <span ng-if=\"to.addonRight.text\">{{to.addonRight.text}}</span>\n    </div>\n</div>"

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3YzhmNDMyMGJjMmY4MzdkNTExZCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jb21tb24uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmdGb3JtbHlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhcGlDaGVja1wiIiwid2VicGFjazovLy8uL2FuZ3VsYXItZml4L2luZGV4LmpzIiwid2VicGFjazovLy8uL3dyYXBwZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3R5cGVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3J1bi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vdHlwZXMvY2hlY2tib3guanMiLCJ3ZWJwYWNrOi8vLy4vdHlwZXMvbXVsdGlDaGVja2JveC5qcyIsIndlYnBhY2s6Ly8vLi90eXBlcy9pbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi90eXBlcy9yYWRpby5qcyIsIndlYnBhY2s6Ly8vLi90eXBlcy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vdHlwZXMvdGV4dGFyZWEuanMiLCJ3ZWJwYWNrOi8vLy4vcnVuL2FkZG9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ydW4vZGVzY3JpcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vd3JhcHBlcnMvbGFiZWwuaHRtbCIsIndlYnBhY2s6Ly8vLi93cmFwcGVycy9oYXMtZXJyb3IuaHRtbCIsIndlYnBhY2s6Ly8vLi90eXBlcy9jaGVja2JveC5odG1sIiwid2VicGFjazovLy8uL3R5cGVzL211bHRpQ2hlY2tib3guaHRtbCIsIndlYnBhY2s6Ly8vLi90eXBlcy9yYWRpby5odG1sIiwid2VicGFjazovLy8uL3R5cGVzL3NlbGVjdC5odG1sIiwid2VicGFjazovLy8uL3J1bi9hZGRvbnMuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3RDQTs7QUFFQSx5Qzs7Ozs7O0FDRkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBLCtCOzs7Ozs7QUNoQkEsZ0Q7Ozs7OztBQ0FBLGdEOzs7Ozs7QUNBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQjs7Ozs7O0FDUkE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVDQUFzQyw0REFBNEQsR0FBRywrREFBbUU7QUFDeEs7QUFDQTtBQUNBLEc7Ozs7OztBQ1RBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDVEE7O0FBRUEsdUNBQXNDLHFEQUFxRDs7QUFFM0Y7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNqQkEsZ0Q7Ozs7OztBQ0FBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRzs7Ozs7O0FDdEJBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWCxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBLEc7Ozs7OztBQ3pDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEc7Ozs7OztBQ2JBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWCxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEc7Ozs7OztBQ3hCQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWCxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEc7Ozs7OztBQ3pCQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCLG9CQUFvQjtBQUNyQyxrQkFBaUI7QUFDakI7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWCxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEc7Ozs7OztBQzdCQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPLElBQUksd0JBQXdCO0FBQ25DO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxHOzs7Ozs7QUN6QkE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtJQUE4SSxnQkFBZ0I7QUFDOUo7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEc7Ozs7OztBQ3hCQSwyQ0FBMEMsSUFBSSxtQ0FBbUMsVUFBVSxRQUFRLHdCQUF3QixrRTs7Ozs7O0FDQTNILHlEQUF3RCx1QkFBdUIseUQ7Ozs7OztBQ0EvRSxxTEFBb0wsVUFBVSxRQUFRLHdCQUF3Qix1Qjs7Ozs7O0FDQTlOLHVMQUFzTCxrQkFBa0IseUhBQXlILGdDQUFnQyxtQzs7Ozs7O0FDQWpXLGlMQUFnTCxrQkFBa0Isc0hBQXNILGdDQUFnQyxtQzs7Ozs7O0FDQXhWLHFROzs7Ozs7QUNBQSxvQ0FBbUMsNkNBQTZDLHdGQUF3RixvQkFBb0Isa0ZBQWtGLG1CQUFtQixzSkFBc0oscUJBQXFCLG9GQUFvRixvQkFBb0IsNEIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJuZ0Zvcm1seVwiKSwgcmVxdWlyZShcImFwaUNoZWNrXCIpLCByZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJuZ0Zvcm1seVwiLCBcImFwaUNoZWNrXCIsIFwiYW5ndWxhclwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJuZ0Zvcm1seVRlbXBsYXRlc0Jvb3RzdHJhcFwiXSA9IGZhY3RvcnkocmVxdWlyZShcIm5nRm9ybWx5XCIpLCByZXF1aXJlKFwiYXBpQ2hlY2tcIiksIHJlcXVpcmUoXCJhbmd1bGFyXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJuZ0Zvcm1seVRlbXBsYXRlc0Jvb3RzdHJhcFwiXSA9IGZhY3Rvcnkocm9vdFtcIm5nRm9ybWx5XCJdLCByb290W1wiYXBpQ2hlY2tcIl0sIHJvb3RbXCJhbmd1bGFyXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA3YzhmNDMyMGJjMmY4MzdkNTExZFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2luZGV4LmNvbW1vblwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG5nTW9kdWxlTmFtZSA9IFwiZm9ybWx5Qm9vdHN0cmFwXCI7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCIuL2FuZ3VsYXItZml4XCIpO1xudmFyIG5nTW9kdWxlID0gYW5ndWxhci5tb2R1bGUobmdNb2R1bGVOYW1lLCBbcmVxdWlyZShcImFuZ3VsYXItZm9ybWx5XCIpXSk7XG5uZ01vZHVsZS5jb25zdGFudChcImZvcm1seUJvb3RzdHJhcEFwaUNoZWNrXCIsIHJlcXVpcmUoXCJhcGktY2hlY2tcIikoe1xuICBvdXRwdXQ6IHtcbiAgICBwcmVmaXg6IFwiYW5ndWxhci1mb3JtbHktYm9vdHN0cmFwXCJcbiAgfVxufSkpO1xubmdNb2R1bGUuY29uc3RhbnQoXCJmb3JtbHlCb290c3RyYXBWZXJzaW9uXCIsIFZFUlNJT04pO1xuXG5yZXF1aXJlKFwiLi93cmFwcGVyc1wiKShuZ01vZHVsZSk7XG5yZXF1aXJlKFwiLi90eXBlc1wiKShuZ01vZHVsZSk7XG5yZXF1aXJlKFwiLi9ydW5cIikobmdNb2R1bGUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlTmFtZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguY29tbW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwibmdGb3JtbHlcIlxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFwaUNoZWNrXCJcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gc29tZSB2ZXJzaW9ucyBvZiBhbmd1bGFyIGRvbid0IGV4cG9ydCB0aGUgYW5ndWxhciBtb2R1bGUgcHJvcGVybHksXG4vLyBzbyB3ZSBnZXQgaXQgZnJvbSB3aW5kb3cgaW4gdGhpcyBjYXNlLlxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbmlmICghYW5ndWxhci52ZXJzaW9uKSB7XG4gIGFuZ3VsYXIgPSB3aW5kb3cuYW5ndWxhcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYW5ndWxhci1maXgvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuY29uZmlnKGFkZFdyYXBwZXJzKTtcblxuICBmdW5jdGlvbiBhZGRXcmFwcGVycyhmb3JtbHlDb25maWdQcm92aWRlcikge1xuICAgIGZvcm1seUNvbmZpZ1Byb3ZpZGVyLnNldFdyYXBwZXIoW3sgbmFtZTogXCJib290c3RyYXBMYWJlbFwiLCB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vbGFiZWwuaHRtbFwiKSB9LCB7IG5hbWU6IFwiYm9vdHN0cmFwSGFzRXJyb3JcIiwgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL2hhcy1lcnJvci5odG1sXCIpIH1dKTtcbiAgfVxuICBhZGRXcmFwcGVycy4kaW5qZWN0ID0gW1wiZm9ybWx5Q29uZmlnUHJvdmlkZXJcIl07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93cmFwcGVycy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICByZXF1aXJlKFwiLi9jaGVja2JveFwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL211bHRpQ2hlY2tib3hcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9pbnB1dFwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL3JhZGlvXCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vc2VsZWN0XCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vdGV4dGFyZWFcIikobmdNb2R1bGUpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vdHlwZXMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZSA9IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9ialtcImRlZmF1bHRcIl0gOiBvYmo7IH07XG5cbnZhciBhZGRvbnMgPSBfaW50ZXJvcFJlcXVpcmUocmVxdWlyZShcIi4vYWRkb25zXCIpKTtcblxudmFyIGRlc2NyaXB0aW9uID0gX2ludGVyb3BSZXF1aXJlKHJlcXVpcmUoXCIuL2Rlc2NyaXB0aW9uXCIpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgYWRkb25zKG5nTW9kdWxlKTtcbiAgZGVzY3JpcHRpb24obmdNb2R1bGUpO1xufTtcblxuLy9leHBvcnQgZGVmYXVsdCBuZ01vZHVsZSA9PiB7XG4vLyAgcmVxdWlyZSgnLi9hZGRvbnMnKShuZ01vZHVsZSk7XG4vLyAgcmVxdWlyZSgnLi9kZXNjcmlwdGlvbicpKG5nTW9kdWxlKTtcbi8vfTtcbi8vXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3J1bi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5jb25maWcoYWRkQ2hlY2tib3hUeXBlKTtcblxuICBmdW5jdGlvbiBhZGRDaGVja2JveFR5cGUoZm9ybWx5Q29uZmlnUHJvdmlkZXIsIGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrKSB7XG4gICAgZm9ybWx5Q29uZmlnUHJvdmlkZXIuc2V0VHlwZSh7XG4gICAgICBuYW1lOiBcImNoZWNrYm94XCIsXG4gICAgICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vY2hlY2tib3guaHRtbFwiKSxcbiAgICAgIHdyYXBwZXI6IFtcImJvb3RzdHJhcEhhc0Vycm9yXCJdLFxuICAgICAgdmFsaWRhdGVPcHRpb25zOiBmdW5jdGlvbiB2YWxpZGF0ZU9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBmb3JtbHlCb290c3RyYXBBcGlDaGVjay53YXJuKGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrLnNoYXBlKHtcbiAgICAgICAgICB0ZW1wbGF0ZU9wdGlvbnM6IGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrLnNoYXBlKHtcbiAgICAgICAgICAgIGxhYmVsOiBmb3JtbHlCb290c3RyYXBBcGlDaGVjay5zdHJpbmdcbiAgICAgICAgICB9KVxuICAgICAgICB9KSwgYXJndW1lbnRzLCB7XG4gICAgICAgICAgcHJlZml4OiBcImNoZWNrYm94IHR5cGVcIlxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBhZGRDaGVja2JveFR5cGUuJGluamVjdCA9IFtcImZvcm1seUNvbmZpZ1Byb3ZpZGVyXCIsIFwiZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2tcIl07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90eXBlcy9jaGVja2JveC5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5jb25maWcoYWRkQ2hlY2tib3hUeXBlKTtcblxuICBmdW5jdGlvbiBhZGRDaGVja2JveFR5cGUoZm9ybWx5Q29uZmlnUHJvdmlkZXIsIGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrKSB7XG4gICAgZm9ybWx5Q29uZmlnUHJvdmlkZXIuc2V0VHlwZSh7XG4gICAgICBuYW1lOiBcIm11bHRpQ2hlY2tib3hcIixcbiAgICAgIHRlbXBsYXRlOiByZXF1aXJlKFwiLi9tdWx0aUNoZWNrYm94Lmh0bWxcIiksXG4gICAgICB3cmFwcGVyOiBbXCJib290c3RyYXBMYWJlbFwiLCBcImJvb3RzdHJhcEhhc0Vycm9yXCJdLFxuICAgICAgdmFsaWRhdGVPcHRpb25zOiBmdW5jdGlvbiB2YWxpZGF0ZU9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBmb3JtbHlCb290c3RyYXBBcGlDaGVjay53YXJuKGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrLnNoYXBlKHtcbiAgICAgICAgICB0ZW1wbGF0ZU9wdGlvbnM6IGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrLnNoYXBlKHtcbiAgICAgICAgICAgIG9wdGlvbnM6IGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrLmFycmF5T2YoZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2sub2JqZWN0KSxcbiAgICAgICAgICAgIGxhYmVsUHJvcDogZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsLFxuICAgICAgICAgICAgdmFsdWVQcm9wOiBmb3JtbHlCb290c3RyYXBBcGlDaGVjay5zdHJpbmcub3B0aW9uYWxcbiAgICAgICAgICB9KVxuICAgICAgICB9KSwgYXJndW1lbnRzLCB7XG4gICAgICAgICAgcHJlZml4OiBcIm11bHRpQ2hlY2tib3ggdHlwZVwiXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IC8qIEBuZ0luamVjdCAqL1tcIiRzY29wZVwiLCBmdW5jdGlvbiBjb250cm9sbGVyKCRzY29wZSkge1xuICAgICAgICB2YXIgdG8gPSAkc2NvcGUudG87XG4gICAgICAgIHZhciBvcHRzID0gJHNjb3BlLm9wdGlvbnM7XG4gICAgICAgICRzY29wZS5tdWx0aUNoZWNrYm94ID0ge1xuICAgICAgICAgIGNoZWNrZWQ6IFtdLFxuICAgICAgICAgIGNoYW5nZTogc2V0TW9kZWxcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBzZXRNb2RlbCgpIHtcbiAgICAgICAgICAkc2NvcGUubW9kZWxbb3B0cy5rZXldID0gW107XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5tdWx0aUNoZWNrYm94LmNoZWNrZWQsIGZ1bmN0aW9uIChjaGVja2JveCwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChjaGVja2JveCkge1xuICAgICAgICAgICAgICAkc2NvcGUubW9kZWxbb3B0cy5rZXldLnB1c2godG8ub3B0aW9uc1tpbmRleF1bdG8udmFsdWVQcm9wIHx8IFwidmFsdWVcIl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XVxuICAgIH0pO1xuICB9XG4gIGFkZENoZWNrYm94VHlwZS4kaW5qZWN0ID0gW1wiZm9ybWx5Q29uZmlnUHJvdmlkZXJcIiwgXCJmb3JtbHlCb290c3RyYXBBcGlDaGVja1wiXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3R5cGVzL211bHRpQ2hlY2tib3guanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmNvbmZpZyhhZGRJbnB1dFR5cGUpO1xuXG4gIGZ1bmN0aW9uIGFkZElucHV0VHlwZShmb3JtbHlDb25maWdQcm92aWRlcikge1xuICAgIGZvcm1seUNvbmZpZ1Byb3ZpZGVyLnNldFR5cGUoe1xuICAgICAgbmFtZTogXCJpbnB1dFwiLFxuICAgICAgdGVtcGxhdGU6IFwiPGlucHV0IGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIG5nLW1vZGVsPVxcXCJtb2RlbFtvcHRpb25zLmtleV1cXFwiPlwiLFxuICAgICAgd3JhcHBlcjogW1wiYm9vdHN0cmFwTGFiZWxcIiwgXCJib290c3RyYXBIYXNFcnJvclwiXVxuICAgIH0pO1xuICB9XG4gIGFkZElucHV0VHlwZS4kaW5qZWN0ID0gW1wiZm9ybWx5Q29uZmlnUHJvdmlkZXJcIl07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90eXBlcy9pbnB1dC5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuY29uZmlnKGFkZFJhZGlvVHlwZSk7XG5cbiAgZnVuY3Rpb24gYWRkUmFkaW9UeXBlKGZvcm1seUNvbmZpZ1Byb3ZpZGVyLCBmb3JtbHlCb290c3RyYXBBcGlDaGVjaykge1xuICAgIGZvcm1seUNvbmZpZ1Byb3ZpZGVyLnNldFR5cGUoe1xuICAgICAgbmFtZTogXCJyYWRpb1wiLFxuICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL3JhZGlvLmh0bWxcIiksXG4gICAgICB3cmFwcGVyOiBbXCJib290c3RyYXBMYWJlbFwiLCBcImJvb3RzdHJhcEhhc0Vycm9yXCJdLFxuICAgICAgdmFsaWRhdGVPcHRpb25zOiBmdW5jdGlvbiB2YWxpZGF0ZU9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBmb3JtbHlCb290c3RyYXBBcGlDaGVjay53YXJuKGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrLnNoYXBlKHtcbiAgICAgICAgICB0ZW1wbGF0ZU9wdGlvbnM6IGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrLnNoYXBlKHtcbiAgICAgICAgICAgIG9wdGlvbnM6IGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrLmFycmF5T2YoZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2sub2JqZWN0KSxcbiAgICAgICAgICAgIGxhYmVsUHJvcDogZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsLFxuICAgICAgICAgICAgdmFsdWVQcm9wOiBmb3JtbHlCb290c3RyYXBBcGlDaGVjay5zdHJpbmcub3B0aW9uYWxcbiAgICAgICAgICB9KVxuICAgICAgICB9KSwgYXJndW1lbnRzLCB7XG4gICAgICAgICAgcHJlZml4OiBcInJhZGlvIHR5cGVcIlxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBhZGRSYWRpb1R5cGUuJGluamVjdCA9IFtcImZvcm1seUNvbmZpZ1Byb3ZpZGVyXCIsIFwiZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2tcIl07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90eXBlcy9yYWRpby5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuY29uZmlnKGFkZFNlbGVjdFR5cGUpO1xuXG4gIGZ1bmN0aW9uIGFkZFNlbGVjdFR5cGUoZm9ybWx5Q29uZmlnUHJvdmlkZXIsIGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrKSB7XG4gICAgZm9ybWx5Q29uZmlnUHJvdmlkZXIuc2V0VHlwZSh7XG4gICAgICBuYW1lOiBcInNlbGVjdFwiLFxuICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL3NlbGVjdC5odG1sXCIpLFxuICAgICAgd3JhcHBlcjogW1wiYm9vdHN0cmFwTGFiZWxcIiwgXCJib290c3RyYXBIYXNFcnJvclwiXSxcbiAgICAgIHZhbGlkYXRlT3B0aW9uczogZnVuY3Rpb24gdmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2sud2Fybihmb3JtbHlCb290c3RyYXBBcGlDaGVjay5zaGFwZSh7XG4gICAgICAgICAgdGVtcGxhdGVPcHRpb25zOiBmb3JtbHlCb290c3RyYXBBcGlDaGVjay5zaGFwZSh7XG4gICAgICAgICAgICBvcHRpb25zOiBmb3JtbHlCb290c3RyYXBBcGlDaGVjay5hcnJheU9mKGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrLm9iamVjdCksXG4gICAgICAgICAgICBsYWJlbFByb3A6IGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrLnN0cmluZy5vcHRpb25hbCxcbiAgICAgICAgICAgIHZhbHVlUHJvcDogZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsLFxuICAgICAgICAgICAgZ3JvdXBQcm9wOiBmb3JtbHlCb290c3RyYXBBcGlDaGVjay5zdHJpbmcub3B0aW9uYWxcbiAgICAgICAgICB9KVxuICAgICAgICB9KSwgYXJndW1lbnRzLCB7XG4gICAgICAgICAgcHJlZml4OiBcInNlbGVjdCB0eXBlXCJcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgYWRkU2VsZWN0VHlwZS4kaW5qZWN0ID0gW1wiZm9ybWx5Q29uZmlnUHJvdmlkZXJcIiwgXCJmb3JtbHlCb290c3RyYXBBcGlDaGVja1wiXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3R5cGVzL3NlbGVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuY29uZmlnKGFkZFRleHRhcmVhVHlwZSk7XG5cbiAgZnVuY3Rpb24gYWRkVGV4dGFyZWFUeXBlKGZvcm1seUNvbmZpZ1Byb3ZpZGVyLCBmb3JtbHlCb290c3RyYXBBcGlDaGVjaykge1xuICAgIGZvcm1seUNvbmZpZ1Byb3ZpZGVyLnNldFR5cGUoe1xuICAgICAgbmFtZTogXCJ0ZXh0YXJlYVwiLFxuICAgICAgdGVtcGxhdGU6IFwiPHRleHRhcmVhIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIG5nLW1vZGVsPVxcXCJtb2RlbFtvcHRpb25zLmtleV1cXFwiPjwvdGV4dGFyZWE+XCIsXG4gICAgICB3cmFwcGVyOiBbXCJib290c3RyYXBMYWJlbFwiLCBcImJvb3RzdHJhcEhhc0Vycm9yXCJdLFxuICAgICAgZGVmYXVsdE9wdGlvbnM6IHtcbiAgICAgICAgbmdNb2RlbEF0dHJzOiB7XG4gICAgICAgICAgcm93czogeyBhdHRyaWJ1dGU6IFwicm93c1wiIH0sXG4gICAgICAgICAgY29sczogeyBhdHRyaWJ1dGU6IFwiY29sc1wiIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHZhbGlkYXRlT3B0aW9uczogZnVuY3Rpb24gdmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2sud2Fybihmb3JtbHlCb290c3RyYXBBcGlDaGVjay5zaGFwZSh7XG4gICAgICAgICAgdGVtcGxhdGVPcHRpb25zOiBmb3JtbHlCb290c3RyYXBBcGlDaGVjay5zaGFwZSh7XG4gICAgICAgICAgICByb3dzOiBmb3JtbHlCb290c3RyYXBBcGlDaGVjay5udW1iZXIub3B0aW9uYWwsXG4gICAgICAgICAgICBjb2xzOiBmb3JtbHlCb290c3RyYXBBcGlDaGVjay5udW1iZXIub3B0aW9uYWxcbiAgICAgICAgICB9KVxuICAgICAgICB9KSwgYXJndW1lbnRzLCB7XG4gICAgICAgICAgcHJlZml4OiBcInRleHRhcmVhIHR5cGVcIlxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBhZGRUZXh0YXJlYVR5cGUuJGluamVjdCA9IFtcImZvcm1seUNvbmZpZ1Byb3ZpZGVyXCIsIFwiZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2tcIl07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90eXBlcy90ZXh0YXJlYS5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUucnVuKGFkZEFkZG9uc01hbmlwdWxhdG9yKTtcblxuICBmdW5jdGlvbiBhZGRBZGRvbnNNYW5pcHVsYXRvcihmb3JtbHlDb25maWcsIGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrKSB7XG4gICAgdmFyIGFkZG9uVGVtcGxhdGUgPSByZXF1aXJlKFwiLi9hZGRvbnMuaHRtbFwiKTtcbiAgICB2YXIgYWRkb25DaGVja2VyID0gZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2suc2hhcGUoe1xuICAgICAgXCJjbGFzc1wiOiBmb3JtbHlCb290c3RyYXBBcGlDaGVjay5zdHJpbmcub3B0aW9uYWwsXG4gICAgICB0ZXh0OiBmb3JtbHlCb290c3RyYXBBcGlDaGVjay5zdHJpbmcub3B0aW9uYWxcbiAgICB9KS5zdHJpY3Qub3B0aW9uYWw7XG4gICAgZm9ybWx5Q29uZmlnLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnByZVdyYXBwZXIucHVzaChmdW5jdGlvbiAodGVtcGxhdGUsIG9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb25zLnR5cGUgIT09IFwiaW5wdXRcIiB8fCAhb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnMuYWRkb25MZWZ0ICYmICFvcHRpb25zLnRlbXBsYXRlT3B0aW9ucy5hZGRvblJpZ2h0KSB7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgIH1cbiAgICAgIGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrLndhcm4oZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2suc2hhcGUoe1xuICAgICAgICB0ZW1wbGF0ZU9wdGlvbnM6IGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrLnNoYXBlKHtcbiAgICAgICAgICBhZGRvbkxlZnQ6IGFkZG9uQ2hlY2tlcixcbiAgICAgICAgICBhZGRvblJpZ2h0OiBhZGRvbkNoZWNrZXJcbiAgICAgICAgfSlcbiAgICAgIH0pLCB7IGxlbmd0aDogMSwgMDogb3B0aW9ucyB9KTtcbiAgICAgIHJldHVybiBhZGRvblRlbXBsYXRlLnJlcGxhY2UoXCI8Zm9ybWx5LXRyYW5zY2x1ZGU+PC9mb3JtbHktdHJhbnNjbHVkZT5cIiwgdGVtcGxhdGUpO1xuICAgIH0pO1xuICB9XG4gIGFkZEFkZG9uc01hbmlwdWxhdG9yLiRpbmplY3QgPSBbXCJmb3JtbHlDb25maWdcIiwgXCJmb3JtbHlCb290c3RyYXBBcGlDaGVja1wiXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3J1bi9hZGRvbnMuanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLnJ1bihhZGREZXNjcmlwdGlvbk1hbmlwdWxhdG9yKTtcblxuICBmdW5jdGlvbiBhZGREZXNjcmlwdGlvbk1hbmlwdWxhdG9yKGZvcm1seUNvbmZpZykge1xuICAgIGZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wcmVXcmFwcGVyLnB1c2goZnVuY3Rpb24gYXJpYURlc2NyaWJlZEJ5KHRlbXBsYXRlLCBvcHRpb25zLCBzY29wZSkge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudGVtcGxhdGVPcHRpb25zLmRlc2NyaXB0aW9uKSAmJiBvcHRpb25zLnR5cGUgIT09IFwicmFkaW9cIiAmJiBvcHRpb25zLnR5cGUgIT09IFwiY2hlY2tib3hcIikge1xuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBlbC5hcHBlbmRDaGlsZChhbmd1bGFyLmVsZW1lbnQodGVtcGxhdGUpWzBdKTtcbiAgICAgICAgdmFyIG1vZGVsRWxzID0gYW5ndWxhci5lbGVtZW50KGVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbbmctbW9kZWxdXCIpKTtcbiAgICAgICAgaWYgKG1vZGVsRWxzKSB7XG4gICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoYW5ndWxhci5lbGVtZW50KFwiPHAgaWQ9XFxcIlwiICsgc2NvcGUuaWQgKyBcIl9kZXNjcmlwdGlvblxcXCJcIiArIFwiY2xhc3M9XFxcImhlbHAtYmxvY2tcXFwiXCIgKyBcIm5nLWlmPVxcXCJ0by5kZXNjcmlwdGlvblxcXCI+XCIgKyBcInt7dG8uZGVzY3JpcHRpb259fVwiICsgXCI8L3A+XCIpWzBdKTtcbiAgICAgICAgICBtb2RlbEVscy5hdHRyKFwiYXJpYS1kZXNjcmliZWRieVwiLCBzY29wZS5pZCArIFwiX2Rlc2NyaXB0aW9uXCIpO1xuICAgICAgICAgIHJldHVybiBlbC5pbm5lckhUTUw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgYWRkRGVzY3JpcHRpb25NYW5pcHVsYXRvci4kaW5qZWN0ID0gW1wiZm9ybWx5Q29uZmlnXCJdO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcnVuL2Rlc2NyaXB0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2PlxcbiAgPGxhYmVsIGZvcj1cXFwie3tpZH19XFxcIiBjbGFzcz1cXFwiY29udHJvbC1sYWJlbFxcXCI+XFxuICAgIHt7dG8ubGFiZWx9fVxcbiAgICB7e3RvLnJlcXVpcmVkID8gJyonIDogJyd9fVxcbiAgPC9sYWJlbD5cXG4gIDxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPlxcbjwvZGl2PlxcblwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3dyYXBwZXJzL2xhYmVsLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiIG5nLWNsYXNzPVxcXCJ7J2hhcy1lcnJvcic6IHNob3dFcnJvcn1cXFwiPlxcbiAgPGZvcm1seS10cmFuc2NsdWRlPjwvZm9ybWx5LXRyYW5zY2x1ZGU+XFxuPC9kaXY+XFxuXCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd3JhcHBlcnMvaGFzLWVycm9yLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImNoZWNrYm94XFxcIj5cXG5cXHQ8bGFiZWw+XFxuXFx0XFx0PGlucHV0IHR5cGU9XFxcImNoZWNrYm94XFxcIlxcbiAgICAgICAgICAgY2xhc3M9XFxcImZvcm1seS1maWVsZC1jaGVja2JveFxcXCJcXG5cXHRcXHQgICAgICAgbmctbW9kZWw9XFxcIm1vZGVsW29wdGlvbnMua2V5XVxcXCI+XFxuXFx0XFx0e3t0by5sYWJlbH19XFxuXFx0XFx0e3t0by5yZXF1aXJlZCA/ICcqJyA6ICcnfX1cXG5cXHQ8L2xhYmVsPlxcbjwvZGl2PlxcblwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3R5cGVzL2NoZWNrYm94Lmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcInJhZGlvLWdyb3VwXFxcIj5cXG4gIDxkaXYgbmctcmVwZWF0PVxcXCIoa2V5LCBvcHRpb24pIGluIHRvLm9wdGlvbnNcXFwiIGNsYXNzPVxcXCJjaGVja2JveFxcXCI+XFxuICAgIDxsYWJlbD5cXG4gICAgICA8aW5wdXQgdHlwZT1cXFwiY2hlY2tib3hcXFwiXFxuICAgICAgICAgICAgIGlkPVxcXCJ7e2lkICsgJ18nKyAkaW5kZXh9fVxcXCJcXG4gICAgICAgICAgICAgbmctbW9kZWw9XFxcIm11bHRpQ2hlY2tib3guY2hlY2tlZFskaW5kZXhdXFxcIlxcbiAgICAgICAgICAgICBuZy1jaGFuZ2U9XFxcIm11bHRpQ2hlY2tib3guY2hhbmdlKClcXFwiPlxcbiAgICAgIHt7b3B0aW9uW3RvLmxhYmVsUHJvcCB8fCAnbmFtZSddfX1cXG4gICAgPC9sYWJlbD5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3R5cGVzL211bHRpQ2hlY2tib3guaHRtbFxuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwicmFkaW8tZ3JvdXBcXFwiPlxcbiAgPGRpdiBuZy1yZXBlYXQ9XFxcIihrZXksIG9wdGlvbikgaW4gdG8ub3B0aW9uc1xcXCIgY2xhc3M9XFxcInJhZGlvXFxcIj5cXG4gICAgPGxhYmVsPlxcbiAgICAgIDxpbnB1dCB0eXBlPVxcXCJyYWRpb1xcXCJcXG4gICAgICAgICAgICAgaWQ9XFxcInt7aWQgKyAnXycrICRpbmRleH19XFxcIlxcbiAgICAgICAgICAgICBuZy12YWx1ZT1cXFwib3B0aW9uW3RvLnZhbHVlUHJvcCB8fCAndmFsdWUnXVxcXCJcXG4gICAgICAgICAgICAgbmctbW9kZWw9XFxcIm1vZGVsW29wdGlvbnMua2V5XVxcXCI+XFxuICAgICAge3tvcHRpb25bdG8ubGFiZWxQcm9wIHx8ICduYW1lJ119fVxcbiAgICA8L2xhYmVsPlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vdHlwZXMvcmFkaW8uaHRtbFxuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNlbGVjdCBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIlxcbiAgICAgICAgbmctbW9kZWw9XFxcIm1vZGVsW29wdGlvbnMua2V5XVxcXCJcXG4gICAgICAgIG5nLW9wdGlvbnM9XFxcIm9wdGlvblt0by52YWx1ZVByb3AgfHwgJ3ZhbHVlJ10gYXMgb3B0aW9uW3RvLmxhYmVsUHJvcCB8fCAnbmFtZSddIGdyb3VwIGJ5IG9wdGlvblt0by5ncm91cFByb3AgfHwgJ2dyb3VwJ10gZm9yIG9wdGlvbiBpbiB0by5vcHRpb25zXFxcIj5cXG48L3NlbGVjdD5cXG5cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90eXBlcy9zZWxlY3QuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBuZy1jbGFzcz1cXFwieydpbnB1dC1ncm91cCc6IHRvLmFkZG9uTGVmdCB8fCB0by5hZGRvblJpZ2h0fVxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImlucHV0LWdyb3VwLWFkZG9uXFxcIiBuZy1pZj1cXFwidG8uYWRkb25MZWZ0XFxcIj5cXG4gICAgICAgIDxpIGNsYXNzPVxcXCJ7e3RvLmFkZG9uTGVmdC5jbGFzc319XFxcIiBuZy1pZj1cXFwidG8uYWRkb25MZWZ0LmNsYXNzXFxcIj48L2k+XFxuICAgICAgICA8c3BhbiBuZy1pZj1cXFwidG8uYWRkb25MZWZ0LnRleHRcXFwiPnt7dG8uYWRkb25MZWZ0LnRleHR9fTwvc3Bhbj5cXG4gICAgPC9kaXY+XFxuICAgIDxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJpbnB1dC1ncm91cC1hZGRvblxcXCIgbmctaWY9XFxcInRvLmFkZG9uUmlnaHRcXFwiPlxcbiAgICAgICAgPGkgY2xhc3M9XFxcInt7dG8uYWRkb25SaWdodC5jbGFzc319XFxcIiBuZy1pZj1cXFwidG8uYWRkb25SaWdodC5jbGFzc1xcXCI+PC9pPlxcbiAgICAgICAgPHNwYW4gbmctaWY9XFxcInRvLmFkZG9uUmlnaHQudGV4dFxcXCI+e3t0by5hZGRvblJpZ2h0LnRleHR9fTwvc3Bhbj5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcnVuL2FkZG9ucy5odG1sXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImFuZ3VsYXItZm9ybWx5LXRlbXBsYXRlcy1ib290c3RyYXAuanMifQ==