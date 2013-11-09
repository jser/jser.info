/**
 * Created by azu on 2013/11/09.
 */
var parser = require("jsonlint").parser;
var JSV = require("JSV").JSV;
var fs = require("fs");
var path = require("path");

function lintJSON(source) {
    var parsed;
    var schemaPath = __dirname + "/json-schema.json";

    function schemaError(str, err) {
        return str +
            "\n\n" + err.message +
            "\nuri: " + err.uri +
            "\nschemaUri: " + err.schemaUri +
            "\nattribute: " + err.attribute +
            "\ndetails: " + JSON.stringify(err.details);
    }

    try {
        parsed = parser.parse(source);
        var env = JSV.createEnvironment("json-schema-draft-03");
        var schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
        var report = env.validate(parsed, schema);
        if (report.errors.length) {
            throw report.errors.reduce(schemaError, 'Validation Errors:');
        }
        return JSON.stringify(parsed, null, 4);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
// lintするjsonを取得する
function getJSONFiles(rootDir, mainCallback) {
    var walk = function (dir) {
        walk.results = walk.results || [];
        fs.readdirSync(dir).forEach(function (item) {
            var stat = fs.statSync(path.join(dir, item));
            if (stat.isFile()) {
                walk.results.push(path.resolve(dir, item));
            } else if (stat.isDirectory()) {
                walk(path.join(dir, item));
            }
        });
        return walk.results;
    }

    function getJSONFileInDir(error, targetDirs, callback) {
        var jsonFiles = [];

        function walkDir(dirs, next) {
            if (dirs.length == 0) {
                return next(null, next);
            }
            var results = walk(dirs.pop());
            var filteredFile = results.filter(function (file) {
                var basename = path.extname(file);
                return basename === ".json";
            });
            jsonFiles = jsonFiles.concat(filteredFile);
            walkDir(dirs, next);
        }

        walkDir(targetDirs, function (error) {
            callback(error, jsonFiles);
        });
    }

    function getTargetDirFromRoot(error, callback) {
        fs.readdir(rootDir, function (err, files) {
            if (err) {
                throw err;
            }
            var filteredDir = files.filter(function (file) {
                var fileName = path.basename(file);
                return /\d{4}/.test(fileName);
            }).map(function (dir) {
                    return path.resolve(rootDir, dir);
                });
            getJSONFileInDir(null, filteredDir, callback);
        });
    }

    getTargetDirFromRoot(null, mainCallback);
}
(function main() {
    var rootDir = __dirname + "/../";
    getJSONFiles(rootDir, function (error, jsonFiles) {
        if (error) {
            console.log("error", error);
        }
        jsonFiles.forEach(function (json) {
            lintJSON(fs.readFileSync(json, "utf-8"));
        });
    });
})();