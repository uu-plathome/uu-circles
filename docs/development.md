# 開発に関して

## 技術スタック

### API

-   Laravel 8
-   PHP 7.4
-   MySQL
-   Docker

Windows なら、WSL2 + Docker, Mac なら Docker for Mac 推奨

### Main

-   Next.js v10.0.5
-   Node.js v14 or v15.6.0

※ 基本的には、Node v14 で良い。ただし、M1 Mac だと Node v15.6.0 じゃないとうごかない。

### Circle

-   Next.js v9.5
-   Node.js v14 or v15.6.0

※ 基本的には、Node v14 で良い。ただし、M1 Mac だと Node v15.6.0 じゃないとうごかない。

### Admin

-   Next.js v9.5
-   Node.js v14 or v15.6.0

※ 基本的には、Node v14 で良い。ただし、M1 Mac だと Node v15.6.0 じゃないとうごかない。

## 初期セットアップ手順

### 1.API のセットアップ

```shell
$ docker-compose build

$ docker-compose up -d

$ docker-compose exec app php -r "file_exists('.env') || copy('.env.example', '.env');"

$ docker-compose exec app composer install

$ docker-compose exec app php artisan key:generate

$ docker-compose exec app php artisan storage:link

$ docker-compose exec app chmod -R 777 storage

$ docker-compose exec app chmod -R 777 bootstrap/cache

$ docker-compose exec app php artisan config:cache

$ docker-compose exec app php artisan migrate:fresh --seed
```

### 2.Admin (管理者画面) のセットアップ

```shell
$ cd admin

$ npm install

$ npm run dev
```

### 3.Circle (サークル管理画面) のセットアップ

```shell
$ cd circle

$ npm install

$ npm run dev
```

### 4.Main (メイン画面) のセットアップ

```shell
$ cd main

$ npm install

$ npm run dev
```

## 途中から始める時

```shell
# APIの起動
$ docker-compose up -d

# Admin (管理者画面) の起動
$ cd admin

$ npm run dev

# Circle (サークル管理画面) の起動
$ cd circle

$ npm run dev

# Main (メイン画面) の起動
$ cd main

$ npm run dev
```

## Main ブランチを取り込んだ時

```shell
# APIの起動
$ docker-compose exec app composer install

$ docker-compose exec app php artisan migrate:fresh --seed

$ docker-compose up -d

# Admin (管理者画面) の起動
$ cd admin

$ npm install

$ npm run dev

# Circle (サークル管理画面) の起動
$ cd circle

$ npm install

$ npm run dev

# Main (メイン画面) の起動
$ cd main

$ npm install

$ npm run dev
```

## 開発

### 管理者ログイン

-   ユーザー名: tester
-   パスワード： Test1234@@

### API のテスト

```shell
# テスト
$ docker-compose exec app composer test

# コード整形
$ docker-compose app composer sniffer
```

## 本番環境への Deploy

`git push origin main:develop/production`

### Main (メイン画面)

`develop/production` に push すると反映されます

### Admin (管理者画面)

`develop/production` に push すると反映されます

### Circle (サークル管理画面)

`develop/production` に push すると反映されます

### API

`develop/production` に push すると反映されます

```shell
# APIへの変更のみ取り出し
$ git checkout ブランチ名 -- api
```

## STG への Deploy

`git push origin main:develop/stg`

### Main (メイン画面)

`develop/stg` に push すると反映されます

### Admin (管理者画面)

`develop/stg` に push すると反映されます

### Circle (サークル管理画面)

`develop/stg` に push すると反映されます

### Api

`develop/stg` に push すると反映されます

## Vscode 拡張機能 推奨

### Common

-   Code Spell Check
-   EditorConfig for VS Code
-   Prettier

### Main , Admin, Circle

-   Code Spell Check
-   EditorConfig for VS Code
-   ESLint
-   IntelliSense for CSS class names in HTML
-   Tailwind CSS Intellisense
-   Version Lens

### Api

-   PHP DocBlocker
-   PHP Intelephense
