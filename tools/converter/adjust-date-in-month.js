// LICENSE : MIT
"use strict";
var glob = require("glob");
var path = require("path");
var fs = require("fs");
var moment = require("moment");
var jsonFiles = glob.sync(path.join(__dirname, "../../data") + "/**/*.json");
function getDataListFixedDate(files) {
    return files.filter((filePath) => {
        var json = require(filePath);
        var firstItem = json.list[0];
        var duplicatedItems = json.list.filter(item => {
            return item.date === firstItem.date;
        });
        // 適当に一定数ある場合はその月は固定化されてるデータがある
        return duplicatedItems.length > 5;
    });
}
function getMonthFromFilePath(filePath) {
    var matchMonth = /(\d{4}\/\d{2})\//;
    var match = filePath.match(matchMonth);
    var yyyyMM = match[1];
    console.log(yyyyMM);
    return moment(yyyyMM, "YYYY/MM");
}
function getFirstDayOfMonth(moment) {
    return moment.startOf('month');
}
function getLastDayOfMonth(moment) {
    return moment.endOf('month');
}
var filesHasFixedDate = getDataListFixedDate(jsonFiles);
filesHasFixedDate.forEach(filePath => {
    var json = require(filePath);
    var items = json.list;
    var momentOfFile = getMonthFromFilePath(filePath);
    var lastDate = momentOfFile.endOf('month').date();
    var diffMinutes = lastDate * 24 * 60;
    var oneStepMinutes = Math.round(diffMinutes / items.length);
    json.list = items.map((item, index) => {
        item.date = moment(momentOfFile.startOf('month')).add(index * oneStepMinutes, 'minutes').toDate();
        console.log(item.date);
        return item;
    });
    fs.writeFileSync(filePath, JSON.stringify(json, null, 4), "utf-8");
});