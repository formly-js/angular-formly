'use strict';
/* jshint expr: true */
/* global describe:false, it:false */

var expect = require('chai').expect,
  path = require('path'),
  layoutsManager = require('../tasks/lib/layouts_manager');

describe('Layout Manager', function() {
  describe('built-in named layouts', function() {
    it('should support "byType" layout', function() {
      var byTypeLayout = layoutsManager.getLayout('byType');

      expect(byTypeLayout).to.exist;
      expect(byTypeLayout('js', 'bootstrap')).to.equal(path.normalize('js/bootstrap'));
    });

    it('should support "byComponent" layout', function() {
      var byComponentLayout = layoutsManager.getLayout('byComponent');

      expect(byComponentLayout).to.exist;
      expect(byComponentLayout('sass', 'bourbone')).to.equal(path.normalize('bourbone/sass'));
    });
  });

  it('should support custom layouts as functions', function() {
    var customLayout = layoutsManager.getLayout(function(type, pkg) {
      return type + pkg;
    });

    expect(customLayout).to.be.a('function');
    expect(customLayout('img', 'logo.png')).to.equal('imglogo.png');
  });
});
