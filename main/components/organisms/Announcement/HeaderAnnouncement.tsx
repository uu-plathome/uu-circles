import { __ } from "@/lang/ja"
import { isHigh } from "@/lib/enum/api/Importance"
import { Announcement } from "@/lib/types/model/Announcement"
import { FC } from "react"

type Props = {
  announcement: Announcement
}
const HeaderAnnouncement: FC<Props> = ({
  announcement
}) => {
  return (
    <div className="border-blue-300 border-4 py-2">
      <p className="text-center text-xs">
        -{__(announcement.announcementType, 'AnnouncementType')}-
      </p>

      <p className={`
        text-center
        ${isHigh(announcement.importance) ? 'text-base' : 'text-sm'}
      `}>
        {announcement.title}
      </p>

      {announcement.link ? (
        <a href={announcement.link} className="text-blue-600 underline text-sm">
          詳しく見る
        </a>
      ) : ''}
    </div>
  )
}

export { HeaderAnnouncement }
