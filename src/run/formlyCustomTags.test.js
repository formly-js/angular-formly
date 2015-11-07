import angular from 'angular'

describe(`formlyCustomTags`, () => {

  beforeEach(window.module(`formly`, $provide => {
    $provide.value(`$document`, {
      documentMode: 8,
      get: sinon.stub().withArgs(0).returnsThis(),
      createElement: sinon.spy(),
    })
  }))

  let $document

  beforeEach(inject((_$document_) => {
    $document = _$document_
  }))

  describe(`addCustomTags`, () => {
    it(`should create custom formly tags`, () => {
      const customElements = [
        `formly-field`, `formly-form`,
      ]

      expect($document.get).to.have.been.calledOnce

      angular.forEach(customElements, el => {
        expect($document.createElement).to.have.been.calledWith(el)
      })
    })
  })
})
