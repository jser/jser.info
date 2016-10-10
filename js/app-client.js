$(function () {
    var client = {
        loadItems: function loadArticleJSON(path) {
            var defer = $.Deferred();
            $.ajax({
                url: path,
                dataType: 'json',
                success: defer.resolve,
                error: defer.reject
            });
            return defer.promise();
        },
        loadPosts: function () {
            var defer = $.Deferred();
            $.ajax({
                url: "//posts.json",
                dataType: 'json',
                success: defer.resolve,
                error: defer.reject
            });
            return defer.promise();
        }
    };
    window.app.client = client;
});
