"use strict";

const SourceMapGenerator = require("source-map").SourceMapGenerator;
const stableSort = require("stable");

function SourceMapper(src, fragments, inFile, sourceRoot) {
    this.generator = new SourceMapGenerator({ sourceRoot: sourceRoot });
    this.src = src;
    this.fragments = stableSort(fragments.slice(0), function(a, b) { return a.start - b.start });
    this.inFile = inFile || "source.js";

    this.generator.setSourceContent(this.inFile, src);
}

SourceMapper.prototype.generate = function() {
    let inIndex = 0;
    let inLine = 1;
    let inColumn = 0;
    let outLine = 1;
    let outColumn = 0;
    let createMappingAfterWhitespace = true;

    while (inIndex < this.src.length) {
        if (createMappingAfterWhitespace && !/\s/.test(this.src[inIndex])) {
            this.addMapping(inLine, inColumn, outLine, outColumn);
            createMappingAfterWhitespace = false;
        }

        if (this.fragments[0] && this.fragments[0].start === inIndex) {
            this.addMapping(inLine, inColumn, outLine, outColumn);

            // iterate over input string
            for (; inIndex < this.fragments[0].end; inIndex++) {
                if (this.src[inIndex] === '\n') {
                    inLine++;
                    inColumn = 0;
                } else {
                    inColumn++;
                }
            }

            // iterate over output string
            for (let outIndex = 0; outIndex < this.fragments[0].str.length; outIndex++) {
                if (this.fragments[0].str[outIndex] === '\n') {
                    outLine++;
                    outColumn = 0;
                } else {
                    outColumn++;
                }
            }

            this.fragments.shift();
            createMappingAfterWhitespace = true;
        }

        else {
            if (this.src[inIndex] === '\n') {
                inLine++;
                outLine++;
                inColumn = 0;
                outColumn = 0;
                createMappingAfterWhitespace = true;
            } else {
                inColumn++;
                outColumn++;
            }
            inIndex++;
        }
    }

    return this.generator.toString();
}

SourceMapper.prototype.addMapping = function(inLine, inColumn, outLine, outColumn) {
    this.generator.addMapping({
        source: this.inFile,
        original: {
            line: inLine,
            column: inColumn
        },
        generated: {
            line: outLine,
            column: outColumn
        }
    });
}

module.exports = function generateSourcemap(src, fragments, inFile, sourceRoot) {
    return new SourceMapper(src, fragments, inFile, sourceRoot).generate();
}
