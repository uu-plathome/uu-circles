
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { AuthContext } from '@/contexts/AuthContext'
import { useBooleanInput, useStringInput } from '@/hooks/useInput'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { getCircleUser, updateCircleUser } from '@/infra/api/circle_user'
import { isUpdateCircleUserRequestValidationError, UpdateCircleUserRequest } from '@/lib/types/api/UpdateCircleUserRequest'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { EditCircleUserForm } from '@/components/organisms/form/CircleUser/EditCircleUserForm'

const CreatePage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const router = useRouter()
    const { id, userId } = router.query

    const username = useStringInput('')
    const displayName = useStringInput('')
    const active = useBooleanInput(true)

    useEffect(() => {
        const f = async () => {
            const foundUser = await getCircleUser(Number(id), Number(userId), authContext.accessToken)
            username.set(foundUser.username)
            displayName.set(foundUser.displayName)
            active.set(foundUser.active)
        }

        if (authContext.accessToken) {
            f()
        }
    }, [ authContext.accessToken, id, userId ])

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
            } as UpdateCircleUserRequest, 
            authContext.accessToken
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
            <BaseHeader />

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