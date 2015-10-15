/* eslint no-shadow:0 */
/* eslint max-statements:[2, 50] */
/* eslint max-len:0 */
import angular from 'angular-fix';
import apiCheck from 'api-check';
import testUtils from '../test.utils.js';
import _ from 'lodash';

const {getNewField, input, basicForm, multiNgModelField, shouldWarn, shouldNotWarn} = testUtils;

describe('formly-field', function() {
  /* jshint maxstatements:100 */
  /* jshint maxlen:300 */
  let $compile, scope, el, node, formlyConfig, $q, isolateScope, field, $timeout;

  beforeEach(window.module('formly'));
  beforeEach(inject((_$compile_, $rootScope, _formlyConfig_, _$q_, _$timeout_) => {
    $compile = _$compile_;
    scope = $rootScope.$new();
    formlyConfig = _formlyConfig_;
    $q = _$q_;
    $timeout = _$timeout_;
  }));

  describe('with template wrapper', function() {
    beforeEach(() => {
      formlyConfig.setWrapper([
        {
          types: 'text',
          template: `
            <div class="my-template-wrapper">
              <label for="{{id}}">{{options.label}}</label>
              <formly-transclude></formly-transclude>
            </div>
          `
        },
        {
          types: 'other',
          template: `
            <div class="my-other-template-wrapper">
              <formly-transclude></formly-transclude>
              <div>
                This is great for ng-messages
              </div>
            </div>
          `
        }
      ]);
      formlyConfig.setType({
        name: 'text', template: `<input name="{{id}}" ng-model="model[options.key]" />`
      });
      scope.model = {};
    });

    it('should take the entire wrapper, not just the contents of the wrapper', function() {
      scope.fields = [
        {
          type: 'text',
          key: 'text',
          templateOptions: {
            label: 'Text input'
          }
        }
      ];
      const el = compileAndDigest();
      expect(el[0].querySelector('.my-template-wrapper')).to.exist;
    });

    it('should wrap arrays of wrappers', () => {
      scope.fields = [
        {
          type: 'text',
          key: 'text',
          wrapper: ['text', 'other'],
          templateOptions: {
            label: 'Text input'
          }
        }
      ];
      const el = compileAndDigest();
      const outerEl = el[0].querySelector('.my-other-template-wrapper');
      expect(outerEl).to.exist;
      expect(outerEl.querySelector('.my-template-wrapper')).to.exist;
    });

    it(`should allow for specifying null for the wrappers of a field`, () => {
      scope.fields = [
        {
          type: 'text',
          key: 'text',
          wrapper: null,
          templateOptions: {
            label: 'Text input'
          }
        }
      ];
      const el = compileAndDigest();
      expect(el[0].querySelector('.my-template-wrapper')).to.not.exist;
    });

  });


  describe('api check', () => {
    beforeEach(() => {
      /* eslint no-console:0 */
      const originalWarn = console.warn;
      console.warn = () => {};
      formlyConfig.setType({
        name: 'text', template: `<input name="{{id}}" ng-model="model[options.key]" />`
      });
      scope.model = {};
      console.warn = originalWarn;
    });

    it('should throw an error when a field has extra properties', () => {
      scope.fields = [
        {
          type: 'text',
          extraProp: 'whatever'
        }
      ];


      expect(() => compileAndDigest()).to.throw(/extra.*properties.*extraProp/);
    });
  });

  describe('default type options', () => {
    beforeEach(() => {
      scope.model = {};
      formlyConfig.setType({
        name: 'ipAddress', template: '<input name="{{id}}" ng-model="model[options.key]" />',
        defaultOptions: {
          data: {
            usingDefaultOptions: true
          },
          validators: {
            ipAddress: function(viewValue, modelValue) {
              const value = modelValue || viewValue;
              return /(\d{1,3}\.){3}\d{1,3}/.test(value);
            }
          }
        }
      });

      formlyConfig.setType({
        name: 'text', template: '<input name="{{id}}" ng-model="model[options.key]" />',
        defaultOptions: {
          data: {
            hasPropertiesFromTextType: true
          }
        }
      });
      formlyConfig.setType({
        name: 'phone',
        defaultOptions: {
          ngModelAttrs: {
            '/^1[2-9]\\d{2}[2-9]\\d{6}$/': {
              value: 'ng-pattern'
            }
          }
        }
      });
      formlyConfig.setType({
        name: 'required',
        defaultOptions: {
          ngModelAttrs: {
            '/overwriting stuff is fun for tests/': {
              value: 'ng-pattern'
            },
            required: {
              bound: 'ng-required',
              attribute: 'required'
            },
            myChange: {
              statement: 'ng-change'
            }
          },
          templateOptions: {
            required: true
          }
        }
      });
    });

    it('should default to the ipAddress type options', () => {
      const field = {type: 'ipAddress'};
      scope.fields = [field];
      compileAndDigest();
      expect(field.data.usingDefaultOptions).to.be.true;
      expect(field.validators.ipAddress).to.be.a('function');
    });

    it('should be possible to specify defaultOptions-only types (non-template types)', () => {
      const field = {
        type: 'text', optionsTypes: ['phone', 'required'], templateOptions: {myChange: 'model.otherThing = true'}
      };
      scope.fields = [field];
      const el = compileAndDigest();
      const input = el.find('input');
      expect(field.data.hasPropertiesFromTextType).to.be.true;
      expect(input.attr('ng-pattern')).to.equal('/overwriting stuff is fun for tests/');
      expect(input.attr('ng-change')).to.contain('myChange');
    });
  });


  describe('templateManipulators', () => {
    testTemplateManipulators(true);
    testTemplateManipulators(false);

    function testTemplateManipulators(isPre) {
      describe(isPre ? 'preWrapper' : 'postWrapper', () => {
        let manipulators;
        const textTemplate = '<input class="text-template" name="{{id}}" ng-model="model[options.key]">';
        beforeEach(() => {
          manipulators = formlyConfig.templateManipulators[isPre ? 'preWrapper' : 'postWrapper'];
          formlyConfig.setWrapper([
            {
              types: 'text',
              template: '<div class="my-template-wrapper"><formly-transclude></formly-transclude></div>'
            }
          ]);
          formlyConfig.setType({
            name: 'text', template: textTemplate
          });
          scope.model = {};
          scope.fields = [
            {type: 'text'}
          ];
        });

        const when = isPre ? 'before' : 'after';

        it(`should call the manipulators when compiling a field ${when} the element is wrapped in wrappers`, () => {
          let manipulatedTemplate;
          manipulators.push((templateToManipulate, fieldOptions, scope) => {
            if (isPre) {
              expect(templateToManipulate).to.contain('text-template');
            }
            expect(fieldOptions).to.equal(scope.fields[0]);
            expect(scope.options).to.equal(fieldOptions);
            if (isPre) {
              expect(templateToManipulate).to.not.contain('my-template-wrapper');
            } else {
              expect(templateToManipulate).to.contain('my-template-wrapper');
            }
            manipulatedTemplate = angular.element(templateToManipulate).addClass('manipulated');
            return manipulatedTemplate;
          });

          manipulators.push((templateToManipulate, fieldOptions, scope) => {
            if (isPre) {
              expect(asHtml(manipulatedTemplate)).to.equal(templateToManipulate);
            }
            expect(fieldOptions).to.equal(scope.fields[0]);
            expect(scope.options).to.equal(fieldOptions);
            if (isPre) {
              expect(templateToManipulate).to.not.contain('my-template-wrapper');
            } else {
              expect(templateToManipulate).to.contain('my-template-wrapper');
            }
            expect(templateToManipulate).to.contain('manipulated');
            return angular.element(templateToManipulate).addClass('manipulated-twice');
          });
          compileAndDigest();
          scope.$digest();
          expect(el[0].querySelector('.manipulated')).to.exist;
          expect(el[0].querySelector('.manipulated-twice')).to.exist;

          function asHtml(el) {
            return angular.element('<a></a>').append(el).html();
          }
        });
      });
    }
  });

  describe('type controllers and link functions', () => {
    let controllerFn, linkFn;
    beforeEach(() => {
      controllerFn = function($scope) {
        $scope.setInTypeController = true;
      };

      linkFn = function(scope, el, attrs) {
        scope.setInTypeLink = true;
        scope.el = el;
        scope.attrs = attrs;
      };

      formlyConfig.setType({
        name: 'text',
        template: `<input name="{{id}}" ng-model="model[options.key]" />`,
        controller: ['$scope', controllerFn],
        link: linkFn
      });
      scope.model = {};
    });
    it('should run the controller function of a type', () => {
      scope.fields = [
        {type: 'text'}
      ];
      const el = compileAndDigest();
      const fieldEl = angular.element(el[0].querySelector('.formly-field'));
      expect(fieldEl.isolateScope().setInTypeController).to.be.true;
    });

    it('should run the link function of a type', () => {
      scope.fields = [
        {type: 'text'}
      ];
      const el = compileAndDigest();
      const fieldEl = angular.element(el[0].querySelector('.formly-field'));
      const fieldScope = fieldEl.isolateScope();
      expect(fieldScope.setInTypeLink).to.be.true;
      expect(fieldScope.el[0]).to.equal(fieldEl[0]);
    });

    it('should run the controller of the specific field', () => {
      scope.fields = [
        {template: 'sweet mercy', controller: ['$scope', controllerFn]}
      ];

      const el = compileAndDigest();
      const fieldEl = angular.element(el[0].querySelector('.formly-field'));
      expect(fieldEl.isolateScope().setInTypeController).to.be.true;
    });


    it('should run the link function of a type', () => {
      scope.fields = [
        {template: 'sweet mercy', link: linkFn}
      ];
      const el = compileAndDigest();
      const fieldEl = angular.element(el[0].querySelector('.formly-field'));
      const fieldScope = fieldEl.isolateScope();
      expect(fieldScope.setInTypeLink).to.be.true;
      expect(fieldScope.el[0]).to.equal(fieldEl[0]);
    });
  });

  describe(`template and templateUrl properties`, () => {
    let $templateCache;
    const expectedTemplateText = 'sweet mercy';

    beforeEach(inject((_$templateCache_) => {
      $templateCache = _$templateCache_;
      $templateCache.put('templateUrlTest.html', expectedTemplateText);
    }));

    it('should allow template property to be a function', () => {
      scope.fields = [
        {
          template: function(options) {
            expect(options).to.eq(scope.fields[0]);
            return expectedTemplateText;
          }
        }
      ];

      const el = compileAndDigest();

      const fieldEl = angular.element(el[0].querySelector('.formly-field'));
      expect(fieldEl.text()).to.equal(expectedTemplateText);
    });

    it(`should allow template property to be a function that returns a promise`, () => {
      scope.fields = [
        {
          template: function(options) {
            expect(options).to.eq(scope.fields[0]);
            return $q.when(expectedTemplateText);
          }
        }
      ];

      const el = compileAndDigest();

      const fieldEl = angular.element(el[0].querySelector('.formly-field'));
      expect(fieldEl.text()).to.equal(expectedTemplateText);
    });

    it('should allow template property to be a string', () => {
      scope.fields = [
        {template: expectedTemplateText}
      ];

      const el = compileAndDigest();

      const fieldEl = angular.element(el[0].querySelector('.formly-field'));
      expect(fieldEl.text()).to.equal(expectedTemplateText);
    });

    it('should allow template property to be an empty string', () => {
      scope.fields = [
        {template: ''},
      ];

      const el = compileAndDigest();

      const fieldEl = angular.element(el[0].querySelector('.formly-field'));
      expect(fieldEl.text()).to.equal('');
    });

    it('should allow templateUrl property to be a function', () => {
      scope.fields = [
        {
          templateUrl: function(options) {
            expect(options).to.eq(scope.fields[0]);
            return 'templateUrlTest.html';
          }
        }
      ];

      const el = compileAndDigest();

      const fieldEl = angular.element(el[0].querySelector('.formly-field'));
      expect(fieldEl.text()).to.equal(expectedTemplateText);
    });

    it('should allow templateUrl property to be a function that returns a promise', () => {
      scope.fields = [
        {
          templateUrl: function(options) {
            expect(options).to.eq(scope.fields[0]);
            return $q.when('templateUrlTest.html');
          }
        }
      ];

      const el = compileAndDigest();

      const fieldEl = angular.element(el[0].querySelector('.formly-field'));
      expect(fieldEl.text()).to.equal(expectedTemplateText);
    });

    it('should allow templateUrl property to be a string', () => {
      scope.fields = [
        {templateUrl: 'templateUrlTest.html'}
      ];

      const el = compileAndDigest();

      const fieldEl = angular.element(el[0].querySelector('.formly-field'));
      expect(fieldEl.text()).to.equal(expectedTemplateText);
    });
  });

  describe(`defaultValue`, () => {
    const key = 'foo';
    const defaultValue = '~=[,,_,,]:3';

    beforeEach(() => {
      scope.fields = [
        {template: input, key, defaultValue}
      ];
      scope.model = {};
    });

    it(`should default the model's value to the specified value if it is not defined`, () => {
      compileAndDigest();
      expect(scope.model[key]).to.equal(defaultValue);
    });

    it(`should not have a problem if the model starts out as undefined`, () => {
      scope.model = undefined;
      compileAndDigest();
      expect(scope.model[key]).to.equal(defaultValue);
    });

    it(`should not change the model's value if the specified value is defined`, () => {
      const presetValue = 'ಠ_ರೃ';
      scope.model[key] = presetValue;

      compileAndDigest();
      expect(scope.model[key]).to.equal(presetValue);
    });

    it(`should be exactly equal to a non-primative`, () => {
      const complexDefaultValue = {foo: 'bar'};
      scope.fields[0].defaultValue = complexDefaultValue;

      compileAndDigest();
      expect(scope.model[key]).to.eq(complexDefaultValue);
    });

    it(`should be set even if the defaultValue is falsy`, () => {
      const falsyValue = 0;
      scope.fields[0].defaultValue = falsyValue;

      compileAndDigest();
      expect(scope.model[key]).to.eq(falsyValue);
    });

    it(`should be set as the initialValue`, () => {
      compileAndDigest();

      expect(scope.fields[0].initialValue).to.eq(defaultValue);
    });

    describe(`nested keys`, () => {
      const nestedObject = 'foo.bar';
      const nestedArray = 'baz[0]';
      beforeEach(() => {
        const firstField = scope.fields[0];
        firstField.key = nestedObject;

        const secondField = {template: input, key: nestedArray, defaultValue};
        scope.fields.push(secondField);
      });

      it(`should set the default value for nested keys`, () => {
        compileAndDigest();
        expect(scope.model.foo.bar).to.equal(defaultValue);
        expect(scope.model.baz[0]).to.equal(defaultValue);
      });
    });
  });

  describe(`id property`, () => {
    it(`should default to a semi-random id that you cannot rely on and don't have to think about`, () => {
      scope.fields = [getNewField()];
      compileAndDigest();
      const fieldNode = getFieldNgModelNode();
      expect(field.id).to.eq(fieldNode.id);
      expect(fieldNode.id).to.match(/^formly_\d+_template_\d+_\d+$/);
      expect(fieldNode.id).to.eq(fieldNode.getAttribute('name'));
    });

    it(`should allow you to specify a custom id if you want to`, () => {
      scope.fields = [getNewField({id: 'ᕕ( ᐛ )ᕗ'})];
      compileAndDigest();
      const fieldNode = getFieldNgModelNode();
      expect(field.id).to.eq(fieldNode.id);
      expect(fieldNode.id).to.eq('ᕕ( ᐛ )ᕗ');
      expect(fieldNode.id).to.eq(fieldNode.getAttribute('name'));
    });
  });

  describe(`modelOptions property`, () => {
    it(`should be able to handle modelOptions with debouce as a number`, () => {
      scope.fields = [getNewField({modelOptions: {debounce: 500}})];
      compileAndDigest();
      const fieldNode = getFieldNgModelNode();
      expect(fieldNode.getAttribute('ng-model-options')).to.exist;
    });

    it(`should be able to compile modelOptions with debounce as an object of numbers`, () => {
      scope.fields = [getNewField({modelOptions: {debounce: {blur: 500, default: 0}}})];
      compileAndDigest();
      const fieldNode = getFieldNgModelNode();
      expect(fieldNode.getAttribute('ng-model-options')).to.exist;
    });

    it(`should throw an error when modelOptions with debounce as a string`, () => {
      scope.fields = [getNewField({modelOptions: {debounce: 'foo'}})];
      expect(() => compileAndDigest()).to.throw();
    });

    it(`should throw an error when modelOptions with debounce as an object of strings`, () => {
      scope.fields = [getNewField({modelOptions: {debounce: {blur: 'foo', default: 'bar'}}})];
      expect(() => compileAndDigest()).to.throw();
    });


    describe(`value function`, () => {
      let value;
      it(`should be overrideable via value option`, () => {
        compileDigestAndSetValueFunction({value: customGetterSetter});
        expect(value).to.eq(customGetterSetter);
        function customGetterSetter() {
        }
      });

      it(`should be a getter/setter`, () => {
        compileDigestAndSetValueFunction();
        expect(value()).to.eq(undefined);
        expect(value('foo')).to.eq('foo');
        expect(value()).to.eq('foo');
      });

      it(`should not throw an error when the model is undefined`, inject(($rootScope) => {
        const formlyField = `<div formly-field
               options="field"
               model="model">
          </div>`;
        scope = $rootScope.$new();
        _.assign(scope, {
          field: getNewField(),
          model: undefined // <-- this is the key
        });
        el = $compile(formlyField)(scope);
        scope.$digest();
        expect(() => scope.field.value()).to.not.throw();
      }));

      function compileDigestAndSetValueFunction(fieldOverrides) {
        scope.fields = [getNewField(_.merge({modelOptions: {getterSetter: true}}, fieldOverrides))];
        compileAndDigest();
        value = getIsolateScope().options.value;
      }
    });

  });

  describe(`type apiCheck`, () => {
    let inputType;
    const type = 'input';
    beforeEach(() => {
      inputType = formlyConfig.setType({
        name: type,
        template: '<label>{{to.label}}</label><input class="{{to.className}}" ng-model="model[options.key]" />',
        apiCheck(check) {
          return {
            templateOptions: {
              label: check.string,
              className: check.string
            }
          };
        },
        apiCheckInstance: apiCheck({
          output: {prefix: 'custom-api-check'}
        }),
        apiCheckOptions: {
          url: 'http://example.com/some-custom-url'
        }
      });
      scope.model = {};
    });

    it(`should default to the built-in formlyApiCheck`, inject((formlyApiCheck) => {
      const type = formlyConfig.setType({
        name: 'someOtherType',
        template: '<hr />',
        apiCheck: sinon.spy()
      });
      scope.fields = [{type: 'someOtherType'}];
      compileAndDigest();
      expect(type.apiCheck).to.have.been.calledWith(formlyApiCheck);
    }));

    it(`should not warn if everything's fine`, () => {
      scope.fields = [
        {type, templateOptions: {label: 'string', className: 'string'}}
      ];
      shouldNotWarn(compileAndDigest);
    });

    it(`should warn if everything's not fine`, () => {
      scope.fields = [
        {type, templateOptions: {label: 'string'}}
      ];
      shouldWarn(
        /custom-api-check formly-field type input for property templateOptions apiCheck failed.*?className.*?some-custom-url/,
        compileAndDigest
      );
    });

    it(`should throw if the apiCheckFunction is set to "throw" and everything's not fine`, () => {
      formlyConfig.getType(type).apiCheckFunction = 'throw';
      scope.fields = [
        {type, templateOptions: {label: 'string'}}
      ];
      expect(compileAndDigest).to.throw(
        /custom-api-check formly-field type input for property templateOptions apiCheck failed.*?.className.*?some-custom-url/
      );
    });

    it(`should work with wrappers as well`, () => {
      formlyConfig.setWrapper({
        name: 'mywrapper',
        template: 'wrapped!<formly-transclude></formly-transclude>wrapped!',
        apiCheck(check) {
          return {
            templateOptions: {
              foo: check.bool
            }
          };
        },
        apiCheckInstance: apiCheck({output: {prefix: 'my own'}}),
        apiCheckOptions: {prefix: 'options prefix'}
      });
      scope.fields = [
        {type, wrapper: 'mywrapper', templateOptions: {label: 'string', className: 'string'}}
      ];
      shouldWarn(
        /my own options prefix apiCheck failed/,
        compileAndDigest
      );
    });

    describe(`apiCheckInstance`, () => {
      describe(`disabled`, () => {
        it(`should not do anything if the given instance is disabled`, () => {
          inputType.apiCheckInstance.config.disabled = true;
          scope.fields = [
            {type, templateOptions: {label: 'string'}}
          ];
          shouldNotWarn(compileAndDigest);
        });

        it(`should not do anything if no instance is provided and the formly instance is disabled`, inject((formlyApiCheck) => {
          formlyApiCheck.config.disabled = true;
          formlyConfig.setType({
            name: 'someOtherType',
            template: '<hr />',
            apiCheck: checker => ({data: {foo: checker.bool}})
          });
          scope.fields = [{type: 'someOtherType'}];
          shouldNotWarn(compileAndDigest);
          formlyApiCheck.config.disabled = false;
        }));

        it(`should not do anything if the global instance is disabled`, () => {
          apiCheck.globalConfig.disabled = true;
          scope.fields = [
            {type, templateOptions: {label: 'string'}}
          ];
          shouldNotWarn(compileAndDigest);
          apiCheck.globalConfig.disabled = false;
        });
      });

      describe(`formlyConfig.extras.apiCheckInstance`, () => {
        it(`should default to this instance when specified and no specific type instance is specified`, () => {
          const globalApiCheckInstance = apiCheck({
            output: {prefix: 'custom-api-check'}
          });
          const warnSpy = sinon.spy(globalApiCheckInstance, 'warn');
          formlyConfig.extras.apiCheckInstance = globalApiCheckInstance;
          delete inputType.apiCheckInstance;
          scope.fields = [
            {type, templateOptions: {label: 'string', className: 'valid'}}
          ];
          compileAndDigest();
          expect(warnSpy).to.have.been.calledOnce;
        });
      });
    });

    describe(`extended scenario`, () => {
      let childType, pristineOptions;
      beforeEach(() => {
        sinon.spy(inputType, 'apiCheck');
        childType = formlyConfig.setType({
          name: type + 'Child',
          extends: type,
          template: '<hr />',
          apiCheck(check) {
            return {
              data: {
                foo: check.string
              }
            };
          },
          apiCheckFunction: 'throw',
          apiCheckInstance: apiCheck({
            output: {suffix: 'my own'}
          }),
          apiCheckOptions: {url: 'http://other-url.example.com', prefix: type + 'Child type checker'}
        });

        sinon.spy(childType, 'apiCheck');

        pristineOptions = {type: type + 'Child', templateOptions: {label: 'foo', className: 'bar'}, data: {foo: 'bar'}};
      });

      it(`should pass if everything is ok`, () => {
        compileDigestAndMatchError();
        expect(childType.apiCheck).to.have.been.calledWith(childType.apiCheckInstance);
        expect(inputType.apiCheck).to.have.been.calledWith(inputType.apiCheckInstance);
      });

      it(`should throw if the child has a problem`, () => {
        compileDigestAndMatchError(
          {data: {foo: false}},
          /inputChild type checker apiCheck failed.*?`foo`.*?`String`.*?my own.*?other-url\.example\.com/
        );
      });

      it(`should invoke the apiCheck for all extended types if an error is not thrown`, () => {
        childType.apiCheckFunction = 'warn';
        compileDigestAndMatchError();
        expect(childType.apiCheck).to.have.been.calledWith(childType.apiCheckInstance);
        expect(inputType.apiCheck).to.have.been.calledWith(inputType.apiCheckInstance);
      });

      function compileDigestAndMatchError(fieldOverrides, error) {
        scope.fields = [_.merge(pristineOptions, fieldOverrides)];
        if (error) {
          expect(compileAndDigest).to.throw(error);
        } else {
          expect(compileAndDigest).to.not.throw();
        }
      }
    });

    it(`should have good default options`, () => {
      formlyConfig.setType({
        name: 'someType',
        template: '<hr />',
        apiCheck(check) {
          return {
            templateOptions: {
              label: check.string,
              className: check.string
            }
          };
        },
        apiCheckInstance: apiCheck({
          output: {prefix: 'custom-api-check'}
        })
      });
      scope.fields = [
        {type: 'someType', templateOptions: {label: 'string'}}
      ];
      shouldWarn(
        /custom-api-check formly-field type someType for property templateOptions apiCheck failed.*?Required.*?className/,
        compileAndDigest
      );
    });
  });

  describe(`wrapper apiCheck`, () => {
    const name = 'input';
    const wrapper = name;
    beforeEach(() => {
      formlyConfig.setWrapper({
        name,
        template: '<div class="to.className"><label>{{to.label}}</label><formly-transclude></formly-transclude></div>',
        apiCheck(check) {
          return {
            templateOptions: {
              label: check.string,
              className: check.string
            }
          };
        },
        apiCheckInstance: apiCheck({
          output: {prefix: 'custom-api-check'}
        })
      });
      scope.model = {};
      scope.fields = [
        {template: input, wrapper, templateOptions: {}}
      ];
    });

    it(`should not warn if everything's fine`, () => {
      scope.fields[0].templateOptions = {label: 'string', className: 'string'};
      shouldNotWarn(compileAndDigest);
    });

    it(`should warn if everything's not fine`, () => {
      scope.fields[0].templateOptions = {label: 'string'};
      shouldWarn(/custom-api-check.*?formly-field(.|\n)*?className/, compileAndDigest);
    });

    it(`should throw if the apiCheckFunction is set to "throw" and everything's not fine`, () => {
      formlyConfig.getWrapper(name).apiCheckFunction = 'throw';
      scope.fields[0].templateOptions = {label: 'string'};
      expect(compileAndDigest).to.throw(/custom-api-check.*?formly-field(.|\n)*?className/);
    });
  });

  describe(`formControl`, () => {

    beforeEach(() => {
      scope.fields = [{template: input}];
    });

    it(`should be placed onto field's options`, () => {
      compileAndDigest();
      expect(field.formControl).to.exist;
    });

    it(`should be placed onto the isolate scope for the formly-field`, () => {
      compileAndDigest();
      expect(isolateScope.fc).to.exist;
    });

    it(`should add a formControl even on a field with an ng-if on the ng-model`, () => {
      const template = '<input ng-model="model[options.key]" ng-if="to.if" />';
      const field = {template, templateOptions: {if: false}};
      scope.fields = [field];
      compileAndDigest();
      expect(isolateScope.fc).to.not.exist;
      field.templateOptions.if = true;
      scope.$digest();
      expect(isolateScope.fc).to.exist;
    });

    it(`should be used to add the formControl watcher if set to false even if there is no ng-model`, () => {
      const radioTemplate = `
        <div class="radio-group">
          <div ng-repeat="(key, option) in to.options" class="radio">
            <label>
              <input type="radio"
                     id="{{id + '_'+ $index}}"
                     tabindex="0"
                     ng-value="option[to.valueProp || 'value']"
                     ng-model="model[options.key]">
              {{option[to.labelProp || 'name']}}
            </label>
          </div>
        </div>
      `;
      scope.fields = [
        {
          template: radioTemplate,
          templateOptions: {
            options: [{name: 'Name', value: 'name'}]
          }
        }
      ];
      compileAndDigest();
      expect(isolateScope.fc).to.exist;
    });

    describe(`noFormControl`, () => {
      it(`should skip adding the formControl if set to true`, () => {
        scope.fields = [{template: input, noFormControl: true}];
        compileAndDigest();
        expect(isolateScope.fc).to.not.exist;
      });

    });

    describe(`name`, () => {
      it(`should be almost random`, () => {
        compileAndDigest();
        expect(field.formControl.$name).to.match(/formly_\d+_template_.*?_\d+/);
      });

      it(`should be overrideable when a different name is specified`, () => {
        scope.fields[0].template = `<input ng-model="model[options.key]" name="myCustomName" />`;
        compileAndDigest();
        makeNameExpectations('myCustomName');
      });

      it(`should handle interpolated names`, () => {
        scope.fields[0].template = `<input ng-model="model[options.key]" name="{{'myCustomName'}}" />`;
        compileAndDigest();
        makeNameExpectations('myCustomName');
      });

      function makeNameExpectations(name) {
        expect(field.formControl).to.exist;
        expect(isolateScope.fc).to.exist;
        expect(field.formControl.$name).to.eq(name);
        expect(scope.theForm).to.have.property(name);
      }

    });

    describe(`multiple ng-models`, () => {
      it(`should be an array`, () => {
        scope.fields = [{
          template: multiNgModelField
        }];

        compileAndDigest();
        expect(isolateScope.fc).to.be.instanceof(Array);
      });
    });
  });

  describe(`parsers/formatters`, () => {
    describe(`parsers`, () => {
      it(`should be merged in the right order`, () => {
        testParsersOrFormatters('parsers');
      });

      it(`should handle a formlyExpression as a string`, () => {
        scope.fields = [getNewField({
          key: 'myKey',
          parsers: ['$viewValue + options.data.extraThing'],
          data: {extraThing: ' boo!'}
        })];
        compileAndDigest();
        const ctrl = getNgModelCtrl();
        expect(ctrl.$parsers).to.have.length(1);
        ctrl.$setViewValue('hello!');
        expect(scope.model.myKey).to.equal('hello! boo!');
      });
    });

    describe(`formatters`, () => {
      it(`should be merged in the right order`, () => {
        testParsersOrFormatters('formatters');
      });

      it(`should handle a formlyExpression as a string`, () => {
        scope.fields = [getNewField({
          key: 'myKey',
          formatters: ['$viewValue + options.data.extraThing'],
          data: {extraThing: ' boo!'}
        })];
        compileAndDigest();
        scope.model.myKey = 'hello!';
        scope.$digest();
        const ctrl = getNgModelCtrl();
        expect(ctrl.$formatters).to.have.length(2); // ngModel adds one
        expect(ctrl.$viewValue).to.equal('hello! boo!');
      });

      it(`should format a model value right from the start and the controller should still be pristine`, () => {
        scope.model = {myKey: 'hello'};
        scope.fields = [getNewField({
          key: 'myKey',
          formatters: ['"!" + $viewValue + "!"']
        })];
        compileAndDigest();

        const ctrl = getNgModelCtrl();

        expect(ctrl.$viewValue).to.equal('!hello!');
        expect(ctrl.$dirty).to.equal(false);
        expect(ctrl.$pristine).to.equal(true);
      });

      it(`should format a model value on initilization and keep the form state dirty if it was already dirty`, () => {
        scope.model = {myKey: 'hello'};
        scope.fields = [getNewField({
          key: 'myKey',
          formatters: ['"!" + $viewValue + "!"']
        })];
        compileAndDigest();
        scope.theForm.$setDirty();

        const ctrl = getNgModelCtrl();

        expect(ctrl.$viewValue).to.equal('!hello!');
        expect(scope.theForm.$dirty).to.equal(true);

      });

      it(`should format a model value on initilization and keep the form state pristine if it was already pristine`, () => {
        scope.model = {myKey: 'hello'};
        scope.fields = [getNewField({
          key: 'myKey',
          formatters: ['"!" + $viewValue + "!"']
        })];
        compileAndDigest();

        const ctrl = getNgModelCtrl();

        expect(ctrl.$viewValue).to.equal('!hello!');
        expect(scope.theForm.$pristine).to.equal(true);

      });

      it.skip(`should handle multiple form controllers when formatting a model value right from the start`, () => {
        scope.model = {
          multiNgModel: {
            start: 'start',
            stop: 'stop'
          }
        };
        const field = getNewField({
          key: 'multiNgModel',
          template: multiNgModelField,
          formatters: ['"!" + $viewValue + "!"']
        });
        scope.fields = [field];

        compileAndDigest();

        const ctrl1 = field.formControl[0];
        const ctrl2 = field.formControl[1];

        expect(ctrl1.$viewValue).to.equal('!start!');
        expect(ctrl2.$viewValue).to.equal('!stop!');
      });

    });

    function testParsersOrFormatters(which) {
      let originalThingProp = 'originalParser';
      if (which === 'formatters') {
        originalThingProp = 'originalFormatter';
      }
      const parent1Thing1 = sinon.spy(function parent1Thing1() {
      });
      const parent1Thing2 = sinon.spy(function parent1Thing2() {
      });
      const parent2Thing1 = sinon.spy(function parent2Thing1() {
      });
      const parent2Thing2 = sinon.spy(function parent2Thing2() {
      });
      const childThing1 = sinon.spy(function childThing1() {
      });
      const childThing2 = sinon.spy(function childThing2() {
      });
      const optionType1Thing1 = sinon.spy(function optionType1Thing1() {
      });
      const optionType1Thing2 = sinon.spy(function optionType1Thing2() {
      });
      const optionType2Thing1 = sinon.spy(function optionType2Thing1() {
      });
      const optionType2Thing2 = sinon.spy(function optionType2Thing2() {
      });
      const fieldThing1 = sinon.spy(function fieldThing1() {
      });
      const fieldThing2 = sinon.spy(function fieldThing2() {
      });

      formlyConfig.setType({
        name: 'parent1',
        defaultOptions: {
          [which]: [parent1Thing1, parent1Thing2]
        }
      });

      formlyConfig.setType({
        name: 'parent2',
        defaultOptions: {
          [which]: [parent2Thing1, parent2Thing2]
        }
      });

      formlyConfig.setType({
        name: 'child',
        template: '<input ng-model="model[options.key]" />',
        extends: 'parent1', // <-- note this!
        defaultOptions: {
          [which]: [childThing1, childThing2]
        }
      });

      formlyConfig.setType({
        name: 'optionType1',
        extends: 'parent2', // <-- note this!
        defaultOptions: {
          [which]: [optionType1Thing1, optionType1Thing2]
        }
      });

      formlyConfig.setType({
        name: 'optionType2',
        defaultOptions: {
          [which]: [optionType2Thing1, optionType2Thing2]
        }
      });

      scope.fields = [
        {
          type: 'child',
          optionsTypes: ['optionType1', 'optionType2'],
          [which]: [fieldThing1, fieldThing2]
        }
      ];

      compileAndDigest();
      const ctrl = getNgModelCtrl();
      const originalThings = ctrl['$' + which].map(thing => thing[originalThingProp]);
      if (which === 'formatters') {
        // all ngModelControllers have a default formatter, remove that from the originalThings for our test
        originalThings.shift();
      }
      expect(originalThings).to.eql([
        parent1Thing1, parent1Thing2,
        childThing1, childThing2,
        parent2Thing1, parent2Thing2,
        optionType1Thing1, optionType1Thing2,
        optionType2Thing1, optionType2Thing2,
        fieldThing1, fieldThing2
      ]);
    }
  });

  describe(`link`, () => {
    describe(`addClasses`, () => {
      it(`should add the type class`, () => {
        formlyConfig.setType({
          name: 'input',
          template: input
        });

        scope.fields = [{type: 'input'}];

        compileAndDigest();
        expect(el[0].querySelector('[formly-field].formly-field-input')).to.exist;
      });

      it(`should add the className class`, () => {
        scope.fields = [getNewField({className: 'classy'}), getNewField({className: 'very-classy'})];
        compileAndDigest();
        expect(el[0].querySelector('[formly-field].classy')).to.exist;
        expect(el[0].querySelector('[formly-field].very-classy')).to.exist;
      });
    });
  });

  describe(`elementAttributes`, () => {
    it(`should allow fields to have attributes which will be applied to the [formly-field]`, () => {
      scope.fields = [getNewField({elementAttributes: {foo: 'bar', baz: 'eggs'}})];
      compileAndDigest();
      expect(el[0].querySelector('[formly-field][foo=bar][baz=eggs]')).to.exist;
    });

    it(`should allow fieldGroups to have attributes which will be applied to the ng-form`, () => {
      scope.fields = [
        {elementAttributes: {foo: 'bar', baz: 'eggs'}, fieldGroup: [getNewField()]}
      ];
      compileAndDigest();
      expect(el[0].querySelector('ng-form[foo=bar][baz=eggs]')).to.exist;
    });
  });

  describe(`resetModel`, () => {
    it(`should reset the form state`, () => {
      const field = getNewField({key: 'foo'});
      scope.fields = [field];
      compileAndDigest();

      // initial state
      expect(field.formControl.$dirty).to.be.false;
      expect(field.formControl.$touched).to.be.false;

      // modification
      scope.model.foo = '~=[,,_,,]:3';
      field.formControl.$setTouched();
      field.formControl.$setDirty();
      scope.$digest();

      // expect modification
      expect(field.formControl.$dirty).to.be.true;
      expect(field.formControl.$touched).to.be.true;
      expect(field.formControl.$modelValue).to.eq('~=[,,_,,]:3');

      // reset state
      field.resetModel();

      // expect reset
      expect(field.formControl.$modelValue).to.be.empty;
      expect(field.formControl.$touched).to.be.false;
      expect(field.formControl.$dirty).to.be.false;
    });

    it(`should reset the form state for an field with multiple ng-models`, () => {
      const field = {
        key: 'multiNgModel',
        template: multiNgModelField
      };
      scope.fields = [field];
      compileAndDigest();

      // initial state
      expect(field.formControl[0].$dirty).to.be.false;
      expect(field.formControl[0].$touched).to.be.false;
      expect(field.formControl[1].$dirty).to.be.false;
      expect(field.formControl[1].$touched).to.be.false;

      scope.model.multiNgModel = {
        start: 0,
        stop: 20
      };
      field.formControl[0].$setDirty();
      field.formControl[0].$setTouched();
      field.formControl[1].$setDirty();
      field.formControl[1].$setTouched();
      scope.$digest();

      // expect modification
      expect(field.formControl[0].$dirty).to.be.true;
      expect(field.formControl[0].$touched).to.be.true;
      expect(field.formControl[0].$modelValue).to.eq(0);
      expect(field.formControl[1].$dirty).to.be.true;
      expect(field.formControl[1].$touched).to.be.true;
      expect(field.formControl[1].$modelValue).to.eq(20);

      // reset state
      field.resetModel();

      // expect reset
      expect(field.formControl[0].$modelValue).to.be.empty;
      expect(field.formControl[0].$touched).to.be.false;
      expect(field.formControl[0].$dirty).to.be.false;
      expect(field.formControl[1].$modelValue).to.be.empty;
      expect(field.formControl[1].$touched).to.be.false;
      expect(field.formControl[1].$dirty).to.be.false;
    });

    it(`should work just fine to call resetModel on a field that has no formControl`, () => {
      const field = {template: '<hr />'};
      scope.fields = [field];
      compileAndDigest();
      expect(field.formControl).to.not.exist;
      expect(() => field.resetModel()).to.not.throw();
    });

    it(`should not digest if there's a digest in progress`, () => {
      scope.fields = [getNewField()];
      compileAndDigest();
      scope.$root.$$phase = '$digest';
      expect(() => field.resetModel()).to.not.throw();
    });
  });

  describe(`with a div ng-model`, () => {
    it(`should have a form-controller`, () => {
      const template = `<div ng-model="model[options.key]"> </div>`;
      scope.fields = [getNewField({template})];
      compileAndDigest();
      expect(isolateScope.fc).to.exist;
      expect(field.formControl).to.exist;
    });
  });

  describe(`with a div data-ng-model`, () => {
    it(`should have a form-controller`, () => {
      const template = `<div data-ng-model="model[options.key]"> </div>`;
      scope.fields = [getNewField({template})];
      compileAndDigest();
      expect(isolateScope.fc).to.exist;
      expect(field.formControl).to.exist;
    });
  });

  describe(`options.validation.errorExistsAndShouldBeVisible`, () => {
    describe.skip(`multiple ng-model elements`, () => {
      beforeEach(() => {
        scope.fields = [
          {
            template: `
              <input ng-model="model[options.data.firstKey]" />
              <input ng-model="model[options.data.secondKey]" />
            `,
            // we'll just give it a validator that depends on a value we
            // can change in our tests
            validators: {foo: '!options.data.invalid'}
          }
        ];
      });

      it(`should set showError to true when one of them is invalid`, () => {
        compileAndDigest();
        expect(field.validation.errorExistsAndShouldBeVisible, 'initially false').to.be.false;
        invalidateAndTouchFields();

        expect(field.formControl[0].$error.foo, '$error on the first formControl').be.true;
        expect(field.validation.errorExistsAndShouldBeVisible, 'now true').to.be.true;
      });

      it(`should work with a custom errorExistsAndShouldBeVisibleExpression`, () => {
        const spy = sinon.spy();
        formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = spy;
        compileAndDigest();

        invalidateAndTouchFields();
        expect(spy).to.have.been.calledWith(sinon.match.array, sinon.match.array);
      });

      function invalidateAndTouchFields() {
        field.data.invalid = true;
        // force $touched and revalidation of both form controls
        field.formControl.forEach(fc => {
          fc.$setTouched();
          fc.$validate();
        });

        // redigest to set the showError prop
        scope.$digest();
      }
    });

    describe(`with custom errorExistsAndShouldBeVisible expression`, () => {
      beforeEach(() => {
        scope.fields = [getNewField({validators: {foo: 'false'}})];
      });

      it(`should set errorExistsAndShouldBeVisible to true when the expression function says so`, () => {
        formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = '!!options.data.customExpression';
        compileAndDigest();
        expect(field.validation.errorExistsAndShouldBeVisible).to.be.false;
        field.data.customExpression = true;
        scope.$digest();
        expect(field.validation.errorExistsAndShouldBeVisible).to.be.true;
      });

      it(`should be able to work with form.$submitted`, () => {
        formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'form.$submitted';
        compileAndDigest(`
          <form name="theForm">
            <formly-form form="theForm" model="model" fields="fields" options="options"></formly-form>
          </form>
        `);
        expect(field.validation.errorExistsAndShouldBeVisible).to.be.false;
        scope.theForm.$setSubmitted(true);
        scope.$digest();
        expect(field.validation.errorExistsAndShouldBeVisible).to.be.true;
      });

    });
  });

  describe(`with specified "model" property`, () => {

    it(`should use the specified model for the field which specifies it`, () => {
      const model = {
        foo: 'bar'
      };
      scope.fields = [
        {template: input, model, key: 'foo'}, // do not use getNewField() here because _.merge creates a copy of model
        getNewField(),
        getNewField()
      ];

      compileAndDigest();
      expect(isolateScope.model).to.not.equal(scope.model);
      expect(isolateScope.model).to.eq(model);
    });

    it(`should allow you to specify "formState" and assign it to the formState property`, () => {
      scope.fields = [
        getNewField({model: 'formState', data: {foo: 'bar'}}),
        getNewField(),
        getNewField()
      ];

      compileAndDigest();
      const field1 = getIsolateScope(0);
      const field2 = getIsolateScope(1);
      const field3 = getIsolateScope(2);

      expect(field1.model).to.not.equal(field2.model);
      expect(field1.model).to.equal(field3.formState);
      expect(field2.model).to.equal(field3.model);
    });

    it(`should allow you to specify any expression which will be used to evaluate the model at compile-time`, () => {
      scope.fields = [
        getNewField({key: 'foobar', model: 'options.data.foo', data: {foo: {bar: 'foobar'}}})
      ];

      compileAndDigest();
      expect(isolateScope.model).to.equal(field.data.foo);
    });

    it(`should allow you to specify a model for a fieldGroup and have that apply to children fields`, () => {
      scope.model = {child: {foo: 'bar', baz: {boo: {}}}};
      scope.fields = [
        {
          model: 'model.child',
          fieldGroup: [
            getNewField({key: 'foo'}),
            getNewField({key: 'bar', defaultValue: 'foobar', model: 'model.baz.boo'})
          ]
        }
      ];

      compileAndDigest();
      const fieldGroupNode = node.querySelector('.formly-field-group');
      expect(fieldGroupNode).to.exist;

      const fieldNode1 = fieldGroupNode.querySelectorAll('.formly-field')[0];
      expect(fieldNode1).to.exist;

      const fieldNode2 = fieldGroupNode.querySelectorAll('.formly-field')[1];
      expect(fieldNode2).to.exist;

      const fieldGroup = getIsolateScope(0);
      const field1 = getIsolateScope(1);
      const field2 = getIsolateScope(2);

      expect(fieldGroup.model).to.eq(scope.model.child);
      expect(field1.model).to.eq(scope.model.child);
      expect(field2.model).to.eq(scope.model.child.baz.boo);
    });

    it(`should throw an error if the model does not exist`, () => {
      scope.model = {child: {}};
      scope.fields = [
        {
          model: 'model.child',
          fieldGroup: [
            getNewField({model: 'model.baz'})
          ]
        }
      ];

      expect(() => compileAndDigest()).to.throw();
    });

    it(`should watch the model when it's not the direct child of a formly-form`, () => {
      scope.fields = [
        getNewField({key: 'foo', model: {}})
      ];

      compileAndDigest('<div formly-field class="formly-field" options="fields[0]" model="fields[0].model"></div>');
      $timeout.flush();

      const expressionPropertySpy = sinon.spy();
      field.expressionProperties = {'data.dummy': expressionPropertySpy};

      field.model.foo = 'hello';
      scope.$digest();
      $timeout.flush();

      expect(expressionPropertySpy).to.have.been.calledOnce;
    });

    it('should make original model available on field scope, even another model has been set for field', () => {

      scope.model = {foo: 'bar', child: {fox: 'jumps'}};

      scope.fields = [
        getNewField({key: 'foo '}),
        getNewField({key: 'bar', model: 'model.child'})
      ];

      compileAndDigest();

      const field1 = getIsolateScope(0);
      const field2 = getIsolateScope(1);

      expect(field1.model).to.eq(scope.model);
      expect(field1.originalModel).to.eq(field1.model);

      expect(field2.model).to.eq(scope.model.child);
      expect(field2.originalModel).not.to.eq(scope.model.child);
      expect(field2.originalModel).to.eq(scope.model);
    });

    it('should take field model as default for original model, if original value attributes has not been set', () => {
      scope.fields = [
        getNewField({key: 'foo', model: {foo: 'bar'}})
      ];

      compileAndDigest('<div formly-field class="formly-field" options="fields[0]" model="model"></div>');
      $timeout.flush();

      expect(field.model).to.eq(scope.fields[0].model);
      expect(field.originalModel).to.eql(scope.fields[0].model);

    });

  });

  describe(`fieldGroup`, () => {
    it(`should share the form with a fieldGroup`, () => {
      scope.model = {child: {foo: 'bar'}};
      scope.fields = [
        {
          model: 'model.child',
          fieldGroup: [
            getNewField({key: 'foo'})
          ]
        }
      ];

      compileAndDigest();
      const fieldGroupNode = node.querySelector('.formly-field-group');
      expect(fieldGroupNode).to.exist;

      const fieldGroup = getIsolateScope(0);

      expect(fieldGroup.model).to.eq(scope.model.child);

      expect(fieldGroup.options.form).to.eq(fieldGroup.form);
    });

    it(`should allow you to specify a key which will be used for the model of the field-group`, () => {
      scope.fields = [
        {
          key: 'foo',
          fieldGroup: [
            getNewField({key: 'fooChild', defaultValue: 'fooVal'}),
            {
              key: 'bar',
              fieldGroup: [
                getNewField({key: 'barChild', defaultValue: 'barVal'})
              ]
            }
          ]
        }
      ];
      compileAndDigest();

      expect(scope.model.foo.fooChild).to.eq('fooVal');
      expect(scope.model.foo.bar.barChild).to.eq('barVal');
    });
  });

  describe(`runExpressions`, () => {
    describe(`as functions`, () => {
      it(`should invoke the expressionProperties with the $viewValue, $modelValue, and scope`, () => {
        const spy = sinon.spy();
        scope.model = {
          foo: 'bar'
        };
        scope.fields = [
          getNewField({
            key: 'foo',
            expressionProperties: {
              'templateOptions.disabled': spy
            }
          })
        ];
        compileAndDigest();
        $timeout.flush(); // <-- runExpressions happens inside a $timeout
        expect(spy).to.have.been.calledWith('bar', 'bar', isolateScope);
      });
    });
  });

  describe(`templateManipulators and wrappers`, () => {
    it(`should not cause a problem when you don't pass form-options`, () => {
      const fieldScope = scope.$new();
      fieldScope.field = {template: 'foo', model: {}};
      fieldScope.fields = [fieldScope.field];
      expect(() => {
        compileAndDigest(`<div formly-field
                               class="formly-field"
                               options="field"
                               model="field.model || model"></div>`,
          fieldScope);
      }).to.not.throw();
    });

    it(`should allow you to specify a templateManipulator on a field and form basis and they should be applied in the correct order`, () => {

      formlyConfig.setWrapper({
        name: 'formWrapper1',
        template: '__formWrapper1__<formly-transclude></formly-transclude>'
      });

      formlyConfig.setWrapper({
        name: 'formWrapper2',
        template: '__formWrapper2__<formly-transclude></formly-transclude>'
      });

      formlyConfig.setWrapper({
        name: 'fieldWrapper1',
        template: '__fieldWrapper1__<formly-transclude></formly-transclude>'
      });

      formlyConfig.setWrapper({
        name: 'fieldWrapper2',
        template: '__fieldWrapper2__<formly-transclude></formly-transclude>'
      });

      const fieldPre1 = sinon.spy(template => `fieldPre1_${template}`);
      const fieldPre2 = sinon.spy(template => `fieldPre2_${template}`);
      const fieldPost1 = sinon.spy(template => `fieldPost1_${template}`);
      const fieldPost2 = sinon.spy(template => `fieldPost2_${template}`);

      const formPre1 = sinon.spy(template => `formPre1_${template}`);
      const formPre2 = sinon.spy(template => `formPre2_${template}`);
      const formPost1 = sinon.spy(template => `formPost1_${template}`);
      const formPost2 = sinon.spy(template => `formPost2_${template}`);

      const globalPre1 = sinon.spy(template => `globalPre1_${template}`);
      const globalPre2 = sinon.spy(template => `globalPre2_${template}`);
      const globalPost1 = sinon.spy(template => `globalPost1_${template}`);
      const globalPost2 = sinon.spy(template => `globalPost2_${template}`);

      formlyConfig.templateManipulators.preWrapper.push(globalPre1);
      formlyConfig.templateManipulators.preWrapper.push(globalPre2);
      formlyConfig.templateManipulators.postWrapper.push(globalPost1);
      formlyConfig.templateManipulators.postWrapper.push(globalPost2);

      scope.options = {
        templateManipulators: {
          preWrapper: [formPre1, formPre2],
          postWrapper: [formPost1, formPost2]
        },
        wrapper: ['formWrapper1', 'formWrapper2']
      };

      scope.fields = [
        getNewField({
          template: 'foo',
          wrapper: ['fieldWrapper1', 'fieldWrapper2'],
          templateManipulators: {
            preWrapper: [fieldPre1, fieldPre2],
            postWrapper: [fieldPost1, fieldPost2]
          }
        })
      ];

      compileAndDigest();

      // field pre
      expect(fieldPre1).to.have.been.calledWith('foo', field, isolateScope);
      expect(fieldPre1).to.have.returned('fieldPre1_foo');

      expect(fieldPre2).to.have.been.calledWith('fieldPre1_foo', field, isolateScope);
      expect(fieldPre2).to.have.returned('fieldPre2_fieldPre1_foo');

      // form pre
      expect(formPre1).to.have.been.calledWith('fieldPre2_fieldPre1_foo', field, isolateScope);
      expect(formPre1).to.have.returned('formPre1_fieldPre2_fieldPre1_foo');

      expect(formPre2).to.have.been.calledWith('formPre1_fieldPre2_fieldPre1_foo', field, isolateScope);
      expect(formPre2).to.have.returned('formPre2_formPre1_fieldPre2_fieldPre1_foo');

      // global pre
      expect(globalPre1).to.have.been.calledWith('formPre2_formPre1_fieldPre2_fieldPre1_foo', field, isolateScope);
      expect(globalPre1).to.have.returned('globalPre1_formPre2_formPre1_fieldPre2_fieldPre1_foo');

      expect(globalPre2).to.have.been.calledWith('globalPre1_formPre2_formPre1_fieldPre2_fieldPre1_foo', field, isolateScope);
      expect(globalPre2).to.have.returned('globalPre2_globalPre1_formPre2_formPre1_fieldPre2_fieldPre1_foo');

      // this is where the wrapper runs

      // field post
      expect(fieldPost1).to.have.been.calledWith('__formWrapper2____formWrapper1____fieldWrapper2____fieldWrapper1__globalPre2_globalPre1_formPre2_formPre1_fieldPre2_fieldPre1_foo', field, isolateScope);
      expect(fieldPost1).to.have.returned('fieldPost1___formWrapper2____formWrapper1____fieldWrapper2____fieldWrapper1__globalPre2_globalPre1_formPre2_formPre1_fieldPre2_fieldPre1_foo');

      expect(fieldPost2).to.have.been.calledWith('fieldPost1___formWrapper2____formWrapper1____fieldWrapper2____fieldWrapper1__globalPre2_globalPre1_formPre2_formPre1_fieldPre2_fieldPre1_foo', field, isolateScope);
      expect(fieldPost2).to.have.returned('fieldPost2_fieldPost1___formWrapper2____formWrapper1____fieldWrapper2____fieldWrapper1__globalPre2_globalPre1_formPre2_formPre1_fieldPre2_fieldPre1_foo');

      // form post
      expect(formPost1).to.have.been.calledWith('fieldPost2_fieldPost1___formWrapper2____formWrapper1____fieldWrapper2____fieldWrapper1__globalPre2_globalPre1_formPre2_formPre1_fieldPre2_fieldPre1_foo', field, isolateScope);
      expect(formPost1).to.have.returned('formPost1_fieldPost2_fieldPost1___formWrapper2____formWrapper1____fieldWrapper2____fieldWrapper1__globalPre2_globalPre1_formPre2_formPre1_fieldPre2_fieldPre1_foo');

      expect(formPost2).to.have.been.calledWith('formPost1_fieldPost2_fieldPost1___formWrapper2____formWrapper1____fieldWrapper2____fieldWrapper1__globalPre2_globalPre1_formPre2_formPre1_fieldPre2_fieldPre1_foo', field, isolateScope);
      expect(formPost2).to.have.returned('formPost2_formPost1_fieldPost2_fieldPost1___formWrapper2____formWrapper1____fieldWrapper2____fieldWrapper1__globalPre2_globalPre1_formPre2_formPre1_fieldPre2_fieldPre1_foo');

      // global post
      expect(globalPost1).to.have.been.calledWith('formPost2_formPost1_fieldPost2_fieldPost1___formWrapper2____formWrapper1____fieldWrapper2____fieldWrapper1__globalPre2_globalPre1_formPre2_formPre1_fieldPre2_fieldPre1_foo', field, isolateScope);
      expect(globalPost1).to.have.returned('globalPost1_formPost2_formPost1_fieldPost2_fieldPost1___formWrapper2____formWrapper1____fieldWrapper2____fieldWrapper1__globalPre2_globalPre1_formPre2_formPre1_fieldPre2_fieldPre1_foo');

      expect(globalPost2).to.have.been.calledWith('globalPost1_formPost2_formPost1_fieldPost2_fieldPost1___formWrapper2____formWrapper1____fieldWrapper2____fieldWrapper1__globalPre2_globalPre1_formPre2_formPre1_fieldPre2_fieldPre1_foo', field, isolateScope);
      expect(globalPost2).to.have.returned('globalPost2_globalPost1_formPost2_formPost1_fieldPost2_fieldPost1___formWrapper2____formWrapper1____fieldWrapper2____fieldWrapper1__globalPre2_globalPre1_formPre2_formPre1_fieldPre2_fieldPre1_foo');
    });
  });

  describe(`extras`, () => {
    describe(`validateOnModelChange`, () => {
      it(`should invoke $validate on the field even when the field's model hasn't changed`, () => {
        scope.fields = [getNewField({extras: {validateOnModelChange: true}})];
        compileAndDigest();
        const $validateSpy = sinon.spy(field.formControl, '$validate');
        scope.model.foo = 'bar';
        scope.$digest();
        $timeout.flush();
        expect($validateSpy).to.have.been.calledOnce;
      });
    });
  });

  describe(`other things`, () => {
    it(`should warn if you specify 'hide' in expressionProperties`, inject(($log) => {
      scope.fields = [getNewField({expressionProperties: {hide: 'foo'}})];
      compileAndDigest();
      const log = $log.warn.logs[0];
      expect($log.warn.logs).to.have.length(1);
      expect(log[0]).to.equal('Formly Warning:');
      expect(log[1]).to.equal(
        'You have specified `hide` in `expressionProperties`. Use `hideExpression` instead'
      );
      expect(log[2]).to.equal(field);
    }));

    it(`should add a bunch of things to the formly field and it's scope`, () => {
      scope.fields = [{template: '<input ng-model="model[options.key]" />'}];
      compileAndDigest();
      // here's a list of everything that angular-formly adds for you.
      expect(field).to.contain.all.keys([
        'key', 'extras', 'data', 'templateOptions', 'validation', 'value', 'runExpressions',
        'resetModel', 'updateInitialValue', 'id', 'name', 'initialValue', 'formControl'
      ]);
    });

    it(`should add a bunch of things to the formly field and it's scope`, () => {
      scope.fields = [{template: '<input ng-model="model[options.key]" />'}];
      compileAndDigest();
      // here's a list of everything that you have available on the scope for your templates
      expect(isolateScope).to.contain.all.keys([
        'options', 'model', 'formId', 'index', 'fields', 'formState', 'formOptions',
        'form', 'id', 'to', 'fc', 'name', 'showError'
      ]);
    });
  });

  describe(`merging of options`, () => {
    describe(`extends`, () => {
      beforeEach(() => {
        formlyConfig.setType({
          name: 'hr',
          template: '<hr />',
          defaultOptions: () => ({data: {foo: 'bar', baz: 'foobar'}})
        });
      });

      it(`should merge the options properly`, () => {
        const field = {type: 'hr', data: {baz: 'barfoo'}};
        scope.fields = [field];
        compileAndDigest();
        expect(field.data.baz).to.equal('barfoo');
        expect(field.data.foo).to.equal('bar');
      });
    });
  });

  function compileAndDigest(template = basicForm, context = scope) {
    el = $compile(template)(context);
    context.$digest();
    node = el[0];
    field = context.fields[0];
    isolateScope = getIsolateScope();
    return el;
  }

  function getIsolateScope(index = 0) {
    return angular.element(getFieldNode(index)).isolateScope();
  }

  function getFieldNode(index = 0) {
    return node.querySelectorAll('.formly-field')[index];
  }

  function getFieldNgModelNode(index = 0) {
    return getFieldNode(index).querySelector('[ng-model]');
  }

  function getNgModelCtrl(index = 0) {
    return angular.element(getFieldNgModelNode(index)).controller('ngModel');
  }
});
