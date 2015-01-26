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
let formlyJs = require('!raw!./formlyJs.js')

module.exports = {
  name: ngModule.name,
  url: '',
  template: require('./index.html'),
  controller: function() {
    var vm = this;
    angular.extend(vm, {bootstrapHtml, formlyHtml, formlyJs});
  },
  controllerAs: 'vm',
  data: {
    activationEvents: 'goHome'
  }
};

