import { FC } from "react";

type Props = {}
const BaseHeader: FC<Props> = () => {
    return (
        <div>
            <div id="site_title">
                <h1 className="text-base md:text-lg">
                    UU-Circle
                </h1>
            </div>
        </div>
    )
}

export { BaseHeader }