// MIT © 2018 azu
"use strict";
const { fetchPosts } = require("@jser/data-fetcher");
const JSerStat = require("@jser/stat").JSerStat;
const getAllJSON = require("../../converter/lib/get-all-json");
/**
 * @returns {Promise<JSerStat>}
 */
module.exports.getStat = () => {
    return Promise.all([getAllJSON(), fetchPosts()]).then(([items, posts]) => {
        return new JSerStat(items, posts)
    })
};

