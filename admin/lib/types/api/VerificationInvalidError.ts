export interface VerificationInvalidError {
    status: string
    type: 'VerificationInvalidError'
}

export const isVerificationInvalidError = (v: any): v is VerificationInvalidError => v && v.type === 'VerificationInvalidError'
