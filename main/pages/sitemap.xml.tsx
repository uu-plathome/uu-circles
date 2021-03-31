import { axiosInstance } from '@/infra/api'
import { SitemapDto } from '@/lib/enum/app/SitemapDto'
import { GetServerSidePropsContext } from 'next'
import React from 'react'

const createSitemap = (response: SitemapDto[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
        ${response
          .map((sitemapDto: SitemapDto) => {
            return `
                    <url>
                        <loc>${sitemapDto.siteUrl}</loc>
                        <lastmod>${sitemapDto.publishAt}</lastmod>
                    </url>
                `
          })
          .join('')}
    </urlset>
    `
}

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  type GetResponse = {
    data: SitemapDto[]
  }
  const { data } = await axiosInstance.get<GetResponse>('/api/sitemap')

  res.setHeader('Content-Type', 'text/xml')
  res.write(createSitemap(data.data))
  res.end()
  return { props: {} }
}

const Sitemap = () => {
  return <></>
}

export default Sitemap
