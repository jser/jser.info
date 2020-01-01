// LICENSE : MIT
"use strict";
/*
 JSer.infoの記事が更新出来るかどうかをチェックする
 中央値と現在値を比較して一致してる時のみTwitterへ投稿する
*/
const { getStat } = require("../jser.github.io/lib/get-stat");

module.exports.checkUpdatable = function checkUpdatable() {
    return getStat().then(stat => {
        const jSerWeeks = stat.getJSerWeeks();
        const latestWeek = jSerWeeks[jSerWeeks.length - 1];
        const now = new Date();
        const endDate = latestWeek.endDate;
        const unpublishedItems = stat.findItemsBetween(endDate, now);

        /*
         * 平均を求める
         */
        function average(data) {
            let sum = 0;
            for (let i = 0; i < data.length; i++) {
                sum = sum + data[i];
            }
            return (sum / data.length);
        }

        const median = function (arr) {
            const half = (arr.length / 2) | 0;
            const temp = arr.sort();

            if (temp.length % 2) {
                return temp[half];
            }

            return (temp[half - 1] + temp[half]) / 2;
        };
        const itemCountList = jSerWeeks.map(function (week) {
            return week.items.length;
        });

        return {
            averageValue: average(itemCountList),
            medianValue: median(itemCountList),
            currentValue: unpublishedItems.length,
            nextWeekNumber: stat.getTotalWeekCount() + 1,
        };
    });
};
