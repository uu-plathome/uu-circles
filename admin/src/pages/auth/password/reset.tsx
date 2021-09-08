import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { BlueButton } from '@/components/atoms/buttons/BlueButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { AuthHeader } from '@/components/layouts/AuthHeader'
import { AuthContext } from '@/contexts/AuthContext'
import { useInput } from '@/src/hooks/useInput'
import { forgotPassword } from '@/src/lib/infra/api/auth'
import { isForgotPasswordAdminRequestValidationError } from '@/src/lib/types/api/ForgotPasswordAdminRequest'

const Login: NextPage = () => {
  const email = useInput('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const authContext = useContext(AuthContext)

  if (authContext.accessToken) {
    router.push('/')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const data = await forgotPassword(email.value)

    if (isForgotPasswordAdminRequestValidationError(data)) {
      email.setError(
        data.errors.email && Array.isArray(data.errors.email)
          ? data.errors.email[0]
          : ''
      )
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
          <div className="p-4 rounded border-2 border-white">
            <h1 className="mb-4 text-2xl text-center text-white">
              パスワードを変更する
            </h1>

            {error ? (
              <div className="p-4 mb-4">
                <p className="text-lg text-white">
                  <FontAwesomeIcon icon={faExclamationTriangle} color="red" />{' '}
                  {error}
                </p>
              </div>
            ) : (
              ''
            )}

            {!success ? (
              <div>
                <form onSubmit={onSubmit}>
                  <div className="px-4 mb-4">
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
                    <a className="underline">ログインへ戻る</a>
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
