/* jshint maxlen:false */
import {expect} from 'chai';

describe('formlyNgModelAttrsManipulator', () => {
  beforeEach(window.module('formly'));

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
    // because different browsers place attributes in different places...
    const spaces = '<input ng-model="model[options.key]" id="id" name="id">'.split(' ').length;
    expect(result.split(' ').length).to.equal(spaces);
    attrExists('ng-model');
    attrExists('id');
    attrExists('name');
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
      attrExists('ng-model-options');
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
      attrExists('formly-custom-validation', !present);
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
          attrExists(name);
        });

        it(`should allow you to specify 'false' for ${name}`, () => {
          field.templateOptions = {
            [name]: false
          };
          manipulate();
          attrExists(name, false);
          attrExists(`ng-${name}`, false);
        });

        it(`should allow you to specify expressionProperties for ${name}`, () => {
          field.expressionProperties = {
            [`templateOptions.${name}`]: 'someExpression'
          };
          manipulate();
          attrExists(name, false);
          attrExists(`ng-${name}`);
          expect(resultEl.attr(`ng-${name}`)).to.eq(`options.templateOptions['${name}']`);
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
        attrExists('maxlength', false);
      });

      it(`should allow you to specify maxlength that gets set to maxlength if it's not in expressionProperties`, () => {
        formlyConfig.extras.ngModelAttrsManipulatorPreferUnbound = true;
        field.templateOptions = {
          maxlength: 3
        };
        manipulate();
        attrExists('ng-maxlength', false);
        expect(resultEl.attr('maxlength')).to.eq('3');
        formlyConfig.extras.ngModelAttrsManipulatorPreferUnbound = false;
      });

      it(`should still allow maxlength work with expressionProperties`, () => {
        field.expressionProperties = {
          'templateOptions.maxlength': '3'
        };
        manipulate();
        expect(resultEl.attr('ng-maxlength')).to.eq(`options.templateOptions['maxlength']`);
        attrExists('maxlength', false);
      });

    });
  });


  function manipulate() {
    result = manipulator(template, field, scope);
    resultEl = angular.element(result);
    resultNode = resultEl[0];
  }

  function attrExists(name, notExists) {
    const attr = resultNode.getAttribute(name);
    if (notExists) {
      expect(attr).to.be.null;
    } else {
      expect(attr).to.be.defined;
    }
  }
});
