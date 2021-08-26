import { FC } from 'react'
import { BaseContainer } from '../molecules/Container/BaseContainer'

type Props = Record<string, never>
const BaseFooter: FC<Props> = () => {
  return (
    <div className="pt-8 text-center bg-gray-50">
      <BaseContainer>
        <hr className="border border-gray-200" />
        <div className="pt-8 pb-16">
          <a
            href="https://uu-circles.com"
            className="px-2 text-xs text-gray-400"
          >
            UU-Circles
          </a>

          <a
            href="https://uu-circles.com/guide/management-team"
            className="px-2 text-xs text-gray-400"
          >
            運営団体
          </a>

          <a
            href="https://uu-circles.com/terms"
            className="px-2 text-xs text-gray-400"
          >
            利用規約
          </a>

          <a
            href="https://uu-circles.com/privacy"
            className="px-2 text-xs text-gray-400"
          >
            プライバシーポリシー
          </a>
        </div>
      </BaseContainer>
    </div>
  )
}

export { BaseFooter }
