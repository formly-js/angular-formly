/* eslint no-shadow:0 */
/* eslint no-console:0 */
/* eslint max-len:0 */
/* eslint max-nested-callbacks:0 */
import testUtils from '../test.utils.js';
import angular from 'angular-fix';
import _ from 'lodash';

const {getNewField, input, basicForm, shouldWarnWithLog} = testUtils;

describe('formly-form', () => {
  let $compile, formlyConfig, scope, el, $timeout;

  beforeEach(window.module('formly'));
  beforeEach(inject((_$compile_, _formlyConfig_, _$timeout_, $rootScope) => {
    formlyConfig = _formlyConfig_;
    $compile = _$compile_;
    $timeout = _$timeout_;
    scope = $rootScope.$new();
    scope.model = {};
    scope.fields = [];
  }));

  it(`should be possible to use it as an attribute directive`, () => {
    const el = compileAndDigest(`
      <div formly-form model="model" fields="fields" form="theForm"></div>
    `);
    expect(el.length).to.equal(1);
    expect(el.prop('nodeName').toLowerCase()).to.equal('ng-form');
  });

  it('should use ng-form as the default root tag', () => {
    const el = compileAndDigest(`
      <formly-form model="model" fields="fields" form="theForm"></formly-form>
    `);
    expect(el.length).to.equal(1);
    expect(el.prop('nodeName').toLowerCase()).to.equal('ng-form');
  });

  it('should use a different root tag when specified', () => {
    const el = compileAndDigest(`
      <formly-form model="model" fields="fields" form="theForm" root-el="form"></formly-form>
    `);
    expect(el.length).to.equal(1);
    expect(el.prop('nodeName').toLowerCase()).to.equal('form');
  });

  it(`should use a different root tag for formly-fields when specified`, () => {
    scope.fields = [getNewField()];
    const el = compileAndDigest(`
      <formly-form model="model" fields="fields" form="theForm" field-root-el="area"></formly-form>
    `);
    expect(el[0].querySelector('area.formly-field')).to.exist;
  });

  it(`should assign the scope's "form" property to the given FormController if it has a value`, () => {
    const el = compileAndDigest(`
      <form name="theForm">
        <formly-form model="model" fields="fields" form="theForm" id="my-formly-form"></formly-form>
      </form>
    `);
    const isolateScope = angular.element(el[0].querySelector('#my-formly-form')).isolateScope();
    expect(scope.theForm).to.eq(isolateScope.form);
    expect(scope.theForm.$name).to.eq('theForm');
  });

  it(`should assign the scope's "form" property to its own FormController if it doesn't have a value`, () => {
    const el = compileAndDigest(`
      <div>
        <formly-form model="model" fields="fields" form="theForm" id="my-formly-form"></formly-form>
      </div>
    `);
    const isolateScope = angular.element(el[0].querySelector('#my-formly-form')).isolateScope();
    expect(scope.theForm).to.eq(isolateScope.theFormlyForm);
  });

  it(`should warn if there's no FormController to be assigned`, inject(($log) => {
    compileAndDigest(`
      <formly-form model="model" fields="fields" form="theForm" id="my-formly-form" root-el="div"></formly-form>
    `);
    const log = $log.warn.logs[0];
    expect($log.warn.logs).to.have.length(1);
    expect(log[0]).to.equal('Formly Warning:');
    expect(log[1]).to.equal('Your formly-form does not have a `form` property. Many functions of the form (like validation) may not work');
  }));

  it(`should put the formControl on the field's scope when using a different form root element`, () => {
    scope.fields = [getNewField()];
    const el = compileAndDigest(`
      <form name="theForm">
        <formly-form model="model" fields="fields" form="theForm" root-el="div"></formly-form>
      </form>
    `);

    const fieldScope = angular.element(el[0].querySelector('.formly-field')).isolateScope();
    expect(fieldScope.fc).to.exist;
  });

  it(`should not allow sibling forms to override each other on a parent form`, () => {
    compileAndDigest(`
      <form name="parent">
        <formly-form form="form1" model="model" fields="fields"></formly-form>
        <formly-form form="form2" model="model" fields="fields"></formly-form>
      </form>
    `);
    expect(scope.parent).to.have.property('formly_1');
    expect(scope.parent).to.have.property('formly_2');
  });

  it(`should place the form control on the scope property defined by the form attribute`, () => {
    compileAndDigest(`
      <formly-form form="vm.myForm" model="model" fields="fields"></formly-form>
    `);
    expect(scope.vm).to.have.property('myForm');
    expect(scope.vm.myForm).to.have.property('$name');
  });

  it(`should initialize the model and the fields if not provided`, () => {
    compileAndDigest(`
      <formly-form model="model" fields="fields"></formly-form>
    `);
    expect(scope.model).to.exist;
    expect(scope.fields).to.exist;
  });

  it(`should initialize the model and fields if they are null`, () => {
    scope.model = null;
    scope.fields = null;
    compileAndDigest(`
      <formly-form model="model" fields="fields"></formly-form>
    `);
    expect(scope.model).to.exist;
    expect(scope.fields).to.exist;
  });

  it(`should allow the user to specify their own name for the form`, () => {
    compileAndDigest(`
      <form name="parent">
        <div ng-repeat="forms in [1, 2] track by $index">
          <formly-form model="model" fields="fields" bind-name="$parent.$index + '_in_my_ng_repeat'"></formly-form>
        </div>
      </form>
    `);

    expect(scope.parent).to.have.property('formly_0_in_my_ng_repeat');
    expect(scope.parent).to.have.property('formly_1_in_my_ng_repeat');
    const firstForm = el[0].querySelector('ng-form');
    const firstFormScope = angular.element(firstForm).isolateScope();
    expect(firstFormScope.formId).to.eq('formly_0_in_my_ng_repeat');
  });

  it(`should allow you to completely swap out the fields`, () => {
    scope.fields = [getNewField(), getNewField()];
    compileAndDigest(basicForm);
    scope.fields = [getNewField(), getNewField()];

    expect(() => scope.$digest()).to.not.throw();
  });

  describe(`ngTransclude element`, () => {
    it(`should have the specified className`, () => {
      const el = compileAndDigest(`
      <formly-form model="model" fields="fields" form="theForm" transclude-class="foo yeah"></formly-form>
    `);
      expect(el[0].querySelector('.foo.yeah')).to.exist;
    });

    it(`should not have a className when one is unspecified`, () => {
      // this test is to avoid giving it a class of "undefined"
      const el = compileAndDigest(`
      <formly-form model="model" fields="fields" form="theForm"></formly-form>
    `);
      const transcludedDiv = el[0].querySelector('div[ng-transclude]');
      expect(transcludedDiv.classList).to.have.length(0);
    });
  });

  describe(`fieldGroup`, () => {

    beforeEach(() => {
      scope.user = {};
      formlyConfig.setType({
        name: 'input',
        template: input
      });
      let key = 0;
      scope.fields = [
        {
          className: 'bar',
          fieldGroup: [
            {type: 'input', key: key++},
            {type: 'input', key: key++}
          ]
        },
        {type: 'input', key: key++},
        {type: 'input', key: key++},
        {
          className: 'foo',
          model: scope.user,
          fieldGroup: [
            {type: 'input', key: key++},
            {type: 'input', key: key++, className: 'specific-field'},
            {type: 'input', key: key++}
          ]
        }
      ];
    });

    it(`should allow you to specify a fieldGroup which will use the formly-form directive internally`, () => {
      compileAndDigest();

      expect(el[0].querySelectorAll('[formly-field].formly-field-input')).to.have.length(7);

      expect(el[0].querySelectorAll('ng-form')).to.have.length(2);
      expect(el[0].querySelectorAll('ng-form.foo')).to.have.length(1);
      expect(el[0].querySelectorAll('ng-form.foo [formly-field].formly-field-input')).to.have.length(3);
      expect(el[0].querySelectorAll('.formly-field-group')).to.have.length(2);
    });

    it(`should copy the parent's attributes in the template`, () => {
      scope.fields = [
        {
          className: 'field-group',
          fieldGroup: [
            getNewField(),
            getNewField()
          ]
        }
      ];

      compileAndDigest('<formly-form model="model" fields="fields" some-extra-attr="someValue"></formly-form>');

      const fieldGroupNode = el[0].querySelector('.field-group');
      expect(fieldGroupNode).to.exist;

      expect(fieldGroupNode.getAttribute('some-extra-attr')).to.eq('someValue');
    });

    describe(`options`, () => {
      const formWithOptions = '<formly-form model="model" fields="fields" options="options"></formly-form>';
      beforeEach(() => {
        scope.fields = [
          {
            className: 'field-group',
            fieldGroup: [
              getNewField(),
              getNewField()
            ]
          },
          {
            className: 'field-group',
            fieldGroup: [
              getNewField(),
              getNewField()
            ]
          }
        ];

        scope.options = {};
      });

      it(`should allow you to call the child's updateInitialValue and resetModel from the parent`, () => {
        const field = scope.fields[0].fieldGroup[0];
        compileAndDigest(formWithOptions);
        expect(field.initialValue).to.not.exist;
        scope.model[field.key] = 'foo';
        scope.options.updateInitialValue();
        expect(field.initialValue).to.eq('foo');
        scope.model[field.key] = 'bar';
        scope.options.resetModel();
        expect(scope.model[field.key]).to.eq('foo');
      });

      it(`should have the same formState`, () => {
        compileAndDigest(formWithOptions);
        const fieldGroup1 = scope.fields[0];
        const fieldGroup2 = scope.fields[1];
        expect(fieldGroup1.options.formState).to.eq(fieldGroup2.options.formState);
        expect(scope.options.formState).to.eq(fieldGroup1.options.formState);
      });
    });

    it(`should be possible to hide a fieldGroup with the hide property`, () => {
      compileAndDigest();

      expect(el[0].querySelectorAll('ng-form.bar')).to.have.length(1);

      const fieldGroup1 = scope.fields[0];
      fieldGroup1.hide = true;

      scope.$digest();

      expect(el[0].querySelectorAll('ng-form.bar')).to.have.length(0);
    });

    it(`should pass the model to it's children fields`, () => {
      compileAndDigest();

      const specificGroup = scope.fields[3];
      const specificField = specificGroup.fieldGroup[1];
      const specificFieldNode = el[0].querySelector('.specific-field');
      expect(specificFieldNode).to.exist;
      specificField.formControl.$setViewValue('foo');
      expect(specificGroup.model[specificField.key]).to.eq('foo');
      expect(specificGroup.model).to.eq(scope.user);
      expect(scope.user[specificField.key]).to.eq('foo');
      expect(angular.element(specificFieldNode).isolateScope().model).to.eq(scope.user);
    });

    it(`should have a form property`, () => {
      compileAndDigest();
      expect(scope.fields[0].form).to.have.property('$$parentForm');
    });

    it(`should be able to be dynamically hidden with a hideExpression`, () => {
      scope.fields = [
        {
          hideExpression: 'model.foo === "bar"',
          fieldGroup: [
            getNewField(),
            getNewField()
          ]
        },
        getNewField({
          key: 'foo', hideExpression: 'options.data.canHide && model.baz === "foobar"', data: {canHide: true}
        })
      ];

      compileAndDigest();

      expect(scope.fields[0].hide).to.be.false;
      expect(scope.fields[1].hide).to.be.false;

      scope.model.foo = 'bar';
      scope.model.baz = 'foobar';
      scope.$digest();

      expect(scope.fields[0].hide).to.be.true;
      expect(scope.fields[1].hide).to.be.true;
    });

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
                getNewField()
              ]
            }
          ]
        }
      ];

      expect(() => compileAndDigest()).to.not.throw();
    });

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
                getNewField()
              ]
            }
          ]
        }
      ];
      expect(() => compileAndDigest()).to.throw();
    });

  });

  describe('an instance of model', () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();

    beforeEach(() => {
      scope.model = {};
      scope.fieldModel1 = {};

      scope.fields = [
        {template: input, key: 'foo', model: scope.fieldModel1},
        {template: input, key: 'bar', model: scope.fieldModel1},
        {template: input, key: 'zoo', model: scope.fieldModel1}
      ];
    });

    it('should be assigned with only one watcher', () => {
      compileAndDigest();
      $timeout.flush();

      scope.fields[0].expressionProperties = {'data.dummy': spy1};
      scope.fields[1].expressionProperties = {'data.dummy': spy2};

      scope.fieldModel1.foo = 'value';
      scope.$digest();
      $timeout.flush();

      expect(spy1).to.have.been.calledOnce;
      expect(spy2).to.have.been.calledOnce;
    });
  });

  describe('nested model as string', () => {
    let spy;

    beforeEach(() => {
      spy = sinon.spy();

      scope.model = {
        nested: {}
      };

      scope.fields = [
        {template: input, key: 'foo'}
      ];
    });

    it('starting with "model." should be assigned with only one watcher', () => {
      testModelAccessor('model.nested');
    });

    it('starting with "model[" should be assigned with only one watcher', () => {
      testModelAccessor('model["nested"]');
    });

    it('starting with "formState." should be assigned with only one watcher', () => {
      testFormStateAccessor('formState.nested');
    });

    it('starting with "formState[" should be assigned with only one watcher', () => {
      testFormStateAccessor('formState["nested"]');
    });

    function testModelAccessor(accessor) {
      scope.fields[0].model = accessor;

      compileAndDigest();
      $timeout.flush();

      scope.fields[0].expressionProperties = {'data.dummy': spy};

      scope.model.nested.foo = 'value';
      scope.$digest();
      $timeout.flush();

      expect(spy).to.have.been.calledOnce;
    }

    function testFormStateAccessor(accessor) {
      const formWithOptions = '<formly-form model="model" fields="fields" options="options"></formly-form>';
      scope.options = {
        formState: {
          nested: {}
        }
      };
      scope.fields[0].model = accessor;

      compileAndDigest(formWithOptions);
      $timeout.flush();

      scope.fields[0].expressionProperties = {'data.dummy': spy};

      scope.options.formState.nested.foo = 'value';
      scope.$digest();
      $timeout.flush();

      expect(spy).to.have.been.calledOnce;
    }
  });

  describe('hideExpression', () => {
    beforeEach(() => {
      scope.model = {};
      scope.fieldModel = {};

      scope.fields = [
        {template: input, key: 'foo', model: scope.fieldModel},
        {template: input, key: 'bar', model: scope.fieldModel, hideExpression: () => !!scope.fieldModel.foo}
      ];
    });

    it('should be called and resolve to true when field model changes', () => {
      compileAndDigest();
      expect(scope.fields[1].hide).be.false;
      scope.fields[0].formControl.$setViewValue('value');
      expect(scope.fields[1].hide).be.true;
    });

    it('should be called and resolve to false when field model changes', () => {
      scope.fieldModel.foo = 'value';
      compileAndDigest();
      expect(scope.fields[1].hide).be.true;
      scope.fields[0].formControl.$setViewValue('');
      expect(scope.fields[1].hide).be.false;
    });
  });

  describe(`options`, () => {
    beforeEach(() => {
      scope.model = {
        foo: 'myFoo',
        bar: 123,
        foobar: 'ab@cd.com'
      };

      scope.fields = [
        {template: input, key: 'foo'},
        {template: input, key: 'bar', templateOptions: {type: 'numaber'}},
        {template: input, key: 'foobar', templateOptions: {type: 'email'}}
      ];
      scope.options = {
        formState: {
          foo: 'bar'
        }
      };
    });

    it(`should throw an error with extra options`, () => {
      expect(() => {
        scope.options = {extra: true};
        compileAndDigest();
      }).to.throw();
    });

    it(`should run expressionProperties when the formState changes`, () => {
      const spy = sinon.spy();
      const field = {
        template: input,
        key: 'foo',
        expressionProperties: {
          'templateOptions.label': spy
        }
      };
      scope.fields = [field];
      compileAndDigest();
      scope.options.formState.foo = 'eggs';
      scope.$digest();
      $timeout.flush();
      expect(spy).to.have.been.called;
    });

    describe(`resetModel`, () => {
      it(`should reset the model that's given`, () => {
        compileAndDigest();
        expect(typeof scope.options.resetModel).to.eq('function');
        const previousFoo = scope.model.foo;
        scope.model.foo = 'newFoo';
        scope.options.resetModel();
        expect(scope.model.foo).to.eq(previousFoo);
      });

      it(`should reset the $viewValue of fields`, () => {
        compileAndDigest();
        const previousFoobar = scope.model.foobar;
        scope.fields[2].formControl.$setViewValue('not-an-email');
        scope.options.resetModel();
        expect(scope.fields[2].formControl.$viewValue).to.equal(previousFoobar);
      });

      it(`should reset the $viewValue and $modelValue to undefined if the value was not originally defined`, () => {
        scope.fields.push({
          template: input, key: 'baz', templateOptions: {required: true}
        });
        compileAndDigest();
        const fc = scope.fields[scope.fields.length - 1].formControl;
        scope.model.baz = 'hello world';
        scope.$digest();
        expect(fc.$viewValue).to.eq('hello world');
        expect(fc.$modelValue).to.eq('hello world');
        scope.options.resetModel();
        expect(scope.model.baz).to.be.undefined;
        expect(fc.$viewValue).to.be.undefined;
        expect(fc.$modelValue).to.be.undefined;
      });

      it(`should rerender the ng-model element`, () => {
        const el = compileAndDigest();
        const ngModelNode = el[0].querySelector('[ng-model]');
        scope.model.foo = 'hey there!';
        scope.$digest();
        scope.options.resetModel();
        expect(ngModelNode.value).to.eq('myFoo');
      });

      it(`should reset models of fields`, () => {
        scope.fieldModel = {baz: false};
        scope.fields.push({
          template: input, key: 'baz', model: scope.fieldModel
        });

        compileAndDigest();

        scope.fieldModel.baz = true;
        scope.options.resetModel();
        expect(scope.fieldModel.baz).to.be.false;
      });

      it(`should not break if a fieldGroup has yet to be initialized`, () => {
        scope.fields = [
          {fieldGroup: [getNewField()], hide: true}
        ];
        compileAndDigest();
        expect(() => scope.options.resetModel()).to.not.throw();
      });

      it(`should not break if a field has yet to be initialized`, () => {
        scope.fields = [getNewField({hide: true})];
        compileAndDigest();
        expect(() => scope.options.resetModel()).to.not.throw();
      });
    });

    describe(`hide-directive attribute`, () => {
      beforeEach(() => {
        scope.fields = [{template: input, key: 'foo'}];
      });

      it(`should default to ng-if`, () => {
        compileAndDigest(basicForm);
        const fieldNode = el[0].querySelector('.formly-field');
        expect(fieldNode.getAttribute('ng-if')).to.exist;
      });

      it(`should allow custom directive for hiding`, () => {
        compileAndDigest(`
          <formly-form model="model" fields="fields" hide-directive="ng-show"></formly-form>
        `);
        const fieldNode = el[0].querySelector('.formly-field');
        expect(fieldNode.getAttribute('ng-if')).to.not.exist;
        expect(fieldNode.getAttribute('ng-show')).to.exist;
      });

    });

    describe(`track-by attribute`, () => {
      const template = `<formly-form model="model" fields="fields" track-by="field.key"></formly-form>`;

      beforeEach(() => {
        scope.fields = [getNewField(), getNewField(), getNewField()];
      });

      it(`should default to track by $$hashKey when the attribute is not present`, () => {
        compileAndDigest(basicForm);
        expect(scope.fields[0].$$hashKey).to.exist;
      });

      it(`should track by the specified value`, () => {
        compileAndDigest(template);
        expectTrackBy('field.key');
      });

      it(`should allow you to track by $index`, () => {
        compileAndDigest(`<formly-form model="model" fields="fields" track-by="$index"></formly-form>`);
        expectTrackBy('$index');
      });

      it(`should throw an error when the field's specified values are not unique`, () => {
        scope.fields.push({template: input, key: 'foo'});
        scope.fields.push({template: input, key: 'foo'});
        expect(compileAndDigest.bind(null, template)).to.throw('ngRepeat:dupes');
      });

      it(`should allow you to push a field after initial compile`, () => {
        expectFieldChange(scope.fields.push.bind(scope.fields, getNewField()));
      });

      it(`should allow you to pop a field after initial compile`, () => {
        expectFieldChange(scope.fields.pop.bind(scope.fields));
      });

      it(`should allow you to splice out a field after initial compile`, () => {
        expectFieldChange(scope.fields.splice.bind(scope.fields, 1, 1));
      });

      it(`should allow you splice in a field after initial compile`, () => {
        expectFieldChange(scope.fields.splice.bind(scope.fields, 1, 0, getNewField()));
      });

      function expectTrackBy(trackBy) {
        expect(el[0].innerHTML).to.contain(`field in fields track by ${trackBy}`);
      }

      function expectFieldChange(change) {
        compileAndDigest(template);
        change();
        expect(() => scope.$digest()).to.not.throw();
      }
    });

    describe(`updateInitialValue`, () => {

      it(`should update the initial value of the fields`, () => {
        compileAndDigest();
        const field = scope.fields[0];
        expect(field.initialValue).to.equal('myFoo');
        scope.model.foo = 'otherValue';
        scope.options.updateInitialValue();
        expect(field.initialValue).to.equal('otherValue');
      });

      it(`should reset to the updated initial value`, () => {
        compileAndDigest();
        const field = scope.fields[0];
        scope.model.foo = 'otherValue';
        scope.options.updateInitialValue();
        scope.model.foo = 'otherValueAgain';
        scope.options.resetModel();
        expect(field.initialValue).to.equal('otherValue');
        expect(scope.model.foo).to.equal('otherValue');
      });
    });

    describe(`removeChromeAutoComplete`, () => {
      it(`should not have a hidden input when nothing is specified`, () => {
        const el = compileAndDigest();
        const autoCompleteFixEl = el[0].querySelector('[autocomplete="address-level4"]');
        expect(autoCompleteFixEl).to.be.null;
      });

      it(`should add a hidden input when specified as true`, () => {
        scope.options.removeChromeAutoComplete = true;
        const el = compileAndDigest();
        const autoCompleteFixEl = el[0].querySelector('[autocomplete="address-level4"]');
        expect(autoCompleteFixEl).to.exist;
      });

      it(`should override the 'true' global configuration`, inject((formlyConfig) => {
        formlyConfig.extras.removeChromeAutoComplete = true;
        scope.options.removeChromeAutoComplete = false;
        const el = compileAndDigest();
        const autoCompleteFixEl = el[0].querySelector('[autocomplete="address-level4"]');
        expect(autoCompleteFixEl).to.be.null;
      }));

      it(`should be added regardless of the option if the global config is set`, inject((formlyConfig) => {
        formlyConfig.extras.removeChromeAutoComplete = true;
        const el = compileAndDigest();
        const autoCompleteFixEl = el[0].querySelector('[autocomplete="address-level4"]');
        expect(autoCompleteFixEl).to.exist;
      }));
    });

    describe(`fieldTransform`, () => {
      beforeEach(() => {
        formlyConfig.extras.fieldTransform = fieldTransform;
      });

      it(`should give a deprecation warning when formlyConfig.extras.fieldTransform is a function rather than an array`, inject(($log) => {
        shouldWarnWithLog(
          $log,
          [
            'Formly Warning:',
            'fieldTransform as a function has been deprecated.',
            /Attempted for formlyConfig.extras/
          ],
          compileAndDigest
        );
      }));

      it(`should give a deprecation warning when options.fieldTransform function rather than an array`, inject(($log) => {
        formlyConfig.extras.fieldTransform = undefined;
        scope.fields = [getNewField()];
        scope.options.fieldTransform = fields => fields;
        shouldWarnWithLog(
          $log,
          [
            'Formly Warning:',
            'fieldTransform as a function has been deprecated.',
            'Attempted for form'
          ],
          compileAndDigest
        );
      }));

      it(`should throw an error if something is passed in and nothing is returned`, () => {
        scope.fields = [getNewField()];
        scope.options.fieldTransform = function() {
          // I return nothing...
        };
        expect(() => compileAndDigest()).to.throw(/^Formly Error: fieldTransform must return an array of fields/);
      });

      it(`should allow you to transform field configuration`, () => {
        scope.options.fieldTransform = fieldTransform;
        const spy = sinon.spy(scope.options, 'fieldTransform');
        doExpectations(spy);
      });

      it(`should use formlyConfig.extras.fieldTransform when not specified on options`, () => {
        const spy = sinon.spy(formlyConfig.extras, 'fieldTransform');
        doExpectations(spy);
      });

      it(`should allow you to use an array of transform functions`, () => {
        scope.fields = [getNewField({
          customThing: 'foo',
          otherCustomThing: {
            whatever: '|-o-|'
          }})];
        scope.options.fieldTransform = [fieldTransform];
        expect(() => compileAndDigest()).to.not.throw();

        const field = scope.fields[0];
        expect(field).to.have.deep.property('data.customThing');
        expect(field).to.have.deep.property('data.otherCustomThing');
      });

      function doExpectations(spy) {
        const originalFields = [{
          key: 'keyProp',
          template: '<hr />',
          customThing: 'foo',
          otherCustomThing: {
            whatever: '|-o-|'
          }
        }];
        scope.fields = originalFields;
        compileAndDigest();
        expect(spy).to.have.been.calledWith(originalFields, scope.model, scope.options, scope.form);
        const field = scope.fields[0];

        expect(field).to.not.have.property('customThing');
        expect(field).to.not.have.property('otherCustomThing');
        expect(field).to.have.deep.property('data.customThing');
        expect(field).to.have.deep.property('data.otherCustomThing');
      }

      function fieldTransform(fields) {
        const extraKeys = ['customThing', 'otherCustomThing'];
        return _.map(fields, field => {
          const newField = {data: {}};
          _.each(field, (val, name) => {
            if (_.contains(extraKeys, name)) {
              newField.data[name] = val;
            } else {
              newField[name] = val;
            }
          });
          return newField;
        });
      }
    });

    describe(`data`, () => {
      it(`should allow you to put whatever you want in data`, () => {
        scope.options.data = {foo: 'bar'};
        expect(compileAndDigest).to.not.throw();
      });
    });
  });

  function compileAndDigest(template) {
    el = $compile(template || basicForm)(scope);
    scope.$digest();
    return el;
  }

  describe(`field watchers`, () => {
    it('should throw for a watcher with no listener', () => {
      scope.fields = [getNewField({
        watcher: {}
      })];

      expect(compileAndDigest).to.throw();
    });

    it(`should setup any watchers specified on a field`, () => {
      scope.model = {};

      const listener = sinon.spy();
      const expression = sinon.spy();

      scope.fields = [getNewField({
        watcher: {
          listener: ''
        }
      }), getNewField({
        watcher: [{
          listener: '',
          expression: ''
        }, {
          listener,
          expression
        }]
      })];

      expect(compileAndDigest).to.not.throw();
      expect(listener).to.have.been.called;
      expect(expression).to.have.been.called;
    });
  });
});
