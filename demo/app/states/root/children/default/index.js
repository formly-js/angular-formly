// gotta put it on window because angular-highlightjs depends on it being there :-(
var hljs = window.hljs = require('highlight.js/lib/highlight.js');
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('html', require('highlight.js/lib/languages/xml'));
require('highlight.js/styles/github.css');

require('imports?hljs=highlight.js!angular-highlightjs/angular-highlightjs');
var deps = [require('ngCommon').name, 'hljs'];

let ngModule = require('registerModule')(deps);

let bootstrapHtml = require('./bootstrapHtml.html');
let formlyHtml = require('./formlyHtml.html');
let formlyJs = require('!raw!./formlyJs.js');

module.exports = {
  name: ngModule.name,
  url: '',
  template: require('./index.html'),
  data: {
    activationEvents: 'goHome'
  },
  controllerAs: 'vm',
  controller: function() {
    var vm = this;
    var base  = `https://github.com/formly-js/angular-formly`;
    angular.extend(vm, {bootstrapHtml, formlyHtml, formlyJs});
    vm.docs = docs;
    vm.base = baseWithSuffix;
    vm.prebuiltTemplates = defaultTemplates([
      {name: 'Bootstrap'}, {name: 'LumX'}, {name: 'Vanilla HTML', suffix: 'vanilla'}
    ]);
    vm.wipTemplates = defaultTemplates([
      {name: 'angular-material', suffix: 'material'}, {name: 'Ionic'}, {name: 'Foundation'}
    ]);

    function docs(slug) {
      return baseWithSuffix(`#${slug.toLowerCase().replace(/ /, '-').replace(/&|#/, '')}`);
    }

    function baseWithSuffix(suffix) {
      return `${base}${suffix}`;
    }

    function defaultTemplates(templates) {
      return templates.map(item => ({name: item.name, suffix: item.suffix || item.name.toLowerCase()}));
    }
  }
};

