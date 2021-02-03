
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { AuthContext } from '@/contexts/AuthContext'
import { useStringInput } from '@/hooks/useInput'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useContext } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { createCircleUser } from '@/infra/api/circle_user'
import { isRegisterCircleUserRequestValidationError, RegisterCircleUserRequest } from '@/lib/types/api/RegisterCircleUserRequest'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'

const CreatePage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const router = useRouter()
    const { id } = router.query

    const username = useStringInput('')
    const displayName = useStringInput('')
    const email = useStringInput('')

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = await createCircleUser(
            Number(id),
            {
                type: 'RegisterCircleUserRequest',
                username: username.value,
                displayName: displayName.value,
                email: email.value
            } as RegisterCircleUserRequest, 
            authContext.accessToken
        )

        if (isRegisterCircleUserRequestValidationError(data)) {
            username.setErrors(data.errors.username)
            displayName.setErrors(data.errors.displayName)
            email.setErrors(data.errors.email)

            return
        }

        await router.push('/circle')
    }

    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <BaseWrapper
                    title="サークルアカウント新規作成"
                >
                    <div className="border-2 border-gray-800 px-2 py-4">
                        <form onSubmit={onSubmit}>
                            <BaseTextField
                                label="ユーザー名"
                                name="username"
                                id="username"
                                note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
                                { ...username }
                            />

                            <BaseTextField
                                label="表示名"
                                name="display_name"
                                id="display_name"
                                placeholder="u-lab"
                                note="入力がない場合は、自動で決まります"
                                { ...displayName }
                            />

                            <BaseTextField
                                label="メールアドレス"
                                name="email"
                                id="email"
                                required
                                placeholder="example@example.com"
                                { ...email }
                            />

                            <div className="flex justify-center mt-8">
                                <GreenButton type="submit">
                                    進む
                                </GreenButton>
                            </div>
                        </form>
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default CreatePage