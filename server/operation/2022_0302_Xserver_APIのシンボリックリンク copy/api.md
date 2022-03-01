# シンボリックリンクを貼る

注意点：シンボリックリンクベースでデプロイをするとキャッシュでおかしくなる時がある。
PHP のスクリプトのキャッシュを消すことが推奨。

```shell
# 本番
$ ln -nfs ~/uu-circles.com/work/api/current/uu-circles/api ~/uu-circles.com/public_html/api/current

# STG
$ ln -nfs ~/uu-circles.com/work/api-stg/current/uu-circles/api ~/uu-circles.com/public_html/api-stg/current
```
