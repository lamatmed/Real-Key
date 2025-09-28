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
        await updateProperty({ id: propertyId as any, ...formData })
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

        const response = await fetch("/api/upload", { method: "POST", body: formData })
        if (!response.ok) throw new Error("Upload failed")

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
      <div className="bg-white p-6 rounded-xl shadow border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations de base</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
            <input
              type="text"
              name="title"
              value={formData?.title}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              value={formData?.description}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prix *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Surface (m²) *</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Détails de la propriété</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Chambres, SDB, Type, Statut */}
          ...
        </div>
      </div>

      {/* Image Upload */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Images</h3>
        <label>
          <div className="mb-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-400 transition">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              {isUploading ? "Chargement..." : "Cliquez pour téléverser"}
            </div>
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
                  alt={`Image ${index + 1}`}
                  width={150}
                  height={200}
                  src={imageUrl}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg"
      >
        {isEditing ? "Mettre à jour la propriété" : "Créer la propriété"}
      </Button>
    </form>
  )
}

export default PropertyForm
