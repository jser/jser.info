// LICENSE : MIT
"use strict";
const fetch = require("node-fetch");
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;
module.exports.postToDiscord = function postToDiscord({ message, title, body, url }) {
    return fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": "JSer.info",
            "avatar_url": "https://avatars2.githubusercontent.com/u/8184731?v=4",
            "content": message,
            "embeds": [
                {
                    "title": title,
                    "description": body,
                    "url": url,
                    // "timestamp": response.timestamp,
                }
            ]
        })
    });
};
