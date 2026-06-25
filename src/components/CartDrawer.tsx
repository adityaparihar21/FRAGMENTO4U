/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Trash2, ArrowRight, ShoppingCart, Minus, Plus, History, RotateCcw } from 'lucide-react';
import { CartItem, PreOrder } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onReorder?: (items: CartItem[]) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onReorder
}: CartDrawerProps) {
  const [activeTab, setActiveTab] = useState<'cart' | 'history'>('cart');
  const [orderHistory, setOrderHistory] = useState<PreOrder[]>([]);

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('fragmento_orders');
      if (saved) {
        try {
          setOrderHistory(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to load order history', e);
        }
      }
    }
  }, [isOpen]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-earth-dark/40 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
            className="relative w-full max-w-md bg-mist-cream h-full flex flex-col shadow-2xl z-10 border-l border-earth-dark/10"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-earth-dark/10 flex justify-between items-center bg-surface">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-brew-clay" />
                <h3 className="font-serif text-2xl text-earth-dark font-medium">Your Ritual Cart</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:text-brew-clay transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 text-earth-dark" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-earth-dark/10 bg-surface">
              <button
                onClick={() => setActiveTab('cart')}
                className={`flex-1 py-3 text-center font-label-caps text-xs tracking-wider border-b-2 transition-all cursor-pointer ${
                  activeTab === 'cart'
                    ? 'border-brew-clay text-brew-clay font-semibold'
                    : 'border-transparent text-earth-dark/50 hover:text-earth-dark'
                }`}
              >
                Active Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-3 text-center font-label-caps text-xs tracking-wider border-b-2 transition-all cursor-pointer ${
                  activeTab === 'history'
                    ? 'border-brew-clay text-brew-clay font-semibold'
                    : 'border-transparent text-earth-dark/50 hover:text-earth-dark'
                }`}
              >
                Order History ({orderHistory.length})
              </button>
            </div>

            {/* Cart Items List / History List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {activeTab === 'cart' ? (
                cartItems.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center text-center px-4">
                    <div className="w-12 h-12 border border-dashed border-earth-dark/20 flex items-center justify-center font-serif text-xl text-earth-dark/40 mb-4">
                      E
                    </div>
                    <p className="font-serif text-lg text-earth-dark/60 italic mb-2">
                      Your cart is an empty fragment.
                    </p>
                    <p className="font-sans text-xs text-on-surface-variant max-w-xs mb-8">
                      Browse our menu ritual to add single-origin pour-overs and hand-laminated pastries.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        const menu = document.getElementById('menu-ritual-section');
                        if (menu) menu.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="border border-earth-dark text-earth-dark hover:bg-earth-dark hover:text-mist-cream px-6 py-3 font-label-caps text-xs tracking-widest transition-colors cursor-pointer"
                    >
                      EXPLORE RITUALS
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6 divide-y divide-earth-dark/10">
                    {cartItems.map((item, index) => (
                      <div
                        key={item.id}
                        className={`pt-6 ${index === 0 ? 'pt-0' : ''} flex gap-4`}
                      >
                        {item.menuItem.image ? (
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            className="w-16 h-16 object-cover border border-earth-dark/10"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-parchment/30 border border-earth-dark/10 flex items-center justify-center font-serif text-xl text-earth-dark/30">
                            {item.menuItem.name[0]}
                          </div>
                        )}

                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-serif text-base text-earth-dark font-semibold">
                              {item.menuItem.name}
                            </h4>
                            <span className="font-sans text-sm text-earth-dark font-medium">
                              ₹{item.menuItem.price * item.quantity}
                            </span>
                          </div>

                          {/* Customization labels */}
                          {item.customizations && (
                            <div className="border-l-2 border-brew-clay bg-brew-clay/5 p-2.5 space-y-1.5 my-2.5 w-full">
                              <div className="font-sans text-[10px] font-bold tracking-[0.2em] text-brew-clay uppercase">
                                BARISTA SPECIFICATIONS
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {item.customizations.milk && (
                                  <span className="bg-white/85 text-earth-dark text-[11px] font-sans font-semibold tracking-[0.1em] px-2 py-0.5 uppercase border border-earth-dark/10">
                                    Milk: {item.customizations.milk}
                                  </span>
                                )}
                                {item.customizations.grind && (
                                  <span className="bg-white/85 text-earth-dark text-[11px] font-sans font-semibold tracking-[0.1em] px-2 py-0.5 uppercase border border-earth-dark/10">
                                    Grind: {item.customizations.grind}
                                  </span>
                                )}
                              </div>
                              {item.customizations.notes && (
                                <div className="text-[11px] text-earth-dark/80 italic block w-full leading-relaxed border-t border-earth-dark/5 pt-1 mt-1">
                                  "{item.customizations.notes}"
                                </div>
                              )}
                            </div>
                          )}

                          {/* Quantity and Action controls */}
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center border border-earth-dark/20 bg-surface">
                              <button
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="px-2.5 py-1 text-earth-dark hover:text-brew-clay transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-sans text-xs font-semibold px-2 text-earth-dark">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="px-2.5 py-1 text-earth-dark hover:text-brew-clay transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-on-surface-variant hover:text-rose-600 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                orderHistory.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center text-center px-4 py-12">
                    <History className="w-10 h-10 text-earth-dark/30 mb-4 stroke-[1.5]" />
                    <p className="font-serif text-lg text-earth-dark/60 italic mb-2">
                      No ritual history yet.
                    </p>
                    <p className="font-sans text-xs text-on-surface-variant max-w-xs mb-8 leading-relaxed">
                      Your successful pre-orders will be safely stored here for easy repeating and tracking.
                    </p>
                    <button
                      onClick={() => setActiveTab('cart')}
                      className="border border-earth-dark text-earth-dark hover:bg-earth-dark hover:text-mist-cream px-6 py-2.5 font-label-caps text-[10px] tracking-widest transition-colors cursor-pointer"
                    >
                      VIEW ACTIVE CART
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orderHistory.map((order) => (
                      <div
                        key={order.id}
                        className="bg-parchment/10 border border-earth-dark/15 p-5 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-earth-dark/30 text-earth-dark"
                      >
                        {/* Decorative top bar */}
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-brew-clay/20" />
                        
                        {/* Order Code, Time and Status */}
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <span className="font-mono font-bold text-xs text-brew-clay bg-brew-clay/5 px-2 py-0.5 border border-brew-clay/10">
                              {order.id}
                            </span>
                            <span className="text-[10px] text-earth-dark/40 block mt-1.5 font-sans">
                              Slot: <span className="font-semibold text-earth-dark/70">{order.pickupTime}</span>
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-sans text-xs font-bold text-earth-dark">
                              ₹{order.totalPrice}
                            </span>
                            <span className="text-[9px] text-earth-dark/40 block mt-1 font-mono uppercase">
                              {order.createdAt}
                            </span>
                          </div>
                        </div>

                        {/* Items List */}
                        <div className="space-y-2.5 my-4 pt-3 border-t border-earth-dark/5">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-baseline text-xs text-earth-dark/80">
                              <span className="truncate max-w-[220px]">
                                <span className="font-medium text-earth-dark">{item.menuItem.name}</span>
                                {item.customizations && (
                                  <span className="text-[10px] text-on-surface-variant/70 italic block mt-0.5 leading-tight">
                                    {[item.customizations.milk, item.customizations.grind]
                                      .filter(Boolean)
                                      .join(' / ')}
                                  </span>
                                )}
                              </span>
                              <span className="text-earth-dark/50 font-mono text-[11px] whitespace-nowrap ml-2">
                                x{item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="mt-4 pt-3 border-t border-earth-dark/5 flex justify-between items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 font-sans font-semibold uppercase tracking-wider border border-emerald-200">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            Secured
                          </span>
                          
                          {onReorder && (
                            <button
                              onClick={() => {
                                onReorder(order.items);
                                setActiveTab('cart');
                              }}
                              className="text-[10px] font-label-caps tracking-widest text-brew-clay hover:text-earth-dark font-bold underline transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" /> REPEAT ORDER
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>

            {/* Cart Footer */}
            {activeTab === 'cart' && cartItems.length > 0 && (
              <div className="p-6 border-t border-earth-dark/10 bg-surface">
                <div className="flex justify-between items-baseline mb-6">
                  <span className="font-serif text-lg text-earth-dark/70 italic">Subtotal</span>
                  <span className="font-sans text-xl text-earth-dark font-bold">₹{subtotal}</span>
                </div>
                
                <p className="font-sans text-[10px] text-on-surface-variant mb-6 leading-relaxed">
                  Tax and packaging included. Your fragments are prepared fresh for seamless, priority pickup at Dehradun atelier.
                </p>

                <button
                  onClick={onProceedToCheckout}
                  className="w-full bg-brew-clay hover:bg-earth-dark text-mist-cream font-label-caps text-xs tracking-widest py-4 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] active:scale-95 cursor-pointer"
                >
                  SECURE YOUR FRAGMENTS <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
