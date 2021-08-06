import { __ } from '@/src/lang/ja'
import { AnnouncementType } from '@/src/lib/enum/api/AnnouncementType'
import { isHigh } from '@/src/lib/enum/api/Importance'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { FC } from 'react'

type Props = {
  announcement: Announcement
}
const HeaderAnnouncement: FC<Props> = ({ announcement }) => {
  return (
    <div className="border-blue-300 border-4 py-2 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-xs mb-1">
          -{__(announcement.announcementType, AnnouncementType._type)}-
        </p>

        <p
          className={`
          text-center
          ${isHigh(announcement.importance)
              ? 'text-base md:text-lg'
              : 'text-sm md:text-base'
            }
        `}
        >
          {announcement.title}
        </p>

        {announcement.link ? (
          <p className="text-right md:text-center">
            <a
              href={announcement.link}
              className="text-blue-600 underline text-xs"
            >
              詳しく見る
            </a>
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export { HeaderAnnouncement }
