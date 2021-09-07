import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useState } from 'react'
import { DangerBunner } from '@/src/components/atoms/bunner/DangerBunner'
import { GreenButton } from '@/src/components/atoms/buttons/GreenButton'
import { BaseTextField } from '@/src/components/atoms/form/BaseTextField'
import { SimplePasswordTextField } from '@/src/components/atoms/form/SimplePasswordTextField'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { MainHeader } from '@/src/components/layouts/MainHeader'
import { AuthContext } from '@/src/contexts/AuthContext'
import { useStringInput } from '@/src/hooks/useInput'
import { login } from '@/src/lib/infra/api/auth'
import { LoginCircleFormRequest } from '@/src/lib/types/api/LoginCircleFormRequest'
import { isUser } from '@/src/lib/types/model/User'

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
    } as LoginCircleFormRequest)

    if (data && data.type === 'LoginCircleFormRequestValidationError') {
      usernameOrEmail.setErrors(data.errors.usernameOrEmail)
      password.setErrors(data.errors.password)

      if (Array.isArray(data.errors.data)) {
        setError(data.errors.data[0])
        return
      }

      return
    }

    if (data && isUser(data)) {
      authContext.setAccessToken(data.apiToken)
      authContext.setUser(data)
      await router.push('/')
      return
    }

    if (data && data.type === 'ValidationError') {
      if (typeof data.errors.data === 'string') {
        setError(data.errors.data)
        return
      }
    }

    setError('エラーが発生しました')
  }

  return (
    <div>
      <MainHeader />

      <div className="xl:container pb-20">
        <div className="mx-auto mt-8 max-w-screen-md">
          <div className="p-4">
            <h1 className="mb-12 text-2xl font-bold text-center text-black">
              サークル管理者ログイン
            </h1>

            {error ? (
              <div className="py-4 px-4">
                <DangerBunner text={error} />
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

              <div className="mt-12 text-center">
                <GreenButton type="submit" rounded>
                  ログイン
                </GreenButton>
              </div>
            </form>

            <div className="mt-8 mb-4 text-right text-black">
              <Link href="/auth/password/reset">
                <a className="underline">パスワードを忘れた場合はこちら</a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <BaseFooter />
    </div>
  )
}

export default Login
