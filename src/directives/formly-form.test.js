module.exports = ngModule => {
  describe('formly-form', () => {
    beforeEach(window.module(ngModule.name));


    describe('extra properties', () => {
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

      it('should warn when a field has extra properties', () => {
        scope.fields = [
          {
            type: 'text',
            extraProp: 'whatever'
          }
        ];

        expect(() => $compile(angular.element(template))(scope)).to.throw(/properties.*not.*allowed.*extraProp/);
      });
    });
  });
};
