// MIT © 2017 azu
"use strict";
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const argv = require('minimist')(process.argv.slice(2));
const baseDir = path.resolve(process.cwd(), argv.baseDir);
const weekNumber = argv.weekNumber;
/**
 * 削除するドラフト番号を指定
 * Usage: node ./ --base path/_post/ --weekNumber 312
 */
if (!(baseDir && weekNumber !== undefined)) {
    console.log("Usage: node ./ --base path/_post/ --weekNumber 312");
    process.exit(1);
}
const files = glob.sync(baseDir + "/*" + weekNumber + "draft.md");
if (files.length === 0) {
    console.log(`Week: ${weekNumber} に該当するドラフトはありません`);
    return;
}
files.forEach(file => {
    fs.unlinkSync(file);
    console.log(`ドラフト削除: ${file}`)
});