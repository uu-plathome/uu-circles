import Image from 'next/image'
import { FC } from 'react'
import { LightBlueButton } from '@/src/components/atoms/button/LightBlueButton'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { useWindowResize } from '@/src/hooks/useWindowResize'
import { ImagePath } from '@/src/lib/enum/app/ImagePath'
import { Advertise } from '@/src/lib/types/model/Advertise'

type Props = {
  advertises: Advertise[]
}
const MainSponsorshipFooter: FC<Props> = ({ advertises }) => {
  const { isMd } = useMediaQuery()
  const { width: windowWidth } = useWindowResize()
  const width = isMd ? 375 : windowWidth
  // w : h = 375 : 218
  const height = (width * 218) / 375

  return (
    <div className="justify-center md:px-6 bg-gray-100">
      <div
        className="md:flex justify-center md:mx-auto"
        style={{ maxWidth: 700 }}
      >
        {advertises && advertises[0] ? (
          <div className="mx-auto md:mr-2 md:ml-0 rounded">
            <a
              href={
                advertises[0].link
                  ? `${process.env.API_URL}/share/advertise/${advertises[0].slug}`
                  : undefined
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={
                  advertises[0].mainImageUrl
                    ? advertises[0].mainImageUrl
                    : ImagePath.ADVERTISE.ADVERTISE_EMPTY_THUMBNAIL
                }
                alt="協賛企業広告"
                width={width || 375}
                height={height}
                objectFit="cover"
              />
            </a>

            <div>
              <p className="text-sm text-center text-black">
                {advertises[0].title}
              </p>
            </div>
          </div>
        ) : (
          ''
        )}

        {advertises && advertises[1] ? (
          <div className="hidden md:block md:ml-2 rounded">
            <a
              href={
                advertises[1].link
                  ? `${process.env.API_URL}/share/advertise/${advertises[1].slug}`
                  : undefined
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={
                  advertises[1].mainImageUrl
                    ? advertises[1].mainImageUrl
                    : ImagePath.ADVERTISE.ADVERTISE_EMPTY_THUMBNAIL
                }
                alt="協賛企業広告"
                width={width || 375}
                height={height}
                objectFit="cover"
              />
            </a>

            <div>
              <p className="text-sm text-center text-black">
                {advertises[1].title}
              </p>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>

      <div className="md:flex justify-center items-center pb-10 mx-auto md:mx-6 text-center">
        <div className="my-8 mx-auto md:mr-10 md:ml-0" style={{ width: 280 }}>
          <h2 className="mb-2 text-lg font-bold">協賛してくださる企業様募集</h2>
          <p className="pb-4 md:pb-0 text-sm">
            当ウェブサイトは宇都宮の多くの企業の方々に支えられて運営することができています。
          </p>
        </div>

        <div className="pb-8 md:pb-0 mx-auto md:mx-0" style={{ width: 280 }}>
          <LightBlueButton
            href="https://forms.gle/1oULcDjiPaknvfvc8"
            target="_blank"
          >
            協賛を考えている企業様へ
          </LightBlueButton>
        </div>
      </div>
    </div>
  )
}

export { MainSponsorshipFooter }
