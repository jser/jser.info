// LICENSE : MIT
"use strict";
const fetch = require("node-fetch");
const token = process.env.GITTER_TOKEN;
module.exports = function postToGitter(message) {
    if (!token) {
        return Promise.reject(new Error("Have to set GITTER_TOKEN env."));
    }
    // jser.info 53d32e61107e137846ba8031
    return fetch("https://api.gitter.im/v1/rooms/53d32e61107e137846ba8031/chatMessages", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        body: JSON.stringify({
            "text": message
        })
    }).then(function (res) {
        return res.json();
    })
};