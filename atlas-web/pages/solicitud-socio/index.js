import Head from 'next/head'
import Image from 'next/image'
import Hero from '../../components/Hero'


export default function Home() {
  return (
    <div>
      <Head>
        <title>CA Atlas &#127760; | Solicitud Socio</title>
        <meta charset="UTF-8"/>
        <meta name="description" content="Portal de Solicitud de Socio del Club Atletisme Atlas &#127760;" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <link rel="icon" href="/favicon/favicon.ico" />

        {/*<!-- Open Graph / Facebook -->*/}
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://atletismeatlas.es/solicitud-socio"/>
        <meta property="og:title" content="CA Atlas &#127760;"/>
        <meta property="og:description" content="Punto de partida para unos nuevos ilímites."/>
        <meta property="og:image" content="https://atletismeatlas.es/Link%20Preview/OG_Preview.png"/>
        <meta property="og:site_name" content="CA Atlas &#127760;"/>
        {/*<!-- Twitter -->*/}
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:image" content="https://atletismeatlas.es/Link%20Preview/Twitter_Preview.png"/>
      </Head>
      <Hero/>
    </div>
    
  )

}
