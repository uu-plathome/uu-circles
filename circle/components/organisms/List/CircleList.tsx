import { FC } from "react"

const CircleListItem = () => {
    return (
        <a href="">
            <div className="flex justify-center items-center rounded border border-gray-200 bg-white py-6" style={{ width: 280 }}>
                <p className="font-lg font-bold">U-lab</p>
            </div>
        </a>
    )
}

const CircleList: FC = () => {
    return (
        <div>
            <div className="mb-4 flex justify-center">
                <CircleListItem />
            </div>

            <div className="mb-4 flex justify-center">
                <CircleListItem />
            </div>
        </div>
    )
}

export { CircleList }
