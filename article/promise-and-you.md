## はじめに

この記事は、 ECMAScript6 promisesについてを理解するために読んだ方がよいと思われる記事やスライド等を紹介しています。

PromisesやDeferredといった言葉を非同期処理の話などで聞いた事があるかもしれませんが、
現在Promisesは次のECMAScriptの言語仕様として策定が進められています。

* [ECMAScript Language Specification ECMA-262 6th Edition – DRAFT](http://people.mozilla.org/%7Ejorendorff/es6-draft.html#sec-promise-objects "ECMAScript Language Specification ECMA-262 6th Edition – DRAFT")
* [domenic/promises-unwrapping](https://github.com/domenic/promises-unwrapping "domenic/promises-unwrapping")

まだES6は策定段階ですが、既にPromisesについては[polyfillとして利用できるライブラリ](#promises-library)等もあり、また他のライブラリ内でも[jQuery.Deferred()](http://api.jquery.com/category/deferred-object/ "jQuery.Deferred")や[Angularの$q](http://docs.angularjs.org/api/ng/service/$q "$q")等類似する実装が存在します。

そのため、[Generators](http://wiki.ecmascript.org/doku.php?id=harmony:generators "Generators")等に比べると今すぐ使えるし、既に使われている機能といえると思います。

[ES6 Promises](http://people.mozilla.org/%7Ejorendorff/es6-draft.html#sec-promise-objects "ECMAScript Language Specification ECMA-262 6th Edition – DRAFT")はAPIとしてはそこまで数はなく、また類似する実装でも基本的にAPI名が異なるだけで挙動は同様なため(jQuery Defferdはちょっと異なりますが…)、ES6 Promisesについて学ぶことは今すぐ使える知識なので、この機会にPromisesについて調べてみるといいかもしれません。

紹介している記事は長いものも多いので、記事の簡単な概要とアウトラインをつけてあります。

特に読むべき順番などはないですが(上から順に読みやすい感じにしてはいます)、気になるワードが出てきたものから読んでみるのもいいですね。

----

## 紹介記事


<blockquote title="JavaScript Promises: There and back again - HTML5 Rocks">
<p class="jser-sitelink"><strong>JavaScript Promises: There and back again - HTML5 Rocks</strong><br /> <a title="JavaScript Promises: There and back again - HTML5 Rocks" href="http://www.html5rocks.com/en/tutorials/es6/promises/">http://www.html5rocks.com/en/tutorials/es6/promises/</a></p>
</blockquote>

Promisesについてよくまとまっていて、これを読めばひと通りの流れがわかるようになってる記事

#### アウトライン

- [何故Promisesなのか?](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-async "What&#39;s all the fuss about?")
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
	

<blockquote title="JavaScript Promises - Thinking Sync in an Async World // Speaker Deck">
<p class="jser-sitelink"><strong>JavaScript Promises - Thinking Sync in an Async World // Speaker Deck</strong><br />
<a name="KerrickLongPromise"><a href="https://speakerdeck.com/kerrick/javascript-promises-thinking-sync-in-an-async-world" title="JavaScript Promises - Thinking Sync in an Async World // Speaker Deck">https://speakerdeck.com/kerrick/javascript-promises-thinking-sync-in-an-async-world</a></a></p>
</blockquote>

> [▶ JavaScript Promises: Thinking Sync in an Async World - YouTube](http://www.youtube.com/watch?v=wc72cyYt8-c "▶ JavaScript Promises: Thinking Sync in an Async World - YouTube")

Promisesにおけるデータの流れについてよくまとまっているスライド。

promiseの各メソッドについても紹介されているので全体像をさっとみるのに適している。

#### アウトライン

- [Promise Basic](https://speakerdeck.com/kerrick/javascript-promises-thinking-sync-in-an-async-world?slide=16)
	- Promises/A+の実装ライブラリ
		- [RSVP.js](https://github.com/tildeio/rsvp.js "RSVP.js"), [Q.js](https://github.com/kriskowal/q "q.js"), [Bluebird.js](https://github.com/petkaantonov/bluebird "bluebird.js")
- [Promise States](https://speakerdeck.com/kerrick/javascript-promises-thinking-sync-in-an-async-world?slide=26)
	- `Pending`,`Fulfilled`, `Rejected` の3つ
	- `Pending` -(Value)-> `Fulfilled`
	- `Pending` -(Reason)-> `Rejected`
- [Promise Prototype Methods](https://speakerdeck.com/kerrick/javascript-promises-thinking-sync-in-an-async-world?slide=33)
	- `Promise.prototype.then`
	- `Promise.prototype.catch` - `promise.then(null, onFailure)` と同義
	- `Promise.cast` - オブジェクトをpromiseにする
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
		
----


<blockquote title="w3ctag/promises-guide">
<p class="jser-sitelink"><strong>w3ctag/promises-guide</strong><br /> <a href="https://github.com/w3ctag/promises-guide" title="w3ctag/promises-guide">https://github.com/w3ctag/promises-guide</a></p>
</blockquote>

Promisesはいろいろなライブラリで試されてきた概念で、それを元に[Promises/A+](http://promisesaplus.com/ "Promises/A+")というコミュニティベースな仕様が立ち上げられた。([Promises/A](http://wiki.commonjs.org/wiki/Promises/A "Promises/A"))

この仕様に対して多くのライブラリが適合するようになり、そして今[Promisesは次のECMAScript仕様](http://people.mozilla.org/%7Ejorendorff/es6-draft.html#sec-promise-objects "Promise Objects")にも含まれるようになった。

PromisesはWeb Platformにおける非同期処理の一つのパラダイムであり、[Streams API](http://www.w3.org/TR/streams-api/ "Streams API")など他の仕様でも使われつつある。

このドキュメントはどのようにしてPromisesの仕様が作られたか、またPromisesをどのように使うかについて書かれている。

#### アウトライン

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
		- 成功やエラーの種類のために、追加で新たに別のコールバックは作らない
			- `onFulfilled`, `onRejected`に渡す値で分けるべき
	- [Promise Arguments](https://github.com/w3ctag/promises-guide#promise-arguments " Promise Arguments")
		- `promises` を引数に受ける関数は `Promise.cast` すべきである。
- [Shorthand Phrases](https://github.com/w3ctag/promises-guide#shorthand-phrases " Shorthand Phrases")
	- 仕様を読み書きするときに便利なフレーズ集

---

### 応用/実践


<blockquote title="Promise Anti-patterns">
<p class="jser-sitelink"><strong>Promise Anti-patterns</strong><br /> <a href="http://taoofcode.net/promise-anti-patterns/" title="Promise Anti-patterns">http://taoofcode.net/promise-anti-patterns/</a></p>
</blockquote>

Promisesのアンチパターンについて書かれている記事。

アンチパターンとそれを改善したパターンについて書かれているので、実際に書いてみて疑問に思ったりするパターンについてまとまっている。 

#### アウトライン

- ネストしたPromises
- `then`の返り値はそれぞれ新しいpromiseを返すために起きるエラーハンドリングのミス
	- http://www.es6fiddle.net/hs08k5sh/ のようなコードはエラーを`catch`できない
	- `then` の返り値を返すようにすると`catch`できる http://www.es6fiddle.net/hs08nnaq/
- 配列を渡してそれぞれについてpromiseを使った処理をする場合に起きる問題
	- [Parallelism and sequencing - Getting the best of both](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-parallelism-sequencing "Parallelism and sequencing - Getting the best of both")
	- `Promise.all` は `array.reduce` を使って処理できるようにする
- 過剰なエラーハンドリング
	- `then()`の第二引数(`onRejected`)でもエラーハンドリングはできるが
	- 第一引数の `onFulfilled` 内でエラーが起きた場合に問題が起きる
- promiseを返す関数であることを忘れて、さらにPromiseで包んでしまう問題


<blockquote title="Promise nuggets">
<p class="jser-sitelink"><strong>Promise nuggets</strong><br /> <a href="http://promise-nuggets.github.io/" title="Promise nuggets">http://promise-nuggets.github.io/</a></p>
</blockquote>

Promisesとコールバックを使った実装の比較やPromisesのパターンについて書かれているチュートリアルサイト。

(途中で出てくる`fs.readFileAsync(file)`は[Bluebird](https://github.com/petkaantonov/bluebird "Bluebird")の[Promise.promisifyAll](https://github.com/petkaantonov/bluebird/blob/master/API.md#promisepromisifyallobject-target---object "Promise.promisifyAll")を使ったpromiseを返すバージョンの事)

<blockquote title="Why I am switching to promises">
<p class="jser-sitelink"><strong>Why I am switching to promises</strong><br /> <a href="http://spion.github.io/posts/why-i-am-switching-to-promises.html" title="Why I am switching to promises">http://spion.github.io/posts/why-i-am-switching-to-promises.html</a></p>
</blockquote>

[Promise nuggets](http://promise-nuggets.github.io/ "Promise nuggets")の著者によって書かれたPromiseの利点についての記事。

throw-safeなエラーハンドリング、パフォーマンスとメモリ消費、promise.nodeifyを使ったコールバックスタイルとの互換性、Promiseの書き方やユースケース等について書かれている。

### <a name="promises-library" href="#promises-library">ライブラリ/polyfill/ツール</a>

<iframe src="http://caniuse.com/promises/embed/agents=desktop,ios_saf,android"></iframe>

PromisesはChrome/Opera/Firefox等、一部ブラウザでしか実装されていませんが、
[ECMAScript Language Specification](http://people.mozilla.org/%7Ejorendorff/es6-draft.html#sec-promise-objects "ECMAScript Language Specification ECMA-262 6th Edition – DRAFT")に基づく実装や、[Promises/A+](http://promises-aplus.github.io/promises-spec/ "Promises/A+")の実装ライブラリ等があります。
(どちらも基本的に挙動はほぼ同じで、API名が異なる部分がある程度です)

また、**Advanced**となっているものは、基本的な実装は同じですがよくあるパターン等を拡張したメソッド等が実装されています。

またどちらのライブラリもAPIドキュメントが充実しているので、このライブラリを直接使わない場合でも見ておくといいかもしれません。

#### ES6 polyfill

- [yahoo/ypromise](https://github.com/yahoo/ypromise "yahoo/ypromise")
- [ES6-Promises](https://github.com/jakearchibald/es6-promise "ES6-Promises")
	- [RSVP.js](https://github.com/tildeio/rsvp.js "RSVP.js")を元にES6の仕様に合うようにマップしたもの

#### Promise/A+

- [then/promise](https://github.com/then/promise "then/promise")
	- [promises.org](http://www.promisejs.org/ "Promises")の作者による実装
- [tildeio/rsvp.js](https://github.com/tildeio/rsvp.js "tildeio/rsvp.js")
- [cujojs/when](https://github.com/cujojs/when "cujojs/when")

#### Advanced

- [petkaantonov/bluebird](https://github.com/petkaantonov/bluebird "petkaantonov/bluebird")
	- [bluebird/API.md at master · petkaantonov/bluebird](https://github.com/petkaantonov/bluebird/blob/master/API.md "bluebird/API.md at master · petkaantonov/bluebird")					
- [kriskowal/q](https://github.com/kriskowal/q "kriskowal/q")
	- [API Reference · kriskowal/q Wiki](https://github.com/kriskowal/q/wiki/API-Reference "API Reference · kriskowal/q Wiki")

### ツール

- [ES6 Fiddle](http://www.es6fiddle.net/ "ES6 Fiddle")
	- [Traceur](https://github.com/google/traceur-compiler "Traceur")を使ってコンパイルされるため、Promisesをサポートしてないブラウザでもコードを試せる
	
----


## おわりに

Promisesはコールバックの深いネストを減らせるという見た目的な問題だけではなく、
非同期処理の複雑なエラーハンドリングを分かりやすく書くことが出来る点等もメリットだと思います。

非同期のタイミングで値が入った時にどうするか?という事を書いた器(promiseオブジェクト)をやりとりすることで、
コールバックをネストした時に比べてあちこちに点々とする値ではなく、promiseオブジェクトという器に対して処理を集中して書けることが特徴だと思います。

そのため、器であるpromiseオブジェクトに対して何度もデータを入れるような"Event"や"Stream"と言った動作にはPromisesは不向きであるかもしれません。
必ずしも全てがPromisesで賄えるわけではないため、ひとつの手段として知っておくことが大切と言えると思います。

最後に、この記事は [あなたが読むべきPromises by azu · Pull Request #17 · azu/jser.info](https://github.com/azu/jser.info/pull/17 "あなたが読むべきPromises by azu · Pull Request #17 · azu/jser.info") で議論(という名のほぼ独り言)を元に書かれました。

このissueにはこの記事で紹介してない[実装しながら学ぶ](https://github.com/azu/jser.info/pull/17#issuecomment-34645577 "実装しながら学ぶ")系の記事や[モナドネタ](https://github.com/azu/jser.info/pull/17#issuecomment-35089400 "モナドネタ")なども候補に出してましたが、今回は入れてないので興味がある人はそちらも見るといいかもしれません。

また、他にも読まれるべきだと思うものがある場合は、[あなたが読むべきPromises by azu · Pull Request #17 · azu/jser.info](https://github.com/azu/jser.info/pull/17 "あなたが読むべきPromises by azu · Pull Request #17 · azu/jser.info")にコメント等しておけば更新されるかもしれません。

この記事/紹介してる記事がPromisesの理解の助けになればと思います。
