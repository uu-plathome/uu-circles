import { BlueButton } from '@/components/atoms/buttons/BlueButton'
import { resetPassword } from '@/infra/api/auth'
import { useInput } from '@/hooks/useInput'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { SimplePasswordTextField } from '@/components/atoms/form/SimplePasswordTextField'
import { isResetPasswordCircleRequestValidationError } from '@/lib/types/api/ResetPasswordCircleRequest'
import { MainHeader } from '@/components/layouts/MainHeader'

const PasswordConfirmPage: NextPage = () => {
  const password = useInput('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const authContext = useContext(AuthContext)
  const { token: queryToken, email: queryEamil } = router.query
  const email = Array.isArray(queryEamil) ? queryEamil[0] : queryEamil
  const token = Array.isArray(queryToken) ? queryToken[0] : queryToken

  if (authContext.accessToken) {
    router.push('/')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const data = await resetPassword({
      type: 'ResetPasswordCircleRequest',
      email,
      token,
      password: password.value,
    })

    if (isResetPasswordCircleRequestValidationError(data)) {
      password.setError(
        data.errors.password && Array.isArray(data.errors.password)
          ? data.errors.password[0]
          : ''
      )

      if (data.errors.email && Array.isArray(data.errors.email)) {
        setError('エラーが発生しました。')
      }

      if (data.errors.token && Array.isArray(data.errors.token)) {
        setError('エラーが発生しました。')
      }

      return
    }

    if (data && data.type === 'success') {
      setSuccess(true)
      return
    }

    setError('エラーが発生しました。')
  }

  return (
    <div>
      <MainHeader />

      <div className="xl:container">
        <div className="max-w-screen-md mx-auto mt-16">
          <div className="rounded p-4">
            <h1 className="text-black text-center text-2xl mb-4">
              新しいパスワード
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
              <form onSubmit={onSubmit}>
                <div className="px-4 mb-4">
                  <SimplePasswordTextField
                    label="新しいパスワード"
                    id="password"
                    name="password"
                    {...password}
                  />
                </div>

                <div className="text-center">
                  <BlueButton type="submit">パスワードを変更</BlueButton>
                </div>
              </form>
            ) : (
              <div>
                <p className="text-black">
                  パスワードを変更しました。ログイン画面へ進んでください。
                </p>

                <div className="text-center">
                  <GreenButton href="/auth/PasswordConfirmPage" rounded>
                    ログインへ進む
                  </GreenButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordConfirmPage
