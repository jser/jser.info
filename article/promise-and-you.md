## [JavaScript Promises: There and back again - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/es6/promises/ "JavaScript Promises: There and back again - HTML5 Rocks")

- 何故Promisesなのか?
	- 画像がロードの正否でコールバックを呼びたい時
	- "Event"を使う場合は`load`,`error`イベントで設定できる
		- 既にロード済みの場合は発火しない
		- そのため`complete` プロパティで判定して分岐する必要がある
		- "Event" は いつもベストというわけではない
	- promiseは一度だけ呼ばれる **成功**、**失敗** のコールバックを設定出来る
	- 既にロード済みでも、**成功**、**失敗** のコールバックは呼ぶことが出来る
- [Promiseの用語](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-promise-terminology "Promise terminology")
	- promiseが持つ状態の種類
		- （＊Kerrick Longによる<a href="#KerrickLongPromise">スライド</a>		がわかりやすい)
- [JavaScriptでのPromises](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-javascript-promises "Promises arrive in JavaScript!")
	- [WinJS.Promise](http://msdn.microsoft.com/en-us/library/windows/apps/br211867.aspx "WinJS.Promise"), [RSVP.js](https://github.com/tildeio/rsvp.js "RSVP.js"), [Q](https://github.com/kriskowal/q "Q"), [when.js](https://github.com/cujojs/when " when.js")のようなライブラリがある
	- 上記のライブラリは[Promises/A+](https://github.com/promises-aplus/promises-spec "Promises/A+")と呼ばれる仕様を元にしてる
		- APIのインターフェースは微妙に異なるが、挙動は[Promises/A+](https://github.com/promises-aplus/promises-spec "Promises/A+")に準拠している
		- [jQuery.Deferred()](http://api.jquery.com/category/deferred-object/ "jQuery.Deferred()")のようなDeferredと呼ばれる似たようなものもある。
		- jQuery.Deferred は [Promises/A+](https://github.com/promises-aplus/promises-spec "Promises/A+") に準拠したものではなく、[挙動が異なる部分もある](https://thewayofcode.wordpress.com/2013/01/22/javascript-promises-and-why-jquery-implementation-is-broken/ "Javascript promises and why jQuery implementation is broken | thewayofcode")
	- Promiseを使った実装の流れ
		- `Promise`コンストラクタは2つのパラメータを持つ1つのコールバックを引数に取る
		- `var promise = new Promise(function(resolve, reject) { … }`
		- 全て問題なく実行できた場合は `resolve` を呼び、それ以外は `reject` を呼ぶ
		- エラー時でも`throw`しないで、`reject`にErrorオブジェクトを渡して呼ぶ
		- Errorオブジェクトを使うことでスタックトレース等デバッグツールに優しい感じになる
		- promiseのインスタンスは `then` というコールバックを設定するメソッドを持っている
		- 結果を使う場合は `promise.then` で成功、失敗のコールバックを設定してあげる。
	- JSのpromiseはDOM __"Futures"__ という名前で始まり、__"Promises"__ にリネームされた
		- そのためDOMでも使えるし、現にいくつかのDOM APIの仕様でも使われてる
		- (＊ECMAScript6の仕様の方に入ってるので、DOMがないところでも使える)
- [ブラウザサポートとpolyfill](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-browser-support "Browser support &amp; polyfill")
	- (＊ 最新の状態は[Can I use...](http://caniuse.com/#feat=promises "Can I use... Support tables for HTML5, CSS3, etc")等を見ましょう)
- [他のライブラリとの互換性](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-lib-compatibility "Compatibility with other libraries")
	- JS Promises APIは `then` というメソッドを持つオブジェクトを __promise-like__ (or thenable)と呼ぶ
	- promise-likeなものをPromiseのインスタンスとして扱えるようにする `Promise.cast` が利用できる
	- `Promise.cast` を使うことでQのPromiseやjQueryのDeferredも扱える
	- `var jsPromise = Promise.cast($.ajax('/whatever.json'));`
	- ただしjQueryのDeferredはコールバックに渡すものが[多少異なる](http://jsfiddle.net/6PhMp/)
- [Complex async code made easier](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-coding-with-promises "Complex async code made easier")
- [XMLHttpRequestをPromise化する](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-promisifying-xmlhttprequest "Promisifying XMLHttpRequest")
	- `XMLHttpRequest`をラップしてpromiseオブジェクトを返すようにする例
- [Chaining](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-chaining "Chaining")
	- `then` を使うことで非同期処理の後に別の処理を追加できる
	- `then` のコールバックで値を変換することも出来る(`return`で変換した値を返すだけ)
	- `then` の返り値(＊1)に対しても`then` (next-`then`)で処理を追加することができる。
	- next-`then` に設定されたコールバックは＊1の値がsettles (succeeds/fails)になった時に呼ばれる
- [Error handling](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-error-handling "Error handling")
	- `then`はsuccessとfailureのコールバックを指定できるがエラーについてのコールバックだけを書きたい場合
		- `catch(function(response){ })` と書くことができる
		- `catch` は `then(undefined, func)` のシンタックスシュガー
	- JavaScriptの例外とPromises
		- Promiseコンストラクタ内で例外が投げられた場合
		- 暗黙的にrejectがエラーオブジェクト共に呼ばれる
		- つまりPromiseコンストラクタ内で例外がおきても `then`/`catch` で[捉えることができる](http://jsfiddle.net/Jsb8x/)
	- Error handling in practice
		- promiseではない場合は`try-catch`を使った方法を使う
		- promiseの場合は `.catch()` のchainを書くだけとシンプル
- [並行と逐次実行](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-parallelism-sequencing "Parallelism and sequencing - Getting the best of both")
	- Promisesで複数の非同期処理を扱う方法について
	- `promise.then` を使った非同期処理
	- ループの中で `promise.then` の非同期処理しても上手く回らないケース
		- ループでも動くように逐次実行用のpromiseオブジェクトを作る方法
		- `array.reduce`を使ってmutableな変数を使わないように逐次実行
	- `Promise.all` を使ってpromiseオブジェクトの配列をまとめて処理する
	- PromisesとGeneratorsを合わせた使い方
- [Promise API Reference](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-api "Promise API Reference")
	- PromiseのAPIリファレンス
	- （＊ [Promise - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise - JavaScript | MDN") )
---


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

---

## <a name="KerrickLongPromise"> [JavaScript Promises - Thinking Sync in an Async World // Speaker Deck](https://speakerdeck.com/kerrick/javascript-promises-thinking-sync-in-an-async-world "JavaScript Promises - Thinking Sync in an Async World // Speaker Deck")

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
