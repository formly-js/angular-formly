/* jshint maxlen:false */
module.exports = ngModule => {
  describe('formlyApiCheck', () => {
    beforeEach(window.module(ngModule.name));

    describe('formlyFieldOptions', () => {
      let formlyFieldOptions;
      beforeEach(inject((formlyApiCheck) => {
        formlyFieldOptions = formlyApiCheck.formlyFieldOptions;
      }));

      it(`should pass when validation.messages is an object of functions or strings`, () => {
        const options = {
          key: '♪┏(・o･)┛♪┗ ( ･o･) ┓♪',
          validation: {
            messages: {
              thing1() {
              },
              thing2: '"Formly Expression"'
            }
          }
        };
        const result = formlyFieldOptions(options);
        expect(result).to.be.undefined;
      });
    });
  });
};
