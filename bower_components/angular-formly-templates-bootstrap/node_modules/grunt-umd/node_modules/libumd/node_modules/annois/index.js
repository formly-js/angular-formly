'use strict';

function defined(a) {
    return typeof a !== 'undefined';
}
exports.defined = defined;

function boolean(a) {
    return typeof a === 'boolean';
}
exports.boolean = boolean;

function number(a) {
    return typeof a === 'number';
}
exports.number = number;

function fn(a) {
    return typeof a === 'function';
}
exports.fn = fn;

function array(a) {
    return Array.isArray(a);
}
exports.array = array;

// http://phpjs.org/functions/is_object:450
function object(a) {
    if(Object.prototype.toString.call(a) === '[object Array]') {
        return false;
    }

    return a !== null && typeof a === 'object';
}
function objectWith(fields, o) {
    if(!array(fields) || !object(o)) {
        return false;
    }

    var i, len, field;

    for(i = 0, len = fields.length; i < len; i++) {
        field = fields[i];

        if(!(field in o)) {
            return false;
        }
    }

    return true;
}
object.with = objectWith;
exports.object = object;

function string(a) {
    return typeof a === 'string';
}
exports.string = string;

function any() {
    return true;
}
exports.any = any;

function character(a) {
    return string(a) && a.length === 1;
}
exports.character = character;

function lowerCharacter(a) {
    if(!character(a)) {
        return false;
    }

    var code = a.charCodeAt();

    return 97 <= code && code <= 122;
}
exports.lowerCharacter = lowerCharacter;

function upperCharacter(a) {
    if(!character(a)) {
        return false;
    }

    var code = a.charCodeAt();

    return 65 <= code && code <= 90;
}
exports.upperCharacter = upperCharacter;

function nan(a) {
    return number(a) && isNaN(a);
}
exports.nan = nan;
