import { FC } from 'react'
import { __ } from '@/src/lang/ja'
import { AnnouncementType } from '@/src/lib/enum/api/AnnouncementType'
import { isHigh } from '@/src/lib/enum/api/Importance'
import { Announcement } from '@/src/lib/types/model/Announcement'

type Props = {
  announcement: Announcement
}
const HeaderAnnouncement: FC<Props> = ({ announcement }) => {
  return (
    <div className="py-2 px-4 bg-white border-4 border-blue-300">
      <div className="mx-auto max-w-3xl">
        <p className="mb-1 text-xs text-center">
          -{__(announcement.announcementType, AnnouncementType._type)}-
        </p>

        <p
          className={`
          text-center
          ${
            isHigh(announcement.importance)
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
              className="text-xs text-blue-600 underline"
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
