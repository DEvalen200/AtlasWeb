// pages/_document.js

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet"/>
        {/*<!-- Open Graph / Facebook -->*/}
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://atletismeatlas.es"/>
        <meta property="og:title" content="CA Atlas &#127760;"/>
        <meta property="og:description" content="Punto de partida para unos nuevos ilímites."/>
        <meta property="og:image" content="/Link Preview/OG_Preview.png"/>
        {/*<!-- Twitter -->*/}
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://atletismeatlas.es"/>
        <meta property="twitter:title" content="CA Atlas &#127760;"/>
        <meta property="twitter:description" content="Punto de partida para unos nuevos ilímites."/>
        <meta property="twitter:image" content="/Link Preview/Twitter_Preview.png"/>


      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}