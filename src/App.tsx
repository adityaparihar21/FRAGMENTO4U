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
import { MenuItem, CartItem, UserProfile } from './types';
import { Coffee, Compass, ArrowUp, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPreOrderOpen, setIsPreOrderOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [view, setView] = useState<'landing' | 'member-ritual'>('landing');
  
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
      />

      {/* Main Layout Sections */}
      <main>
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <motion.div
              key="landing-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Cinematic Hero */}
              <Hero onOpenPreOrder={() => setIsPreOrderOpen(true)} />

              {/* Narrative & Story */}
              <Provenance />

              {/* Our Story Chapter-by-Chapter Sourcing, Selection, Roasting & Service */}
              <OurStory />

              {/* Terraced single origin study of Chikmagalur */}
              <ChikmagalurSection 
                onAddToCart={handleAddToCart}
                onOpenPreOrder={() => setIsPreOrderOpen(true)}
              />

              {/* Step-by-Step Ritual steps in Bento Grid layout */}
              <RitualBento />

              {/* Editorial Narrative & Sourcing Journal */}
              <Journal />

              {/* The Menu list */}
              <MenuRitual
                onAddToCart={handleAddToCart}
                onSelectItem={(item) => setSelectedItem(item)}
              />

              {/* Technical current lot specification details */}
              <LotMeta />

              {/* Operating hours, maps & newsletter subscription */}
              <Visit onOpenPreOrder={() => setIsPreOrderOpen(true)} />
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
                    onClick={() => document.getElementById('provenance-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-brew-clay transition-colors cursor-pointer"
                  >
                    Our Philosophy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById('chikmagalur-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-brew-clay transition-colors cursor-pointer"
                  >
                    The Hills of Chikmagalur
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById('journal-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-brew-clay transition-colors cursor-pointer"
                  >
                    The Journal
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById('ritual-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-brew-clay transition-colors cursor-pointer"
                  >
                    The Process
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById('menu-ritual-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-brew-clay transition-colors cursor-pointer"
                  >
                    The Menu
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById('visit-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-brew-clay transition-colors cursor-pointer"
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
          <span className="flex items-center gap-1">
            MADE WITH INTENTION <Heart className="w-3 h-3 text-brew-clay fill-brew-clay" /> IN DEHRADUN
          </span>
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
            className="fixed bottom-6 right-6 bg-earth-dark text-mist-cream p-3 rounded-none border border-parchment/20 shadow-lg hover:bg-brew-clay transition-colors duration-300 group z-40 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
