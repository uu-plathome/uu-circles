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
        <>
          <meta name="description" content={`${title} ${description}`} />
          <meta name="og:description" content={`${title} ${description}`} />
        </>
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
      <link rel="icon" type="image/vnd.microsoft.icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/favicons/apple-touch-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/favicons/apple-touch-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/favicons/apple-touch-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/favicons/apple-touch-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/favicons/apple-touch-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/favicons/apple-touch-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/favicons/apple-touch-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/favicons/apple-touch-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="36x36"
        href="/favicons/android-chrome-36x36.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="48x48"
        href="/favicons/android-chrome-48x48.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="72x72"
        href="/favicons/android-chrome-72x72.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicons/android-chrome-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="128x128"
        href="/favicons/android-chrome-128x128.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="144x144"
        href="/favicons/android-chrome-144x144.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="152x152"
        href="/favicons/android-chrome-152x152.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/favicons/android-chrome-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="256x256"
        href="/favicons/android-chrome-256x256.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="384x384"
        href="/favicons/android-chrome-384x384.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/favicons/android-chrome-512x512.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="36x36"
        href="/favicons/icon-36x36.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="48x48"
        href="/favicons/icon-48x48.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="72x72"
        href="/favicons/icon-72x72.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicons/icon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="128x128"
        href="/favicons/icon-128x128.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="144x144"
        href="/favicons/icon-144x144.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="152x152"
        href="/favicons/icon-152x152.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="160x160"
        href="/favicons/icon-160x160.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/favicons/icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="196x196"
        href="/favicons/icon-196x196.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="256x256"
        href="/favicons/icon-256x256.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="384x384"
        href="/favicons/icon-384x384.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/favicons/icon-512x512.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/icon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="24x24"
        href="/favicons/icon-24x24.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/icon-32x32.png"
      />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  )
}

export { BaseHead }
