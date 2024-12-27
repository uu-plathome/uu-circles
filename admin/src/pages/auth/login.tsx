import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useState } from 'react'
import { BlueButton } from '@/src/components/atoms/buttons/BlueButton'
import { BaseTextField } from '@/src/components/atoms/form/BaseTextField'
import { SimplePasswordTextField } from '@/src/components/atoms/form/SimplePasswordTextField'
import { AuthHeader } from '@/src/components/layouts/AuthHeader'
import { AuthContext } from '@/src/contexts/AuthContext'
import { useStringInput } from '@/src/hooks/useInput'
import { login } from '@/src/lib/infra/api/auth'
import {
  isLoginAdminFormRequestValidationError,
  LoginAdminFormRequest,
} from '@/src/lib/types/api/LoginAdminFormRequest'
import { isUser } from '@/src/lib/types/model/User'

// エラーステータス
const ERROR_STATUS = {
  // User がシステム管理者でなく、サークル管理者のときはエラーステータス
  IS_ONLY_CIRCLE_USER_ERROR_STATUS: 'IS_ONLY_CIRCLE_USER_ERROR_STATUS',
} as const

const Login: NextPage = () => {
  const [error, setError] = useState('')
  const [usernameOrEmailError, setUsernameOrEmailError] = useState('')
  const router = useRouter()
  const authContext = useContext(AuthContext)
  const usernameOrEmail = useStringInput('')
  const password = useStringInput('')

  if (authContext.accessToken) {
    router.push('/')
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    const data = await login({
      usernameOrEmail: usernameOrEmail.value,
      password: password.value,
    } as LoginAdminFormRequest)

    if (isLoginAdminFormRequestValidationError(data)) {
      usernameOrEmail.setErrors(data.errors.usernameOrEmail)
      password.setErrors(data.errors.password)

      if (
        data.errors.usernameOrEmail &&
        Array.isArray(data.errors.usernameOrEmail) &&
        data.errors.usernameOrEmail[0] ===
          ERROR_STATUS.IS_ONLY_CIRCLE_USER_ERROR_STATUS
      ) {
        usernameOrEmail.setError('')
        setUsernameOrEmailError(ERROR_STATUS.IS_ONLY_CIRCLE_USER_ERROR_STATUS)
      }
      return
    }

    if (data && isUser(data)) {
      authContext.setAccessToken(data.apiToken)
      authContext.setRole(data.role)
      await router.push('/')
      return
    }

    if (data && data.type === 'LoginAdminMainFormRequestValidationError') {
      if (data.errors.data) {
        setError(data.errors.data)
        return
      }
    }

    setError('エラーが発生しました')
  }

  return (
    <div>
      <Head>
        <title>ログイン</title>
      </Head>

      <AuthHeader />

      <div className="xl:container">
        <div className="mx-auto mt-16 max-w-screen-md">
          <div className="rounded border-2 border-white p-4">
            <h1 className="mb-4 text-center text-2xl text-white">ログイン</h1>

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

            {usernameOrEmailError ? (
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

            <form onSubmit={onSubmit}>
              <div className="mb-4 px-4">
                <BaseTextField
                  label="メールアドレスかユーザー名"
                  id="username_or_email"
                  name="username_or_email"
                  expand
                  {...usernameOrEmail}
                />

                <SimplePasswordTextField
                  label="パスワード"
                  id="password"
                  name="password"
                  {...password}
                />
              </div>

              <div className="text-center">
                <BlueButton type="submit">ログイン</BlueButton>
              </div>
            </form>

            <div className="mt-8 mb-4 text-right text-white">
              <Link href="/auth/password/reset">
                <p className="underline">パスワードを忘れた場合はこちら</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
