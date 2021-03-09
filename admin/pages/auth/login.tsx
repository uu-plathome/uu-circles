import { AuthHeader } from '@/components/layouts/AuthHeader'
import { BlueButton } from '@/components/atoms/buttons/BlueButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { SimplePasswordTextField } from '@/components/atoms/form/SimplePasswordTextField'
import { login } from '@/infra/api/auth'
import { useStringInput } from '@/hooks/useInput'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import {
  isLoginAdminFormRequestValidationError,
  LoginAdminFormRequest,
} from '@/lib/types/api/LoginAdminFormRequest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { isUser } from '@/lib/types/model/User'
import Link from 'next/link'
import Head from 'next/head'

const Login: NextPage = () => {
  const [error, setError] = useState('')
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
        <div className="max-w-screen-md mx-auto mt-16">
          <div className="border-2 border-white rounded p-4">
            <h1 className="text-white text-center text-2xl mb-4">ログイン</h1>

            {error ? (
              <div className="p-4 mb-4">
                <p className="text-white text-lg">
                  <FontAwesomeIcon icon={faExclamationTriangle} color="red" />{' '}
                  {error}
                </p>
              </div>
            ) : (
              ''
            )}

            <form onSubmit={onSubmit}>
              <div className="px-4 mb-4">
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

            <div className="text-white text-right mt-8 mb-4">
              <Link href="/auth/password/reset">
                <a className="underline">パスワードを忘れた場合はこちら</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
