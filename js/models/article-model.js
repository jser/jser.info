(function () {
    /*
    ArticleGroup
        - Article
 */
    var ArticleGroup = function (name, artcles) {
        this.name = ko.observable(name);
        this.articles = ko.observableArray(artcles);
    };
    var RelateLink = function (object) {
        this.tile = object
    };
    var Article = function (object) {
        /*
                    "title": "substack/faucet",
                    "url": "https://github.com/substack/faucet",
                    "content": "TAP系の出力を見やすく表示するCLI",
                    "tags": [
                        "node.js",
                        "testing"
                    ],
                    "date": "2014-01-01T03:14:27.201Z",
                    "relatedLinks": []
                 */
        this.title = object.title;
        this.url = object.url;
        this.content = object.content;
        this.tags = object.tags;
        this.date = object.date;
        this.relatedLinks = object["relatedLinks"];
    };

    var inputGroups = [
        new ArticleGroup("データ", [])
    ];

    var outputGroups = [
        new ArticleGroup("ヘッドライン", []),
        new ArticleGroup("アーティクル", []),
        new ArticleGroup("スライド、動画関係", []),
        new ArticleGroup("サイト、サービス、ドキュメント", []),
        new ArticleGroup("ソフトウェア、ツール、ライブラリ関係", []),
        new ArticleGroup("書籍関係", [])
    ];

    var JSerModel = function (input, output) {
        var that = this;
        that.inputModels = input || inputGroups;
        that.outputModels = output || outputGroups;
        that.reloadInput = function (array) {
            var inputModel = that.inputModels[0];
            inputModel.articles.removeAll();
            var sorted = array.sort(function (a, b) {
                var aDate = new Date(a.date);
                var bDate = new Date(b.date);
                return bDate - aDate;
            });
            for (var i = 0; i < sorted.length; i++) {
                var obj = sorted[i];
                inputModel.articles.push(new Article(obj));
            }
        };
        that.isVisited = function (article) {
            return window.app.visited.hasItem(article.url);
        };
    };
    window.app = window.app || {};
    window.app.model = {
        JSerModel: JSerModel
    }
})()