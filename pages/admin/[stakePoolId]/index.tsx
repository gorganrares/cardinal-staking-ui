import { FooterSlim } from 'common/FooterSlim'
import { HeaderSlim } from 'common/HeaderSlim'
import { withCluster } from 'common/utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'
import { VscChevronLeft } from 'react-icons/vsc'

import { AdminStakePool } from '@/components/admin/AdminPool'

function Home() {
  const router = useRouter()
  const { environment } = useEnvironmentCtx()
  const { data: config } = useStakePoolMetadataCtx()

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
        />
      </Head>
      <HeaderSlim />
      <div className="container mx-auto flex-grow px-6">
        <div className="flex w-full">
          <div
            className="relative top-8 flex cursor-pointer items-center justify-center gap-2 text-2xl font-medium"
            onClick={() =>
              router.push(withCluster(`/admin`, environment.label))
            }
          >
            <VscChevronLeft />
            Back
          </div>
        </div>
        <AdminStakePool />
      </div>
      <FooterSlim />
    </div>
  )
}

export default Home
