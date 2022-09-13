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
      </Head>
      <Hero/>
    </div>
    
  )

}
