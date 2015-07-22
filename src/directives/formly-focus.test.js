/* eslint max-len:[2,200] */
import _ from 'lodash';

describe('formly-form', () => {
  let $compile, scope, el, node, input, textarea, $timeout;

  const basicTemplate = '<div><input formly-focus="{{focus}}" id="main-input" refocus /><textarea id="textarea"></textarea></div>';
  beforeEach(window.module('formly'));

  beforeEach(inject((_$compile_, _$timeout_, $rootScope) => {
    $compile = _$compile_;
    $timeout = _$timeout_;
    scope = $rootScope.$new();
  }));

  it(`focus the element when focus is set to "true" and then blurred when it's set to "false"`, () => {
    compileAndDigest();
    expectFocus(false);
    scope.focus = true;
    scope.$digest();
    $timeout.flush();
    expectFocus(true);

    scope.focus = false;
    scope.$digest();
    expectFocus(false);
  });

  it(`should not bother unfocusing the element if it doesn't have focus to begin with`, () => {
    compileAndDigest();
    expectFocus(false);
    scope.focus = false;
    scope.$digest();
    expectFocus(false);
  });

  it(`should refocus the previously focused element`, () => {
    compileAndDigest();
    textarea.focus();
    scope.focus = true;
    scope.$digest();
    $timeout.flush();
    expectFocus(true);

    scope.focus = false;
    scope.$digest();
    expectFocus(false);
    expectFocus(true, textarea);
  });

  it(`should not refocus the previously focused element when the refocus attribute doesn't exist`, () => {
    compileAndDigest(
      '<div><input formly-focus="{{focus}}" id="main-input" /><textarea id="textarea"></textarea></div>'
    );
    textarea.focus();
    scope.focus = true;
    scope.$digest();
    $timeout.flush();
    expectFocus(true);

    scope.focus = false;
    scope.$digest();
    expectFocus(false);
    expectFocus(false, textarea);
  });

  it(`should not refocus if the previously active element has not been set`, () => {
    compileAndDigest(undefined, {focus: false});
    expectFocus(false);
  });

  afterEach(() => {
    if (document.body.contains(node)) {
      node.parentNode.removeChild(node);
    }
  });

  function expectFocus(focus, focusedNode = input) {
    const isFocused = document.activeElement === focusedNode;
    if (focus) {
      expect(isFocused, 'expected focused element to be: ' + focusedNode + ' but it was ' + document.activeElement).to.be.true;
    } else {
      expect(isFocused, 'expected focused element to not be: ' + focusedNode + ' but it was ' + document.activeElement).to.be.false;
    }
  }


  function compileAndDigest(template = basicTemplate, scopeOverrides = {}) {
    _.assign(scope, scopeOverrides);
    el = $compile(template)(scope);
    scope.$digest();
    node = el[0];
    document.body.appendChild(node);
    input = document.getElementById('main-input');
    textarea = document.getElementById('textarea');
    return el;
  }

});
