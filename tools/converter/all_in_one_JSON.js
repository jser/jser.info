/**
 * Created by azu on 2014/02/21.
 * LICENSE : MIT
 */
"use strict";
var FS = require("q-io/fs");
var path = require("path");
const getAllJSON = require("./lib/get-all-json");
getAllJSON().then(function (array) {
    return FS.write(path.join(__dirname, "items.json"), JSON.stringify(array));
}).then(function (result) {
    console.log("All Finish");
}).catch(function (error) {
    console.error(error);
});
