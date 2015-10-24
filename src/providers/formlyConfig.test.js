/* eslint max-len:0 */
/* eslint max-nested-callbacks:0 */
/* eslint no-shadow:0 */
/* eslint no-console:0 */
/* eslint no-unused-vars:0 */
import angular from 'angular-fix'
import testUtils from '../test.utils.js'

const {getNewField, basicForm, shouldWarn, shouldNotWarn} = testUtils

describe('formlyConfig', () => {
  beforeEach(window.module('formly'))

  let formlyConfig

  beforeEach(inject((_formlyConfig_) => {
    formlyConfig = _formlyConfig_
  }))

  describe('setWrapper/getWrapper', () => {
    let getterFn, setterFn, $log
    const template = '<span>This is my <formly-transclude></formly-transclude> template'
    const templateUrl = '/path/to/my/template.html'
    const typesString = 'checkbox'
    const types = ['text', 'textarea']
    const name = 'hi'
    const name2 = 'name2'
    const template2 = template + '2'
    beforeEach(inject(function(_$log_) {
      getterFn = formlyConfig.getWrapper
      setterFn = formlyConfig.setWrapper
      $log = _$log_
    }))

    describe('＼(＾O＾)／ path', () => {
      describe('the default template', () => {

        it('can be a string without a name', () => {
          setterFn(template)
          expect(getterFn()).to.eql({name: 'default', template, types: []})
        })

        it('can be a string with a name', () => {
          setterFn(template, name)
          expect(getterFn(name)).to.eql({name, template, types: []})
        })

        it('can be an object with a template', () => {
          setterFn({template})
          expect(getterFn()).to.eql({name: 'default', template, types: []})
        })

        it('can be an object with a template and a name', () => {
          setterFn({template, name})
          expect(getterFn(name)).to.eql({name, template, types: []})
        })

        it('can be an object with a templateUrl', () => {
          setterFn({templateUrl})
          expect(getterFn()).to.eql({name: 'default', templateUrl, types: []})
        })

        it('can be an object with a templateUrl and a name', () => {
          setterFn({name, templateUrl})
          expect(getterFn(name)).to.eql({name, templateUrl, types: []})
        })

        it('can be an array of objects with names, urls, and/or templates', () => {
          setterFn([
            {templateUrl},
            {name, template},
            {name: name2, template: template2},
          ])
          expect(getterFn()).to.eql({templateUrl, name: 'default', types: []})
          expect(getterFn(name)).to.eql({template, name, types: []})
          expect(getterFn(name2)).to.eql({template: template2, name: name2, types: []})
        })

        it('can specify types as a string (using types as the name when not specified)', () => {
          setterFn({types: typesString, template})
          expect(getterFn(typesString)).to.eql({template, name: typesString, types: [typesString]})
        })

        it('can specify types as an array (using types as the name when not specified)', () => {
          setterFn({types, template})
          expect(getterFn(types.join(' '))).to.eql({template, name: types.join(' '), types})
        })
      })
    })

    describe('(◞‸◟；) path', () => {
      it('should throw an error when providing both a template and templateUrl', () => {
        expect(() => setterFn({template, templateUrl}, name)).to.throw(/`template` must be `ifNot\[templateUrl]`/i)
      })

      it('should throw an error when the template does not use formly-transclude', () => {
        const error = /templates.*?must.*?<formly-transclude><\/formly-transclude>/
        expect(() => setterFn({template: 'no formly-transclude'})).to.throw(error)
      })

      it('should throw an error when specifying an array type where not all items are strings', () => {
        const error = /types.*?typeOrArrayOf.*?String.*?/i
        expect(() => setterFn({template, types: ['hi', 2, false, 'cool']})).to.throw(error)
      })

      it('should warn when attempting to override a template wrapper', () => {
        shouldWarn(/overwrite/, function() {
          setterFn({template})
          setterFn({template})
        })
      })

      it('should not warn when attempting to override a template wrapper if overwriteOk is true', () => {
        shouldNotWarn(() => {
          setterFn({template})
          setterFn({template, overwriteOk: true})
        })
      })
    })


    describe(`apiCheck`, () => {
      testApiCheck('setWrapper', 'getWrapper')
    })

  })

  describe('getWrapperByType', () => {
    let getterFn, setterFn
    const types = ['input', 'checkbox']
    const types2 = ['input', 'select']
    const templateUrl = '/path/to/file.html'
    beforeEach(inject(function(formlyConfig) {
      setterFn = formlyConfig.setWrapper
      getterFn = formlyConfig.getWrapperByType
    }))

    describe('＼(＾O＾)／ path', () => {
      it('should return a template wrapper that has the same type', () => {
        const option = setterFn({templateUrl, types})
        expect(getterFn(types[0])).to.eql([option])
      })

      it('should return an array when multiple wrappers have the same time', () => {
        setterFn({templateUrl, types})
        setterFn({templateUrl, types: types2})
        const inputWrappers = getterFn('input')
        expect(inputWrappers).to.be.instanceOf(Array)
        expect(inputWrappers).to.have.length(2)
      })

    })
  })

  describe('removeWrapper', () => {
    let remove, removeForType, setterFn, getterFn, getByTypeFn
    const template = '<div>Something <formly-transclude></formly-transclude> cool</div>'
    const name = 'name'
    const types = ['input', 'checkbox']
    const types2 = ['input', 'something else']
    const types3 = ['checkbox', 'something else']
    beforeEach(inject((formlyConfig) => {
      remove = formlyConfig.removeWrapperByName
      removeForType = formlyConfig.removeWrappersForType
      setterFn = formlyConfig.setWrapper
      getterFn = formlyConfig.getWrapper
      getByTypeFn = formlyConfig.getWrapperByType
    }))

    it('should allow you to remove a wrapper', () => {
      setterFn(template, name)
      remove(name)
      expect(getterFn(name)).to.be.empty
    })

    it('should allow you to remove a wrapper for a type', () => {
      setterFn({types, template})
      setterFn({types: types2, template})
      const checkboxAndSomethingElseWrapper = setterFn({types: types3, template})
      removeForType('input')
      expect(getByTypeFn('input')).to.be.empty
      const checkboxWrappers = getByTypeFn('checkbox')
      expect(checkboxWrappers).to.eql([checkboxAndSomethingElseWrapper])
    })
  })


  describe('setType/getType', () => {
    let getterFn, setterFn
    const name = 'input'
    const template = '<input type="{{options.inputType}}" />'
    const templateUrl = '/input.html'
    const wrapper = 'input'
    const wrapper2 = 'input2'
    beforeEach(inject(function(formlyConfig) {
      getterFn = formlyConfig.getType
      setterFn = formlyConfig.setType
    }))

    describe('＼(＾O＾)／ path', () => {
      it('should accept an object with a name and a template', () => {
        setterFn({name, template})
        expect(getterFn(name).template).to.equal(template)
      })

      it('should accept an object with a name and a templateUrl', () => {
        setterFn({name, templateUrl})
        expect(getterFn(name).templateUrl).to.equal(templateUrl)
      })

      it('should accept an array of objects', () => {
        setterFn([
          {name, template},
          {name: 'type2', templateUrl},
        ])
        expect(getterFn(name).template).to.equal(template)
        expect(getterFn('type2').templateUrl).to.equal(templateUrl)
      })

      it('should allow you to set a wrapper as a string', () => {
        setterFn({name, template, wrapper})
        expect(getterFn(name).wrapper).to.equal(wrapper)
      })

      it('should allow you to set a wrapper as an array', () => {
        setterFn({name, template, wrapper: [wrapper, wrapper2]})
        expect(getterFn(name).wrapper).to.eql([wrapper, wrapper2])
      })

      describe(`extends`, () => {
        describe(`object case`, () => {
          beforeEach(() => {
            setterFn([
              {
                name,
                template,
                defaultOptions: {
                  templateOptions: {
                    required: true,
                    min: 3,
                  },
                },
              },
              {
                name: 'type2',
                extends: name,
                defaultOptions: {
                  templateOptions: {
                    required: false,
                    max: 4,
                  },
                  data: {
                    extraStuff: [1, 2, 3],
                  },
                },
              },
            ])
          })
          it(`should inherit all fields that it does not have itself`, () => {
            expect(getterFn('type2').template).to.eql(template)
          })

          it(`should merge objects that it shares`, () => {
            expect(getterFn('type2').defaultOptions).to.eql({
              templateOptions: {
                required: false,
                min: 3,
                max: 4,
              },
              data: {
                extraStuff: [1, 2, 3],
              },
            })
          })

          it(`should not error when extends is specified without a template, templateUrl, or defaultOptions`, () => {
            expect(() => setterFn({name: 'type3', extends: 'type2'})).to.not.throw()
          })

        })

        describe(`template/templateUrl Cases`, () => {
          it('should use templateUrl if type defines it and its parent has template defined', function() {
            setterFn([
              {
                name,
                template,
              },
              {
                name: 'type2',
                extends: name,
                templateUrl,
              },
            ])

            expect(getterFn('type2').templateUrl).not.to.be.undefined
            expect(getterFn('type2').template).to.be.undefined
          })

          it('should use template if type defines it and its parent had templateUrl defined', function() {
            setterFn([
              {
                name,
                templateUrl,
              },
              {
                name: 'type2',
                extends: name,
                template,
              },
            ])

            expect(getterFn('type2').template).not.to.be.undefined
            expect(getterFn('type2').templateUrl).to.be.undefined
          })
        })

        describe(`function cases`, () => {
          let args, fakeScope, parentFn, childFn, parentDefaultOptions, childDefaultOptions, argsAndParent
          beforeEach(() => {
            args = {data: {someData: true}}
            fakeScope = {}
            parentDefaultOptions = {
              data: {extraOptions: true},
              templateOptions: {placeholder: 'hi'},
            }
            childDefaultOptions = {
              templateOptions: {placeholder: 'hey', required: true},
            }
            parentFn = sinon.stub().returns(parentDefaultOptions)
            childFn = sinon.stub().returns(childDefaultOptions)
            argsAndParent = {
              data: {someData: true, extraOptions: true},
              templateOptions: {placeholder: 'hi'},
            }
          })

          it(`should call the extended parent's defaultOptions function and its own defaultOptions function`, () => {
            setterFn([
              {name, defaultOptions: parentFn},
              {name: 'type2', extends: name, defaultOptions: childFn},
            ])
            getterFn('type2').defaultOptions(args, fakeScope)
            expect(parentFn).to.have.been.calledWith(args, fakeScope)
            expect(childFn).to.have.been.calledWith(argsAndParent, fakeScope)
          })

          it(`should call the extended parent's defaultOptions function when it doesn't have one of its own`, () => {
            setterFn([
              {name, defaultOptions: parentFn},
              {name: 'type2', extends: name},
            ])
            getterFn('type2').defaultOptions(args, fakeScope)
            expect(parentFn).to.have.been.calledWith(args, fakeScope)
          })

          it(`should call its own defaultOptions function when the parent doesn't have one`, () => {
            setterFn([
              {name, template},
              {name: 'type2', extends: name, defaultOptions: childFn},
            ])
            getterFn('type2').defaultOptions(args, fakeScope)
            expect(childFn).to.have.been.calledWith(args, fakeScope)
          })

          it(`should extend its defaultOptions object with the parent's defaultOptions object`, () => {
            const objectMergedDefaultOptions = {
              data: {extraOptions: true},
              templateOptions: {placeholder: 'hey', required: true},
            }
            setterFn([
              {name, defaultOptions: parentDefaultOptions},
              {name: 'type2', extends: name, defaultOptions: childDefaultOptions},
            ])
            expect(getterFn('type2').defaultOptions).to.eql(objectMergedDefaultOptions)
          })

          it(`should call its defaultOptions with the parent's defaultOptions object merged with the given args`, () => {
            setterFn([
              {name, defaultOptions: parentDefaultOptions},
              {name: 'type2', extends: name, defaultOptions: childFn},
            ])
            const returned = getterFn('type2').defaultOptions(args, fakeScope)
            expect(childFn).to.have.been.calledWith(argsAndParent, fakeScope)
            expect(returned).to.eql(childDefaultOptions)
          })
        })

        describe(`link functions`, () => {
          let linkArgs, parentFn, childFn
          beforeEach(inject(($rootScope) => {
            linkArgs = [$rootScope.$new(), angular.element('<div></div>'), {}]
            parentFn = sinon.spy()
            childFn = sinon.spy()
          }))

          it(`should call the parent link function when there is no child function`, () => {
            setterFn([
              {name, template, link: parentFn},
              {name: 'type2', extends: name},
            ])
            getterFn('type2').link(...linkArgs)
            expect(parentFn).to.have.been.calledWith(...linkArgs)
          })

          it(`should call the child link function when there is no parent function`, () => {
            setterFn([
              {name, template},
              {name: 'type2', extends: name, link: childFn},
            ])
            getterFn('type2').link(...linkArgs)
            expect(childFn).to.have.been.calledWith(...linkArgs)
          })

          it(`should call the child link function and the parent link function when they are both present`, () => {
            setterFn([
              {name, template, link: parentFn},
              {name: 'type2', extends: name, link: childFn},
            ])
            getterFn('type2').link(...linkArgs)
            expect(parentFn).to.have.been.calledWith(...linkArgs)
            expect(childFn).to.have.been.calledWith(...linkArgs)
          })

        })

        describe(`controller functions`, () => {
          let parentFn, childFn, $controller, $scope
          beforeEach(inject(($rootScope, _$controller_) => {
            $scope = $rootScope.$new()
            $controller = _$controller_
            parentFn = sinon.spy()
            parentFn.$inject = ['$log']
            childFn = sinon.spy()
            childFn.$inject = ['$http']
          }))

          it(`should call the parent controller function when there is no child controller function`, inject(($log) => {
            setterFn([
              {name, template, controller: parentFn},
              {name: 'type2', extends: name},
            ])
            $controller(getterFn('type2').controller, {$scope})
            expect(parentFn).to.have.been.calledWith($log)
          }))

          it(`should call the parent controller function and the child's when there is a child controller function`, inject(($log, $http) => {
            setterFn([
              {name, template, controller: parentFn},
              {name: 'type2', extends: name, controller: childFn},
            ])
            $controller(getterFn('type2').controller, {$scope})
            expect(parentFn).to.have.been.calledWith($log)
            expect(childFn).to.have.been.calledWith($http)
          }))

          it(`should call the child controller function when there's no parent controller`, inject(($http) => {
            setterFn([
              {name, template},
              {name: 'type2', extends: name, controller: childFn},
            ])
            $controller(getterFn('type2').controller, {$scope})
            expect(childFn).to.have.been.calledWith($http)
          }))

        })
      })
    })

    describe('(◞‸◟；) path', () => {
      it('should throw an error when the first argument is not an object or an array', () => {
        expect(() => setterFn('string')).to.throw(/must.*provide.*object.*array/)
        expect(() => setterFn(324)).to.throw(/must.*provide.*object.*array/)
        expect(() => setterFn(false)).to.throw(/must.*provide.*object.*array/)
      })

      it('should throw an error when a name is not provided', () => {
        expect(() => setterFn({templateUrl})).to.throw(/formlyConfig\.setType/)
      })

      it(`should throw an error when specifying both a template and a templateUrl`, () => {
        expect(() => setterFn({name, template, templateUrl})).to.throw(/formlyConfig\.setType/)
      })

      it(`should throw an error when an extra property is provided`, () => {
        expect(() => setterFn({name, templateUrl, extra: true})).to.throw(/formlyConfig\.setType/)
      })

      it('should warn when attempting to override a type', () => {
        shouldWarn(/overwrite/, function() {
          setterFn({name, template})
          setterFn({name, template})
        })
      })
    })

    describe(`apiCheck`, () => {
      testApiCheck('setType', 'getType')
    })
  })

  function testApiCheck(setterName, getterName) {
    const template = 'something with <formly-transclude></formly-transclude>'
    const name = 'input'
    let setterFn, getterFn, formlyApiCheck
    beforeEach(inject((_formlyApiCheck_, formlyConfig) => {
      formlyApiCheck = _formlyApiCheck_
      setterFn = formlyConfig[setterName]
      getterFn = formlyConfig[getterName]
    }))

    it(`should allow you to specify an apiCheck function that will be used to validate your options`, () => {
      expect(() => {
        setterFn({
          name,
          apiCheck,
          template,
        })
      }).to.not.throw()

      expect(getterFn(name).apiCheck).to.equal(apiCheck)

      function apiCheck() {
        return {
          templateOptions: {},
          data: {},
        }
      }
    })

    describe(`apiCheckInstance`, () => {
      let apiCheckInstance
      beforeEach(() => {
        apiCheckInstance = require('api-check')()
      })
      it(`should allow you to specify an instance of your own apiCheck so messaging will be custom`, () => {
        expect(() => {
          setterFn({name, apiCheck, apiCheckInstance, template})
        }).to.not.throw()
        expect(getterFn(name).apiCheckInstance).to.equal(apiCheckInstance)
      })
      it(`should throw an error if you specify an instance without specifying an apiCheck`, () => {
        expect(() => {
          setterFn({name, apiCheckInstance, template})
        }).to.throw()
      })

      function apiCheck() {
        return {
          templateOptions: {},
          data: {},
        }
      }
    })

    describe(`apiCheckFunction`, () => {
      it(`should allow you to specify warn or throw as the `, () => {
        expect(() => {
          setterFn({name, apiCheck, apiCheckFunction: 'warn', template})
        }).to.not.throw()
        expect(getterFn(name).apiCheckFunction).to.equal('warn')
        expect(() => {
          setterFn({name: 'name2', apiCheck, apiCheckFunction: 'throw', template})
        }).to.not.throw()
        expect(getterFn('name2').apiCheckFunction).to.equal('throw')
      })

      it(`should throw an error if you specify anything other than warn or throw`, () => {
        expect(() => {
          setterFn({name, apiCheckFunction: 'other', template})
        }).to.throw()
      })

      function apiCheck() {
        return {
          templateOptions: {},
          data: {},
        }
      }
    })
  }


  describe(`extras`, () => {

    describe(`that impact field rendering`, () => {

      let scope, $compile, el, field

      beforeEach(inject(($rootScope, _$compile_) => {
        scope = $rootScope.$new()
        $compile = _$compile_
        scope.fields = [{template: '<input ng-model="model[options.key]" />'}]
      }))

      describe(`defaultHideDirective`, () => {

        it(`should default formly-form to use ng-if when not specified`, () => {
          compileAndDigest(`
            <formly-form fields="fields" model="model"></formly-form>
          `)
          const fieldNode = getFieldNode()
          expect(fieldNode.getAttribute('ng-if')).to.exist
        })

        it(`should default formly-form to use the specified directive for hiding and showing`, () => {
          formlyConfig.extras.defaultHideDirective = 'ng-show'
          compileAndDigest(`
            <formly-form fields="fields" model="model"></formly-form>
          `)
          const fieldNode = getFieldNode()
          expect(fieldNode.getAttribute('ng-show')).to.exist
        })

        it(`should be overrideable on a per-form basis`, () => {
          formlyConfig.extras.defaultHideDirective = '(╯°□°)╯︵ ┻━┻'
          compileAndDigest(`
            <formly-form fields="fields" model="model" hide-directive="ng-show"></formly-form>
          `)
          const fieldNode = getFieldNode()
          expect(fieldNode.getAttribute('ng-show')).to.exist
          expect(fieldNode.getAttribute('(╯°□°)╯︵ ┻━┻')).to.not.exist
        })

      })

      describe(`getFieldId`, () => {
        it(`should allow you to specify your own function for generating the IDs for a field`, () => {
          scope.fields = [
            getNewField({id: 'custom'}),
            getNewField({model: {foo: 'bar', id: '1234'}, key: 'foo'}),
            getNewField({key: 'bar'}),
          ]
          formlyConfig.extras.getFieldId = function(options, model, scope) {
            if (options.id) {
              return options.id
            }
            return [scope.index, (model && model.id) || 'new-model', options.key].join('_')
          }
          compileAndDigest()

          const field0 = getFieldNgModelNode(0)
          const field1 = getFieldNgModelNode(1)
          const field2 = getFieldNgModelNode(2)

          expect(field0.id).to.eq('custom')
          expect(field1.id).to.eq('1_1234_foo')
          expect(field2.id).to.eq('2_new-model_bar')
        })
      })


      function compileAndDigest(template) {
        el = $compile(template || basicForm)(scope)
        scope.$digest()
        field = scope.fields[0]
        return el
      }

      function getFieldNode(index = 0) {
        return el[0].querySelectorAll('.formly-field')[index]
      }

      function getFieldNgModelNode(index = 0) {
        return getFieldNode(index).querySelector('[ng-model]')
      }

    })

  })

  describe(`getTypeHeritage`, () => {
    it(`should get the heritage of all type extensions`, () => {
      formlyConfig.setType([
        {name: 'grandparent'},
        {name: 'parent', extends: 'grandparent'},
        {name: 'child', extends: 'parent'},
        {name: 'extra', extends: 'grandparent'},
        {name: 'extra2'},
      ])
      expect(formlyConfig.getTypeHeritage('child')).to.eql([
        formlyConfig.getType('parent'), formlyConfig.getType('grandparent'),
      ])
    })
  })
})
