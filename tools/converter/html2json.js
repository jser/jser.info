/**
 * Created by azu on 2014/02/20.
 * LICENSE : MIT
 */
var cheerio = require('cheerio');
var fs = require("fs");
var path = require("path");
var FS = require("q-io/fs");
var Promise = require("bluebird");
function $rizeFromFilePath(path) {
    var contents = fs.readFileSync(path, "utf-8");
    $ = cheerio.load(contents);
    return $;
}

function html2json(filePath) {
    var baseDir = path.dirname(filePath);
    var baseDirArray = baseDir.split(path.sep);
    var month = parseInt(baseDirArray.pop(), 10),
        year = parseInt(baseDirArray.pop(), 10);
    var indexDate = new Date(year, month, 1);// 日付決められないので1日にする
    var $ = $rizeFromFilePath(filePath);
    var array = [];
    $('blockquote').each(function (index, ele) {
        var $blockquote = $(this);
        var $p = $blockquote.next();
        var title = $blockquote.attr("title");
        var URL = $blockquote.attr("cite");
        var contents = $p.html().replace(/<br>/g, "\n");
        array.push({
            "title": title,
            "url ": URL,
            "content": contents,
            "date": indexDate
        });
    });
    return array;
}

function makeIndexJSONPath(filePath) {
    return path.join(path.dirname(filePath), "index.json");
}
var filterNonExistJSON = function (fileList) {
    var invert = function (value) {
        return !value;
    }
    var promiseMap = Promise.filter(fileList, function (filePath) {
        return FS.exists(path.join(path.dirname(filePath), "index.json")).then(invert);
    });
    return Promise.all(promiseMap);
};
FS.listTree("../../data/", function isIndexHTML(filePath, stat) {
    if (stat.isDirectory()) {
        return false;
    }
    return path.basename(filePath) === "index.html";
}).then(filterNonExistJSON).then(function (fileList) {
    var promises = fileList.map(function (filePath) {
        return Promise.cast(html2json(filePath)).then(function (content) {
            return FS.write(makeIndexJSONPath(filePath), content, "utf-8");
        });
    });
    Promise.all(promises).then(function (res) {
        console.log("All Finish");
    });
})