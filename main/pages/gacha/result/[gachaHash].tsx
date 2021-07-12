import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { PageNotFoundError } from '@/infra/api/error'
import { resultGacha } from '@/infra/api/gacha'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Error from 'next/error'
import Image from 'next/image'

type Props = {
  count?: number
  createdAt?: string
  gachaHash?: string
  pickupCircles?: {
    handbillImageUrl: string
    name: string
    slug: string
  }[]
  resultCircles?: {
    handbillImageUrl: string
    name: string
    slug: string
  }[]
  errorCode?: number
}
const Page: NextPage<Props> = ({
  errorCode
}) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <div>
      <BaseHead title="サークルガチャ結果" />

      <BaseLayout>
        <div className="bg-gray-100 px-2 pb-36">
          <BaseContainer>
            <div className="flex justify-center items-center pt-6">
              <Image src="/images/gacha-logo.png" width="360" height="120" />
            </div>
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}



export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params.slug || Array.isArray(params.gachaHash)) {
    return {
      notFound: true,
    }
  }

  try {
    const res = await resultGacha({
      gachaHash: params.gachaHash
    })

    return {
      props: res,
      revalidate: 60 * 60 * 24,
    }
  } catch (e) {
    if (e instanceof PageNotFoundError) {
      return {
        notFound: true,
      }
    }

    return { props: { errorCode: 500 } }
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export default Page
