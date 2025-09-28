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
      <div className='bg-white border-b sticky top-0 z-40'>
        <div className='max-w-7xl mx-auto px-3 py-4'>
          <div className='flex flex-col space-y-3'>
            <div className='flex items-center justify-between'>
              <h1 className='text-xl font-bold text-gray-900 truncate pr-2'>{getPageTitle()}</h1>
              <Link href="/properties/new">
                <Button className='bg-[#e04141] hover:bg-[#c73636] flex items-center gap-1 p-2 h-9'>
                  <ArrowBigRight className="w-3 h-3" />
                  <span className='text-xs'>Ajouter</span>
                </Button>
              </Link>
            </div>
            
            <div className='flex items-center justify-between'>
              {properties && (
                <p className='text-xs text-gray-600'>
                  {properties.length} {properties.length === 1 ? 'bien' : 'biens'}
                </p>
              )}
              
              {/* Bouton Filtres Mobile */}
              <Button 
                variant="outline"
                className='flex items-center gap-1 p-2 h-7 text-xs'
                onClick={() => setShowMobileFilters(true)}
              >
                <Filter className="w-3 h-3" />
                Filtres
                {Object.keys(filters).length > 0 && (
                  <span className="bg-[#e04141] text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                    {Object.keys(filters).length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres Mobile - Overlay plein écran */}
      {showMobileFilters && (
        <div className='fixed inset-0 z-50 lg:hidden'>
          <div className='absolute inset-0 bg-white overflow-y-auto'>
            {/* Header fixe */}
            <div className='bg-white border-b sticky top-0 z-10 p-3 flex items-center justify-between'>
              <h3 className='text-lg font-semibold'>Filtres</h3>
              <Button 
                variant="ghost" 
                size="icon"
                className='h-8 w-8'
                onClick={() => setShowMobileFilters(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Contenu des filtres */}
            <div className='p-3 pb-24'>
              <PropertyFilters filters={filters} onFiltersChange={setFilters}/>
            </div>
            
            {/* Boutons fixes en bas */}
            <div className='fixed bottom-0 left-0 right-0 bg-white border-t p-3 space-y-2'>
              {Object.keys(filters).length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFilters({})
                    setShowMobileFilters(false)
                  }}
                  className='w-full h-9 text-sm'
                >
                  Effacer tous les filtres
                </Button>
              )}
              
              <Button 
                onClick={() => setShowMobileFilters(false)}
                className='w-full bg-[#e04141] hover:bg-[#c73636] h-9 text-sm'
              >
                Voir les résultats
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className='max-w-7xl mx-auto px-3 py-4'>
        <div className='space-y-4'>
          
          {/* Options de tri - version mobile compacte */}
          <div className='flex items-center justify-between bg-white p-3 rounded-lg border'>
            <span className='text-xs text-gray-600'>Trier par</span>
            <select className='border-0 bg-transparent text-xs font-medium p-0'>
              <option>Plus récents</option>
              <option>Prix croissant</option>
              <option>Prix décroissant</option>
            </select>
          </div>

          {/* État de chargement */}
          {properties === undefined ? (
            <div className='space-y-3'>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white animate-pulse rounded-lg h-64 shadow-sm border"></div>
              ))}
            </div>
          ) 
          
          /* État vide */
          : properties.length === 0 ? (
            <div className='bg-white rounded-lg shadow-sm border p-6 text-center'>
              <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                <Home className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {propertyType 
                  ? `Aucun ${getPageTitle().toLowerCase()} trouvé`
                  : 'Aucun bien trouvé'
                }
              </h3>
              <p className="text-gray-600 text-xs mb-4 leading-relaxed">
                {propertyType 
                  ? 'Ajustez vos filtres ou revenez plus tard.'
                  : 'Soyez le premier à ajouter un bien.'
                }
              </p>
              <div className="flex flex-col space-y-2">
                <Link href="/properties/new">
                  <Button className='bg-[#e04141] hover:bg-[#c73636] w-full h-9 text-sm'>
                    Ajouter votre bien
                  </Button>
                </Link>
                {propertyType && (
                  <Link href="/properties">
                    <Button variant="outline" className='w-full h-9 text-sm'>
                      Voir tous les biens
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ) 
          
          /* Liste des biens */
          : (
            <>
              {/* Liste des biens - version verticale pour mobile */}
              <div className='space-y-3'>
                {properties?.map((property) => (
                  <div key={property._id} className='bg-white rounded-lg border overflow-hidden'>
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>

              {/* Lien retour à tous les biens */}
              {propertyType && (
                <div className='text-center pt-4'>
                  <Link href="/properties">
                    <Button variant="outline" className='w-full h-9 text-sm'>
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
  )
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-3">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e04141] mx-auto"></div>
          <p className="mt-3 text-gray-600 text-sm">Chargement...</p>
        </div>
      </div>
    }>
      <PropertiesPageContent />
    </Suspense>
  )
}