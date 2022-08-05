import type { NextPage } from 'next'

import Head from 'next/head'

import Button from '../components/Button'
import Card from '../components/Card'

const Home: NextPage = () => {
  return (
    <div>

      <Head>
        <title>OscarOx Ui</title>
      </Head>

      <Button>Test</Button>

      <Card>Demo</Card>

      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>

    </div>
  )
}

export default Home
