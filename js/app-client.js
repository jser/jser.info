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
    window.app.client = client;

    /*
        ArticleGroup
            - Article
     */
    var ArticleGroup = function (name, artcles) {
        this.name = ko.observable(name);
        this.articles = ko.observableArray(artcles);
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
                    "related-links": []
                 */
        this.title = object.title;
        this.url = object.url;
        this.content = object.content;
        this.tags = object.tags;
        this.date = object.date;
        this.relatedLinks = object["related-links"];
    };

    var inputGroups = [
        new ArticleGroup("データ", [])
    ];

    var outputGroups = [
        new ArticleGroup("ヘッドライン", []),
        new ArticleGroup("アーティクル", []),
        new ArticleGroup("スライド、動画関係", []),
        new ArticleGroup("サイト、サービス", []),
        new ArticleGroup("サイト、サービス、ソフトウェア関係", []),
        new ArticleGroup("ソフトウェア、ツール、ライブラリ関係", []),
        new ArticleGroup("書籍関係", []),
    ];

    var JSerModel = function (input, output) {
        var that = this;
        that.inputModels = input;
        that.outputModels = output;
        that.inputArticle = function(object) {
            var inputModel = that.inputModels[0];
            inputModel.articles.push(new Article(object));
        };
    };

    var vm = new JSerModel(inputGroups, outputGroups);
    ko.bindingHandlers.sortable.allowDrop = true;
    ko.applyBindings(vm);

    function format0(str, len) {
        return ('_' + Math.pow(10, len) + str).slice(-len);
    }

    $('#copy-output').on("click",function(){
        var json = ko.toJSON(vm.outputModels);
        console.log("json", json);
    });
    var date = new Date();
    var fileDirPath = "data/" + date.getFullYear() + '/' + format0((date.getMonth() + 1), 2);
    var JSONFilePath = fileDirPath + "/index.json?" + new Date().getTime();
    client.load(JSONFilePath).done(function (data) {
        var list = data.list;
        for (var i = 0; i < list.length; i++) {
            var article = list[i];
            vm.inputArticle(article);
        }
    }).fail(function (err) {
        });
});
