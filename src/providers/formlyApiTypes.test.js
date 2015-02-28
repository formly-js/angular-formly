/* jshint maxlen:false */
module.exports = ngModule => {
  describe('formlyApiTypes', () => {
    beforeEach(window.module(ngModule.name));

    describe('fieldOptionsApi', () => {
      let fieldOptionsApi;
      beforeEach(inject((formlyApiTypes) => {
        fieldOptionsApi = formlyApiTypes.fieldOptionsApi;
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
        const result = fieldOptionsApi(options);
        expect(result).to.be.undefined;
      });
    });
  });
};
