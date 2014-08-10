/**
 * Created by azu on 2013/11/09.
 */
$(function () {
    // yyyy-MM-dd に該当する付きのjsonを開く
    function editOnGithub(dateString) {
        location.href = "https://github.com/jser/jser.info/edit/gh-pages/" + dateString + "/index.json";
    }

    var $edit = $("#edit-on-github");
    $edit.button().on("click", function (event) {
        var dirPath = $("#content").data("file-dir-path");
        if (dirPath) {
            editOnGithub(dirPath);
        }
    });
});