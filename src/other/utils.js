const angular = require('angular-fix');

export default {formlyEval, getFieldId, reverseDeepMerge, findByNodeName};

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
    type = 'template';
  } else if (!type && options.templateUrl) {
    type = 'templateUrl';
  }

  return [formId, type, options.key, index].join('_');
}


function reverseDeepMerge(dest) {
  angular.forEach(arguments, (src, index) => {
    if (!index) {
      return;
    }
    angular.forEach(src, (val, prop) => {
      if (!angular.isDefined(dest[prop])) {
        dest[prop] = angular.copy(val);
      } else if (objAndSameType(dest[prop], val)) {
        reverseDeepMerge(dest[prop], val);
      }
    });
  });
}

function objAndSameType(obj1, obj2) {
  return angular.isObject(obj1) && angular.isObject(obj2) &&
    Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2);
}

//recurse down a node tree to find a node with matching nodeName, for custom tags jQuery.find doesn't work in IE8
function findByNodeName(el, nodeName) {
  if (!el.prop) { // not a jQuery or jqLite object -> wrap it
    el = angular.element(el);
  }

  if (el.prop('nodeName') === nodeName.toUpperCase()) {
    return el;
  }

  var c = el.children();
  for(var i = 0; c && i < c.length; i++) {
    var node = findByNodeName(c[i], nodeName);
    if (node) {
      return node;
    }
  }
}
