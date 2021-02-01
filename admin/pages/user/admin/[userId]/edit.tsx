
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseSidebar } from '@/components/layouts/BaseSidebar'
import { AuthContext } from '@/contexts/AuthContext'
import { useInput } from '@/hooks/useInput'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { getAdminUser, updateAdminUser } from '@/infra/api/admin_user'
import { isUpdateAdminUserRequestValidationError, UpdateAdminUserRequest } from '@/lib/types/api/UpdateAdminUserRequest'

const CreatePage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const router = useRouter()
    const { userId } = router.query

    const username = useInput('')
    const displayName = useInput('')
    const active = useInput('true')

    useEffect(() => {
        const f = async () => {
            const foundUser = await getAdminUser(Number(userId), authContext.accessToken)
            username.set(foundUser.username)
            displayName.set(foundUser.displayName)
            active.set(foundUser.active ? 'true' : 'false')
        }

        if (authContext.accessToken) {
            f()
        }
    }, [ authContext.accessToken, userId ])

    const onSubmit = async (event) => {
        event.preventDefault()

        const data = await updateAdminUser(
            Number(userId),
            {
                type: 'UpdateAdminUserRequest',
                username: username.value,
                displayName: displayName.value,
                active: active.value === 'true'
            } as UpdateAdminUserRequest, 
            authContext.accessToken
        )

        if (isUpdateAdminUserRequestValidationError(data)) {
            username.setError(data.errors.username && Array.isArray(data.errors.username) ? data.errors.username[0] : '')
            displayName.setError(data.errors.displayName && Array.isArray(data.errors.displayName) ? data.errors.displayName[0] : '')
            active.setError(data.errors.active && Array.isArray(data.errors.active) ? data.errors.active[0] : '')

            return
        }

        await router.push(`/user/admin`)
    }

    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-1/5">
                        <BaseSidebar />
                    </div>

                    <div className="w-full lg:w-4/5">
                        <div className="py-10">
                            <div className="flex justify-between mb-8">
                                <h1 className="text-2xl text-gray-100">
                                    管理者アカウント新規作成
                                </h1>
                            </div>

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
                        </div>
                    </div>
                </div>
            </BaseContainer>
        </div>
    )
}

export default CreatePage