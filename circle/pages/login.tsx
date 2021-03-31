import { BlueButton } from '@/components/atoms/buttons/BlueButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { DangerBunner } from '@/components/atoms/bunner/DangerBunner'
import { login } from '@/infra/api/auth'
import { useStringInput } from '@/hooks/useInput'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { isUser } from '@/lib/types/model/User'
import { LoginCircleFormRequest } from '@/lib/types/api/LoginCircleFormRequest'
import { BaseFooter } from '@/components/layouts/BaseFooter'

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
      <div className="xl:container">
        <div className="max-w-screen-md mx-auto mt-16">
          <div className="border-2 border-white rounded p-4">
            <h1 className="text-white text-center text-2xl mb-4">ログイン</h1>

            {error ? <DangerBunner text={error} /> : ''}

            <form onSubmit={onSubmit}>
              <div className="px-4 mb-4">
                <BaseTextField
                  label="メールアドレスかユーザー名"
                  id="username_or_email"
                  name="username_or_email"
                  expand
                  {...usernameOrEmail}
                />

                <BaseTextField
                  label="パスワード"
                  id="password"
                  name="password"
                  expand
                  {...password}
                />
              </div>

              <div className="text-center">
                <BlueButton type="submit">ログイン</BlueButton>
              </div>
            </form>

            {/* <div className="text-white text-right mt-8 mb-4">
                            <Link href="/auth/password/reset">
                                <a className="underline">
                                    パスワードを忘れた場合はこちら
                                </a>
                            </Link>
                        </div> */}
          </div>
        </div>
      </div>

      <BaseFooter />
    </div>
  )
}

export default Login
