import discord
from discord.ext import tasks, commands
import settings
from datetime import datetime, timedelta, timezone
import requests
import json
import io
from create_text import get_now, to_jst, is_time_overlap
from domain import todayCircleNewJoy as domain

###SET_ENVIRONMENT_VALUES###
TOKEN = settings.TOKEN
CHANNEL_ID = int(settings.CHANNEL_ID)
BOT_API_URL = settings.BOT_API_URL
# TEST_BOT_API_URL = settings.TEST_BOT_API_URL

###TEST_CHANNEL_ID###
# CHANNEL_ID = int(settings.TEST_CHANNEL_ID)

###GET_API_INFORMATION###
payload = {'key': 'value'}
r = requests.get(BOT_API_URL, params=payload).json()

##TEST_API_INFORMATION###
# r = requests.get(TEST_BOT_API_URL, params=payload).json()

###MAKE_BOT###
# 接続に必要なオブジェクトを生成
client = discord.Client()

###MAKE_todayCircleNewJoys_Objects###
todayCircleNewJoys = list(
    map(lambda newjoy: domain.TodayCircleNewJoy(newjoy), r['todayCircleNewJoys']))

###SORT_LIST###
time_arr = []
time_arr = sorted(todayCircleNewJoys, key=lambda x: x.circleNewJoy.startDate)
###could check it's sorted###
print(list(map(lambda x: x.circleNewJoy.startDate, time_arr)))

###MAKE_TIME_DICT###
# time_dict = {}
#key = hour * 60 + min
# start_hour * 60(min), end_hour * 60(min), interval = 30(min)
# for dict_key in range(7 * 60, 32 * 60,30):
#     time_dict[dict_key] = []

# for newjoy in todayCircleNewJoys:
#     print(newjoy.circleNewJoy.occupancyStartTime(), newjoy.circleNewJoy.occupancyEndTime())
#     duration = abs(newjoy.circleNewJoy.occupancyStartTime() - newjoy.circleNewJoy.occupancyEndTime())
#     print(duration.seconds)
#     room_count = duration.seconds / (30 * 60)
#     print(room_count)
#     for dict_key in range(0, int(room_count)):
#         time_dict[dict_key * 30 + newjoy.circleNewJoy.occupancyStartTime().hour * 60 + newjoy.circleNewJoy.occupancyStartTime().minute].append(newjoy.circleNewJoy.circleNewJoyId)

# print(time_dict)

# ###SET_LOOP###
# # ループ処理


@client.event
async def on_ready():
    channel = client.get_channel(CHANNEL_ID)
    # アナウンス
    if (len(r['todayCircleNewJoys']) == 0):
        # await channel.send('***:crescent_moon:今日の新歓はありません***')
        exit()
    else:
        now = get_now()
        await channel.send('***☀️今日の新歓 '+now+'***')
        for idx, newjoy in enumerate(time_arr):
            message = newjoy.make_text(idx)
            await channel.send(message)
        exit()

client.run(TOKEN)

###TEST_CODES###

# room_arr = []
# room_resist_arr = []

# time_arr = []
# todayCircleNewJoys = list(map(lambda newjoy: domain.TodayCircleNewJoy(newjoy), r['todayCircleNewJoys']))
# time_arr = sorted(todayCircleNewJoys, key=lambda x:x.circleNewJoy.startDate)

# ###could check it's sorted###
# print(list(map(lambda x: x.circleNewJoy.startDate, time_arr)))

# for n, i in enumerate(time_arr):
#     i.idx =n
#     print(i.idx,i.name, i.circleNewJoy.format_startDay())
