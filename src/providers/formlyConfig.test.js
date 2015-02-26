/* jshint maxlen:false */
const sinon = require('sinon');
module.exports = ngModule => {
  describe('formlyConfig', () => {
    beforeEach(window.module(ngModule.name));

    describe('setWrapper/getWrapper', () => {
      var getterFn, setterFn;
      var template = '<span>This is my <formly-transclude></formly-transclude> template';
      var templateUrl = '/path/to/my/template.html';
      var typesString = 'checkbox';
      var types = ['text', 'textarea'];
      var name = 'hi';
      var name2 = 'name2';
      var template2 = template + '2';
      var $log;
      beforeEach(inject(function(formlyConfig, _$log_) {
        getterFn = formlyConfig.getWrapper;
        setterFn = formlyConfig.setWrapper;
        $log = _$log_;
      }));

      describe('＼(＾O＾)／ path', () => {
        describe('the default template', () => {

          it('can be a string without a name', () => {
            setterFn(template);
            expect(getterFn()).to.eql({name: 'default', template, types: []});
          });

          it('can be a string with a name', () => {
            setterFn(template, name);
            expect(getterFn(name)).to.eql({name, template, types: []});
          });

          it('can be an object with a template', () => {
            setterFn({template});
            expect(getterFn()).to.eql({name: 'default', template, types: []});
          });

          it('can be an object with a template and a name', () => {
            setterFn({template, name});
            expect(getterFn(name)).to.eql({name, template, types: []});
          });

          it('can be an object with a templateUrl', () => {
            setterFn({templateUrl});
            expect(getterFn()).to.eql({name: 'default', templateUrl, types: []});
          });

          it('can be an object with a templateUrl and a name', () => {
            setterFn({name, templateUrl});
            expect(getterFn(name)).to.eql({name, templateUrl, types: []});
          });

          it('can be an array of objects with names, urls, and/or templates', () => {
            setterFn([
              {templateUrl},
              {name, template},
              {name: name2, template: template2}
            ]);
            expect(getterFn()).to.eql({templateUrl, name: 'default', types: []});
            expect(getterFn(name)).to.eql({template, name, types: []});
            expect(getterFn(name2)).to.eql({template: template2, name: name2, types: []});
          });

          it('can specify types as a string (using types as the name when not specified)', () => {
            setterFn({types: typesString, template});
            expect(getterFn(typesString)).to.eql({template, name: typesString, types: [typesString]});
          });

          it('can specify types as an array (using types as the name when not specified)', () => {
            setterFn({types, template});
            expect(getterFn(types.join(' '))).to.eql({template, name: types.join(' '), types});
          });
        });
      });

      describe('(◞‸◟；) path', () => {
        it('should throw an error when providing both a template and templateUrl', () => {
          expect(() => setterFn({template, templateUrl}, name)).to.throw(/only.*?templateUrl.*?or.*?template/);
        });

        it('should throw an error when providing neither a template or a templateUrl', () => {
          expect(() => setterFn({}, name)).to.throw(/one.*?templateUrl.*?or.*?template/);
        });

        it('should throw an error when the template does not use formly-transclude', () => {
          var error = /templates.*?must.*?<formly-transclude><\/formly-transclude>/;
          expect(() => setterFn({template: 'no formly-transclude'})).to.throw(error);
        });

        it('should throw an error when specifying an array type where not all items are strings', () => {
          var error = /types.*?string.*?array.*?strings/;
          expect(() => setterFn({template, types: ['hi', 2, false, 'cool']})).to.throw(error);
        });

        it('should warn when attempting to override a template wrapper', () => {
          shouldWarn(/overwrite/, function() {
            setterFn({template});
            setterFn({template});
          });
        });

        it('should not warn when attempting to override a template wrapper if overwriteOk is true', () => {
          shouldNotWarn(() => {
            setterFn({template});
            setterFn({template, overwriteOk: true});
          });
        });
      });

    });

    describe('getWrapperByType', () => {
      var getterFn, setterFn;
      var types = ['input', 'checkbox'];
      var types2 = ['input', 'select'];
      var templateUrl = '/path/to/file.html';
      beforeEach(inject(function(formlyConfig) {
        setterFn = formlyConfig.setWrapper;
        getterFn = formlyConfig.getWrapperByType;
      }));

      describe('＼(＾O＾)／ path', () => {
        it('should return a template wrapper that has the same type', () => {
          var option = setterFn({templateUrl, types});
          expect(getterFn(types[0])).to.eql([option]);
        });

        it('should return an array when multiple wrappers have the same time', () => {
          setterFn({templateUrl, types});
          setterFn({templateUrl, types: types2});
          var inputWrappers = getterFn('input');
          expect(inputWrappers).to.be.instanceOf(Array);
          expect(inputWrappers).to.have.length(2);
        });

      });
    });

    describe('removeWrapper', () => {
      var remove, removeForType, setterFn, getterFn, getByTypeFn;
      var template = '<div>Something <formly-transclude></formly-transclude> cool</div>';
      var name = 'name';
      var types = ['input', 'checkbox'];
      var types2 = ['input', 'something else'];
      var types3 = ['checkbox', 'something else'];
      beforeEach(inject((formlyConfig) => {
        remove = formlyConfig.removeWrapperByName;
        removeForType = formlyConfig.removeWrappersForType;
        setterFn = formlyConfig.setWrapper;
        getterFn = formlyConfig.getWrapper;
        getByTypeFn = formlyConfig.getWrapperByType;
      }));

      it('should allow you to remove a wrapper', () => {
        setterFn(template, name);
        remove(name);
        expect(getterFn(name)).to.be.empty;
      });

      it('should allow you to remove a wrapper for a type', () => {
        setterFn({types, template});
        setterFn({types: types2, template});
        var checkboxAndSomethingElseWrapper = setterFn({types: types3, template});
        removeForType('input');
        expect(getByTypeFn('input')).to.be.empty;
        var checkboxWrappers = getByTypeFn('checkbox');
        expect(checkboxWrappers).to.eql([checkboxAndSomethingElseWrapper]);
      });
    });


    describe('setType/getType', () => {
      var getterFn, setterFn;
      var name = 'input';
      var template = '<input type="{{options.inputType}}" />';
      var templateUrl = '/input.html';
      var wrapper = 'input';
      var wrapper2 = 'input2';
      beforeEach(inject(function(formlyConfig) {
        getterFn = formlyConfig.getType;
        setterFn = formlyConfig.setType;
      }));

      describe('＼(＾O＾)／ path', () => {
        it('should accept an object with a name and a template', () => {
          setterFn({name, template});
          expect(getterFn(name).template).to.equal(template);
        });

        it('should accept an object with a name and a templateUrl', () => {
          setterFn({name, templateUrl});
          expect(getterFn(name).templateUrl).to.equal(templateUrl);
        });

        it('should accept an array of objects', () => {
          setterFn([
            {name, template},
            {name: 'type2', templateUrl}
          ]);
          expect(getterFn(name).template).to.equal(template);
          expect(getterFn('type2').templateUrl).to.equal(templateUrl);
        });

        it('should allow you to set a wrapper as a string', () => {
          setterFn({name, template, wrapper});
          expect(getterFn(name).wrapper).to.equal(wrapper);
        });

        it('should allow you to set a wrapper as an array', () => {
          setterFn({name, template, wrapper: [wrapper, wrapper2]});
          expect(getterFn(name).wrapper).to.eql([wrapper, wrapper2]);
        });

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
                      min: 3
                    }
                  }
                },
                {
                  name: 'type2',
                  extends: name,
                  defaultOptions: {
                    templateOptions: {
                      required: false,
                      max: 4
                    },
                    data: {
                      extraStuff: [1, 2, 3]
                    }
                  }
                }
              ]);
            });
            it(`should inherit all fields that it does not have itself`, () => {
              expect(getterFn('type2').template).to.eql(template);
            });

            it(`should merge objects that it shares`, () => {
              expect(getterFn('type2').defaultOptions).to.eql({
                templateOptions: {
                  required: false,
                  min: 3,
                  max: 4
                },
                data: {
                  extraStuff: [1, 2, 3]
                }
              });
            });

            it(`should not error when extends is specified without a template, templateUrl, or defaultOptions`, () => {
              expect(() => setterFn({name: 'type3', extends: 'type2'})).to.not.throw();
            });

          });

          describe(`function cases`, () => {
            let args, parentFn, childFn, parentDefaultOptions, childDefaultOptions,
              argsAndParent;
            beforeEach(() => {
              args = {data: {someData: true}};
              parentDefaultOptions = {
                data: {extraOptions: true},
                templateOptions: {placeholder: 'hi'}
              };
              childDefaultOptions = {
                templateOptions: {placeholder: 'hey', required: true}
              };
              parentFn = sinon.stub().returns(parentDefaultOptions);
              childFn = sinon.stub().returns(childDefaultOptions);
              argsAndParent = {
                data: {someData: true, extraOptions: true},
                templateOptions: {placeholder: 'hi'}
              };
            });

            it(`should call the extended parent's defaultOptions function and its own defaultOptions function`, () => {
              setterFn([
                {name, defaultOptions: parentFn},
                {name: 'type2', extends: name, defaultOptions: childFn}
              ]);
              getterFn('type2').defaultOptions(args);
              expect(parentFn).to.have.been.calledWith(args);
              expect(childFn).to.have.been.calledWith(argsAndParent);
            });

            it(`should call the extended parent's defaultOptions function when it doesn't have one of its own`, () => {
              setterFn([
                {name, defaultOptions: parentFn},
                {name: 'type2', extends: name}
              ]);
              getterFn('type2').defaultOptions(args);
              expect(parentFn).to.have.been.calledWith(args);
            });

            it(`should call its own defaultOptions function when the parent doesn't have one`, () => {
              setterFn([
                {name, template},
                {name: 'type2', extends: name, defaultOptions: childFn}
              ]);
              getterFn('type2').defaultOptions(args);
              expect(childFn).to.have.been.calledWith(args);
            });

            it(`should extend its defaultOptions object with the parent's defaultOptions object`, () => {
              const objectMergedDefaultOptions = {
                data: {extraOptions: true},
                templateOptions: {placeholder: 'hey', required: true}
              };
              setterFn([
                {name, defaultOptions: parentDefaultOptions},
                {name: 'type2', extends: name, defaultOptions: childDefaultOptions}
              ]);
              expect(getterFn('type2').defaultOptions).to.eql(objectMergedDefaultOptions);
            });

            it(`should call its defaultOptions with the parent's defaultOptions object merged with the given args`, () => {
              setterFn([
                {name, defaultOptions: parentDefaultOptions},
                {name: 'type2', extends: name, defaultOptions: childFn}
              ]);
              var returned = getterFn('type2').defaultOptions(args);
              expect(childFn).to.have.been.calledWith(argsAndParent);
              expect(returned).to.eql(childDefaultOptions);
            });
          });

          describe(`link functions`, () => {
            let linkArgs, parentFn, childFn;
            beforeEach(inject(($rootScope) => {
              linkArgs = [$rootScope.$new(), angular.element('<div></div>'), {}];
              parentFn = sinon.spy();
              childFn = sinon.spy();
            }));

            it(`should call the parent link function when there is no child function`, () => {
              setterFn([
                {name, template, link: parentFn},
                {name: 'type2', extends: name}
              ]);
              getterFn('type2').link(...linkArgs);
              expect(parentFn).to.have.been.calledWith(...linkArgs);
            });

            it(`should call the child link function when there is no parent function`, () => {
              setterFn([
                {name, template},
                {name: 'type2', extends: name, link: childFn}
              ]);
              getterFn('type2').link(...linkArgs);
              expect(childFn).to.have.been.calledWith(...linkArgs);
            });

            it(`should call the child link function and the parent link function when they are both present`, () => {
              setterFn([
                {name, template, link: parentFn},
                {name: 'type2', extends: name, link: childFn}
              ]);
              getterFn('type2').link(...linkArgs);
              expect(parentFn).to.have.been.calledWith(...linkArgs);
              expect(childFn).to.have.been.calledWith(...linkArgs);
            });

          });

          describe(`validateOptions functions`, () => {
            let options, parentFn, childFn;
            beforeEach(() => {
              options = {
                data: {
                  a: 'b',
                  c: {d: 'e'}
                }
              };
              parentFn = sinon.spy();
              childFn = sinon.spy();
            });

            it(`should call the parent validateOptions function when there is no child function`, () => {
              setterFn([
                {name, template, validateOptions: parentFn},
                {name: 'type2', extends: name}
              ]);
              getterFn('type2').validateOptions(options);
              expect(parentFn).to.have.been.calledWith(options);
            });

            it(`should call the child validateOptions function when there is no parent function`, () => {
              setterFn([
                {name, template},
                {name: 'type2', extends: name, validateOptions: childFn}
              ]);
              getterFn('type2').validateOptions(options);
              expect(childFn).to.have.been.calledWith(options);
            });

            it(`should call the child validateOptions function and the parent validateOptions function when they are both present`, () => {
              setterFn([
                {name, template, validateOptions: parentFn},
                {name: 'type2', extends: name, validateOptions: childFn}
              ]);
              getterFn('type2').validateOptions(options);
              expect(childFn).to.have.been.calledWith(options);
              expect(parentFn).to.have.been.calledWith(options);
            });

            it(`should pass the result of the child's defaultOptions with the given options to the parent's validateOptions function`, () => {
              const defaultOptions = {data: {f: 'g'}};
              const combinedOptions = {data: {a: 'b', c: {d: 'e'}, f: 'g'}};
              setterFn([
                {name, template, validateOptions: parentFn},
                {name: 'type2', extends: name, validateOptions: childFn, defaultOptions}
              ]);
              getterFn('type2').validateOptions(options);
              expect(childFn).to.have.been.calledWith(options);
              expect(parentFn).to.have.been.calledWith(combinedOptions);
            });
          });

          describe(`controller functions`, () => {
            let parentFn, childFn, $controller, $scope;
            beforeEach(inject(($rootScope, _$controller_) => {
              $scope = $rootScope.$new();
              $controller = _$controller_;
              parentFn = sinon.spy();
              parentFn.$inject = ['$log'];
              childFn = sinon.spy();
              childFn.$inject = ['$http'];
            }));

            it(`should call the parent controller function when there is no child controller function`, inject(($log) => {
              setterFn([
                {name, template, controller: parentFn},
                {name: 'type2', extends: name}
              ]);
              $controller(getterFn('type2').controller, {$scope});
              expect(parentFn).to.have.been.calledWith($log);
            }));

            it(`should call the parent controller function and the child's when there is a child controller function`, inject(($log, $http) => {
              setterFn([
                {name, template, controller: parentFn},
                {name: 'type2', extends: name, controller: childFn}
              ]);
              $controller(getterFn('type2').controller, {$scope});
              expect(parentFn).to.have.been.calledWith($log);
              expect(childFn).to.have.been.calledWith($http);
            }));

            it(`should call the child controller function when there's no parent controller`, inject(($http) => {
              setterFn([
                {name, template},
                {name: 'type2', extends: name, controller: childFn}
              ]);
              $controller(getterFn('type2').controller, {$scope});
              expect(childFn).to.have.been.calledWith($http);
            }));

          });
        });

        describe(`validateOptions`, () => {
          it(`should allow you to specify this as a property of a type`, () => {
            const validateOptions = () => {
            };
            expect(() => {
              setterFn({
                name,
                validateOptions,
                template
              });
            }).to.not.throw();
            expect(getterFn(name).validateOptions).to.be.a('function');
          });
        });
      });

      describe('(◞‸◟；) path', () => {
        it('should throw an error when the first argument is not an object or an array', () => {
          expect(() => setterFn('string')).to.throw(/must.*provide.*object.*array/);
          expect(() => setterFn(324)).to.throw(/must.*provide.*object.*array/);
          expect(() => setterFn(false)).to.throw(/must.*provide.*object.*array/);
        });

        it('should throw an error when a name is not provided', () => {
          expect(() => setterFn({templateUrl})).to.throw(/formlyConfig\.setType/);
        });

        it(`should throw an error when specifying both a template and a templateUrl`, () => {
          expect(() => setterFn({name, template, templateUrl})).to.throw(/formlyConfig\.setType/);
        });

        it(`should throw an error when an extra property is provided`, () => {
          expect(() => setterFn({name, templateUrl, extra: true})).to.throw(/formlyConfig\.setType/);
        });

        it('should warn when attempting to override a type', () => {
          shouldWarn(/overwrite/, function() {
            setterFn({name, template});
            setterFn({name, template});
          });
        });
      });
    });


    function shouldWarn(match, test) {
      var originalWarn = console.warn;
      var calledArgs;
      console.warn = function() {
        calledArgs = arguments;
      };
      test();
      expect(calledArgs[0]).to.match(match);
      console.warn = originalWarn;
    }

    function shouldNotWarn(test) {
      var originalWarn = console.warn;
      var callCount = 0;
      console.warn = () => callCount++;
      test();
      expect(callCount).to.equal(0);
      console.warn = originalWarn;
    }
  });
};
