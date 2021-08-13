import { NextSeo, BreadcrumbJsonLd, LogoJsonLd, CarouselJsonLd } from 'next-seo';
import { ItemListElements } from 'next-seo/lib/jsonld/breadcrumb';
import { useRouter } from 'next/dist/client/router'
import { FC } from 'react'

export const baseUuCirclesUrl = 'https://uu-circles.com' as const

type DefaultDataProps = {
  url: string;
}

type Props = {
  title?: string
  description?: string
  breadcrumbJsonLdItemListElements?: ItemListElements[]
  carouselJsonLdData?: DefaultDataProps[]
}
const BaseHead: FC<Props> = ({
  title,
  description: _description,
  breadcrumbJsonLdItemListElements = [],
  carouselJsonLdData = []
}) => {
  const router = useRouter()
  const description = title && _description ? `${title} ${_description}` : _description

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate='%s | UU-Circles'
        defaultTitle='UU-Circles'
        description={description}
        canonical={`${baseUuCirclesUrl}${router.asPath}`}
        openGraph={{
          description,
          title,
          site_name: 'UU-Circles',
          type: router.pathname === '/' ? 'website' : 'article',
          url: `${baseUuCirclesUrl}${router.asPath}`,
          images: [
            {
              url: `${baseUuCirclesUrl}/images/uucircles_ogp.png`
            }
          ]
        }}
        twitter={{
          site: '@Ulab_uu',
          cardType: 'summary',
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            type: 'image/vnd.microsoft.icon',
            href: '/favicon.ico'
          },
          {
            rel: "apple-touch-icon",
            sizes: "57x57",
            href: "/favicons/apple-touch-icon-57x57.png"
          },
          {
            rel: "apple-touch-icon",
            sizes: "60x60",
            href: "/favicons/apple-touch-icon-60x60.png"
          },
          {
            rel: "apple-touch-icon",
            sizes: "72x72",
            href: "/favicons/apple-touch-icon-72x72.png"
          },
          {
            rel: "apple-touch-icon",
            sizes: "76x76",
            href: "/favicons/apple-touch-icon-76x76.png"
          },
          {
            rel: "apple-touch-icon",
            sizes: "114x114",
            href: "/favicons/apple-touch-icon-114x114.png"
          },
          {
            rel: "apple-touch-icon",
            sizes: "120x120",
            href: "/favicons/apple-touch-icon-120x120.png"
          },
          {
            rel: "apple-touch-icon",
            sizes: "144x144",
            href: "/favicons/apple-touch-icon-144x144.png"
          },
          {
            rel: "apple-touch-icon",
            sizes: "152x152",
            href: "/favicons/apple-touch-icon-152x152.png"
          },
          {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/favicons/apple-touch-icon-180x180.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "36x36",
            href: "/favicons/android-chrome-36x36.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "48x48",
            href: "/favicons/android-chrome-48x48.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "72x72",
            href: "/favicons/android-chrome-72x72.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "96x96",
            href: "/favicons/android-chrome-96x96.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "128x128",
            href: "/favicons/android-chrome-128x128.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "144x144",
            href: "/favicons/android-chrome-144x144.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "152x152",
            href: "/favicons/android-chrome-152x152.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "192x192",
            href: "/favicons/android-chrome-192x192.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "256x256",
            href: "/favicons/android-chrome-256x256.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "384x384",
            href: "/favicons/android-chrome-384x384.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "512x512",
            href: "/favicons/android-chrome-512x512.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "36x36",
            href: "/favicons/icon-36x36.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "48x48",
            href: "/favicons/icon-48x48.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "72x72",
            href: "/favicons/icon-72x72.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "96x96",
            href: "/favicons/icon-96x96.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "128x128",
            href: "/favicons/icon-128x128.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "144x144",
            href: "/favicons/icon-144x144.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "152x152",
            href: "/favicons/icon-152x152.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "160x160",
            href: "/favicons/icon-160x160.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "192x192",
            href: "/favicons/icon-192x192.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "196x196",
            href: "/favicons/icon-196x196.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "256x256",
            href: "/favicons/icon-256x256.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "384x384",
            href: "/favicons/icon-384x384.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "512x512",
            href: "/favicons/icon-512x512.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/favicons/icon-16x16.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "24x24",
            href: "/favicons/icon-24x24.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicons/icon-32x32.png"
          },
          {
            rel: "manifest",
            href: "/manifest.json"
          }
        ]}
      />

      {/* https://developers.google.com/search/docs/advanced/structured-data/breadcrumb */}
      {
        breadcrumbJsonLdItemListElements &&
          Array.isArray(breadcrumbJsonLdItemListElements) &&
          breadcrumbJsonLdItemListElements.length > 0 ? (
          <BreadcrumbJsonLd
            itemListElements={breadcrumbJsonLdItemListElements}
          />
        ) : ''}

      {/* https://developers.google.com/search/docs/advanced/structured-data/logo */}
      <LogoJsonLd
        logo={`${baseUuCirclesUrl}/icon.png`}
        url={baseUuCirclesUrl}
      />

      {carouselJsonLdData &&
        Array.isArray(carouselJsonLdData) &&
        carouselJsonLdData.length > 0 ? (
        <CarouselJsonLd
          type="default"
          data={carouselJsonLdData}
        />
      ) : ''}
    </>
  )
}

export { BaseHead }
