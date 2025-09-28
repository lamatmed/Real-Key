"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Bath, Bed, Calendar, MapPin, Square } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ScheduleViewing from "@/app/_components/ScheduleViewing";

function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const router = useRouter();

  const property = useQuery(api.properties.getProperty, {
    id: params.id as any,
  });

  const deleteProperty = useMutation(api.properties.deleteProperty);

  const handleDelete = async () => {
    try {
      await deleteProperty({ id: params.id as any });
      router.push("/properties");
    } catch (error) {
      console.error("Erreur suppression propriété:", error);
      alert("Échec de la suppression de la propriété");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Boutons d’action */}
      <div className="flex items-center gap-4 mt-10 justify-end">
        <Link href={`/properties/${property?._id}/edit`}>
          <Button>Modifier</Button>
        </Link>
        <Button onClick={handleDelete} className="bg-red-600 ">
          Supprimer
        </Button>
      </div>

      {/* Galerie d’images */}
      <div className="mb-8">
        {property?.images && property.images.length > 0 ? (
          <div className="space-y-4">
            {/* Image principale */}
            <div className="w-full mt-10">
              <Image
                alt="image propriété"
                width={1500}
                height={1500}
                className="object-cover w-full rounded-lg h-[550px]"
                src={property?.images[selectedImageIndex]}
              />
            </div>

            {/* Miniatures */}
            {property?.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {property?.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      width={120}
                      height={120}
                      alt="miniature"
                      className="object-cover w-[120px] h-[120px] rounded cursor-pointer border hover:border-red-500 transition"
                      src={image}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <span className="text-gray-400">Aucune image disponible</span>
        )}
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne gauche */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {property?.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="mr-1" />
              <span>
                {property?.address}, {property?.city}, {property?.state}{" "}
                {property?.zipCode}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <p className="text-3xl font-bold text-red-600">
                {property?.price?.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              {property?.status === "for-rent" && (
                <span className="text-lg text-gray-600">/mois</span>
              )}
            </div>
          </div>

          {/* Détails */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="mb-5 font-bold">Détails de la propriété</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Bed className="text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">
                  {property?.bedrooms} Chambres
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Bath className="text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">
                  {property?.bathrooms} Salles de bain
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Square className="text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">{property?.area} m²</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Calendar className="text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">
                  Type : {property?.propertyType}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-bold">Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {property?.description}
            </p>
          </div>
        </div>

        {/* Colonne droite (sidebar) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-bold text-lg">Informations de contact</h3>
            <div className="space-y-3 mt-5 flex flex-col items-center justify-center">
              {/* Dialog contact agent */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-[200px]">Contacter l’agent</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Contacter l’agent</DialogTitle>
                    <DialogDescription asChild>
                      <div className="text-muted-foreground text-sm">
                        <div className="flex items-center gap-4 mt-4">
                          <Image
                            width={100}
                            height={100}
                            alt="whatsapp"
                            src="/whatsApp.jpg"
                            className="rounded-full"
                          />
                          <div>
                            <p className="text-2xl font-bold text-green-600">
                              +222 30572816
                            </p>
                            <p className="text-gray-600">Disponible sur WhatsApp</p>
                          </div>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              {property?._id && (
                <ScheduleViewing
                  property={{
                    _id: property._id,
                    title: property.title,
                  }}
                />
              )}

              <Button className="w-[200px]">Enregistrer la propriété</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailPage;
