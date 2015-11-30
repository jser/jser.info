# [JSer.info][] [![Build Status](https://travis-ci.org/jser/jser.info.png)](https://travis-ci.org/jser/jser.info) [![Gitter chat](https://badges.gitter.im/jser/jser.info.png)](https://gitter.im/jser/jser.info)

JSer.infoに掲載する記事の元データを管理しているリポジトリです。

JSer.infoサイト自体は[jser/jser.github.io](https://github.com/jser/jser.github.io "jser/jser.github.io")のGitHub Pagesとして動作しています。

## JSer.infoの案内

JSer.infoに関連するリポジトリについての案内です。

## 情報を見たい

- [JSer.info](http://jser.info/)
	- JSer.infoサイトそのもの
	- 週一回程度で更新
- [Realtime JSer.info](http://realtime.jser.info/)
	- JSer.infoのリアルタイム版
	- 元データが追加された時点で更新

## コミュニケーションを取りたい

- [Issues · jser/jser.info](https://github.com/jser/jser.info/issues "Issues · jser/jser.info")
	- JSer.infoに関連する意見や要望などを管理するIssue
- [![Gitter chat](https://badges.gitter.im/jser/jser.info.png)](https://gitter.im/jser/jser.info)
	- Gitterを利用したチャット
	- Issueを立てるまでもない指摘や感想、疑問、オススメ記事など迷ったらチャットへ

## データや記事を修正したい

- [jser/jser.info](https://github.com/jser/jser.info "jser/jser.info")
	- 元データを修正したい場合
	- 記事として掲載後に元データを修正しても自動的に記事へ反映はされません
- [jser/jser.github.io](https://github.com/jser/jser.github.io "jser/jser.github.io")
	- [JSer.info][]の記事を修正したい場合

記事上部の **Edit on GitHub** 又は 下部の **この記事へ修正リクエストをする** から該当記事の編集画面が開けます。

![掲載済みの記事へのpull-request](http://take.ms/suw5I)


## 紹介して欲しい記事/サイト/ライブラリがある

JSer.infoに載せて欲しい記事は[このリポジトリ](https://github.com/jser/jser.info)へPull Requestする。

手順について、詳しくは[CONTRIBUTING.md](./CONTRIBUTING.md)を読む。

- [JSer.info Pull Request Form](http://jser.info/contributing/ "JSer.info Pull Request Form")
	- 掲載したい記事がある場合はこちらのフォームからPull Request
	- [jser/contributing-preview](https://github.com/jser/contributing-preview "jser/contributing-preview")
	- データの表示をプレビューする補助ツール

関連: [JSer.infoに紹介してもらいたい記事のPull Requestが出来るようになりました - JSer.info](http://jser.info/post/75446735069/jser-info-pull-request/ "JSer.infoに紹介してもらいたい記事のPull Requestが出来るようになりました - JSer.info")


## データを分析したい

JSer.infoのデータを分析したいはJSON APIとライブラリが用意されています。

- [jser/stat-js](https://github.com/jser/stat-js "jser/stat-js")
	- JSer.infoの掲載データを利用出来る統計処理ライブラリ
	- 特定の期間で紹介した記事一覧の取得、関連記事の検索など
- [JSer.info トレンド](http://jser.info/trends/ "JSer.info トレンド")
	- [jser/stat-js](https://github.com/jser/stat-js "jser/stat-js")を使ったキーワードトレンド情報のビューア


## 素材が欲しい

- [jser/media](https://github.com/jser/media "jser/media")
	- JSer.infoのロゴやアイコンなどの素材


## ライセンス

The source code under the MIT LICENSE.

`data/` under the CC-BY [![CC-BY](https://i.creativecommons.org/l/by/4.0/88x31.png)](http://creativecommons.org/licenses/by/4.0/)

[JSer.info]: http://jser.info/  "JSer.info"
