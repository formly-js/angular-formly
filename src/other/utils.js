import angular from 'angular-fix'

export default {
  containsSelector, containsSpecialChar, formlyEval, getFieldId, reverseDeepMerge, findByNodeName,
  arrayify, extendFunction, extendArray, startsWith, contains,
}

function containsSelector(string) {
  return containsSpecialChar(string, '.') || (containsSpecialChar(string, '[') && containsSpecialChar(string, ']'))
}

function containsSpecialChar(a, b) {
  if (!a || !a.indexOf) {
    return false
  }
  return a.indexOf(b) !== -1
}


function formlyEval(scope, expression, $modelValue, $viewValue, extraLocals) {
  if (angular.isFunction(expression)) {
    return expression($viewValue, $modelValue, scope, extraLocals)
  } else {
    return scope.$eval(expression, angular.extend({$viewValue, $modelValue}, extraLocals))
  }
}

function getFieldId(formId, options, index) {
  if (options.id) {
    return options.id
  }
  let type = options.type
  if (!type && options.template) {
    type = 'template'
  } else if (!type && options.templateUrl) {
    type = 'templateUrl'
  }

  return [formId, type, options.key, index].join('_')
}


function reverseDeepMerge(dest) {
  angular.forEach(arguments, (src, index) => {
    if (!index) {
      return
    }
    angular.forEach(src, (val, prop) => {
      if (!angular.isDefined(dest[prop])) {
        dest[prop] = angular.copy(val)
      } else if (objAndSameType(dest[prop], val)) {
        reverseDeepMerge(dest[prop], val)
      }
    })
  })
  return dest
}

function objAndSameType(obj1, obj2) {
  return angular.isObject(obj1) && angular.isObject(obj2) &&
    Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2)
}

// recurse down a node tree to find a node with matching nodeName, for custom tags jQuery.find doesn't work in IE8
function findByNodeName(el, nodeName) {
  if (!el.prop) { // not a jQuery or jqLite object -> wrap it
    el = angular.element(el)
  }

  if (el.prop('nodeName') === nodeName.toUpperCase()) {
    return el
  }

  const c = el.children()
  for (let i = 0; c && i < c.length; i++) {
    const node = findByNodeName(c[i], nodeName)
    if (node) {
      return node
    }
  }
}


function arrayify(obj) {
  if (obj && !angular.isArray(obj)) {
    obj = [obj]
  } else if (!obj) {
    obj = []
  }
  return obj
}


function extendFunction(...fns) {
  return function extendedFunction() {
    const args = arguments
    fns.forEach(fn => fn.apply(null, args))
  }
}

function extendArray(primary, secondary, property) {
  if (property) {
    primary = primary[property]
    secondary = secondary[property]
  }
  if (secondary && primary) {
    angular.forEach(secondary, function(item) {
      if (primary.indexOf(item) === -1) {
        primary.push(item)
      }
    })
    return primary
  } else if (secondary) {
    return secondary
  } else {
    return primary
  }
}

function startsWith(str, search) {
  if (angular.isString(str) && angular.isString(search)) {
    return str.length >= search.length && str.substring(0, search.length) === search
  } else {
    return false
  }
}

function contains(str, search) {
  if (angular.isString(str) && angular.isString(search)) {
    return str.length >= search.length && str.indexOf(search) !== -1
  } else {
    return false
  }
}
