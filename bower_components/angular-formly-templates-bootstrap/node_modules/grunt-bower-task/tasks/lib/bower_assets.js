var _ = require('lodash');
var Emitter = require('events').EventEmitter;
var path = require('path');
var grunt = require('grunt');
var packageMatcher = require('./package_matcher');

var Assets = function(cwd, componentsDir) {
  this._assets = {};
  this._cwd = cwd;
  this._componentsDir = componentsDir;
};

Assets.prototype.addOverridden = function(override, pkg) {
  var pkgPath = path.join(this._componentsDir, pkg);

  _(override).each(function(overriddenPaths, assetType) {
    this.addAssets(overriddenPaths, pkg, assetType, pkgPath);
  }, this);
};

Assets.prototype.addUntyped = function(pkgFiles, pkg) {
  this.addAssets(pkgFiles, pkg, '__untyped__');
};

Assets.prototype.addAssets = function(filePatterns, pkg, assetType, pkgPath) {
  pkgPath = pkgPath || '';

  if (!_.isArray(filePatterns)) {
    filePatterns = [ filePatterns ];
  }

  var basePath = path.join(this._cwd, pkgPath);

  this._assets[assetType] = this._assets[assetType] || {};
  this._assets[assetType][pkg] = _(grunt.file.expand({cwd: basePath}, filePatterns)).map(function(expandedPath) {
    return path.join(pkgPath, expandedPath);
  });
};

Assets.prototype.toObject = function() {
  return _.clone(this._assets);
};


var BowerAssets = function(bower, cwd) {
  this.bower = bower;
  this.cwd = cwd;
  this.config = bower.config.json || 'bower.json';
  this.assets = new Assets(cwd, bower.config.directory);
};

BowerAssets.prototype = Object.create(Emitter.prototype);
BowerAssets.prototype.constructor = BowerAssets;

BowerAssets.prototype.get = function() {
  var bower = this.bower;
  var bowerConfig = grunt.file.readJSON(path.join(this.cwd, this.config));
  var exportsOverride = bowerConfig.exportsOverride;

  var paths = bower.commands.list({paths: true});
  paths.on('end', function(data) {
    this.emit('end', this.mergePaths(data, exportsOverride ? exportsOverride : {}));
  }.bind(this));
  paths.on('error', function(err) {
    this.emit('error', err);
  }.bind(this));

  return this;
};

/**
 *
 * @param bowerComponents - output of 'bower list' command
 * @param overrides - overrides coming from 'bower.json'
 *
 * @returns assets grouped by component and type
 */
BowerAssets.prototype.mergePaths = function(bowerComponents, overrides) {
  var findOverride = function(pkg) {
    return _(overrides).find(function(override, override_key) {
      return packageMatcher.matches(pkg, override_key);
    });
  };

  _(bowerComponents).each(function(pkgFiles, pkg) {
    var activeOverride = findOverride(pkg);

    if (activeOverride) {
      this.assets.addOverridden(activeOverride, pkg);
    } else {
      this.assets.addUntyped(pkgFiles, pkg);
    }
  }, this);

  return this.assets.toObject();
};

module.exports = BowerAssets;
