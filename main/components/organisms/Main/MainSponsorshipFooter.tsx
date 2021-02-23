import { LightBlueButton } from "@/components/atoms/button/LightBlueButton"
import { FC } from "react"
import Image from "next/image"

type Props = {

}
const MainSponsorshipFooter: FC<Props> = () => {
    const width = 375
    // w : h = 375 : 218
    const height = width * 218 / 375
    return (
        <div className="bg-gray-100 md:px-6 justify-center">
            <div className="md:flex justify-center md:mx-auto" style={{ maxWidth: 700 }}>
                <div className="md:mr-2">
                    <Image 
                        src="/images/company_ad_tmp.png" 
                        alt="協賛企業広告"
                        width={width} 
                        height={height} 
                    />
                </div>

                <div className="hidden md:block md:ml-2">
                    <Image 
                        src="/images/company_ad_tmp.png" 
                        alt="協賛企業広告"
                        width={width} 
                        height={height} 
                    />
                </div>
            </div>

            <div className="mx-auto md:mx-6 pb-10 md:flex items-center justify-center text-center">
                <div className="mt-8 mb-10 mx-auto md:ml-0 md:mr-10" style={{ width: 280 }}>
                    <h2 className="text-lg font-bold">協賛してくださる企業様募集</h2>
                    <p className="text-sm">当ウェブサイトは宇都宮の多くの企業の方々に支えられて運営することができています。</p>
                </div>

                <div className="mx-auto md:mx-0" style={{ width: 280 }}>
                    <LightBlueButton>
                        協賛を考えている企業様へ
                    </LightBlueButton>
                </div>
            </div>
        </div>
    )
}

export { MainSponsorshipFooter }