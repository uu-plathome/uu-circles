import { FormEvent, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { useBooleanInput, useStringInput } from '@/hooks/useInput'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { getCircleUser, updateCircleUser } from '@/infra/api/circle_user'
import { isUpdateCircleUserRequestValidationError, UpdateCircleUserRequest } from '@/lib/types/api/UpdateCircleUserRequest'
import { EditCircleUserForm } from '@/components/organisms/form/CircleUser/EditCircleUserForm'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const CreatePage: NextPage = () => {
    const router = useRouter()
    const { id, userId } = router.query
    const { isMd } = useMediaQuery()

    const username = useStringInput('')
    const displayName = useStringInput('')
    const active = useBooleanInput(true)

    useEffect(() => {
        const f = async () => {
            const foundUser = await getCircleUser(Number(id), Number(userId))
            username.set(foundUser.username)
            displayName.set(foundUser.displayName)
            active.set(foundUser.active)
        }

        f()
    }, [ id, userId ])

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = await updateCircleUser(
            Number(id),
            Number(userId),
            {
                type: 'UpdateCircleUserRequest',
                username: username.value,
                displayName: displayName.value,
                active: active.toBoolean
            } as UpdateCircleUserRequest
        )

        if (isUpdateCircleUserRequestValidationError(data)) {
            username.setErrors(data.errors.username)
            displayName.setErrors(data.errors.displayName)
            active.setErrors(data.errors.active)

            return
        }

        await router.push(`/circle/${id}/user`)
    }

    return (
        <div>
            {isMd ? (
                <BaseHeader />
            ) : ''}

            <BaseContainer>
                <BaseWrapper
                    title="サークルアカウント編集"
                >
                    <div className="border-2 border-gray-800 px-2 py-4">
                        <EditCircleUserForm
                            onSubmit={onSubmit}
                            form={{
                                username,
                                displayName,
                                active,
                            }}
                        />
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default CreatePage