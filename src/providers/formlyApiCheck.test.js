/* jshint maxlen:false */
module.exports = ngModule => {
  describe('formlyApiCheck', () => {
    beforeEach(window.module(ngModule.name));

    describe('formlyFIeldOptions', () => {
      let formlyFIeldOptions;
      beforeEach(inject((formlyApiCheck) => {
        formlyFIeldOptions = formlyApiCheck.formlyFieldOptions;
      }));

      it(`should pass when validation.messages is an object of functions`, () => {
        const options = {
          key: '♪┏(・o･)┛♪┗ ( ･o･) ┓♪',
          validation: {
            messages: {
              thing1() {
              }
            }
          }
        };
        const result = formlyFIeldOptions(options);
        expect(result).to.be.undefined;
      });
    });
  });
};
