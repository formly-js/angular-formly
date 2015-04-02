module.exports = ngModule => {
  describe('formly-form', () => {
    let $compile, scope;

    beforeEach(window.module(ngModule.name));
    beforeEach(inject((_$compile_, $rootScope) => {
      $compile = _$compile_;
      scope = $rootScope.$new();
    }));

    it('should use ng-form as the default root tag', () => {
      const el = compileAndDigest('<formly-form form="theForm"></formly-form>');
      expect(el.length).to.equal(1);
      expect(el.prop('nodeName').toLowerCase()).to.equal('ng-form');
    });

    it('should use a different root tag when specified', () => {
      const el = compileAndDigest('<formly-form form="theForm" root-el="form"></formly-form>');
      expect(el.length).to.equal(1);
      expect(el.prop('nodeName').toLowerCase()).to.equal('form');
    });

    it(`should not allow sibling forms to override each other on a parent form`, () => {
      const el = compileAndDigest(`
        <form name="parent">
          <formly-form form="form1"></formly-form>
          <formly-form form="form2"></formly-form>
        </form>
      `);
      var scope = el.scope();
      expect(scope.parent).to.have.property('formly_1');
      expect(scope.parent).to.have.property('formly_2');
    });

    function compileAndDigest(template) {
      const el = $compile(template)(scope);
      scope.$digest();
      return el;
    }

  });
};
