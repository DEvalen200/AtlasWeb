import Head from 'next/head'
import Image from 'next/image'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Club Atletisme Atlas</title>
        <meta name="description" content="Página web del Club Atletisme Atlas &#127760;" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <link rel="icon" href="/favicon.ico" />

        {/*<!-- Open Graph / Facebook -->*/}
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://atletismeatlas.es"/>
        <meta property="og:title" content="CA Atlas &#127760;"/>
        <meta property="og:description" content="Punto de partida para unos nuevos ilímites."/>
        <meta property="og:image" content="https://atletismeatlas.es/Link Preview/OG_Preview.png"/>
        <meta property="og:site_name" content="CA Atlas &#127760;"/>
        {/*<!-- Twitter -->*/}
        <meta property="twitter:card" content="summary_large_image"/>

      </Head>
    </div>
  )
}
