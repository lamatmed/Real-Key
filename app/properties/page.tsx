"use client"

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { ArrowBigRight, Home } from 'lucide-react'
import { PropertyFilters as Filters } from "../types"
import Link from 'next/link'
import React, { useEffect, useState, Suspense } from 'react'
import PropertyCard from '../_components/PropertyCard'
import PropertyFilters from '../_components/PropertyFilters'
import { useSearchParams } from 'next/navigation'

function PropertiesPageContent() {
  const [filters, setFilters] = useState<Filters>({})
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
        <div className='max-w-7xl mx-auto px-6 py-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>{getPageTitle()}</h1>
              {properties && (
                <p className='text-gray-600 mt-1'>
                  {properties.length} {properties.length === 1 ? 'bien trouvé' : 'biens trouvés'}
                </p>
              )}
            </div>
            
            <Link href="/properties/new">
              <Button className='bg-[#e04141] hover:bg-[#c73636] flex items-center gap-2'>
                <ArrowBigRight className="w-4 h-4" />
                Ajouter un bien
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Contenu principal - Layout deux colonnes */}
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          
          {/* Barre latérale - Filtres (1/4 de largeur) */}
          <div className='lg:col-span-1'>
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

          {/* Colonne principale (3/4 de largeur) */}
          <div className='lg:col-span-3'>
            
            {/* État de chargement */}
            {properties === undefined ? (
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white animate-pulse rounded-xl h-80 shadow-sm border"></div>
                ))}
              </div>
            ) 
            
            /* État vide */
            : properties.length === 0 ? (
              <div className='bg-white rounded-xl shadow-sm border p-12 text-center'>
                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Home className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {propertyType 
                    ? `Aucun ${getPageTitle().toLowerCase()} trouvé`
                    : 'Aucun bien trouvé'
                  }
                </h3>
                <p className="text-gray-600 mb-6">
                  {propertyType 
                    ? 'Essayez d\'ajuster vos filtres ou revenez plus tard pour de nouvelles annonces.'
                    : 'Soyez le premier à ajouter un bien sur notre plateforme.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/properties/new">
                    <Button className='bg-[#e04141] hover:bg-[#c73636]'>
                      Ajouter votre bien
                    </Button>
                  </Link>
                  {propertyType && (
                    <Link href="/properties">
                      <Button variant="outline">
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
                {/* Résumé des résultats */}
                <div className='flex items-center justify-between mb-6'>
                  <div className='text-sm text-gray-600'>
                    Affichage de {properties.length} {properties.length === 1 ? 'bien' : 'biens'}
                  </div>
                  
                  {/* Options de tri */}
                  <div className='hidden sm:flex items-center gap-2 text-sm text-gray-600'>
                    <span>Trier par :</span>
                    <select className='border border-gray-300 rounded-md px-3 py-1 text-sm'>
                      <option>Plus récents</option>
                      <option>Prix : Croissant</option>
                      <option>Prix : Décroissant</option>
                    </select>
                  </div>
                </div>

                {/* Grille des biens */}
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                  {properties?.map((property) => (
                    <PropertyCard key={property._id} property={property}/>
                  ))}
                </div>

                {/* Lien retour à tous les biens */}
                {propertyType && (
                  <div className='text-center mt-12'>
                    <Link href="/properties">
                      <Button variant="outline" size="lg">
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