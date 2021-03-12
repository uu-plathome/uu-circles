import discord
from discord.ext import tasks, commands
import settings
import datetime

TOKEN = settings.TOKEN
CHANNEL_ID = int(settings.CHANNEL_ID)

# 接続に必要なオブジェクトを生成
client = discord.Client()

#ループ処理
@tasks.loop(seconds=60)
async def loop():
	#see(https://teratail.com/questions/273362)
	#loopがbotとdiscordの接続より早く始まっちゃうので一旦待たせる
	await client.wait_until_ready()

	#現在時刻を取得
	# now = datetime.datetime.now().strftime('%H:%M')

	#チャンネルの取得とテキストの送信
	channel = client.get_channel(CHANNEL_ID)
	await channel.send('hello')

	# 朝7時の場合の処理
	# if now = '07:00':
	# 	channel = client.get_channel(CHANNEL_ID)
	# 	await channel.send('AM 7:00')

loop.start()
client.run(TOKEN)