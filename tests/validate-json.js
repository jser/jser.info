/**
 * Created by azu on 2013/11/09.
 */
var fs = require("fs");
var path = require("path");
var Ajv = require('ajv');
var glob = require("glob");
var pointer = require('json-pointer');
var ajv = new Ajv({
    jsonPointers: true
});
var schemaPath = __dirname + "/json-schema.json";
var schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
var validate = ajv.compile(schema);
/**
 * @param {object} source
 * @param {string} jsonFilePath
 * @returns {boolean}
 */
function lintJSON(source, jsonFilePath) {
    const valid = validate(source, schema);
    if (valid) {
        return true;
    }
    validate.errors.forEach(error => {
        console.error(`${error.message} @ ${jsonFilePath}`);
        const data = pointer.get(source, error.dataPath.replace("[object Object]", ""));
        console.error(JSON.stringify(data, null, 4));
        console.error(JSON.stringify(error, null, 4));
    });
    return false;
}
// lintするjsonを取得する
function getJSONFiles(rootDir, mainCallback) {
    var walk = function(dir) {
        walk.results = walk.results || [];
        fs.readdirSync(dir).forEach(function(item) {
            var stat = fs.statSync(path.join(dir, item));
            if (stat.isFile()) {
                walk.results.push(path.resolve(dir, item));
            } else if (stat.isDirectory()) {
                walk(path.join(dir, item));
            }
        });
        return walk.results;
    };

    function getJSONFileInDir(error, targetDirs, callback) {
        var jsonFiles = [];

        function walkDir(dirs, next) {
            if (dirs.length == 0) {
                return next(null, next);
            }
            var results = walk(dirs.pop());
            var filteredFile = results.filter(function(file) {
                var basename = path.extname(file);
                return basename === ".json";
            });
            jsonFiles = jsonFiles.concat(filteredFile);
            walkDir(dirs, next);
        }

        walkDir(targetDirs, function(error) {
            callback(error, jsonFiles);
        });
    }

    function getTargetDirFromRoot(error, callback) {
        fs.readdir(rootDir, function(err, files) {
            if (err) {
                throw err;
            }
            var filteredDir = files.filter(function(file) {
                var fileName = path.basename(file);
                return /\d{4}/.test(fileName);
            }).map(function(dir) {
                return path.resolve(rootDir, dir);
            });
            getJSONFileInDir(null, filteredDir, callback);
        });
    }

    getTargetDirFromRoot(null, mainCallback);
}
(function main() {
    const currentYear = new Date().getFullYear();
    const rootDir = path.join(__dirname, `../data/${currentYear}`);
    const jsonFiles = glob.sync(rootDir + "/**/*.json");
    const passed = jsonFiles.every(function(jsonFilePath) {
        return lintJSON(JSON.parse(fs.readFileSync(jsonFilePath, "utf-8")), jsonFilePath);
    });
    if (passed) {
        process.exit(0);
    } else {
        process.exit(1);
    }
})();