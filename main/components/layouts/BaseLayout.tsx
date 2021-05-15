import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Announcement } from '@/lib/types/model/Announcement'
import { FC, useEffect, useState } from 'react'
import { HeaderAnnouncement } from '../organisms/Announcement/HeaderAnnouncement'
import { BaseHeader } from './BaseHeader'
import { BaseSpMenu } from './BaseSpMenu'

type Props = {
  announcement?: Announcement
}
const BaseLayout: FC<Props> = ({ children, announcement }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const { isMd } = useMediaQuery()

  useEffect(() => {
    if (isMd) {
      setMenuIsOpen(false)
    }
  })

  return (
    <div>
      {/*  ヘッダー */}
      <BaseHeader onClick={() => setMenuIsOpen(!menuIsOpen)} />

      {/* お知らせ */}
      {announcement ? <HeaderAnnouncement announcement={announcement} /> : ''}

      {!menuIsOpen ? (
        <div>{children}</div>
      ) : (
        <div className="md:hidden">
          <BaseSpMenu />
        </div>
      )}
    </div>
  )
}

export { BaseLayout }
