import React from 'react'
import { Building2, Target, Eye, Heart, Users, Award, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Notre Mission",
      description: "Révolutionner l'expérience immobilière en offrant des services transparents, efficaces et accessibles à tous."
    },
    {
      icon: Eye,
      title: "Notre Vision",
      description: "Devenir le leader de l'immobilier digital en France, en connectant propriétaires et acquéreurs de manière innovante."
    },
    {
      icon: Heart,
      title: "Nos Valeurs",
      description: "Intégrité, innovation et excellence sont au cœur de chaque transaction que nous réalisons pour nos clients."
    }
  ]

  const stats = [
    { icon: Users, number: "1000+", label: "Clients Satisfaits" },
    { icon: Building2, number: "500+", label: "Transactions" },
    { icon: MapPin, number: "50+", label: "Villes Couvertes" },
    { icon: Award, number: "98%", label: "Taux de Satisfaction" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#e04141] to-[#c73636] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">À Propos de Real Key</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Votre partenaire de confiance dans l'univers immobilier depuis 2015. 
            Nous transformons vos projets en réalités.
          </p>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Notre Histoire</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Fondée en 2015, <strong>Real Key</strong> est née d'une vision simple : 
                  rendre l'immobilier accessible, transparent et humain. 
                  Ce qui a commencé comme une petite agence locale est rapidement devenu 
                  une référence dans le secteur.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers d'accompagner des milliers de clients 
                  dans la concrétisation de leurs projets immobiliers, 
                  qu'il s'agisse d'achat, de vente ou de location.
                </p>
                <p>
                  Notre approche combine expertise traditionnelle et innovations digitales 
                  pour vous offrir le meilleur des deux mondes.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#e04141] to-[#c73636] rounded-3xl p-8 text-white h-80 flex items-center justify-center">
                <div className="text-center">
                  <Clock className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-2xl font-bold">9 ans d'expertise</p>
                  <p className="text-lg">au service de vos projets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Valeurs Fondamentales</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident chacune de nos actions et décisions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-[#e04141]/10 rounded-2xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-[#e04141]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-[#e04141]/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-10 h-10 text-[#e04141]" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#e04141] to-[#c73636] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à concrétiser votre projet ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez les milliers de clients qui nous font confiance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-white text-[#e04141] hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold">
              <Link href="/contact">Nous Contacter</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-[#e04141] px-8 py-3 rounded-full text-lg font-semibold">
              <Link href="/properties">Voir nos Biens</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}