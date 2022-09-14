import Head from 'next/head'
import Image from 'next/image'
import Hero from '../components/Hero'
import Script from 'next/script'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Club Atletisme Atlas &#127760;</title>
        <meta name="description" content="Página web del Club Atletisme Atlas &#127760;" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <link rel="icon" href="/favicon.ico" />

        {/*<!-- Open Graph / Facebook -->*/}
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://atletismeatlas.es"/>
        <meta property="og:title" content="Club Atletisme Atlas &#127760;"/>
        <meta property="og:description" content="Punto de partida para unos nuevos ilímites."/>
        <meta property="og:image" content="https://atletismeatlas.es/Link%20Preview/OG_Preview.png"/>
        <meta property="og:site_name" content="Club Atletisme Atlas &#127760;"/>
        {/*<!-- Twitter -->*/}
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:image" content="https://atletismeatlas.es/Link%20Preview/Twitter_Preview.png"/>

      </Head>
      <Link href="/politicas"><a></a></Link>
      <Link href="/solicitud-socio"><a></a></Link>
      <Script src='/customRedirect.js' />
    </div>
  )
}
