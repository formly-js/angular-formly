module.exports = ngModule => {
  describe(`formly-custom-validation`, function() {
    let $compile, $timeout, $q, scope;
    let formTemplate = `<form name="myForm">TEMPLATE</form>`;
    beforeEach(window.module(ngModule.name));
    beforeEach(inject((_$compile_, _$timeout_, _$q_, $rootScope) => {
      $compile = _$compile_;
      $timeout = _$timeout_;
      $q = _$q_;
      scope = $rootScope.$new();
      scope.customValidation = {};
      scope.options = {validation:{}};
    }));

    describe(`using parsers`, () => {
      checkApi(formTemplate.replace(
        `TEMPLATE`, `<input ng-model="input" name="field" formly-custom-validation="customValidation" use-parsers />`
      ), angular.version.minor >= 3);
    });

    describe(`using $validators`, () => {
      checkApi(formTemplate.replace(
        `TEMPLATE`, `<input ng-model="input" name="field" formly-custom-validation="customValidation" />`
      ));
    });

    function checkApi(template, versionThreeOrBetterAndEmulating) {
      const value = `hello`;
      it(`should pass if returning a string that passes`, () => {
        doValidation(`$viewValue === "${value}"`, true);
      });

      it(`should fail if returning a string that fails`, () => {
        doValidation(`$viewValue !== "${value}"`, false);
      });

      it(`should pass if it's a function that passes`, () => {
        doValidation(viewValue => viewValue === value, true);
      });

      it(`should fail if it's a function that fails`, () => {
        doValidation(viewValue => viewValue !== value, false);
      });

      it(`should pass if it's a function that returns a promise that resolves`, () => {
        doValidation(() => $q.when(), true);
      });

      it(`should fail if it's a function that returns a promise that rejects`, () => {
        doValidation(() => $q.reject(), false);
      });

      it(`should be pending until the promise is resolved`, () => {
        const deferred = $q.defer();
        const deferred2 = $q.defer();
        scope.customValidation.isHello = () => deferred.promise;
        scope.customValidation.isHey = () => deferred2.promise;
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

      function doValidation(validator, pass) {
        scope.customValidation.isHello = validator;
        $compile(template)(scope);
        const field = scope.myForm.field;
        scope.$digest();
        field.$setViewValue(value);
        scope.$digest();
        expect(field.$valid).to.eq(pass);
      }
    }
  });
};
