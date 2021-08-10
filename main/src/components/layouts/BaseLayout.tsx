import { FC, useEffect, useState } from 'react'
import { HeaderAnnouncement } from '../organisms/Announcement/HeaderAnnouncement'
import { BaseHeader } from './BaseHeader'
import { BaseSpMenu } from './BaseSpMenu'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { Announcement } from '@/src/lib/types/model/Announcement'

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
  }, [isMd])

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
