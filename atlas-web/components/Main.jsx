import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram, faTwitter, faFacebook, faTiktok} from '@fortawesome/free-brands-svg-icons'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer'
import RouterLink from './RouterLink'
import Link from 'next/link'
import { useEffect } from 'react'


function moveToAnchor(ancla)
{
  var temp =   document.getElementById("navList").getElementsByTagName("li");
  for (let i = 0; i < temp.length; i++) {
    if (temp[i].classList.contains("selectedItem"))
    {
      temp[i].classList.remove("selectedItem");
    }
  }
  document.getElementById(ancla).classList.add("selectedItem");

  removeHash();

}

function removeHash () { 
  history.pushState("", document.title, window.location.pathname
                                                     + window.location.search);
}

function changeAnchor(ancla)
{
  var temp =   document.getElementById("navList").getElementsByTagName("li");
  for (let i = 0; i < temp.length; i++) {
    if (temp[i].classList.contains("selectedItem"))
    {
      temp[i].classList.remove("selectedItem");
    }
  }
  document.getElementById(ancla).classList.add("selectedItem");
}

const scrollHandler = () => {

  //let menu = document.querySelector('.Menu')

  var A = document.getElementById('InicioAnchor')
  var B = document.getElementById('QuienesAnchor')
  var C = document.getElementById('QueAnchor')
  var D = document.getElementById('HorarioAnchor')
  var E = document.getElementById('ContactoAnchor')

  var divOffset = -window.innerHeight/3;
  var pos_menu = scrollY

  var pos_A = A.offsetTop + A.offsetHeight + divOffset
  var pos_B = B.offsetTop + B.offsetHeight + divOffset
  var pos_C = C.offsetTop + C.offsetHeight + divOffset
  var pos_D = D.offsetTop + D.offsetHeight + divOffset
  var pos_E = E.offsetTop + E.offsetHeight + divOffset
  
  var distance_A = pos_A - pos_menu
  var distance_B = pos_B - pos_menu
  var distance_C = pos_C - pos_menu
  var distance_D = pos_D - pos_menu
  var distance_E = pos_E - pos_menu

  let min = Math.min(...[distance_A, distance_B, distance_C, distance_D, distance_E].filter(num => num > 0))

  if(min === distance_A) changeAnchor('Inicio');
  if(min === distance_B) changeAnchor('Quienes');
  if(min === distance_C) changeAnchor('Que');
  if(min === distance_D) changeAnchor('Horario');
  if(min === distance_E) changeAnchor('Contacto');
  /*if(min === distance_A) document.querySelectorAll('.Menu .Item')[0].classList.add('selectedItem')
  if(min === distance_B) document.querySelectorAll('.Menu .Item')[1].classList.add('selectedItem')
  if(min === distance_C) document.querySelectorAll('.Menu .Item')[2].classList.add('selectedItem')*/

}

