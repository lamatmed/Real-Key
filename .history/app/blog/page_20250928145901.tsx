import React from 'react'
import { Calendar, User, Clock, ArrowRight, Search, Tag, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Les 5 tendances immobilières à suivre en 2024",
      excerpt: "Découvrez les nouvelles tendances qui transforment le marché immobilier français cette année.",
      image: "/blog/trends-2024.jpg",
      category: "Marché",
      author: "Marie Lambert",
      date: "15 Jan 2024",
      readTime: "5 min",
      featured: true
    },
    {
      id: 2,
      title: "Guide complet : Préparer sa maison pour la vente",
      excerpt: "Les étapes essentielles pour maximiser la valeur de votre bien et conclure une vente rapide.",
      image: "/blog/prepare-sale.jpg",
      category: "Conseils",
      author: "Thomas Dubois",
      date: "10 Jan 2024",
      readTime: "8 min",
      featured: true
    },
    {
      id: 3,
      title: "Investissement locatif : Les villes les plus rentables",
      excerpt: "Analyse des meilleures opportunités d'investissement locatif en France en 2024.",
      image: "/blog/investment-cities.jpg",
      category: "Investissement",
      author: "Sophie Martin",
      date: "5 Jan 2024",
      readTime: "6 min",
      featured: false
    },
    {
      id: 4,
      title: "Comprendre les nouveaux taux de crédit immobilier",
      excerpt: "Tout ce qu'il faut savoir sur l'évolution des taux et leur impact sur votre projet.",
      image: "/blog/mortgage-rates.jpg",
      category: "Finance",
      author: "Pierre Moreau",
      date: "2 Jan 2024",
      readTime: "7 min",
      featured: false
    },
    {
      id: 5,
      title: "Rénovation : Les travaux qui augmentent la valeur",
      excerpt: "Les transformations les plus rentables pour valoriser votre patrimoine immobilier.",
      image: "/blog/renovation-value.jpg",
      category: "Rénovation",
      author: "Julie Petit",
      date: "28 Déc 2023",
      readTime: "9 min",
      featured: false
    },
    {
      id: 6,
      title: "Location saisonnière : Réglementation 2024",
      excerpt: "Nouveautés légales et conseils pratiques pour les propriétaires en location saisonnière.",
      image: "/blog/seasonal-rental.jpg",
      category: "Législation",
      author: "Marc Lefebvre",
      date: "20 Déc 2023",
      readTime: "4 min",
      featured: false
    }
  ]

  const categories = [
    { name: "Tous les articles", count: 24, active: true },
    { name: "Marché", count: 8, active: false },
    { name: "Conseils", count: 6, active: false },
    { name: "Investissement", count: 5, active: false },
    { name: "Finance", count: 3, active: false },
    { name: "Législation", count: 2, active: false }
  ]

  const popularTags = [
    "Immobilier", "Investissement", "Marché 2024", "Crédit", "Rénovation", 
    "Location", "Vente", "Conseils", "Tendances", "Fiscalité"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#e04141] to-[#c73636] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog Immobilier</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Conseils, actualités et analyses pour vous accompagner dans tous vos projets immobiliers
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Recherche */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Search className="w-5 h-5 mr-2 text-[#e04141]" />
                Rechercher
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e04141] focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute right-3 top-3" />
              </div>
            </div>

            {/* Catégories */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-[#e04141]" />
                Catégories
              </h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      category.active 
                        ? 'bg-[#e04141] text-white' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-sm ${
                      category.active ? 'text-white/80' : 'text-gray-400'
                    }`}>
                      ({category.count})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tags populaires */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-[#e04141]" />
                Tags populaires
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-[#e04141] hover:text-white transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Articles */}
          <div className="lg:col-span-3">
            {/* Articles en vedette */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {blogPosts.filter(post => post.featured).map((post) => (
                <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="h-48 bg-gradient-to-br from-[#e04141] to-[#c73636]"></div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-[#e04141]/10 text-[#e04141] rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#e04141] transition-colors">
                      <Link href={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Tous les articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.filter(post => !post.featured).map((post) => (
                <article key={post.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 bg-[#e04141]/10 text-[#e04141] rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-[#e04141] transition-colors">
                    <Link href={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <User className="w-3 h-3 mr-1" />
                      {post.author}
                    </div>
                    <Link 
                      href={`/blog/${post.id}`}
                      className="flex items-center text-[#e04141] text-sm font-medium hover:text-[#c73636] transition-colors"
                    >
                      Lire la suite
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <Button variant="outline" className="border-gray-300 text-gray-600">Précédent</Button>
                <Button className="bg-[#e04141] hover:bg-[#c73636] text-white">1</Button>
                <Button variant="outline" className="border-gray-300 text-gray-600">2</Button>
                <Button variant="outline" className="border-gray-300 text-gray-600">3</Button>
                <Button variant="outline" className="border-gray-300 text-gray-600">Suivant</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}