import _ from 'lodash';

describe('formly-assign-ng-model-ctrl', () => {
  beforeEach(window.module('formly'));

  let $compile, scope;
  const basicTemplate = `<form name="myForm"><input ng-model="foo" name="field" formly-assign-ng-model-ctrl /></form>`;

  beforeEach(inject((_$compile_, $rootScope) => {
    $compile = _$compile_;
    scope = $rootScope.$new();
    scope.options = {};
  }));

  it(`should attach the form controller to fc and options.formControl`, () => {
    compileAndDigest();
    expect(scope.fc).to.equal(scope.myForm.field);
    expect(scope.fc).to.equal(scope.options.formControl);
  });

  it(`should attach the ngModelCtrl as an array if there are mutiple ngModels`, () => {
    compileAndDigest(`
      <form name="myForm">
        <input ng-model="foo" name="field1" formly-assign-ng-model-ctrl />
        <input ng-model="bar" name="field2" formly-assign-ng-model-ctrl />
      </form>
    `);
    expect(scope.fc).to.have.length(2);
    expect(scope.fc).to.equal(scope.options.formControl);
    expect(scope.fc[0]).to.equal(scope.myForm.field1);
    expect(scope.fc[1]).to.equal(scope.myForm.field2);
  });

  function compileAndDigest(template = basicTemplate, extraProps = {}) {
    _.assign(scope, extraProps);
    $compile(template)(scope);
    scope.$digest();
  }
});
