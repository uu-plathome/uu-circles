import { DangerBunner } from '@/components/atoms/bunner/DangerBunner'
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { SimplePasswordTextField } from '@/components/atoms/form/SimplePasswordTextField'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { MainHeader } from '@/components/layouts/MainHeader'
import { AuthContext } from '@/contexts/AuthContext'
import { useStringInput } from '@/hooks/useInput'
import { login } from '@/infra/api/auth'
import { LoginCircleFormRequest } from '@/lib/types/api/LoginCircleFormRequest'
import { isUser } from '@/lib/types/model/User'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useState } from 'react'

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
        <div className="max-w-screen-md mx-auto mt-8">
          <div className="p-4">
            <h1 className="text-black text-center text-2xl mb-12 font-bold">
              サークル管理者ログイン
            </h1>

            {error ? (
              <div className="px-4 py-4">
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

              <div className="text-center mt-12">
                <GreenButton type="submit" rounded>
                  ログイン
                </GreenButton>
              </div>
            </form>

            <div className="text-black text-right mt-8 mb-4">
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
