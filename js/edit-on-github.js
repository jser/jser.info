/**
 * Created by azu on 2013/11/09.
 */
$(function () {
    // yyyy-MM-dd に該当する付きのjsonを開く
    function editOnGithub(dateString) {
        var editURL = "https://github.com/azu/jser.info/edit/gh-pages/" + dateString + "/index.json";
        location.href = editURL;
    }

    var $edit = $("#edit-on-github");
    $edit.button().on("click", function (event) {
        var dirPath = $("#content").data("file-dir-path");
        if (dirPath) {
            editOnGithub(dirPath);
        }
    });
});