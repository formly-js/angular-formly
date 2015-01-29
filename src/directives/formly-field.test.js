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
        formlyConfig.setTemplateWrapper({
          template: `
            <div class="my-template-wrapper">
              <label for="{{::id}}">{{options.label}}</label>
              <formly-transclude></formly-transclude>
              <div>
                Some sweet post-text stuff
              </div>
            </div>
          `,
          types: 'text'
        });
        formlyConfig.setTemplate({
          text: `
            <input name="{{::id}}" ng-model="model[options.key]" />
          `
        });
        scope = $rootScope.$new();
        scope.model = {};
        template = '<formly-form form="theForm" model="model" fields="fields"></formly-form>';
      }));
      it('should take the entire wrapper, not just the contents of the wrapper', function() {
        scope.fields = [
          {
            type: 'text',
            label: 'Text input',
            key: 'text'
          }
        ];
        var el = $compile(angular.element(template))(scope);
        scope.$digest();
        expect(el[0].querySelector('.my-template-wrapper')).to.exist;
      });

    });
  });
};
