
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { NextPage } from 'next'
import { BaseHeader } from '../components/layouts/BaseHeader'

const IndexPage: NextPage = () => {
  const { isMd } = useMediaQuery()

  return (
    <div>
      {isMd ? (
        <BaseHeader />
      ) : ''}

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