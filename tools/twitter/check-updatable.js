// LICENSE : MIT
"use strict";
/*
 JSer.infoの記事が更新出来るかどうかをチェックする
 中央値と現在値を比較して一致してる時のみTwitterへ投稿する
*/
const { getStat } = require("../jser.github.io/lib/get-stat");

const postToGitter = require("./post-to-twitter");
getStat().then(stat => {
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

    const median = function(arr) {
        const half = (arr.length / 2) | 0;
        const temp = arr.sort();

        if (temp.length % 2) {
            return temp[half];
        }

        return (temp[half - 1] + temp[half]) / 2;
    };
    const itemCountList = jSerWeeks.map(function(week) {
        return week.items.length;
    });

    (function() {
        const averageValue = average(itemCountList);
        const medianValue = median(itemCountList);
        const currentValue = unpublishedItems.length;
        const resultReport = `
平均値:  ${averageValue}
中央値:  ${medianValue}
現在値:  ${currentValue}
`;
        // ぴったりより少し前に予告したいので -3
        const hitValue = Math.round(medianValue - 3);
        const nextWeekNumber = stat.getTotalWeekCount() + 1;
        const PR_URL = `https://github.com/jser/jser.github.io/pull/jser-week-${nextWeekNumber}`;
        // 中間報告
        const middleHitValue = Math.round(hitValue / 2);
        if (middleHitValue === currentValue) {
            postToGitter(`[JSer.info] 現在の記事数: ${currentValue}`).then(function() {
                console.log("Post to gitter!")
            }).catch(function(error) {
                console.error(error);
            });
        } else if (hitValue === currentValue) {
            postToGitter(`[JSer.info] 更新準備完了！
${PR_URL}
---
${resultReport}
`).then(function() {
                console.log("Post to Twitter!")
            }).catch(function(error) {
                console.error(error);
            });
        }
    })();
});
