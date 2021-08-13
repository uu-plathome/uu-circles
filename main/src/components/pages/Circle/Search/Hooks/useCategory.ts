import { useRouter } from "next/dist/client/router"
import { namespaceType, __ } from "@/src/lang/ja"
import { CategorySlugProperty } from "@/src/lib/enum/api/CategorySlugProperty"

export const useCategory = () => {
  const router = useRouter()
  const { category: _category } = router.query
  const category = String(_category) as CategorySlugProperty

  return {
    category,
    categoryTranslated: __(category, CategorySlugProperty._type),
    categoryDescriptionTitle: __(
      category,
      namespaceType.TitleByCategorySlugProperty
    ),
    categoryDescriptionText: __(
      category,
      namespaceType.TextByCategorySlugProperty
    ),
  }
}
