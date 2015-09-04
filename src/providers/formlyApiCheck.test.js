/* jshint maxlen:false */

describe('formlyApiCheck', () => {
  beforeEach(window.module('formly'));

  let formlyApiCheck;

  beforeEach(inject((_formlyApiCheck_) => {
    formlyApiCheck = _formlyApiCheck_;
  }));

  describe('formlyFieldOptions', () => {
    it(`should pass when validation.messages is an object of functions or strings`, () => {
      expectPass({
        key: '♪┏(・o･)┛♪┗ ( ･o･) ┓♪',
        template: 'hi',
        validation: {
          messages: {
            thing1() {
            },
            thing2: '"Formly Expression"'
          }
        }
      }, 'formlyFieldOptions');
    });

    it(`should allow $$hashKey`, () => {
      expectPass({
        $$hashKey: 'object:1',
        template: 'hello',
        key: 'whatevs'
      }, 'formlyFieldOptions');
    });

    describe('ngModelAttrs', () => {
      it(`should allow property of 'boolean'`, () => {
        expectPass({
          template: 'hello',
          key: 'whatevs',
          templateOptions: {
            foo: 'bar'
          },
          ngModelAttrs: {
            foo: {
              boolean: 'foo-bar'
            }
          }
        }, 'formlyFieldOptions');
      });
    });
  });

  describe(`fieldGroup`, () => {
    it(`should pass when specifying data`, () => {
      expectPass({
        fieldGroup: [],
        data: {foo: 'bar'}
      }, 'fieldGroup');
    });
  });

  describe(`extras`, () => {
    describe(`skipNgModelAttrsManipulator`, () => {
      it(`should pass with a boolean`, () => {
        expectPass({
          template: 'foo',
          extras: {skipNgModelAttrsManipulator: true}
        }, 'formlyFieldOptions');
      });

      it(`should pass with a string`, () => {
        expectPass({
          template: 'foo',
          extras: {skipNgModelAttrsManipulator: '.selector'}
        }, 'formlyFieldOptions');
      });

      it(`should pass with nothing`, () => {
        expectPass({
          template: 'foo',
          extras: {skipNgModelAttrsManipulator: '.selector'}
        }, 'formlyFieldOptions');
      });

      it(`should fail with anything else`, () => {
        expectFail({
          template: 'foo',
          extras: {skipNgModelAttrsManipulator: 32}
        }, 'formlyFieldOptions');
      });
    });
  });

  function expectPass(options, checker) {
    const result = formlyApiCheck[checker](options);
    expect(result).to.be.undefined;
  }

  function expectFail(options, checker) {
    const result = formlyApiCheck[checker](options);
    expect(result).to.be.an.instanceOf(Error);
  }

});
