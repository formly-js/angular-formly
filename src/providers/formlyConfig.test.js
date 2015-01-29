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
      var name = 'hi';
      var name2 = 'name2';
      var template2 = template + '2';
      beforeEach(inject(function(formlyConfig) {
        getterFn = formlyConfig.getTemplateWrapper;
        setterFn = formlyConfig.setTemplateWrapper;
      }));

      describe('＼(＾O＾)／ path', function() {
        describe('the default template', function() {
          it('calls with argument (template) should be assigned to the default template as a template', function() {
            setterFn(template);
            expect(getterFn()).to.eql({template, name: 'default'});
          });

          it('calls with argument (name, template) should be assigned to the name as a template', function() {
            setterFn(name, template);
            expect(getterFn(name)).to.eql({template, name});
          });

          it('calls with arguments (url, isUrl) should be assigned to the default template as a url', function() {
            setterFn(url, true);
            expect(getterFn()).to.eql({url, name: 'default'});
          });

          it('calls with arguments (name, url, isUrl) should be assigned to the name as a url', function() {
            setterFn(name, url, true);
            expect(getterFn(name)).to.eql({name, url});
          });

          it('calls with object argument should be assigned by property', function() {
            setterFn({
              [name]: template,
              [name2]: template2
            });
            expect(getterFn(name)).to.eql({name, template});
            expect(getterFn(name2)).to.eql({name: name2, template: template2});
          });

          it('calls with an object with the default name should be gotten without an argument', function() {
            setterFn({'default': template});
            expect(getterFn()).to.eql({name: 'default', template});
          });

          it('should accept object objects with the default', function() {
            setterFn({'default': {url}});
            expect(getterFn()).to.eql({name: 'default', url});
          });

          it('should accept accept object objects with custom names and types', function() {
            setterFn({
              [name]: {template},
              [name2]: {url}
            });
            expect(getterFn(name)).to.eql({name, template});
            expect(getterFn(name2)).to.eql({name: name2, url});
          });
        });
      });

      describe('(◞‸◟；) path', function() {
        it('should throw an error when providing both a template and url', function() {
          expect(() => setterFn({[name]: {template, url}})).to.throw(/only.*?url.*?or.*?template/);
        });

        it('should throw an error when providing neither a template or a url', function() {
          expect(() => setterFn({[name]: {}})).to.throw(/one.*?url.*?or.*?template/);
        });

        it('should throw an error when the template does not use formly-transclude', function() {
          var error = /templates.*?must.*?<formly-transclude><\/formly-transclude>/;
          expect(() => setterFn({[name]: {template: 'no formly-transclude'}})).to.throw(error);
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
