$(function () {
    var client = {
        load: function loadArticleJSON(path) {
            var defer = $.Deferred();
            $.ajax({
                url: path,
                dataType: 'json',
                success: defer.resolve,
                error: defer.reject
            });
            return defer.promise();
        }
    };

    var article = function (object) {
        /*
                    "title": "substack/faucet",
                    "url": "https://github.com/substack/faucet",
                    "content": "TAP系の出力を見やすく表示するCLI",
                    "tags": [
                        "node.js",
                        "testing"
                    ],
                    "date": "2014-01-01T03:14:27.201Z",
                    "related-links": []
                 */
        this.title = object.title;
        this.url = object.url;
        this.content = object.content;
        this.tags = object.tags;
        this.date = object.date;
        this.relatedLinks = object["related-links"];
    };
    window.app.client = client;


    var ViewModel = {
        articles: ko.observableArray([]),
        outputs: ko.observableArray([]),
        addArticle: function (object) {
            ViewModel.articles.push(article(object));
        }
    };
    ko.applyBindings(ViewModel);

    function format0(str, len) {
        return ('_' + Math.pow(10, len) + str).slice(-len);
    }

    var date = new Date();
    var fileDirPath = "data/" + date.getFullYear() + '/' + format0((date.getMonth() + 1), 2);
    var JSONFilePath = fileDirPath + "/index.json?" + new Date().getTime();
    client.load(JSONFilePath).done(function (data) {
        var list = data.list;
        for (var i = 0; i < list.length; i++) {
            var article = list[i];
            ViewModel.addArticle(article);
        }
    }).fail(function (err) {
        });
});
