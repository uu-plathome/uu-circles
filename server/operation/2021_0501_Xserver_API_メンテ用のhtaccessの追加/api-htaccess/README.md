# Api htaccess について

`.htaccess` を配置するには、手動配置をする必要がある。

```shell
# uu-circle/server/api-htaccessに移動
$ cd server/api-htaccess

## 本番環境
# scp 本番用のhtaccess配置
$ scp .htaccess u-lab:~/uu-circles.com/public_html/api

# scp メンテナンス用のhtaccess配置
$ scp .htaccess.maintenance u-lab:~/uu-circles.com/public_html/api

## STG環境
# scp 本番用のhtaccess配置
$ scp .htaccess u-lab:~/uu-circles.com/public_html/api-stg

# scp メンテナンス用のhtaccess配置
$ scp .htaccess.maintenance u-lab:~/uu-circles.com/public_html/api-stg
```
