let $injector = angular.element(document.body).injector();
window.$injector = $injector;

addInjectable('$state');
addInjectable('stateUtils');
addInjectable('utils');

function addInjectable(name) {
  window[name] = $injector.get(name);
}
