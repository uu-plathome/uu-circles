import { FC } from "react";

const BaseContainer: FC = ({ children }) => {
    return (
        <div className="md:container mx-auto">
            { children }
        </div>
    )
}

export { BaseContainer }