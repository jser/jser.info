## [w3ctag/promises-guide](https://github.com/w3ctag/promises-guide "w3ctag/promises-guide")

Promisesはいろいろなライブラリで試されてきた概念で、それを元に[Promises/A+](http://promisesaplus.com/ "Promises/A+")というコミュニティベースな仕様が立ち上げられた。

この仕様に対して多くのライブラリが適合するようになり、そして今、 [Promise Objects](http://people.mozilla.org/%7Ejorendorff/es6-draft.html#sec-promise-objects "Promise Objects")は次のECMAScript仕様にも含まれるようになった。

PromisesはWeb Platformにおける非同期処理の一つのパラダイムであり、[Streams API](http://www.w3.org/TR/streams-api/ "Streams API")など他の仕様でも使われつつある。

このドキュメントはどのようにしてPromisesの仕様が作られたか、又promisesをどのように使うかについて書かれている。


- [いつPromisesを使うか](https://github.com/w3ctag/promises-guide#when-to-use-promises " When to Use Promises")
	- "One-and-Done Operations" 一度きりの操作の場合Promisesが適切
	- 同期的な関数は値を返すか例外を投げる
	- 非同期な関数は `promise` を返す
		- `promise` は 値を `fulfilled` するか、又は理由と共に `rejected` する
	- 今までのweb platformの仕様でも非同期操作は存在した
	- それは `onsuccess`/`onerror` のようなイベントかコールバックで表現されていた
	- 一度きりの "Event" としてのPormises
		- ある状態になった時に呼び出す目的で "Event" を使った場合に既に状態を満たしてると "Event" が発火しない
		- Promisesの場合は `.then(onReady, onFailure)` で既に状態を満たしている場合でも `onReady` を呼ぶことが出来る
- [いつPromisesを使うべきでないか](https://github.com/w3ctag/promises-guide#when-not-to-use-promises " When Not to Use Promises")
	- "One-and-Done Operations" ではない時
	- 繰り返し起きるEventの場合
	- ストリーミングデータを扱う時
- [API Design Guidance](https://github.com/w3ctag/promises-guide#api-design-guidance "API Design Guidance")
	- [Errors](https://github.com/w3ctag/promises-guide#errors "Errors")について
		- Promiseコンストラクタ内で `throw` すべきでない
		- `onRejected` には `Error` 型の値を渡すべきである
		- `onRejected` は例外的な場合に使うべきである
	- [Asynchronous Algorithms](https://github.com/w3ctag/promises-guide#asynchronous-algorithms " Asynchronous Algorithms")
		- (この辺は議論中なのでちゃんと原文を見ましょう)
		- 正常なコントールフローを管理する
		- 不必要なタスクのキューとして使わない
		- 成功やエラーの種類のために、新たに別のコールバックは作らない
			- `onFulfilled`, `onRejected`に渡す値で分けるべき
	- [Promise Arguments](https://github.com/w3ctag/promises-guide#promise-arguments " Promise Arguments")
		- `promises` を引数に受ける関数は `Promise.cast` すべきである。
- [Shorthand Phrases](https://github.com/w3ctag/promises-guide#shorthand-phrases " Shorthand Phrases")
	- 仕様を読み書きするときに便利なフレーズ集


## [JavaScript Promises - Thinking Sync in an Async World // Speaker Deck](https://speakerdeck.com/kerrick/javascript-promises-thinking-sync-in-an-async-world "JavaScript Promises - Thinking Sync in an Async World // Speaker Deck")

<script async class="speakerdeck-embed" data-id="15dc2a3071d201314bf25aef2655508f" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

> [▶ JavaScript Promises: Thinking Sync in an Async World - YouTube](http://www.youtube.com/watch?v=wc72cyYt8-c "▶ JavaScript Promises: Thinking Sync in an Async World - YouTube")

- [Promise Basic](https://speakerdeck.com/kerrick/javascript-promises-thinking-sync-in-an-async-world?slide=16)
	- Promises/A+の実装ライブラリ
		- [RSVP.js](https://github.com/tildeio/rsvp.js "RSVP.js"), [Q.js](https://github.com/kriskowal/q "q.js"), [Bluebird.js](https://github.com/petkaantonov/bluebird "bluebird.js")
- [Promise States](https://speakerdeck.com/kerrick/javascript-promises-thinking-sync-in-an-async-world?slide=26)
	- `Pending`,`Fulfilled`, `Rejected` の3つ
	- `Pending` -(Value)-> `Fulfilled`
	- `Pending` -(Reason)-> `Rejected`
- [Promise Prototype Methods](https://speakerdeck.com/kerrick/javascript-promises-thinking-sync-in-an-async-world?slide=33)
	- `Promise.prototype.then`
	- `Promise.prototype.catch`
	- `Promise.cast` 
	- `Promise.all` - 全てのpromiseが `resolve` された時に次へ行く
	- `Prmises.race` - ひとつでもpromiseが `resolve` された時に次へ行く
- [Creating Promises](https://speakerdeck.com/kerrick/javascript-promises-thinking-sync-in-an-async-world?slide=54)
	- `new Promise(function(resolve, reject){/* work */});`
	- Shortcut
		- `Promise.resolve`
		- `Promise.reject`
- [Advanced Techiniques](https://speakerdeck.com/kerrick/javascript-promises-thinking-sync-in-an-async-world?slide=64)
	- `then` の中での `this` と `bind`
	- Absorbed Rejections
		- `.catch` と `console.error` を bindする
