import { FC, useEffect, useState } from 'react'
import { BaseHeader } from './BaseHeader'
import { BaseSpMenu } from './BaseSpMenu'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { User } from '@/src/lib/types/model/User'

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
