import { AuthHeader } from "@/components/layouts/AuthHeader"
import { BlueButton } from "@/components/atoms/buttons/BlueButton"
import { BaseTextField } from "@/components/atoms/form/BaseTextField"
import { login } from "@/infra/api/auth"
import { useInput } from "@/hooks/useInput"
import { NextPage } from "next"
import { useRouter } from 'next/router'
import { useContext, useState } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { isLoginAdminFormRequestValidationError, LoginAdminFormRequest } from "@/lib/types/api/LoginAdminFormRequest"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"

const Login: NextPage = () => {
    const usernameOrEmail = useInput('')
    const password = useInput('')
    const [error, setError] = useState('ログインに失敗しました')
    const router = useRouter()
    const authContext = useContext(AuthContext)

    if (authContext.accessToken) {
        router.push('/')
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        setError('')

        const data = await login({
            usernameOrEmail: usernameOrEmail.value,
            password: password.value
        } as LoginAdminFormRequest)

        if (isLoginAdminFormRequestValidationError(data)) {
            usernameOrEmail.setError(data.errors.usernameOrEmail && Array.isArray(data.errors.usernameOrEmail) ? data.errors.usernameOrEmail[0] : '')
            password.setError(data.errors.password && Array.isArray(data.errors.password) ? data.errors.password[0] : '')            
            return
        }

        if (data && data.type === 'LoginAdminMainFormRequestValidationError') {
            if (data.errors.data) {
                setError(data.errors.data)
            }
            return
        }

        authContext.setAccessToken(data.apiToken)
        localStorage.setItem('accessToken', data.apiToken)
        await router.push('/')
    }

    return (
        <div>
            <AuthHeader />

            <div className="xl:container">
                <div className="max-w-screen-md mx-auto mt-16">
                    <div className="border-2 border-white rounded p-4">
                        <h1 className="text-white text-center text-2xl mb-4">ログイン</h1>

                        {error ? (
                            <div className="p-4 mb-4">
                                <p className="text-white text-lg">
                                    <FontAwesomeIcon icon={ faExclamationTriangle } color="red" /> { error }
                                </p>
                            </div>
                        ) : ''}

                        <form onSubmit={onSubmit}>
                            <div className="px-4 mb-4">
                                <BaseTextField
                                    label="メールアドレスかユーザー名"
                                    id="username_or_email"
                                    name="username_or_email"
                                    expand
                                    { ...usernameOrEmail }
                                />

                                <BaseTextField
                                    label="パスワード"
                                    id="password"
                                    name="password"
                                    expand
                                    { ...password }
                                />
                            </div>

                            <div className="text-center">
                                <BlueButton type="submit">
                                    ログイン
                                </BlueButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
