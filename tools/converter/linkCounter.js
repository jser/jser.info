/**
 * Created by azu on 2014/02/21.
 * LICENSE : MIT
 */
"use strict";
var pather = require("path");
var FS = require("q-io/fs");
var Promise = require("bluebird");

function pLoadFileList(fileList) {
    return Promise.all(fileList.map(function (filePath) {
        return FS.read(pather.resolve(filePath))
            .then(JSON.parse)
    }));
}
var concatenateJSONPromise = FS.listTree("../../data/", function isIndexHTML(filePath, stat) {
    if (stat.isDirectory()) {
        return false;
    }
    return pather.basename(filePath) === "index.json";
}).then(function (fileList) {
    return Promise.all(fileList.map(function (filePath) {
        return FS.read(pather.resolve(filePath))
            .then(JSON.parse)
            .then(function (object) {
                var obj = {};
                var fileName = pather.dirname(filePath);
                var match = fileName.match(/\/(\d{4})\/(\d{2})$/);
                var fileAttr = {
                    year: match[1],
                    month: match[2],
                    name: pather.basename(filePath)
                };
                obj[fileAttr.year + "/" + fileAttr.month] = object["list"];
                return obj;
            });
    }));
});

function counterLink(siteObject) {
    var count = 0;
    var urlRegExp = /https?:\/\//ig;
    if (siteObject["url"]) {
        count += 1;
    }
    if (siteObject["relatedLinks"]) {
        count += siteObject["relatedLinks"].length;
    }
    if (siteObject["content"]) {
        var matchedURL = siteObject["content"].match(urlRegExp);
        if (matchedURL) {
            count += matchedURL.length;
        }
    }
    return count;
}

function countOfYear(siteObjectArray) {
    return siteObjectArray.reduce(function (prev, current) {
        return prev + counterLink(current);
    }, 0)
}
concatenateJSONPromise.then(function (array) {
    var results = {};
    array.forEach(function (yearObject) {
        var key = Object.keys(yearObject)[0];
        results[key] = countOfYear(yearObject[key]);
    });
    console.log(results);
    console.log(Object.keys(results).join("\t"));
    console.log(Object.values(results).join("\t"));

}).then(function (result) {
    console.log("All Finish");
}).catch(function (error) {
    console.error(error);
});