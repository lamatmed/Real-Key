import { Button } from '@/components/ui/button'
import { Building, Fence, House } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function WhatClientWant() {
  return (
   <div className='relative h-[1750px]  lg:h-[750px] w-full'>

        <Image alt='hero' fill className='w-full   h-[750px] object-cover ' src="/whatClientWant.jpg"/>

            
      <div className='absolute inset-0 bg-black/70  z-10'></div>
    
   
    <div className='absolute inset-0 z-20 flex flex-col justify-center'>
    <div className='flex items-center justify-center mt-32'>

   
     <h1 className='text-[45px] font-bold mb-6 text-white '>   
  Que recherchez-vous ?
          </h1>
           </div>
      <div className=' grid grid-cols-1 lg:grid-cols-3 text-white gap-6 text-center p-24'>

      <div className='p-4 flex flex-col items-center h-[400px]   justify-center  bg-black/70 '>
        <House className="w-[55px] h-[55px] md:w-[85px] md:h-[85px]"/>
        <h3 className='my-3 text-[25px]'>Maisons</h3>
        <p>Découvrez de belles maisons familiales dans des quartiers prestigieux, avec des espaces de vie spacieux, des jardins privés et des designs élégants. Des maisons de ville charmantes aux grands domaines, chaque propriété offre intimité, confort et l'environnement parfait pour que votre famille s'épanouisse.</p>


 <Link href="/properties?type=house">
   
        <Button className='bg-[#e04141] mt-5'>Voir toutes les maisons</Button>
    </Link> 
    
      </div>


           <div className='p-4 flex flex-col items-center  justify-center bg-black/70 '>
        <Building className="w-[55px] h-[55px] md:w-[85px] md:h-[85px]"/>
        <h3 className='my-3  text-[25px]'>Appartements</h3>
        <p>Découvrez des appartements de luxe dans des emplacements privilégiés avec des vues imprenables sur la ville et des équipements modernes. Du studio cosy au penthouse spacieux, trouvez votre maison parfaite avec des installations de premier ordre incluant salles de sport, piscines et sécurité 24h/24.</p>

 <Link href="/properties?type=apartment">

 <Button className='bg-[#e04141] mt-5'>Voir tous les appartements</Button>
</Link>
      </div>


         <div className='p-4 flex flex-col items-center  justify-center bg-black/70 '>
        <Fence className="w-[55px] h-[55px] md:w-[85px] md:h-[85px]"/>
        <h3 className='my-3  text-[25px]'>Maisons de Ville</h3>
        <p>Vivez la fusion parfaite entre intimité et vie de communauté dans nos élégantes maisons de ville. Ces habitations sur plusieurs niveaux offrent des espaces de vie spacieux, des jardins privés et des designs architecturaux modernes. Avec 2 à 4 chambres, cuisines contemporaines et places de parking dédiées, chaque maison de ville allie le confort d'une maison aux avantages d'équipements partagés.</p>
<Link href="/properties?type=townhouse">
 <Button  className='bg-[#e04141] mt-5'>Voir toutes les maisons de ville</Button>
</Link>
      </div>
      </div>

      </div>
   
    </div>
  )
}

export default WhatClientWant