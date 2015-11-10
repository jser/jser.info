// LICENSE : MIT
"use strict";
// https://github.com/jser/jser.info/issues/61 のためのスクリプト
// HTML to Markdown in content
var glob = require("glob");
var path = require("path");
var fs = require("fs");
var toMarkdown = require('to-markdown');
var jsonFiles = glob.sync(path.join(__dirname, "../../data") + "/{2011,2012}/**/*.json");
jsonFiles.forEach((filePath) => {
    var json = require(filePath);
    json.list = json.list.map(item => {
        item.content = item.content.replace(/\n\n/g, "<br>");
        item.content = toMarkdown(item.content, {gfm: true});
        return item;
    });
    fs.writeFileSync(filePath, JSON.stringify(json, null, 4), "utf-8");
});