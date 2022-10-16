import React from 'react'
import Link from 'next/link'

const Socios = () => {
  return (
    <div className=' justify-around items-center flex min-h-screen bg-fixed bg-center bg-cover custom-img'>

            <div className='flex-grow w-[20%] mobile:hidden laptop:block'>
            <img src="img/Logo_Alternativo.png" alt="/" className='w-full m-auto'/>
            </div>

            {/* ¿QUÉ SIGNIFICA SER SOCIO? */}
            <div className='laptop:flex-grow laptop:w-[60%] mobile:mx-2 bg-white shadow-2xl shadow-black rounded-xl pb-8 h-fit my-10 mobile:mt-16 desktop:mx-0 self-start '>
                <div className="items-center">
                    <div className='text-center block text-teal-900  mobile:text-xl desktop:text-3xl font-bold -translate-y-1/2 mb-[-20px] m-auto py-4 mobile:px-4 tablet:px-6 w-fit bg-teal-400 mobile:rounded-2xl tablet:rounded-full shadow-lg'>¿Qué significa ser socio del Club Atletisme Atlas?</div>
                    <div className='tablet:mx-10 mobile:mx-5 text-justify mb-6 mobile:text-lg tablet:text-base'>El <b>Club Atletisme Atlas</b> es una entidad deportiva vinculada a la federación de principal actividad, el atletismo, pero de él no sólo forman parte atletas federados. Los socios son esos miembros del club que muestran su afinidad y su simpatía por el club y su filosofía, vinculándose de una forma comprometida y activa, aunque sin expedir ninguna licencia federativa para competiciones oficiales.</div>
                    <div className='tablet:mx-10 mobile:mx-5 text-justify mb-6 mobile:text-lg tablet:text-base'>Los <b>&quot;socios no atleta&quot;</b>, o denominados simplemente <b>socios</b>, formalizan su vinculación al club mediante la firma de una <b>solicitud de inscripción y membresía</b>, que sumada al oportuno pago de cuota correspondiente <b>(30€, mediante transferencia bancaria)*</b>, establece una relación activa en doble sentido: </div>
                    <div className='tablet:mx-16 mobile:mx-5 text-justify mb-2 mobile:text-lg tablet:text-base'>
                    <b>·</b> El club aumenta su plantilla, hace partícipe de sus actividades a un número mayor de personas y así su actividad de promoción y divulgación llega a más gente. 
                    </div>
                    <div className='tablet:mx-16 mobile:mx-8 text-justify mb-6 mobile:text-lg tablet:text-base'>
                    <b>·</b> Los <b>socios</b> asumen la responsabilidad de representar una entidad con principios y valores serios, participan de sus actividades sociales y de regulación (en las asambleas de forma activa, por ejemplo), y además, se benefician de las mismas ventajas comerciales que los atletas en aquellas empresas colaboradoras con la entidad. 
                    </div>
                    <div className='tablet:mx-10 mobile:mx-5 text-justify mb-6 mobile:text-lg tablet:text-base'>Una persona puede solicitar su inscripción como socio del club en cualquier momento del año, si bien con algún matiz: las inscripciones realizadas a tal efecto a partir del <b>1 de octubre</b>, se considerarán válidas hasta el <b>31 de diciembre</b> del año siguiente. </div>
                    
                    <hr className=' border-2 border-color-atlas-300 mx-10 mb-6' />

                    <div className='tablet:mx-10 mobile:mx-5 text-center mb-6 mobile:text-lg tablet:text-base'>Para la temporada 2023, los socios que se inscriban al club recibirán una <b>camiseta de entrenamiento</b>, además de un <b>pequeño obsequio</b>.</div>

                    <div className='tablet:flex tablet:justify-around mb-6'>
                        <div>
                        <img src="img/CamisetaEntrenoSocios.png" alt="/" className='tablet:w-[300px] mobile:w-full h-auto mb-2 customDropShadow2' />
                        <div className='text-center mobile:mb-6 desktop:mb-0'>Camiseta de entrenamiento</div>
                        </div>

                        <div>
                        <img src="img/Pulsera.png" alt="/" className='tablet:w-[300px] mobile:w-full h-auto mb-2 customDropShadow2' />
                        <div className='text-center'>Obsequio del club [Pulsera del equipo]</div>
                        </div>
                    </div>    
                    <hr className=' border-2 border-color-atlas-300 mx-10 mb-6' />   
                </div>

                <div className='mx-10 text-center mb-6 text-base'><b>La información necesaria para la transferencia bancaria y la solicitud de inscripción de se encuentran en la siguiente página.*</b></div>
                
                <div className='text-center'>
                <Link href='/solicitud-socio'><a className='inline-block bg-[#008080] tablet:px-20 tablet:py-6 mobile:px-10 mobile:py-6  rounded-full sociobtn customDropShadow cursor-pointer text-white mobile:text-xl tablet:text-3xl font-bold noselect'>
                        ¡QUIERO HACERME SOCIO!
                </a></Link>
                </div>

            </div>

            <div className='flex-grow w-[20%] mobile:hidden laptop:block'>
            <img src="img/Logo_Alternativo.png" alt="/" className='w-full m-auto'/>
            </div>
    </div>
  )
}

export default Socios