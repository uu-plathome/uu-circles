import { AdminHeader } from "@/components/layouts/AdminHeader"
import { BlueButton } from "@/components/atoms/buttons/BlueButton"
import { BaseTextField } from "@/components/atoms/form/BaseTextField"
import { login } from "@/infra/api/auth"
import { useInput } from "@/hooks/useInput"
import { NextPage } from "next"
import { useRouter } from 'next/router'


const Login: NextPage = () => {
    const usernameOrEmail = useInput('')
    const password = useInput('')
    const router = useRouter()

    const onSubmit = async (event) => {
        event.preventDefault()

        await login({
            usernameOrEmail: usernameOrEmail.value,
            password: password.value
        })

        await router.push('/')
    }

    return (
        <div>
            <AdminHeader />

            <div className="xl:container">
                <div className="max-w-screen-md mx-auto mt-16">
                    <div className="border-2 border-white rounded p-4">
                        <h1 className="text-white text-center text-2xl mb-4">ログイン</h1>

                        <form onSubmit={onSubmit}>
                            <div className="px-4 mb-4">
                                <BaseTextField
                                    label="メールアドレスかユーザー名"
                                    id="username_or_email"
                                    name="username_or_email"
                                    { ...usernameOrEmail }
                                />

                                <BaseTextField
                                    label="パスワード"
                                    id="password"
                                    name="password"
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
