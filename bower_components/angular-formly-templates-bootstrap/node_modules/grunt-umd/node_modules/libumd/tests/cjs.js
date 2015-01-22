'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');

var localeval = require('localeval');

var umdify = require('../');


module.exports = function() {
    triggered({});
    triggered();

    okTemplateName();
    invalidTemplateName();

    okTemplatePath();
    invalidTemplatePath();

    indentAsNumber();
    indentAsString();

    noCode();
};

function triggered(options) {
    read(function(data) {
        var code = umdify(data, options);

        var triggered;
        localeval(code, {
            trigger: function() {
                triggered = true;
            }
        });

        assert(triggered);
    });
}

function okTemplateName() {
    read(function(data) {
        var code = umdify(data, {
            template: 'returnExportsGlobal'
        });

        var triggered;
        localeval(code, {
            trigger: function() {
                triggered = true;
            }
        });

        assert(triggered);
    });
}

function invalidTemplateName() {
    read(function(data) {
        assert.throws(function() {
            var code = umdify(data, {
                template: 'foobar'
            });
        },
        Error);
    });
}

function okTemplatePath() {
    read(function(data) {
        var p = path.join(__dirname, '..', 'templates', 'umd.hbs');

        var code = umdify(data, {
            template: p
        });

        var triggered;
        localeval(code, {
            trigger: function() {
                triggered = true;
            }
        });

        assert(triggered);
    });
}

function invalidTemplatePath() {
    read(function(data) {
        var p = path.join(__dirname, '..', 'templates', 'foo');

        assert.throws(function() {
            var code = umdify(data, {
                template: p
            });
        },
        Error);
    });
}

function indentAsNumber() {
    read(function(data) {
        var code = umdify(data, {
            indent: 4
        });

        var triggered;
        localeval(code, {
            trigger: function() {
                triggered = true;
            }
        });

        assert(triggered);
    });
}

function indentAsString() {
    read(function(data) {
        var code = umdify(data, {
            indent: '    '
        });
        var code2 = umdify(data, {
            indent: 4
        });

        assert(code === code2);
    });
}

function noCode() {
    assert.throws(function() {
        var umd = umdify();
    }, function(err) {
        if(err instanceof Error) {
            return true;
        }
    });
}

function read(cb) {
    var p = path.join(__dirname, 'data', 'demo.js');

    fs.readFile(p, {
        encoding: 'utf-8'
    }, function(err, data) {
        if(err) {
            return console.error(err);
        }

        cb(data);
    });
}
