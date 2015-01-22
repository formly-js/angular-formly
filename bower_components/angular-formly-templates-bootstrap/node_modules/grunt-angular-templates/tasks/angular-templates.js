/*
 * grunt-angular-templates
 * https://github.com/ericclemmons/grunt-angular-templates
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */

'use strict';

var Compiler  = require('./lib/compiler');
var Appender  = require('./lib/appender');
var fs        = require('fs');

module.exports = function(grunt) {

  var bootstrapper = function(module, script, options) {
    return options.angular+".module('"+module+"'"+(options.standalone ? ', []' : '')+").run(['$templateCache', function($templateCache) {\n"+script+"\n}]);\n";
  };

  var ngtemplatesTask = function() {
    var options = this.options({
      angular:    'angular',
      bootstrap:  bootstrapper,
      concat:     null,
      htmlmin:    {},
      module:     this.target,
      prefix:     '',
      source:     function(source) { return source; },
      standalone: false,
      url:        function(path) { return path; },
      usemin:     null,
      append:     false
    });

    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function(file) {
      if (!file.src.length) {
        grunt.log.warn('No templates found');
      }

      var compiler  = new Compiler(grunt, options, file.cwd);
      var appender  = new Appender(grunt);
      var modules   = compiler.modules(file.src);
      var compiled  = [];

      for (var module in modules) {
        compiled.push(compiler.compile(module, modules[module]));
      }

      if (options.append){
        fs.appendFileSync(file.dest, compiled.join('\n'));
        grunt.log.writeln('File ' + file.dest.cyan + ' updated.');
      }
      else{
        grunt.file.write(file.dest, compiled.join('\n'));  
        grunt.log.writeln('File ' + file.dest.cyan + ' created.');
      }
      

      if (options.usemin) {
        if (appender.save('generated', appender.concatUseminFiles(options.usemin, file))) {
          grunt.log.writeln('Added ' + file.dest.cyan + ' to ' + ('<!-- build:js ' + options.usemin + ' -->').yellow);
        }
      }

      if (options.concat) {
        if (appender.save(options.concat, appender.concatFiles(options.concat, file))) {
          grunt.log.writeln('Added ' + file.dest.cyan + ' to ' + ('concat:' + options.concat).yellow);
        }
      }
    });
  };

  grunt.registerMultiTask('ngtemplates', 'Compile AngularJS templates for $templateCache', ngtemplatesTask);

};
