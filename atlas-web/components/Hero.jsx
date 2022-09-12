import React from 'react'
import SignaturePad from 'signature_pad';
import { modifyPdf } from './modifyPDF'
import Script from 'next/script'
import {useRef, useEffect} from 'react';
import { stringify } from 'postcss';


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

function validateForm()
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

        return;
    }
    else
    {
        var firmaText = document.getElementById("firmaText");
        firmaText.innerHTML = "Firma";
        firmaText.style.color = "black";
    }

    if (emptyvalue)
    {
        
        return;
    }


    modifyPdf();
}

function resizeCanvas() {
    const ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    signaturePad.clear(); // otherwise isEmpty() might return incorrect value
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
    <div className='flex content-center justify-center h-screen bg-fixed bg-center bg-cover custom-img'>
        {/* Overlay */}
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]'/>
        
        {/* FORM */}
        <div className='w-full max-w-lg z-[2] self-center bg-white shadow-2xl shadow-black rounded-xl px-8 pt-6 pb-8 mb-4'>
            <form className="" autoComplete="off" id='Form'>
                <div className="mb-4">
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
                        Provincia
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Islas Baleares"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Municipio
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Palma"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Dirección
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Calle, Número y Código postal"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Teléfono de contacto
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Teléfono de contacto"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Correo electrónico
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Correo electrónico"/>
                </div>
                <div className="mb-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" id='firmaText'>
                        Firma
                    </label>
                    <div className='border shadow rounded' id="signaturePadDiv">
                        <canvas className=' w-full' id="signaturePadCanvas">
                        </canvas>
                    </div>
                </div>
                
            </form>

            <div className="flex items-center justify-between">
                <button className=" mb-4 bg-rose-500 hover:bg-rose-700 text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                onClick={clearSignaturePad}>
                        Borrar
                </button>
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-teal-300 hover:bg-teal-700 text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                    onClick={validateForm}>
                        Descargar Documento PDF
                </button>
            </div>
        </div>
    </div>
  )
}

export default Hero