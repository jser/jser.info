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
var concatenateJSONPromise = FS.listTree(path.join(__dirname, "../../data/"), function isIndexHTML(filePath, stat) {
    if (stat.isDirectory()) {
        return false;
    }
    return path.basename(filePath) === "index.json";
}).then(function (fileList) {
    return Promise.all(fileList.map(function (filePath) {
        return FS.read(path.resolve(filePath))
            .then(JSON.parse)
            .then(function (object) {
                var obj = {};
                var fileName = path.dirname(filePath);
                var match = fileName.match(/\/(\d{4})\/(\d{2})$/);
                var fileAttr = {
                    year: match[1],
                    month: match[2],
                    name: path.basename(filePath)
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
    }, 0);
}
// "url",content,relatedLinksを対象に
function countAllURLOfData(data) {
    var results = data.map(function (yearObject) {
        var key = Object.keys(yearObject)[0];
        var obj = {};
        obj[key] = countOfYear(yearObject[key]);
        return obj;
    });
    console.log("月\tURL数");
    results.forEach(function (object, index) {
        var key = Object.keys(object)[0];
        console.log(key + "\t" + object[key]);
    });
}
// "url" のみを対象に
function countURLAttrOfData(data) {
    var results = data.map(function (yearObject) {
        var key = Object.keys(yearObject)[0];
        var obj = {};
        obj[key] = yearObject[key].length;
        return obj;
    });
    console.log("月\t記事数");
    results.forEach(function (object, index) {
        var key = Object.keys(object)[0];
        console.log(key + "\t" + object[key]);
    });
}


function isReleaseTag(tags) {
    if (!tags) {
        return false;
    }
    return tags.indexOf("ReleaseNote") !== -1;
}
function countReleaseNotGitHub(data) {
    var results = data.map(function (yearObject) {
        var key = Object.keys(yearObject)[0];
        var obj = {};
        var sitesOfYear = yearObject[key];
        obj[key] = sitesOfYear.filter(function (site) {
            return isReleaseTag(site.tags) && !/github.com\//.test(site.url);
        }).length;
        return obj;
    });
    console.log("月\t通常のリリース数");
    results.forEach(function (object, index) {
        var key = Object.keys(object)[0];
        console.log(key + "\t" + object[key]);
    });
}
function countGitHubRelease(data) {
    var results = data.map(function (yearObject) {
        var key = Object.keys(yearObject)[0];
        var obj = {};
        var sitesOfYear = yearObject[key];
        obj[key] = sitesOfYear.filter(function (site) {
            return isReleaseTag(site.tags) && /github.com\//.test(site.url);
        }).length;
        return obj;
    });
    console.log("月\tGitHubリリース数");
    results.forEach(function (object, index) {
        var key = Object.keys(object)[0];
        console.log(key + "\t" + object[key]);
    });
}
concatenateJSONPromise.then(function (array) {
    countAllURLOfData(array);
    countURLAttrOfData(array);
    countGitHubRelease(array);
    countReleaseNotGitHub(array);
}).then(function (result) {
    console.log("All Finish");
}).catch(function (error) {
    console.error(error);
});