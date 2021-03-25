# Operation

## API のログをダウンロード

```shell
# API 本番
$ scp u-lab:~/uu-circles.com/public_html/api/current/storage/logs/laravel.log laravel_`date +%Y%m%d_%H-%M-%S`.log

# API STG
$ scp u-lab:~/uu-circles.com/public_html/api/current/storage/logs/laravel.log laravel_`date +%Y%m%d_%H-%M-%S`.log

# .envのダウンロード
$ scp u-lab:~/uu-circles.com/public_html/api/current/.env .env.production
```

##

```shell
# API STG
$ ln -nfs ~/uu-circles.com/work/api-stg/current ~/uu-circles.com/public_html/api-stg/current
```
