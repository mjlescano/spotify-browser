import qs from 'query-string'
import Layout from '../components/Layout'
import { loadTokenFromHash } from '../hooks/auth'

const Authorize = () => {
  const isLoading = loadTokenFromHash()

  return (
    <Layout>
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

        h1 {
          font-weight: 700;
          font-size: 3rem;
          margin-bottom: 2.3rem;
        }

        .authorize {
          border: solid 3px #ffffff;
          border-radius: 1.875rem;
          padding: 1.2rem 3.4375rem;
          font-size: 1rem;
          color: #fff;
          font-style: normal;
          font-weight: 700;
          letter-spacing: 0.0625rem;
          background: #ffffff;
          display: inline-block;
          text-align: center;
          cursor: pointer;
          overflow: hidden;
          text-decoration: none;
          text-transform: uppercase;
          background-color: transparent;
        }

        .authorize:hover {
          color: inherit;
          background-color: #fff;
        }
      `}</style>
      <div className="wrapper">
        {!isLoading && (
          <div className="content">
            <h1>Spotify Browser</h1>
            <a
              className="authorize"
              href={`https://accounts.spotify.com/authorize?${qs.stringify({
                response_type: 'token',
                scope: 'user-follow-read',
                client_id: process.env.CLIENT_ID,
                redirect_uri: `${process.env.HOSTNAME}/authorize`
              })}`}
            >
              Authorize
            </a>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Authorize
