import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { BlueButton } from '@/src/components/atoms/buttons/BlueButton'
import { GreenButton } from '@/src/components/atoms/buttons/GreenButton'
import { SimplePasswordTextField } from '@/src/components/atoms/form/SimplePasswordTextField'
import { AuthHeader } from '@/src/components/layouts/AuthHeader'
import { AuthContext } from '@/src/contexts/AuthContext'
import { useInput } from '@/src/hooks/useInput'
import { checkVerify, verifyPassword } from '@/src/lib/infra/api/auth'
import { isVerificationConfirmRequestValidationError } from '@/src/lib/types/api/VerificationConfirmRequest'
import { isVerificationInvalidError } from '@/src/lib/types/api/VerificationInvalidError'

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
    ; (async () => {
      if (
        !Array.isArray(id) &&
        Number.isInteger(Number(id)) &&
        !Array.isArray(expires) &&
        !Array.isArray(signature)
      ) {
        const data = await checkVerify(Number(id), expires, signature)

        if (isVerificationInvalidError(data)) {
          setError(data.status)
          return
        }
      }
    })()
  }, [id, expires, signature])

  const onSubmit = async (event) => {
    event.preventDefault()

    if (
      !Array.isArray(id) &&
      !Array.isArray(expires) &&
      !Array.isArray(signature)
    ) {
      const data = await verifyPassword(
        Number(id),
        password.value,
        expires,
        signature
      )

      if (data.type === 'success') {
        setSuccess(true)
        return
      }

      if (isVerificationInvalidError(data)) {
        setError(data.status)
        return
      }

      if (isVerificationConfirmRequestValidationError(data)) {
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
      <Head>
        <title>パスワード設定</title>
      </Head>

      <AuthHeader />

      <div className="xl:container">
        <div className="mx-auto mt-16 max-w-screen-md">
          <div className="p-4 rounded border-2 border-white">
            <h1 className="mb-4 text-2xl text-center text-white">
              パスワード設定
            </h1>

            {success ? (
              <div>
                <p className="text-white">パスワードを設定しました</p>

                <div className="text-center">
                  <GreenButton href="/auth/login">ログインへ</GreenButton>
                </div>
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
