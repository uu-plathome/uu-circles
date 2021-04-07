from domain import circleNewJoy

class TodayCircleNewJoy:
    slug: str
    circleType: str
    mainImageUrl: str
    name: str
    shortName: str
    circleNewJoy: circleNewJoy.CircleNewJoy

    ###Constructor###
    #No need to say static. See this(https://docs.python.org/ja/3/reference/datamodel.html#object.__init__)
    def __init__(self, arr:dict):
        self.slug = arr['slug']
        self.circleType = arr['circleType']
        self.mainImageUrl = arr['mainImageUrl']
        self.name = arr['name']
        self.shortName = arr['shortName']
        self.circleNewJoy = circleNewJoy.CircleNewJoy(arr['circleNewJoy'])

    ###MAKE_TEXT###
    @staticmethod
    def make_text(r) -> str:
        text = '\n---------------------------\n'
        for idx, newjoy in enumerate(r['todayCircleNewJoys']):
            #新歓の開始と終了の時刻を取得
            start_day = newjoy['circleNewJoy']['startDate']
            end_day = newjoy['circleNewJoy']['endDate']
            if (start_day is not None):
                tmp_format_startDay = datetime.strptime(start_day, '%Y-%m-%dT%H:%M:%S.%fZ')
                format_startDay=to_jst(tmp_format_startDay)
            if (end_day is not None):
                tmp_format_endDay = datetime.strptime(end_day, '%Y-%m-%dT%H:%M:%S.%fZ')
                format_endDay = to_jst(tmp_format_endDay)
            else:
                tmp_day = datetime.now()
                tmp_format_endDay = to_jst(tmp_day.now() + timedelta(days=1))
                format_endDay = tmp_format_endDay.replace(hour=6, minute=59, second=0)

            #送信するテキストの整形
            text += '***'+str(idx+1)+',***\n:ballot_box_with_check: '+newjoy['name']+'\n\n'

            if (newjoy['circleNewJoy']['title'] is not None):
                text += '📛 新歓名:***'+newjoy['circleNewJoy']['title']+'***\n\n'

            if (start_day is not None and end_day is not None):
                text +='🗓 日にち:***'+str(format_startDay)+' ~ '+str(format_endDay)+'***\n\n'

            if (newjoy['circleNewJoy']['placeOfActivity'] is not None):
                text += '🧭 場所:***'+newjoy['circleNewJoy']['placeOfActivity']+'***\n\n'

            if (newjoy['circleNewJoy']['description'] is not None):
                text += '📣 ひとこと:***'+newjoy['circleNewJoy']['description']+'***\n\n'

            if (newjoy['circleNewJoy']['url'] is not None):
                text += '💻 新歓URL:'+str(newjoy['circleNewJoy']['url'])+'\n\n'

            if (newjoy['slug'] is not None):
                text += '👀 サークルを見る: https://uu-circles.com/circle/'+newjoy['slug']+'\n\n'
            print(len(r['todayCircleNewJoys']))
            if (int(len(r['todayCircleNewJoys']) <= 10)):
                text += '📌 新歓ルーム:**'+str(idx + 1)+'**\n\n'
            text = '\n---------------------------\n'
        return text

