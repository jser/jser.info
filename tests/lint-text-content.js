// LICENSE : MIT
"use strict";
const { prettyError } = require("@textlint/linter-formatter/lib/formatters/pretty-error");
const path = require("path");

function hasError(result) {
    return result.messages.length > 0;
}

function printResult(data, filePath, message) {
    const output = prettyError(data["content"], filePath, message);
    console.log(output);
    console.log(JSON.stringify(data, null, 4));

}

function lint(filePath) {
    if (!filePath) {
        return Promise.reject("Error: filePath is not found.");
    }
    var json = require(filePath);
    var TextLintEngine = require("textlint").TextLintEngine;
    var engine = new TextLintEngine({
        configFile: path.join(__dirname, ".textlintrc")
    });
    var list = json.list;
    var promises = list.map(function (item) {
        var content = item.content;
        return engine.executeOnText(content, ".md").then(results => results[0]);
    });
    return Promise.all(promises).then(function (results) {
        var isError = false;
        results.forEach(function (result, index) {
            if (!hasError(result)) {
                return;
            }
            isError = true;
            // エラーがある
            var originalData = list[index];
            result.messages.forEach(function (message) {
                printResult(originalData, filePath, message);
            });
        });
        if (isError) {
            return Promise.reject(new Error("Found textlint Error"));
        }
    });
}

module.exports = lint;
