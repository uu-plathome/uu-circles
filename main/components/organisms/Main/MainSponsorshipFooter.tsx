import { LightBlueButton } from "@/components/atoms/button/LightBlueButton"
import { FC } from "react"
import Image from "next/image"

type Props = {

}
const MainSponsorshipFooter: FC<Props> = () => {
    return (
        <div className="bg-gray-100 md:px-6 md:flex justify-center">
            <div className="md:mx-6">
                <Image 
                    src="/images/company_ad_tmp.png" 
                    alt="協賛企業広告"
                    width="375" 
                    height="218" 
                />
            </div>

            <div className="mx-auto md:mx-6 pb-10" style={{ width: 280 }}>
                <div className="mt-8 mb-10">
                    <h2 className="text-lg font-bold">協賛してくださる企業様募集</h2>
                    <p className="text-sm">当ウェブサイトは宇都宮の多くの企業の方々に支えられて運営することができています。</p>
                </div>

                <LightBlueButton>
                    協賛を考えている企業様へ
                </LightBlueButton>
            </div>
        </div>
    )
}

export { MainSponsorshipFooter }