import Head from 'next/head'

export default ({ children }) => (
  <div>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }
      html,
      body,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      button {
        margin: 0;
        padding: 0;
        border: 0;
        font-weight: normal;
      }
      body {
        min-height: 100vh;
        font-size: 16px;
        font-family: 'Montserrat', sans-serif;
        line-height: 1;
        color: #1e3264;
        text-rendering: geometricPrecision;
        background-color: #f037a6;
        background: linear-gradient(145deg, #ffc867, #f037a6);
      }
      img {
        max-width: 100%;
      }
    `}</style>
    {children}
  </div>
)
