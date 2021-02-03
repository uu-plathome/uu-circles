
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseSidebar } from '@/components/layouts/BaseSidebar'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { AuthContext } from '@/contexts/AuthContext'
import { NextPage } from 'next'
import { useContext } from 'react'
import { BaseHeader } from '../components/layouts/BaseHeader'

const IndexPage: NextPage = () => {
  const authContext = useContext(AuthContext)

  return (
    <div>
      <BaseHeader />

      <BaseContainer>
        <BaseWrapper
          title="管理画面へようこそ"
        >
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default IndexPage