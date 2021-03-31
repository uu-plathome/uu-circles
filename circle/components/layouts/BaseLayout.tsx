import { useMediaQuery } from '@/hooks/useMediaQuery'
import { User } from '@/lib/types/model/User'
import { FC, useEffect, useState } from 'react'
import { BaseHeader } from './BaseHeader'
import { BaseSpMenu } from './BaseSpMenu'

type Props = {
  user: User
}
const BaseLayout: FC<Props> = ({ children, user }) => {
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
      <BaseHeader user={user} onClick={() => setMenuIsOpen(!menuIsOpen)} />

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
