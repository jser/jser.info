/**
 * Created by azu.
 * Date: 11/05/25 18:04
 * License: MIT License
 */

$(function () {
    var currentJSerNo;
    var app = window.app || {};
    var vm = new app.model.JSerModel();
    ko.bindingHandlers.sortable.afterMove = function (arg) {
        var article = arg.item;
        window.app.visited.setItem(article.url, new Date());
    };
    ko.applyBindings(vm);

    Handlebars.registerHelper('auto_format_html', function (text) {
        // autolinkTwitter 内でHTMLエスケープされているためHandlebarではしない
        var linkedText = window.autolinkTwitter(text);
        return linkedText.replace(/\n/g, "<br />");
    });
    Handlebars.registerHelper('auto_format_md', function (text) {
        return text.trim();
    });
    Handlebars.registerHelper('format_tags', function (tags) {
        return tags.map(function (tag) {
            return '<span class="jser-tag">' + tag + '</span>';
        }).join(" ");
    });
    Handlebars.registerHelper('escape_md', function (text) {
        var markdown_literal = /[\\`\*_\{\}\[\]]/g;
        return text.replace(markdown_literal, "\\$&");
    });
    Handlebars.registerHelper('ttp', function (text) {
        return text.replace(/https?:\/\//i, "")
            .replace(/_/g, "\\_");
    });
    function getOutputJSON() {
        var json = ko.toJS(vm.outputModels);
        return json.filter(function (model) {
            return model.articles.length > 0;
        });
    }

    $("#fullscreen-button").button().on("click", function (evt) {
        if (screenfull.enabled) {
            screenfull.request(document.querySelector("#content"));
        }
    });
    $("#jq-dialog").on("dialogfocus", function (evt, ui) {
        $("#js-dialog-textarea").select();
    });
    $('#copy-markdown').button().on("click", function () {
        var filteredJSON = getOutputJSON();
        var source = $("#article-markdown-template").html();
        var template = Handlebars.compile(source);
        var result = template({
            Groups: filteredJSON
        }).trim();
        $("#js-dialog-textarea").text("JSer.info #" + currentJSerNo + "\n\n----\n" + result);
        $("#jq-dialog").dialog({
            title: "Markdown",
            width: 700,
            height: 500
        });
    });
    $('#copy-html').button().on("click", function () {
        var source = $("#article-template").html();
        var template = Handlebars.compile(source);
        var result = template({
            Groups: getOutputJSON()
        });
        $("#js-dialog-textarea").text(result.trim());
        $("#jq-dialog").dialog({
            title: "HTML",
            width: 700,
            height: 500
        });
    });
    function format0(str, len) {
        return ('_' + Math.pow(10, len) + str).slice(-len);
    }

    function isJSerCategory(post) {
        return /jser/i.test(post.category)
    }

    function findFirstJSerPost(posts) {
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            if (isJSerCategory(post)) {
                return post;
            }
        }
    }

    var pickedCalendarHandler = function (cal) {
        var date = cal.currentDate;
        var fileDirPath = "data/" + date.getFullYear() + '/' + format0((date.getMonth() + 1), 2);
        var JSONFilePath = fileDirPath + "/index.json?" + new Date().getTime();
        $.when(window.app.client.loadItems(JSONFilePath), window.app.client.loadPosts()).done(function (items, posts) {
            var list = items[0].list;
            var loadPosts = posts[0];
            currentJSerNo = loadPosts.filter(isJSerCategory).length + 1 + 1;
            var latestPost = findFirstJSerPost(loadPosts);
            vm.latestPostDate = new Date(latestPost.date);
            vm.reloadInput(list);
            $("#content").data("file-dir-path", fileDirPath);
        }).fail(function (err) {
            $.WsGrowl.show({content: 'その月のアーカイブはないです'});
        });
    };
    $("#date-picker").calendarPicker({
        monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        //useWheel:true,
        //callbackDelay:500,
        //years:1,
        months: 4,
        //days:4,
        showDayArrows: false,
        callback: pickedCalendarHandler
    });
});
