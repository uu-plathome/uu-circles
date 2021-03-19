# BOTについて

### 動作環境

**Python**

* Python 3.8.5
* pip 20.1.1

**モジュール**

* discord 1.0.1 (bot用モジュール)
* discord.py 1.6.0 (bot用モジュール)
* python-dotenv 0.15.0 (.env用モジュール)
* requests 2.25.1 (webAPI用モジュール)

**ターミナル**

* PowerShell 5.1.19041.610


### ディレクトリ構成

* settings.pyが.envファイルから環境変数を読み出し、変数に格納する。
* bot.pyがbotの本体コード。トークンやチャンネルナンバーはsettings.pyをimportすることで取得。
* requirements.txtはpipでインストールするモジュールを指定している。

```md
batch
└──newjoy_notification
   ├──bot.py
   ├──settings.py
   ├──requirements.txt
   └──.env.example
```

### bot起動手順

0. もしモジュールを仮想環境(パッケージの導入状態をプロジェクトごとに独立させる環境)下で管理したい場合は以下のコマンドを```uu-circle\batch\newjoy_notification```ディレクトリで実行。(今回はvenvを使用)

```python
$ python -m venv <new venv name>
$ <new venv name>\Scripts\Activate.ps1
```

※ ```<new venv name>```は任意で指定。

1.モジュールの準備。以下のコマンドをvenvファイルと同じディレクトリで実行

```python
$ pip install -r requirements.txt
```

2.botの起動。botが環境変数で設定したチャンネルにいることを確認し、以下のコマンドをbot.pyと同じ階層下で実行。

```
$ python .\bot.py
```
