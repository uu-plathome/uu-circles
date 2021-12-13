import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import YouTube, { Options } from 'react-youtube'
import { YouTubePlayer } from 'youtube-player/dist/types'
import { Props as BaseFooterProps } from '@/src/components/layouts/BaseFooter'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { LocalStorageKey } from '@/src/lib/enum/app/LocalStorageKey'
import { drawGacha } from '@/src/lib/infra/api/gacha'

const BaseFooter = dynamic<BaseFooterProps>(() =>
  import('@/src/components/layouts/BaseFooter').then((mod) => mod.BaseFooter)
)

const opts: Options = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    // autoplay: 1,
    mute: 1,
    controls: 0,
    modestbranding: 1,
    playsinline: 1,
    rel: 0,
    showinfo: 0,
  },
}

const Page: NextPage = () => {
  const router = useRouter()

  const redirect = async () => {
    const identifierHash = localStorage.getItem(LocalStorageKey.identifierHash) || undefined

    const data = await drawGacha({
      identifierHash,
      num: 5,
    })

    await router.push(`/gacha/result/${data.gachaHash}`)
  }

  const onPlayerReady = (event: {
    target: YouTubePlayer
  }) => {
    event.target.mute()
    event.target.playVideo()
  }

  return (
    <div>
      <BaseHead title="サークルガチャ" />

      <BaseLayout>
        <div className="px-2 pb-36 bg-gray-100">
          <BaseContainer>
            <div className="px-4">
              <div className="flex justify-center items-center pt-6">
                <Image
                  src="/images/gacha-logo.png"
                  width="360"
                  height="120"
                  alt="サークルガチャへようこそ！"
                />
              </div>

              <div className="flex justify-center py-8">
                <div
                  className="overflow-hidden relative mb-12 w-full h-0"
                  style={{ paddingBottom: '56.25%' }}
                >
                  <YouTube
                    className="absolute top-0 left-0 w-full h-full"
                    videoId="bMYQ8JhCpwg"
                    onReady={onPlayerReady}
                    opts={opts}
                    onEnd={redirect}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <a
                  onClick={redirect}
                  className="text-right text-blue-600 underline cursor-pointer"
                >
                  動画が再生されない場合はこちらをクリック
                </a>
              </div>
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
