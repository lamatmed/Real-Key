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

function PageDetailPropriete({ params }: { params: Promise<{ id: string }> }) {
  const [indexImageSelectionnee, setIndexImageSelectionnee] = useState(0);
  const router = useRouter();
  // Déballer les params avec React.use()
  const paramsDeballes = React.use(params);
  const propriete = useQuery(api.properties.getProperty, {
    id: paramsDeballes.id as any,
  });

  const supprimerPropriete = useMutation(api.properties.deleteProperty);

  const handleSuppression = async () => {
    try {
      await supprimerPropriete({ id: paramsDeballes.id as any });
      router.push("/properties");
    } catch (error) {
      console.error("Erreur lors de la suppression de la propriété:", error);
      alert("Échec de la suppression de la propriété");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mt-10 justify-end">
        <Link href={`/properties/${propriete?._id}/edit`}>
          <Button>Modifier</Button>
        </Link>
        <Button onClick={handleSuppression} className="bg-red-600">
          Supprimer
        </Button>
      </div>

      {/* Galerie d'images */}
      <div className="mb-8">
        {propriete?.images && propriete.images.length > 0 ? (
          <div className="space-y-4">
            {/* Image principale */}
            <div className="w-full mt-10">
              <Image
                alt="image propriété"
                width={1500}
                height={1500}
                className="object-cover w-full rounded-lg h-[550px]"
                src={propriete?.images[indexImageSelectionnee]}
              />
            </div>

            {propriete?.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {propriete?.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setIndexImageSelectionnee(index)}
                  >
                    <Image
                      width={800}
                      height={500}
                      alt="miniature"
                      className="object-cover w-[200px] h-[200px] mt-52"
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

      {/* Contenu */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contenu principal */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {propriete?.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin />
              <span>
                {propriete?.address}, {propriete?.city}, {propriete?.state}{" "}
                {propriete?.zipCode}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <p className="text-3xl font-bold text-red-600">
                ${propriete?.price?.toLocaleString()}
              </p>
              {propriete?.status === "for-rent" && (
                <span className="text-lg text-gray-600">/mois</span>
              )}
            </div>
          </div>

          {/* Détails de la propriété */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="mb-5 font-bold">Détails de la propriété</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Bed className="text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">
                  {propriete?.bedrooms} Chambres
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Bath className="text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">
                  {propriete?.bathrooms} Salles de bain
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Square className="text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">{propriete?.area} Pieds carrés</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Calendar className="text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">
                  Type: {propriete?.propertyType}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-bold">Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {propriete?.description}
            </p>
          </div>
        </div>

        {/* Barre latérale */}
        <div className="space-y-6">
          {/* Carte de contact */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-bold text-lg">Informations de contact</h3>
            <div className="space-y-3 mt-5 flex flex-col items-center justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-[200px]">Contacter l'agent</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Contacter l'agent</DialogTitle>
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
                            <p className="text-gray-600">WhatsApp disponible</p>
                          </div>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              {propriete?._id && (
                <ScheduleViewing
                  property={{
                    _id: propriete._id,
                    title: propriete.title,
                  }}
                />
              )}
              <Button className="w-[200px]">Sauvegarder</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageDetailPropriete;