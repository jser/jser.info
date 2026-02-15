// LICENSE : MIT
"use strict";
const { prettyError } = require("@textlint/linter-formatter/lib/src/formatters/pretty-error");
const path = require("path");
const { createLinter, loadTextlintrc } = require("textlint");

function hasError(result) {
    return result.messages.length > 0;
}

function printResult(data, filePath, message) {
    const output = prettyError(data["content"], filePath, message);
    console.log(output);
    console.log(JSON.stringify(data, null, 4));
}

async function lint(filePath) {
    if (!filePath) {
        throw new Error("Error: filePath is not found.");
    }
    const json = require(filePath);
    const descriptor = await loadTextlintrc({
        configFilePath: path.join(__dirname, ".textlintrc")
    });
    const linter = createLinter({ descriptor });
    const list = json.list;
    const results = await Promise.all(
        list.map(function (item) {
            return linter.lintText(item.content, "content.md");
        })
    );
    let isError = false;
    results.forEach(function (result, index) {
        if (!hasError(result)) {
            return;
        }
        isError = true;
        const originalData = list[index];
        result.messages.forEach(function (message) {
            printResult(originalData, filePath, message);
        });
    });
    if (isError) {
        throw new Error("Found textlint Error");
    }
}

module.exports = lint;
