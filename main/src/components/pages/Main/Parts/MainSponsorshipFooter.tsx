import Image from 'next/image'
import { FC } from 'react'
import { ComputedPagePositionIdNowLength } from '../computedPagePositionIdNowLength'
import { ID_LIST } from '../id_list'
import { LightBlueButton } from '@/src/components/atoms/button/LightBlueButton'
import { Utas } from '@/src/components/atoms/utas/Utas'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'
import { useWindowResize } from '@/src/hooks/useWindowResize'
import { Advertise } from '@/src/lib/types/model/Advertise'

type Props = {
  pagePositionIdNowLength: ComputedPagePositionIdNowLength
  advertises: Advertise[]
}
const MainSponsorshipFooter: FC<Props> = ({
  advertises,
  pagePositionIdNowLength,
}) => {
  const { isMd } = useMediaQuery()
  const { width: windowWidth } = useWindowResize()
  const width = (isMd ? 375 : windowWidth) || 342
  // w : h = 375 : 218
  const height = width ? (width * 218) / 375 : 200
  const pLen = pagePositionIdNowLength

  return (
    <>
      <div className="md:mx-auto" style={{ maxWidth: 700 }}>
        <div className="hidden md:block mb-2">
          {pLen[ID_LIST.SPONSORSHIP_FOOTER] > 0 ? (
            <Utas
              num={
                pLen[ID_LIST.SPONSORSHIP_FOOTER] > 7
                  ? 7
                  : pLen[ID_LIST.SPONSORSHIP_FOOTER]
              }
            />
          ) : (
            <div className="pt-8" />
          )}
        </div>

        <div className="md:flex justify-center">
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
                  src={advertises[0].mainImageUrl}
                  alt="協賛企業広告"
                  width={width || 375}
                  height={height}
                  objectFit="cover"
                />
              </a>

              <p className="text-sm text-center text-black">
                {advertises[0].title}
              </p>
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
                  src={advertises[1].mainImageUrl}
                  alt="協賛企業広告"
                  width={width || 375}
                  height={height}
                  objectFit="cover"
                />
              </a>

              <p className="text-sm text-center text-black">
                {advertises[1].title}
              </p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      <div className="md:flex justify-center items-center pb-10 text-center">
        <div className="py-8 mx-auto md:mr-10 md:ml-0" style={{ width: 280 }}>
          <h2 className="mb-2 text-lg font-bold">協賛してくださる企業様募集</h2>
          <p className="text-sm">
            当ウェブサイトは宇都宮の多くの企業の方々に支えられて運営することができています。
          </p>
        </div>

        <div className="mx-auto md:mx-0" style={{ width: 280 }}>
          <LightBlueButton
            href="https://forms.gle/1oULcDjiPaknvfvc8"
            target="_blank"
          >
            協賛を考えている企業様へ
          </LightBlueButton>
        </div>
      </div>
    </>
  )
}

export { MainSponsorshipFooter }
