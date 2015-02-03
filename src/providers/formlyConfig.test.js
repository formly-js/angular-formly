/* jshint maxlen:false */
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

    describe('setType/getType', () => {
      var getterFn, setterFn;
      var type = 'input';
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
          setterFn({type, template});
          expect(getterFn(type).template).to.equal(template);
        });

        it('should accept an object with a name and a templateUrl', () => {
          setterFn({type, templateUrl});
          expect(getterFn(type).templateUrl).to.equal(templateUrl);
        });

        it('should accept an array of objects', () => {
          setterFn([
            {type, template},
            {type: 'type2', templateUrl}
          ]);
          expect(getterFn(type).template).to.equal(template);
          expect(getterFn('type2').templateUrl).to.equal(templateUrl);
        });

        it('should allow you to set a wrapper as a string', () => {
          setterFn({type, template, wrapper});
          expect(getterFn(type).wrapper).to.equal(wrapper);
        });

        it('should allow you to set a wrapper as an array', () => {
          setterFn({type, template, wrapper: [wrapper, wrapper2]});
          expect(getterFn(type).wrapper).to.eql([wrapper, wrapper2]);
        });
      });

      describe('(◞‸◟；) path', () => {
        it('should throw an error when the first argument is not an object or an array', () => {
          expect(() => setterFn('string')).to.throw(/must.*provide.*object.*array/);
          expect(() => setterFn(324)).to.throw(/must.*provide.*object.*array/);
          expect(() => setterFn(false)).to.throw(/must.*provide.*object.*array/);
        });

        it(`should throw an error when there is not a specified template or templateUrl`, () => {
          expect(() => setterFn([
            {type, template},
            {type: 'type2', foo:'bar'}
          ])).to.throw(/must.*provide.*template.*templateUrl/);
          expect(() => setterFn({type})).to.throw(/must.*provide.*template.*templateUrl/);
        });

        it('should throw an error when a type is not provided', () => {
          expect(() => setterFn({templateUrl})).to.throw(/must.*provide.*type/);
        });

        it('should warn when attempting to override a type', () => {
          shouldWarn(/overwrite/, function() {
            setterFn({type, template});
            setterFn({type, template});
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
          expect(getterFn(types[0])).to.equal(option);
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
        expect(getterFn(name)).to.be.undefined;
      });

      it('should allow you to remove a wrapper for a type', () => {
        setterFn({types, template});
        setterFn({types: types2, template});
        var checkboxAndSomethingElseWrapper = setterFn({types: types3, template});
        removeForType('input');
        expect(getByTypeFn('input')).to.be.undefined;
        var checkboxWrappers = getByTypeFn('checkbox');
        expect(checkboxWrappers).to.not.be.instanceOf(Array);
        expect(checkboxWrappers).to.eq(checkboxAndSomethingElseWrapper)
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
