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
  });

  describe(`fieldGroup`, () => {
    it(`should pass when specifying data`, () => {
      expectPass({
        fieldGroup: [],
        data: {foo: 'bar'}
      }, 'fieldGroup');
    });
  });

  function expectPass(options, checker) {
    const result = formlyApiCheck[checker](options);
    expect(result).to.be.undefined;
  }

});
