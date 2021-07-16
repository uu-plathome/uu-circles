import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { drawGacha } from '@/infra/api/gacha'
import { GachaMovieId } from '@/lib/enum/app/GachaMovieId'
import { LocalStorageKey } from '@/lib/enum/app/LocalStorageKey'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
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
  const [gachaHash, setGachaHash] = useState(null)

  useEffect(() => {
    const f = async () => {
      const identifierHash = localStorage.getItem(
        LocalStorageKey.identifierHash
      )

      const { gachaHash } = await drawGacha({
        identifierHash,
        num: 10,
      })

      setGachaHash(gachaHash)
    }
    f()
  }, [])

  const redirect = async () => {
    await router.push(``)
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
              <div
                className="w-full relative h-0 overflow-hidden mb-12"
                style={{ paddingBottom: '56.25%' }}
              >
                {gachaHash ? (
                  <YouTube
                    className="w-full h-full absolute top-0 left-0"
                    videoId={GachaMovieId.A}
                    opts={opts}
                    onEnd={redirect}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>

            <div className="flex justify-end">
              {gachaHash ? (
                <Link
                  href="/gacha/result/[gachaHash]"
                  as={`/gacha/result/${gachaHash}`}
                >
                  <a className="underline text-blue-600 text-right cursor-pointer">
                    動画が再生されない場合はこちらをクリック
                  </a>
                </Link>
              ) : (
                ''
              )}
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
