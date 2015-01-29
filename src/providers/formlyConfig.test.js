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
            expect(getterFn()).to.eql({name: 'default', template});
          });

          it('can be a string with a name', function() {
            setterFn(template, name);
            expect(getterFn(name)).to.eql({name, template});
          });

          it('can be an object with a template', function() {
            setterFn({template});
            expect(getterFn()).to.eql({name: 'default', template});
          });

          it('can be an object with a template and a name', function() {
            setterFn({template, name});
            expect(getterFn(name)).to.eql({name, template});
          });

          it('can be an object with a url', function() {
            setterFn({url});
            expect(getterFn()).to.eql({name: 'default', url});
          });

          it('can be an object with a url and a name', function() {
            setterFn({name, url});
            expect(getterFn(name)).to.eql({name, url});
          });

          it('can be an array of objects with names, urls, and/or templates', function() {
            setterFn([
              {url},
              {name, template},
              {name: name2, template: template2}
            ]);
            expect(getterFn()).to.eql({url, name: 'default'});
            expect(getterFn(name)).to.eql({template, name});
            expect(getterFn(name2)).to.eql({template: template2, name: name2});
          });

          it('can specify types as a string', function() {
            setterFn({types: typesString, template});
            expect(getterFn()).to.eql({template, name: 'default', types: [typesString]});
          });

          it('can specify types as an array', function() {
            setterFn({types, template});
            expect(getterFn()).to.eql({template, name: 'default', types});
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

        it('should warn when attempting to override a template wrapper', function() {
          setterFn({template});
          setterFn({template});
          expect($log.warn.logs[0]).to.match(/overwrite/);
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
