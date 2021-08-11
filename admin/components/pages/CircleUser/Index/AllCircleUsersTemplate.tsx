import { SearchTextField } from '@/components/atoms/form/SearchTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { AllUserListItem } from '@/components/molecules/list_items/AllUserListItem'
import { UseStringInput } from '@/hooks/useInput'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { User, UserByAllCircle } from '@/lib/types/model/User'
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Color from 'colors'
import { NextPage } from 'next'

type SearchValue = {
  name: UseStringInput,
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
                <p className="text-white">ユーザー検索</p>

                <form>
                  <SearchTextField
                    id="nameSearch"
                    name="nameSearch"
                    expand
                    {...searchValue.name}
                  />
                </form>
              </div>
            ) : (
              ''
            )}

            {users && users.length > 0
              ? users.map((user: User) => {
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
    </>
  )
}
