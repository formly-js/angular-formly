const sinon = require('sinon');
module.exports = ngModule => {
  describe('formly-field', function() {
    var $compile;
    beforeEach(window.module(ngModule.name));
    beforeEach(inject(function(_$compile_) {
      $compile = _$compile_;
    }));

    describe('with template wrapper', function() {
      var scope, template;
      beforeEach(inject(function(formlyConfig, $rootScope) {
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
        scope = $rootScope.$new();
        scope.model = {};
        template = '<formly-form form="theForm" model="model" fields="fields"></formly-form>';
      }));

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
        var el = $compile(template)(scope);
        scope.$digest();
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
        var el = $compile(template)(scope);
        scope.$digest();
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
        var el = $compile(template)(scope);
        scope.$digest();
        expect(el[0].querySelector('.my-template-wrapper')).to.not.exist;
      });

    });


    describe('api check', () => {
      let scope, $compile;
      let template = '<formly-form form="theForm" model="model" fields="fields"></formly-form>';
      let validateOptions;
      beforeEach(inject((formlyConfig, $rootScope, _$compile_)  => {
        $compile = _$compile_;
        validateOptions = sinon.spy();
        formlyConfig.setType({
          name: 'text', template: `<input name="{{id}}" ng-model="model[options.key]" />`,
          validateOptions
        });
        scope = $rootScope.$new();
        scope.model = {};
      }));

      it('should throw an error when a field has extra properties', () => {
        scope.fields = [
          {
            type: 'text',
            extraProp: 'whatever'
          }
        ];
        $compile(template)(scope);

        expect(() => scope.$digest()).to.throw(/extra.*properties.*extraProp/);
      });

      it(`should invoke the validateOptions property of the type`, () => {
        const field = {type: 'text'};
        scope.fields = [field];
        $compile(template)(scope);
        scope.$digest();
        expect(validateOptions).to.have.been.calledWith(field);
      });
    });

    describe('default type options', () => {
      var scope, $compile;
      var template = '<formly-form form="theForm" model="model" fields="fields"></formly-form>';
      beforeEach(inject((_$compile_, formlyConfig, $rootScope) => {
        $compile = _$compile_;
        scope = $rootScope.$new();
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
      }));

      it('should default to the ipAddress type options', () => {
        var field = {type: 'ipAddress'};
        scope.fields = [field];
        $compile(template)(scope);
        scope.$digest();
        expect(field.data.usingDefaultOptions).to.be.true;
        expect(field.validators.ipAddress).to.be.a('function');
      });

      it('should be possible to specify defaultOptions-only types (non-template types)', () => {
        const field = {
          type: 'text', optionsTypes: ['phone', 'required'], templateOptions: {myChange: 'model.otherThing = true'}
        };
        scope.fields = [field];
        const el = $compile(template)(scope);
        scope.$digest();
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
          var manipulators, scope;
          var formTemplate = '<formly-form form="theForm" model="model" fields="fields"></formly-form>';
          var textTemplate = '<input class="text-template" name="{{id}}" ng-model="model[options.key]">';
          beforeEach(inject((formlyConfig, $rootScope) => {
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
            scope = $rootScope.$new();
            scope.model = {};
            scope.fields = [
              {type: 'text'}
            ];
          }));

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
            var el = $compile(angular.element(formTemplate))(scope);
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
      var scope, $compile, controllerFn, linkFn;
      var template = '<formly-form form="theForm" model="model" fields="fields"></formly-form>';
      beforeEach(inject((formlyConfig, $rootScope, _$compile_) => {
        $compile = _$compile_;

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
        scope = $rootScope.$new();
        scope.model = {};
      }));
      it('should run the controller function of a type', () => {
        scope.fields = [
          {type: 'text'}
        ];
        var el = $compile(template)(scope);
        scope.$digest();
        var fieldEl = angular.element(el[0].querySelector('.formly-field'));
        expect(fieldEl.isolateScope().setInTypeController).to.be.true;
      });

      it('should run the link function of a type', () => {
        scope.fields = [
          {type: 'text'}
        ];
        var el = $compile(template)(scope);
        scope.$digest();
        var fieldEl = angular.element(el[0].querySelector('.formly-field'));
        var fieldScope = fieldEl.isolateScope();
        expect(fieldScope.setInTypeLink).to.be.true;
        expect(fieldScope.el[0]).to.equal(fieldEl[0]);
      });

      it('should run the controller of the specific field', () => {
        scope.fields = [
          {template: 'sweet mercy', controller: ['$scope', controllerFn]}
        ];

        var el = $compile(template)(scope);
        scope.$digest();
        var fieldEl = angular.element(el[0].querySelector('.formly-field'));
        expect(fieldEl.isolateScope().setInTypeController).to.be.true;
      });


      it('should run the link function of a type', () => {
        scope.fields = [
          {template: 'sweet mercy', link: linkFn}
        ];
        var el = $compile(template)(scope);
        scope.$digest();
        var fieldEl = angular.element(el[0].querySelector('.formly-field'));
        var fieldScope = fieldEl.isolateScope();
        expect(fieldScope.setInTypeLink).to.be.true;
        expect(fieldScope.el[0]).to.equal(fieldEl[0]);
      });
    });

  });
};
