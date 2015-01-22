'use strict';
/* jshint expr: true */
/* global describe:false, it:false */

var expect = require('chai').expect,
  matcher = require('../tasks/lib/package_matcher');

describe('Package Matcher', function() {
  describe('wildcard support', function() {
    it('* means "any characters"', function() {
      expect(matcher.matches('bootstrap', 'boot*')).to.be.true;
      expect(matcher.matches('bootstrap.date', 'boot*')).to.be.true;

      expect(matcher.matches('bootstrap.date', 'jquery.*')).to.be.false;
    });

    it('should treat "." as dot. Literally.', function() {
      expect(matcher.matches('require.replace', 'require.*')).to.be.true;

      expect(matcher.matches('require-dust', 'require.*')).to.be.false;
    });
  });

  describe('RegExp support', function() {
    it('should treat "/pattern/" as RegExp', function() {
      expect(matcher.matches('jquery.date', '/jq.+/')).to.be.true;

      var dotsPattern = '/jquery.date.v(\\d{1}).\\w{1}/';
      expect(matcher.matches('jquery.date.v1.2', dotsPattern)).to.be.true;
      expect(matcher.matches('jquery-date-v1.2', dotsPattern)).to.be.true; // dot means 'any character' in RegExp

      expect(matcher.matches('jquery.date.v1.2', '/jquery.date.v(\\d{1}).\\w{2}/')).to.be.false;
    });

    it('should take precedence over wildcard', function() {
      expect(matcher.matches('bootstrap.date', '/boo.*/')).to.be.true;
    });
  });
});