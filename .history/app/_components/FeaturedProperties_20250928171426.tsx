"use client"
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'
import PropertyCard from './PropertyCard'
import { ArrowRight, Home, Users, UserCheck, MapPin } from 'lucide-react'
import Link from 'next/link'

function FeaturedProperties() {
    const featuredProperties = useQuery(api.properties.getFeaturedProperties)

    return (
        <section className='p-8 md:p-16 lg:p-24 mb-16 space-y-16 bg-gray-50/50'>
            {/* En-tête */}
            <div className='text-center space-y-4'>
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900'>
                    Biens <span className='text-[#e04141]'>En Vedette</span>
                </h2>
                <p className='text-gray-600 text-lg md:text-xl max-w-2xl mx-auto'>
                    Découvrez notre sélection exclusive de propriétés soigneusement choisies pour leur qualité et leur emplacement exceptionnel.
                </p>
            </div>

            {/* Grille des propriétés */}
            {featuredProperties === undefined ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-96">
                            <div className="h-48 bg-gray-300 rounded-t-2xl"></div>
                            <div className="p-6 space-y-4">
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                                <div className="h-8 bg-gray-300 rounded w-full mt-4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : featuredProperties.length === 0 ? (
                <div className='text-center py-16 bg-white rounded-3xl shadow-lg'>
                    <div className='w-20 h-20 bg-[#e04141]/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                        <Home className='w-10 h-10 text-[#e04141]' />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                        Aucun bien en vedette pour le moment
                    </h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        Soyez le premier à ajouter votre propriété et bénéficiez d'une visibilité exceptionnelle.
                    </p>
                    <Button className='bg-[#e04141] hover:bg-[#c73636] text-white px-8 py-3 rounded-full'>
                        Ajouter une propriété
                    </Button>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {featuredProperties?.map((property) => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>
            )}

            {/* Bouton Voir Tout */}
            {featuredProperties && featuredProperties.length > 0 && (
                <div className='flex justify-center pt-8'>
                    <Link href="/properties">
                        <Button className='bg-gradient-to-r from-[#e04141] to-[#c73636] hover:from-[#c73636] hover:to-[#b32b2b] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group'>
                            Voir tous les biens
                            <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300' />
                        </Button>
                    </Link>
                </div>
            )}

            {/* Section Statistiques */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-16'>
                <div className='flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-[#f9e0e0] to-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[#e04141]/10'>
                    <div className='w-16 h-16 bg-[#e04141]/20 rounded-2xl flex items-center justify-center mb-4'>
                        <Home className='w-8 h-8 text-[#e04141]' />
                    </div>
                    <h3 className='text-5xl font-bold text-[#e04141] mb-2'>500+</h3>
                    <p className="text-gray-600 text-center font-medium">Biens listés</p>
                </div>

                <div className='flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-green-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-green-100'>
                    <div className='w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4'>
                        <Users className='w-8 h-8 text-green-600' />
                    </div>
                    <h3 className='text-5xl font-bold text-green-600 mb-2'>200+</h3>
                    <p className="text-gray-600 text-center font-medium">Clients satisfaits</p>
                </div>

                <div className='flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-amber-100'>
                    <div className='w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-4'>
                        <UserCheck className='w-8 h-8 text-amber-600' />
                    </div>
                    <h3 className='text-5xl font-bold text-amber-600 mb-2'>100+</h3>
                    <p className="text-gray-600 text-center font-medium">Agents experts</p>
                </div>

                <div className='flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-100'>
                    <div className='w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4'>
                        <MapPin className='w-8 h-8 text-blue-600' />
                    </div>
                    <h3 className='text-5xl font-bold text-blue-600 mb-2'>50+</h3>
                    <p className="text-gray-600 text-center font-medium">Villes couvertes</p>
                </div>
            </div>
            <div className=''>

            </div>
        </section>
    )
}

export default FeaturedProperties