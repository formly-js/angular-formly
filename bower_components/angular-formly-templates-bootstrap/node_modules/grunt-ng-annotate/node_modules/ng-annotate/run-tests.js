// run-tests.js
// MIT licensed, see LICENSE file
// Copyright (c) 2013-2014 Olov Lassus <olov.lassus@gmail.com>

"use strict";

const ngAnnotate = require("./ng-annotate-main");
const fs = require("fs");
const diff = require("diff");
const findLineColumn = require("find-line-column");
const fmt = require("simple-fmt");
const SourceMapConsumer = require("source-map").SourceMapConsumer;

function slurp(filename) {
    return String(fs.readFileSync(filename));
}

function test(correct, got, name) {
    if (got !== correct) {
        const patch = diff.createPatch(name, correct, got);
        process.stderr.write(patch);
        process.exit(-1);
    }
}

function testSourcemap(original, got, sourcemap) {
    const smc = new SourceMapConsumer(sourcemap);

    function testMapping(needle) {
        const gotPosition = findLineColumn(got, needle.exec(got).index);
        const originalPosition = smc.originalPositionFor({ line: gotPosition.line, column: gotPosition.col });
        const expectedPosition = findLineColumn(original, needle.exec(original).index);

        if (originalPosition.line !== expectedPosition.line || originalPosition.column !== expectedPosition.col) {
            process.stderr.write(fmt("Sourcemap mapping error for {0}. Expected: ({1},{2}) => ({3},{4}). Got: ({5},{6}) => ({3},{4}).",
                needle,
                expectedPosition.line, expectedPosition.col,
                gotPosition.line, gotPosition.col,
                originalPosition.line, originalPosition.column));
            process.exit(-1);
        }
    }

    testMapping(/\/\* before \*\//);
    for (let i = 1; i <= 4; i++) {
        testMapping(new RegExp("function( ctrl" + i + ")?\\(ctrl" + i + "_param1"));
        testMapping(new RegExp("/\\* ctrl" + i + " body \\*/"));
    }
    testMapping(/\/\* after \*\//);
}

const original = slurp("tests/original.js");

console.log("testing adding annotations");
const annotated = ngAnnotate(original, {add: true}).src;
test(slurp("tests/with_annotations.js"), annotated, "with_annotations.js");

console.log("testing adding annotations using single quotes");
const annotatedSingleQuotes = ngAnnotate(original, {add: true, single_quotes: true}).src;
test(slurp("tests/with_annotations_single.js"), annotatedSingleQuotes, "with_annotations_single.js");

console.log("testing removing annotations");
test(original, ngAnnotate(annotated, {remove: true}).src, "original.js");

console.log("testing adding existing $inject annotations (no change)");
test(slurp("tests/has_inject.js"), ngAnnotate(slurp("tests/has_inject.js"), {add: true}).src);

console.log("testing removing existing $inject annotations");
test(slurp("tests/has_inject_removed.js"), ngAnnotate(slurp("tests/has_inject.js"), {remove: true}).src);

console.log("testing sourcemaps");
const originalSourcemaps = slurp("tests/sourcemaps.js");
const annotatedSourcemaps = ngAnnotate(originalSourcemaps, {remove: true, add: true, sourcemap: true, sourceroot: "/source/root/dir"});
test(slurp("tests/sourcemaps.annotated.js"), annotatedSourcemaps.src, "sourcemaps.annotated.js");
testSourcemap(originalSourcemaps, annotatedSourcemaps.src, annotatedSourcemaps.map, "sourcemaps.annotated.js.map");

const ngminOriginal = slurp("tests/ngmin-tests/ngmin_original.js");

console.log("testing adding annotations (imported tests)");
const ngminAnnotated = ngAnnotate(ngminOriginal, {add: true, regexp: "^myMod"}).src;
test(slurp("tests/ngmin-tests/ngmin_with_annotations.js"), ngminAnnotated, "ngmin_with_annotations.js");

console.log("testing removing annotations (imported tests)");
test(ngminOriginal, ngAnnotate(ngminAnnotated, {remove: true, regexp: "^myMod"}).src, "ngmin_original.js");

if (fs.existsSync("package.json")) {
    console.log("testing package.json")
    try {
        const json = JSON.parse(slurp("package.json"));
        const substr = JSON.stringify({
            dependencies: json.dependencies,
            devDependencies: json.devDependencies,
        }, null, 4);
        if (/\^/g.test(substr)) {
            console.error("package.json error: shouldn't use the ^ operator");
            console.error(substr);
            process.exit(-1);
        }
    } catch(e) {
        console.error("package.json error: invalid json");
        process.exit(-1);
    }
}

console.log("all ok");
