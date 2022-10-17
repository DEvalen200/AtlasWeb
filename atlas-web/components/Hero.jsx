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


function submitFormToGoogleSheet()
{
    var form = document.getElementById('Form');
    fetch(form.action, {
        method : "POST",
        body: new FormData(document.getElementById("Form")),
    }).then(
        response => response.json()
    ).then((html) => {
        // you can put any JS code here

    });

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
        signaturePad.toDataURL(),
        document.forms[0][7].value)

        var screenshot = await captureText(params);

        //console.log("screenshot: " + screenshot);
        //FileSaver(screenshot.toDataURL(),"Canvas idk");
        //var newTab = window.open('about:blank','image from canvas');
        //newTab.document.write("<img src='" + signbytes + "' alt='from canvas'/>");
        //FileSaver.saveAs(signaturePad.toDataURL("image/png"), "firma.png");
        var screenshotURL = screenshot.toDataURL();

        modifyPdf(screenshotURL, params);

        submitFormToGoogleSheet()
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

    const dayNames = [ "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]; 

    var _canvas;

    await html2canvas(document.querySelector("#capture"), {
        scale: 2,
        onclone: function (clonedDoc) {
            clonedDoc.getElementById('capture').style.display = 'block';
            clonedDoc.getElementById('capture').innerHTML = 'Yo, '+ formParams.Nombre +', con DNI '+ formParams.DNI +', y domicilio en '+ formParams.Direccion +', municipio de '+ formParams.Municipio +', firmo la presente como reflejo de mi voluntad, de acuerdo con la normativa interna, con los derechos y deberes que esta supone, de pasar a ser socio del Club Atletisme Atlas para la próxima temporada atlética 2022 - 2023.' + '<br/>' + '<br/>' + 'Añado, a efectos de notificación, información y comunicación, mi teléfono '+ formParams.Telefono +' y mi dirección electrónica '+ formParams.Correo +', dejando estos datos a disposición de la entidad para que formen parte de los canales de información correspondientes.' + '<br/>' + '<br/>' + 'Firmando la presente también reflejo haber leído y estar de acuerdo con la Política de protección de datos y la Política de derechos de imagen de la entidad.' + '<br/>' + '<br/>' + 'Firmado en '+ formParams.Municipio +', a '+ dayNames[date.getDay()] + ' ' + date.getDate() +' de '+ monthNames[date.getMonth()] +' del ' + date.getFullYear() + '<br/>' + '<br/> ';
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

    function showTransactionWarning()
    {
        if (document.getElementById("Transaction").classList.contains("hidden"))
        {
            document.getElementById("Transaction").classList.remove("hidden");
        }
    }

    function hideTransactionWarning()
    {
        if (!document.getElementById("Transaction").classList.contains("hidden"))
        {
            document.getElementById("Transaction").classList.add("hidden");
        }
    }

    
    function showTransactionInfo()
    {
        if (document.getElementById("TransactionInfo").classList.contains("hidden"))
        {
            document.getElementById("TransactionInfo").classList.remove("hidden");
        }
    }

    function hideTransactionInfo()
    {
        if (!document.getElementById("TransactionInfo").classList.contains("hidden"))
        {
            document.getElementById("TransactionInfo").classList.add("hidden");
        }
    }


  return (
    <div className=' content-center justify-center flex min-h-screen h-fit bg-fixed bg-center bg-cover custom-img'>
        {/* Overlay */}
        {/*<div className='fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]'/>*/}
        
        {/* Alerta confirmación transferencia */}
        <section id='Transaction' className='fixed items-center w-full h-full bg-black/50 z-[4] hidden'>
            <div className='absolute offsetForScrollbarWidth m-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                
                <div className='w-fit max-w-3xl bg-white shadow-2xl shadow-black rounded-xl mobile:text-justify desktop:text-center m-auto px-6 py-3'>
                    <div className=' w-fit bg-red-500 shadow-2xl  rounded-xl text-center mx-auto -translate-y-8'>
                        <div className='text-black text-2xl font-bold py-2 px-6 '>¡ATENCIÓN!</div>
                    </div>
                    <div className='mt-[-20px]'>
                        <div className=''>Antes de continuar es necesario haber realizado la <b>transferencia de la cuota por solicitud de inscripción y membresía</b>.</div>
                        <br/>
                        <div className=''>Si ya has realizado la transferencia y dispones del comprobante pulsa <b className=' text-green-600'>&quot;Continuar&quot;</b>.</div>
                        <br/>
                        <div className='mb-4'>En caso contrario pulsa <b className=' text-teal-700'>&quot;Ver información de transferencia&quot;</b> y <b>completa el pago de la cuota por solicitud de inscripción y membresía</b>.</div>
                    </div>
                    <div className='desktop:flex mobile:text-center  justify-around mb-2'>
                        <button onClick={function(event){hideTransactionWarning(); showTransactionInfo()}} className='mobile:mb-6 desktop:mb-0 transferenciaButton w-[269px] bg-teal-700 text-white px-4 py-4 rounded-full font-bold '>Ver información de transferencia</button>
                        <button onClick={function(event){hideTransactionWarning(); validateForm();}} className='continuarButton w-[269px] bg-green-700 text-white px-4 py-4 rounded-full font-bold '>Continuar</button>
                    </div>
                </div>
            </div>
        </section>

            {/* Información Transferencia */}
            <section id='TransactionInfo' className='fixed items-center w-full h-full bg-black/50 z-[4] hidden'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen mobile:text-base tablet:text-base'>
                
                <div className='w-fit max-w-[44rem] bg-white shadow-2xl shadow-black rounded-xl text-center mobile:m-2 mobile:px-2 tablet:m-auto py-3'>
                    <div className=' w-fit bg-teal-500 shadow-2xl rounded-xl text-center mx-auto -translate-y-8'>
                        <div className='text-black tablet:text-2xl font-bold py-2 px-6 '>INFORMACIÓN TRANSFERENCIA</div>
                    </div>
                    <div className='mt-[-20px]'>
                        <div className=''>El importe a pagar para ser socio del Club Atletisme Atlas es de <b>30€</b>.</div>
                        <br/>
                        <div className='mb-2'>El pago debe realizarse al número de cuenta referido, con el concepto:</div>
                        <table className='m-auto w-[85%] text-left table-fixed mb-4 tablet:table mobile:hidden'>
                            <tbody>
                                <tr>
                                    <th>CAIXA COLONYA POLLENÇA</th>
                                    <th>IBAN ES44 2056 0004 4420 9796 8925</th>
                                </tr>
                                <tr>
                                    <td><b>CONCEPTO</b></td>
                                    <td><b>NOMBRE APELLIDO1 APELLIDO2 SOCIO</b></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className='tablet:hidden'>
                            <div>
                            <b>CAIXA COLONYA POLLENÇA</b>
                            </div>
                            <div className='mb-6'>
                            <b>IBAN ES44 2056 0004 4420 9796 8925</b>
                            </div>
                            <div>
                            <b>CONCEPTO</b>
                            </div>
                            <div className='mb-6'>
                            <b>NOMBRE APELLIDO1 APELLIDO2 SOCIO</b>
                            </div>
                        </div>
                    </div>
                    <div className='desktop:flex mobile:text-center  justify-around mb-2'>
                        <button onClick={hideTransactionInfo} className='transferenciaButton w-[269px] bg-teal-700 text-white px-4 py-4 rounded-full font-bold text-xl '>Cerrar</button>
                    </div>
                </div>
            </div>
        </section>

        <section className=' mobile:block desktop:flex offsetForScrollbarWidth'>
            {/* BIENVENIDO */}
            <div className='w-full desktop:max-w-sm tablet:max-w-md tablet:mx-auto z-[2] bg-white shadow-2xl shadow-black rounded-xl px-8 pt-6 pb-8 h-fit my-10 desktop:mx-10 mobile:w-fit mobile:mx-4'>
                <div className="mb-4">
                    <h1 className="block text-gray-700 text-lg font-bold mb-2 text-center">
                        BIENVENIDO
                    </h1>
                </div>
                <div className="mb-4 text-center">
                    <p className="block text-gray-700 text-lg font-normal text-center">
                        ¡Esta es la página de solicitud del puesto de <b>Socio No Atleta</b> del <b>Club Atletisme Atlas</b>!
                    </p>
                    <br />
                    <hr className=' border-2 border-color-atlas-300 mx-10' />
                    <br />
                    <p className="block text-gray-700 text-lg font-normal text-center">
                        Te recordamos que antes de completar y enviar la solicitud debes haber pagado la <b>cuota correspondiente.</b>
                    </p>
                    <button onClick={showTransactionInfo} className='mt-3 mb-6 mx-auto transferenciaButton bg-teal-700 text-white px-4 py-4 rounded-full font-bold '>Ver información de transferencia</button>
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
                    <img alt='/' src="/img/Logo_Oficial.png"/>
                </div>
            </div>

            {/* FORM */}
            <div className='w-full desktop:max-w-lg desktop:min-w-[32rem] tablet:w-fit  z-[2] bg-white shadow-2xl shadow-black rounded-xl px-8 pt-6 pb-8 h-fit my-10 mobile:w-fit mobile:mx-4 tablet:mx-4'>
                <form className="" action="https://sheetdb.io/api/v1/9x9zrsu1h0qho" method="POST" autoComplete="off" id='Form'>
                    <div className="mb-4 text-center">
                        <label className="block text-gray-700 text-lg font-bold mb-2">
                            FORMULARIO DE SOLICITUD DE SOCIO
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Nombre y apellidos
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name='data[NOMBRE Y APELLIDOS]' type="text" placeholder="Nombre y apellidos"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            DNI
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="" name='data[DNI]'  type="text" placeholder="DNI"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Dirección
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="" name='data[DIRECCIÓN]' type="text" placeholder="Calle, Número y Código postal"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Municipio
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="" name='data[MUNICIPIO]' type="text" placeholder="Palma"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Provincia
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="" name='data[PROVINCIA]' type="text" placeholder="Islas Baleares"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Teléfono de contacto
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="" name='data[TELÉFONO]' type="number" placeholder="Teléfono de contacto"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Correo electrónico
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="" name='data[CORREO]' type="text" placeholder="Correo electrónico"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Talla camiseta
                        </label>
                        <select class="block  w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"  name='data[TALLA]' form="Form">
                            <option>2/3</option>
                            <option>4/6</option>
                            <option>8/10</option>
                            <option>12/14</option>
                            <option selected="selected">S</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                            <option>XXL</option>
                            <option>XXXL</option>
                        </select>
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
                        onClick={showTransactionWarning}>
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

            {/* CAPTURA TEXTO PDF - NO BORRAR - USADO PARA GENERAR UN DIV INVISIBLE CON EL TEXTO A CAPTURAR PARA GENERAR PDF */}
            <div id='capture' className='texto-capturar absolute' style={{display: 'none'}}>
            
            </div>
        </section>
    </div>


  )
}

export default Hero