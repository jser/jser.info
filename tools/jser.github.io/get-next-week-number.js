// MIT © 2017 azu
"use strict";
const JSerStat = require("jser-stat").JSerStat;
const stat = new JSerStat();
const nextWeekNumber = stat.getTotalWeekCount() + 1;
console.log(nextWeekNumber);
