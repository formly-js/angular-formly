/* eslint no-unused-vars:0, max-len:0 */
import _ from 'lodash';
import angular from 'angular-fix';
import {expect} from 'chai';

describe(`formly-custom-validation`, function() {
  let $compile, $timeout, $q, scope, $log, formlyConfig;
  let formTemplate = `<form name="myForm">TEMPLATE</form>`;
  beforeEach(window.module('formly'));
  beforeEach(inject((_$compile_, _$timeout_, _$q_, $rootScope, _$log_, _formlyConfig_) => {
    $compile = _$compile_;
    $timeout = _$timeout_;
    $q = _$q_;
    scope = $rootScope.$new();
    scope.options = {validation: {}, validators: {}, asyncValidators: {}};
    $log = _$log_;
    formlyConfig = _formlyConfig_;
  }));

  describe(`using parsers`, () => {
    checkApi(formTemplate.replace(
      `TEMPLATE`, `<input ng-model="input" name="field" formly-custom-validation use-parsers />`
    ), angular.version.minor >= 3);
  });

  describe(`using $validators`, () => {
    checkApi(formTemplate.replace(
      `TEMPLATE`, `<input ng-model="input" name="field" formly-custom-validation />`
    ));

    describe(`validators that are functions placement`, () => {
      it(`should be placed in $asyncValidators because it can return a promise`, () => {
        scope.options.validators.isHello = viewValue => viewValue === 'hello';
        $compile(
          `<form name="myForm"><input ng-model="input" name="field" formly-custom-validation /></form>`
        )(scope);
        scope.$digest();
        const field = scope.myForm.field;
        expect(field.$validators.isHello).to.not.exist;
        expect(field.$asyncValidators.isHello).to.exist;
      });

      it(`should be placed in $validators if formlyConfig.extras.explicitAsync`, () => {
        formlyConfig.extras.explicitAsync = true;
        scope.options.validators.isHello = viewValue => viewValue === 'hello';
        $compile(
          `<form name="myForm"><input ng-model="input" name="field" formly-custom-validation /></form>`
        )(scope);
        scope.$digest();
        const field = scope.myForm.field;
        expect(field.$validators.isHello).to.exist;
        expect(field.$asyncValidators.isHello).to.not.exist;
      });
    });
  });

  describe(`options.validation.messages`, () => {
    it(`should convert all strings to functions`, () => {
      scope.options.validation = {
        messages: {
          isHello: `'"' + $viewValue + '" is not "hello"'`
        }
      };
      $compile(formTemplate.replace(
        `TEMPLATE`, `<input ng-model="input" name="field" formly-custom-validation />`
      ))(scope);

      expect(typeof scope.options.validation.messages.isHello).to.eq('function');
      const field = scope.myForm.field;
      field.$setViewValue('sup');
      expect(scope.options.validation.messages.isHello()).to.eq('"sup" is not "hello"');
    });
  });

  function checkApi(template, versionThreeOrBetterAndEmulating) {
    const value = `hello`;
    describe(`validators`, () => {
      const isAsync = false;
      it(`should pass if returning a string that passes`, () => {
        doValidation(`$viewValue === "${value}"`, true, isAsync);
      });

      it(`should fail if returning a string that fails`, () => {
        doValidation(`$viewValue !== "${value}"`, false, isAsync);
      });

      it(`should pass if it's a function that passes`, () => {
        doValidation(viewValue => viewValue === value, true, isAsync);
      });

      it(`should fail if it's a function that fails`, () => {
        doValidation(viewValue => viewValue !== value, false, isAsync);
      });

      it(`should warn if it's a function that returns a promise for a regular validator (should use asyncValidators instead)`, () => {
        const logArgs = [
          'Formly Warning:',
          'Validators returning promises should use asyncValidators instead of validators.',
          scope.options,
          /validators-returning-promises-should-use-asyncValidators/
        ];
        shouldWarn(logArgs, () => {
          doValidation(() => $q.when(), true, isAsync);
        });
      });
    });

    describe(`asyncValidators`, () => {
      const isAsync = true;
      it(`should pass if it's a function that returns a promise that resolves`, () => {
        doValidation(() => $q.when(), true, isAsync);
      });

      it(`should fail if it's a function that returns a promise that rejects`, () => {
        doValidation(() => $q.reject(), false, isAsync);
      });

      it(`should be pending until the promise is resolved`, () => {
        const deferred = $q.defer();
        const deferred2 = $q.defer();
        scope.options.asyncValidators.isHello = () => deferred.promise;
        scope.options.asyncValidators.isHey = () => deferred2.promise;
        $compile(template)(scope);
        const field = scope.myForm.field;
        scope.$digest();
        field.$setViewValue(value);

        expect(field.$pending).to.exist;
        expect(field.$pending.isHello).to.be.true;
        expect(field.$pending.isHey).to.be.true;

        // because in angular 1.3 they do some interesting stuff with $pending, so can only test $pending in 1.2
        if (!versionThreeOrBetterAndEmulating) {
          deferred.resolve();
          scope.$digest();

          expect(field.$pending).to.exist;
          expect(field.$pending.isHey).to.be.true;
          expect(field.$pending.isHello).to.not.exist;

          deferred2.reject();
          scope.$digest();
          expect(field.$pending).to.not.exist;
        }
      });
    });


    function doValidation(validator, pass, isAsync) {
      if (isAsync) {
        scope.options.asyncValidators.isHello = validator;
      } else {
        scope.options.validators.isHello = validator;
      }
      $compile(template)(scope);
      const field = scope.myForm.field;
      scope.$digest();
      field.$setViewValue(value);
      scope.$digest();
      expect(field.$valid).to.eq(pass);
    }
  }

  function shouldWarn(logArgs, test) {
    /* eslint no-console:0 */
    test();
    expect($log.warn.logs, '$log should have only been called once').to.have.length(1);
    const log = $log.warn.logs[0];
    _.each(logArgs, (arg, index) => {
      if (_.isRegExp(arg)) {
        expect(log[index]).to.match(arg);
      } else {
        expect(log[index]).to.equal(arg);
      }
    });
  }
});
