# todo-list
研修用課題（Todoリスト）

<実行環境>

node.js v11.6.0
npm  6.5.0-next.0
mysql Ver 14.14 Distrib 5.7.29

＊＊mysql

  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'list_app'
  
神馬くんと同じ

今回doneDate,firstTime datetimeは関係ない。

create table items
(
    id        int auto_increment
        primary key,
    name      text                 null,
    done      tinyint(1) default 0 not null,
    doneDate  datetime             null,
    important tinyint(1) default 0 null,
    firstTime datetime   default CURRENT_TIMESTAMP
);

<実行順序>

1.Node.jsインストール

  公式サイトから推奨版をダウンロード。
  
  node -v
  npm -v
  バージョンが表示されればOK

2.MySQLインストール

 brew install mysql@5.7

 バージョン確認
 mysql --version
 結果　
 mysql  Ver 14.14 Distrib 5.7.29

3.Node.jsアプリケーションとMySQLを接続
 
 mysqlパッケージのインストール
 npm install mysql

4.データベースとテーブルを作成

上記＊＊参照

 
5.node app.js

ブラウザを開いて「localhost:3000」というURLにアクセスします。
