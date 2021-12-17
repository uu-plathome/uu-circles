import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { BlueButton } from '@/src/components/atoms/buttons/BlueButton'
import { GreenButton } from '@/src/components/atoms/buttons/GreenButton'
import { SimplePasswordTextField } from '@/src/components/atoms/form/SimplePasswordTextField'
import { SubmitLoading } from '@/src/components/atoms/loading/SubmitLoading'
import { MainHeader } from '@/src/components/layouts/MainHeader'
import { AuthContext } from '@/src/contexts/AuthContext'
import { useInput } from '@/src/hooks/useInput'
import { resetPassword } from '@/src/lib/infra/api/auth'
import { isResetPasswordCircleRequestValidationError } from '@/src/lib/types/api/ResetPasswordCircleRequest'

const PasswordConfirmPage: NextPage = () => {
  const password = useInput('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isOpen, setIsOpen] = useState(false)
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
    setIsOpen(true)
    setError('')

    const data = await resetPassword({
      type: 'ResetPasswordCircleRequest',
      email,
      token,
      password: password.value,
    })

    console.log(data)

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

      setIsOpen(false)
      return
    }

    if (data && data.type && data.type === 'success') {
      setSuccess(true)
      setIsOpen(false)
      return
    }

    if (data && data.type && data.type === '400') {
      setError(`エラーが発生しました。${data.email}`)
      setIsOpen(false)
      return
    }

    setError('エラーが発生しました。')
    setIsOpen(false)
  }

  return (
    <div>
      <MainHeader />

      <SubmitLoading isOpen={isOpen} />

      <div className="xl:container">
        <div className="mx-auto mt-16 max-w-screen-md">
          <div className="p-4 rounded">
            <h1 className="mb-4 text-2xl text-center text-black">
              新しいパスワード
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
