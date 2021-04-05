import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { FC } from 'react'

type Props = {
  title: string
  description?: string
}
const BaseHead: FC<Props> = ({ title, description }) => {
  const router = useRouter()
  return (
    <Head>
      <title>{title} | UU-Circles</title>

      {description ? (
        <meta name="description" content={`${title} ${description}`} />
      ) : (
        ''
      )}

      <meta property="og:title" content={`${title} | UU-Circles`} />
      <meta property="og:site_name" content="UU-Circles" />
      <meta
        property="og:type"
        content={router.pathname === '/' ? 'website' : 'article'}
      />
      <meta
        property="og:url"
        content={`https://uu-circles.com${router.asPath}`}
      />
      <meta
        name="og:image"
        content="https://uu-circles.com/images/uucircles_ogp.png"
      />
      <meta name="twitter:site" content="@Ulab_uu" />
      <meta name="twitter:card" content="summary" />
    </Head>
  )
}

export { BaseHead }
