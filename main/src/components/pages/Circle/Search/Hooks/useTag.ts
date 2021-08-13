import { useRouter } from 'next/dist/client/router'
import { namespaceType, __ } from '@/src/lang/ja'
import { TagSlugProperty } from '@/src/lib/enum/api/TagSlugProperty'

export const useTag = () => {
  const router = useRouter()
  const { tag: _tag } = router.query
  const tag = String(_tag) as TagSlugProperty

  return {
    tag,
    tagTranslated: __(tag, TagSlugProperty._type),
    tagDescriptionTitle: __(tag, namespaceType.TitleByTagSlugProperty),
    tagDescriptionText: __(tag, namespaceType.TextByTagSlugProperty),
  }
}
