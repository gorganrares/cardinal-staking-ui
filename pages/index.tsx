import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'

import Homepage from '../components/Homepage'
import StakePoolHome from './[stakePoolId]'

function Home() {
  const stakePoolMetadata = useStakePoolMetadataCtx()

  if (!stakePoolMetadata.isFetched) {
    return <></>
  }
  window.location.href = 'https://cattoshi.com'
  return (
    <div>
      {stakePoolMetadata.data ? (
        <StakePoolHome
          stakePoolMetadataName={stakePoolMetadata.data?.displayName ?? null}
        />
      ) : (
        <Homepage />
      )}
    </div>
  )
}

export default Home
