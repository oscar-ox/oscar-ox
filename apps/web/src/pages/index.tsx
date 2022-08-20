import type { NextPage } from 'next'

import Head from 'next/head'

import { useAuth, useToken } from '../common/hooks'
import Navbar from '../modules/containers/Navbar'

const Page: NextPage = () => {
  const { token } = useToken()
  const { loggedIn } = useAuth()

  return (
    <div>

      <Head>
        <title>OscarOx Ui</title>
      </Head>

      <Navbar />

      {token}
      {loggedIn ? "in" : "out"}
    </div>
  )
}

export default Page
