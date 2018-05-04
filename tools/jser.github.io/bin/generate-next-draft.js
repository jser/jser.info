// MIT © 2017 azu
"use strict";
const fs = require("fs");
const path = require("path");
const argv = require('minimist')(process.argv.slice(2));
const createContent = require("../lib/create-content");
const output = argv.output;
/**
 * ドラフトデータの作成
 * Usage: ./ --output path/file.md
 */
if (!output) {
    console.log("Usage: ./ --output path/file.md");
    process.exit(1);
}

createContent().then(content => {
    const outputFilePath = path.resolve(process.cwd(), output);
    fs.writeFileSync(outputFilePath, content, "utf-8");
    console.log(`Create: ${outputFilePath}`);
});
