import sinon from 'sinon';
import apiCheck from 'api-check';
import {expect} from 'chai';

describe('formly-field', function() {
  let $compile, scope, el, formlyConfig, $q;
  const formTemplate = '<formly-form form="theForm" model="model" fields="fields"></formly-form>';
  const inputTemplate = '<input ng-model="model[options.key]" />';

  beforeEach(window.module('formly'));
  beforeEach(inject((_$compile_, $rootScope, _formlyConfig_, _$q_) => {
    $compile = _$compile_;
    scope = $rootScope.$new();
    formlyConfig = _formlyConfig_;
    $q = _$q_;
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
        {template: inputTemplate, key, defaultValue}
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
        {template: inputTemplate, wrapper, templateOptions: {}}
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
    let isolateScope, field;

    beforeEach(() => {
      scope.fields = [{template: inputTemplate}];
    });

    it(`should be placed onto field's options`, () => {
      compileAndDigestAndSetIsolateScope();
      expect(field.formControl).to.exist;
    });

    it(`should be placed onto the isolate scope for the formly-field`, () => {
      compileAndDigestAndSetIsolateScope();
      expect(isolateScope.fc).to.exist;
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


    function compileAndDigestAndSetIsolateScope() {
      compileAndDigest();
      isolateScope = angular.element(el[0].querySelector('.formly-field')).isolateScope();
      field = scope.fields[0];
    }

  });

  function compileAndDigest(template) {
    el = $compile(template || formTemplate)(scope);
    scope.$digest();
    return el;
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
