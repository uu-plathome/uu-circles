import { FC } from 'react'
import { BaseHead, baseUuCirclesUrl } from '@/src/components/layouts/BaseHead'
import { CategorySlugProperty } from '@/src/lib/enum/api/CategorySlugProperty'
import { TagSlugProperty } from '@/src/lib/enum/api/TagSlugProperty'

export const MainHead: FC = () => {
  return (
    <BaseHead
      title="UU-Circles | 宇都宮大学の“知りたいサークル“を知る場所"
      description={`宇都宮大学のサークル一覧。なりたいジブンをさがす春。`}
      breadcrumbJsonLdItemListElements={[
        {
          position: 1,
          name: 'Home',
          item: baseUuCirclesUrl,
        },
      ]}
      carouselJsonLdData={[
        {
          url: `${baseUuCirclesUrl}/circle`,
        },
        {
          url: `${baseUuCirclesUrl}/circle/tag/${TagSlugProperty.sport}`,
        },
        {
          url: `${baseUuCirclesUrl}/circle/tag/${TagSlugProperty.music}`,
        },
        {
          url: `${baseUuCirclesUrl}/circle/tag/${TagSlugProperty.culture}`,
        },
        {
          url: `${baseUuCirclesUrl}/circle/tag/${TagSlugProperty.community}`,
        },
        {
          url: `${baseUuCirclesUrl}/circle/tag/${TagSlugProperty.programming}`,
        },
        {
          url: `${baseUuCirclesUrl}/circle/category/${CategorySlugProperty.official_organization}`,
        },
      ]}
    />
  )
}
