/**
 * Created by azu on 2014/02/21.
 * LICENSE : MIT
 */
"use strict";
var path = require("path");
var FS = require("q-io/fs");
var Promise = require("bluebird");

function pLoadFileList(fileList) {
    return Promise.all(fileList.map(function (filePath) {
        return FS.read(path.resolve(filePath))
            .then(JSON.parse)
    }));
}
var concatenateJSONPromise = FS.listTree(path.join(__dirname, "/../../data/"), function isIndexHTML(filePath, stat) {
    if (stat.isDirectory()) {
        return false;
    }
    return path.basename(filePath) === "index.json";
}).then(pLoadFileList).then(function (objectList) {
    return objectList.reduce(function (prev, current) {
        return prev.concat(current["list"]);
    }, []);
});

concatenateJSONPromise.then(function (array) {
    return FS.write(path.join(__dirname, "items.json"), JSON.stringify(array));
}).then(function (result) {
    console.log("All Finish");
}).catch(function (error) {
    console.error(error);
});
