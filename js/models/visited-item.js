(function () {
    var model = (function () {
        function hasItem(key) {
            var item = localStorage.getItem(key);
            return item && item.length > 0;
        }

        function getItem(key) {
            return localStorage.getItem(key);
        }

        function setItem(key, value) {
            localStorage.setItem(key, value);
        }

        window.app = window.app || {};
        window.app.visited = {
            hasItem: hasItem,
            getItem: getItem,
            setItem: setItem
        };
    })();
})();