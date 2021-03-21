import discord
from discord.ext import tasks, commands
import settings
import datetime
import requests
import json
import io
from PIL import Image
import matplotlib.pyplot as plt


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

###GET_TIME###
day = datetime.datetime.now()
now = day.strftime('%Y.%m.%d')



###SET_LOOP###
#ループ処理
@client.event
async def on_ready():
	channel = client.get_channel(CHANNEL_ID)
	#アナウンス
	text = []
	if (len(r['futureCircleNewJoys']) == 0):
		await channel.send('***:crescent_moon:今日の新歓はありません***')
	else:
		await channel.send('***☀️今日の新歓 '+now+'***')
		for idx, newjoy in enumerate(r['futureCircleNewJoys']):
			await channel.send('\n---------------------------\n')

			#新歓の開始と終了の時刻を取得
			start_day=newjoy['circleNewJoy']['startDate']
			end_day = newjoy['circleNewJoy']['endDate']
			if (start_day is not None):
				format_startDay = datetime.datetime.strptime(start_day, '%Y-%m-%dT%H:%M:%S.%fZ')
			if (end_day is not None):
				format_endDay = datetime.datetime.strptime(end_day, '%Y-%m-%dT%H:%M:%S.%fZ')

			#送信するテキストの整形
			text = '***'+str(idx+1)+',***\n:ballot_box_with_check: '+newjoy['name']+'\n'

			if (newjoy['circleNewJoy']['title'] is not None):
				text += '📛新歓名: ***'+newjoy['circleNewJoy']['title']+'***\n'

			if (format_startDay is not None and format_endDay is not None):
				text +='🗓日にち: ***'+str(format_startDay)+' ~ '+str(format_endDay)+'***\n'

			if (newjoy['circleNewJoy']['placeOfActivity'] is not None):
				text += '🧭場所: ***'+newjoy['circleNewJoy']['placeOfActivity']+'***\n'

			if (newjoy['circleNewJoy']['description'] is not None):
				text += '📣ひとこと: ***'+newjoy['circleNewJoy']['description']+'***\n'

			if (newjoy['circleNewJoy']['url'] is not None):
				text += '💻新歓URL: '+str(newjoy['circleNewJoy']['url'])+'\n'

			if (newjoy['slug'] is not None):
				text += '👀サークルを見る: ** https://uu-circles.com/circle/'+newjoy['slug']+'**\n\n'
			await channel.send(text)
	
client.run(TOKEN)
