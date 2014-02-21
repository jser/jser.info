/**
 * Created by azu on 2014/02/21.
 * LICENSE : MIT
 */
"use strict";
var fs = require("fs");
var pather = require("path");
var FS = require("q-io/fs");
var Promise = require("bluebird");

function pLoadFileList(fileList) {
    return Promise.all(fileList.map(function (filePath) {
        return FS.read(pather.resolve(filePath)).then(JSON.parse).catch(function (error) {
            console.log(error);
        });
    }));
}
var concatPromise = FS.listTree("../../data/", function isIndexHTML(filePath, stat) {
    if (stat.isDirectory()) {
        return false;
    }
    return pather.basename(filePath) === "index.json";
}).then(pLoadFileList).then(function (objectList) {
    return objectList.reduce(function (prev, current) {
        return prev.concat(current["list"]);
    }, []);
});

concatPromise.then(function (array) {
    return FS.write(pather.join(__dirname, "min.json"), JSON.stringify(array));
}).then(function (result) {
    console.log("All Finish");
});