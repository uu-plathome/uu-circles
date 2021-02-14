import { FC } from "react";

const BaseContainer: FC = ({ children }) => {
    return (
        <div className="bg-gray-100">
            <div className="md:container mx-auto">
                { children }
            </div>
        </div>
    )
}

export { BaseContainer }