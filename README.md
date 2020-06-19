# todo-list
## 研修用課題（Todoリスト）
実行環境
``` 
node.js v11.6.0
npm  6.5.0-next.0
mysql Ver 14.14 Distrib 5.7.29
```

[DB接続情報](https://github.com/takano08/todo-list/blob/98a499b84c8344e86e610b7a1f38e53978b99369/app.js#L9-L12)
local環境で稼働させる訓練用リポジトリの為 接続情報も記載しています。
  
```
CREATE DATABASE list_app;

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

```

*同一の課題を検証してもらう前提のため以下のリポジトリとテーブル定義を共有しています。

https://github.com/jin35314031/Subject-todolist

本リポジトリのプログラムではdoneDate,firstTimeカラムは使用していません。


#### 事前準備
- node.js / npm インストール 
- スキーマを作成


#### 実行手順

- git clone https://github.com/takano08/todo-list.git
- cd todo-list
- npm install
- node app.js

APP起動後 [localhost:3000にアクセス](http://localhost:3000/)