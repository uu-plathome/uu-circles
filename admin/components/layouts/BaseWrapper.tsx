import { FC } from "react";
import { GreenButton } from "../atoms/buttons/GreenButton";
import { BaseSidebar } from "./BaseSidebar";

type Props = {
    title: string,
    actionHref?: string
    actionAs?: string
    actionText?: string
}
const BaseWrapper: FC<Props> = ({ title, actionHref, actionAs, actionText, children }) => {
    return (
        <main className="flex flex-wrap">
            <div className="w-full md:w-1/5">
                <BaseSidebar />
            </div>

            <div className="w-full md:w-4/5">
                <div className="pt-20 md:pt-10 pb-10">
                    <div className="flex justify-between mb-8">
                        <h1 className="text-2xl text-gray-100">
                            { title }
                        </h1>

                        {actionText ? (
                            <GreenButton href={actionHref} as={actionAs}>
                                { actionText }
                            </GreenButton>
                        ) : '' }
                    </div>

                    <div>
                        { children }
                    </div>
                </div>
            </div>
        </main>
    )
}

export { BaseWrapper }
