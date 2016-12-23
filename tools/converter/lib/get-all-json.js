// MIT © 2016 azu
"use strict";
var path = require("path");
var FS = require("q-io/fs");
var Promise = require("bluebird");

function pLoadFileList(fileList) {
    return Promise.all(fileList.map(function(filePath) {
        return FS.read(path.resolve(filePath))
            .then(JSON.parse)
    }));
}
/**
 * すべてのindex.jsonをまとめたjsonを作って返す
 * @returns {Promise.<Object[]>}
 */
module.exports = function() {
    return FS.listTree(path.join(__dirname, "../../../data/"), function isIndexHTML(filePath, stat) {
        if (stat.isDirectory()) {
            return false;
        }
        return path.basename(filePath) === "index.json";
    }).then(pLoadFileList).then(function(objectList) {
        return objectList.reduce(function(prev, current) {
            // dateがない月は無視する
            current["list"].forEach(function(item) {
                if (!item["date"]) {
                    throw item;
                }
            });
            return prev.concat(current["list"]);
        }, []);
    });
};
