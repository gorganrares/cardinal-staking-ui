import { HeaderSlim } from 'common/HeaderSlim'
import Head from 'next/head'

import { StakePoolCreationFlow } from '@/components/stake-pool-creation/StakePoolCreationFlow'

const AdminCreatePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Cattoshi NFT staking</title>
        <meta name="title" content='Cattoshi NFT staking' />
        <meta
          name="description"
          content='Stake your Cattoshi Passport to win $COSHI'
        />
        <meta name="image" content="https://cattoshi.com/logo-o.png" />
        <meta
          name="og:image"
          content="https://cattoshi.com/logo-o.png"
        />
        <link
          rel="icon"
          href='https://cattoshi.com/logo-o.png'
        />
        <script
          defer
          data-domain="stake.cardinal.so"
          src="https://plausible.io/js/plausible.js"
        ></script>
      </Head>

      <HeaderSlim />
      <div className="container mx-auto w-full flex-grow px-6">
        <StakePoolCreationFlow />
      </div>
    </div>
  )
}

export default AdminCreatePage
