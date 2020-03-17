// MIT © 2017 azu
"use strict";
const moment = require("moment");
const JSerStat = require("@jser/stat").JSerStat;
const { fetchPostDetails, fetchPosts } = require("@jser/data-fetcher");
const itemCategories = require("@jser/classifier-item-category").itemCategories;
const JSerClassifier = require("@jser/classifier-item-category").JSerClassifier;
const CategoryKey = require("@jser/classifier-item-category").CategoryKey;
const Category = require("@jser/classifier-item-category").Category;
const buildTemplate = require("./build-template");
// all_in_one_JSON.jsを先に実行しないといけない
const getAllJSON = require("../../converter/lib/get-all-json");
/**
 * @param {JSerStat} stat
 * @param {Date} toDate
 * @returns {JSerItem[]}
 */
const getUnPublishItems = (stat, toDate) => {
    const totalWeekCount = stat.getTotalWeekCount();
    /**
     * @type {JSerWeek}
     */
    const lastWeek = stat.getJSerWeek(totalWeekCount);
    return stat.findItemsBetween(lastWeek.post.date, toDate);
};
/**
 * @param {JSerClassifier} classifier
 * @param {JSerItem[]} items
 * @returns {{}}
 */
const groupByCategory = (classifier, items) => {
    const groups = {
        [CategoryKey.Headline]: {
            name: Category.Headline,
            articles: []
        },
        [CategoryKey.Article]: {
            name: Category.Article,
            articles: []
        },
        [CategoryKey.SlideVideo]: {
            name: Category.SlideVideo,
            articles: []
        },
        [CategoryKey.WebsiteDocument]: {
            name: Category.WebsiteDocument,
            articles: []
        },
        [CategoryKey.SoftwareLibrary]: {
            name: Category.SoftwareLibrary,
            articles: []
        },
        [CategoryKey.Book]: {
            name: Category.Book,
            articles: []
        },
    };
    items.forEach(item => {
        const expectedCategory = classifier.classifyItem(item);
        groups[expectedCategory].articles.push(item);
    });
    return groups;
};

module.exports = function createContent() {
    return Promise.all([getAllJSON(), fetchPosts(), fetchPostDetails()]).then(([items, posts, postDetails]) => {
        const stat = new JSerStat(items, posts);
        const classifier = new JSerClassifier({
            postDetails
        });
        const nextWeekNumber = stat.getTotalWeekCount() + 1;
        const today = moment.utc().toDate();
        // TODO: +9の分余分に取る。データのtimezoneがずれている問題の対処
        const unPublishItems = getUnPublishItems(stat, moment.utc().add(1, "day").toDate());
        const groups = groupByCategory(classifier, unPublishItems);
        const todayFormat = moment.utc().format("YYYY-MM-DD");
        const tags = ["JavaScript"];
        return buildTemplate({
            title: `${todayFormat}のJS: `,
            author: "azu",
            category: "JSer",
            date: today,
            tags,
            weekNumber: nextWeekNumber,
            groupsByHeader: groups
        });
    });
};

