import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { BlueButton } from '@/src/components/atoms/buttons/BlueButton'
import { OrangeButton } from '@/src/components/atoms/buttons/OrangeButton'
import { SimplePasswordTextField } from '@/src/components/atoms/form/SimplePasswordTextField'
import { MainHeader } from '@/src/components/layouts/MainHeader'
import { AuthContext } from '@/src/contexts/AuthContext'
import { useInput } from '@/src/hooks/useInput'
import {
  checkVerifyCircleUser,
  verificationEmailCircleUser,
} from '@/src/lib/infra/api/auth'
import { isVerificationEmailCircleUserRequestValidationError } from '@/src/lib/types/api/VerificationEmailCircleUserRequest'

const Login: NextPage = () => {
  const password = useInput('')
  const router = useRouter()
  const authContext = useContext(AuthContext)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState('')
  const { id, expires, signature } = router.query

  if (authContext.accessToken) {
    router.push('/')
  }

  useEffect(() => {
    ;(async () => {
      if (
        !Array.isArray(id) &&
        Number.isInteger(Number(id)) &&
        !Array.isArray(expires) &&
        !Array.isArray(signature)
      ) {
        const data = await checkVerifyCircleUser(Number(id), expires, signature)

        if (data.type === 'VerificationInvalidError') {
          setError(data.status)
        }
      }
    })()
  }, [id, expires, signature])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      !Array.isArray(id) &&
      !Array.isArray(expires) &&
      !Array.isArray(signature)
    ) {
      const data = await verificationEmailCircleUser(
        Number(id),
        password.value,
        expires,
        signature
      )

      if (data.type === 'success') {
        setSuccess(true)
      }

      if (data && data.type === 'VerificationInvalidError') {
        setError(data.status)
        return
      }

      if (isVerificationEmailCircleUserRequestValidationError(data)) {
        password.setError(
          data.errors.password && Array.isArray(data.errors.password)
            ? data.errors.password[0]
            : ''
        )
        return
      }
    }
  }

  return (
    <div>
      <MainHeader />

      <div className="xl:container">
        <div className="mx-auto mt-16 max-w-screen-md">
          <div className="p-4 rounded">
            <h1 className="mb-4 text-2xl text-center text-black">
              パスワード設定
            </h1>

            {success ? (
              <div>
                <p>パスワードを設定しました</p>

                <OrangeButton href="/login">ログインへ</OrangeButton>
              </div>
            ) : (
              ''
            )}
            {error ? <p className="text-red-400">{error}</p> : ''}
            {!success && !error ? (
              <form onSubmit={onSubmit}>
                <div className="px-4 mb-4">
                  <SimplePasswordTextField
                    label="パスワード"
                    id="password"
                    name="password"
                    {...password}
                  />
                </div>

                <div className="text-center">
                  <BlueButton type="submit">パスワード発行</BlueButton>
                </div>
              </form>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
