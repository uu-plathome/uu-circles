# 開発に関して

## 技術スタック

### API

- Laravel 8
- PHP 7.4
- MySQL

### Main

- Next.js v9.5
- Node.js v14 or v15

※ 基本的には、Node v14 で良い。ただし、M1 Mac だと Node v15 じゃないとうごかない。

### Admin

- Next.js v9.5
- Node.js v14 or v15

※ 基本的には、Node v14 で良い。ただし、M1 Mac だと Node v15 じゃないとうごかない。

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

### 2.Admin のセットアップ

```shell
$ cd admin

$ npm install

$ npm run dev
```

### 3.Main のセットアップ

```shell
$ cd main

$ npm install

$ npm run dev
```

## 途中から始める時

```shell
# APIの起動
$ docker-compose up -d

# Adminの起動
$ cd admin

$ npm run dev

# Mainの起動
$ cd main

$ npm run dev
```

## Main ブランチを取り込んだ時

```shell
# APIの起動
$ docker-compose exec app composer install

$ docker-compose exec app php artisan migrate:fresh --seed

$ docker-compose up -d

# Adminの起動
$ cd admin

$ npm install

$ npm run dev

# Mainの起動
$ cd main

$ npm install

$ npm run dev
```

## 開発

### 管理者ログイン

- ユーザー名: tester
- パスワード： Test1234@@

### API のテスト

```shell
# テスト
$ docker-compose app composer test

# コード整形
$ docker-compose app composer sniffer
```

## Deploy

`git push origin main:develop/production`

### Main

`develop/production` に push すると反映されます

### Admin

`develop/production` に push すると反映されます

### Api

`develop/production` に push すると反映されます
