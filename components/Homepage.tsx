import { Banner } from 'common/Banner'
import { FooterSlim } from 'common/FooterSlim'
import { useAllStakePools } from 'hooks/useAllStakePools'
import Head from 'next/head'

import { CollectionsView } from './CollectionsView'
import { MainHero } from './MainHero'

function Homepage() {
  const allStakePools = useAllStakePools()
  
  return (
    <div className="bg-dark-5">
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

      <Banner />
      <MainHero />
      <div className="mx-auto flex flex-col gap-16 px-8 md:px-16">
        <CollectionsView
          configs={allStakePools.data?.stakePoolsWithMetadata.filter(
            (pool) =>
              !(
                pool.stakePoolMetadata?.hidden ||
                pool.stakePoolMetadata?.notFound
              )
          )}
        />
        <CollectionsView
          configs={allStakePools.data?.stakePoolsWithoutMetadata}
        />
      </div>
      <FooterSlim />
    </div>
  )
}

export default Homepage
