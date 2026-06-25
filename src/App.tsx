/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Provenance from './components/Provenance';
import OurStory from './components/OurStory';
import RitualBento from './components/RitualBento';
import MenuRitual from './components/MenuRitual';
import LotMeta from './components/LotMeta';
import Visit from './components/Visit';
import Journal from './components/Journal';
import CartDrawer from './components/CartDrawer';
import ItemConfiguratorModal from './components/ItemConfiguratorModal';
import PreOrderModal from './components/PreOrderModal';
import LoginModal from './components/LoginModal';
import ChikmagalurSection from './components/ChikmagalurSection';
import MemberRitual from './components/MemberRitual';
import SensoryProfiler from './components/SensoryProfiler';
import { MenuItem, CartItem, UserProfile } from './types';
import { Coffee, Compass, ArrowUp, Heart, X, ArrowRight, BookOpen, Award, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPreOrderOpen, setIsPreOrderOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [view, setView] = useState<'landing' | 'member-ritual'>('landing');
  const [activePage, setActivePage] = useState<string | null>(null);
  
  // User Authentication & Presence states
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Load user profile and cart from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('fragmento_user');
    if (savedUser) {
      try {
        setUserProfile(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to load user', e);
      }
    }
  }, []);

  const handleLoginSuccess = (user: UserProfile) => {
    setUserProfile(user);
    localStorage.setItem('fragmento_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUserProfile(null);
    localStorage.removeItem('fragmento_user');
    setView('landing');
    setActivePage(null);
  };



  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('fragmento_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart', e);
      }
    }
  }, []);

  // Save cart to localStorage on changes
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('fragmento_cart', JSON.stringify(items));
  };

  // Monitor current section for active navigation states
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      const sections = ['provenance-section', 'our-story-section', 'chikmagalur-section', 'journal-section', 'menu-ritual-section', 'visit-section'];
      let current = 'hero';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            if (sectionId === 'provenance-section') current = 'provenance';
            else if (sectionId === 'our-story-section') current = 'story';
            else if (sectionId === 'chikmagalur-section') current = 'chikmagalur';
            else if (sectionId === 'journal-section') current = 'journal';
            else if (sectionId === 'menu-ritual-section') current = 'menu';
            else if (sectionId === 'visit-section') current = 'visit';
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (item: MenuItem, quantity: number, customizations?: any) => {
    // Generate unique id based on item and selected options to distinguish duplicates
    const optionStr = JSON.stringify(customizations || {});
    const instanceId = `${item.id}-${optionStr}`;

    const existingIndex = cartItems.findIndex((i) => i.id === instanceId);

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      saveCart(updated);
    } else {
      const newItem: CartItem = {
        id: instanceId,
        menuItem: item,
        quantity,
        customizations
      };
      saveCart([...cartItems, newItem]);
    }
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    const updated = cartItems
      .map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveCart(updated);
  };

  const handleRemoveItem = (id: string) => {
    const filtered = cartItems.filter((item) => item.id !== id);
    saveCart(filtered);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const handleReorder = (items: CartItem[]) => {
    const updated = [...cartItems];
    items.forEach((pastItem) => {
      const optionStr = JSON.stringify(pastItem.customizations || {});
      const instanceId = `${pastItem.menuItem.id}-${optionStr}`;
      const existingIndex = updated.findIndex((i) => i.id === instanceId);
      if (existingIndex > -1) {
        updated[existingIndex].quantity += pastItem.quantity;
      } else {
        updated.push({
          ...pastItem,
          id: instanceId
        });
      }
    });
    saveCart(updated);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-mist-cream text-earth-dark font-sans selection:bg-brew-clay selection:text-mist-cream relative">
      
      {/* Header element */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPreOrder={() => setIsPreOrderOpen(true)}
        activeSection={activeSection}
        userProfile={userProfile}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        view={view}
        onViewChange={setView}
        activePage={activePage}
        onActivePageChange={setActivePage}
      />

      {/* Main Layout Sections */}
      <main>
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <motion.div
              key={activePage ? `page-${activePage}` : "landing-view"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {activePage === null ? (
                <>
                  {/* Cinematic Hero */}
                  <Hero onOpenPreOrder={() => setIsPreOrderOpen(true)} />

                  {/* Summary Columns Layout (Atelier Chapters) */}
                  <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                      <span className="font-sans text-[10px] uppercase font-bold tracking-[0.25em] text-brew-clay block mb-3">
                        EXPLORE THE ATELIER
                      </span>
                      <h2 className="font-serif text-3xl md:text-5xl font-medium text-earth-dark tracking-tight mb-4">
                        The Seven Chapters
                      </h2>
                      <p className="font-serif text-sm italic text-earth-dark/70 leading-relaxed">
                        Click to enter each specific narrative stream, seasonal specification or our private community room.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {/* Chapter 1: Our Philosophy */}
                      <div className="bg-parchment/10 border border-earth-dark/15 p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group min-h-[320px] text-earth-dark">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-brew-clay/20 group-hover:bg-brew-clay transition-colors" />
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <span className="font-mono text-xs text-earth-dark/40 font-bold">CHAPTER 01</span>
                            <Compass className="w-5 h-5 text-brew-clay group-hover:rotate-45 transition-transform duration-500" />
                          </div>
                          <h3 className="font-serif text-2xl font-medium mb-3">Our Philosophy</h3>
                          <p className="font-sans text-xs text-earth-dark/70 leading-relaxed mb-6">
                            The narrative of direct trade micro-lots and small-batch roasting. Deeply committed to the terroir of Indian coffee.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setActivePage('provenance');
                            window.scrollTo({ top: 0, behavior: 'instant' });
                          }}
                          className="flex items-center gap-2 font-sans text-[10px] font-bold tracking-widest uppercase hover:text-brew-clay transition-colors mt-auto text-left border-none bg-transparent cursor-pointer"
                        >
                          READ PHILOSOPHY <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                      {/* Chapter 2: Our Story */}
                      <div className="bg-parchment/10 border border-earth-dark/15 p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group min-h-[320px] text-earth-dark">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-brew-clay/20 group-hover:bg-brew-clay transition-colors" />
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <span className="font-mono text-xs text-earth-dark/40 font-bold">CHAPTER 02</span>
                            <Award className="w-5 h-5 text-brew-clay group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <h3 className="font-serif text-2xl font-medium mb-3">Our Story</h3>
                          <p className="font-sans text-xs text-earth-dark/70 leading-relaxed mb-6">
                            A chapter-by-chapter chronicle of patience, micro-lot roasting profiles, and our Dehradun artisan bakery.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setActivePage('story');
                            window.scrollTo({ top: 0, behavior: 'instant' });
                          }}
                          className="flex items-center gap-2 font-sans text-[10px] font-bold tracking-widest uppercase hover:text-brew-clay transition-colors mt-auto text-left border-none bg-transparent cursor-pointer"
                        >
                          ENTER STORY <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                      {/* Chapter 3: Chikmagalur Terraces */}
                      <div className="bg-parchment/10 border border-earth-dark/15 p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group min-h-[320px] text-earth-dark">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-brew-clay/20 group-hover:bg-brew-clay transition-colors" />
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <span className="font-mono text-xs text-earth-dark/40 font-bold">CHAPTER 03</span>
                            <Leaf className="w-5 h-5 text-brew-clay group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <h3 className="font-serif text-2xl font-medium mb-3">Chikmagalur Terraces</h3>
                          <p className="font-sans text-xs text-earth-dark/70 leading-relaxed mb-6">
                            Terraced single-origin study of Indian soil and monsoon shade-growth. Hand-picked cherries at maximum density.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setActivePage('chikmagalur');
                            window.scrollTo({ top: 0, behavior: 'instant' });
                          }}
                          className="flex items-center gap-2 font-sans text-[10px] font-bold tracking-widest uppercase hover:text-brew-clay transition-colors mt-auto text-left border-none bg-transparent cursor-pointer"
                        >
                          EXPLORE TERRACES <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                      {/* Chapter 4: The Process */}
                      <div className="bg-parchment/10 border border-earth-dark/15 p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group min-h-[320px] text-earth-dark">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-brew-clay/20 group-hover:bg-brew-clay transition-colors" />
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <span className="font-mono text-xs text-earth-dark/40 font-bold">CHAPTER 04</span>
                            <Coffee className="w-5 h-5 text-brew-clay group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <h3 className="font-serif text-2xl font-medium mb-3">The Process</h3>
                          <p className="font-sans text-xs text-earth-dark/70 leading-relaxed mb-6">
                            The small-batch ritual of roasting, water chemistry adjustment, and temperature profiling.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setActivePage('ritual');
                            window.scrollTo({ top: 0, behavior: 'instant' });
                          }}
                          className="flex items-center gap-2 font-sans text-[10px] font-bold tracking-widest uppercase hover:text-brew-clay transition-colors mt-auto text-left border-none bg-transparent cursor-pointer"
                        >
                          VIEW PROCESS <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                      {/* Chapter 5: Sourcing Journal */}
                      <div className="bg-parchment/10 border border-earth-dark/15 p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group min-h-[320px] text-earth-dark">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-brew-clay/20 group-hover:bg-brew-clay transition-colors" />
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <span className="font-mono text-xs text-earth-dark/40 font-bold">CHAPTER 05</span>
                            <BookOpen className="w-5 h-5 text-brew-clay group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <h3 className="font-serif text-2xl font-medium mb-3">Sourcing Journal</h3>
                          <p className="font-sans text-xs text-earth-dark/70 leading-relaxed mb-6">
                            Editorial chronicles of origin trips, technical roasting profiles, and newsletters from the roastery.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setActivePage('journal');
                            window.scrollTo({ top: 0, behavior: 'instant' });
                          }}
                          className="flex items-center gap-2 font-sans text-[10px] font-bold tracking-widest uppercase hover:text-brew-clay transition-colors mt-auto text-left border-none bg-transparent cursor-pointer"
                        >
                          READ JOURNAL <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                      {/* Chapter 6: The Menu Ritual */}
                      <div className="bg-parchment/10 border border-earth-dark/15 p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group min-h-[320px] text-earth-dark">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-brew-clay/20 group-hover:bg-brew-clay transition-colors" />
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <span className="font-mono text-xs text-earth-dark/40 font-bold">CHAPTER 06</span>
                            <div className="w-5 h-5 border border-brew-clay flex items-center justify-center font-serif text-[10px] text-brew-clay group-hover:bg-brew-clay group-hover:text-mist-cream transition-all duration-300">
                              M
                            </div>
                          </div>
                          <h3 className="font-serif text-2xl font-medium mb-3">The Menu Ritual</h3>
                          <p className="font-sans text-xs text-earth-dark/70 leading-relaxed mb-6">
                            Artisanal single origin pour-overs paired with laminated viennoiserie. View specifications and pre-order.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setActivePage('menu');
                            window.scrollTo({ top: 0, behavior: 'instant' });
                          }}
                          className="flex items-center gap-2 font-sans text-[10px] font-bold tracking-widest uppercase hover:text-brew-clay transition-colors mt-auto text-left border-none bg-transparent cursor-pointer"
                        >
                          VIEW MENU <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                      {/* Chapter 7: Visit the Atelier */}
                      <div className="bg-parchment/10 border border-earth-dark/15 p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group min-h-[320px] text-earth-dark lg:col-span-3 lg:max-w-md lg:mx-auto w-full">
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-brew-clay/20 group-hover:bg-brew-clay transition-colors" />
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <span className="font-mono text-xs text-earth-dark/40 font-bold">CHAPTER 07</span>
                            <span className="font-serif text-sm text-brew-clay">MAP</span>
                          </div>
                          <h3 className="font-serif text-2xl font-medium mb-3">Visit the Atelier</h3>
                          <p className="font-sans text-xs text-earth-dark/70 leading-relaxed mb-6">
                            Operating hours, maps, and instructions to enjoy hours of stillness on Rajpur Road, Dehradun.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setActivePage('visit');
                            window.scrollTo({ top: 0, behavior: 'instant' });
                          }}
                          className="flex items-center gap-2 font-sans text-[10px] font-bold tracking-widest uppercase hover:text-brew-clay transition-colors mt-auto text-left border-none bg-transparent cursor-pointer"
                        >
                          PLAN VISIT <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </section>
                  <SensoryProfiler 
                    onAddToCart={handleAddToCart}
                    onOpenCart={() => setIsCartOpen(true)}
                  />
                </>
              ) : (
                <div className="pt-[72px]">
                  {/* Sticky Sub-Header with Close button */}
                  <div className="bg-mist-cream/95 backdrop-blur-md border-b border-earth-dark/10 sticky top-[72px] z-40 py-4 px-6 md:px-12 shadow-sm">
                    <div className="max-w-6xl mx-auto flex justify-between items-center text-earth-dark">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] font-bold text-brew-clay tracking-widest uppercase">
                          FRAGMENTO ATELIER
                        </span>
                        <span className="h-3 w-[1px] bg-earth-dark/20" />
                        <span className="font-serif text-base italic">
                          {activePage === 'provenance' && 'Philosophy & Provenance'}
                          {activePage === 'story' && 'Our Chronicle & Sourcing'}
                          {activePage === 'chikmagalur' && 'The Terraces of Chikmagalur'}
                          {activePage === 'ritual' && 'Brewing Extraction Process'}
                          {activePage === 'journal' && 'The Sourcing Journal'}
                          {activePage === 'menu' && 'Seasonal Offerings Menu'}
                          {activePage === 'visit' && 'Atelier Hours & Locator'}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setActivePage(null);
                          window.scrollTo({ top: 0, behavior: 'instant' });
                        }}
                        className="flex items-center gap-2 border border-earth-dark/20 hover:border-brew-clay hover:text-brew-clay px-4 py-2 font-sans text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer group"
                      >
                        <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                        <span>Return to Chapters</span>
                      </button>
                    </div>
                  </div>

                  {/* Actual Page Component */}
                  {activePage === 'provenance' && <Provenance />}
                  {activePage === 'story' && <OurStory />}
                  {activePage === 'chikmagalur' && (
                    <ChikmagalurSection 
                      onAddToCart={handleAddToCart}
                      onOpenPreOrder={() => setIsPreOrderOpen(true)}
                    />
                  )}
                  {activePage === 'ritual' && <RitualBento />}
                  {activePage === 'journal' && <Journal />}
                  {activePage === 'menu' && (
                    <>
                      <MenuRitual
                        onAddToCart={handleAddToCart}
                        onSelectItem={(item) => setSelectedItem(item)}
                      />
                      <LotMeta />
                    </>
                  )}
                  {activePage === 'visit' && <Visit onOpenPreOrder={() => setIsPreOrderOpen(true)} />}
                </div>
              )}
            </motion.div>
          ) : (
            <MemberRitual
              userProfile={userProfile}
              onOpenLogin={() => setIsLoginOpen(true)}
              onOpenPreOrder={() => setIsPreOrderOpen(true)}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Aesthetic Footer */}
      <footer className="bg-earth-dark text-parchment py-16 px-6 md:px-12 border-t border-parchment/10 text-center md:text-left">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
          
          {/* Logo brand */}
          <div className="max-w-xs">
            <span className="font-serif text-2xl tracking-[0.25em] text-mist-cream block mb-4">
              FRAGMENTO
            </span>
            <p className="font-sans text-xs opacity-70 leading-relaxed">
              An artisanal coffee and modular pastry experience. Small-batch slow-roasted, crafted with intentional fragments in Dehradun, India.
            </p>
          </div>

          {/* Links columns */}
          <div className="flex flex-wrap gap-12 md:gap-24 justify-center md:justify-start">
            <div>
              <span className="font-sans text-[10px] tracking-widest opacity-40 uppercase block mb-3 font-semibold">
                SECTIONS
              </span>
              <ul className="space-y-2 font-serif text-sm">
                <li>
                  <button
                    onClick={() => {
                      setView('landing');
                      setActivePage('provenance');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-brew-clay transition-colors cursor-pointer text-left border-none bg-transparent"
                  >
                    Our Philosophy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setView('landing');
                      setActivePage('chikmagalur');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-brew-clay transition-colors cursor-pointer text-left border-none bg-transparent"
                  >
                    The Hills of Chikmagalur
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setView('landing');
                      setActivePage('journal');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-brew-clay transition-colors cursor-pointer text-left border-none bg-transparent"
                  >
                    The Journal
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setView('landing');
                      setActivePage('ritual');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-brew-clay transition-colors cursor-pointer text-left border-none bg-transparent"
                  >
                    The Process
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setView('landing');
                      setActivePage('menu');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-brew-clay transition-colors cursor-pointer text-left border-none bg-transparent"
                  >
                    The Menu
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setView('landing');
                      setActivePage('visit');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-brew-clay transition-colors cursor-pointer text-left border-none bg-transparent"
                  >
                    Location & Hours
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-sans text-[10px] tracking-widest opacity-40 uppercase block mb-3 font-semibold">
                LOCATOR
              </span>
              <p className="font-sans text-xs opacity-70 leading-relaxed">
                Rajpur Road Atelier<br />
                Near Jakhan, Dehradun<br />
                Uttarakhand, India
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="max-w-6xl mx-auto border-t border-parchment/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] opacity-40 tracking-wider font-sans uppercase gap-4">
          <span>© {new Date().getFullYear()} FRAGMENTO COFFEE CO. ALL RIGHTS RESERVED.</span>
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-right">
            <span className="flex items-center gap-1">
              MADE WITH INTENTION <Heart className="w-3 h-3 text-brew-clay fill-brew-clay" /> IN DEHRADUN
            </span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-1">
              MADE BY{' '}
              <a 
                href="https://portfolioparihar21.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-bold underline text-mist-cream hover:text-brew-clay transition-colors uppercase tracking-widest cursor-pointer"
              >
                ADITYA PARIHAR
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* Slide Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsPreOrderOpen(true);
        }}
        onReorder={handleReorder}
      />

      {/* Item Configurator Modal for menu details */}
      <ItemConfiguratorModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Pre-Order & Receipt checkout Modal */}
      <PreOrderModal
        isOpen={isPreOrderOpen}
        onClose={() => setIsPreOrderOpen(false)}
        cartItems={cartItems}
        onClearCart={handleClearCart}
      />

      {/* Login Page / Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Scroll Top indicator button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-4 sm:right-6 bg-earth-dark text-mist-cream p-3 rounded-none border border-parchment/20 shadow-lg hover:bg-brew-clay transition-colors duration-300 group z-40 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Artisanal Teleport Desk */}
      <AnimatePresence>
        {view === 'landing' && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-earth-dark/95 border border-parchment/20 backdrop-blur-md px-4 sm:px-6 py-3.5 flex items-center justify-center gap-3 sm:gap-6 shadow-2xl z-40 rounded-none text-mist-cream max-w-[95vw] md:max-w-none"
          >
            <div className="flex items-center gap-1.5 border-r border-parchment/10 pr-3 sm:pr-4">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-brew-clay font-bold uppercase whitespace-nowrap">
                ATELIER JUMP
              </span>
            </div>

            <button
              onClick={() => {
                setActivePage('menu');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className={`font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.12em] sm:tracking-[0.18em] uppercase transition-colors duration-200 cursor-pointer border-none bg-transparent ${
                activePage === 'menu' ? 'text-brew-clay font-extrabold' : 'text-mist-cream/80 hover:text-brew-clay'
              }`}
            >
              Menu
            </button>

            <span className="h-3 w-[1px] bg-parchment/10" />

            <button
              onClick={() => {
                if (activePage !== null) {
                  setActivePage(null);
                  setTimeout(() => {
                    const el = document.getElementById('sensory-profiler-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const el = document.getElementById('sensory-profiler-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.12em] sm:tracking-[0.18em] uppercase transition-colors duration-200 cursor-pointer border-none bg-transparent text-mist-cream/80 hover:text-brew-clay whitespace-nowrap"
            >
              Profiler
            </button>

            <span className="h-3 w-[1px] bg-parchment/10" />

            <button
              onClick={() => {
                setActivePage('visit');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className={`font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.12em] sm:tracking-[0.18em] uppercase transition-colors duration-200 cursor-pointer border-none bg-transparent ${
                activePage === 'visit' ? 'text-brew-clay font-extrabold' : 'text-mist-cream/80 hover:text-brew-clay'
              }`}
            >
              Visit
            </button>

            <span className="h-3 w-[1px] bg-parchment/10" />

            <button
              onClick={() => {
                setActivePage('journal');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className={`font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.12em] sm:tracking-[0.18em] uppercase transition-colors duration-200 cursor-pointer border-none bg-transparent ${
                activePage === 'journal' ? 'text-brew-clay font-extrabold' : 'text-mist-cream/80 hover:text-brew-clay'
              }`}
            >
              Journal
            </button>

            {activePage !== null && (
              <>
                <span className="h-3 w-[1px] bg-parchment/10" />
                <button
                  onClick={() => {
                    setActivePage(null);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.12em] sm:tracking-[0.18em] uppercase text-brew-clay hover:text-white transition-colors duration-200 cursor-pointer border-none bg-transparent whitespace-nowrap"
                >
                  Chapters
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
