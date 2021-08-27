import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Color from 'colors'
import { NextPage } from 'next'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { SearchTextField } from '@/components/atoms/form/SearchTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { AllUserListItem } from '@/components/molecules/list_items/AllUserListItem'
import { UseNumberInput, UseStringInput } from '@/hooks/useInput'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { UserByAllCircle } from '@/lib/types/model/User'

type SearchValue = {
  name: UseStringInput
  circleCount: UseNumberInput
}
type Props = {
  users: UserByAllCircle[]
  searchValue: SearchValue
  hasPrevious: boolean
  hasNext: boolean
  onPrevious(): void
  onNext(): void
  onResendEmail(email: string): void
}
export const AllCircleUsersTemplate: NextPage<Props> = ({
  users,
  searchValue,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
  onResendEmail,
}) => {
  const { isMd } = useMediaQuery()

  return (
    <>
      {isMd ? <BaseHeader /> : ''}

      <BaseContainer>
        <BaseWrapper
          title="部員アカウント一覧"
          actionText="サークル新規作成"
          actionHref="/circle/create"
        >
          <div className="border-2 border-gray-800 p-2">
            {users ? (
              <div className="py-4 mb-8">
                <form>
                  <div className="mb-2">
                    <label htmlFor="nameSearch" className="text-white mb-2">
                      ユーザー検索
                    </label>

                    <SearchTextField
                      id="nameSearch"
                      name="nameSearch"
                      expand
                      {...searchValue.name}
                    />
                  </div>

                  <BaseTextField
                    id="circleCountSearch"
                    name="circleCountSearch"
                    label="サークル所属数"
                    type="number"
                    min={0}
                    visibleCounter={false}
                    {...searchValue.circleCount}
                  />
                </form>
              </div>
            ) : (
              ''
            )}

            {users && users.length > 0
              ? users.map((user: UserByAllCircle) => {
                  return (
                    <AllUserListItem
                      key={`user-${user.id}`}
                      user={user}
                      onResendEmail={onResendEmail}
                    />
                  )
                })
              : ''}

            {users && users.length === 0 ? (
              <div className="py-4">
                <p className="text-white">
                  まだ部員アカウントが登録されていません
                </p>
              </div>
            ) : (
              ''
            )}

            {users ? (
              <div className="text-center">
                <button
                  aria-label="前へ"
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
                  aria-label="次へ"
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
    </>
  )
}
