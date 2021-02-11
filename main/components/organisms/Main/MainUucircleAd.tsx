import { FC } from "react"
import Image from 'next/image'

type Props = {}
const MainUucircleAd: FC<Props> = () => {
    const width = 220
    // w : h = 220 : 130
    const height = width * 130 / 220
    return (
        <div className="bg-gray-100 md:flex justify-center pt-10 text-center">
            <div className="md:mx-6 mb-10">
                <a href="https://media.uu-circles.com/" target="_blank" rel="noreferrer">
                    <Image src="/images/Ulab_site_ad.jpg" alt="メディアサイト" width={width} height={height} />
                </a>
                <p className="text-sm mt-1">メディアサイト</p>
            </div>

            <div className="md:mx-6 mb-10">
                <a href="https://miyameshi.com/" target="_blank" rel="noreferrer">
                    <Image src="/images/miyameshi-phone-top.jpg" alt="みやメシ.com" width={width} height={height} />
                </a>
                <p className="text-sm mt-1">みやメシ.com</p>
            </div>

            <div className="md:mx-6 mb-10">
                <a href="https://ulab-uu.com" target="_blank" rel="noreferrer">
                    <Image src="/images/Ulab_site_ad.jpg" alt="u-lab公式サイト" width={width} height={height} />
                </a>
                <p className="text-sm mt-1">U-lab公式サイト</p>
            </div>
        </div>
    )
}

export { MainUucircleAd }