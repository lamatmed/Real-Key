import { Button } from '@/components/ui/button'
import { Building, Fence, House } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function WhatClientWant() {
  return (
   <div className='relativ h-auto lg:h-[750px] w-full'>

        <Image 
          alt='hero' 
          fill 
          className='w-full h-full object-cover' 
          src="/whatClientWant.jpg"
        />
            
      <div className='absolute inset-0 bg-black/70 z-10'></div>
    
   
    <div className='absolute inset-0 z-20 flex flex-col justify-center'>
      <div className='flex items-center justify-center mt-8 lg:mt-32'>
        <h1 className='text-3xl md:text-[45px] font-bold mb-6 text-white text-center px-4'>   
          Que recherchez-vous ?
        </h1>
      </div>
      
      <div className='grid grid-cols-1 lg:grid-cols-3 text-white gap-4 lg:gap-6 text-center p-4 lg:p-24'>

        <div className='p-4 lg:p-6 flex flex-col items-center h-auto lg:h-[400px] justify-center bg-black/70 rounded-lg'>
          <House className="w-12 h-12 md:w-16 md:h-16 lg:w-[85px] lg:h-[85px]"/>
          <h3 className='my-3 text-xl lg:text-[25px] font-semibold'>Maisons</h3>
          <p className='text-sm lg:text-base leading-relaxed'>
            Découvrez de belles maisons familiales dans des quartiers prestigieux, avec des espaces de vie spacieux, des jardins privés et des designs élégants. Des maisons de ville charmantes aux grands domaines, chaque propriété offre intimité, confort et l'environnement parfait pour que votre famille s'épanouisse.
          </p>
          <Link href="/properties?type=house" className='w-full mt-4 lg:mt-5'>
            <Button className='bg-[#e04141] w-full lg:w-auto'>Voir toutes les maisons</Button>
          </Link> 
        </div>

        <div className='p-4 lg:p-6 flex flex-col items-center h-auto lg:h-[400px] justify-center bg-black/70 rounded-lg'>
          <Building className="w-12 h-12 md:w-16 md:h-16 lg:w-[85px] lg:h-[85px]"/>
          <h3 className='my-3 text-xl lg:text-[25px] font-semibold'>Appartements</h3>
          <p className='text-sm lg:text-base leading-relaxed'>
            Découvrez des appartements de luxe dans des emplacements privilégiés avec des vues imprenables sur la ville et des équipements modernes. Du studio cosy au penthouse spacieux, trouvez votre maison parfaite avec des installations de premier ordre incluant salles de sport, piscines et sécurité 24h/24.
          </p>
          <Link href="/properties?type=apartment" className='w-full mt-4 lg:mt-5'>
            <Button className='bg-[#e04141] w-full lg:w-auto'>Voir tous les appartements</Button>
          </Link>
        </div>

        <div className='p-4 lg:p-6 flex flex-col items-center h-auto lg:h-[400px] justify-center bg-black/70 rounded-lg'>
          <Fence className="w-12 h-12 md:w-16 md:h-16 lg:w-[85px] lg:h-[85px]"/>
          <h3 className='my-3 text-xl lg:text-[25px] font-semibold'>Maisons de Ville</h3>
          <p className='text-sm lg:text-base leading-relaxed'>
            Vivez la fusion parfaite entre intimité et vie de communauté dans nos élégantes maisons de ville. Ces habitations sur plusieurs niveaux offrent des espaces de vie spacieux, des jardins privés et des designs architecturaux modernes. Avec 2 à 4 chambres, cuisines contemporaines et places de parking dédiées, chaque maison de ville allie le confort d'une maison aux avantages d'équipements partagés.
          </p>
          <Link href="/properties?type=townhouse" className='w-full mt-4 lg:mt-5'>
            <Button className='bg-[#e04141] w-full lg:w-auto'>Voir toutes les maisons de ville</Button>
          </Link>
        </div>
        
      </div>
    </div>
   
    </div>
  )
}

export default WhatClientWant