import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram, faTwitter, faFacebook, faTiktok} from '@fortawesome/free-brands-svg-icons'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer'
import RouterLink from './RouterLink'
import Link from 'next/link'
import { useEffect } from 'react'
import QuienesSomos_1 from './QuienesSomos_1'
import QuienesSomos_2 from './QuienesSomos_2'
import DescripcionDani from './DescripcionDani'
import DescripcionSergi from './DescripcionSergi'
import DescripcionValentin from './DescripcionValentin'

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
  var B = document.getElementById('EquipoAnchor')
  var C = document.getElementById('QuienesAnchor')
  var D = document.getElementById('QueAnchor')
  var E = document.getElementById('HorarioAnchor')
  var F = document.getElementById('ContactoAnchor')

  var divOffset = -window.innerHeight/3;
  var pos_menu = scrollY

  var pos_A = A.offsetTop + A.offsetHeight + divOffset
  var pos_B = B.offsetTop + B.offsetHeight + divOffset
  var pos_C = C.offsetTop + C.offsetHeight + divOffset
  var pos_D = D.offsetTop + D.offsetHeight + divOffset
  var pos_E = E.offsetTop + E.offsetHeight + divOffset
  var pos_F = F.offsetTop + F.offsetHeight + divOffset
  
  var distance_A = pos_A - pos_menu
  var distance_B = pos_B - pos_menu
  var distance_C = pos_C - pos_menu
  var distance_D = pos_D - pos_menu
  var distance_E = pos_E - pos_menu
  var distance_F = pos_F - pos_menu

  let min = Math.min(...[distance_A, distance_B, distance_C, distance_D, distance_E, distance_F].filter(num => num > 0))

  if(min === distance_A) changeAnchor('Inicio');
  if(min === distance_B) changeAnchor('Equipo');
  if(min === distance_C) changeAnchor('Quienes');
  if(min === distance_D) changeAnchor('Que');
  if(min === distance_E) changeAnchor('Horario');
  if(min === distance_F) changeAnchor('Contacto');
  /*if(min === distance_A) document.querySelectorAll('.Menu .Item')[0].classList.add('selectedItem')
  if(min === distance_B) document.querySelectorAll('.Menu .Item')[1].classList.add('selectedItem')
  if(min === distance_C) document.querySelectorAll('.Menu .Item')[2].classList.add('selectedItem')*/

}

let slideIndex = 0;
let timeout;

function showSlides() {
  slideIndex++
  if (slideIndex > 3)
  {
    slideIndex = 0;
  }
  changePictureManual(slideIndex)
  timeout = setTimeout(showSlides, 10000); // Change image every 2 seconds
}

function changePictureManual(id)
{
  var temp = document.getElementById('imageButtons').children;
  console.log(temp)
  for (let index = 0; index < temp.length; index++) {
    if (temp[index].classList.contains('selectedCircle'))
    {
      temp[index].classList.remove('selectedCircle');
    }

    if (index == id)
    {
      temp[index].classList.add('selectedCircle');
    }
  }

  var tempImg = document.getElementsByClassName('QuienesSomosImage');
  slideIndex = id;
  
  for (let index = 0; index < tempImg.length; index++) {
    tempImg[index].classList.add("hidden");
    if (index == id)
    {
      tempImg[index].classList.remove("hidden");
    }
  }

  /*if (id == 0)
  {
    tempImg.src = "/img/QuienesSomos/0.JPG";
  }
  else if (id == 1)
  {
    tempImg.src = "/img/QuienesSomos/1.JPG";
  }
  else if (id == 2)
  {
    tempImg.src = "/img/QuienesSomos/2.JPG";
  }
  else if (id == 3)
  {
    tempImg.src = "/img/QuienesSomos/3.JPG";
  }*/
}

