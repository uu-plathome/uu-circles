import discord
from discord.ext import tasks, commands
import settings
from datetime import datetime, timedelta, timezone
import requests
from datetime import datetime, timedelta
from urllib.parse import unquote

###SET_ENVIRONMENT_VALUES###
TOKEN = settings.TOKEN
CHANNEL_ID = int(settings.CHANNEL_ID)
API_URL = settings.API_URL
TEST_API_URL = settings.TEST_API_URL

##TEST_CHANNEL_ID###
CHANNEL_ID = int(settings.TEST_CHANNEL_ID)

###MAKE_BOT###
# 接続に必要なオブジェクトを生成
client = discord.Client()

###GET_DATE_TIME_AND_URL###
now = datetime.now().replace(hour=18, minute=0, second=0, microsecond=0)
before_isoformat = (now - timedelta(days=1)).isoformat()
now_isoformat = now.isoformat()
YELL_API_URL = API_URL + before_isoformat + '&before=' + now_isoformat

# ###TEST_API_URL###
# YELL_API_URL = TEST_API_URL

###GET_API_INFORMATION###
payload = {'key': 'value'}
r = requests.get(YELL_API_URL, params=payload).json()

for i in r:
    print(i['title']['rendered'])

###SET_LOOP###
# ループ処理
@client.event
async def on_ready():
    channel = client.get_channel(CHANNEL_ID)
    # アナウンス
    if (len(r) == 0):
        await channel.send('**:sleeping: 今日の投稿はありません**')
        exit()
    else:
        await channel.send('**:pen_fountain: 今日の投稿 **')
        for idx, post in enumerate(r):
            text = '\n---------------------------\n'
            text += '**:name_badge: タイトル**\n**' + post['title']['rendered'] + '**\n'
            text += '\n**:earth_asia: 詳しく見る**\n' + unquote(post['link']) + ''
            await channel.send(text)
        exit()
client.run(TOKEN)
