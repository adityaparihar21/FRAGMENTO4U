/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, ShoppingBag, X, Coffee, MapPin, Compass, BookOpen, User, LogOut, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenPreOrder: () => void;
  activeSection: string;
  userProfile: UserProfile | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export default function Header({ 
  cartCount, 
  onOpenCart, 
  onOpenPreOrder, 
  activeSection,
  userProfile,
  onOpenLogin,
  onLogout
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const scrollToSection = (id: string) => {
    setDrawerOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-mist-cream/90 backdrop-blur-md border-b border-earth-dark/10 py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Menu Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 hover:text-brew-clay transition-colors group cursor-pointer"
            aria-label="Open menu"
            id="nav-menu-btn"
          >
            <Menu className="w-5 h-5 text-earth-dark group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline font-label-caps text-xs text-earth-dark tracking-widest font-medium">
              EXPLORE
            </span>
          </button>

          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-serif text-2xl md:text-3xl tracking-[0.25em] text-earth-dark font-medium cursor-pointer text-shadow-elegant select-none active:scale-95 transition-transform"
            id="nav-logo"
          >
            FRAGMENTO
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => scrollToSection('journal-section')}
              className={`hidden md:inline-block font-label-caps text-xs tracking-widest hover:text-brew-clay transition-colors ${
                activeSection === 'journal' ? 'text-brew-clay underline underline-offset-4' : 'text-earth-dark/70'
              }`}
            >
              THE JOURNAL
            </button>
            <button
              onClick={() => scrollToSection('menu-ritual-section')}
              className={`hidden md:inline-block font-label-caps text-xs tracking-widest hover:text-brew-clay transition-colors ${
                activeSection === 'menu' ? 'text-brew-clay underline underline-offset-4' : 'text-earth-dark/70'
              }`}
            >
              MENU RITUAL
            </button>
            <button
              onClick={() => scrollToSection('visit-section')}
              className={`hidden md:inline-block font-label-caps text-xs tracking-widest hover:text-brew-clay transition-colors ${
                activeSection === 'visit' ? 'text-brew-clay underline underline-offset-4' : 'text-earth-dark/70'
              }`}
            >
              VISIT
            </button>

            {/* User Presence indicator / Login */}
            <div className="relative">
              {userProfile && userProfile.isLoggedIn ? (
                <div className="flex items-center">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="h-8 w-8 border border-brew-clay/40 hover:border-brew-clay flex items-center justify-center bg-parchment/15 font-mono text-[10px] font-bold text-brew-clay tracking-wider uppercase transition-colors cursor-pointer rounded-none"
                    title={`Guest: ${userProfile.name}`}
                  >
                    {userProfile.name
                      .trim()
                      .split(/\s+/)
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase() || 'GP'}
                  </button>

                  <AnimatePresence>
                    {showUserDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-10 bg-mist-cream border border-earth-dark/15 p-4 shadow-xl z-50 w-52 text-left"
                      >
                        <span className="font-sans text-[8px] tracking-widest text-earth-dark/50 block mb-1 uppercase font-semibold">
                          LOGGED IN PRESENCE
                        </span>
                        <p className="font-serif text-sm font-medium text-earth-dark truncate mb-3">
                          {userProfile.name}
                        </p>
                        <button
                          onClick={() => {
                            onLogout();
                            setShowUserDropdown(false);
                          }}
                          className="w-full text-left font-sans text-[9px] font-bold text-red-600 hover:text-red-800 transition-colors uppercase flex items-center gap-2 border-none bg-transparent cursor-pointer pt-2 border-t border-earth-dark/10"
                        >
                          <LogOut className="w-3.5 h-3.5" /> EXIT ATELIER
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="p-2 hover:text-brew-clay text-earth-dark transition-colors group cursor-pointer flex items-center"
                  aria-label="Account Log In"
                  id="nav-login-btn"
                >
                  <User className="w-5 h-5 group-hover:scale-115 transition-transform" />
                </button>
              )}
            </div>

            {/* Shopping Cart button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 hover:text-brew-clay transition-colors group cursor-pointer flex items-center"
              aria-label="Open cart"
              id="nav-cart-btn"
            >
              <ShoppingBag className="w-5 h-5 text-earth-dark group-hover:scale-115 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brew-clay text-mist-cream text-[10px] font-sans font-bold w-4 h-4 flex items-center justify-center border border-mist-cream rounded-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* CTA Pre-Order button */}
            <button
              onClick={onOpenPreOrder}
              className="bg-brew-clay text-mist-cream font-label-caps text-xs tracking-[0.15em] px-5 py-2.5 hover:bg-earth-dark transition-colors duration-300 active:scale-95 hidden sm:inline-block"
              id="nav-preorder-btn"
            >
              PRE-ORDER
            </button>
          </div>
        </div>
      </header>

      {/* Slide Drawer navigation */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-[100] flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-earth-dark/30 backdrop-blur-sm"
              id="drawer-backdrop"
            />

            {/* Drawer Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
              className="relative w-full max-w-sm bg-mist-cream h-full p-8 flex flex-col justify-between shadow-2xl z-10 fragment-border"
              id="drawer-panel"
            >
              <div>
                {/* Header inside drawer */}
                <div className="flex justify-between items-center mb-16">
                  <span className="font-serif text-2xl tracking-[0.2em] text-earth-dark">FRAGMENTO</span>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-1.5 hover:text-brew-clay transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-earth-dark" />
                  </button>
                </div>

                {/* Navigation links */}
                <nav className="flex flex-col gap-8">
                  <button
                    onClick={() => scrollToSection('provenance-section')}
                    className="flex items-center gap-4 text-left group cursor-pointer w-full"
                  >
                    <Compass className="w-5 h-5 text-brew-clay group-hover:rotate-45 transition-transform duration-300" />
                    <div>
                      <span className="font-serif text-xl text-earth-dark group-hover:text-brew-clay transition-colors block">
                        Our Philosophy
                      </span>
                      <span className="font-label-caps text-[9px] text-earth-dark/50 tracking-wider">
                        01 / THE STORY & STUDY OF BEANS
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => scrollToSection('chikmagalur-section')}
                    className="flex items-center gap-4 text-left group cursor-pointer w-full"
                  >
                    <Leaf className="w-5 h-5 text-brew-clay group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <span className="font-serif text-xl text-earth-dark group-hover:text-brew-clay transition-colors block">
                        The Hills of Chikmagalur
                      </span>
                      <span className="font-label-caps text-[9px] text-earth-dark/50 tracking-wider">
                        01.5 / SOIL & MONSOON STUDY
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => scrollToSection('journal-section')}
                    className="flex items-center gap-4 text-left group cursor-pointer w-full"
                  >
                    <BookOpen className="w-5 h-5 text-brew-clay group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <span className="font-serif text-xl text-earth-dark group-hover:text-brew-clay transition-colors block">
                        The Journal
                      </span>
                      <span className="font-label-caps text-[9px] text-earth-dark/50 tracking-wider">
                        02 / THE ARCHITECTURE OF STILLNESS
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => scrollToSection('ritual-section')}
                    className="flex items-center gap-4 text-left group cursor-pointer w-full"
                  >
                    <Coffee className="w-5 h-5 text-brew-clay group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <span className="font-serif text-xl text-earth-dark group-hover:text-brew-clay transition-colors block">
                        The Small Batch Ritual
                      </span>
                      <span className="font-label-caps text-[9px] text-earth-dark/50 tracking-wider">
                        03 / ROASTING & EXTRACTION STEPS
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => scrollToSection('menu-ritual-section')}
                    className="flex items-center gap-4 text-left group cursor-pointer w-full"
                  >
                    <div className="w-5 h-5 border border-brew-clay flex items-center justify-center font-serif text-xs text-brew-clay group-hover:bg-brew-clay group-hover:text-mist-cream transition-all">
                      M
                    </div>
                    <div>
                      <span className="font-serif text-xl text-earth-dark group-hover:text-brew-clay transition-colors block">
                        The Menu Ritual
                      </span>
                      <span className="font-label-caps text-[9px] text-earth-dark/50 tracking-wider">
                        04 / SEASONAL OFFERINGS & BOULANGERIE
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => scrollToSection('visit-section')}
                    className="flex items-center gap-4 text-left group cursor-pointer w-full"
                  >
                    <MapPin className="w-5 h-5 text-brew-clay group-hover:translate-y-[-2px] transition-transform duration-300" />
                    <div>
                      <span className="font-serif text-xl text-earth-dark group-hover:text-brew-clay transition-colors block">
                        Visit the Atelier
                      </span>
                      <span className="font-label-caps text-[9px] text-earth-dark/50 tracking-wider">
                        05 / RAJPUR ROAD · DEHRADUN
                      </span>
                    </div>
                  </button>
                </nav>
              </div>

              {/* Drawer Footer */}
              <div className="border-t border-earth-dark/15 pt-8">
                <span className="font-label-caps text-[10px] text-earth-dark/50 tracking-[0.2em] block mb-2">
                  FRAGMENTO ATELIER
                </span>
                <p className="font-sans text-xs text-earth-dark/70 italic leading-relaxed">
                  Slow roasted, small batch specialty coffee and laminated pastry. Dehradun, India.
                </p>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
