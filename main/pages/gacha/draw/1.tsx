import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { drawGacha } from '@/infra/api/gacha'
import { LocalStorageKey } from '@/lib/enum/app/LocalStorageKey'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import YouTube, { Options } from 'react-youtube'

const opts: Options = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    mute: 1,
  },
}

const Page: NextPage = () => {
  const router = useRouter()

  const redirect = async () => {
    const identifierHash = localStorage.getItem(LocalStorageKey.identifierHash)

    const { gachaHash } = await drawGacha({
      identifierHash,
      num: 1,
    })

    await router.push(`/gacha/result/${gachaHash}`)
  }

  return (
    <div>
      <BaseHead title="サークルガチャ" />

      <BaseLayout>
        <div className="bg-gray-100 px-2 pb-36">
          <BaseContainer>
            <div className="flex justify-center items-center pt-6">
              <Image src="/images/gacha-logo.png" width="360" height="120" />
            </div>

            <div className="py-8 flex justify-center">
              <YouTube videoId="bMYQ8JhCpwg" opts={opts} onEnd={redirect} />
            </div>

            <div className="flex justify-end">
              <a
                onClick={redirect}
                className="underline text-blue-600 text-right cursor-pointer"
              >
                動画が再生されない場合はこちらをクリック
              </a>
            </div>
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default Page
