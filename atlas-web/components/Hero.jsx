import React, { cloneElement } from 'react'
import SignaturePad from 'signature_pad';
import { modifyPdf } from './modifyPDF'
import {useRef, useEffect} from 'react';
import { formParameters } from './modifyPDF';
import FileSaver, { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import Link from 'next/link'

var signaturePad;
var canvas;
var hasSigned = false;

function _hasSigned()
{
    hasSigned = true;
}

function clearSignaturePad()
{
    signaturePad.clear();
    hasSigned = false;
}

async function validateForm()
{
    var emptyvalue = false;
    for (let index = 0; index < document.forms[0].elements.length; index++) {
        if (!document.forms[0][index].value)
        {
            document.forms[0][index].style.backgroundColor = "rgb(255, 179, 179)";
            if (!document.forms[0][index].classList.contains("placeholder-red-900"))
            {
                document.forms[0][index].classList.add("placeholder-red-900");
            }

            if (!document.forms[0][index].previousSibling.innerHTML.includes(" *"))
            {
                document.forms[0][index].previousSibling.innerHTML += " *";
            }

            document.forms[0][index].previousSibling.style.color = "red";
            emptyvalue = true;
        }
        else
        {
            if (document.forms[0][index].previousSibling.innerHTML.includes("*"))
            {
                var tempText = document.forms[0][index].previousSibling.innerHTML;
                tempText = tempText.slice(0, -2);
                document.forms[0][index].previousSibling.innerHTML = tempText;
            }

            if (document.forms[0][index].classList.contains("placeholder-red-900"))
            {
                document.forms[0][index].classList.remove("placeholder-red-900");
            }

            document.forms[0][index].previousSibling.style.color = "black";
            document.forms[0][index].style.backgroundColor = "rgb(255, 255, 255)";
        }
    }

    if (!hasSigned)
    {
            var firmaText = document.getElementById("firmaText");
            firmaText.innerHTML = "Firma *";
            firmaText.style.color = "red";
    }
    else
    {
        var firmaText = document.getElementById("firmaText");
        firmaText.innerHTML = "Firma";
        firmaText.style.color = "black";
    }

    if (!document.getElementById("checkbox").checked)
    {
        document.getElementById("checkbox").nextElementSibling.style.color = "red";

        if (!document.getElementById("checkbox").nextElementSibling.innerHTML.includes(" *"))
        {
            document.getElementById("checkbox").nextElementSibling.innerHTML += " *";
        }

        return;
    }
    else
    {
        document.getElementById("checkbox").nextElementSibling.style.color = "rgb(17 24 39)";

        
        if (document.getElementById("checkbox").nextElementSibling.innerHTML.includes(" *"))
        {
            var tempText = document.getElementById("checkbox").nextElementSibling.innerHTML;
            tempText = tempText.slice(0, -2);
            document.getElementById("checkbox").nextElementSibling.innerHTML = tempText;
        }
    }

    if (emptyvalue || !hasSigned)
    {
        return;
    }

    var params = new formParameters(
        document.forms[0][0].value,
        document.forms[0][1].value,
        document.forms[0][2].value,
        document.forms[0][3].value,
        document.forms[0][4].value,
        document.forms[0][5].value,
        document.forms[0][6].value,
        document.getElementById("checkbox").checked,
        signaturePad.toDataURL())

        var screenshot = await captureText(params);
        //console.log("screenshot: " + screenshot);
        //FileSaver(screenshot.toDataURL(),"Canvas idk");
        //var newTab = window.open('about:blank','image from canvas');
        //newTab.document.write("<img src='" + signbytes + "' alt='from canvas'/>");
        //FileSaver.saveAs(signaturePad.toDataURL("image/png"), "firma.png");
        var screenshotURL = screenshot.toDataURL();
    modifyPdf(screenshotURL, params);
}

function resizeCanvas() {
    const ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    signaturePad.clear(); // otherwise isEmpty() might return incorrect value
}

async function captureText(formParams)
{
    //console.log("Capturando");
    
    const date = new Date();

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const dayNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]; 

    var _canvas;

    await html2canvas(document.querySelector("#capture"), {
        scale: 2,
        onclone: function (clonedDoc) {
            clonedDoc.getElementById('capture').style.display = 'block';
            clonedDoc.getElementById('capture').innerHTML = 'Yo, '+ formParams.Nombre +', con DNI '+ formParams.DNI +', y domicilio en '+ formParams.Direccion +', municipio de '+ formParams.Municipio +', firmo la presente como reflejo de mi voluntad, de acuerdo con la normativa interna, con los derechos y deberes que esta supone, de pasar a ser socio del Club Atletismo Atlas para la próxima temporada atlética 2022 - 2023.' + '<br/>' + '<br/>' + 'Añado, a efectos de notificación, información y comunicación, mi teléfono '+ formParams.Telefono +' y mi dirección electrónica '+ formParams.Correo +', dejando estos datos a disposición de la entidad para que formen parte de los canales de información correspondientes.' + '<br/>' + '<br/>' + 'Firmando la presente también reflejo haber leído y estar de acuerdo con la Política de protección de datos y la Política de derechos de imagen de la entidad.' + '<br/>' + '<br/>' + 'Firmado en '+ formParams.Municipio +', a '+ dayNames[date.getDay()] + ' ' + date.getDate() +' de '+ monthNames[date.getMonth()] +' del ' + date.getFullYear() + '<br/>' + '<br/> ';
        }
    }).then((canvas)=>{
        _canvas = canvas;
        //FileSaver(canvas.toDataURL(),"Canvas idk");
    })
    //console.log('_canvas: ' + _canvas);
    return _canvas;
}

