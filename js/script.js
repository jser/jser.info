/**
 * Created by azu.
 * Date: 11/05/25 18:04
 * License: MIT License
 */

$(function () {
    var app = window.app || {};
    var vm = new app.model.JSerModel();
    ko.applyBindings(vm);

    Handlebars.registerHelper('auto_format', function (text) {
        // autolinkTwitter 内でHTMLエスケープされているためHandlebarではしない
        var linkedText = window.autolinkTwitter(text);
        return linkedText.replace(/\n/g, "<br />");
    });
    $('#copy-output').on("click", function () {
        var json = ko.toJSON(vm.outputModels);
        console.log("json", json);
    });
    function format0(str, len) {
        return ('_' + Math.pow(10, len) + str).slice(-len);
    }

    var pickedCalendarHandler = function (cal) {
        var date = cal.currentDate;
        var fileDirPath = "data/" + date.getFullYear() + '/' + format0((date.getMonth() + 1), 2);
        var JSONFilePath = fileDirPath + "/index.json?" + new Date().getTime();
        window.app.client.load(JSONFilePath).done(function (data) {
            var list = data.list;
            for (var i = 0; i < list.length; i++) {
                var article = list[i];
                vm.inputArticle(article);
            }
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