const Main = () => {

  useEffect(() => {
    if (timeout == null)
    {
      showSlides();
    }

    window.addEventListener('scroll', scrollHandler);
    return () => {
        window.removeEventListener('scroll', scrollHandler)
    }
  })

  return (
    <div className='mainBackground min-w-[100%]'>
        <nav className='absolute w-[100%] flex justify-end items-center navBar h-[85px] px-4 shadow-2xl'>
            <div className='mr-auto pl-6 py-4 w-28 noselect'><img src="img/Logo_Alternativo_Letras.png" alt="/" className='h-full'/></div>
            <ul className='flex justify-around text-[#008080] text-xl font-medium offsetForScrollbarWidth' id='navList'>
                <li onClick={() => moveToAnchor("Inicio")} id="Inicio" className='selectedItem'><Link href="#InicioAnchor" ><a>INICIO</a></Link></li>
                <li onClick={() => moveToAnchor("Quienes")} id="Quienes" className=''><Link href="#QuienesAnchor" ><a>¿QUIÉNES SOMOS?</a></Link></li>
                <li onClick={() => moveToAnchor("Quienes")} id="Equipo" className=''><Link href="#EquipoAnchor" ><a>EQUIPO TÉCNICO</a></Link></li>
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
            <div className='h-auto w-full verticalCenter relative'>
              <img src="/img/Logo_MainPage.png" alt="/" className='mainImageAnim max-w-[60%]' />

              <div className='customBlendParent absolute top-[70%] left-[32%] whitespace-nowrap '>
                  <div className='customBlend px-4 py-1 '> 
                    <span className='laptop:text-2xl desktop:text-3xl noselect'>&quot;Punto de partida para unos nuevos ilímites&quot;</span>
                  </div>
              </div>

              <div className='absolute top-[10%] right-12'>
                <a href="https://www.instagram.com/atletismeatlas/" target={"_blank"} rel={"noreferrer noopener"} className='btn drop-shadow-xl'> <div className='icon'><FontAwesomeIcon icon={faInstagram} className='fa-3x'/></div></a>
                <a href="https://facebook.com/AtletismeAtlas" target={"_blank"} rel={"noreferrer noopener"} className='btn twitter drop-shadow-xl'><div className='icon'><FontAwesomeIcon icon={faFacebook} className='fa-3x'/></div></a>
                <a className='btn drop-shadow-xl'><div className='icon'><FontAwesomeIcon icon={faTiktok} className='fa-2x'/></div></a>
              </div>
            </div>

              <div  onClick={() =>removeHash()} >
              <Link href="#QuienesAnchor" ><a className=' z-[1] cursor-pointer noselect animGradient shadow-2xl absolute bottom-10 right-12 text-white text-4xl bg-teal-700 rounded-full py-8 px-16'>
                              CONTINUAR <FontAwesomeIcon icon={faAngleDown} className='animBounce'/>
                            </a></Link>
              </div>
          </div>
      </div>

    {/* ¿Quiénes somos? */}
    <div className='max-w-[2560px] min-h-[1000px] m-auto offsetForScrollbarWidth' id='QuienesAnchor'>
      <div className='h-fit desktop4k:h-screen  pt-24 w-full flex flex-col items-center relative text-white'>
        <div className='text-center h-fit mx-auto px-4 mb-8 text-[50px] dalek text-teal-900 rounded-full glass noselect'>¿Quiénes somos?</div>

        <div className='darkglass rounded-lg w-[1000px] max-w-[100vh]'>
            <img id='QuienesSomosImage' src="/img/QuienesSomos/0.JPG" alt="/" className='QuienesSomosImage align-middle h-full w-full '/>
            <img id='QuienesSomosImage' src="/img/QuienesSomos/1.JPG" alt="/" className='QuienesSomosImage align-middle h-auto w-full hidden'/>
            <img id='QuienesSomosImage' src="/img/QuienesSomos/2.JPG" alt="/" className='QuienesSomosImage align-middle h-auto w-full hidden'/>
            <img id='QuienesSomosImage' src="/img/QuienesSomos/3.JPG" alt="/" className='QuienesSomosImage align-middle h-auto w-full hidden'/>
          <div className='absolute w-full h-[50px] text-center flex'>
            <div id='imageButtons' className='m-auto w-[100px] flex justify-around  darkglass rounded-full px-2 py-1'>
              <button className='nonSelectedCircle selectedCircle' onClick={() => changePictureManual(0)}><FontAwesomeIcon icon={faCircle} className='fa-2xs'/></button>
              <button className='nonSelectedCircle' onClick={() => changePictureManual(1)}><FontAwesomeIcon icon={faCircle} className='fa-2xs'/></button>
              <button className='nonSelectedCircle' onClick={() => changePictureManual(2)}><FontAwesomeIcon icon={faCircle} className='fa-2xs'/></button>
              <button className='nonSelectedCircle' onClick={() => changePictureManual(3)}><FontAwesomeIcon icon={faCircle} className='fa-2xs'/></button>
            </div>
          </div>
       
          {/* Large Desktop */}
          <div className='absolute -top-[40px] -left-[350px] darkglass h-fit max-w-[400px] rounded-3xl desktop4k:block hidden'>
            <div className='mx-8 mb-7 mt-3  block'>
            <p className='text-center text-lg font-bold mb-3'>¿CÓMO NACIMOS?</p>
            <QuienesSomos_1></QuienesSomos_1>
            </div>
          </div>

          <div className='absolute -bottom-[40px] -right-[350px] darkglass h-fit max-w-[400px] flex-1 rounded-3xl text-justify desktop4k:block hidden'>
            <div className='mx-8 mb-7 mt-3  block'>
            <p className='text-center text-lg font-bold mb-3'>¿CÓMO NACIMOS?</p>
            <QuienesSomos_2></QuienesSomos_2>
            </div>
          </div>     
        </div>

        <div className='flex flex-col laptop:flex-row justify-center desktop4k:hidden mt-20'>
            {/* Small */}
            <div className='darkglass h-fit max-w-[400px] mb-6 laptop:mb-0 rounded-3xl mx-5'>
            <div className='mx-8 mb-7 mt-3  block'>
            <p className='text-center text-lg font-bold mb-3'>¿CÓMO NACIMOS?</p>
            <QuienesSomos_1></QuienesSomos_1>
            </div>
            </div>

            <div className='darkglass h-fit max-w-[400px] flex-1 rounded-3xl text-justify mx-5'>
            <div className='mx-8 mb-7 mt-3  block'>
            <p className='text-center text-lg font-bold mb-3'>¿CÓMO NACIMOS?</p>
            <QuienesSomos_2></QuienesSomos_2>
            </div>
            </div>  
        </div>
      </div>
    </div>

    {/* Equipo Técnico */}
    <div className='max-w-[2560px] min-h-[1000px] m-auto offsetForScrollbarWidth' id='EquipoAnchor'>
      <div className='h-fit pt-24 w-full relative flex flex-col justify-center text-white'>
        <div className='text-center h-fit w-fit mx-auto px-4 mb-8 text-[50px] dalek text-teal-900 rounded-full glass noselect'>Equipo técnico
        </div>
        <div className='w-[95%] m-auto flex justify-around flex-wrap'>
          
          <div className='mobile:w-[250px] desktop:w-[15%] mt-16'>
            <div className='meetTheTeamDiv boxShadow3D boxShadowTeal200 bg-teal-300  mb-24 desktop:mb-0 rounded-[15px]'>
              <img className='w-full h-auto px-4' src="img/QuienesSomos/Dani_2.png" alt="/" />
                <div className='h-full'></div> {/* Helper */}
            </div>
            <div className=' text-black font-bold desktop:text-[1.2vw] mobile:text-xl mt-6'>
              <div>Daniel Espada Jiménez</div>
              <div className='desktop:text-[1vw] mobile:text-lg font-normal'>Presidente y Entrenador</div>
            </div>
          </div>
          
          <div className='mobile:w-[250px] desktop:w-[15%] mt-0'>
            <div className='meetTheTeamDiv boxShadow3D boxShadowTeal200 bg-teal-300  mb-24 desktop:mb-0 rounded-[15px]'>
              <img className='w-full h-auto px-4' src="img/QuienesSomos/Ramon_2.png" alt="/" />
                <div className='h-full'></div> {/* Helper */}
            </div>
            <div className=' text-black font-bold desktop:text-[1.2vw] mobile:text-xl mt-6'>
              <div>Ramón Manzano Jiménez</div>
              <div className='desktop:text-[1vw] mobile:text-lg font-normal'>Vicepresidente</div>
            </div>
          </div>
          
          <div className='mobile:w-[250px] desktop:w-[15%] mt-16'>
            <div className='meetTheTeamDiv boxShadow3D boxShadowTeal200 bg-teal-300  mb-24 desktop:mb-0 rounded-[15px]'>
              <img className='w-full h-auto px-4' src="img/QuienesSomos/Sergi_2.png" alt="/" />
                <div className='h-full'></div> {/* Helper */}
            </div>
            <div className=' text-black font-bold desktop:text-[1.2vw] mobile:text-xl mt-6'>
              <div>Sergi García Riera</div>
              <div className='desktop:text-[1vw] mobile:text-lg font-normal'>Tesorero y Entrenador</div>
            </div>
          </div>

          <div className='mobile:w-[250px] desktop:w-[15%] mt-0'>
            <div className='meetTheTeamDiv boxShadow3D boxShadowTeal200 bg-teal-300  mb-24 desktop:mb-0 rounded-[15px]'>
              <img className='w-full h-auto px-4' src="img/QuienesSomos/Carla.png" alt="/" />
                <div className='h-full'></div> {/* Helper */}
            </div>
            <div className=' text-black font-bold desktop:text-[1.2vw] mobile:text-xl mt-6'>
              <div>Carla Mateos Tugores</div>
              <div className='desktop:text-[1vw] mobile:text-lg font-normal'>Entrenadora</div>
            </div>
          </div>

          <div className='mobile:w-[250px] desktop:w-[15%] mt-16'>
            <div className='meetTheTeamDiv boxShadow3D boxShadowTeal200 bg-teal-300  mb-24 desktop:mb-0 rounded-[15px]'>
              <img className='w-full h-auto px-4' src="img/QuienesSomos/Valen_2.png" alt="/" />
                <div className='h-full'></div> {/* Helper */}
            </div>
            <div className=' text-black font-bold desktop:text-[1.2vw] mobile:text-xl mt-6 whitespace-nowrap'>
              <div>Valentín Gartner Hernández</div>
              <div className='desktop:text-[1vw] mobile:text-lg font-normal'>Secretario</div>
            </div>
          </div>

          <div className='mobile:w-[250px] desktop:w-[15%] mt-0'>
            <div className='meetTheTeamDiv boxShadow3D boxShadowTeal200 bg-teal-300  mb-24 desktop:mb-0 rounded-[15px]'>
              <img className='w-full h-auto px-4' src="img/QuienesSomos/Paco_2.png" alt="/" />
                <div className='h-full'></div> {/* Helper */}
            </div>
            <div className=' text-black font-bold desktop:text-[1.2vw] mobile:text-xl mt-6 whitespace-nowrap'>
              <div>Francisco Luis Blasco Querol</div>
              <div className='desktop:text-[1vw] mobile:text-lg font-normal'>Vocal</div>
            </div>
          </div>
        </div>

        <div className='flex justify-center gap-6 mt-10'>
          <div className='darkglass rounded-[15px] w-[800px] mb-6 pl-0 py-0 flex flex-row'>
            <img className='self-end drop-shadow-xl w-[227px]' src="img/QuienesSomos/Dani_2.png" alt="/" />
            <div className='pt-4 pr-4 pb-4 text-black'>
              <DescripcionDani/>
            </div>
          </div>

          <div className='darkglass rounded-[15px] w-[800px] mb-6 pl-0 py-0 flex flex-row'>
          <img className='self-end drop-shadow-xl w-[227px]' src="img/QuienesSomos/Ramon_2.png" alt="/" />

            <div className='pt-4 pr-4 pb-4 text-black'>
              <DescripcionDani/>
            </div>
          </div>
        </div>
        
        <div className='flex justify-center gap-6'>
          <div className='darkglass rounded-[15px] w-[800px] mb-6 pl-0 py-0 flex flex-row'>
            <div className='self-end max-w-[227px]'>
            <img className='drop-shadow-xl m-auto w-[95%]' src="img/QuienesSomos/Sergi_2.png" alt="/" />
            </div>
            <div className='pt-4 pr-4 pb-4 text-black'>
              <DescripcionSergi/>
            </div>
          </div>

          <div className='darkglass rounded-[15px] w-[800px] mb-6 pl-0 py-0 flex flex-row'>
            <div className='self-end drop-shadow-xl'>
              <img className='w-[450px]' src="img/QuienesSomos/Carla.png" alt="/" />
            </div>

            <div className='pt-4 pr-4 pb-4 text-black'>
              <DescripcionDani/>
            </div>
          </div>
        </div>

        <div className='flex justify-center gap-6'>
          <div className='darkglass rounded-[15px] w-[800px] mb-6 pl-0 py-0 flex flex-row'>
          <div className='self-end max-w-[227px]'>
            <img className='drop-shadow-xl m-auto w-[95%]' src="img/QuienesSomos/Valen_2.png" alt="/" />
            </div>

            <div className='pt-4 pr-4 pb-4 text-black'>
              <DescripcionValentin/>
            </div>
          </div>

          <div className='darkglass rounded-[15px] w-[800px] mb-6 pl-0 py-0 flex flex-row'>
            <div className='self-end drop-shadow-xl'>
              <img className='w-[450px]' src="img/QuienesSomos/Paco_2.png" alt="/" />
            </div>

            <div className='pt-4 pr-4 pb-4 text-black'>
              <DescripcionDani/>
            </div>
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