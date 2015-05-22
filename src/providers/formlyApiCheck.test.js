/* jshint maxlen:false */
import {expect} from 'chai';

describe('formlyApiCheck', () => {
  beforeEach(window.module('formly'));

  describe('formlyFieldOptions', () => {
    let formlyFieldOptions;
    beforeEach(inject((formlyApiCheck) => {
      formlyFieldOptions = formlyApiCheck.formlyFieldOptions;
    }));

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
      });
    });

    it(`should allow $$hashKey`, () => {
      expectPass({
        $$hashKey: 'object:1',
        template: 'hello',
        key: 'whatevs'
      });
    });

    function expectPass(options) {
      const result = formlyFieldOptions(options);
      expect(result).to.be.undefined;
    }
  });

});