export const Hero = () => {

    const ref = useRef(null);
    useEffect(() => {
        canvas = document.getElementById("signaturePadCanvas");
        signaturePad = new SignaturePad(canvas,{
            dotSize: 0.1,
            minWidth: 0.5,
            maxWidth: 1.5,
            throttle: 0,
            minDistance: 2,
            velocityFilterWeight: 0.7,
            backgroundColor: "rgb(255, 255, 255)"
        });

        resizeCanvas();

        signaturePad.addEventListener("endStroke", () =>{
            _hasSigned();
        })

    }, []);


  return (
    <div className=' content-center justify-center flex h-fit bg-fixed bg-center bg-cover custom-img'>
        {/* Overlay */}
        {/*<div className='fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]'/>*/}
        
        <section className=' mobile:block desktop:flex'>
            {/* BIENVENIDO */}
            <div className='w-full desktop:max-w-sm tablet:max-w-md tablet:mx-auto z-[2] bg-white shadow-2xl shadow-black rounded-xl px-8 pt-6 pb-8 h-fit my-10 desktop:mx-10 mobile:w-fit mobile:mx-4'>
                <div className="mb-4">
                    <h1 className="block text-gray-700 text-lg font-bold mb-2 text-center">
                        BIENVENIDO
                    </h1>
                </div>
                <div className="mb-4">
                    <p className="block text-gray-700 text-lg font-normal text-center">
                        ¡Esta es la página de solicitud del puesto de <b>Socio No Atleta</b> del <b>Club Atletisme Atlas</b>!
                    </p>
                    <br />
                    <hr className=' border-2 border-color-atlas-300 mx-10' />
                    <br />
                    <p className="block text-gray-700 text-lg font-normal text-center">
                        Te recordamos que antes de completar y enviar la solicitud debes haber pagado la <b>cuota correspondiente.</b>
                    </p>
                    <br />
                    <hr className=' border-2 border-color-atlas-300 mx-10' />
                    <br />
                    <p className="block text-gray-700 text-lg font-normal text-center">
                        Completa el siguiente formulario con los datos personales requeridos.<br/><br/>
                        Una vez completado, podrás descargar la documentación correspondiente y finalizar el proceso de solicitud del puesto de <b>Socio No Atleta</b> del <b>Club Atletisme Atlas</b>.
                    </p>
                    <br />
                    <hr className=' border-2 border-color-atlas-300 mx-10' />
                    <br /> <br />
                    <img alt='/' src="/Logo_Oficial.png"/>
                </div>
            </div>

            {/* FORM */}
            <div className='w-full desktop:max-w-lg desktop:min-w-[32rem] tablet:w-fit  z-[2] bg-white shadow-2xl shadow-black rounded-xl px-8 pt-6 pb-8 h-fit my-10 mobile:w-fit mobile:mx-4 tablet:mx-4'>
                <form className="" autoComplete="off" id='Form'>
                    <div className="mb-4 text-center">
                        <label className="block text-gray-700 text-lg font-bold mb-2">
                            FORMULARIO DE SOLICITUD DE SOCIO
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Nombre y apellidos
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nombre y apellidos"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            DNI
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="DNI"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Dirección
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Calle, Número y Código postal"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Municipio
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Palma"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Provincia
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Islas Baleares"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Teléfono de contacto
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="Teléfono de contacto"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Correo electrónico
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Correo electrónico"/>
                    </div>
                </form>
                <div className="flex items-center mb-4">
                        <input id="checkbox" type="checkbox" value="" className="w-4 h-4 accent-teal-600"/>
                        <label className="ml-2 text-sm font-medium text-gray-900">Acepto la <Link href="/politicas"><a className="text-teal-600 hover:underline">Política de protección de datos</a></Link> y la <Link href="politicas"><a className="text-teal-600 hover:underline">Política de derechos de imagen</a></Link>.</label>
                    </div>
                    <div className="mb-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2" id='firmaText'>
                            Firma
                        </label>
                        <div className='max-w-[446px] mx-auto' id="signaturePadDiv">
                            <canvas className='border shadow rounded  w-full' id="signaturePadCanvas">
                            </canvas>
                            <button className=" mb-4 mt-2 bg-rose-500 hover:bg-rose-700 text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                            onClick={clearSignaturePad}>
                                    Borrar
                            </button>
                        </div>
                    </div>
                <div className="flex items-center justify-between">
                    <button className="bg-teal-300 hover:bg-teal-700 text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                        onClick={validateForm}>
                            Descargar Documento PDF
                    </button>
                </div>
            </div>


            {/* ÚLTIMO PASO */}
            <div className='w-full desktop:max-w-sm tablet:max-w-md tablet:mx-auto  z-[2] bg-white shadow-2xl shadow-black rounded-xl px-8 pt-6 pb-8 h-fit my-10 desktop:mx-10 mobile:w-fit mobile:mx-4'>
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2 text-center">
                        ÚLTIMO PASO
                    </label>
                </div>
                <div className="">
                    <p className="block text-gray-700 text-lg font-normal mb-2 text-center">
                        ¡Envía la solicitud descargada a nuestro correo <a className=' text-teal-600' href = "mailto: club@atletismeatlas.es">club@atletismeatlas.es</a>!
                    </p>
                    <img alt='/' src="/DocumentoDescargado.png" className='mx-auto shadow-lg'/>
                </div>
                <br />
                    <hr className=' border-2 border-color-atlas-300 mx-10' />
                <br />
                <div className="">
                    <p className="block text-gray-700 text-lg font-normal mb-2 text-center">
                        No te olvides de adjuntar el <b>comprobante bancario</b> de la cuota correspondiente en el mensaje.
                    </p>
                    <img alt='/' src="/Attach.png" className=' mx-auto shadow-lg'/>
                </div>
            </div>

            {/* CAPTURA TEXTO PDF */}
            <div id='capture' className='texto-capturar' style={{display: 'none'}}>
            
            </div>
        </section>
    </div>


  )
}

export default Hero