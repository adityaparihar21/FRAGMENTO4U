/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Info, Plus } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface MenuRitualProps {
  onAddToCart: (item: MenuItem, quantity: number, customizations?: any) => void;
  onSelectItem: (item: MenuItem) => void;
}

export default function MenuRitual({ onAddToCart, onSelectItem }: MenuRitualProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pour' | 'fold'>('all');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const filteredItems = MENU_ITEMS.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const pourItems = MENU_ITEMS.filter((item) => item.category === 'pour');
  const foldItems = MENU_ITEMS.filter((item) => item.category === 'fold');

  return (
    <section id="menu-ritual-section" className="py-24 md:py-36 bg-surface-container-low px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
          <div className="max-w-xl">
            <span className="font-sans text-[10px] uppercase font-semibold text-brew-clay tracking-[0.25em] mb-4 block">
              03 / THE RITUAL LIST
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-earth-dark font-medium leading-tight mb-4">
              The Menu Ritual
            </h2>
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              A curated selection of our seasonal offerings, prepared with meditative precision and served fresh daily.
            </p>
          </div>
          
          {/* Quick Filter buttons */}
          <div className="flex bg-earth-dark/5 p-1 border border-earth-dark/10">
            {(['all', 'pour', 'fold'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-label-caps text-[10px] tracking-widest px-4 py-2.5 transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-earth-dark text-mist-cream font-bold'
                    : 'text-earth-dark/60 hover:text-earth-dark hover:bg-earth-dark/5'
                }`}
              >
                {cat === 'all' ? 'FULL LIST' : cat === 'pour' ? 'THE MORNING POUR' : 'THE FOLD'}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24"
          >
            {/* Column 1: The Morning Pour */}
            {(activeCategory === 'all' || activeCategory === 'pour') && (
              <div className="flex flex-col">
                {/* Heading & Image */}
                <div className="mb-12">
                  <div className="aspect-[16/10] w-full overflow-hidden bg-parchment/10 relative p-1.5 border border-earth-dark/5 mb-8 group">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhuDEjW3NDboR2VIBrCgJVcABqMbnZZzWFBvZ6ZCD1sbEVzDerTf-mCSo2IyJb0_OfEiKs7y1GpbX5e1EP3AWQHnd3xZOsChBUFSXg7QZ_BAQ5Qhx4pigpcDwfMwKeRs37aqaA9j2x2rt6BiyWgiXdF5ei_wONRLoLMA79L23_0OEb9slwUEvTYSvnlKz190FiW76gKi6AS75SU-g24psx0AxWBvM8TRnk0BHv0xDM4TLVDV0nHOicbJlVpWfE9t2ic462JffAKrM"
                      alt="Morning coffee and pastry ritual"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103 grayscale-[0.2] group-hover:grayscale-0"
                    />
                    <div className="absolute bottom-4 left-4 bg-mist-cream/90 backdrop-blur p-3 border border-earth-dark/5">
                      <p className="font-sans text-[9px] font-semibold leading-tight text-earth-dark uppercase tracking-wider">
                        MOMENT OF EXTRACTION<br />08:45 AM / ATELIER
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-earth-dark/10 pb-4">
                    <h3 className="font-serif text-2xl md:text-3xl text-earth-dark font-medium">The Morning Pour</h3>
                    <span className="font-sans text-[10px] tracking-widest text-brew-clay font-bold uppercase">SIGNATURE</span>
                  </div>
                </div>

                {/* List of Morning Pour items */}
                <div className="flex flex-col gap-6">
                  {pourItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="group cursor-pointer relative"
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => onSelectItem(item)}
                    >
                      <div className="flex justify-between items-baseline mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-sans text-xs text-brew-clay/60 tracking-wider">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h4 className="font-serif text-xl text-earth-dark group-hover:text-brew-clay transition-colors font-medium">
                            {item.name}
                          </h4>
                          {item.tags?.includes('WASHED') && (
                            <span className="text-[11px] bg-parchment text-earth-dark px-1.5 py-0.5 tracking-[0.15em] font-bold">
                              86+ SCA
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-sans text-sm text-earth-dark/80 font-medium">₹{item.price}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectItem(item);
                            }}
                            className="bg-brew-clay hover:bg-earth-dark text-mist-cream p-1 rounded-none transition-colors"
                            aria-label={`Add ${item.name}`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Column 2: The Fold */}
            {(activeCategory === 'all' || activeCategory === 'fold') && (
              <div className="flex flex-col">
                {/* Heading & Quote Panel */}
                <div className="mb-12">
                  <div className="aspect-[16/10] w-full bg-parchment/30 flex items-center justify-center p-8 border border-earth-dark/15 mb-8 relative">
                    <div className="text-center max-w-sm">
                      <div className="w-10 h-10 border border-brew-clay mx-auto flex items-center justify-center font-serif text-lg text-brew-clay mb-4">
                        F
                      </div>
                      <p className="font-serif text-xl md:text-2xl text-earth-dark italic leading-relaxed">
                        "The art of the fold lies in the layers."
                      </p>
                      <span className="font-sans text-[9px] uppercase tracking-widest text-earth-dark/40 font-semibold block mt-4">
                        72-HOUR LAMINATION
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-earth-dark/10 pb-4">
                    <h3 className="font-serif text-2xl md:text-3xl text-earth-dark font-medium">The Fold</h3>
                    <span className="font-sans text-[10px] tracking-widest text-brew-clay font-bold uppercase">BOULANGERIE</span>
                  </div>
                </div>

                {/* List of The Fold items */}
                <div className="flex flex-col gap-6">
                  {foldItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="group cursor-pointer relative"
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => onSelectItem(item)}
                    >
                      <div className="flex justify-between items-baseline mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-sans text-xs text-brew-clay/60 tracking-wider">
                            {String(pourItems.length + index + 1).padStart(2, '0')}
                          </span>
                          <h4 className="font-serif text-xl text-earth-dark group-hover:text-brew-clay transition-colors font-medium">
                            {item.name}
                          </h4>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-sans text-sm text-earth-dark/80 font-medium">₹{item.price}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectItem(item);
                            }}
                            className="bg-brew-clay hover:bg-earth-dark text-mist-cream p-1 rounded-none transition-colors"
                            aria-label={`Add ${item.name}`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
