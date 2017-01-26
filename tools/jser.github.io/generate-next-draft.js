// MIT © 2017 azu
"use strict";
const fs = require("fs");
const path = require("path");
const argv = require('minimist')(process.argv.slice(2));
const createContent = require("./create-content");
const output = argv.output;
/**
 * タグをリネームするツール
 * Usage: node ./ --from "スライド" --to "slide"
 */
if (!output) {
    console.log("Usage: ./ --output path/file.md");
    process.exit(1);
}

const content = createContent();
const outputFilePath = path.resolve(process.cwd(), output);
fs.writeFileSync(outputFilePath, content, "utf-8");
console.log(`Create: ${outputFilePath}`);