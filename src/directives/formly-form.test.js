import {expect} from 'chai';
import testUtils from '../test.utils.js';
import angular from 'angular-fix';

const {getNewField, input, basicForm} = testUtils;

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


  it(`should not require a form attribute`, () => {
    expect(() => {
      compileAndDigest(`
        <formly-form model="model" fields="fields"></formly-form>
      `);
    }).to.not.throw();
  });

  it(`should require the model attribute`, () => {
    expect(() => {
      compileAndDigest(`
        <formly-form fields="fields"></formly-form>
      `);
    }).to.throw();
  });

  it(`should require the fields attribute`, () => {
    expect(() => {
      compileAndDigest(`
        <formly-form model="model"></formly-form>
      `);
    }).to.throw();
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
  });

  it(`should allow you to completely swap out the fields`, () => {
    scope.fields = [getNewField(), getNewField()];
    compileAndDigest(basicForm);
    scope.fields = [getNewField(), getNewField()];

    expect(() => scope.$digest()).to.not.throw();
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
        getNewField({key: 'foo', hideExpression: 'model.baz === "foobar"'})
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
  });

  describe(`options`, () => {
    const template = '<formly-form options="options" model="model" fields="fields"></formly-form>';
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
      scope.options = {};
    });

    it(`should throw an error with extra options`, () => {
      expect(() => {
        scope.options = {extra: true};
        compileAndDigest(`
          <formly-form model="model" fields="fields" options="options"></formly-form>
        `);
      }).to.throw();
    });

    describe(`resetModel`, () => {
      it(`should reset the model that's given`, () => {
        compileAndDigest(template);
        expect(typeof scope.options.resetModel).to.eq('function');
        const previousFoo = scope.model.foo;
        scope.model.foo = 'newFoo';
        scope.options.resetModel();
        expect(scope.model.foo).to.eq(previousFoo);
      });

      it(`should reset the $viewValue of fields`, () => {
        compileAndDigest(template);
        const previousFoobar = scope.model.foobar;
        scope.fields[2].formControl.$setViewValue('not-an-email');
        scope.options.resetModel();
        expect(scope.fields[2].formControl.$viewValue).to.equal(previousFoobar);
      });

      it(`should reset the $viewValue and $modelValue to undefined if the value was not originally defined`, () => {
        scope.fields.push({
          template: input, key: 'baz', templateOptions: {required: true}
        });
        compileAndDigest(template);
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
        const el = compileAndDigest(template);
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

        compileAndDigest(template);

        scope.fieldModel.baz = true;
        scope.options.resetModel();
        expect(scope.fieldModel.baz).to.be.false;
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

    describe(`options`, () => {
      describe(`updateInitialValue`, () => {

        it(`should update the initial value of the fields`, () => {
          compileAndDigest(template);
          const field = scope.fields[0];
          expect(field.initialValue).to.equal('myFoo');
          scope.model.foo = 'otherValue';
          scope.options.updateInitialValue();
          expect(field.initialValue).to.equal('otherValue');
        });

        it(`should reset to the updated initial value`, () => {
          compileAndDigest(template);
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
          const el = compileAndDigest(template);
          const autoCompleteFixEl = el[0].querySelector('[autocomplete="address-level4"]');
          expect(autoCompleteFixEl).to.be.null;
        });

        it(`should add a hidden input when specified as true`, () => {
          scope.options.removeChromeAutoComplete = true;
          const el = compileAndDigest(template);
          const autoCompleteFixEl = el[0].querySelector('[autocomplete="address-level4"]');
          expect(autoCompleteFixEl).to.exist;
        });

        it(`should override the 'true' global configuration`, inject((formlyConfig) => {
          formlyConfig.extras.removeChromeAutoComplete = true;
          scope.options.removeChromeAutoComplete = false;
          const el = compileAndDigest(template);
          const autoCompleteFixEl = el[0].querySelector('[autocomplete="address-level4"]');
          expect(autoCompleteFixEl).to.be.null;
        }));

        it(`should be added regardless of the option if the global config is set`, inject((formlyConfig) => {
          formlyConfig.extras.removeChromeAutoComplete = true;
          const el = compileAndDigest(template);
          const autoCompleteFixEl = el[0].querySelector('[autocomplete="address-level4"]');
          expect(autoCompleteFixEl).to.exist;
        }));
      });
    });
  });

  function compileAndDigest(template) {
    el = $compile(template || basicForm)(scope);
    scope.$digest();
    return el;
  }


});
