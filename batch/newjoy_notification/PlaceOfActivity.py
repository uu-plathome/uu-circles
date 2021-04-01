from enum import Enum


class PlaceOfActivity(Enum):
    NEWJOY_DISCORD = 'NEWJOY_DISCORD'
    DISCORD = 'DISCORD'
    MINE = 'MINE'
    YOTO = 'YOTO'
    ZOOM = 'ZOOM'
    OTHER = 'OTHER'


class PlaceOfActivityTrans(Enum):
    NEWJOY_DISCORD = '新歓ディスコード'
    DISCORD = 'ディスコード'
    MINE = '峰キャンパス'
    YOTO = '陽東キャンパス'
    ZOOM = 'Zoom'
    OTHER = 'その他'


def placeOfActivityTrans(key: str) -> str:
    if key is PlaceOfActivityTrans.NEWJOY_DISCORD.name:
        return PlaceOfActivityTrans.NEWJOY_DISCORD.value

    if key is PlaceOfActivityTrans.DISCORD.name:
        return PlaceOfActivityTrans.DISCORD.value

    if key is PlaceOfActivityTrans.MINE.name:
        return PlaceOfActivityTrans.MINE.value

    if key is PlaceOfActivityTrans.YOTO.name:
        return PlaceOfActivityTrans.YOTO.value

    if key is PlaceOfActivityTrans.ZOOM.name:
        return PlaceOfActivityTrans.ZOOM.value

    if key is PlaceOfActivityTrans.OTHER.name:
        return PlaceOfActivityTrans.OTHER.value

    return key
