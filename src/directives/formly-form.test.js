/* eslint no-shadow:0 */
/* eslint no-console:0 */
/* eslint max-len:0 */
/* eslint max-nested-callbacks:0 */
import testUtils from '../test.utils.js'
import angular from 'angular-fix'

const {getNewField, input, basicForm} = testUtils

describe('formly-form', () => {
  let $compile, formlyConfig, scope, el, $timeout

  beforeEach(window.module('formly'))
  beforeEach(inject((_$compile_, _formlyConfig_, _$timeout_, $rootScope) => {
    formlyConfig = _formlyConfig_
    $compile = _$compile_
    $timeout = _$timeout_
    scope = $rootScope.$new()
    scope.model = {}
    scope.fields = []
  }))

  it(`should be possible to use it as an attribute directive`, () => {
    const el = compileAndDigest(`
      <div formly-form model="model" fields="fields" form="theForm"></div>
    `)
    expect(el.length).to.equal(1)
    expect(el.prop('nodeName').toLowerCase()).to.equal('ng-form')
  })

  it('should use ng-form as the default root tag', () => {
    const el = compileAndDigest(`
      <formly-form model="model" fields="fields" form="theForm"></formly-form>
    `)
    expect(el.length).to.equal(1)
    expect(el.prop('nodeName').toLowerCase()).to.equal('ng-form')
  })

  it('should use a different root tag when specified', () => {
    const el = compileAndDigest(`
      <formly-form model="model" fields="fields" form="theForm" root-el="form"></formly-form>
    `)
    expect(el.length).to.equal(1)
    expect(el.prop('nodeName').toLowerCase()).to.equal('form')
  })

  it(`should use a different root tag for formly-fields when specified`, () => {
    scope.fields = [getNewField()]
    const el = compileAndDigest(`
      <formly-form model="model" fields="fields" form="theForm" field-root-el="area"></formly-form>
    `)
    expect(el[0].querySelector('area.formly-field')).to.exist
  })

  it(`should assign the scope's "form" property to the given FormController if it has a value`, () => {
    const el = compileAndDigest(`
      <form name="theForm">
        <formly-form model="model" fields="fields" form="theForm" id="my-formly-form"></formly-form>
      </form>
    `)
    const isolateScope = angular.element(el[0].querySelector('#my-formly-form')).isolateScope()
    expect(scope.theForm).to.eq(isolateScope.form)
    expect(scope.theForm.$name).to.eq('theForm')
  })

  it(`should assign the scope's "form" property to its own FormController if it doesn't have a value`, () => {
    const el = compileAndDigest(`
      <div>
        <formly-form model="model" fields="fields" form="theForm" id="my-formly-form"></formly-form>
      </div>
    `)
    const isolateScope = angular.element(el[0].querySelector('#my-formly-form')).isolateScope()
    expect(scope.theForm).to.eq(isolateScope.theFormlyForm)
  })

  it(`should warn if there's no FormController to be assigned`, inject(($log) => {
    compileAndDigest(`
      <formly-form model="model" fields="fields" form="theForm" id="my-formly-form" root-el="div"></formly-form>
    `)
    const log = $log.warn.logs[0]
    expect($log.warn.logs).to.have.length(1)
    expect(log[0]).to.equal('Formly Warning:')
    expect(log[1]).to.equal('Your formly-form does not have a `form` property. Many functions of the form (like validation) may not work')
  }))

  it(`should put the formControl on the field's scope when using a different form root element`, () => {
    scope.fields = [getNewField()]
    const el = compileAndDigest(`
      <form name="theForm">
        <formly-form model="model" fields="fields" form="theForm" root-el="div"></formly-form>
      </form>
    `)

    const fieldScope = angular.element(el[0].querySelector('.formly-field')).isolateScope()
    expect(fieldScope.fc).to.exist
  })

  it(`should not allow sibling forms to override each other on a parent form`, () => {
    compileAndDigest(`
      <form name="parent">
        <formly-form form="form1" model="model" fields="fields"></formly-form>
        <formly-form form="form2" model="model" fields="fields"></formly-form>
      </form>
    `)
    expect(scope.parent).to.have.property('formly_1')
    expect(scope.parent).to.have.property('formly_2')
  })

  it(`should place the form control on the scope property defined by the form attribute`, () => {
    compileAndDigest(`
      <formly-form form="vm.myForm" model="model" fields="fields"></formly-form>
    `)
    expect(scope.vm).to.have.property('myForm')
    expect(scope.vm.myForm).to.have.property('$name')
  })

  it(`should initialize the model and the fields if not provided`, () => {
    compileAndDigest(`
      <formly-form model="model" fields="fields"></formly-form>
    `)
    expect(scope.model).to.exist
    expect(scope.fields).to.exist
  })

  it(`should initialize the model and fields if they are null`, () => {
    scope.model = null
    scope.fields = null
    compileAndDigest(`
      <formly-form model="model" fields="fields"></formly-form>
    `)
    expect(scope.model).to.exist
    expect(scope.fields).to.exist
  })

  it(`should allow the user to specify their own name for the form`, () => {
    compileAndDigest(`
      <form name="parent">
        <div ng-repeat="forms in [1, 2] track by $index">
          <formly-form model="model" fields="fields" bind-name="$parent.$index + '_in_my_ng_repeat'"></formly-form>
        </div>
      </form>
    `)

    expect(scope.parent).to.have.property('formly_0_in_my_ng_repeat')
    expect(scope.parent).to.have.property('formly_1_in_my_ng_repeat')
    const firstForm = el[0].querySelector('ng-form')
    const firstFormScope = angular.element(firstForm).isolateScope()
    expect(firstFormScope.formId).to.eq('formly_0_in_my_ng_repeat')
  })

  it(`should allow you to completely swap out the fields`, () => {
    scope.fields = [getNewField(), getNewField()]
    compileAndDigest(basicForm)
    scope.fields = [getNewField(), getNewField()]

    expect(() => scope.$digest()).to.not.throw()
  })

  describe(`ngTransclude element`, () => {
    it(`should have the specified className`, () => {
      const el = compileAndDigest(`
      <formly-form model="model" fields="fields" form="theForm" transclude-class="foo yeah"></formly-form>
    `)
      expect(el[0].querySelector('.foo.yeah')).to.exist
    })

    it(`should not have a className when one is unspecified`, () => {
      // this test is to avoid giving it a class of "undefined"
      const el = compileAndDigest(`
      <formly-form model="model" fields="fields" form="theForm"></formly-form>
    `)
      const transcludedDiv = el[0].querySelector('div[ng-transclude]')
      expect(transcludedDiv.classList).to.have.length(0)
    })
  })

  describe(`fieldGroup`, () => {

    beforeEach(() => {
      scope.user = {}
      formlyConfig.setType({
        name: 'input',
        template: input,
      })
      let key = 0
      scope.fields = [
        {
          className: 'bar',
          fieldGroup: [
            {type: 'input', key: key++},
            {type: 'input', key: key++},
          ],
        },
        {type: 'input', key: key++},
        {type: 'input', key: key++},
        {
          className: 'foo',
          model: scope.user,
          fieldGroup: [
            {type: 'input', key: key++},
            {type: 'input', key: key++, className: 'specific-field'},
            {type: 'input', key: key++},
          ],
        },
      ]
    })

    it(`should allow you to specify a fieldGroup which will use the formly-form directive internally`, () => {
      compileAndDigest()

      expect(el[0].querySelectorAll('[formly-field].formly-field-input')).to.have.length(7)

      expect(el[0].querySelectorAll('ng-form')).to.have.length(2)
      expect(el[0].querySelectorAll('ng-form.foo')).to.have.length(1)
      expect(el[0].querySelectorAll('ng-form.foo [formly-field].formly-field-input')).to.have.length(3)
      expect(el[0].querySelectorAll('.formly-field-group')).to.have.length(2)
    })

    it(`should copy the parent's attributes in the template`, () => {
      scope.fields = [
        {
          className: 'field-group',
          fieldGroup: [
            getNewField(),
            getNewField(),
          ],
        },
      ]

      compileAndDigest('<formly-form model="model" fields="fields" some-extra-attr="someValue"></formly-form>')

      const fieldGroupNode = el[0].querySelector('.field-group')
      expect(fieldGroupNode).to.exist

      expect(fieldGroupNode.getAttribute('some-extra-attr')).to.eq('someValue')
    })

    describe(`options`, () => {
      const formWithOptions = '<formly-form model="model" fields="fields" options="options"></formly-form>'
      beforeEach(() => {
        scope.fields = [
          {
            className: 'field-group',
            fieldGroup: [
              getNewField(),
              getNewField(),
            ],
          },
          {
            className: 'field-group',
            fieldGroup: [
              getNewField(),
              getNewField(),
            ],
          },
        ]

        scope.options = {}
      })

      it(`should allow you to call the child's updateInitialValue and resetModel from the parent`, () => {
        const field = scope.fields[0].fieldGroup[0]
        compileAndDigest(formWithOptions)
        expect(field.initialValue).to.not.exist
        scope.model[field.key] = 'foo'
        scope.options.updateInitialValue()
        expect(field.initialValue).to.eq('foo')
        scope.model[field.key] = 'bar'
        scope.options.resetModel()
        expect(scope.model[field.key]).to.eq('foo')
      })

      it(`should have the same formState`, () => {
        compileAndDigest(formWithOptions)
        const fieldGroup1 = scope.fields[0]
        const fieldGroup2 = scope.fields[1]
        expect(fieldGroup1.options.formState).to.eq(fieldGroup2.options.formState)
        expect(scope.options.formState).to.eq(fieldGroup1.options.formState)
      })
    })

    it(`should be possible to use a wrapper & templateOptions in a fieldGroup`, () => {
      formlyConfig.setWrapper({
        name: 'panel',
        template: `<div class="panel">
            <div class="heading">
              Panel Title: {{options.templateOptions.title}}
            </div>
            <div class="sub-heading">
              Subtitle: {{to.subtitle}}
            </div>
            <div class="body">
              <formly-transclude></formly-transclude>
            </div>
          </div>
        `,
      })

      scope.fields = [
        {
          className: 'field-group',
          wrapper: 'panel',
          templateOptions: {
            title: 'My Panel',
            subtitle: 'is awesome',
          },
          fieldGroup: [
            getNewField(),
            getNewField(),
          ],
        },
      ]

      scope.options = {}

      compileAndDigest()

      const panelNode = el[0].querySelector('.panel')
      expect(panelNode).to.exist
      const bodyNode = panelNode.querySelector('.body')
      expect(bodyNode).to.exist
      const headingNode = panelNode.querySelector('.heading')
      expect(headingNode).to.exist
      const headingEl = angular.element(headingNode)
      expect(headingEl.text().trim()).to.eq('Panel Title: My Panel')
      const subHeadingNode = panelNode.querySelector('.sub-heading')
      expect(subHeadingNode).to.exist
      const subHeadingEl = angular.element(subHeadingNode)
      expect(subHeadingEl.text().trim()).to.eq('Subtitle: is awesome')
    })

    it(`should be possible to hide a fieldGroup with the hide property`, () => {
      compileAndDigest()

      expect(el[0].querySelectorAll('ng-form.bar')).to.have.length(1)

      const fieldGroup1 = scope.fields[0]
      fieldGroup1.hide = true

      scope.$digest()

      expect(el[0].querySelectorAll('ng-form.bar')).to.have.length(0)
    })

    it(`should pass the model to it's children fields`, () => {
      compileAndDigest()

      const specificGroup = scope.fields[3]
      const specificField = specificGroup.fieldGroup[1]
      const specificFieldNode = el[0].querySelector('.specific-field')
      expect(specificFieldNode).to.exist
      specificField.formControl.$setViewValue('foo')
      expect(specificGroup.model[specificField.key]).to.eq('foo')
      expect(specificGroup.model).to.eq(scope.user)
      expect(scope.user[specificField.key]).to.eq('foo')
      expect(angular.element(specificFieldNode).isolateScope().model).to.eq(scope.user)
    })

    it(`should have a form property`, () => {
      compileAndDigest()
      expect(scope.fields[0].form).to.have.property('$$parentForm')
    })

    it(`should be able to be dynamically hidden with a hideExpression`, () => {
      scope.fields = [
        {
          hideExpression: 'model.foo === "bar"',
          fieldGroup: [
            getNewField(),
            getNewField(),
          ],
        },
        getNewField({
          key: 'foo', hideExpression: 'options.data.canHide && model.baz === "foobar"', data: {canHide: true},
        }),
      ]

      compileAndDigest()

      expect(scope.fields[0].hide).to.be.false
      expect(scope.fields[1].hide).to.be.false

      scope.model.foo = 'bar'
      scope.model.baz = 'foobar'
      scope.$digest()

      expect(scope.fields[0].hide).to.be.true
      expect(scope.fields[1].hide).to.be.true
    })

    it(`should allow a field group inside a field group`, () => {
      scope.fields = scope.fields = [
        {
          className: 'field-group',
          fieldGroup: [
            getNewField(),
            getNewField(),
            {
              className: 'field-group',
              fieldGroup: [
                getNewField(),
                getNewField(),
              ],
            },
          ],
        },
      ]

      expect(() => compileAndDigest()).to.not.throw()
    })

    it(`should validate fields in a fieldGroup`, () => {
      scope.fields = [
        {
          className: 'field-group',
          fieldGroup: [
            getNewField(),
            getNewField(),
            {
              className: 'field-group',
              fieldGroup: [
                getNewField({extra: 'property'}),
                getNewField(),
                getNewField(),
              ],
            },
          ],
        },
      ]
      expect(() => compileAndDigest()).to.throw()
    })

  })

  describe('an instance of model', () => {
    const spy1 = sinon.spy()
    const spy2 = sinon.spy()

    beforeEach(() => {
      scope.model = {}
      scope.fieldModel1 = {}

      scope.fields = [
        {template: input, key: 'foo', model: scope.fieldModel1},
        {template: input, key: 'bar', model: scope.fieldModel1},
        {template: input, key: 'zoo', model: scope.fieldModel1},
        {template: input, key: 'test'},
      ]
    })

    it('should be assigned with only one watcher', () => {
      compileAndDigest()
      $timeout.flush()

      scope.fields[0].expressionProperties = {'data.dummy': spy1}
      scope.fields[1].expressionProperties = {'data.dummy': spy2}

      scope.fieldModel1.foo = 'value'
      scope.$digest()
      $timeout.flush()

      expect(spy1).to.have.been.calledOnce
      expect(spy2).to.have.been.calledOnce
    })

    it('should be updated when the reference to the model changes', () => {
      scope.model = {test: 'bar'}
      scope.fields[3].expressionProperties = {'data.test': 'model.test'}

      compileAndDigest()
      $timeout.flush()

      scope.model = {test: 'baz'}

      scope.$digest()
      $timeout.flush()

      expect(scope.fields[3].data.test).to.equal('baz')
    })
  })

  describe('nested model as string', () => {
    let spy

    beforeEach(() => {
      spy = sinon.spy()

      scope.model = {
        nested: {},
      }

      scope.fields = [
        {template: input, key: 'foo'},
      ]
    })

    it('starting with "model." should be assigned with only one watcher', () => {
      testModelAccessor('model.nested')
    })

    it('starting with "model[" should be assigned with only one watcher', () => {
      testModelAccessor('model["nested"]')
    })

    it('starting with "formState." should be assigned with only one watcher', () => {
      testFormStateAccessor('formState.nested')
    })

    it('starting with "formState[" should be assigned with only one watcher', () => {
      testFormStateAccessor('formState["nested"]')
    })

    it('should be updated when the reference to the outer model changes', () => {
      scope.model.nested.foo = 'bar'
      scope.fields[0].model = 'model.nested'
      scope.fields[0].expressionProperties = {'data.foo': 'model.foo'}

      compileAndDigest()
      $timeout.flush()

      scope.model = {
        nested: {
          foo: 'baz',
        },
      }

      scope.$digest()
      $timeout.flush()

      expect(scope.fields[0].data.foo).to.equal('baz')
    })

    function testModelAccessor(accessor) {
      scope.fields[0].model = accessor

      compileAndDigest()
      $timeout.flush()

      scope.fields[0].expressionProperties = {'data.dummy': spy}

      scope.model.nested.foo = 'value'
      scope.$digest()
      $timeout.flush()

      expect(spy).to.have.been.calledOnce
    }

    function testFormStateAccessor(accessor) {
      const formWithOptions = '<formly-form model="model" fields="fields" options="options"></formly-form>'
      scope.options = {
        formState: {
          nested: {},
        },
      }
      scope.fields[0].model = accessor

      compileAndDigest(formWithOptions)
      $timeout.flush()

      scope.fields[0].expressionProperties = {'data.dummy': spy}

      scope.options.formState.nested.foo = 'value'
      scope.$digest()
      $timeout.flush()

      expect(spy).to.have.been.calledOnce
    }
  })

  describe('hideExpression', () => {
    beforeEach(() => {
      scope.model = {}
      scope.fieldModel = {}
    })
    describe('behaviour when model changes', () => {

      describe('when a string is passed to hideExpression', () => {
        beforeEach(() => {
          scope.fields = [
            {template: input, key: 'foo', model: scope.fieldModel},
            {template: input, key: 'bar', model: scope.fieldModel, hideExpression: () => !!scope.fieldModel.foo},
          ]
        })

        it('should be called and should resolve to true when field model changes', () => {
          compileAndDigest()
          expect(scope.fields[1].hide).be.false
          scope.fields[0].formControl.$setViewValue('value')
          expect(scope.fields[1].hide).be.true
        })

        it('should be called and should resolve to false when field model changes', () => {
          scope.fieldModel.foo = 'value'
          compileAndDigest()
          expect(scope.fields[1].hide).be.true
          scope.fields[0].formControl.$setViewValue('')
          expect(scope.fields[1].hide).be.false
        })
      })
      describe('when a function is passed to hideExpression', () => {
        beforeEach(() => {
          scope.fields = [
            {template: input, key: 'foo', model: scope.fieldModel},
            {
              template: input, key: 'bar',
              model: scope.fieldModel,
              hideExpression: ($viewValue, $modelValue, scope) => {
                return !!scope.fields[1].data.parentScope.fieldModel.foo   //since the scope passed to the function belongs to the form,
              },                                                           //we store the outer(parent) scope in 'data' property to access
              data: {                                                      //the template named 'foo' stored in the fields array
                parentScope: scope,          //the parent scope(one used to compile the form)
              },
            },
          ]
        })

        it('should be called and should resolve to true when field model changes', () => {
          compileAndDigest()
          expect(scope.fields[1].hide).be.false
          scope.fields[0].formControl.$setViewValue('value')
          expect(scope.fields[1].hide).be.true
        })

        it('should be called and should resolve to false when field model changes', () => {
          scope.fieldModel.foo = 'value'
          compileAndDigest()
          expect(scope.fields[1].hide).be.true
          scope.fields[0].formControl.$setViewValue('')
          expect(scope.fields[1].hide).be.false
        })
      })
    })

    it('ensures that hideExpression has all the expressionProperties values', () => {
      scope.model = {nested: {foo: 'bar', baz: []}}
      scope.options = {formState: {}}
      scope.fields = [{
        template: input,
        key: 'test',
        model: 'model.nested',
        hideExpression: `
        model === options.data.model &&
        options === options.data.field &&
        index === 0 &&
        formState === options.data.formOptions.formState &&
        originalModel === options.data.originalModel &&
        formOptions === options.data.formOptions`,
        data: {
          model: scope.model.nested,
          originalModel: scope.model,
          formOptions: scope.options,
        },
      }]
      scope.fields[0].data.field = scope.fields[0]
      compileAndDigest()
      expect(scope.fields[0].hide).be.true
    })
  })

  describe(`options`, () => {
    beforeEach(() => {
      scope.model = {
        foo: 'myFoo',
        bar: 123,
        foobar: 'ab@cd.com',
      }

      scope.fields = [
        {template: input, key: 'foo'},
        {template: input, key: 'bar', templateOptions: {type: 'numaber'}},
        {template: input, key: 'foobar', templateOptions: {type: 'email'}},
      ]
      scope.options = {
        formState: {
          foo: 'bar',
        },
      }
    })

    it(`should throw an error with extra options`, () => {
      expect(() => {
        scope.options = {extra: true}
        compileAndDigest()
      }).to.throw()
    })

    it(`should run expressionProperties when the formState changes`, () => {
      const spy = sinon.spy()
      const field = {
        template: input,
        key: 'foo',
        expressionProperties: {
          'templateOptions.label': spy,
        },
      }
      scope.fields = [field]
      compileAndDigest()
      scope.options.formState.foo = 'eggs'
      scope.$digest()
      $timeout.flush()
      expect(spy).to.have.been.called
    })

    describe(`resetModel`, () => {
      it(`should reset the model that's given`, () => {
        compileAndDigest()
        expect(typeof scope.options.resetModel).to.eq('function')
        const previousFoo = scope.model.foo
        scope.model.foo = 'newFoo'
        scope.options.resetModel()
        expect(scope.model.foo).to.eq(previousFoo)
      })

      it(`should reset the $viewValue of fields`, () => {
        compileAndDigest()
        const previousFoobar = scope.model.foobar
        scope.fields[2].formControl.$setViewValue('not-an-email')
        scope.options.resetModel()
        expect(scope.fields[2].formControl.$viewValue).to.equal(previousFoobar)
      })

      it(`should reset the $viewValue and $modelValue to undefined if the value was not originally defined`, () => {
        scope.fields.push({
          template: input, key: 'baz', templateOptions: {required: true},
        })
        compileAndDigest()
        const fc = scope.fields[scope.fields.length - 1].formControl
        scope.model.baz = 'hello world'
        scope.$digest()
        expect(fc.$viewValue).to.eq('hello world')
        expect(fc.$modelValue).to.eq('hello world')
        scope.options.resetModel()
        expect(scope.model.baz).to.be.undefined
        expect(fc.$viewValue).to.be.undefined
        expect(fc.$modelValue).to.be.undefined
      })

      it(`should rerender the ng-model element`, () => {
        const el = compileAndDigest()
        const ngModelNode = el[0].querySelector('[ng-model]')
        scope.model.foo = 'hey there!'
        scope.$digest()
        scope.options.resetModel()
        expect(ngModelNode.value).to.eq('myFoo')
      })

      it(`should reset models of fields`, () => {
        scope.fieldModel = {baz: false}
        scope.fields.push({
          template: input, key: 'baz', model: scope.fieldModel,
        })

        compileAndDigest()

        scope.fieldModel.baz = true
        scope.options.resetModel()
        expect(scope.fieldModel.baz).to.be.false
      })

      it(`should not break if a fieldGroup has yet to be initialized`, () => {
        scope.fields = [
          {fieldGroup: [getNewField()], hide: true},
        ]
        compileAndDigest()
        expect(() => scope.options.resetModel()).to.not.throw()
      })

      it(`should not break if a field has yet to be initialized`, () => {
        scope.fields = [getNewField({hide: true})]
        compileAndDigest()
        expect(() => scope.options.resetModel()).to.not.throw()
      })
    })

    describe(`hide-directive attribute`, () => {
      beforeEach(() => {
        scope.fields = [{template: input, key: 'foo'}]
      })

      it(`should default to ng-if`, () => {
        compileAndDigest(basicForm)
        const fieldNode = el[0].querySelector('.formly-field')
        expect(fieldNode.getAttribute('ng-if')).to.exist
      })

      it(`should allow custom directive for hiding`, () => {
        compileAndDigest(`
          <formly-form model="model" fields="fields" hide-directive="ng-show"></formly-form>
        `)
        const fieldNode = el[0].querySelector('.formly-field')
        expect(fieldNode.getAttribute('ng-if')).to.not.exist
        expect(fieldNode.getAttribute('ng-show')).to.exist
      })

    })

    describe(`track-by attribute`, () => {
      const template = `<formly-form model="model" fields="fields" track-by="field.key"></formly-form>`

      beforeEach(() => {
        scope.fields = [getNewField(), getNewField(), getNewField()]
      })

      it(`should default to track by $$hashKey when the attribute is not present`, () => {
        compileAndDigest(basicForm)
        expect(scope.fields[0].$$hashKey).to.exist
      })

      it(`should track by the specified value`, () => {
        compileAndDigest(template)
        expectTrackBy('field.key')
      })

      it(`should allow you to track by $index`, () => {
        compileAndDigest(`<formly-form model="model" fields="fields" track-by="$index"></formly-form>`)
        expectTrackBy('$index')
      })

      it(`should throw an error when the field's specified values are not unique`, () => {
        scope.fields.push({template: input, key: 'foo'})
        scope.fields.push({template: input, key: 'foo'})
        expect(compileAndDigest.bind(null, template)).to.throw('ngRepeat:dupes')
      })

      it(`should allow you to push a field after initial compile`, () => {
        expectFieldChange(scope.fields.push.bind(scope.fields, getNewField()))
      })

      it(`should allow you to pop a field after initial compile`, () => {
        expectFieldChange(scope.fields.pop.bind(scope.fields))
      })

      it(`should allow you to splice out a field after initial compile`, () => {
        expectFieldChange(scope.fields.splice.bind(scope.fields, 1, 1))
      })

      it(`should allow you splice in a field after initial compile`, () => {
        expectFieldChange(scope.fields.splice.bind(scope.fields, 1, 0, getNewField()))
      })

      function expectTrackBy(trackBy) {
        expect(el[0].innerHTML).to.contain(`field in fields track by ${trackBy}`)
      }

      function expectFieldChange(change) {
        compileAndDigest(template)
        change()
        expect(() => scope.$digest()).to.not.throw()
      }
    })

    describe(`updateInitialValue`, () => {

      it(`should update the initial value of the fields`, () => {
        compileAndDigest()
        const field = scope.fields[0]
        expect(field.initialValue).to.equal('myFoo')
        scope.model.foo = 'otherValue'
        scope.options.updateInitialValue()
        expect(field.initialValue).to.equal('otherValue')
      })

      it(`should reset to the updated initial value`, () => {
        compileAndDigest()
        const field = scope.fields[0]
        scope.model.foo = 'otherValue'
        scope.options.updateInitialValue()
        scope.model.foo = 'otherValueAgain'
        scope.options.resetModel()
        expect(field.initialValue).to.equal('otherValue')
        expect(scope.model.foo).to.equal('otherValue')
      })
    })

    describe(`removeChromeAutoComplete`, () => {
      it(`should not have a hidden input when nothing is specified`, () => {
        const el = compileAndDigest()
        const autoCompleteFixEl = el[0].querySelector('[autocomplete="address-level4"]')
        expect(autoCompleteFixEl).to.be.null
      })

      it(`should add a hidden input when specified as true`, () => {
        scope.options.removeChromeAutoComplete = true
        const el = compileAndDigest()
        const autoCompleteFixEl = el[0].querySelector('[autocomplete="address-level4"]')
        expect(autoCompleteFixEl).to.exist
      })

      it(`should override the 'true' global configuration`, inject((formlyConfig) => {
        formlyConfig.extras.removeChromeAutoComplete = true
        scope.options.removeChromeAutoComplete = false
        const el = compileAndDigest()
        const autoCompleteFixEl = el[0].querySelector('[autocomplete="address-level4"]')
        expect(autoCompleteFixEl).to.be.null
      }))

      it(`should be added regardless of the option if the global config is set`, inject((formlyConfig) => {
        formlyConfig.extras.removeChromeAutoComplete = true
        const el = compileAndDigest()
        const autoCompleteFixEl = el[0].querySelector('[autocomplete="address-level4"]')
        expect(autoCompleteFixEl).to.exist
      }))
    })

    describe(`data`, () => {
      it(`should allow you to put whatever you want in data`, () => {
        scope.options.data = {foo: 'bar'}
        expect(compileAndDigest).to.not.throw()
      })
    })
  })

  function compileAndDigest(template) {
    el = $compile(template || basicForm)(scope)
    scope.$digest()
    return el
  }

  describe(`field watchers`, () => {
    it('should throw for a watcher with no listener', () => {
      scope.fields = [getNewField({
        watcher: {},
      })]

      expect(compileAndDigest).to.throw()
    })

    it(`should setup any watchers specified on a field`, () => {
      scope.model = {}

      const listener = sinon.spy()
      const expression = sinon.spy()

      scope.fields = [getNewField({
        watcher: {
          listener: '',
        },
      }), getNewField({
        watcher: [{
          listener: '',
          expression: '',
        }, {
          listener,
          expression,
        }],
      })]

      expect(compileAndDigest).to.not.throw()
      expect(listener).to.have.been.called
      expect(expression).to.have.been.called
    })

    it(`should setup any watchers specified on a fieldgroup`, () => {
      scope.model = {}

      const listener = sinon.spy()
      const expression = sinon.spy()

      scope.fields = [{
        watcher: [{
          listener: '',
          expression: '',
        }, {
          listener,
          expression,
        }],
        fieldGroup: [
          getNewField({}),
          getNewField({}),
        ],
      }]

      expect(compileAndDigest).to.not.throw()
      expect(listener).to.have.been.called
      expect(expression).to.have.been.called
    })
  })

  describe(`manualModelWatcher option`, () => {
    beforeEach(() => {
      scope.model = {
        foo: 'myFoo',
        bar: 123,
        baz: {buzz: 'myBuzz'},
      }

      scope.fields = [
        {template: input, key: 'foo'},
        {template: input, key: 'bar', templateOptions: {type: 'number'}},
      ]
    })

    describe('declared as a boolean', () => {
      beforeEach(() => {
        scope.options = {
          manualModelWatcher: true,
        }
      })

      it(`should block a global model watcher`, () => {
        const spy = sinon.spy()

        scope.fields[0].expressionProperties = {
          'templateOptions.label': spy,
        }

        compileAndDigest()
        $timeout.flush()

        spy.reset()

        scope.model.foo = 'bar'

        scope.$digest()
        $timeout.verifyNoPendingTasks()

        expect(spy).to.not.have.been.called
      })

      it(`should watch manually selected model property`, () => {
        const spy = sinon.spy()

        scope.fields[0].watcher = [{
          expression: 'model.foo',
          runFieldExpressions: true,
        }]
        scope.fields[0].expressionProperties = {
          'templateOptions.label': spy,
        }

        compileAndDigest()
        $timeout.flush()

        spy.reset()

        scope.model.foo = 'bar'

        scope.$digest()
        $timeout.flush()

        expect(spy).to.have.been.called
      })

      it(`should not watch model properties that do not have manual watcher defined`, () => {
        const spy = sinon.spy()

        scope.fields[0].watcher = [{
          expression: 'model.foo',
          runFieldExpressions: true,
        }]
        scope.fields[0].expressionProperties = {
          'templateOptions.label': spy,
        }

        compileAndDigest()
        $timeout.flush()

        spy.reset()

        scope.model.bar = 123

        scope.$digest()
        $timeout.verifyNoPendingTasks()

        expect(spy).to.not.have.been.called
      })

      it(`should run manual watchers defined as a function`, () => {
        const spy = sinon.spy()
        const stub = sinon.stub()

        scope.fields[0].watcher = [{
          expression: stub,
          runFieldExpressions: true,
        }]
        scope.fields[0].expressionProperties = {
          'templateOptions.label': spy,
        }

        compileAndDigest()
        $timeout.flush()

        stub.reset()
        spy.reset()

        // set random stub value so it triggers watcher function
        stub.returns(Math.random())

        scope.$digest()
        $timeout.flush()

        expect(stub).to.have.been.called
        expect(spy).to.have.been.called
      })

      it('should not trigger watches on other fields', () => {
        const spy1 = sinon.spy()
        const spy2 = sinon.spy()

        scope.fields[0].watcher = [{
          expression: 'model.foo',
          runFieldExpressions: true,
        }]
        scope.fields[0].expressionProperties = {
          'templateOptions.label': spy1,
        }
        scope.fields[1].expressionProperties = {
          'templateOptions.label': spy2,
        }

        compileAndDigest()
        $timeout.flush()

        spy1.reset()
        spy2.reset()

        scope.model.foo = 'asd'

        scope.$digest()
        $timeout.flush()

        expect(spy1).to.have.been.called
        expect(spy2).to.not.have.been.called
      })

      it('works with models that are declared as string (relative model)', () => {
        const spy = sinon.spy()
        const model = 'model.nested'

        scope.model = {
          nested: {
            foo: 'foo',
          },
        }
        scope.fields[0].model = model
        scope.fields[0].watcher = [{
          expression: 'model.foo',
          runFieldExpressions: true,
        }]
        scope.fields[0].expressionProperties = {
          'templateOptions.label': spy,
        }

        compileAndDigest()
        $timeout.flush()

        spy.reset()

        scope.model.nested.foo = 'bar'

        scope.$digest()
        $timeout.flush()

        expect(spy).to.have.been.called
      })
    })

    describe('declared as a function', () => {
      beforeEach(() => {
        scope.options = {
          manualModelWatcher: () => scope.model.baz,
        }
      })

      it('works as a form-wide watcher', () => {
        const spy = sinon.spy()

        scope.options = {
          manualModelWatcher: () => scope.model.baz,
        }

        scope.fields[1].expressionProperties = {
          'templateOptions.label': spy,
        }

        compileAndDigest()
        $timeout.flush()

        spy.reset()

        scope.model.foo = 'random string'

        scope.$digest()
        $timeout.verifyNoPendingTasks()

        expect(spy).to.not.have.been.called

        spy.reset()

        scope.model.baz.buzz = 'random buzz string'

        scope.$digest()
        $timeout.flush()

        expect(spy).to.have.been.called
      })

      it('still fires manual field watchers', () => {
        const spy = sinon.spy()

        scope.fields[0].watcher = [{
          expression: 'model.foo',
          runFieldExpressions: true,
        }]
        scope.fields[0].expressionProperties = {
          'templateOptions.label': spy,
        }

        compileAndDigest()
        $timeout.flush()

        spy.reset()

        scope.model.foo = 'bar'

        scope.$digest()
        $timeout.flush()

        expect(spy).to.have.been.called
      })

    })

    describe('enabled with watchAllExpressions option', () => {
      beforeEach(() => {
        scope.options = {
          manualModelWatcher: true,
          watchAllExpressions: true,
        }
      })

      it('watches and evaluates string template expressions', () => {
        const field = scope.fields[0]

        field.expressionProperties = {
          'templateOptions.label': 'model.foo',
        }

        compileAndDigest()
        $timeout.flush()

        scope.model.foo = 'bar'

        scope.$digest()

        expect(field.templateOptions.label).to.equal(scope.model.foo)
      })

      it('watches and evaluates string template expressions with custom string model', () => {
        const field = scope.fields[0]

        field.model = 'model.baz'
        field.expressionProperties = {
          'templateOptions.label': 'model.buzz',
        }

        compileAndDigest()
        $timeout.flush()

        scope.model.baz.buzz = 'bar'

        scope.$digest()

        expect(field.templateOptions.label).to.equal(scope.model.baz.buzz)
      })

      it('watches and evaluates string template expressions with custom object model', () => {
        const field = scope.fields[0]

        field.model = {customFoo: 'customBar'}
        field.expressionProperties = {
          'templateOptions.label': 'model.customFoo',
        }

        compileAndDigest()
        $timeout.flush()

        field.model.customFoo = 'bar'

        scope.$digest()

        expect(field.templateOptions.label).to.equal(field.model.customFoo)
      })

      it('watches and evaluates hideExpression', () => {
        const field = scope.fields[0]

        field.hideExpression = 'model.foo === "bar"'

        compileAndDigest()
        $timeout.flush()

        scope.model.foo = 'bar'

        scope.$digest()

        expect(field.hide).to.equal(true)
      })

      it('watches and evaluates hideExpression with custom string model', () => {
        const field = scope.fields[0]

        field.model = 'model.baz'
        field.hideExpression = 'model.buzz === "bar"'

        compileAndDigest()
        $timeout.flush()

        scope.model.baz.buzz = 'bar'

        scope.$digest()

        expect(field.hide).to.equal(true)
      })
    })
  })
  describe('extras', () => {
    describe('validateOnModelChange', () => {
      it('should run validators after expressions are set', () => {
        let inputs, invalidInputs, el

        scope.model = {
          foo: null,
          bar: 123,
        }

        scope.fields = [
          {template: input, key: 'foo', extras: {validateOnModelChange: true}},
          {template: input, key: 'bar', templateOptions: {type: 'number'}},
        ]
        // First Field isn't valid when second field is 1
        scope.fields[0].expressionProperties = {
          'templateOptions.isValid': 'model.bar !== 1',
        }
        // validator to use isValid attribute
        scope.fields[0].validators = {isValid: {expression: (viewValue, modelValue, fieldScope) => {
          return fieldScope.to.isValid
        }}}

        el = compileAndDigest()

        // Input state before
        inputs = el[0].querySelectorAll('input')
        invalidInputs = el[0].querySelectorAll('input.ng-invalid')
        expect(inputs.length).to.equal(2)
        expect(invalidInputs.length).to.equal(0)

        // Enter '1' into second field
        angular.element(inputs[1]).val(1).triggerHandler('change')
        $timeout.flush()

        // Input state after
        inputs = el[0].querySelectorAll('input')
        invalidInputs = el[0].querySelectorAll('input.ng-invalid')
        expect(inputs.length).to.equal(2)
        expect(invalidInputs.length).to.equal(1)
      })
    })
  })
})
