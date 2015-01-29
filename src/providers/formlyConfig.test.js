module.exports = ngModule => {
  describe('formlyConfig', function() {
    beforeEach(window.module(ngModule.name));

    describe('setTemplate/getTemplate', function() {
      testGetterSetters('getTemplate', 'setTemplate');
    });

    describe('setTemplateUrl/getTemplateUrl', function() {
      testGetterSetters('getTemplateUrl', 'setTemplateUrl');
    });

    describe('setTemplateWrapper/getTemplateWrapper', function() {
      var getterFn, setterFn;
      var template = '<span>This is my <formly-transclude></formly-transclude> template';
      var url = '/path/to/my/template.html';
      var typesString = 'checkbox';
      var types = ['text', 'textarea'];
      var name = 'hi';
      var name2 = 'name2';
      var template2 = template + '2';
      var $log;
      beforeEach(inject(function(formlyConfig, _$log_) {
        getterFn = formlyConfig.getTemplateWrapper;
        setterFn = formlyConfig.setTemplateWrapper;
        $log = _$log_;
      }));

      describe('＼(＾O＾)／ path', function() {
        describe('the default template', function() {

          it('can be a string without a name', function() {
            setterFn(template);
            expect(getterFn()).to.eql({name: 'default', template, types: []});
          });

          it('can be a string with a name', function() {
            setterFn(template, name);
            expect(getterFn(name)).to.eql({name, template, types: []});
          });

          it('can be an object with a template', function() {
            setterFn({template});
            expect(getterFn()).to.eql({name: 'default', template, types: []});
          });

          it('can be an object with a template and a name', function() {
            setterFn({template, name});
            expect(getterFn(name)).to.eql({name, template, types: []});
          });

          it('can be an object with a url', function() {
            setterFn({url});
            expect(getterFn()).to.eql({name: 'default', url, types: []});
          });

          it('can be an object with a url and a name', function() {
            setterFn({name, url});
            expect(getterFn(name)).to.eql({name, url, types: []});
          });

          it('can be an array of objects with names, urls, and/or templates', function() {
            setterFn([
              {url},
              {name, template},
              {name: name2, template: template2}
            ]);
            expect(getterFn()).to.eql({url, name: 'default', types: []});
            expect(getterFn(name)).to.eql({template, name, types: []});
            expect(getterFn(name2)).to.eql({template: template2, name: name2, types: []});
          });

          it('can specify types as a string (using types as the name when not specified)', function() {
            setterFn({types: typesString, template});
            expect(getterFn(typesString)).to.eql({template, name: typesString, types: [typesString]});
          });

          it('can specify types as an array (using types as the name when not specified)', function() {
            setterFn({types, template});
            expect(getterFn(types.join(' '))).to.eql({template, name: types.join(' '), types});
          });
        });
      });

      describe('(◞‸◟；) path', function() {
        it('should throw an error when providing both a template and url', function() {
          expect(() => setterFn({template, url}, name)).to.throw(/only.*?url.*?or.*?template/);
        });

        it('should throw an error when providing neither a template or a url', function() {
          expect(() => setterFn({}, name)).to.throw(/one.*?url.*?or.*?template/);
        });

        it('should throw an error when the template does not use formly-transclude', function() {
          var error = /templates.*?must.*?<formly-transclude><\/formly-transclude>/;
          expect(() => setterFn({template: 'no formly-transclude'})).to.throw(error);
        });

        it('should throw an error when specifying a type that already exists on another template wrapper', function() {
          var error = /types.*?already.*?specified/;
          expect(() => setterFn({template, types}) && setterFn({url, types: types[0]})).to.throw(error);
        });

        it('should throw an error when specifying an array type where not all items are strings', function() {
          var error = /types.*?string.*?array.*?strings/;
          expect(() => setterFn({template, types: ['hi', 2, false, 'cool']})).to.throw(error);
        });

        it('should warn when attempting to override a template wrapper', function() {
          var originalWarn = console.warn;
          var calledArgs;
          console.warn = function() {
            calledArgs = arguments;
          };
          setterFn({template});
          setterFn({template});
          expect(calledArgs[0]).to.match(/overwrite/);
          console.warn = originalWarn;
        });
      });

    });


    describe('getTemplateWrapperByType', function() {
      var getterFn, setterFn;
      var types = ['input', 'checkbox'];
      var url = '/path/to/file.html';
      beforeEach(inject(function(formlyConfig) {
        setterFn = formlyConfig.setTemplateWrapper;
        getterFn = formlyConfig.getTemplateWrapperByType;
      }));

      describe('＼(＾O＾)／ path', function() {
        it('should return a template wrapper that has the same type', function() {
          var option = setterFn({url, types});
          expect(getterFn(types[0])).to.equal(option);
        });

      });
    });

    function testGetterSetters(getter, setter) {
      var getterFn, setterFn;
      beforeEach(inject(function(formlyConfig) {
        getterFn = formlyConfig[getter];
        setterFn = formlyConfig[setter];
      }));


      describe('＼(＾O＾)／ path', function() {
        it('should accept a string name and string template', function() {
          setterFn('(- o - ) zzZ ☽', 'sleepy');
        });

        it('should provide a retrievable template', function() {
          var templateName = 'd-_-b';
          var template = 'sweet template';
          setterFn(templateName, template);
          expect(getterFn(templateName)).to.equal(template);
        });

        it('should return undefined if there is no template', function() {
          expect(getterFn(`¯\_ಠ_ಠ_/¯`)).to.be.undefined;
        });

        it('should accept an object', function() {
          var name = `<(-'.'-)>`;
          var template = 'es6 is so awesome';
          setterFn({
            '(._.) ~': '︵ ┻━┻',
            [name]: template
          });
          expect(getterFn(name)).to.equal(template);
        });
      });

      describe('(◞‸◟；) path', function() {
        it('should throw an error when you give it nothing for the name', function() {
          expect(() => setterFn(null, '＠ノ"')).to.throw(/must.*provide.*name/);
        });

        it('should throw an error when you give it nothing for the template', function() {
          expect(() => setterFn('ノ(ジ)ー')).to.throw(/must.*provide.*template/);
        });
      });
    }
  });
};
