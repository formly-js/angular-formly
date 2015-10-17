import angular from 'angular';

describe(`formlyCustomTags`, () => {

  beforeEach(window.module(`formly`, $provide => {
    const docStub = {
      get: sinon.stub().withArgs(0).returnsThis(),
      createElement: sinon.stub().withArgs(`div`).returns({
        getElementsByTagName: sinon.stub().withArgs(`i`).returns([1])
      })
    };

    $provide.value(`$document`, docStub);
  }));

  let $document;

  beforeEach(inject((_$document_) => {
    $document = _$document_;
  }));

  describe(`addCustomTags`, () => {
    it(`should create custom formly tags`, () => {
      const customElements = [
        `div`, `formly-field`, `formly-form`, `formly-custom-validation`, `formly-focus`, `formly-transpose`
      ];

      expect($document.get).to.have.been.calledOnce;

      angular.forEach(customElements, el => {
        expect($document.createElement).to.have.been.calledWith(el);
      });
    });
  });
});
