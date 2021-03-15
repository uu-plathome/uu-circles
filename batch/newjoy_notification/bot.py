import discord
from discord.ext import tasks, commands
import settings
import datetime
import requests
import json

###SET_ENVIRONMENT_VALUES###
TOKEN = settings.TOKEN
CHANNEL_ID = int(settings.CHANNEL_ID)
API_URL = settings.API_URL


###GET_API_INFORMATION###
payload = {'key': 'value'}
r = requests.get(API_URL, params=payload).json()

###MAKE_BOT###
# 接続に必要なオブジェクトを生成
client = discord.Client()

###SET_LOOP###
#ループ処理
@tasks.loop(seconds=60)
async def loop():
	#see(https://teratail.com/questions/273362)
	#loopがbotとdiscordの接続より早く始まっちゃうので一旦待たせる
	await client.wait_until_ready()

	#現在時刻を取得
	now = datetime.datetime.now().strftime('%H:%M')

	#チャンネルの取得とテキストの送信
	# 朝7時の場合の処理
	if now == '22:31':
		channel = client.get_channel(CHANNEL_ID)
		#アナウンス
		text = []
		await channel.send('***今日の新歓 '+datetime.datetime.now().strftime('%Y.%m.%d***'))
		for i, j in enumerate(r['todayCircleNewJoys']):
			#日付を整形
			StartDay = j['circleNewJoy']['startDate'][5:7]+'月'+j['circleNewJoy']['startDate'][8:10]+'日'+j['circleNewJoy']['startDate'][11:16]
			EndDay = j['circleNewJoy']['endDate'][5:7]+'月'+j['circleNewJoy']['endDate'][8:10]+'日'+j['circleNewJoy']['endDate'][11:16]
			#送信するテキストの整形
			text = '***'+str(i+1)+'***,  サークル名: ***'+j['name']+'***\n'
			text +='日にち: ***'+StartDay+' ~ '+EndDay+'***\n'
			text += '場所: ***'+j['circleNewJoy']['placeOfActivity']+'***\n'
			text += 'ひとこと: ***'+j['circleNewJoy']['description']+'***\n'
			if (j['circleNewJoy']['url'] is not None):
				text += '新歓URL: '+str(j['circleNewJoy']['url'])+'\n'
			text += 'サークルを見る: *** https://uu-circles.com/circle/'+j['slug']+'***\n\n'
			await channel.send(text+'\n\n')


loop.start()
client.run(TOKEN)
