import { useMediaQuery } from "@/hooks/useMediaQuery"
import { FC, useEffect, useState } from "react"
import { BaseHeader } from "./BaseHeader"
import { BaseSpMenu } from "./BaseSpMenu"

const BaseLayout: FC = ({ children }) => {
    const [ menuIsOpen, setMenuIsOpen ] = useState(true)
    const { isMd } = useMediaQuery()

    useEffect(() => {
        if (isMd) {
            setMenuIsOpen(false)
        }
    })

    return (
        <div>
            {/*  ヘッダー */}
            <BaseHeader onClick={() => setMenuIsOpen(!menuIsOpen)} />

            {!menuIsOpen ? (
                <div>
                    { children }
                </div>
            ) : (
                <BaseSpMenu />
            )}
        </div>
    )
}

export { BaseLayout }