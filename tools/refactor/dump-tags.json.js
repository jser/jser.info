// MIT © 2017 azu
"use strict";
const fs = require("fs");
const getAllItemFilePath = require("./get-all-item-file-path");
const argv = require('minimist')(process.argv.slice(2));
const from = argv.from;
const to = argv.to;
/**
 * tags.jsonを作成するツール
 * Usage: node ./ --from "スライド" --to "slide"
 */
const tagSet = new Set();
getAllItemFilePath().forEach(filePath => {
    const article = require(filePath);
    article.list.forEach(item => {
        if (!Array.isArray(item.tags)) {
            return;
        }
        item.tags.forEach(tag => {
            tagSet.add(tag);
        });
    });
});
fs.writeFileSync("tag.json", JSON.stringify(Array.from(tagSet), null, 4), "utf-8");
