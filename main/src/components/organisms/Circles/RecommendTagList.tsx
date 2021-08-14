import { FC } from 'react'
import { WhiteBadge } from '@/src/components/atoms/badge/WhiteBadge'
import { __ } from '@/src/lang/ja'
import { CircleTagModel } from '@/src/lib/enum/api/CircleTagModel'
import { TagSlugProperty } from '@/src/lib/enum/api/TagSlugProperty'

const RecommendTagList: FC = () => {
  return (
    <div className="pb-10">
      <h2 className="mb-2 text-lg font-bold text-black">おすすめのタグ</h2>

      <div className="flex justify-between sm:justify-start">
        <div className="px-0.5 sm:px-1">
          <WhiteBadge
            href="/circle/tag/[tag]"
            as={`/circle/tag/${TagSlugProperty.sport}`}
          >
            {__(CircleTagModel.SPORT, CircleTagModel._type)}
          </WhiteBadge>
        </div>

        <div className="px-0.5 sm:px-1">
          <WhiteBadge
            href="/circle/tag/[tag]"
            as={`/circle/tag/${TagSlugProperty.music}`}
          >
            {__(CircleTagModel.MUSIC, CircleTagModel._type)}
          </WhiteBadge>
        </div>

        <div className="px-0.5 sm:px-1">
          <WhiteBadge
            href="/circle/tag/[tag]"
            as={`/circle/tag/${TagSlugProperty.culture}`}
          >
            {__(CircleTagModel.CULTURE, CircleTagModel._type)}
          </WhiteBadge>
        </div>

        <div className="px-0.5 sm:px-1">
          <WhiteBadge
            href="/circle/tag/[tag]"
            as={`/circle/tag/${TagSlugProperty.community}`}
          >
            {__(CircleTagModel.COMMUNITY, CircleTagModel._type)}
          </WhiteBadge>
        </div>
      </div>
    </div>
  )
}

export { RecommendTagList }
