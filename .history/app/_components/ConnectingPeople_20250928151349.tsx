import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function ConnectingPeople() {
  return (
    <div className='p-24 items-center grid grid-cols-1 lg:grid-cols-2 gap-8'>
        
        <Image  className='rounded-3xl w-full h-[450px] object-cover' width={800} height={800} alt='image' src="/house.jpg"/>

        <div>
   <h1 className='text-[35px] text-[#e04141]'>Notre passion : connecter les personnes avec leur maison idéale.</h1>
   <p className='text-gray-600 mt-3'>Avec une passion authentique pour aider les gens à trouver la maison de leurs rêves, nous nous consacrons à mettre en relation acheteurs et vendeurs sur le marché immobilier. Faites-nous confiance pour rendre votre expérience d'achat ou de vente fluide et satisfaisante.</p>

   <Button className='mt-5'>En savoir plus</Button>

        </div>
    </div>
  )
}

export default ConnectingPeople