// LICENSE : MIT
"use strict";
/*
 JSer.infoの記事が更新出来るかどうかをチェックする
 中央値と現在値を比較して一致してる時のみTwitterへ投稿する
*/
const { getStat } = require("../jser.github.io/lib/get-stat");

const { postToTwitter } = require("./post-to-twitter");
(async function () {
    const { averageValue, medianValue, currentValue, nextWeekNumber } = await checkUpdatable();
    const resultReport = `
平均値:  ${averageValue}
中央値:  ${medianValue}
現在値:  ${currentValue}
`;
    console.log("# REPORT");
    console.log(resultReport);
    // ぴったりより少し前に予告したいので -3
    const hitValue = Math.round(medianValue - 3);
    const PR_URL = `https://github.com/jser/jser.github.io/pull/jser-week-${nextWeekNumber}`;
    // 中間報告
    const middleHitValue = Math.round(hitValue / 2);
    if (hitValue === currentValue) {
        postToTwitter(`[JSer.info] 更新準備完了！
${PR_URL}
---
${resultReport}
`).then(function () {
            console.log("Post to Twitter!")
        }).catch(function (error) {
            console.error(error);
        });
    } else {
        postToTwitter(`[JSer.info] 現在の記事数: ${currentValue}`).then(function () {
            console.log("Post to twitter!")
        }).catch(function (error) {
            console.error(error);
        });
    }
})();
