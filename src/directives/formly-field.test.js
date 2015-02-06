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
                <label for="{{::id}}">{{options.label}}</label>
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
          name: 'text', template: `<input name="{{::id}}" ng-model="model[options.key]" />`
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
        var el = $compile(angular.element(template))(scope);
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
        var el = $compile(angular.element(template))(scope);
        scope.$digest();
        var outerEl = el[0].querySelector('.my-other-template-wrapper');
        expect(outerEl).to.exist;
        expect(outerEl.querySelector('.my-template-wrapper')).to.exist;
      });

    });


    describe('api check', () => {
      var scope, template, $compile;
      beforeEach(inject((formlyConfig, $rootScope, _$compile_)  => {
        $compile = _$compile_;
        formlyConfig.setType({
          name: 'text', template: `<input name="{{::id}}" ng-model="model[options.key]" />`
        });
        scope = $rootScope.$new();
        scope.model = {};
        template = '<formly-form form="theForm" model="model" fields="fields"></formly-form>';
      }));

      it('should throw an error when a field has extra properties', () => {
        scope.fields = [
          {
            type: 'text',
            extraProp: 'whatever'
          }
        ];
        $compile(angular.element(template))(scope);

        expect(() => scope.$digest()).to.throw(/properties.*not.*allowed.*extraProp/);
      });
    });


    describe('templateManipulators', () => {
      testTemplateManipulators(true);
      testTemplateManipulators(false);

      function testTemplateManipulators(isPre) {
        describe(isPre ? 'preWrapper' : 'postWrapper', () => {
          var manipulators, scope;
          var formTemplate = '<formly-form form="theForm" model="model" fields="fields"></formly-form>';
          var textTemplate = '<input name="{{::id}}" ng-model="model[options.key]">';
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
                expect(textTemplate).to.equal(templateToManipulate);
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

  });
};
