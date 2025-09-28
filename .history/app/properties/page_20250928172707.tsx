"use client"

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { ArrowBigRight, Home, Filter, X } from 'lucide-react'
import { PropertyFilters as Filters } from "../types"
import Link from 'next/link'
import React, { useEffect, useState, Suspense } from 'react'
import PropertyCard from '../_components/PropertyCard'
import PropertyFilters from '../_components/PropertyFilters'
import { useSearchParams } from 'next/navigation'

function PropertiesPageContent() {
  const [filters, setFilters] = useState<Filters>({})
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const properties = useQuery(api.properties.getProperties, filters)
  
  const searchParams = useSearchParams()
  const propertyType = searchParams.get("type")

  // Déterminer le titre de la page selon le type
  const getPageTitle = () => {
    switch (propertyType) {
      case 'house':
        return 'Maisons'
      case 'apartment':
        return 'Appartements'
      case 'townhouse':
        return 'Maisons de Ville'
      case 'condo':
        return 'Condos'
      default:
        return 'Tous les Biens'
    }
  }

  useEffect(() => {
    if (propertyType) {
      setFilters(prev => ({
        ...prev,
        propertyType: propertyType
      }))
    }
  }, [propertyType])

  return (
    <div className='min-h-screen bg-gray-50'>
      
      {/* En-tête de la page */}
      <div className='bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>{getPageTitle()}</h1>
              {properties && (
                <p className='text-gray-600 mt-1 text-sm sm:text-base'>
                  {properties.length} {properties.length === 1 ? 'bien trouvé' : 'biens trouvés'}
                </p>
              )}
            </div>
            
            <div className='flex flex-col sm:flex-row gap-3'>
              {/* Bouton Filtres Mobile */}
              <Button 
                variant="outline"
                className='sm:hidden flex items-center gap-2'
                onClick={() => setShowMobileFilters(true)}
              >
                <Filter className="w-4 h-4" />
                Filtres
                {Object.keys(filters).length > 0 && (
                  <span className="bg-[#e04141] text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {Object.keys(filters).length}
                  </span>
                )}
              </Button>
              
              <Link href="/properties/new" className='w-full sm:w-auto'>
                <Button className='bg-[#e04141] hover:bg-[#c73636] flex items-center gap-2 w-full sm:w-auto'>
                  <ArrowBigRight className="w-4 h-4" />
                  Ajouter un bien
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres Mobile - Overlay */}
      {showMobileFilters && (
        <div className='fixed inset-0 z-50 lg:hidden'>
          <div className='absolute inset-0 bg-black/50' onClick={() => setShowMobileFilters(false)} />
          <div className='absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white overflow-y-auto'>
            <div className='p-4 border-b flex items-center justify-between'>
              <h3 className='text-lg font-semibold'>Filtres</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowMobileFilters(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className='p-4'>
              <PropertyFilters filters={filters} onFiltersChange={setFilters}/>
              
              {Object.keys(filters).length > 0 && (
                <div className='mt-6 pt-6 border-t'>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setFilters({})
                      setShowMobileFilters(false)
                    }}
                    className='w-full mb-3'
                  >
                    Effacer tous les filtres
                  </Button>
                </div>
              )}
              
              <Button 
                onClick={() => setShowMobileFilters(false)}
                className='w-full bg-[#e04141] hover:bg-[#c73636]'
              >
                Voir les résultats
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Contenu principal - Layout deux colonnes */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8'>
          
          {/* Barre latérale - Filtres (cachée sur mobile) */}
          <div className='hidden lg:block lg:col-span-1'>
            <div className='bg-white rounded-xl shadow-sm border p-6 sticky top-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-6'>Filtrer les biens</h3>
              <PropertyFilters filters={filters} onFiltersChange={setFilters}/>
              
              {/* Bouton Effacer les filtres */}
              {Object.keys(filters).length > 0 && (
                <div className='mt-6 pt-6 border-t'>
                  <Button 
                    variant="outline" 
                    onClick={() => setFilters({})}
                    className='w-full'
                  >
                    Effacer tous les filtres
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Colonne principale */}
          <div className='lg:col-span-3 lg:col-start-2 lg:col-end-5'>
            
            {/* Résumé et tri mobile */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3'>
              <div className='text-sm text-gray-600'>
                Affichage de {properties?.length || 0} {properties?.length === 1 ? 'bien' : 'biens'}
              </div>
              
              {/* Options de tri */}
              <div className='flex items-center gap-2 text-sm text-gray-600'>
                <span className='hidden sm:inline'>Trier par :</span>
                <select className='border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-auto'>
                  <option>Plus récents</option>
                  <option>Prix : Croissant</option>
                  <option>Prix : Décroissant</option>
                </select>
              </div>
            </div>

            {/* État de chargement */}
            {properties === undefined ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white animate-pulse rounded-xl h-80 shadow-sm border"></div>
                ))}
              </div>
            ) 
            
            /* État vide */
            : properties.length === 0 ? (
              <div className='bg-white rounded-xl shadow-sm border p-6 sm:p-12 text-center'>
                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Home className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {propertyType 
                    ? `Aucun ${getPageTitle().toLowerCase()} trouvé`
                    : 'Aucun bien trouvé'
                  }
                </h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  {propertyType 
                    ? 'Essayez d\'ajuster vos filtres ou revenez plus tard pour de nouvelles annonces.'
                    : 'Soyez le premier à ajouter un bien sur notre plateforme.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/properties/new" className='w-full sm:w-auto'>
                    <Button className='bg-[#e04141] hover:bg-[#c73636] w-full sm:w-auto'>
                      Ajouter votre bien
                    </Button>
                  </Link>
                  {propertyType && (
                    <Link href="/properties" className='w-full sm:w-auto'>
                      <Button variant="outline" className='w-full sm:w-auto'>
                        Voir tous les biens
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ) 
            
            /* Grille des biens */
            : (
              <>
                {/* Grille des biens */}
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'>
                  {properties?.map((property) => (
                    <PropertyCard key={property._id} property={property}/>
                  ))}
                </div>

                {/* Lien retour à tous les biens */}
                {propertyType && (
                  <div className='text-center mt-8 sm:mt-12'>
                    <Link href="/properties">
                      <Button variant="outline" size="lg" className='w-full sm:w-auto'>
                        Voir tous les biens
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e04141] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    }>
      <PropertiesPageContent />
    </Suspense>
  )
}