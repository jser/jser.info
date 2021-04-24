import nc from "next-connect";
import memoize from "micro-memoize";
import regexCombiner from "regex-combiner";
const indexJSON = require("../../index.json");

export type SearchQuery = {
    q: string;
}
export type SearchResponse = {
    results: BookmarkItem[]
}
export type BookmarkItem = {
    title: string;
    url: string;
    date: string;
    content: string;
    tags: string[];
    relatedLinks?: {
        title: string;
        url: string;
    }[]
}
const stringifyBookmarkItem = (bookmark: BookmarkItem): string => {
    return `${bookmark.title}\t${bookmark.url}\t${
        bookmark.content
    }\t${bookmark.date}\t${bookmark.relatedLinks ? bookmark.relatedLinks.map(link => link.title + "\t" + link.url).join("\t") : ""}`
        .toLowerCase();
};

const memorizedStringifyBookmarkItem = memoize(stringifyBookmarkItem);
const memoriezdRegexCombiner = memoize((searchWord: string[]) => {
    // @ts-ignore
    const pattern = regexCombiner(searchWord);
    return new RegExp(pattern.source, "i");
});
export const matchBookmarkItem = (bookmark: BookmarkItem, searchWords: string[]): boolean => {
    const text = memorizedStringifyBookmarkItem(bookmark);
    const combined = memoriezdRegexCombiner(searchWords);
    if (!combined.test(text)) {
        return false;
    }
    if (searchWords.length === 1) {
        return true;
    }
    // multiple words as & search
    return searchWords.every(searchWord => {
        return text.indexOf(searchWord.toLowerCase()) !== -1;
    });
};
const handler = nc()
    .get<{
        query: SearchQuery
    }>((req, res) => {
        const query = req.query.q;
        if (typeof query !== "string") {
            throw new Error("invalid ?q=")
        }
        const queries = query.split(/\s+/);
        if (queries.length === 0) {
            return res.end(JSON.stringify({
                results: []
            }));
        }
        const searchResults = (indexJSON as BookmarkItem[]).filter(item => {
            return matchBookmarkItem(item, queries);
        }).slice(0, 30);
        res.end(JSON.stringify({
            results: searchResults
        }));
    });
export default handler;
