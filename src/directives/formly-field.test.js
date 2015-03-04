const sinon = require('sinon');
const apiCheck = require('api-check');
module.exports = ngModule => {
  describe('formly-field', function() {
    let $compile, scope, formlyConfig;
    let template = '<formly-form form="theForm" model="model" fields="fields"></formly-form>';
    beforeEach(window.module(ngModule.name));
    beforeEach(inject((_$compile_, $rootScope, _formlyConfig_) => {
      $compile = _$compile_;
      scope = $rootScope.$new();
      formlyConfig = _formlyConfig_;
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
            var el = $compile(angular.element(template))(scope);
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
          /custom-api-check.*?input type checker.*?className.*?some-custom-url/,
          compileAndDigest
        );
      });

      it(`should throw if the apiCheckFunction is set to "throw" and everything's not fine`, () => {
        formlyConfig.getType(type).apiCheckFunction = 'throw';
        scope.fields = [
          {type, templateOptions: {label: 'string'}}
        ];
        expect(compileAndDigest).to.throw(
          /custom-api-check.*?input type checker.*?className.*?some-custom-url/
        );
      });
    });

    describe(`wrapper apiCheck`, () => {
      const name = 'input';
      const template = '<input ng-model="model[options.key]" />';
      const wrapper = name;
      beforeEach(() => {
        formlyConfig.setWrapper({
          name,
          template:
            '<div class="to.className"><label>{{to.label}}</label><formly-transclude></formly-transclude></div>',
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
      });

      it(`should not warn if everything's fine`, () => {
        scope.fields = [
          {template, wrapper, templateOptions: {label: 'string', className: 'string'}}
        ];
        shouldNotWarn(compileAndDigest);
      });

      it(`should warn if everything's not fine`, () => {
        scope.fields = [
          {template, wrapper, templateOptions: {label: 'string'}}
        ];
        shouldWarn(/custom-api-check.*?formly-field.*?className/, compileAndDigest);
      });

      it(`should throw if the apiCheckFunction is set to "throw" and everything's not fine`, () => {
        formlyConfig.getWrapper(name).apiCheckFunction = 'throw';
        scope.fields = [
          {template, wrapper, templateOptions: {label: 'string'}}
        ];
        expect(compileAndDigest).to.throw(/custom-api-check.*?formly-field.*?className/);
      });
    });

    function compileAndDigest() {
      const el = $compile(template)(scope);
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
};
