module.exports = ngModule => {
  describe('formlyUtil', () => {
    beforeEach(window.module(ngModule.name));

    describe('reverseDeepMerge', () => {
      let merge;
      beforeEach(inject(function(formlyUtil) {
        merge = formlyUtil.reverseDeepMerge;
      }));

      it(`should modify and prefer the first object`, () => {
        let firstObj = {
          obj1a: {
            obj2a: {
              string3a: 'Hello world',
              number3a: 4,
              bool3a: false
            }
          },
          arry1a: [
            1, 2, 3, 4
          ]
        };
        let secondObj = {
          obj1a: {
            obj2a: {
              string3a: 'Should not win',
              string3b: 'Should exist',
              number3a: 5,
              bool3a: true,
              bool3b: false
            }
          }
        };

        let thirdObj = {
          obj1a: 'false',
          arry1a: [
            4, 3, 2, 1, 0
          ]
        };

        let result = {
          obj1a: {
            obj2a: {
              string3a: 'Hello world',
              string3b: 'Should exist',
              number3a: 4,
              bool3a: false,
              bool3b: false
            }
          },
          arry1a: [
            1, 2, 3, 4, 0
          ]
        };

        merge(firstObj, secondObj, thirdObj);
        expect(firstObj).to.eql(result);
      });

      it(`should allow for adding of empty objects`, () => {
        let firstObj = {
          a: 'a',
          b: 'b'
        };

        let secondObj = {
          data: {},
          templateOptions: {},
          validation: {}
        };

        let result = {
          a: 'a',
          b: 'b',
          data: {},
          templateOptions: {},
          validation: {}
        };

        merge(firstObj, secondObj);
        expect(firstObj).to.eql(result);
      });
    });
  });
};
