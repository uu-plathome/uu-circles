import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Circle } from '@/lib/types/model/Circle';

SwiperCore.use([Navigation, Pagination]);

type Props = {
    circle: Circle
}

const TopImage: FC<Props> = ({ circle }) => {
    const [images, setImages] = useState<string[]>([])
    const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null)
    // const [ height, setHeight ] = useState<number>(0)
    // w : h = 375 : 200

    const slideTo = (index: number) => {
        if (!swiperInstance) return;
        swiperInstance.slideTo(index);
    }

    useEffect(() => {
        setImages([
            circle.activityImageUrl1,
            circle.activityImageUrl2,
            circle.activityImageUrl3,
            circle.activityImageUrl4,
            circle.activityImageUrl5,
            circle.activityImageUrl6,
        ].filter(image => !!image))
    }, [ circle ])

    return (
        <>
        {/* スライダー本体 */}
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            onSwiper={(swiper) => setSwiperInstance(swiper)}
        >
            {images.map((image, index) => {
            return (
                <SwiperSlide key={image + index}>
                <Image
                    src={image}
                    alt={`${circle.name}の活動の様子`}
                    width={700}
                    height={700 * 200 / 375}
                />
                </SwiperSlide>
            );
            })}
        </Swiper>

        {/* サムネイル画像一覧 */}
        <div className="flex md:px-4">
            {images.map((image, index) => {
                return (
                    <div key={image + index} className="px-1 w-1/6">
                        <Image
                            onClick={() => slideTo(index)}
                            src={image}
                            alt={`${circle.name}の活動の様子`}
                            width={100}
                            height={100 * 200 / 375}
                        />
                    </div>
                );
            })}
        </div>
        </>
    )
}


export { TopImage }