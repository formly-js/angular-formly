/* jshint maxlen:false */
module.exports = ngModule => {
  describe('formlyNgModelAttrsManipulator', () => {
    beforeEach(window.module(ngModule.name));

    let formlyConfig, manipulator, scope, field, result, resultEl, resultNode;
    const template = '<input ng-model="model[options.key]" />';

    beforeEach(inject((_formlyConfig_, $rootScope) => {
      formlyConfig = _formlyConfig_;
      manipulator = formlyConfig.templateManipulators.preWrapper[0];
      scope = $rootScope.$new();
      scope.id = 'id';
      field = {
        data: {},
        validation: {},
        templateOptions: {}
      };
    }));

    it(`should allow you to skip the manipulator`, () => {
      field.data.skipNgModelAttrsManipulator = true;
      manipulate();
      expect(result).to.equal(template);
    });

    it(`should have a limited number of automatically added attributes without any specific options`, () => {
      manipulate();
      expect(result).to.equal('<input ng-model="model[options.key]" id="id" name="id">');
    });

    it(`should automatically add an id and name`, () => {
      manipulate();
      expect(resultEl.attr('name')).to.eq('id');
      expect(resultEl.attr('id')).to.eq('id');
    });

    describe(`ng-model-options`, () => {
      it(`should be added if modelOptions is specified`, () => {
        field.modelOptions = {};
        manipulate();
        expect(resultEl.attr('ng-model-options')).to.exist;
      });

      it(`should change the value of ng-model if getterSetter is specified`, () => {
        field.modelOptions = {getterSetter: true};
        manipulate();
        expect(resultEl.attr('ng-model')).to.equal('options.value');
      });
    });


    describe(`formly-custom-validation`, () => {
      it(`shouldn't be added if there aren't validators or messages`, () => {
        formlyCustomValidationPresence(false);
      });

      it(`should be added if there are validators`, () => {
        field.validators = {foo: 'bar'};
        formlyCustomValidationPresence(true);
      });

      it(`should be added if there are messages`, () => {
        field.validators = {foo: 'bar'};
        field.validation.messages = {foo: '"bar"'};
        formlyCustomValidationPresence(true);
      });

      it(`should be added if there are validators and messages`, () => {
        field.validators = {foo: 'bar'};
        field.validation.messages = {foo: '"bar"'};
        formlyCustomValidationPresence(true);
      });

      function formlyCustomValidationPresence(present) {
        manipulate();
        if (present) {
          expect(resultNode.getAttribute('formly-custom-validation')).to.exist;
        } else {
          expect(resultNode.getAttribute('formly-custom-validation')).to.not.exist;
        }
      }
    });

    describe(`templateOptions attributes`, () => {
      describe(`boolean attributes`, () => {

        testAttribute('required');
        testAttribute('disabled');

        function testAttribute(name) {
          it(`should allow you to specify 'true' for ${name}`, () => {
            field.templateOptions = {
              [name]: true
            };
            manipulate();
            expect(resultEl.attr(name)).to.exist;
          });

          it(`should allow you to specify 'false' for ${name}`, () => {
            field.templateOptions = {
              [name]: false
            };
            manipulate();
            expect(resultEl.attr(name)).to.not.exist;
            expect(resultEl.attr(`ng-${name}`)).to.not.exist;
          });
        }
      });

      describe(`attributeOnly`, () => {

        ['placeholder', 'min', 'max', 'tabindex', 'type'].forEach(testAttribute);

        function testAttribute(name) {
          it(`should be placed as an attribute if it is present in the templateOptions`, () => {
            field.templateOptions = {
              [name]: 'Ammon'
            };
            manipulate();
            expect(resultEl.attr(name)).to.eq('Ammon');
          });

          it(`should be placed as an attribute with {{expression}} if it is present in the expressionProperties`, () => {
            field.expressionProperties = {
              ['templateOptions.' + name]: 'Ammon'
            };
            manipulate();
            expect(resultEl.attr(name)).to.eq(`{{options.templateOptions['${name}']}}`);
          });
        }
      });

      describe(`preferUnbound`, () => {
        it(`should prefer to specify maxlength as ng-maxlegnth even when it's not in expressionProperties`, () => {
          field.templateOptions = {
            maxlength: 3
          };
          manipulate();
          expect(resultEl.attr('ng-maxlength')).to.eq(`options.templateOptions['maxlength']`);
          expect(resultEl.attr('maxlength')).to.not.exist;
        });

        it(`should allow you to specify maxlength that gets set to maxlength if it's not in expressionProperties`, () => {
          formlyConfig.extras.ngModelAttrsManipulatorPreferUnbound = true;
          field.templateOptions = {
            maxlength: 3
          };
          manipulate();
          expect(resultEl.attr('ng-maxlength')).to.not.exist;
          expect(resultEl.attr('maxlength')).to.eq('3');
          formlyConfig.extras.ngModelAttrsManipulatorPreferUnbound = false;
        });

        it(`should still allow maxlength work with expressionProperties`, () => {
          field.expressionProperties = {
            'templateOptions.maxlength': '3'
          };
          manipulate();
          expect(resultEl.attr('ng-maxlength')).to.eq(`options.templateOptions['maxlength']`);
          expect(resultEl.attr('maxlength')).to.not.exist;
        });

      });
    });


    function manipulate() {
      result = manipulator(template, field, scope);
      resultEl = angular.element(result);
      resultNode = resultEl[0];
    }
  });
};
