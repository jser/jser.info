// LICENSE : MIT
"use strict";
/*
 JSer.infoの記事が更新出来るかどうかをチェックする
 中央値と現在値を比較して一致してる時のみDiscordhashへ投稿する
*/
const { getStat } = require("../jser.github.io/lib/get-stat");
const { checkUpdatable } = require("../lib/check-updatable");
const { postToDiscord } = require("./post-to-discord");
(async function () {
    const { averageValue, medianValue, currentValue, nextWeekNumber } = await checkUpdatable();
    const resultReport = `
平均値:  ${averageValue}
中央値:  ${medianValue}
現在値:  ${currentValue}
`;
    console.log("# REPORT");
    console.log(resultReport);
    const hitValue = 13;
    const PR_URL = `https://github.com/jser/jser.github.io/pull/jser-week-${nextWeekNumber}`;
    if (hitValue <= currentValue) {
        postToDiscord({
            message: "[JSer.info] 更新準備完了！",
            title: `JSer.info Draft PR #${nextWeekNumber}`,
            body: resultReport,
            url: PR_URL
        }).then(function () {
            console.log("Post to Discord!")
        }).catch(function (error) {
            console.error(error);
        });
    } else {
        postToDiscord({
            message: `[JSer.info] 現在の記事数: ${currentValue} (進捗率: ${Math.round((currentValue / hitValue) * 100)}%)`,
            title: `JSer.info Draft PR #${nextWeekNumber}`,
            body: resultReport,
            url: PR_URL
        }).then(function () {
            console.log("Post to Discord!")
        }).catch(function (error) {
            console.error(error);
        });
    }
})();

