import React from 'react'
import { Home, Key, Building2, TrendingUp, ShieldCheck, Users, ArrowRight } from 'lucide-react'

function WhatWeDo() {
  const services = [
    {
      icon: Home,
      title: "Vente Immobilière",
      description: "Trouvez la maison de vos rêves avec Real Key. Notre équipe d'experts vous guide à chaque étape pour une transaction en toute sérénité."
    },
    {
      icon: Key,
      title: "Location de Biens", 
      description: "Découvrez notre sélection de biens en location, soigneusement choisis pour répondre à vos besoins et préférences."
    },
    {
      icon: Building2,
      title: "Gestion Immobilière",
      description: "Confiez-nous la gestion quotidienne de votre bien. Nous maximisons sa valeur tout en réduisant votre charge de travail."
    },
    {
      icon: TrendingUp,
      title: "Investissements Rentables",
      description: "Profitez d'opportunités d'investissement immobiliers lucratives avec des rendements élevés et un accompagnement expert."
    }
  ]

  return (
    <section className='bg-white shadow-2xl rounded-3xl p-8 md:p-12 mx-4 md:mx-8 my-16'>
      {/* En-tête */}
      <div className='text-center mb-16'>
        <div className='flex items-center justify-center mb-6'>
          <div className='bg-gradient-to-br from-[#e04141]/10 to-[#e04141]/5 p-4 rounded-2xl shadow-lg'>
            <ShieldCheck className='w-10 h-10 text-[#e04141]' />
          </div>
        </div>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
          Nos <span className='text-[#e04141]'>Services</span>
        </h1>
        <p className='text-gray-600 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto'>
          Simplifiez votre parcours immobilier. Que vous souhaitiez acheter, vendre ou louer, 
          notre équipe d'experts vous accompagne avec des solutions sur mesure.
        </p>
      </div>

      {/* Grille des Services */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
        {services.map((service, index) => {
          const IconComponent = service.icon
          return (
            <div 
              key={index}
              className='group relative p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 hover:border-[#e04141]/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden'
            >
              {/* Effet de fond animé */}
              <div className='absolute inset-0 bg-gradient-to-br from-[#e04141]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
              
              {/* Icone */}
              <div className='mb-6 relative z-10'>
                <div className='w-18 h-18 bg-gradient-to-br from-[#e04141]/15 to-[#e04141]/5 group-hover:from-[#e04141]/20 group-hover:to-[#e04141]/10 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg group-hover:shadow-xl p-4'>
                  <IconComponent className='w-10 h-10 text-[#e04141] group-hover:scale-110 transition-transform duration-300' />
                </div>
              </div>

              {/* Contenu */}
              <div className='relative z-10'>
                <h3 className='text-[#e04141] font-bold text-xl md:text-2xl mb-4 group-hover:text-[#c73636] transition-colors duration-300'>
                  {service.title}
                </h3>
                <p className='text-gray-600 leading-relaxed text-sm md:text-base mb-6'>
                  {service.description}
                </p>

                {/* Lien En Savoir Plus */}
                <div className='flex items-center text-[#e04141] text-sm font-semibold group-hover:text-[#c73636] transition-colors duration-300 cursor-pointer'>
                  <span>En savoir plus</span>
                  <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300' />
                </div>
              </div>

              {/* Indicateur de hover */}
              <div className='absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#e04141] to-[#c73636] group-hover:w-full transition-all duration-500'></div>
            </div>
          )
        })}
      </div>

      {/* Section Confiance et CTA */}
      <div className='text-center mt-16 pt-12 border-t border-gray-200'>
        {/* Statistiques de confiance */}
        <div className='flex flex-col md:flex-row items-center justify-center gap-8 mb-8'>
          <div className='flex items-center gap-3 text-gray-700'>
            <Users className='w-6 h-6 text-[#e04141]' />
            <span className='text-lg font-semibold'>1000+ clients satisfaits</span>
          </div>
          <div className='hidden md:block w-1 h-6 bg-gray-300'></div>
          <div className='flex items-center gap-3 text-gray-700'>
            <Building2 className='w-6 h-6 text-[#e04141]' />
            <span className='text-lg font-semibold'>500+ transactions</span>
          </div>
          <div className='hidden md:block w-1 h-6 bg-gray-300'></div>
          <div className='flex items-center gap-3 text-gray-700'>
            <ShieldCheck className='w-6 h-6 text-[#e04141]' />
            <span className='text-lg font-semibold'>98% de satisfaction</span>
          </div>
        </div>

        {/* Bouton d'action */}
        <button className='bg-gradient-to-r from-[#e04141] to-[#c73636] hover:from-[#c73636] hover:to-[#b32b2b] text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl hover:shadow-[#e04141]/30 flex items-center gap-3 mx-auto'>
          <span>Démarrer Maintenant</span>
          <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
        </button>
        
        <p className='text-gray-500 text-sm mt-4'>
          Consultation gratuite sans engagement
        </p>
      </div>
    </section>
  )
}

export default WhatWeDo