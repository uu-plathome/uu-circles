
import { NextPage } from 'next'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

const IndexPage: NextPage = () => {
  const authContext = useContext(AuthContext)

  return (
    <div>
      <p>HELLO</p>
    </div>
  )
}

export default IndexPage