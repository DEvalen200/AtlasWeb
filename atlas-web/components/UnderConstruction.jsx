import React from 'react'

const UnderConstruction = () => {
  return (
    <div className='mainBackground w-screen h-screen flex flex-col items-center bg-black/50'>
                
        <div className='mx-[30px] mb-10 rounded-3xl laptop:w-[300px] tablet:w-[400px] tablet:left-1/2 top-5'>
        <img src="img/Logo_Alternativo.png" alt="/" />
        </div>
        
        <div className='dalek noselect tablet:mx-auto text-[8vw] tablet:text-[5vw] desktop:text-[48px] darkglass px-10 py-2 mx-6 tablet:rounded-full rounded-3xl text-teal-200 tablet:whitespace-nowrap tablet:w-fit desktop:max-w-[1080px] text-center'>¡PÁGINA WEB EN CONSTRUCCIÓN!</div>
        
    </div>
  )
}

export default UnderConstruction