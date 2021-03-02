import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { useStringInput } from '@/hooks/useInput'
import { createAdminUser } from '@/infra/api/admin_user'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import {
    isRegisterAdminFormRequestValidationError,
    RegisterAdminFormRequest,
} from '@/lib/types/api/RegisterAdminFormRequest'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { __ } from '@/lang/ja'
import { Role } from '@/lib/enum/api/Role'
import Head from 'next/head'
import { AuthContext } from '@/contexts/AuthContext'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'

const CreatePage: NextPage = () => {
    const router = useRouter()
    const { role: ownRole } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const { isMd } = useMediaQuery()

    const username = useStringInput('')
    const displayName = useStringInput('')
    const email = useStringInput('')
    const role = useStringInput(Role.COMMON)

    useEffect(() => {
        if (!ownRole || ownRole === Role.COMMON) {
            router.push('/')
        }
    }, [])

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsOpen(true)

        const data = await createAdminUser({
            username: username.value,
            displayName: displayName.value,
            email: email.value,
            role: role.value,
        } as RegisterAdminFormRequest)

        if (isRegisterAdminFormRequestValidationError(data)) {
            username.setErrors(data.errors.username)
            displayName.setErrors(data.errors.displayName)
            email.setErrors(data.errors.email)
            role.setErrors(data.errors.role)
            setIsOpen(false)
            return
        }

        setIsOpen(false)
        await router.push('/user/admin')
    }

    const roleList = () => {
        if (ownRole === Role.SYSTEM) {
            return [
                { label: __(Role.SYSTEM, 'Role'), value: Role.SYSTEM },
                { label: __(Role.MANAGER, 'Role'), value: Role.MANAGER },
                { label: __(Role.COMMON, 'Role'), value: Role.COMMON },
            ]
        }

        return [
            { label: __(Role.MANAGER, 'Role'), value: Role.MANAGER },
            { label: __(Role.COMMON, 'Role'), value: Role.COMMON },
        ]
    }

    return (
        <div>
            <Head>
                <title>管理者アカウント新規作成</title>
            </Head>

            {isMd ? <BaseHeader /> : ''}

            <SubmitLoading isOpen={isOpen} />

            <BaseContainer>
                <BaseWrapper title="管理者アカウント新規作成">
                    <div className="border-2 border-gray-800 px-2 py-4">
                        <form onSubmit={onSubmit}>
                            <BaseTextField
                                label="メールアドレス"
                                name="email"
                                id="email"
                                required
                                expand
                                maxLength={255}
                                placeholder="example@example.com"
                                {...email}
                            />

                            <BaseTextField
                                label="ユーザー名"
                                name="username"
                                id="username"
                                prefix="@"
                                maxLength={30}
                                placeholder="u-ta"
                                note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
                                {...username}
                            />

                            <BaseTextField
                                label="表示名"
                                name="display_name"
                                id="display_name"
                                placeholder="宇都宮太郎"
                                maxLength={50}
                                note="入力がない場合は、自動で決まります"
                                {...displayName}
                            />

                            <BaseSelect
                                label="権限"
                                name="role"
                                id="role"
                                items={roleList()}
                                {...role}
                            />

                            <div className="flex justify-center mt-8">
                                <GreenButton type="submit">進む</GreenButton>
                            </div>
                        </form>
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default CreatePage
