import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { SearchTextField } from '@/components/atoms/form/SearchTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CircleListItem } from '@/components/molecules/list_items/CircleListItem'
import { UseBooleanOrNullInput, UseStringInput } from '@/hooks/useInput'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { __ } from '@/src/lang/ja'
import { CircleType, getAllCircleType } from '@/src/lib/enum/api/CircleType'
import { Circle } from '@/src/lib/types/model/Circle'
import Color from '@/src/styles/colors'

type SearchValue = {
  name: UseStringInput
  release: UseBooleanOrNullInput
  circleType: UseStringInput
  isHandbill: UseBooleanOrNullInput
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
          <div className="p-2 border-2 border-gray-800">
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

                  <div className="grid grid-cols-2 gap-4 pt-8">
                    <div>
                      <BaseSelect
                        label="公開設定"
                        id="release"
                        name="release"
                        items={[
                          { value: 'null', label: 'すべて' },
                          { value: 'true', label: '公開' },
                          { value: 'false', label: '非公開' },
                        ]}
                        {...searchValue.release}
                      />
                    </div>

                    <div>
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

                    <div>
                      <BaseSelect
                        label="新歓ビラがあるかどうか"
                        id="isHandbill"
                        name="isHandbill"
                        items={[
                          { value: 'null', label: 'すべて' },
                          { value: 'true', label: 'あり' },
                          { value: 'false', label: 'なし' },
                        ]}
                        {...searchValue.isHandbill}
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
                  aria-label="前へ"
                  className=" mx-2 disabled:opacity-50"
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
                  aria-label="次へ"
                  className=" mx-2 disabled:opacity-50"
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
