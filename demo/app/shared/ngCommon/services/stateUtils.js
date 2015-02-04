let _ = require('lodash');
let utils = require('./utils');
let internal = {};
let stateResponders = {};

let stateUtils = module.exports = {
  resolveParameter: resolveParameter,
  resolveIdentity: resolveIdentity,
  getStates: getStates,
  eventNavigate: eventNavigate,
  eventHref: eventHref,
  includesEvent: includesEvent,
  includes: includes
};


function stateUtilsProvider() {
  /* jshint validthis:true */
  _.extend(this, stateUtils, {
    $get: function stateUtilsGet($injector) {
      _.extend(internal, {$injector});
      return this;
    }
  });
}

module.exports.createProvider = ngModule => {
  ngModule.provider('stateUtils', stateUtilsProvider)
    .constant('EMPTY_OBJECT', {}).run(function(stateUtils) {
    });
};

function resolveParameter(param) {
  return /*@ngInject*/ function($stateParams) {
    return $stateParams[param];
  };
}

function resolveIdentity(val) {
  return function identity() {
    return val;
  };
}


function getStates(rootStates) {
  // setup states
  let states = [];
  _.each(rootStates, function(state) {
    state.data = state.data || {};
    setupModuleStates(state);
  });

  return states;

  function setupModuleStates(originalState) {
    /* jshint maxcomplexity:7 */
    var state = _.cloneDeep(originalState);

    // if the state is null, then explicitly set to null, otherwise add a '/' and the url
    state.url = getStateUrl(state);

    state.module = state.name;
    state.name = getStateName(state);
    _.each(utils.arrayify(state.data.activationEvents), event => {
      if (stateResponders[event]) {
        throw new Error(
          `Only one state can respond to an azStateGo event: ${event}, ${stateResponders[event].url}, ${state.url}`
        );
      }
      stateResponders[event] = state;
    });

    state.data.children = _.map(state.children, function(child) {
      child.data = child.data || {};
      child.data.parent = state;
      return setupModuleStates(child);
    });

    if (state.abstract && state.data && state.data.nav && state.data.nav.groupRoot && !_.isEmpty(state.children)) {
      state.data.nav.defaultState = getDefaultState(state.data.children[0]).name;
    }
    states.push(state);
    return state;
  }

  function getStateUrl(state) {
    if (_.isNull(state.url)) {
      return null;
    }
    if (state.data.parent && _.endsWith(state.data.parent.url, '/')) {
      return state.url;
    } else {
      return '/' + (state.url || '');
    }
  }

  function getStateName(state) {
    var names = [];
    var parent = state;
    while(parent) {
      names.unshift(parent.module);
      parent = parent.data.parent;
    }
    return names.join('.');
  }

  function getDefaultState(defaultState) {
    if (!defaultState) {
      throw new Error('Cannot set a default state!');
    }
    if (defaultState.abstract && defaultState.data && !_.isEmpty(defaultState.data.children)) {
      return getDefaultState(defaultState.data.children[0]);
    } else {
      return defaultState;
    }
  }
}

function eventNavigate(event, params, options) {
  let state = getStateForEvent(event);
  let $state = internal.$injector.get('$state');
  return $state.go(state.name, params, options);
}

function eventHref(event, params, options) {
  let state = getStateForEvent(event);
  let $state = internal.$injector.get('$state');
  return $state.href(state.name, params, options);
}

function includesEvent(event, params, options) {
  var href = eventHref(...arguments);
  return includes(href.substr(1)); // get the # off the url
}

function includes(urlPartial) {
  let $location = internal.$injector.get('$location');
  let path = $location.path();
  if (_.isRegExp(urlPartial)) {
    return urlPartial.test(path);
  } else {
    return _.contains(path, urlPartial);
  }
}

function getStateForEvent(event) {
  let state = stateResponders[event];
  if (!state || !state.name) {
    throw new Error(`trying to get a state for event that doesn't have a responder! ${event}`);
  }
  return getFirstActivateableState(state);
}

function getFirstActivateableState(state) {
  let activateableState = state;
  while (activateableState && activateableState.abstract) {
    activateableState = state.data.children && state.data.children[0];
  }
  if (activateableState.abstract) {
    throw new Error(`state has no activateable state! ${state}, ${activateableState}`);
  }
  return activateableState;
}
