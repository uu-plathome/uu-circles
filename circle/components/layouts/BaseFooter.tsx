import { FC } from "react";
import { BaseContainer } from "../molecules/Container/BaseContainer";

type Props = {}
const BaseFooter: FC<Props> = () => {
    return (
        <div className="bg-gray-100 pt-8 text-center">
          <BaseContainer>
              <hr className="border border-gray-200"/>
              <div className="pt-8 pb-16">
                  <a href="https://uu-circles.com/guide/management-team" className="text-gray-400 px-2 text-xs">運営団体</a>

                  <a href="https://uu-circles.com/terms" className="text-gray-400 px-2 text-xs">利用規約</a>

                  <a href="https://uu-circles.com/privacy" className="text-gray-400 px-2 text-xs">プライバシーポリシー</a>
              </div>
          </BaseContainer>
    </div>

    )
}

export { BaseFooter }
