import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
    <div className='relative overflow-hidden h-[750px] w-full'>

        <Image 
          alt='Bannière principale' 
          fill 
          className='w-full h-[750px] object-cover' 
          src="/hero.jpg"
          priority
        />
        
      <div className='absolute inset-0 bg-black/80'></div>
    
      <div className='absolute inset-0 flex items-center justify-center'>

      <div className='text-center px-4 max-w-4xl'>
        <h1 className='text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white'>
          Bienvenue chez
          <span className='block text-[#e04141] mt-2'>Real Key</span>
        </h1>

         {/* Description */}

         <p className='text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto'>
          Nous proposons des solutions innovantes et des services premium pour vous aider à atteindre vos objectifs et réussir dans le monde de l'immobilier.
         </p>

         <Button className='bg-[#e04141] hover:bg-[#c03939] text-white px-8 py-6 text-lg' >
          Commencer Maintenant
         </Button>
      </div>

      </div>
   
    </div>
  )
}

export default Hero