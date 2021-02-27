import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import { FC } from "react"

type Props = {
    title: string
}
const BaseHead: FC<Props> = ({ title }) => {
    const router = useRouter()
    return (
        <Head>
            <title>{ title } | UU-circles</title>
            <meta property="og:title" content={`${title} | UU-circles`} />
            <meta property="og:site_name" content="UU-circles" />
            <meta property="og:type" content={router.pathname === '/' ? 'website' : 'article'} />
            <meta property="og:url" content={`https://uu-circles.com${router.asPath}`}></meta>
            <meta name="twitter:site" content="@Ulab_uu" />
        </Head>
    )
}

export { BaseHead }
