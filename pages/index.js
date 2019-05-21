import dynamic from 'next/dynamic'
import Layout from '../components/Layout'
import { getArtists } from '../hooks/artists'

const ArtistsGraph = dynamic(() => import('../components/ArtistsGraph'), {
  ssr: false
})

const Loader = () => (
  <div className="wrapper">
    <style jsx>{`
      .wrapper {
        display: flex;
        min-height: 100vh;
      }

      .content {
        margin: auto;
        padding: 1rem;
        max-width: 400px;
        width: 100%;
        text-align: center;
      }

      p {
        font-weight: 700;
        font-size: 3rem;
        margin-bottom: 2.3rem;
      }
    `}</style>
    <div className="content">
      <p>Loading...</p>
    </div>
  </div>
)

export default () => {
  const artists = getArtists()

  return (
    <Layout>
      {!artists && <Loader />}
      {artists && <ArtistsGraph artists={artists} />}
    </Layout>
  )
}
