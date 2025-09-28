"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function Navbar() {
    const { user } = useUser()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const navLinks = [
        { href: "/properties", label: "Propriétés" },
        { href: "/about", label: "À Propos" },
        { href: "/services", label: "Services" },
        
        { href: "/blog", label: "Blog" }
    ]

    return (
        <nav className="flex bg-black/95 backdrop-blur-sm justify-between items-center border-b border-slate-800 px-6 py-4 w-full text-white text-lg sticky top-0 z-50">
            {/* Logo */}
            <Link href="/" className="flex items-center">
                <Image 
                    alt='Logo Real Key' 
                    width={60} 
                    height={60} 
                    className="w-12 h-12 md:w-14 md:h-14 object-contain hover:scale-105 transition-transform duration-300" 
                    src="/logo.png"
                />
                <span className="ml-3 text-xl font-bold text-white hidden sm:block">Real Key</span>
            </Link>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center gap-8 ml-10">
                {navLinks.map((link) => (
                    <Link 
                        key={link.href}
                        href={link.href} 
                        className="relative overflow-hidden group font-medium"
                    >
                        <span className="block group-hover:-translate-y-full transition-transform duration-300 py-2">
                            {link.label}
                        </span>
                        <span className="block absolute top-full left-0 text-[#e04141] group-hover:translate-y-[-100%] transition-transform duration-300 py-2">
                            {link.label}
                        </span>
                    </Link>
                ))}
            </div>

            {/* CTA Desktop */}
            <div className="hidden md:flex items-center gap-4">
                <Link href={''}>
                <Button
                    variant="outline"
                    className="border-slate-600 hover:bg-white hover:border-slate-500 text-white px-6 py-2 rounded-full font-medium transition-all duration-300"
                >
                    Contact
                </Button>
</Link>
                {!user ? (
                    <SignInButton>
                        <Button className="bg-[#e04141] hover:bg-[#c03939] text-white px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#e04141]/20">
                            Commencer
                        </Button>
                    </SignInButton>
                ) : (
                    <div className="flex items-center gap-3">
                        <UserButton />
                        <span className="text-sm text-gray-300 hidden lg:block">
                            Bonjour, {user.firstName}
                        </span>
                    </div>
                )}
            </div>

            {/* Menu Mobile Toggle */}
            <button 
                id="menuToggle" 
                className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200"
                onClick={toggleMobileMenu}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Menu Mobile */}
            <div className={`absolute top-full left-0 w-full bg-black/95 backdrop-blur-sm border-b border-slate-800 flex-col items-center gap-4 py-6 px-4 transition-all duration-300 ${
                isMobileMenuOpen ? 'flex' : 'hidden'
            }`}>
                {navLinks.map((link) => (
                    <Link 
                        key={link.href}
                        href={link.href} 
                        className="text-lg font-medium text-white hover:text-[#e04141] transition-colors duration-200 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
                
                <div className="flex flex-col gap-3 w-full max-w-xs mt-2">
                    <Button
                        variant="outline"
                        className="border-slate-600 hover:bg-white text-white w-full py-3 rounded-full font-medium transition-all duration-300"
                    >
                        Contact
                    </Button>

                    {!user ? (
                        <SignInButton>
                            <Button className="bg-[#e04141] hover:bg-[#c03939] text-white w-full py-3 rounded-full font-medium transition-all duration-300">
                                Commencer
                            </Button>
                        </SignInButton>
                    ) : (
                        <div className="flex items-center justify-center gap-3">
                            <UserButton />
                            <span className="text-sm text-gray-300">
                                Bonjour, {user.firstName}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar