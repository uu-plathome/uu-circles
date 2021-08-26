import { FC, useEffect, useState } from 'react'
import { MainHeader } from './MainHeader'
import { MainSpMenu } from './MainSpMenu'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const MainLayout: FC = ({ children }) => {
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
      <MainHeader onClick={() => setMenuIsOpen(!menuIsOpen)} />

      {!menuIsOpen ? (
        <div>{children}</div>
      ) : (
        <div className="md:hidden">
          <MainSpMenu />
        </div>
      )}
    </div>
  )
}

export { MainLayout }
