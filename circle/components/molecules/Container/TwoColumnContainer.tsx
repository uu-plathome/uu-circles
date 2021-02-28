import { FC } from "react";
import { BaseContainer } from "./BaseContainer";

type Props = {
    sidebar: any
}
const TwoColumnContainer: FC<Props> = ({ children, sidebar }) => {
    return (
        <BaseContainer>
            <div className="md:flex">
                <div className="hidden md:block md:w-1/4">
                    { sidebar }
                </div>

                <div className="w-full md:w-3/4">
                    { children }
                </div>
            </div>
        </BaseContainer>
    )
}

export { TwoColumnContainer }