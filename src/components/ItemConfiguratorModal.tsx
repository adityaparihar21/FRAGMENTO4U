/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Coffee, ChevronRight, Plus, Minus, Check } from 'lucide-react';
import { MenuItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ItemConfiguratorModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, customizations: any) => void;
}

export default function ItemConfiguratorModal({ item, onClose, onAddToCart }: ItemConfiguratorModalProps) {
  const [milk, setMilk] = useState<'Oat' | 'Almond' | 'Whole' | 'None'>('None');
  const [grind, setGrind] = useState<'Whole Bean' | 'Fine (Espresso)' | 'Medium (Filter)' | 'Coarse (French Press)'>('Whole Bean');
  const [baristaNotes, setBaristaNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (item) {
      // Set sensible defaults based on category
      setMilk(item.id.includes('latte') || item.id.includes('cortado') ? 'Oat' : 'None');
      setGrind(item.id.includes('pour-over') || item.id.includes('pourover') ? 'Medium (Filter)' : 'Whole Bean');
      setBaristaNotes('');
      setQuantity(1);
      setAdded(false);
    }
  }, [item]);

  if (!item) return null;

  const handleAdd = () => {
    const customizations = {
      milk: item.category === 'pour' ? milk : undefined,
      grind: item.category === 'pour' ? grind : undefined,
      notes: baristaNotes.trim() ? baristaNotes : undefined
    };
    onAddToCart(item, quantity, customizations);
    setAdded(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-earth-dark/40 backdrop-blur-sm"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-mist-cream shadow-2xl z-10 p-8 border border-earth-dark/15 flex flex-col max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="font-sans text-[10px] uppercase font-semibold text-brew-clay tracking-[0.2em] mb-1 block">
                {item.category === 'pour' ? 'THE MORNING POUR' : 'THE FOLD'}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-earth-dark font-medium leading-tight">
                {item.name}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:text-brew-clay transition-colors cursor-pointer"
              aria-label="Close configuration"
            >
              <X className="w-5 h-5 text-earth-dark" />
            </button>
          </div>

          {/* Description & Tasting Notes */}
          <div className="mb-8 border-b border-earth-dark/10 pb-6">
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-4">
              {item.description}
            </p>
            {item.tastingNotes && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-sans text-[10px] text-earth-dark/40 font-semibold tracking-wider uppercase">
                  TASTING NOTES:
                </span>
                {item.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="bg-parchment/40 text-earth-dark border border-earth-dark/5 px-2 py-0.5 text-[10px] font-sans font-semibold tracking-wide uppercase"
                  >
                    {note}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Configuration Options */}
          <div className="space-y-6 flex-grow mb-8">
            {/* If it's a beverage (pour) */}
            {item.category === 'pour' && (
              <>
                {/* Milk Selector (Oat milk is premium and featured) */}
                <div>
                  <span className="font-sans text-[10px] text-earth-dark/60 font-semibold tracking-wider uppercase block mb-3">
                    MILK OPTIONS
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {(['None', 'Oat', 'Almond', 'Whole'] as const).map((option) => (
                      <button
                        key={option}
                        onClick={() => setMilk(option)}
                        className={`font-sans text-xs tracking-wider py-2.5 border transition-all cursor-pointer ${
                          milk === option
                            ? 'bg-earth-dark text-mist-cream border-earth-dark font-semibold'
                            : 'bg-surface text-earth-dark/70 border-earth-dark/10 hover:border-earth-dark/40'
                        }`}
                      >
                        {option === 'None' ? 'BLACK' : option.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grind Selector (especially for Pourovers) */}
                <div>
                  <span className="font-sans text-[10px] text-earth-dark/60 font-semibold tracking-wider uppercase block mb-3">
                    GRIND SELECTION
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {([
                      'Whole Bean',
                      'Fine (Espresso)',
                      'Medium (Filter)',
                      'Coarse (French Press)'
                    ] as const).map((option) => (
                      <button
                        key={option}
                        onClick={() => setGrind(option)}
                        className={`font-sans text-[11px] tracking-wider py-2.5 px-3 border text-left transition-all cursor-pointer ${
                          grind === option
                            ? 'bg-earth-dark text-mist-cream border-earth-dark font-semibold'
                            : 'bg-surface text-earth-dark/70 border-earth-dark/10 hover:border-earth-dark/40'
                        }`}
                      >
                        {option.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Barista Instructions */}
            <div>
              <span className="font-sans text-[10px] text-earth-dark/60 font-semibold tracking-wider uppercase block mb-2">
                SPECIAL INSTRUCTIONS
              </span>
              <textarea
                placeholder="E.g. Extra hot, double-folded, light spice..."
                value={baristaNotes}
                onChange={(e) => setBaristaNotes(e.target.value)}
                rows={2}
                maxLength={120}
                className="w-full bg-surface border border-earth-dark/15 p-3 text-sm font-sans outline-none focus:border-brew-clay transition-colors resize-none rounded-none"
              />
            </div>

            {/* Quantity Counter */}
            <div className="flex items-center justify-between border-t border-earth-dark/10 pt-6">
              <span className="font-sans text-[10px] text-earth-dark/60 font-semibold tracking-wider uppercase">
                QUANTITY
              </span>
              <div className="flex items-center border border-earth-dark/20 bg-surface">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-earth-dark hover:text-brew-clay transition-colors cursor-pointer"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-sans text-sm font-bold px-4 text-earth-dark min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2 text-earth-dark hover:text-brew-clay transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="border-t border-earth-dark/15 pt-6 bg-surface p-4 flex justify-between items-center -mx-8 -mb-8">
            <div className="flex flex-col">
              <span className="font-serif text-xs text-earth-dark/60 italic">Custom Price</span>
              <span className="font-sans text-xl text-earth-dark font-bold">₹{item.price * quantity}</span>
            </div>

            <button
              onClick={handleAdd}
              disabled={added}
              className={`font-label-caps text-xs tracking-widest px-8 py-4 flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer ${
                added
                  ? 'bg-emerald-600 text-mist-cream'
                  : 'bg-brew-clay hover:bg-earth-dark text-mist-cream'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> FRAGMENT ADDED
                </>
              ) : (
                <>
                  ADD TO PRE-ORDER <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
