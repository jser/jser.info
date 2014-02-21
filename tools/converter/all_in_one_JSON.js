/**
 * Created by azu on 2014/02/21.
 * LICENSE : MIT
 */
"use strict";
var fs = require("fs");
var pather = require("path");
var FS = require("q-io/fs");
var Promise = require("bluebird");

function makeIndexJSONPath(filePath) {
    return pather.join(pather.dirname(filePath), "index.json");
}
var filterNonExistJSON = function (fileList) {
    var invert = function (value) {
        return !value;
    }
    var promiseMap = Promise.filter(fileList, function (filePath) {
        return FS.exists(pather.join(pather.dirname(filePath), "index.json")).then(invert);
    });
    return Promise.all(promiseMap);
};
FS.listTree("../../data/", function isIndexHTML(filePath, stat) {
    if (stat.isDirectory()) {
        return false;
    }
    return pather.basename(filePath) === "index.html";
}).then(filterNonExistJSON).then(function (fileList) {
    var promises = fileList.map(function (filePath) {
        return Promise.cast(html2json(filePath)).then(function (content) {
            return FS.write(makeIndexJSONPath(filePath), JSON.stringify(content, null, 4));
        });
    });
    Promise.all(promises).then(function (res) {
        console.log("All Finish");
    });
})