# Pull Requestガイド

## 紹介記事の追加

> [JSer.info Pull Request Form](http://azu.github.io/JSer.info-tribute/ "JSer.info Pull Request Form")

[JSer.info](http://jser.info/ "JSer.info") で紹介して欲しい記事やサイト等をPull Requestしたい場合は、
[JSer.info Pull Request Form](http://azu.github.io/JSer.info-tribute/ "JSer.info Pull Request Form") を利用すると、
追加するJSONフォーマットを自動的に生成できます。 (その月の `data/year/month/index.json` に対してJSONを追記していきます。)


Pull Requestを取り込むか(掲載するか)は個人的な判断にて決定するため、マージする保証はありませんが、
自己推薦や宣伝記事であっても興味深い内容だと判断されればマージされます。

ちゃんとした基準はありませんが、最低限意識する事として以下の通りです。

* 嘘や誇張など誤解されやすい内容は避ける
* 意味のある内容がある(長さは関係ない)
* できるだけ客観的な説明文にする

説明文はPull Request後も変更できるのでとりあえずPull Requestを送ってみるといいです。

* [JSer.infoについて | JSer.info](http://jser.info/about "JSer.infoについて | JSer.info")
* [掲載のポリシー - JSer.info 1年を迎えて](http://azu.github.io/slide/offline_study/jser_info.html#slide6 "掲載のポリシー")
* [azu/JSer.info-tribute](https://github.com/azu/JSer.info-tribute/ "azu/JSer.info-tribute")

### 紹介記事の書き方

紹介記事データにはサイトタイトルやURL、タグといった項目がありますがどのようなものを入力すればいいか簡単に解説します。

* __タイトル__
    * 紹介したいサイトのタイトルを入力します。
    * `<title>` 要素に書かれているものをそのまま使うのが望ましいですが、空欄となってる場合や長すぎる場合は適当なものを入力して問題ないありません。
* __URL__
    * サイトのURLを入力します。
    * URLに `utm_` 等トラッキング要素が入ってないか、パーマネントリンクとして正しいかなどをチェックしましょう。
* __説明__
    * サイトについての簡単な概要を入力します。
    * 行数の制限はありません、またMarkdownも利用できます。
    * その記事の要点やライブラリなら目的や機能など簡単に書くとよいと思います。
* __タグ__
    * サイトのタグを入力します。
    * `JavaScript` や `library` 等 関連しそうなキーワードのタグをカンマ区切りで入力します。
    * JSer.infoで使われてるタグは [ブックマーク](http://b.hatena.ne.jp/efcl/bookmark "ブックマーク") から見られますが、必ずしもコレに合わせなくても良いです。
* __関連サイト__
    * 紹介したいサイトに関係ありそうなサイトを入力します。
    * なければ省略しても問題ありません。
    * 合わせて読むといい記事 や 紹介してるライブラリのサイトなどを入れるといいかもしれません。

#### 説明について

__説明__ はどう書けばいいか悩むかもしれませんが、とりあえずで書いてPull Requestで丸投げするのもひとつの手です。

掲載のポリシーでも述べたように、多少冗長であっても誤解されにくい表現にするといいかもしれません。

例えば、 _xxxより軽いライブラリ_ という表現だと コード量的に軽いのか、速度が早いという意味なのかわからないので、
コード量的な意味なら _xxxよりコード量が少ないライブラリ_ とする方がいいでしょう。

説明は自分自身の意見よりも、サイトの主張を紹介する場所です。(過剰な主張なら注釈を入れるなどをすると和らぐかもしれません)

## その他の修正や改善

`gh-pages` の方に修正内容や追加の実装などをPull Requestして下さい。

## ライセンス

Pull Requestされた内容は MITライセンス が適応されます。