import Head from "next/head"
import { FC } from "react"

type Props = {
    title: string
}
const BaseHead: FC<Props> = ({ title }) => {
    return (
        <Head>
            <title>{ title } | UU-circles</title>
        </Head>
    )
}

export { BaseHead }
