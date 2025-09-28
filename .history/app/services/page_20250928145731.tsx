import React from 'react'
import { Home, Key, Building2, TrendingUp, Shield, Users, Star, Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ServicesPage() {
  const services = [
    {
      icon: Home,
      title: "Achat & Vente",
      description: "Accompagnement complet pour l'achat ou la vente de votre bien immobilier",
      features: ["Estimation gratuite", "Visites guidées", "Négociation expert", "Signature sécurisée"],
      price: "À partir de 5%",
      popular: true
    },
    {
      icon: Key,
      title: "Location",
      description: "Gestion locative complète pour propriétaires et recherche pour locataires",
      features: ["État des lieux", "Gestion des loyers", "Relation locative", "Conformité légale"],
      price: "À partir de 8%",
      popular: false
    },
    {
      icon: Building2,
      title: "Gestion Immobilière",
      description: "Confiez-nous la gestion complète de votre patrimoine immobilier",
      features: ["Maintenance", "Optimisation fiscale", "Reporting mensuel", "Intervention 24/7"],
      price: "Sur devis",
      popular: false
    },
    {
      icon: TrendingUp,
      title: "Conseil en Investissement",
      description: "Expertise pour maximiser votre rendement immobilier",
      features: ["Étude de marché", "Rentabilité", "Planification", "Suivi performance"],
      price: "À partir de 1 500€",
      popular: true
    }
  ]

  const advantages = [
    {
      icon: Shield,
      title: "Garantie Satisfait ou Remboursé",
      description: "30 jours pour changer d'avis"
    },
    {
      icon: Users,
      title: "Équipe d'Experts Dédiée",
      description: "Un conseiller attitré pour votre projet"
    },
    {
      icon: Star,
      title: "Service Premium",
      description: "Accompagnement sur-mesure et personnalisé"
    },
    {
      icon: Clock,
      title: "Disponibilité 7j/7",
      description: "Réactive et à votre écoute"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#e04141] to-[#c73636] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Nos Services</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Des solutions immobilières complètes adaptées à chaque projet, 
            de l'achat à la gestion en passant par l'investissement.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div key={index} className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 ${service.popular ? 'border-[#e04141] relative' : 'border-transparent'}`}>
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#e04141] text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Populaire
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-[#e04141]/10 rounded-2xl flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-[#e04141]" />
                    </div>
                    <div className="text-2xl font-bold text-[#e04141]">{service.price}</div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-[#e04141] rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full bg-[#e04141] hover:bg-[#c73636] text-white py-3 rounded-xl font-semibold">
                    Découvrir ce service
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi Nous Choisir ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des avantages exclusifs qui font la différence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-[#e04141]/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-10 h-10 text-[#e04141]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                  <p className="text-gray-600">{advantage.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-[#e04141] to-[#c73636] rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-6">Besoin d'un Conseil Personnalisé ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Nos experts sont à votre écoute pour étudier votre projet et vous proposer la solution la plus adaptée
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-[#e04141] hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold">
                <Link href="/contact">Consultation Gratuite</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-[#e04141] px-8 py-3 rounded-full text-lg font-semibold">
                <Link href="tel:+33123456789">01 23 45 67 89</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}