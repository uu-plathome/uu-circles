import { AuthHeader } from '@/components/layouts/AuthHeader'
import { BlueButton } from '@/components/atoms/buttons/BlueButton'
import { resetPassword } from '@/infra/api/auth'
import { useInput } from '@/hooks/useInput'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { isResetPasswordAdminRequestValidationError } from '@/lib/types/api/ResetPasswordAdminRequest'
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import Head from 'next/head'
import { SimplePasswordTextField } from '@/components/atoms/form/SimplePasswordTextField'

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
            type: 'ResetPasswordAdminRequest',
            email,
            token,
            password: password.value,
        })

        if (isResetPasswordAdminRequestValidationError(data)) {
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
            <Head>
                <title>新しいパスワード</title>
            </Head>

            <AuthHeader />

            <div className="xl:container">
                <div className="max-w-screen-md mx-auto mt-16">
                    <div className="border-2 border-white rounded p-4">
                        <h1 className="text-white text-center text-2xl mb-4">
                            新しいパスワード
                        </h1>

                        {error ? (
                            <div className="p-4 mb-4">
                                <p className="text-white text-lg">
                                    <FontAwesomeIcon
                                        icon={faExclamationTriangle}
                                        color="red"
                                    />{' '}
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
                                    <BlueButton type="submit">
                                        パスワードを変更
                                    </BlueButton>
                                </div>
                            </form>
                        ) : (
                            <div>
                                <p className="text-white">
                                    パスワードを変更しました。ログイン画面へ進んでください。
                                </p>

                                <div className="text-center">
                                    <GreenButton href="/auth/PasswordConfirmPage">
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
