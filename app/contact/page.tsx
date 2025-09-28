"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyType: ''
  })
  
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici vous ajouterez la logique d'envoi du formulaire
    console.log('Form data:', formData)
    setIsSubmitted(true)
    
    // Réinitialiser après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        propertyType: ''
      })
    }, 3000)
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "Téléphone",
      details: "01 23 45 67 89",
      description: "Lun-Ven: 9h-19h | Sam: 9h-17h",
      action: "tel:+33123456789"
    },
    {
      icon: Mail,
      title: "Email",
      details: "contact@realkey.fr",
      description: "Réponse sous 24h",
      action: "mailto:contact@realkey.fr"
    },
    {
      icon: MapPin,
      title: "Agence",
      details: "123 Avenue des Champs-Élysées",
      description: "75008 Paris, France",
      action: "https://maps.google.com"
    },
    {
      icon: Clock,
      title: "Horaires",
      details: "Ouvert 6j/7",
      description: "Lun-Sam: 9h-19h",
      action: null
    }
  ]

  const propertyTypes = [
    "Appartement",
    "Maison",
    "Studio",
    "Loft",
    "Local commercial",
    "Terrain",
    "Autre"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#e04141] to-[#c73636] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contactez-nous</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Une question ? Un projet ? Notre équipe d'experts est à votre écoute 
            pour vous accompagner dans toutes vos démarches immobilières.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Informations de contact */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Prendre Contact</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Que vous souhaitiez acheter, vendre, louer ou simplement obtenir des conseils, 
                nos experts immobiliers sont à votre disposition pour vous guider.
              </p>
            </div>

            {/* Méthodes de contact */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-[#e04141]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-[#e04141]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">{method.title}</h3>
                      {method.action ? (
                        <a 
                          href={method.action} 
                          className="text-[#e04141] hover:text-[#c73636] text-lg font-medium block mb-1 transition-colors"
                        >
                          {method.details}
                        </a>
                      ) : (
                        <p className="text-gray-900 text-lg font-medium mb-1">{method.details}</p>
                      )}
                      <p className="text-gray-600 text-sm">{method.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Statistiques de confiance */}
            <div className="bg-gradient-to-br from-[#e04141] to-[#c73636] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-xl mb-4">Pourquoi nous choisir ?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-white" />
                  <span>Réponse sous 24h garantie</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-white" />
                  <span>Expertise immobilière certifiée</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-white" />
                  <span>Accompagnement personnalisé</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-white" />
                  <span>Service 6j/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Message envoyé !</h3>
                  <p className="text-gray-600 text-lg mb-8">
                    Merci pour votre message. Nous vous recontacterons dans les plus brefs délais.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#e04141] hover:bg-[#c73636] text-white px-8 py-3 rounded-full"
                  >
                    Nouveau message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Envoyez-nous un message</h2>
                  <p className="text-gray-600 mb-8">
                    Remplissez le formulaire ci-dessous et nous vous recontacterons sous 24h.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          Prénom *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e04141] focus:border-transparent transition-all duration-300"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Nom *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e04141] focus:border-transparent transition-all duration-300"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e04141] focus:border-transparent transition-all duration-300"
                          placeholder="votre@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e04141] focus:border-transparent transition-all duration-300"
                          placeholder="01 23 45 67 89"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Sujet *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e04141] focus:border-transparent transition-all duration-300"
                          placeholder="Objet de votre message"
                        />
                      </div>
                      <div>
                        <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                          Type de bien
                        </label>
                        <select
                          id="propertyType"
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e04141] focus:border-transparent transition-all duration-300"
                        >
                          <option value="">Sélectionnez un type</option>
                          {propertyTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e04141] focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Décrivez votre projet ou votre demande..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#e04141] hover:bg-[#c73636] text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </Button>

                    <p className="text-gray-500 text-sm text-center">
                      * Champs obligatoires. Vos données sont confidentielles et ne seront pas partagées.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Vous préférez nous rencontrer ?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Prenez rendez-vous pour une consultation gratuite et sans engagement dans notre agence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#e04141] hover:bg-[#c73636] text-white px-8 py-3 rounded-full text-lg font-semibold">
              Prendre rendez-vous
            </Button>
            <Button 
              variant="outline"
              className="border-[#e04141] text-[#e04141] hover:bg-[#e04141] hover:text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Visiter l'agence
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}