import { useEffect, useMemo, useState } from "react";
import { BookmarkItem, SearchResponse } from "./api/search";
import { useDebounce } from "use-debounce";
import Head from "next/head";

const GlobalStyle = () => {
    return <style jsx global>{`
      html, body {
        width: 100%;
        margin: 0;
        padding: 0;
      }

      /* Basic.css  https://github.com/vladocar/Basic.css */
      * {
        box-sizing: border-box
      }

      :root {
        --sans: 1em/1.6 system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Droid Sans, Helvetica Neue, Fira Sans, sans-serif;
        --mono: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier, 'Courier New', monospace;
        --c1: #0074d9;
        --c2: #eee;
        --c3: #fff;
        --c4: #000;
        --c5: #fff;
        --m1: 8px;
        --rc: 8px;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --c2: #333;
          --c3: #1e1f20;
          --c4: #fff;
        }
      }

      html {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;

      }

      /* General settings */

      body {
        margin: 0;
        font: var(--sans);
        font-weight: 400;
        font-style: normal;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        background-color: var(--c3);
        color: var(--c4);
      }

      img, iframe {
        border: none;
        max-width: 100%
      }

      a {
        color: var(--c1);
        text-decoration: none
      }

      a:hover {
        color: var(--c1);
        text-decoration: underline
      }

      pre {
        font: 1em/1.6 var(--mono);
        background: var(--c2);
        padding: 1em;
        overflow: auto
      }

      code {
        font: 1em/1.6 var(--mono);
      }

      blockquote {
        border-left: 5px solid var(--c2);
        padding: 1em 1.5em;
        margin: 0
      }

      hr {
        border: 0;
        border-bottom: 1px solid var(--c4)
      }

      /* Headlines */

      h1, h2, h3, h4, h5, h6 {
        margin: 0.6em 0;
        font-weight: normal
      }

      h1 {
        font-size: 2.625em;
        line-height: 1.2
      }

      h2 {
        font-size: 1.625em;
        line-height: 1.2
      }

      h3 {
        font-size: 1.3125em;
        line-height: 1.24
      }

      h4 {
        font-size: 1.1875em;
        line-height: 1.23
      }

      h5, h6 {
        font-size: 1em;
        font-weight: bold
      }

      /* Table */

      table {
        border-collapse: collapse;
        border-spacing: 0;
        margin: 1em 0
      }

      th, td {
        text-align: left;
        vertical-align: top;
        border: 1px solid;
        padding: 0.4em
      }

      thead, tfoot {
        background: var(--c2)
      }

      /* Rounded Corners*/

      pre, code, input, select, textarea, button, img {
        border-radius: var(--rc)
      }


      /* Forms */

      input, select, textarea {
        font-size: 1em;
        color: var(--c4);
        background: var(--c2);
        border: 0;
        padding: 0.6em
      }

      button, input[type=submit], input[type=reset], input[type="button"] {
        -webkit-appearance: none;
        font-size: 1em;
        display: inline-block;
        color: var(--c5);
        background: var(--c1);
        border: 0;
        margin: 4px;
        padding: 0.6em;
        cursor: pointer;
        text-align: center
      }

      button:hover, button:focus, input:hover, textarea:hover, select:hover {
        opacity: 0.8
      }

      /* Infinite Grid */

      section {
        display: flex;
        flex-flow: row wrap
      }

      [style*="--c:"], section > section, aside, article {
        flex: var(--c, 1);
        margin: var(--m1)
      }

      /* Cards */

      article {
        background: var(--c2);
        border-radius: var(--rc);
        padding: 1em;
        box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.3)
      }

      [style*="--c:"]:first-child, section > section:first-child, article:first-child {
        margin-left: 0
      }

      [style*="--c:"]:last-child, section > section:last-child, article:last-child {
        margin-right: 0
      }
    `}
    </style>
}
const useSearch = (items: BookmarkItem[] = []) => {
    const [query, setQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<BookmarkItem[]>(items);
    const [debouncedQuery] = useDebounce(query, 300);
    useEffect(() => {
        (async function fetchMain() {
            const searchParams = new URLSearchParams([
                ["q", query]
            ]);
            const res: SearchResponse = await fetch("/api/search?" + searchParams.toString()).then(res => res.json());
            setSearchResults(res.results);
        })()
    }, [debouncedQuery])
    const handlers = useMemo(
        () => ({
            search: (query: string) => {
                setQuery(query)
            },
        }), []
    )
    return {
        query,
        searchResults,
        handlers
    }
}

type HomePageProps = {
    items: BookmarkItem[]
}

function HomePage(props: HomePageProps) {
    const {
        query,
        searchResults,
        handlers
    } = useSearch(props.items);
    return <div style={{
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        width: "100%"
    }}>
        <Head>
            <title>JSer.info Archive Search</title>
        </Head>
        <GlobalStyle/>
        <div style={{
            width: "100%",
            display: "flex",
            alignContent: "center",
            alignItems: "center"
        }}>
            <a href={"https://github.com/jser/jser.info/tree/gh-pages/layer0"} title={"GitHub"} style={{
                display: "inline-flex",
                alignContent: "center",
                alignItems: "center",
                paddingRight: "4px"
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                    <path fillRule="evenodd"
                          d="M1.326 1.973a1.2 1.2 0 011.49-.832c.387.112.977.307 1.575.602.586.291 1.243.71 1.7 1.296.022.027.042.056.061.084A13.22 13.22 0 018 3c.67 0 1.289.037 1.861.108l.051-.07c.457-.586 1.114-1.004 1.7-1.295a9.654 9.654 0 011.576-.602 1.2 1.2 0 011.49.832c.14.493.356 1.347.479 2.29.079.604.123 1.28.07 1.936.541.977.773 2.11.773 3.301C16 13 14.5 15 8 15s-8-2-8-5.5c0-1.034.238-2.128.795-3.117-.08-.712-.034-1.46.052-2.12.122-.943.34-1.797.479-2.29zM8 13.065c6 0 6.5-2 6-4.27C13.363 5.905 11.25 5 8 5s-5.363.904-6 3.796c-.5 2.27 0 4.27 6 4.27z"/>
                    <path
                        d="M4 8a1 1 0 012 0v1a1 1 0 01-2 0V8zm2.078 2.492c-.083-.264.146-.492.422-.492h3c.276 0 .505.228.422.492C9.67 11.304 8.834 12 8 12c-.834 0-1.669-.696-1.922-1.508zM10 8a1 1 0 112 0v1a1 1 0 11-2 0V8z"/>
                </svg>
            </a>
            <label>
                Search:
                <input
                    type={"text"}
                    value={query}
                    onChange={(event => handlers.search(event.currentTarget.value))}
                    style={{
                        fontSize: "20px",
                        width: "18em",
                        margin: "0 0.5em",
                        padding: "0 0.2em"
                    }}/>
            </label>
        </div>
        <ul style={{
            listStyle: "none",
            padding: 0
        }
        }>
            {
                searchResults.map(item => {
                    return <li key={item.url + item.date} style={{
                        paddingBottom: "1rem"
                    }}><a href={item.url} target={"_blank"}>{item.title}</a>
                        <p style={{
                            margin: 0,
                            paddingBottom: "0.2rem",
                        }}>
                            {item.tags ? item.tags.map(tag => <span key={tag} style={{
                                fontSize: "14px",
                                marginRight: "0.2em",
                                borderBottom: "1px solid #ddd"
                            }}>{tag}</span>) : <span style={{
                                fontSize: "14px",
                                marginRight: "0.2em",
                                borderBottom: "1px solid #ddd"
                            }}>No Tag</span>}
                        </p>
                        <p style={{
                            margin: 0,
                            padding: 0,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word"
                        }}>{item.content}</p>
                    </li>
                })
            }
        </ul>
    </div>
}

export function getStaticProps() {
    const indexJSON = require("../index.json");
    return {
        props: {
            items: indexJSON.slice(0, 30)
        }
    }
}


export default HomePage
