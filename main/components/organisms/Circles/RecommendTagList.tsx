import { WhiteBadge } from '@/components/atoms/badge/WhiteBadge'
import { __ } from '@/lang/ja'
import { CircleTagModel } from '@/lib/enum/api/CircleTagModel'
import { TagSlugProperty } from '@/lib/enum/api/TagSlugProperty'
import { FC } from 'react'

const RecommendTagList: FC = () => {
  return (
    <div className="pb-10">
      <h2 className="text-black text-lg font-bold mb-2">おすすめのタグ</h2>

      <div className="flex justify-between sm:justify-start">
        <div className="px-0.5 sm:px-1">
          <WhiteBadge
            href="/circle/tag/[tag]"
            as={`/circle/tag/${TagSlugProperty.sport}`}
          >
            {__(CircleTagModel.SPORT)}
          </WhiteBadge>
        </div>

        <div className="px-0.5 sm:px-1">
          <WhiteBadge
            href="/circle/tag/[tag]"
            as={`/circle/tag/${TagSlugProperty.music}`}
          >
            {__(CircleTagModel.MUSIC)}
          </WhiteBadge>
        </div>

        <div className="px-0.5 sm:px-1">
          <WhiteBadge
            href="/circle/tag/[tag]"
            as={`/circle/tag/${TagSlugProperty.culture}`}
          >
            {__(CircleTagModel.CULTURE)}
          </WhiteBadge>
        </div>

        <div className="px-0.5 sm:px-1">
          <WhiteBadge
            href="/circle/tag/[tag]"
            as={`/circle/tag/${TagSlugProperty.community}`}
          >
            {__(CircleTagModel.COMMUNITY)}
          </WhiteBadge>
        </div>
      </div>
    </div>
  )
}

export { RecommendTagList }
