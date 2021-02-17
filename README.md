# サークルビラ一覧

## Description

### API

- Laravel 8 / PHP 7.4

※ Laravel8 にあげたい

### Main

- Next.js v9.5 / Node.js v14 or v15

※ 基本的には、Node v14 で良い。ただし、M1 Mac だと Node v15 じゃないとうごかない。

### Admin

- Next.js v9.5 / Node.js v14 or v15

※ 基本的には、Node v14 で良い。ただし、M1 Mac だと Node v15 じゃないとうごかない。

## 起動

```shell
# API
$ docker-compose up -d

# APIはじめて
$ docker-compose build

$ docker-compose up -d

$ docker-compose exec app php -r "file_exists('.env') || copy('.env.example', '.env');"

$ docker-compose exec app composer install

$ docker-comopse exec app php artisan key:generate

$ docker-compose exec app php artisan storage:link

$ docker-compose exec app chmod -R 777 storage

$ docker-compose exec app chmod -R 777 bootstrap/cache

$ docker-compose exec app php artisan config:cache


# Admin
$ cd admin & npm i
$ cd admin & npm run dev

# Main
$ cd main & npm i
$ cd main & npm run dev
```

## 管理者ログイン

ー ユーザー名: tester
- パスワード： Test1234@@

# Deploy api For Production

```shell
$ git push main:develop/production -f
```

# Deploy For Apache

Apache にデプロイする時の.htaccess の例

```shell
$ mv ./server/.htaccess .htaccess
```
