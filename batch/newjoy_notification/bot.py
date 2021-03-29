import discord
from discord.ext import tasks, commands
import settings
from datetime import datetime, timedelta, timezone
import requests
import json
import io
import sys

###SET_ENVIRONMENT_VALUES###
TOKEN = settings.TOKEN
CHANNEL_ID = int(settings.CHANNEL_ID)
API_URL = settings.API_URL

###TEST_CHANNEL_ID###
# CHANNEL_ID = int(settings.TEST_CHANNEL_ID)

###GET_API_INFORMATION###
payload = {'key': 'value'}
r = requests.get(API_URL, params=payload).json()

###MAKE_BOT###
# 接続に必要なオブジェクトを生成
client = discord.Client()

###TO_GET_JST_TIME_FUNC###
#SEE THIS(https://qiita.com/b2bmakers/items/34ba70510e35d2c12e94)
JST = timezone(timedelta(hours=+9), 'JST')
def to_jst(time):
	time = time.replace(tzinfo=timezone.utc)
	time = time.astimezone(JST)
	time = time.replace(tzinfo=None)
	return time

###GET_TIME###
day = datetime.now(JST)
now = day.strftime('%Y.%m.%d')

###SET_LOOP###
#ループ処理
@client.event
async def on_ready():
	channel = client.get_channel(CHANNEL_ID)
	#アナウンス
	text = []
	if (len(r['todayCircleNewJoys']) == 0):
		await channel.send('***:crescent_moon:今日の新歓はありません***')
		sys.exit()
	else:
		await channel.send('***☀️今日の新歓 '+now+'***')
		for idx, newjoy in enumerate(r['todayCircleNewJoys']):
			await channel.send('\n---------------------------\n')

			#新歓の開始と終了の時刻を取得
			start_day = newjoy['circleNewJoy']['startDate']
			end_day = newjoy['circleNewJoy']['endDate']
			if (start_day is not None):
				tmp_format_startDay = datetime.strptime(start_day, '%Y-%m-%dT%H:%M:%S.%fZ')
				format_startDay=to_jst(tmp_format_startDay)
			if (end_day is not None):
				tmp_format_endDay = datetime.strptime(end_day, '%Y-%m-%dT%H:%M:%S.%fZ')
				format_endDay = to_jst(tmp_format_endDay)

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
			if idx + 1 == len(r['todayCircleNewJoys']):
				sys.exit()
	
client.run(TOKEN)
