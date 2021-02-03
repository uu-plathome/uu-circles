
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
import { getCircleUser, updateCircleUser } from '@/infra/api/circle_user'
import { isUpdateCircleUserRequestValidationError, UpdateCircleUserRequest } from '@/lib/types/api/UpdateCircleUserRequest'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'

const CreatePage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const router = useRouter()
    const { id, userId } = router.query

    const username = useInput('')
    const displayName = useInput('')
    const active = useInput('true')

    useEffect(() => {
        const f = async () => {
            const foundUser = await getCircleUser(Number(id), Number(userId), authContext.accessToken)
            username.set(foundUser.username)
            displayName.set(foundUser.displayName)
            active.set(foundUser.active ? 'true' : 'false')
        }

        if (authContext.accessToken) {
            f()
        }
    }, [ authContext.accessToken, id, userId ])

    const onSubmit = async (event) => {
        event.preventDefault()

        const data = await updateCircleUser(
            Number(id),
            Number(userId),
            {
                type: 'UpdateCircleUserRequest',
                username: username.value,
                displayName: displayName.value,
                active: active.value === 'true'
            } as UpdateCircleUserRequest, 
            authContext.accessToken
        )

        if (isUpdateCircleUserRequestValidationError(data)) {
            username.setError(data.errors.username && Array.isArray(data.errors.username) ? data.errors.username[0] : '')
            displayName.setError(data.errors.displayName && Array.isArray(data.errors.displayName) ? data.errors.displayName[0] : '')
            active.setError(data.errors.active && Array.isArray(data.errors.active) ? data.errors.active[0] : '')

            return
        }

        await router.push(`/circle/${id}/user`)
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