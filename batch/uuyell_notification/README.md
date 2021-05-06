# uu-yell botについて

## uu-yellとは

\\宇大生による//宇大生のためのメディアサイト uu-yell

https://media.uu-circles.com/

## 動作環境

**Python**

- Python 3.8
- pip 20.1

**モジュール**

* [モジュール一覧](./uuyell_notification/requirements.txt)

- discord 1.0.1 (bot 用モジュール)
- discord.py 1.6.0 (bot 用モジュール)
- python-dotenv 0.15.0 (.env 用モジュール)
- requests 2.25.1 (webAPI 用モジュール)
- urllib3(URL文字化け防止用モジュール)

**ターミナル**

* PowerShell 5.1.19041.610

## ディレクトリ構成

- settings.py が.env ファイルから環境変数を読み出し、変数に格納する。
- bot.py が bot の本体コード。トークンやチャンネルナンバーは settings.py を import することで取得。
- requirements.txt は pip でインストールするモジュールを指定している。

```md
batch
└──uuyell_notification
|   ├──yell_bot.py
|   ├──settings.py
|   ├──requirements.txt
|   ├──.env
|   └──.env.example
└──newjoy_notification
```


## bot 起動手順

0.もしモジュールを仮想環境(パッケージの導入状態をプロジェクトごとに独立させる環境)下で管理したい場合は以下のコマンドを`uu-circle\batch\uuyell_notification`ディレクトリで実行。(今回は venv を使用)

```python
$ python -m venv <new venv name>
$ <new venv name>\Scripts\Activate.ps1
```


※ `<new venv name>`は任意で指定。

1.モジュールの準備。以下のコマンドを venv ファイルと同じディレクトリで実行

```shell
$ pip install -r requirements.txt
```


2.bot の起動。bot が環境変数で設定したチャンネルにいることを確認し、以下のコマンドを bot.py と同じ階層下で実行。

```shell
$ python .\yell_bot.py
```
