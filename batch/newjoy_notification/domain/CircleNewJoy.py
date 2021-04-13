from datetime import datetime, timedelta, timezone
from create_text import to_jst, get_now, is_time_overlap


def formatDatetime(original: datetime) -> datetime:
    """
        日付のフォーマット (JST)
    """
    formatDatetime = datetime.strptime(original, '%Y-%m-%dT%H:%M:%S.%fZ')
    formatDatetimeToJst = to_jst(formatDatetime)
    return formatDatetimeToJst


# 新歓
class CircleNewJoy:
    circleNewJoyId: int
    circleId: int
    title: str
    description: str
    url: str
    privateNewjoyLink: str
    release: bool
    placeOfActivity: str
    placeOfActivityDetail: str
    publishFrom: str
    startDate: str
    endDate: str
    createdAt: str
    updatedAt: str

###CONSTRUCTOR###
    def __init__(self, arr: dict):
        self.circleNewJoyId = arr['id']
        self.circleId = arr['circleId']
        self.title = arr['title']
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

    def startDatetime(self) -> datetime:
        """
            新歓開始時間
            7:00 <= startDatetime < endDatetime <= 6:59
        """
        if (self.startDate is None):
            return ''

        return formatDatetime(self.startDate)

    def endDatetime(self) -> datetime:
        """
            新歓終了時間
            7:00 <= startDatetime < endDatetime <= 6:59
        """

        if (self.endDate is None):
            tmp_day = datetime.now()
            tmp_format_endDay = to_jst(tmp_day.now() + timedelta(days=1))
            format_endDay = tmp_format_endDay.replace(
                hour=6, minute=59, second=0)
            return format_endDay

        return formatDatetime(self.endDate)

    def occupancyStartTime(self) -> datetime:
        """
            新歓ルーム占有開始時間
        """
        # 新歓開始時間
        startTime = self.startDatetime()
        # 新歓ルーム占有開始時間
        occupancyStartTime = startTime
        return occupancyStartTime

    def occupancyEndTime() -> datetime:
        """
            新歓ルーム占有終了時間
        """
        # 新歓終了時間
        endTime = self.endDatetime()
        # 新歓ルーム占有終了時間
        occupancyEndTime = endTime + datetime.timedelta(hours=1)
        return occupancyEndTime
