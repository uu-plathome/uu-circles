
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { AuthContext } from '@/contexts/AuthContext'
import { useBooleanInput, useStringInput } from '@/hooks/useInput'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { getAdminUser, updateAdminUser } from '@/infra/api/admin_user'
import { isUpdateAdminUserRequestValidationError, UpdateAdminUserRequest } from '@/lib/types/api/UpdateAdminUserRequest'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'

const CreatePage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const router = useRouter()
    const { userId } = router.query

    const username = useStringInput('')
    const displayName = useStringInput('')
    const active = useBooleanInput(true)

    useEffect(() => {
        const f = async () => {
            const foundUser = await getAdminUser(Number(userId), authContext.accessToken)
            username.set(foundUser.username)
            displayName.set(foundUser.displayName)
            active.set(foundUser.active)
        }

        if (authContext.accessToken) {
            f()
        }
    }, [ authContext.accessToken, userId ])

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = await updateAdminUser(
            Number(userId),
            {
                type: 'UpdateAdminUserRequest',
                username: username.value,
                displayName: displayName.value,
                active: active.toBoolean
            } as UpdateAdminUserRequest, 
            authContext.accessToken
        )

        if (isUpdateAdminUserRequestValidationError(data)) {
            username.setErrors(data.errors.username)
            displayName.setErrors(data.errors.displayName)
            active.setErrors(data.errors.active)
            return
        }

        await router.push(`/user/admin`)
    }

    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <BaseWrapper
                    title="管理者アカウント編集"
                >
                    <div className="border-2 border-gray-800 px-2 py-4">
                        <form onSubmit={onSubmit}>
                            <BaseTextField
                                label="ユーザー名"
                                name="username"
                                id="username"
                                required
                                note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
                                { ...username }
                            />

                            <BaseTextField
                                label="表示名"
                                name="display_name"
                                id="display_name"
                                placeholder="u-lab"
                                required
                                note="入力がない場合は、自動で決まります"
                                { ...displayName }
                            />

                            <BaseSelect
                                label="アカウントが有効かどうか"
                                name="active"
                                id="active"
                                required
                                items={[
                                    { value: 'true', label: '有効' },
                                    { value: 'false', label: '無効' },
                                ]}
                                { ...active }
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