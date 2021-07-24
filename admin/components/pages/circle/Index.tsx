import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { SearchTextField } from '@/components/atoms/form/SearchTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CircleListItem } from '@/components/molecules/list_items/CircleListItem'
import { UseStringInput } from '@/hooks/useInput'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { __ } from '@/lang/ja'
import { getAllCircleType } from '@/lib/enum/api/CircleType'
import { Circle } from '@/lib/types/model/Circle'
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Color from 'colors'
import { NextPage } from 'next'

type SearchValue = {
  name: UseStringInput
  release: UseStringInput
  circleType: UseStringInput
}

type Props = {
  circles: Circle[]
  searchValue: SearchValue
  hasPrevious: boolean
  hasNext: boolean
  onPrevious(): void
  onNext(): void
}
const Index: NextPage<Props> = ({
  circles,
  searchValue,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}) => {
  const { isMd } = useMediaQuery()

  return (
    <div id="top">
      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper
          title="サークル一覧へようこそ"
          actionText="サークル新規作成"
          actionHref="/circle/create"
        >
          <div className="border-2 border-gray-800 p-2">
            {circles ? (
              <div className="py-4 mb-8">
                <p className="text-white">サークル名検索</p>

                <form>
                  <div>
                    <SearchTextField
                      id="nameSearch"
                      name="nameSearch"
                      expand
                      {...searchValue.name}
                    />
                  </div>

                  <div className="pt-8 flex">
                    <div className="w-1/2 md:w-1/3 pr-4">
                      <BaseSelect
                        label="公開設定"
                        id="release"
                        name="release"
                        items={[
                          { value: '', label: '未選択' },
                          { value: 'true', label: '公開' },
                          { value: 'false', label: '非公開' },
                        ]}
                        {...searchValue.release}
                      />
                    </div>

                    <div className="w-1/2 md:w-1/3 px-2">
                      <BaseSelect
                        label="サークル種別"
                        id="circleType"
                        name="circleType"
                        items={[
                          { value: '', label: '未選択' },
                          ...getAllCircleType().map((_circleType) => ({
                            value: _circleType,
                            label: __(_circleType, CircleType._type),
                          })),
                          { value: '不明', label: '不明' },
                        ]}
                        {...searchValue.circleType}
                      />
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              ''
            )}

            {circles && circles.length > 0
              ? circles.map((circle: Circle) => {
                  return (
                    <CircleListItem
                      key={`circle-${circle.id}`}
                      circle={circle}
                    />
                  )
                })
              : ''}

            {circles && circles.length === 0 ? (
              <div className="py-4">
                <p className="text-white">まだサークルが登録されていません</p>
              </div>
            ) : (
              ''
            )}

            {circles ? (
              <div className="text-center">
                <button
                  className="mx-2 disabled:opacity-50 "
                  disabled={!hasPrevious}
                  onClick={onPrevious}
                >
                  <FontAwesomeIcon
                    color={Color.white}
                    icon={faChevronCircleLeft}
                    size="2x"
                  />
                </button>

                <button
                  className="mx-2 disabled:opacity-50 "
                  disabled={!hasNext}
                  onClick={onNext}
                >
                  <FontAwesomeIcon
                    color={Color.white}
                    icon={faChevronCircleRight}
                    size="2x"
                  />
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export { Index }
