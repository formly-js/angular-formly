import {extendFunction, startsWith} from './utils.js'

describe(`utils`, () => {

  describe(`extendFunction`, () => {
    let fn1, fn2, fn3
    beforeEach(() => {
      fn1 = sinon.spy()
      fn2 = sinon.spy()
      fn3 = sinon.spy()
    })

    it(`should call all functions with the given`, () => {
      const extended = extendFunction(fn1, fn2)
      extended('foo')

      expect(fn1).to.have.been.calledWith('foo')
    })
  })

  describe(`startsWith`, () => {
    it(`should return true if a string has a given prefix`, () => {
      expect(startsWith('fooBar', 'foo')).to.be.true
    })

    it(`should return false if a string does not have a given prefix`, () => {
      expect(startsWith('fooBar', 'nah')).to.be.false
    })

    it(`should return false if no a string`, () => {
      expect(startsWith(undefined, 'foo')).to.be.false
      expect(startsWith(5, 'foo')).to.be.false
      expect(startsWith('foo', undefined)).to.be.false
      expect(startsWith('foo', 5)).to.be.false
      expect(startsWith(undefined, undefined)).to.be.false
    })
  })
})
