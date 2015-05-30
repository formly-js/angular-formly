import sinon from 'sinon';
import apiCheck from 'api-check';
import {expect} from 'chai';

import testUtils from '../test.utils.js';

const {getNewField, input, basicForm} = testUtils;

describe('formly-field', function() {
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
      var outerEl = el[0].querySelector('.my-other-template-wrapper');
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
    let validateOptions;
    beforeEach(() => {
      validateOptions = sinon.spy();
      formlyConfig.setType({
        name: 'text', template: `<input name="{{id}}" ng-model="model[options.key]" />`,
        validateOptions
      });
      scope.model = {};
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

    it(`should invoke the validateOptions property of the type`, () => {
      const field = {type: 'text'};
      scope.fields = [field];
      compileAndDigest();
      expect(validateOptions).to.have.been.calledWith(field);
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
              var value = modelValue || viewValue;
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
              expression: 'ng-change'
            }
          },
          templateOptions: {
            required: true
          }
        }
      });
    });

    it('should default to the ipAddress type options', () => {
      var field = {type: 'ipAddress'};
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
        var manipulators;
        var textTemplate = '<input class="text-template" name="{{id}}" ng-model="model[options.key]">';
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

        var when = isPre ? 'before' : 'after';

        it(`should call the manipulators when compiling a field ${when} the element is wrapped in wrappers`, () => {
          var manipulatedTemplate;
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
      var fieldEl = angular.element(el[0].querySelector('.formly-field'));
      expect(fieldEl.isolateScope().setInTypeController).to.be.true;
    });

    it('should run the link function of a type', () => {
      scope.fields = [
        {type: 'text'}
      ];
      const el = compileAndDigest();
      var fieldEl = angular.element(el[0].querySelector('.formly-field'));
      var fieldScope = fieldEl.isolateScope();
      expect(fieldScope.setInTypeLink).to.be.true;
      expect(fieldScope.el[0]).to.equal(fieldEl[0]);
    });

    it('should run the controller of the specific field', () => {
      scope.fields = [
        {template: 'sweet mercy', controller: ['$scope', controllerFn]}
      ];

      const el = compileAndDigest();
      var fieldEl = angular.element(el[0].querySelector('.formly-field'));
      expect(fieldEl.isolateScope().setInTypeController).to.be.true;
    });


    it('should run the link function of a type', () => {
      scope.fields = [
        {template: 'sweet mercy', link: linkFn}
      ];
      const el = compileAndDigest();
      var fieldEl = angular.element(el[0].querySelector('.formly-field'));
      var fieldScope = fieldEl.isolateScope();
      expect(fieldScope.setInTypeLink).to.be.true;
      expect(fieldScope.el[0]).to.equal(fieldEl[0]);
    });
  });

  describe(`template and templateUrl properties`, () => {
    let $templateCache;
    var expectedTemplateText = 'sweet mercy';

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

      var fieldEl = angular.element(el[0].querySelector('.formly-field'));
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

      var fieldEl = angular.element(el[0].querySelector('.formly-field'));
      expect(fieldEl.text()).to.equal(expectedTemplateText);
    });

    it('should allow template property to be a string', () => {
      scope.fields = [
        {template: expectedTemplateText}
      ];

      const el = compileAndDigest();

      var fieldEl = angular.element(el[0].querySelector('.formly-field'));
      expect(fieldEl.text()).to.equal(expectedTemplateText);
    });

    it('should allow template property to be an empty string', () => {
      scope.fields = [
        {template: ''},
      ];

      const el = compileAndDigest();

      var fieldEl = angular.element(el[0].querySelector('.formly-field'));
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

      var fieldEl = angular.element(el[0].querySelector('.formly-field'));
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

      var fieldEl = angular.element(el[0].querySelector('.formly-field'));
      expect(fieldEl.text()).to.equal(expectedTemplateText);
    });

    it('should allow templateUrl property to be a string', () => {
      scope.fields = [
        {templateUrl: 'templateUrlTest.html'}
      ];

      const el = compileAndDigest();

      var fieldEl = angular.element(el[0].querySelector('.formly-field'));
      expect(fieldEl.text()).to.equal(expectedTemplateText);
    });
  });

  describe(`defaultValue`, () => {
    const key = '♪┏(・o･)┛♪┗ ( ･o･) ┓♪';
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
  });

  describe(`type apiCheck`, () => {
    let type = 'input';
    beforeEach(() => {
      formlyConfig.setType({
        name: type,
        template: '<label>{{to.label}}</label><input class="{{to.className}}" ng-model="model[options.key]" />',
        apiCheck: {
          templateOptions: apiCheck.shape({
            label: apiCheck.string,
            className: apiCheck.string
          })
        },
        apiCheckInstance: apiCheck({
          output: {prefix: 'custom-api-check'}
        }),
        apiCheckOptions: {
          prefix: type + ' type checker',
          url: 'http://example.com/some-custom-url'
        }
      });
      scope.model = {};
    });

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
        /custom-api-check.*?input type checker.*?some-custom-url(.|\n)*?className/,
        compileAndDigest
      );
    });

    it(`should throw if the apiCheckFunction is set to "throw" and everything's not fine`, () => {
      formlyConfig.getType(type).apiCheckFunction = 'throw';
      scope.fields = [
        {type, templateOptions: {label: 'string'}}
      ];
      expect(compileAndDigest).to.throw(
        /custom-api-check.*?input type checker.*?some-custom-url(.|\n)*?className/
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
        apiCheck: {
          templateOptions: apiCheck.shape({
            label: apiCheck.string,
            className: apiCheck.string
          })
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
      compileAndDigestAndSetIsolateScope();
      expect(field.formControl).to.exist;
    });

    it(`should be placed onto the isolate scope for the formly-field`, () => {
      compileAndDigestAndSetIsolateScope();
      expect(isolateScope.fc).to.exist;
    });

    it(`should add a formControl even on a field with an ng-if on the ng-model`, () => {
      const template = '<input ng-model="model[options.key]" ng-if="to.if" />';
      const field = {template, templateOptions: {if: false}};
      scope.fields = [field];
      compileAndDigestAndSetIsolateScope();
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
      compileAndDigestAndSetIsolateScope();
      expect(isolateScope.fc).to.exist;
    });

    describe(`noFormControl`, () => {
      it(`should skip adding the formControl if set to true`, () => {
        scope.fields = [{template: input, noFormControl: true}];
        compileAndDigestAndSetIsolateScope();
        expect(isolateScope.fc).to.not.exist;
      });

    });

    describe(`name`, () => {
      it(`should be almost random`, () => {
        compileAndDigestAndSetIsolateScope();
        expect(field.formControl.$name).to.match(/formly_\d+_template_.*?_\d+/);
      });

      it(`should be overrideable when a different name is specified`, () => {
        scope.fields[0].template = `<input ng-model="model[options.key]" name="myCustomName" />`;
        compileAndDigestAndSetIsolateScope();
        makeNameExpectations('myCustomName');
      });

      it(`should handle interpolated names`, () => {
        scope.fields[0].template = `<input ng-model="model[options.key]" name="{{'myCustomName'}}" />`;
        compileAndDigestAndSetIsolateScope();
        makeNameExpectations('myCustomName');
      });

      function makeNameExpectations(name) {
        expect(field.formControl).to.exist;
        expect(isolateScope.fc).to.exist;
        expect(field.formControl.$name).to.eq(name);
        expect(scope.theForm).to.have.property(name);
      }

    });
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
  });

  describe(`with a div ng-model`,() => {
    it(`should have a form-controller`, () => {
      const template = `<div ng-model="model[options.key]"> </div>`;
      scope.fields = [getNewField({template: template})];
      compileAndDigestAndSetIsolateScope();
      expect(isolateScope.fc).to.exist;
      expect(field.formControl).to.exist;
    });
  });

  describe(`with a div data-ng-model`,() => {
    it(`should have a form-controller`, () => {
      const template = `<div data-ng-model="model[options.key]"> </div>`;
      scope.fields = [getNewField({template: template})];
      compileAndDigestAndSetIsolateScope();
      expect(isolateScope.fc).to.exist;
      expect(field.formControl).to.exist;
    });
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

  });

  describe(`with specified "model" property`, () => {

    it.skip(`should use the specified model for the field which specifies it`, () => {
      const model = {
        foo: 'bar'
      };
      scope.fields = [
        getNewField({model, key: 'foo'}),
        getNewField(),
        getNewField()
      ];

      compileAndDigestAndSetIsolateScope();
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
        getNewField({key: 'foobar', model: 'options.data.foo', data: {foo: { bar: 'foobar'}}})
      ];

      compileAndDigestAndSetIsolateScope();
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

  });

  describe(`fieldGroup with specified "key" property`, () => {
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
        compileAndDigestAndSetIsolateScope();
        $timeout.flush(); // <-- runExpressions happens inside a $timeout
        expect(spy).to.have.been.calledWith('bar', 'bar', isolateScope);
      });
    });
  });

  function compileAndDigest(template) {
    el = $compile(template || basicForm)(scope);
    scope.$digest();
    node = el[0];
    field = scope.fields[0];
    return el;
  }

  function compileAndDigestAndSetIsolateScope() {
    compileAndDigest();
    isolateScope = getIsolateScope();
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


  function shouldWarn(match, test) {
    var originalWarn = console.warn;
    var calledArgs;
    console.warn = function() {
      calledArgs = arguments;
    };
    test();
    expect(calledArgs[0]).to.match(match);
    console.warn = originalWarn;
  }

  function shouldNotWarn(test) {
    var originalWarn = console.warn;
    var callCount = 0;
    console.warn = () => callCount++;
    test();
    expect(callCount).to.equal(0);
    console.warn = originalWarn;
  }
});
