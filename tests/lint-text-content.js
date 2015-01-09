// LICENSE : MIT
"use strict";
var format = require("format-text");
var style = require("style-format");

var template = style('{bold}{red}{title} {grey}{filename}\n'
+ '{grey}{data}{reset}\n'
+ '{reset}');
var path = require("path");
function hasError(result) {
    return result.messages.length > 0;
}
function calculateExitCode(results) {
    return results.some(hasError) ? 1 : 0;
}
function printResult(data, filePath, message) {
    console.log(format(template, {
        title: message.message,
        filename: filePath,
        data: JSON.stringify(data, null, 4)
    }));
}
function lint(filePath) {
    if (!filePath) {
        return;
    }
    var json = require(filePath);
    var textlint = require("textlint").textlint;
    textlint.setupRules({
        "spellcheck-tech-word-textlint-rule": require("spellcheck-tech-word-textlint-rule")
    });
    var list = json.list;
    var results = list.map(function (item) {
        var content = item.content;
        return textlint.lintText(content);
    });
    results.forEach(function (result, index) {
        if (!hasError(result)) {
            return;
        }
        // エラーがある
        var originalData = list[index];
        result.messages.forEach(function (message) {
            printResult(originalData, filePath, message);
        });
    });

    return calculateExitCode(results)
}

module.exports = lint;