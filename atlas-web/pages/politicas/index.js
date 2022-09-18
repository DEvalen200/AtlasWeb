import Head from 'next/head'
import Politicas from '../../components/Politicas'
/*import fs from 'fs'
import path from 'path';


export async function getStaticProps() {
  var proteccionDatos = "NULL";
  var derechoImagen = "NULL";

  const dev = process.env.NODE_ENV !== 'production';
  const server = dev ? 'http://localhost:9000' : 'https://atletismeatlas.es';
  
  proteccionDatos = await (await (await fetch(path.join(server, 'proteccionDatos.html' ))).text());
  derechoImagen = await (await (await fetch(path.join(server, 'derechoImagen.html' ))).text());

  return {
    props: {  proteccionDatos, derechoImagen },
  };

}
*/

export default function Home(/*{ proteccionDatos, derechoImagen }*/) {
  return (
    <div>
      <Head>
        <title>CA Atlas &#127760; | Políticas</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui" />
        <meta name="description" content="Políticas del Club Atletisme Atlas &#127760;" />
        {/*<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>*/}
        <link rel="icon" href="/favicon/favicon.ico" />

        {/*<!-- Open Graph / Facebook -->*/}
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://atletismeatlas.es/politicas"/>
        <meta property="og:title" content="Políticas del Club Atletisme Atlas &#127760;"/>
        <meta property="og:description" content="Punto de partida para unos nuevos ilímites."/>
        <meta property="og:image" content="https://atletismeatlas.es/Link%20Preview/OG_Preview.png"/>
        <meta property="og:site_name" content="Políticas del Club Atletisme Atlas &#127760;"/>
        {/*<!-- Twitter -->*/}
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:image" content="https://atletismeatlas.es/Link%20Preview/Twitter_Preview.png"/>
      </Head>
      <Politicas /*proteccionDatos={proteccionDatos} derechoImagen={derechoImagen}*//>
    </div>
    
  )

}
