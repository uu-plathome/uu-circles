import { BlueButton } from '@/components/atoms/buttons/BlueButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { forgotPassword } from '@/infra/api/auth'
import { useInput } from '@/hooks/useInput'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Head from 'next/head'
import { isForgotPasswordCircleRequestValidationError } from '@/lib/types/api/ForgotPasswordCircleRequest'
import { MainHeader } from '@/components/layouts/MainHeader'

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

    if (isForgotPasswordCircleRequestValidationError(data)) {
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

      <MainHeader />

      <div className="xl:container">
        <div className="max-w-screen-md mx-auto mt-16">
          <div className="rounded p-4">
            <h1 className="text-black text-center text-2xl mb-4">
              パスワードを変更する
            </h1>

            {error ? (
              <div className="p-4 mb-4">
                <p className="text-black text-lg">
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

                <div className="text-black text-right mt-8 mb-4">
                  <Link href="/auth/login">
                    <a className="underline">ログインへ戻る</a>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-black">{success}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
