from datetime import datetime, timedelta, timezone
from create_text import to_jst, get_now, is_time_overlap

###STRUCT_OF_CircleNewJoy###
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
    startDate: str
    endDate: str
    createdAt: str
    updatedAt: str

###CONSTRUCTOR###
    def __init__(self, arr : dict):
        self.circleNewJoyId = arr['id']
        self.circleId = arr['circleId']
        self.title = arr ['title']
        self.description = arr['description']
        self.url = arr['url']
        self.release = arr['release']
        self.placeOfActivity = arr['placeOfActivity']
        self.placeOfActivityDetail = arr['placeOfActivityDetail']
        self.publishFrom = arr['publishFrom']
        self.startDate = arr['startDate']
        self.endDate = arr['endDate']
        self.createdAt = arr['createdAt']
        self.updatedAt = arr['updatedAt']
        self.privateNewjoyLink = arr['privateNewjoyLink']

###TO_GET_START_TIME###
    def format_startDay(self) -> str:
        if (self.startDate is None):
            return ''
        tmp_format_startDay = datetime.strptime(self.startDate, '%Y-%m-%dT%H:%M:%S.%fZ')
        format_startDay=to_jst(tmp_format_startDay)
        return format_startDay

###TO_GET_END_TIME###
###if endDate is none, then return ,"next day am6:59"
    def format_endDay(self) -> str:
        if (self.endDate is None):
            tmp_day = datetime.now()
            tmp_format_endDay = to_jst(tmp_day.now() + timedelta(days=1))
            format_endDay = tmp_format_endDay.replace(hour=6, minute=59, second=0)
            return format_endDay
        tmp_format_endDay = datetime.strptime(self.endDate, '%Y-%m-%dT%H:%M:%S.%fZ')
        format_endDay = to_jst(tmp_format_endDay)
        return format_endDay


