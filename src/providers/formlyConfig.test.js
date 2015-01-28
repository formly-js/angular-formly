module.exports = ngModule => {
  describe('formlyConfig', function () {
    beforeEach(window.module(ngModule.name));

    describe('setTemplate', function() {
      var setTemplate;
      beforeEach(inject(function(formlyConfig) {
        setTemplate = formlyConfig.setTemplate;
      }));

      describe('＼(＾O＾)／ path', function() {
        it('should accept a string', function() {
          setTemplate('d-_-b');
        });
      });

      describe('(◞‸◟；) path', function() {
        it('should throw an error when you give it nothing', function() {
          function errorWrapper() {
            setTemplate();
          }

          expect(errorWrapper).to.throw(/must.*provide.*name/);
        });
      });


    });
  });
};
