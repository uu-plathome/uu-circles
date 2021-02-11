# uu-circle

## Description

## Installation

``` shell
$ make init
```

## 起動

``` shell
# API
$ docker-compose up -d

# APIはじめて
$ docker-compose build

$ docker-compose up -d

$ docker-compose exec app php -r "file_exists('.env') || copy('.env.example', '.env');"

$ docker-compose exec app composer install

$ docker-comopse exec app php artisan key:generate

$ docker-compose exec app php artisan config:cache


# Admin
$ cd admin & npm i
$ cd admin & npm run dev

# Main
$ cd main & npm i
$ cd main & npm run dev
```
