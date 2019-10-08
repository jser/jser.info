// LICENSE : MIT
"use strict";
const fetch = require("node-fetch");
const IFTTT_POST_API = process.env.IFTTT_POST_API;
module.exports = function postToGitter(message) {
    return fetch(IFTTT_POST_API, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "value1": message
        })
    }).then(function (res) {
        return res.json();
    });
};
