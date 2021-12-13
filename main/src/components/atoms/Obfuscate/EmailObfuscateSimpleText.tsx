import { FC, VFC } from 'react'
import { ObfuscateProps } from './interface'
const Obfuscate: FC<ObfuscateProps> = require('react-obfuscate')

type Props = {
  email: string
}

/**
 * メールアドレスの難読化
 * デザインがないシンプルなコンポーネント
 *
 * コンポーネントの難読化は、ホバーやクリック、フォーカスイベントが発生するまで行われる。
 *
 * component obfuscates href data until a hover, click, or focus event.
 * Links are given their proper URL schemes (mailto, facetime, etc.) The link is rendered in reverse in the dom, but reversed again with css.
 * This making the link useless for spammers, but user friendly on screen.
 *
 * https://www.npmjs.com/package/react-obfuscate
 */
export const EmailObfuscateSimpleText: VFC<Props> = ({ email }) => {
  return <Obfuscate email={email} />
}
