import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { BlueButton } from '@/src/components/atoms/buttons/BlueButton'
import { BaseTextField } from '@/src/components/atoms/form/BaseTextField'
import { SubmitLoading } from '@/src/components/atoms/loading/SubmitLoading'
import { MainHeader } from '@/src/components/layouts/MainHeader'
import { AuthContext } from '@/src/contexts/AuthContext'
import { useInput } from '@/src/hooks/useInput'
import { forgotPassword } from '@/src/lib/infra/api/auth'
import { isForgotPasswordCircleRequestValidationError } from '@/src/lib/types/api/ForgotPasswordCircleRequest'

const Login: NextPage = () => {
  const email = useInput('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const authContext = useContext(AuthContext)

  if (authContext.accessToken) {
    router.push('/')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setIsOpen(true)
    setError('')

    const data = await forgotPassword(email.value)

    if (isForgotPasswordCircleRequestValidationError(data)) {
      email.setError(
        data.errors.email && Array.isArray(data.errors.email)
          ? data.errors.email[0]
          : ''
      )
      setIsOpen(false)
      return
    }

    if (data && data.type === 'success') {
      setSuccess(true)
      setIsOpen(false)
      return
    }

    setError(
      'エラーが発生しました。このメールアドレスは登録されていない可能性があります。'
    )
    setIsOpen(false)
  }

  return (
    <div>
      <Head>
        <title>パスワードを変更する</title>
      </Head>

      <MainHeader />

      <SubmitLoading isOpen={isOpen} />

      <div className="xl:container">
        <div className="mx-auto mt-16 max-w-screen-md">
          <div className="p-4 rounded">
            <h1 className="mb-4 text-2xl text-center text-black">
              パスワードを変更する
            </h1>

            {error ? (
              <div className="p-4 mb-4">
                <p className="text-lg text-black">
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

                <div className="mt-8 mb-4 text-right text-black">
                  <Link href="/login">
                    <a className="underline">ログインへ戻る</a>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-black">
                  {email.value}
                  にパスワードを変更するためのメールを送信しました。
                </p>
                <p className="text-black">メールを確認してください。</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