const Main = () => {

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
        window.removeEventListener('scroll', scrollHandler)
    }
  })

  return (
    <div className='mainBackground min-w-[100%]'>
        <nav className='absolute w-[100%] flex justify-end items-center navBar h-fit px-4 shadow-2xl'>
            <div className='mr-auto pl-6 py-4 w-28 noselect'><img src="img/Logo_Alternativo_Letras.png" alt="/" className='h-full'/></div>
            <ul className='flex justify-around text-[#008080] text-xl font-medium offsetForScrollbarWidth' id='navList'>
                <li onClick={() => moveToAnchor("Inicio")} id="Inicio" className='selectedItem'><Link href="#InicioAnchor" ><a>INICIO</a></Link></li>
                <li onClick={() => moveToAnchor("Quienes")} id="Quienes" className=''><Link href="#QuienesAnchor" ><a>¿QUIÉNES SOMOS?</a></Link></li>
                <li onClick={() => moveToAnchor("Que")} id="Que" className=''><Link href="#QueAnchor" ><a>¿QUÉ HACEMOS?</a></Link></li>
                <li onClick={() => moveToAnchor("Horario")} id="Horario" className=''><Link href="#HorarioAnchor" ><a>HORARIO</a></Link></li>
                <li onClick={() => moveToAnchor("Contacto")} id="Contacto" className=''><Link href="#ContactoAnchor" ><a>CONTACTO</a></Link></li>
                <li id="Mas" className='dropdown'><a className='dropdown-a'>MÁS <FontAwesomeIcon icon={faAngleDown} className=''/></a>
                  <div className='dropdown-content text-base'>
                    <div onClick={() => moveToAnchor("Galeria")} id="Galeria"><a href="#"  className='dropdown-item block'>GALERÍA</a></div>
                    <div onClick={() => moveToAnchor("Nuestros")} id="Nuestros" ><a href="#" className='dropdown-item block'>NUESTROS COLORES</a></div>
                    <div onClick={() => moveToAnchor("Records")} id="Records" ><a href="#" className='dropdown-item block'>RÉCORDS DEL CLUB</a></div>
                  </div>
                </li>
            </ul>
        </nav>


    {/* Inicio Div */}
    <div className='max-w-[2560px] m-auto offsetForScrollbarWidth' id='InicioAnchor'>
          <div className=' min-h-screen pt-24 flex items-start w-full'>
            <div className='h-auto w-full ml-[3%] mt-[3%] relative'>
              <img src="/img/Logo_MainPage.png" alt="/" className='mainImageAnim max-w-[60%]' />

              <div className='customBlendParent absolute top-[70%] left-[32%] whitespace-nowrap '>
                  <div className='customBlend px-4 py-1 '> 
                    <span className='laptop:text-2xl desktop:text-3xl noselect'>"Punto de partida para unos nuevos ilímites"</span>
                  </div>
              </div>

              <div className='absolute top-[10%] right-12'>
                <a href="https://www.instagram.com/atletismeatlas/" target={"_blank"} className='btn drop-shadow-xl'> <div className='icon'><FontAwesomeIcon icon={faInstagram} className='fa-3x'/></div></a>
                <a href="https://facebook.com/AtletismeAtlas" target={"_blank"} className='btn twitter drop-shadow-xl'><div className='icon'><FontAwesomeIcon icon={faFacebook} className='fa-3x'/></div></a>
                <a className='btn drop-shadow-xl'><div className='icon'><FontAwesomeIcon icon={faTiktok} className='fa-2x'/></div></a>
              </div>

              <div  onClick={() =>removeHash()} >
              <Link href="#QuienesAnchor" ><a className='cursor-pointer noselect animGradient shadow-2xl absolute -bottom-16 right-12 text-white text-4xl bg-teal-700 rounded-full py-8 px-16'>
                              CONTINUAR <FontAwesomeIcon icon={faAngleDown} className='animBounce'/>
                            </a></Link>
              </div>


            </div>

          </div>
      </div>

    {/* ¿Quiénes somos? */}
    <div className='max-w-[2560px] m-auto offsetForScrollbarWidth' id='QuienesAnchor'>
      <div className='h-screen pt-24 w-full flex flex-col'>
        <div className='text-center w-fit mx-auto px-4 mb-8 text-[50px] dalek text-teal-900 rounded-full glass noselect'>¿Quiénes somos?</div>
        
        <div className='absolute h-screen w-screen'>
        <img src="/img/Placeholder1920.png" alt="/" className='absolute w-[1000px] left-1/2 top-1/2 mt-[-300px] ml-[-505px] '/>
        </div>

        <div className='flex text-center h-full mb-10 '>
          <div className='darkglass mx-10 h-[40%] flex-1 rounded-3xl text-justify'>
            <p className='p-8'></p>
          </div>
          <div className=' self-center flex-1 min-w-[720px] '>

          </div>
          <div className='darkglass mx-10 h-[40%] flex-1 rounded-3xl self-end'>
            <p className='p-8'></p>
          </div>
        </div>
      </div>
    </div>

    {/* ¿Qué hacemos? */}
    <div className='max-w-[2560px] m-auto offsetForScrollbarWidth' id='QueAnchor'>
      <div className=' min-h-screen pt-24 flex items-start w-full'>
      ¿Qué hacemos?
      </div>
    </div>

    {/* Horario */}
    <div className='max-w-[2560px] m-auto offsetForScrollbarWidth' id='HorarioAnchor'>
      <div className=' min-h-screen pt-24 flex items-start w-full'>
        Horario
      </div>
    </div>

    {/* Contacto */}
    <div className='max-w-[2560px] m-auto offsetForScrollbarWidth' id='ContactoAnchor'>
      <div className=' min-h-screen pt-24 flex items-start w-full'>
        Contacto
      </div>
    </div>

    {/* Footer */}
      <Footer/>
    </div>
  )
}

export default Main