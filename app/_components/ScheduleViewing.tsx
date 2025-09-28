import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { Id } from "@/convex/_generated/dataModel"

import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'

interface ScheduleViewingProps {
  property: {
    _id: Id<"properties">;
    title: string;
  };
}

function ScheduleViewing({ property }: ScheduleViewingProps) {
    const { user } = useUser()
    const [heureSelectionnee, setHeureSelectionnee] = useState("")
    const [dateSelectionnee, setDateSelectionnee] = useState<Date | undefined>()
    const [message, setMessage] = useState('')
    const [succes, setSucces] = useState(false)
    const [enCours, setEnCours] = useState(false)
    const creerVisite = useMutation(api.propertyViewings.createViewing)
    const [telephone, setTelephone] = useState('')

    const heuresDisponibles = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!dateSelectionnee || !heureSelectionnee) {
            alert("Veuillez sélectionner une date et une heure")
            return
        }
        if (!user) {
            alert("Veuillez vous connecter")
            return
        }
        setEnCours(true)

        try {
            await creerVisite({
                propertyId: property._id,
                propertyTitle: property.title,
                userEmail: user.emailAddresses[0].emailAddress,
                userName: user.fullName || user.firstName || 'Inconnu',
                userPhone: telephone,
                viewingDate: format(dateSelectionnee, "yyyy-MM-dd"),
                viewingTime: heureSelectionnee,
                userId: user.id,
                message: message,
            })
            setSucces(true)
            setTimeout(() => {
                setSucces(false)
                setDateSelectionnee(undefined)
                setHeureSelectionnee('')
                setMessage('')
                setTelephone('')
            }, 2000)

        } catch (error) {
            console.error('Erreur lors de la planification de la visite:', error)
            alert('Échec de la planification de la visite. Veuillez réessayer.')
        } finally {
            setEnCours(false)
        }
    }

    const isDateDesactivee = (date: Date) => {
        const aujourdhui = new Date()
        aujourdhui.setHours(0, 0, 0, 0)
        return date < aujourdhui
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='w-[200px]'>Planifier une visite</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col">
                    <DialogHeader className="flex-shrink-0">
                        <DialogTitle className="text-xl font-bold">Planifier une visite</DialogTitle>
                        <DialogDescription asChild>
                            <div className="text-muted-foreground text-sm mt-2">
                                Réservez une visite pour "<strong>{property.title}</strong>"
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                        {succes ? (
                            <div className='text-center py-8 space-y-4'>
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">Visite planifiée !</h1>
                                <p className="text-gray-600">Nous vous contacterons bientôt pour confirmer votre rendez-vous</p>
                            </div>
                        ) : (
                            <form className="space-y-6 pb-2" onSubmit={handleSubmit}>
                                {/* Section Calendrier */}
                                <div className="space-y-3">
                                    <Label htmlFor="calendar" className="text-base font-semibold">
                                        Sélectionner une date *
                                    </Label>
                                    <div className="border rounded-lg p-3">
                                        <Calendar
                                            mode="single"
                                            selected={dateSelectionnee}
                                            onSelect={setDateSelectionnee}
                                            disabled={isDateDesactivee}
                                            className="w-full"
                                        />
                                    </div>
                                    {!dateSelectionnee && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            Veuillez sélectionner une date
                                        </p>
                                    )}
                                </div>

                                {/* Sélection de l'heure */}
                                <div className='space-y-3'>
                                    <Label className="text-base font-semibold">
                                        Sélectionner l'heure *
                                    </Label>
                                    <div className='grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto pr-1'>
                                        {heuresDisponibles.map((heure) => (
                                            <Button
                                                key={heure}
                                                type='button'
                                                onClick={() => setHeureSelectionnee(heure)}
                                                className={`p-2 text-sm font-medium rounded-md transition-all duration-200 h-auto min-h-[44px] ${
                                                    heureSelectionnee === heure 
                                                        ? "bg-red-600 text-white shadow-lg" 
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                                                }`}
                                                variant="ghost"
                                            >
                                                <Clock className='w-3 h-3 inline mr-1'/>
                                                {heure}
                                            </Button>
                                        ))}
                                    </div>
                                    {!heureSelectionnee && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            Veuillez sélectionner une heure
                                        </p>
                                    )}
                                </div>

                                {/* Numéro de téléphone */}
                                <div className='space-y-3'>
                                    <Label htmlFor="telephone" className="text-base font-semibold">
                                        Numéro de téléphone *
                                    </Label>
                                    <Input
                                        id="telephone"
                                        type="tel"
                                        value={telephone}
                                        onChange={(e) => setTelephone(e.target.value)}
                                        required
                                        placeholder="Entrez votre numéro de téléphone"
                                        className="p-3 text-base"
                                    />
                                    {!telephone && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            Le numéro de téléphone est requis
                                        </p>
                                    )}
                                </div>

                                {/* Message */}
                                <div className='space-y-3'>
                                    <Label htmlFor="message" className="text-base font-semibold">
                                        Message (Optionnel)
                                    </Label>
                                    <Textarea
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Exigences spécifiques, questions ou informations supplémentaires..."
                                        className="min-h-[80px] resize-vertical p-3 text-base"
                                    />
                                </div>

                                {/* Bouton de soumission */}
                                <div className="space-y-3 pt-2 sticky bottom-0 bg-white pb-2">
                                    <Button 
                                        type='submit' 
                                        disabled={!dateSelectionnee || !heureSelectionnee || enCours || !telephone}
                                        className={`w-full py-3 text-base font-semibold transition-all duration-200 ${
                                            (!dateSelectionnee || !heureSelectionnee || !telephone) 
                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-300" 
                                                : "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl"
                                        }`}
                                        size="lg"
                                    >
                                        {enCours ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                Planification en cours...
                                            </div>
                                        ) : (
                                            "Planifier la visite"
                                        )}
                                    </Button>

                                    {/* Texte d'aide */}
                                    {(!dateSelectionnee || !heureSelectionnee || !telephone) && (
                                        <p className="text-xs text-gray-500 text-center">
                                            * Remplissez tous les champs obligatoires pour planifier la visite
                                        </p>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ScheduleViewing