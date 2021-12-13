interface EmailHeaders {
  to?: string
  cc?: string
  bcc?: string
  subject?: string
  body?: string
}

export interface ObfuscateProps {
  element?: React.ReactElement
  tel?: string
  sms?: string
  facetime?: string
  email?: string
  href?: string
  headers?: EmailHeaders
  obfuscate?: boolean
  obfuscateChildren?: boolean
  linkText?: string
}
