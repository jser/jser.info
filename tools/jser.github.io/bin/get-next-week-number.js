// MIT © 2017 azu
"use strict";
const { getStat } = require("../lib/get-stat");
getStat().then(stat => {
    const nextWeekNumber = stat.getTotalWeekCount() + 1;
    console.log(nextWeekNumber);
});
