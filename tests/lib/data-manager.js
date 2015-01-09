// LICENSE : MIT
"use strict";
var path = require("path");
function format0(str, len) {
    return ('_' + Math.pow(10, len) + str).slice(-len);
}
function getLatestData(date) {
    return path.join(__dirname, "..", "..", "data/" + date.getFullYear() + '/' + format0((date.getMonth() + 1), 2), "index.json");
}
module.exports = {
    getLatestData: getLatestData
};