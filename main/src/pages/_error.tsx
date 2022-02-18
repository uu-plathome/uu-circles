import { NextPage } from 'next'
import React from 'react'
import { Bugsnag } from '@/src/lib/utils/Bugsnag'

interface Props {
  statusCode: number | undefined;
}
const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  if (res) {
    const statusCode = res.statusCode
    if (statusCode !== 404 && err?.message) Bugsnag.notify(err?.message)
    return { statusCode }
  }

  if (err) {
    const statusCode = err.statusCode
    if (statusCode !== 404 && err?.message) Bugsnag.notify(err?.message)
    return { statusCode }
  }

  Bugsnag.notify("An error occurred on _error.tsx")
  return { statusCode: 500 }
}

export default Error
