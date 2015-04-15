import {expect} from 'chai';

describe('formly-form', () => {
  const input = '<input ng-model="model[options.key]" />';
  let $compile, scope;

  beforeEach(window.module('formly'));
  beforeEach(inject((_$compile_, $rootScope) => {
    $compile = _$compile_;
    scope = $rootScope.$new();
  }));

  it('should use ng-form as the default root tag', () => {
    const el = compileAndDigest(`
      <formly-form model="model" fields="fields" form="theForm"></formly-form>
    `);
    expect(el.length).to.equal(1);
    expect(el.prop('nodeName').toLowerCase()).to.equal('ng-form');
  });

  it('should use a different root tag when specified', () => {
    const el = compileAndDigest(`
      <formly-form model="model" fields="fields" form="theForm" root-el="form"></formly-form>
    `);
    expect(el.length).to.equal(1);
    expect(el.prop('nodeName').toLowerCase()).to.equal('form');
  });

  it(`should not allow sibling forms to override each other on a parent form`, () => {
    compileAndDigest(`
      <form name="parent">
        <formly-form form="form1" model="model" fields="fields"></formly-form>
        <formly-form form="form2" model="model" fields="fields"></formly-form>
      </form>
    `);
    expect(scope.parent).to.have.property('formly_1');
    expect(scope.parent).to.have.property('formly_2');
  });

  it(`should place the form control on the scope property defined by the form attribute`, () => {
    compileAndDigest(`
      <formly-form form="vm.myForm" model="model" fields="fields"></formly-form>
    `);
    expect(scope.vm).to.have.property('myForm');
    expect(scope.vm.myForm).to.have.property('$name');
  });


  it(`should not require a form attribute`, () => {
    expect(() => {
      compileAndDigest(`
        <formly-form model="model" fields="fields"></formly-form>
      `);
    }).to.not.throw();
  });

  it(`should require the model attribute`, () => {
    expect(() => {
      compileAndDigest(`
        <formly-form fields="fields"></formly-form>
      `);
    }).to.throw();
  });

  it(`should require the fields attribute`, () => {
    expect(() => {
      compileAndDigest(`
        <formly-form model="model"></formly-form>
      `);
    }).to.throw();
  });

  it(`should initialize the model and the fields if not provided`, () => {
    compileAndDigest(`
      <formly-form model="model" fields="fields"></formly-form>
    `);
    expect(scope.model).to.exist;
    expect(scope.fields).to.exist;
  });

  it(`should initialize the model and fields if they are null`, () => {
    scope.model = null;
    scope.fields = null;
    compileAndDigest(`
      <formly-form model="model" fields="fields"></formly-form>
    `);
    expect(scope.model).to.exist;
    expect(scope.fields).to.exist;
  });

  describe(`options`, () => {
    const template = '<formly-form options="options" model="model" fields="fields"></formly-form>';
    beforeEach(() => {
      scope.model = {
        foo: 'myFoo',
        bar: 123,
        foobar: 'ab@cd.com'
      };

      scope.fields = [
        {template: input, key: 'foo'},
        {template: input, key: 'bar', templateOptions: {type: 'numaber'}},
        {template: input, key: 'foobar', templateOptions: {type: 'email'}}
      ];
      scope.options = {};
    });

    it(`should throw an error with extra options`, () => {
      expect(() => {
        scope.options = {extra: true};
        compileAndDigest(`
          <formly-form model="model" fields="fields" options="options"></formly-form>
        `);
      }).to.throw();
    });

    describe(`resetModel`, () => {
      it(`should reset the model that's given`, () => {
        compileAndDigest(template);
        expect(typeof scope.options.resetModel).to.eq('function');
        const previousFoo = scope.model.foo;
        scope.model.foo = 'newFoo';
        scope.options.resetModel();
        expect(scope.model.foo).to.eq(previousFoo);
      });

      it(`should reset the $viewValue of fields`, () => {
        compileAndDigest(template);
        const previousFoobar = scope.model.foobar;
        scope.fields[2].formControl.$setViewValue('not-an-email');
        scope.options.resetModel();
        expect(scope.fields[2].formControl.$viewValue).to.equal(previousFoobar);
      });

      it(`should reset the $viewValue and $modelValue to undefined if the value was not originally defined`, () => {
        scope.fields.push({
          template: input, key: 'baz', templateOptions: {required: true}
        });
        compileAndDigest(template);
        const fc = scope.fields[scope.fields.length - 1].formControl;
        scope.model.baz = 'hello world';
        scope.$digest();
        expect(fc.$viewValue).to.eq('hello world');
        expect(fc.$modelValue).to.eq('hello world');
        scope.options.resetModel();
        expect(scope.model.baz).to.be.undefined;
        expect(fc.$viewValue).to.be.undefined;
        expect(fc.$modelValue).to.be.undefined;
      });

      it(`should rerender the ng-model element`, () => {
        const el = compileAndDigest(template);
        const ngModelNode = el[0].querySelector('[ng-model]');
        scope.model.foo = 'hey there!';
        scope.$digest();
        scope.options.resetModel();
        expect(ngModelNode.value).to.eq('myFoo');
      });

      it(`should reset models of fields`, () => {
        scope.fieldModel = {baz: false};
        scope.fields.push({
          template: input, key: 'baz', model: scope.fieldModel
        });

        compileAndDigest(template);

        scope.fieldModel.baz = true;
        scope.options.resetModel();
        expect(scope.fieldModel.baz).to.be.false;
      });
    });

    describe(`updateInitialValue`, () => {

      it(`should update the initial value of the fields`, () => {
        compileAndDigest(template);
        const field = scope.fields[0];
        expect(field.initialValue).to.equal('myFoo');
        scope.model.foo = 'otherValue';
        scope.options.updateInitialValue();
        expect(field.initialValue).to.equal('otherValue');
      });

      it(`should reset to the updated initial value`, () => {
        compileAndDigest(template);
        const field = scope.fields[0];
        scope.model.foo = 'otherValue';
        scope.options.updateInitialValue();
        scope.model.foo = 'otherValueAgain';
        scope.options.resetModel();
        expect(field.initialValue).to.equal('otherValue');
        expect(scope.model.foo).to.equal('otherValue');
      });
    });

    describe(`removeChromeAutoComplete`, () => {
      it(`should not have a hidden input when nothing is specified`, () => {
        const el = compileAndDigest(template);
        const autoCompleteFixEl = el[0].querySelector('[autocomplete="address-level4"]');
        expect(autoCompleteFixEl).to.be.null;
      });

      it(`should add a hidden input when specified as true`, () => {
        scope.options.removeChromeAutoComplete = true;
        const el = compileAndDigest(template);
        const autoCompleteFixEl = el[0].querySelector('[autocomplete="address-level4"]');
        expect(autoCompleteFixEl).to.exist;
      });

      it(`should override the 'true' global configuration`, inject((formlyConfig) => {
        formlyConfig.extras.removeChromeAutoComplete = true;
        scope.options.removeChromeAutoComplete = false;
        const el = compileAndDigest(template);
        const autoCompleteFixEl = el[0].querySelector('[autocomplete="address-level4"]');
        expect(autoCompleteFixEl).to.be.null;
      }));

      it(`should be added regardless of the option if the global config is set`, inject((formlyConfig) => {
        formlyConfig.extras.removeChromeAutoComplete = true;
        const el = compileAndDigest(template);
        const autoCompleteFixEl = el[0].querySelector('[autocomplete="address-level4"]');
        expect(autoCompleteFixEl).to.exist;
      }));
    });
  });

  function compileAndDigest(template) {
    const el = $compile(template)(scope);
    scope.$digest();
    return el;
  }

});
