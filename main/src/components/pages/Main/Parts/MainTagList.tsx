import { FC } from 'react'
import { WhiteBadge } from '@/src/components/atoms/badge/WhiteBadge'
import { __ } from '@/src/lang/ja'
import { CircleTagModel } from '@/src/lib/enum/api/CircleTagModel'
import { TagSlugProperty } from '@/src/lib/enum/api/TagSlugProperty'

const MainTagList: FC = ({}) => {
  return (
    <div className="md:pt-10 pb-10">
      <div className="md:flex md:justify-center md:items-center">
        <h2 className="md:pr-8 md:mr-8 mb-2 text-lg font-bold text-black md:border-r md:border-gray-400">
          おすすめのタグ
        </h2>

        <div className="flex">
          <div className="px-1">
            <WhiteBadge
              href="/circle/tag/[tag]"
              as={`/circle/tag/${TagSlugProperty.sport}`}
            >
              {__(CircleTagModel.SPORT, CircleTagModel._type)}
            </WhiteBadge>
          </div>

          <div className="px-1">
            <WhiteBadge
              href="/circle/tag/[tag]"
              as={`/circle/tag/${TagSlugProperty.music}`}
            >
              {__(CircleTagModel.MUSIC, CircleTagModel._type)}
            </WhiteBadge>
          </div>

          <div className="px-1">
            <WhiteBadge
              href="/circle/tag/[tag]"
              as={`/circle/tag/${TagSlugProperty.culture}`}
            >
              {__(CircleTagModel.CULTURE, CircleTagModel._type)}
            </WhiteBadge>
          </div>

          <div className="px-1">
            <WhiteBadge
              href="/circle/tag/[tag]"
              as={`/circle/tag/${TagSlugProperty.community}`}
            >
              {__(CircleTagModel.COMMUNITY, CircleTagModel._type)}
            </WhiteBadge>
          </div>
        </div>
      </div>
    </div>
  )
}

export { MainTagList }
