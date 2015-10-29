
describe('formlyUtil', () => {
  beforeEach(window.module('formly'))

  describe('reverseDeepMerge', () => {
    let merge
    beforeEach(inject(function(formlyUtil) {
      merge = formlyUtil.reverseDeepMerge
    }))

    it(`should modify and prefer the first object`, () => {
      const firstObj = {
        obj1a: {
          obj2a: {
            string3a: 'Hello world',
            number3a: 4,
            bool3a: false,
          },
        },
        arry1a: [
          1, 2, 3, 4,
        ],
      }
      const secondObj = {
        obj1a: {
          obj2a: {
            string3a: 'Should not win',
            string3b: 'Should exist',
            number3a: 5,
            bool3a: true,
            bool3b: false,
          },
        },
      }

      const thirdObj = {
        obj1a: 'false',
        arry1a: [
          4, 3, 2, 1, 0,
        ],
      }

      const result = {
        obj1a: {
          obj2a: {
            string3a: 'Hello world',
            string3b: 'Should exist',
            number3a: 4,
            bool3a: false,
            bool3b: false,
          },
        },
        arry1a: [
          1, 2, 3, 4, 0,
        ],
      }

      merge(firstObj, secondObj, thirdObj)
      expect(firstObj).to.eql(result)
    })

    it(`should allow for adding of empty objects`, () => {
      const firstObj = {
        a: 'a',
        b: 'b',
      }

      const secondObj = {
        data: {},
        templateOptions: {},
        validation: {},
      }

      const result = {
        a: 'a',
        b: 'b',
        data: {},
        templateOptions: {},
        validation: {},
      }

      merge(firstObj, secondObj)
      expect(firstObj).to.eql(result)
    })
  })

  describe('findByNodeName', () => {
    let find, $compile, scope
    beforeEach(inject(function(_$compile_, $rootScope, formlyUtil) {
      $compile = _$compile_
      scope = $rootScope
      find = formlyUtil.findByNodeName
    }))

    it('should find an element by nodeName from a single root', () => {
      const template =
        '<div><form><input></form></div>'
      const el = $compile(template)(scope)
      const found = find(el, 'input')
      expect(found.length).to.equal(1)
      expect(found.prop('nodeName')).to.equal('INPUT')
    })

    it('should find an element by nodeName from multiple root', () => {
      const template =
        '<div><form><input></form></div>' +
        '<span><a><i></i></a>'
      const el = $compile(template)(scope)
      const found = find(el, 'i')
      expect(found.length).to.equal(1)
      expect(found.prop('nodeName')).to.equal('I')
    })

    it('should return undefined when a node can\'t be found', () => {
      const template =
        '<div><form><input></form></div>'
      const el = $compile(template)(scope)
      const found = find(el, 'bla')
      expect(found).to.be.undefined
    })

  })
})
