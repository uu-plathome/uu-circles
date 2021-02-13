import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { useStringInput } from '@/hooks/useInput'
import { createAdminUser } from '@/infra/api/admin_user'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { isRegisterAdminFormRequestValidationError, RegisterAdminFormRequest } from '@/lib/types/api/RegisterAdminFormRequest'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const CreatePage: NextPage = () => {
    const router = useRouter()
    const { isMd } = useMediaQuery()

    const username = useStringInput('')
    const displayName = useStringInput('')
    const email = useStringInput('')

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = await createAdminUser({
            username: username.value,
            displayName: displayName.value,
            email: email.value
        } as RegisterAdminFormRequest)

        if (isRegisterAdminFormRequestValidationError(data)) {
            username.setErrors(data.errors.username)
            displayName.setErrors(data.errors.displayName)
            email.setErrors(data.errors.email)
            return
        }

        await router.push('/user/admin')
    }

    return (
        <div>
            {isMd ? (
                <BaseHeader />
            ) : ''}

            <BaseContainer>
                <BaseWrapper
                    title="管理者アカウント新規作成"
                >
                    <div className="border-2 border-gray-800 px-2 py-4">
                        <form onSubmit={onSubmit}>
                            <BaseTextField
                                label="メールアドレス"
                                name="email"
                                id="email"
                                required
                                expand
                                placeholder="example@example.com"
                                { ...email }
                            />

                            <BaseTextField
                                label="ユーザー名"
                                name="username"
                                id="username"
                                prefix="@"
                                placeholder="u-ta"
                                note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
                                { ...username }
                            />

                            <BaseTextField
                                label="表示名"
                                name="display_name"
                                id="display_name"
                                placeholder="宇都宮太郎"
                                note="入力がない場合は、自動で決まります"
                                { ...displayName }
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