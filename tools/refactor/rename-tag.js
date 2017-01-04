// MIT © 2017 azu
"use strict";
const fs = require("fs");
const getAllItemFilePath = require("./get-all-item-file-path");
const argv = require('minimist')(process.argv.slice(2));
const from = argv.from;
const to = argv.to;
if (!(from && to)) {
    console.log("Usage: ./ --from before --to after");
    process.exit(1);
}

getAllItemFilePath().forEach(filePath => {
    const article = require(filePath);
    article.list.forEach(item => {
        if (!item.tags) {
            return;
        }
        const indexOfFrom = item.tags.indexOf(from);
        item.tags[indexOfFrom] = to;
        console.log(`Process ${filePath}:${item.title}`);
    });
    fs.writeFileSync(filePath, JSON.stringify(article, null, 4), "utf-8");
});
