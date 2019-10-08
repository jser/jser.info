// LICENSE : MIT
"use strict";
const fetch = require("node-fetch");
const IFTTT_POST_API = process.env.IFTTT_POST_API;
module.exports.postToTwitter = function postToTwitter(message) {
    return fetch(IFTTT_POST_API, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "value1": message
        })
    });
};
