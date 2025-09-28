import React from 'react'
import { Property } from '../types'
import Link from 'next/link'
import Image from 'next/image'
import { Bath, Bed, MapPin, Square, Star } from 'lucide-react'

interface PropertyCardProps {
    property: Property
}

function PropertyCard({ property }: PropertyCardProps) {

  const getStatusColor = (status: string) => {
    switch(status) {
      case "for-sale":
        return "bg-green-100 text-green-800";
      case "for-rent":
        return "bg-blue-100 text-blue-800";
      case "sold":
        return "bg-gray-100 text-gray-800";
      case "rented":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";   
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "for-sale":
        return "À Vendre";
      case "for-rent":
        return "À Louer";
      case "sold":
        return "Vendu";
      case "rented":
        return "Loué";
      default:
        return status;
    }
  };

  const getPropertyTypeText = (type: string) => {
    switch (type) {
      case "house":
        return "Maison";
      case "apartment":
        return "Appartement";
      case "townhouse":
        return "Maison de Ville";
      case "condo":
        return "Condo";
      default:
        return type.replace("-", " ");
    }
  }

  return (
    <Link href={`/properties/${property?._id}`}>
      <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]'>
        
        {/* Image */}
        <div className='relative w-full'>
          {property.images && property.images.length > 0 ? (
            <Image 
              alt={property.title} 
              width={500} 
              height={500} 
              className='object-cover w-full h-[350px]' 
              src={property?.images[0]}
            />
          ) : (
            <div className='w-full h-[350px] bg-gray-200 flex items-center justify-center'>
              <span className="text-gray-400">Aucune image</span>
            </div>
          )}

          {/* Status Badge */}
          <div className='absolute top-4 left-4'>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(property?.status)}`}>
              {getStatusText(property.status)}
            </span>
          </div>

          {/* Featured Badge */}
          {property?.featured && (
            <div className='absolute top-4 right-4'>
              <span className='bg-yellow-500 px-3 py-1 rounded-full text-black text-sm font-medium flex items-center gap-1'>
                <Star className='w-3 h-3 fill-current' />
                En Vedette
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className='p-4'>
          {/* Price */}
          <div className='mb-2'>
            <span className='text-2xl text-[#e04141] font-bold'>
              {property?.price.toLocaleString("fr-FR")} €
            </span>
            {property?.status === "for-rent" && (
              <span className="text-gray-600 text-sm"> /mois</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
            {property.title}
          </h3>

          {/* Location */}
          <div className='flex items-center text-gray-600 mb-3'>
            <MapPin className="h-4 w-4 mr-1" />
            <span className='text-sm'>{property?.city}, {property?.state}</span>
          </div>

          {/* Property Details */}
          <div className='flex items-center justify-between text-gray-600 mb-3'>
            <div className='flex items-center space-x-4'>
              <div className='flex items-center'>
                <Bed className='h-4 w-4 mr-1'/>
                <span className='text-sm'>{property?.bedrooms}</span>
              </div>

              <div className='flex items-center'>
                <Bath className='h-4 w-4 mr-1'/>
                <span className='text-sm'>{property?.bathrooms}</span>
              </div>

              <div className='flex items-center'>
                <Square className='h-4 w-4 mr-1'/>
                <span className='text-sm'>{property?.area} m²</span>
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div className='mt-2'>
            <span className='inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize font-medium'>
              {getPropertyTypeText(property?.propertyType)}
            </span>
          </div>  
        </div>
      </div>
    </Link>
  )
}

export default PropertyCard