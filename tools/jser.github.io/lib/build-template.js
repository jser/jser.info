// MIT © 2017 azu
"use strict";
const fs = require("fs");
const Handlebars = require("handlebars");
const json2yaml = require("json2yaml");
const CategoryKey = require("@jser/classifier-item-category").CategoryKey;
Handlebars.registerHelper('auto_format_html', function (text) {
    // autolinkTwitter 内でHTMLエスケープされているためHandlebarではしない
    const linkedText = window.autolinkTwitter(text);
    return linkedText.replace(/\n/g, "<br />");
});
Handlebars.registerHelper('auto_format_md', function (text) {
    return text.trim();
});
Handlebars.registerHelper('format_tags', function (tags) {
    return tags.map(function (tag) {
        return '<span class="jser-tag">' + tag + '</span>';
    }).join(" ");
});
function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
Handlebars.registerHelper('escape_md', function (text) {
    const markdown_literal = /[\\`\*_\{\}\[\]]/g;
    // タイトルにhtmlタグが入っているとHTMLとして表示されてしまうため
    return escapeSpecialChars(text.replace(markdown_literal, "\\$&"));
});
Handlebars.registerHelper('escape_attr', function (text) {
    const markdown_literal = /["\\`\*_\{\}\[\]]/g;
    return escapeSpecialChars(text.replace(markdown_literal, "\\$&"));
});
Handlebars.registerHelper('ttp', function (text) {
    return text.replace(/https?:\/\//i, "")
        .replace(/_/g, "\\_");
});
/**
 *
 * @param {string} title
 * @param {string} author
 * @param {string} category
 * @param {Date} date
 * @param {string[]} tags
 * @param {number} weekNumber
 * @param {Object} groupsByHeader
 * @returns {string}
 */
module.exports = function createMarkdown({
    title,
    author,
    date,
    category,
    tags,
    weekNumber,
    groupsByHeader
}) {
    const source = fs.readFileSync(__dirname + "/template.handlebars", "utf-8");
    const template = Handlebars.compile(source);
    const groups = [
        groupsByHeader[CategoryKey.Headline],
        groupsByHeader[CategoryKey.Article],
        groupsByHeader[CategoryKey.SlideVideo],
        groupsByHeader[CategoryKey.WebsiteDocument],
        groupsByHeader[CategoryKey.SoftwareLibrary],
        groupsByHeader[CategoryKey.Book],
    ].filter(group => {
        return group.articles.length > 0;
    });
    return template({
        Groups: groups,
        weekNumber: weekNumber,
        layout: "post",
        title,
        author,
        date: date.toISOString(),
        category,
        tags
    });
};
