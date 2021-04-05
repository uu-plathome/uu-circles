###TO_GET_JST_TIME_FUNC###
#SEE THIS(https://qiita.com/b2bmakers/items/34ba70510e35d2c12e94)
JST = timezone(timedelta(hours=+9), 'JST')
def to_jst(time):
    time = time.replace(tzinfo=timezone.utc)
    time = time.astimezone(JST)
    time = time.replace(tzinfo=None)
    return time

class CircleNewJoy:
    circleNewJoyId: int
    circleId: int
    title: str
    description: str
    url: str
    privateNewjoyLink : str
    release: bool
    placeOfActivity: str
    placeOfActivityDetail: str
    publishFrom: str
    publishTo: str
    startDate: str
    endDate: str
    createdAt: str
    updatedAt: str

    @staticmethod
    def of(arr : dict) -> CircleNewJoy:
        newCircleNewJoy = CircleNewJoy()
        newCircleNewJoy.circleNewJoyId = arr['id']
        newCircleNewJoy.circleId = arr['circleId']
        newCircleNewJoy.title = arr ['title']
        newCircleNewJoy.description = arr['description']
        newCircleNewJoy.url = arr['url']
        newCircleNewJoy.release = arr['release']
        newCircleNewJoy.placeOfActivity = arr['placeOfActivity']
        newCircleNewJoy.placeOfActivityDetail = arr['placeOfActivityDetail']
        newCircleNewJoy.publishFrom = arr['publishFrom']
        newCircleNewJoy.publishTo = arr['publishTo']
        newCircleNewJoy.startDate = arr['startDate']
        newCircleNewJoy.endDate = arr['endDate']
        newCircleNewJoy.createdAt = arr['createdAt']
        newCircleNewJoy.updatedAt = arr['updatedAt']
        newCircleNewJoy.privateNewjoyLink = arr['privateNewjoyLink']
        return newCircleNewJoy

    def format_startDay(self) -> str:
        if (self.startDate is None):
            return ''
        tmp_format_startDay = datetime.strptime(self.startDate, '%Y-%m-%dT%H:%M:%S.%fZ')
        format_startDay=to_jst(tmp_format_startDay)
        return format_startDay




class TodayCircleNewJoy:
    slug: str
    circleType: str
    mainImageUrl: str
    name: str
    shortName: str
    circleNewJoy: CircleNewJoy

    ###Constracta####
    @staticmethod
    def of(arr: dict) -> TodayCircleNewJoy:
        newTodayCircleNewJoy = TodayCircleNewJoy()
        newTodayCircleNewJoy.slug = arr['slug']
        newTodayCircleNewJoy.circleType = arr['circleType']
        newTodayCircleNewJoy.mainImageUrl = arr['mainImageUrl']
        newTodayCircleNewJoy.name = arr['name']
        newTodayCircleNewJoy.shortName = arr['shortName']
        newTodayCircleNewJoy.circleNewJoy = CircleNewJoy.of(arr['circleNewJoy'])
        return newTodayCircleNewJoy

        ###MAKE_TEXT###
    def make_text(r):
        message = []
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
                text += '👀 サークルを見る:** https://uu-circles.com/circle/'+newjoy['slug']+'**\n\n'
            print(len(r['todayCircleNewJoys']))
            if (int(len(r['todayCircleNewJoys']) <= 10)):
                text += '📌 新歓ルーム:**'+str(idx + 1)+'**\n\n'
            message.append(text)
            text = '\n---------------------------\n'
        return message


