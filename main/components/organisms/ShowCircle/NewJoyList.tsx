import { FC } from "react";
import { CircleNewJoy } from "@/lib/types/model/CircleNewJoy";
import { CircleNewJoyListItem } from "../ListItem/CircleNewJoyListItem";

type Props = {
    slug: string
    circleNewJoys: CircleNewJoy[]
}
const NewJoyList: FC<Props> = ({ slug, circleNewJoys }) => {
    return (
        <div className="bg-gray-100">
            <h2 className="text-center mb-8 text-lg font-bold pt-8">新歓イベント日程</h2>

            <div className="md:flex justify-center">
                {circleNewJoys.map((circleNewJoy, idx) => {
                    let className = idx === 0 ? 'place-self-end' : ''
                    className = idx === 1 ? 'place-self-center' : className
                    className = idx === 2 ? 'place-self-start' : className

                    return (
                        <div 
                            key={circleNewJoy.id} 
                            className={`md:px-4 ${className}`}
                        >
                            <CircleNewJoyListItem 
                                slug={slug} 
                                circleNewJoy={circleNewJoy}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export { NewJoyList }