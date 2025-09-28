import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Home, Heart, Target, ArrowRight, Users, Star, Shield } from 'lucide-react'

function ConnectingPeople() {
  const features = [
    {
      icon: Heart,
      title: "Passionné par l'immobilier",
      description: "Notre équipe vit et respire l'immobilier depuis plus de 10 ans"
    },
    {
      icon: Target,
      title: "Objectif clair",
      description: "Vous aider à trouver la propriété qui correspond parfaitement à vos besoins"
    },
    {
      icon: Shield,
      title: "Confiance et transparence",
      description: "Des conseils honnêtes et un accompagnement en toute sérénité"
    }
  ]

  const stats = [
    { number: "1000+", label: "Clients satisfaits" },
    { number: "500+", label: "Transactions réussies" },
    { number: "98%", label: "Taux de satisfaction" }
  ]

  return (
    <section className='py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white'>
      <div className='container mx-auto px-4 md:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          
          {/* Image Section */}
          <div className='relative group'>
            <div className='relative overflow-hidden rounded-3xl shadow-2xl'>
              <Image 
                className='w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105' 
                width={800} 
                height={800} 
                alt='Maison de caractère avec jardin' 
                src="/house.jpg"
                priority
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </div>
            
            {/* Badge de confiance */}
            <div className='absolute -top-4 -right-4 bg-[#e04141] text-white px-6 py-3 rounded-2xl shadow-xl'>
              <div className='flex items-center gap-2'>
                <Star className='w-4 h-4 fill-current' />
                <span className='font-semibold text-sm'>Depuis 2015</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className='space-y-8'>
            <div className='space-y-6'>
              <div className='inline-flex items-center gap-2 bg-[#e04141]/10 px-4 py-2 rounded-full'>
                <Home className='w-4 h-4 text-[#e04141]' />
                <span className='text-sm font-semibold text-[#e04141]'>Notre Passion</span>
              </div>
              
              <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
                Relier les personnes à leur 
                <span className='text-[#e04141] block'>maison idéale</span>
                est notre passion.
              </h1>
              
              <p className='text-lg md:text-xl text-gray-600 leading-relaxed'>
                Avec une passion authentique pour aider chacun à trouver son chez-soi de rêve, 
                nous nous engageons à créer des connexions significatives entre acheteurs et vendeurs. 
                Faites-nous confiance pour rendre votre expérience immobilière fluide et mémorable.
              </p>
            </div>

            {/* Features Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 py-4'>
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className='flex items-start gap-3 p-3 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300'>
                    <div className='w-10 h-10 bg-[#e04141]/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <IconComponent className='w-5 h-5 text-[#e04141]' />
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900 text-sm mb-1'>{feature.title}</h3>
                      <p className='text-gray-600 text-xs leading-relaxed'>{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Statistics */}
            <div className='flex flex-wrap gap-6 py-4 border-t border-gray-200 pt-6'>
              {stats.map((stat, index) => (
                <div key={index} className='text-center'>
                  <div className='text-2xl md:text-3xl font-bold text-[#e04141]'>{stat.number}</div>
                  <div className='text-sm text-gray-600 font-medium'>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 pt-4'>
              <Button asChild className='bg-[#e04141] hover:bg-[#c73636] text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group'>
                <Link href="/about" className='flex items-center gap-2'>
                  En savoir plus
                  <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                className='border-[#e04141] text-[#e04141] hover:bg-[#e04141] hover:text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300'
              >
                Nous contacter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConnectingPeople