import Head from 'next/head'
import Image from 'next/image'
import Hero from '../../components/Hero'


export default function Home() {
  return (
    <div>
      <Head>
        <title>CA Atlas</title>
        <meta name="description" content="Club Atletisme Atlas" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero/>
    </div>
    
  )

}
