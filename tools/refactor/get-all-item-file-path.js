// MIT © 2017 azu
"use strict";
const path = require("path");
const glob = require("glob");
/**
 * itemのファイルパス一覧を返す
 * @returns {string[]}
 */
module.exports = function() {
    return glob.sync(path.join(__dirname, "../../data") + "/**/index.json");
};
