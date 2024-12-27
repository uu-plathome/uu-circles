import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { BlueButton } from '@/src/components/atoms/buttons/BlueButton'
import { BaseTextField } from '@/src/components/atoms/form/BaseTextField'
import { AuthHeader } from '@/src/components/layouts/AuthHeader'
import { AuthContext } from '@/src/contexts/AuthContext'
import { useInput } from '@/src/hooks/useInput'
import { forgotPassword } from '@/src/lib/infra/api/auth'
import { isForgotPasswordAdminRequestValidationError } from '@/src/lib/types/api/ForgotPasswordAdminRequest'

// エラーステータス
const ERROR_STATUS = {
  // User がシステム管理者でなく、サークル管理者のときはエラーステータス
  IS_ONLY_CIRCLE_USER_ERROR_STATUS: 'IS_ONLY_CIRCLE_USER_ERROR_STATUS',
} as const

const Login: NextPage = () => {
  const email = useInput('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const router = useRouter()
  const authContext = useContext(AuthContext)

  if (authContext.accessToken) {
    router.push('/')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setEmailError('')

    const data = await forgotPassword(email.value)

    if (isForgotPasswordAdminRequestValidationError(data)) {
      email.setError(
        data.errors.email && Array.isArray(data.errors.email)
          ? data.errors.email[0]
          : ''
      )

      if (
        data.errors.email &&
        Array.isArray(data.errors.email) &&
        data.errors.email[0] === ERROR_STATUS.IS_ONLY_CIRCLE_USER_ERROR_STATUS
      ) {
        email.setError('')
        setEmailError(ERROR_STATUS.IS_ONLY_CIRCLE_USER_ERROR_STATUS)
      }

      return
    }

    if (data && data.type === 'success') {
      setSuccess(
        `${email.value}にパスワードを変更するためのメールを送信しました。`
      )
      return
    }

    setError('エラーが発生しました。')
  }

  return (
    <div>
      <Head>
        <title>パスワードを変更する</title>
      </Head>

      <AuthHeader />

      <div className="xl:container">
        <div className="mx-auto mt-16 max-w-screen-md">
          <div className="rounded border-2 border-white p-4">
            <h1 className="mb-4 text-center text-2xl text-white">
              パスワードを変更する
            </h1>

            {error ? (
              <div className="mb-4 p-4">
                <p className="text-lg text-white">
                  <FontAwesomeIcon icon={faExclamationTriangle} color="red" />{' '}
                  {error}
                </p>
              </div>
            ) : (
              ''
            )}

            {emailError ? (
              <div className="mb-4 p-4">
                <p className="text-lg text-white">
                  <FontAwesomeIcon icon={faExclamationTriangle} color="red" />{' '}
                  サークル管理者は
                  <a href="https://circle.uu-circles.com" className="underline">
                    サークル管理者ページ
                  </a>
                  をお使いください。
                </p>
              </div>
            ) : (
              ''
            )}

            {!success ? (
              <div>
                <form onSubmit={onSubmit}>
                  <div className="mb-4 px-4">
                    <BaseTextField
                      label="メールアドレス"
                      id="email"
                      name="email"
                      expand
                      {...email}
                    />
                  </div>

                  <div className="text-center">
                    <BlueButton type="submit">パスワードを変更</BlueButton>
                  </div>
                </form>

                <div className="mt-8 mb-4 text-right text-white">
                  <Link href="/auth/login">
                    <p className="underline">ログインへ戻る</p>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-white">{success}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
