"use client"
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import React, { useState } from 'react'
import { PropertyFormData } from '../types'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface PropertyFormProps {
  initialData?: Partial<PropertyFormData>
  isEditing?: boolean;
  propertyId?: string;
}

function PropertyForm({ initialData, isEditing = false, propertyId }: PropertyFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const createProperty = useMutation(api.properties.createProperty)
  const updateProperty = useMutation(api.properties.updateProperty)
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    bedrooms: initialData?.bedrooms || 1,
    bathrooms: initialData?.bathrooms || 1,
    area: initialData?.area || 0,
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    zipCode: initialData?.zipCode || "",
    propertyType: initialData?.propertyType || "house",
    status: initialData?.status || "for-sale",
    images: initialData?.images || [],
    featured: initialData?.featured || false,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['price', 'bedrooms', 'bathrooms', 'area'].includes(name) ? Number(value) : value,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditing && propertyId) {
        await updateProperty({
          id: propertyId as any,
          ...formData
        })
      } else {
        await createProperty(formData);
      }
      router.push("/properties");
    } catch (error) {
      console.error("Error saving property:", error);
      alert("Failed to save property. Please try again.");
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return;

    setIsUploading(true);
    const uploadedImages: string[] = []

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData
        })

        if (!response.ok) throw new Error("Upload failed");

        const { url } = await response.json()
        uploadedImages.push(url)
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }))
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload images. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  const removeImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Informations de base
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
            <input
              type="text"
              name="title"
              value={formData?.title}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              name="description"
              value={formData?.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Surface (m²) *</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Détails de la propriété
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chambres *</label>
            <select
              name="bedrooms"
              value={formData?.bedrooms}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salles de bain *</label>
            <select
              name="bathrooms"
              value={formData?.bathrooms}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
            <select
              name="propertyType"
              value={formData?.propertyType}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            >
              <option value="house">Maison</option>
              <option value="apartment">Appartement</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Maison de ville</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut *</label>
            <select
              name="status"
              value={formData?.status}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            >
              <option value="for-sale">À vendre</option>
              <option value="for-rent">À louer</option>
              <option value="sold">Vendu</option>
              <option value="rented">Loué</option>
            </select>
          </div>

          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">En vedette ?</label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                className="h-4 w-4 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Mettre en avant cette propriété</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">État *</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Code postal *</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Images
        </h3>

        <label>
          <div className="mb-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-indigo-400 transition">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-600 text-sm">
              {isUploading ? "Téléversement en cours..." : "Cliquez ou glissez-déposez vos images"}
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
              className="hidden"
            />
          </div>
        </label>

        {formData?.images?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData?.images?.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <Image
                  alt={`Property image ${index + 1}`}
                  width={150}
                  height={200}
                  src={imageUrl}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isUploading}>
        {isEditing
          ? (isUploading ? "Mise à jour..." : "Mettre à jour")
          : (isUploading ? "Création..." : "Créer la propriété")}
      </Button>
    </form>
  )
}

export default PropertyForm
