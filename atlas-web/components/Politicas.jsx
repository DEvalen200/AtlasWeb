import React, { cloneElement } from 'react'
import { useEffect } from 'react'
export const Politicas = () => {

    useEffect(() => {

        fetch('proteccionDatos.html')
        .then(response=> response.text())
        .then(text=> document.getElementById('proteccionDatos').innerHTML = text)

        fetch('derechoImagen.html')
        .then(response=> response.text())
        .then(text=> document.getElementById('derechoImagen').innerHTML = text)


    }, []);

    return(
    <div className='content-center justify-center flex min-h-screen h-fit bg-fixed bg-center bg-cover custom-img'>
        <section className='sociosMediaQuery'>
            {/* PROTECCION DE DATOS */}
            <div className='w-full desktop:max-w-2xl z-[2] bg-white shadow-2xl shadow-black rounded-xl px-8 pt-6 pb-8 h-fit my-10 desktop:mx-10 mobile:w-fit mobile:mx-4'>
                <div className="mb-4">
                    <h1 className="block text-gray-700 text-lg font-bold mb-2 text-center">
                        POLITÍCA DE PROTECCIÓN DE DATOS
                    </h1>
                </div>
                <div className="mb-4">
                    <p id='proteccionDatos' className="block text-gray-700 text-lg font-normal text-justify">
                        
                    </p>
                </div>
            </div>

            {/* LOGO */}
            <div className='w-full desktop:max-w-sm z-[2] bg-white shadow-2xl shadow-black rounded-xl px-8 pt-6 pb-8 h-fit my-10 desktop:mx-5 mobile:w-fit mobile:mx-4'>
                <div className="mb-4">
                    <img src="/Logo_Oficial.png"/>
                </div>
            </div>

            {/* DERECHOS DE IMAGEN */}
            <div className='w-full desktop:max-w-2xl z-[2] bg-white shadow-2xl shadow-black rounded-xl px-8 pt-6 pb-8 h-fit my-10 desktop:mx-10 mobile:w-fit mobile:mx-4'>
                <div className="mb-4">
                    <h1 className="block text-gray-700 text-lg font-bold mb-2 text-center">
                        POLÍTICA DE DERECHOS DE IMAGEN
                    </h1>
                </div>
                <div className="mb-4">
                    <p id='derechoImagen' className="block text-gray-700 text-lg font-normal text-justify">
                        
                    </p>
                </div>
            </div>

        </section>
    </div>

    )

}

export default Politicas