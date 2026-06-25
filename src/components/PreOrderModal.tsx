/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  X, User, Phone, CheckCircle, Clock, ArrowRight, ArrowLeft, 
  Printer, CreditCard, ShieldCheck, Wallet, Activity 
} from 'lucide-react';
import { CartItem, PreOrder } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}

export default function PreOrderModal({ isOpen, onClose, cartItems, onClearCart }: PreOrderModalProps) {
  // Wizard Steps: 1 = Ritual, 2 = Lot, 3 = Arrival, 4 = Payment, 5 = Success
  const [step, setStep] = useState(1);
  const [selectedRitual, setSelectedRitual] = useState<'Pour Over' | 'Espresso' | 'Filter'>('Pour Over');
  const [selectedLot, setSelectedLot] = useState<string>('Coorg Estate');
  const [lotDetails, setLotDetails] = useState<string>('SCA 86.5 Lot #802 • Dark Chocolate & Molasses');
  
  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('IN 30 MIN');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quietMeter, setQuietMeter] = useState<'Meditative' | 'Focused' | 'Social'>('Meditative');
  
  // Payment Details
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Order history & success states
  const [currentOrder, setCurrentOrder] = useState<PreOrder | null>(null);
  const [orderHistory, setOrderHistory] = useState<PreOrder[]>([]);

  // Brewing Animation states
  const [brewingProgress, setBrewingProgress] = useState(0);
  const [brewingPhase, setBrewingPhase] = useState<'grinding' | 'blooming' | 'extracting' | 'swirling' | 'done'>('grinding');

  // Calculate pricing
  const isCartActive = cartItems.length > 0;
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const basePrice = isCartActive ? cartSubtotal : 450; // Custom wizard cup default ₹450

  useEffect(() => {
    // Load past orders
    const saved = localStorage.getItem('fragmento_orders');
    if (saved) {
      try {
        setOrderHistory(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Timer loop for the coffee brewing animation
  useEffect(() => {
    if (step === 5) {
      setBrewingProgress(0);
      setBrewingPhase('grinding');
      
      const interval = setInterval(() => {
        setBrewingProgress((prev) => {
          const next = prev + 1;
          if (next >= 100) {
            clearInterval(interval);
            // Wait a moment at 100% and then automatically advance to step 6 (Receipt Screen)
            setTimeout(() => {
              setStep(6);
            }, 1000);
            return 100;
          }
          
          if (next < 25) {
            setBrewingPhase('grinding');
          } else if (next < 50) {
            setBrewingPhase('blooming');
          } else if (next < 85) {
            setBrewingPhase('extracting');
          } else {
            setBrewingPhase('swirling');
          }
          
          return next;
        });
      }, 55); // 55ms * 100 = ~5.5s duration
      
      return () => clearInterval(interval);
    }
  }, [step]);

  // Update Lot details dynamically based on selected Lot in Step 2
  const updateLotDetails = (lot: string) => {
    setSelectedLot(lot);
    if (lot === 'Coorg Estate') {
      setLotDetails('SCA 86.5 Lot #802 • Dark Chocolate & Molasses');
    } else if (lot === 'Yirgacheffe G1') {
      setLotDetails('SCA 84.2 Lot #741 • Jasmine & Lemon Zest');
    } else {
      setLotDetails('SCA 85.0 Lot #720 • Red Apple & Almond');
    }
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleConfirmRitual = (e: React.FormEvent) => {
    e.preventDefault();

    // Verification check for step 3 inputs
    if (!name.trim()) {
      alert('Please enter your identity/name to secure the pre-order.');
      return;
    }

    const randomCode = `FRAG-${Math.floor(1000 + Math.random() * 9000)}`;

    // Prepare items list (either from actual cart or a single custom configured cup)
    const itemsToSecured: CartItem[] = isCartActive ? [...cartItems] : [
      {
        id: 'wizard-cup',
        menuItem: {
          id: selectedRitual.toLowerCase().replace(/\s+/g, '-'),
          name: `${selectedRitual} (${selectedLot})`,
          description: `Custom curated slow brew. Provenance: ${selectedLot}`,
          price: 450,
          category: 'pour'
        },
        quantity: 1,
        customizations: {
          notes: `Batch Lot: ${selectedLot}. Quiet Atmosphere: ${quietMeter}`
        }
      }
    ];

    const newOrder: PreOrder = {
      id: randomCode,
      items: itemsToSecured,
      customerName: name,
      customerPhone: phone || '9876543210',
      pickupTime: pickupTime,
      specialInstructions: specialInstructions.trim() ? specialInstructions : `Lot Selection: ${selectedLot} • Atmosphere: ${quietMeter}`,
      totalPrice: basePrice,
      status: 'confirmed',
      createdAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [newOrder, ...orderHistory];
    setOrderHistory(updatedHistory);
    localStorage.setItem('fragmento_orders', JSON.stringify(updatedHistory));

    setCurrentOrder(newOrder);
    setStep(5); // Success step
    onClearCart();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setCurrentOrder(null);
    setName('');
    setPhone('');
    setPickupTime('IN 30 MIN');
    setSpecialInstructions('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setBrewingProgress(0);
    setBrewingPhase('grinding');
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[140] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-earth-dark/45 backdrop-blur-sm"
        />

        {/* Modal Panel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-2xl bg-mist-cream shadow-2xl z-10 border border-earth-dark/15 max-h-[92vh] overflow-y-auto flex flex-col"
        >
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-earth-dark/10 flex justify-between items-start">
            <div>
              <span className="font-sans text-[10px] uppercase font-bold text-brew-clay tracking-[0.2em] mb-1 block">
                CONCIERGE EXPERIENCE
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-earth-dark font-medium leading-none">
                {step === 6 ? 'Ritual Prepared' : step === 5 ? 'Atelier Extraction' : 'Pre-order Ritual'}
              </h3>
            </div>
            
            <div className="flex items-center gap-6">
              {step <= 4 && (
                <div className="hidden sm:flex flex-col items-end">
                  <div className="flex gap-1.5 mb-1.5">
                    {[1, 2, 3, 4].map((s) => (
                      <div 
                        key={s} 
                        className={`h-[2px] w-8 transition-colors duration-300 ${
                          s <= step ? 'bg-brew-clay' : 'bg-earth-dark/15'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="font-sans text-[8px] tracking-widest text-on-surface-variant font-semibold uppercase">
                    STEP 0{step} / 04
                  </span>
                </div>
              )}
              
              <button
                onClick={onClose}
                className="p-1 hover:text-brew-clay transition-colors cursor-pointer border-none bg-transparent"
                aria-label="Close pre-order"
              >
                <X className="w-5 h-5 text-earth-dark" />
              </button>
            </div>
          </div>

          {/* Wizard Content Body */}
          <div className="p-6 md:p-8 flex-grow">
            
            {/* Step 1: Selection (Ritual) */}
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="font-serif text-xl md:text-2xl text-earth-dark mb-1">
                    01. Pick your ritual
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant">
                    The extraction method defines the structural narrative of the cup.
                  </p>
                </div>

                {isCartActive && (
                  <div className="bg-parchment/30 border border-brew-clay/20 p-3 text-xs text-brew-clay font-medium italic flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> You have custom items in your cart. We will secure your entire cart configuration.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Pour Over */}
                  <div 
                    onClick={() => setSelectedRitual('Pour Over')}
                    className={`border p-5 flex flex-col justify-between cursor-pointer group h-[260px] transition-all duration-300 ${
                      selectedRitual === 'Pour Over' ? 'border-brew-clay bg-parchment/40' : 'border-earth-dark/10 bg-parchment/10 hover:border-earth-dark/25 hover:bg-parchment/20'
                    }`}
                  >
                    <div>
                      <span className="font-mono text-[10px] text-brew-clay font-bold block mb-4">01.1</span>
                      <h5 className="font-serif text-lg text-earth-dark mb-2">Pour Over</h5>
                      <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
                        Clean, complex, and intentional. Highlight floral notes and dynamic acidity.
                      </p>
                    </div>
                    <div className="relative w-full h-20 overflow-hidden mt-4">
                      <img 
                        alt="Pour over coffee ritual" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                        src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Espresso */}
                  <div 
                    onClick={() => setSelectedRitual('Espresso')}
                    className={`border p-5 flex flex-col justify-between cursor-pointer group h-[260px] transition-all duration-300 ${
                      selectedRitual === 'Espresso' ? 'border-brew-clay bg-parchment/40' : 'border-earth-dark/10 bg-parchment/10 hover:border-earth-dark/25 hover:bg-parchment/20'
                    }`}
                  >
                    <div>
                      <span className="font-mono text-[10px] text-brew-clay font-bold block mb-4">01.2</span>
                      <h5 className="font-serif text-lg text-earth-dark mb-2">Espresso</h5>
                      <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
                        Intensity concentrated. High viscosity, heavy body, and outstanding clarity.
                      </p>
                    </div>
                    <div className="relative w-full h-20 overflow-hidden mt-4">
                      <img 
                        alt="Espresso shot preparation" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                        src="https://images.unsplash.com/photo-151097252790b-a481d234860a?auto=format&fit=crop&q=80&w=400"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Filter */}
                  <div 
                    onClick={() => setSelectedRitual('Filter')}
                    className={`border p-5 flex flex-col justify-between cursor-pointer group h-[260px] transition-all duration-300 ${
                      selectedRitual === 'Filter' ? 'border-brew-clay bg-parchment/40' : 'border-earth-dark/10 bg-parchment/10 hover:border-earth-dark/25 hover:bg-parchment/20'
                    }`}
                  >
                    <div>
                      <span className="font-mono text-[10px] text-brew-clay font-bold block mb-4">01.3</span>
                      <h5 className="font-serif text-lg text-earth-dark mb-2">Filter</h5>
                      <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
                        A balanced daily companion. Batch-brewed to highlight foundational sweetness.
                      </p>
                    </div>
                    <div className="relative w-full h-20 overflow-hidden mt-4">
                      <img 
                        alt="Filter batch brewing container" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                        src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleNextStep}
                    className="bg-brew-clay hover:bg-earth-dark text-mist-cream font-sans font-semibold text-xs tracking-widest px-8 py-3.5 uppercase transition-colors duration-300 flex items-center gap-2 cursor-pointer border-none"
                  >
                    CHOOSE PROVENANCE <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Customization (Choose Lot) */}
            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="font-serif text-xl md:text-2xl text-earth-dark mb-1">
                    02. Choose your lot
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Sourcing defined by precise elevation, unique processing methods, and distinctive terroir.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Lot 1 - Coorg */}
                  <div 
                    onClick={() => updateLotDetails('Coorg Estate')}
                    className={`border p-4 flex flex-col sm:flex-row justify-between sm:items-center cursor-pointer group transition-all duration-300 ${
                      selectedLot === 'Coorg Estate' ? 'border-brew-clay bg-parchment/40' : 'border-earth-dark/10 bg-parchment/10 hover:border-earth-dark/25 hover:bg-parchment/20'
                    }`}
                  >
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-parchment/20 flex-shrink-0 overflow-hidden">
                        <img 
                          alt="Coorg raw beans" 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-500"
                          src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=200"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h5 className="font-serif text-base text-earth-dark font-medium">Coorg Estate</h5>
                        <p className="font-sans text-xs text-on-surface-variant">Dark Chocolate, Spice, Molasses</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-3 sm:mt-0">
                      <span className="px-3 py-1 bg-parchment/40 font-mono text-[9px] text-earth-dark tracking-widest uppercase">1,100M</span>
                      <span className="px-3 py-1 bg-brew-clay/10 font-mono text-[9px] text-brew-clay font-bold tracking-widest uppercase">WASHED</span>
                    </div>
                  </div>

                  {/* Lot 2 - Yirgacheffe */}
                  <div 
                    onClick={() => updateLotDetails('Yirgacheffe G1')}
                    className={`border p-4 flex flex-col sm:flex-row justify-between sm:items-center cursor-pointer group transition-all duration-300 ${
                      selectedLot === 'Yirgacheffe G1' ? 'border-brew-clay bg-parchment/40' : 'border-earth-dark/10 bg-parchment/10 hover:border-earth-dark/25 hover:bg-parchment/20'
                    }`}
                  >
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-parchment/20 flex-shrink-0 overflow-hidden">
                        <img 
                          alt="Yirgacheffe beans" 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-500"
                          src="https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&q=80&w=200"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h5 className="font-serif text-base text-earth-dark font-medium">Yirgacheffe G1</h5>
                        <p className="font-sans text-xs text-on-surface-variant">Jasmine, Bergamot, Lemon Zest</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-3 sm:mt-0">
                      <span className="px-3 py-1 bg-parchment/40 font-mono text-[9px] text-earth-dark tracking-widest uppercase">2,100M</span>
                      <span className="px-3 py-1 bg-brew-clay/10 font-mono text-[9px] text-brew-clay font-bold tracking-widest uppercase">NATURAL</span>
                    </div>
                  </div>

                  {/* Lot 3 - La Esperanza */}
                  <div 
                    onClick={() => updateLotDetails('La Esperanza')}
                    className={`border p-4 flex flex-col sm:flex-row justify-between sm:items-center cursor-pointer group transition-all duration-300 ${
                      selectedLot === 'La Esperanza' ? 'border-brew-clay bg-parchment/40' : 'border-earth-dark/10 bg-parchment/10 hover:border-earth-dark/25 hover:bg-parchment/20'
                    }`}
                  >
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-parchment/20 flex-shrink-0 overflow-hidden">
                        <img 
                          alt="La Esperanza cherries" 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-500"
                          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=200"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h5 className="font-serif text-base text-earth-dark font-medium">La Esperanza</h5>
                        <p className="font-sans text-xs text-on-surface-variant">Red Apple, Caramel, Almond</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-3 sm:mt-0">
                      <span className="px-3 py-1 bg-parchment/40 font-mono text-[9px] text-earth-dark tracking-widest uppercase">1,850M</span>
                      <span className="px-3 py-1 bg-brew-clay/10 font-mono text-[9px] text-brew-clay font-bold tracking-widest uppercase">HONEY</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between border-t border-earth-dark/10">
                  <button
                    onClick={handlePrevStep}
                    className="border border-earth-dark text-earth-dark hover:bg-parchment/20 px-6 py-3 font-sans text-xs tracking-widest uppercase flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> BACK
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="bg-brew-clay hover:bg-earth-dark text-mist-cream font-sans font-semibold text-xs tracking-widest px-8 py-3.5 uppercase transition-colors duration-300 flex items-center gap-2 cursor-pointer border-none"
                  >
                    MOMENT OF ARRIVAL <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Presence & Moment of Arrival */}
            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="font-serif text-xl md:text-2xl text-earth-dark mb-1">
                    03. Establish Presence
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Establish your exact moment of entry. Bypass the transaction lines completely.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="space-y-4">
                    {/* Time selection buttons */}
                    <div>
                      <label className="font-sans text-[10px] text-earth-dark/50 font-bold tracking-wider uppercase block mb-2">
                        ESTIMATED MOMENT OF ARRIVAL
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {['IN 15 MIN', 'IN 30 MIN', 'IN 45 MIN', 'IN 60 MIN'].map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setPickupTime(time)}
                            className={`px-4 py-3 border font-sans text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                              pickupTime === time 
                                ? 'border-brew-clay bg-brew-clay text-mist-cream shadow-sm' 
                                : 'border-earth-dark/10 bg-parchment/10 hover:border-earth-dark/25 text-earth-dark hover:bg-parchment/20'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      
                      <div className="mt-3">
                        <label className="font-sans text-[9px] text-on-surface-variant/70 font-semibold uppercase block mb-1">
                          Or select specific slot
                        </label>
                        <select
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full bg-parchment/10 text-earth-dark border border-earth-dark/15 p-2.5 text-xs font-sans outline-none focus:border-brew-clay"
                        >
                          <option value="IN 30 MIN" className="bg-mist-cream text-earth-dark">Standard (30 Min Slot)</option>
                          <option value="08:30 AM" className="bg-mist-cream text-earth-dark">08:30 AM (Morning Flow)</option>
                          <option value="09:00 AM" className="bg-mist-cream text-earth-dark">09:00 AM</option>
                          <option value="10:30 AM" className="bg-mist-cream text-earth-dark">10:30 AM (Mid-Morning Bloom)</option>
                          <option value="12:00 PM" className="bg-mist-cream text-earth-dark">12:00 PM</option>
                          <option value="03:00 PM" className="bg-mist-cream text-earth-dark">03:00 PM (Afternoon Extraction)</option>
                          <option value="05:30 PM" className="bg-mist-cream text-earth-dark">05:30 PM</option>
                        </select>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="font-sans text-[10px] text-earth-dark/50 font-bold tracking-wider uppercase block mb-1">
                          CONCIERGE NAME / IDENTITY
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="E.g. Aditya Parihar"
                          className="w-full bg-parchment/10 text-earth-dark border border-earth-dark/15 p-3 text-sm font-sans outline-none focus:border-brew-clay focus:bg-parchment/15"
                        />
                      </div>
                      
                      <div>
                        <label className="font-sans text-[10px] text-earth-dark/50 font-bold tracking-wider uppercase block mb-1">
                          CONTACT NUMBER
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="E.g. +91 9876543210"
                          className="w-full bg-parchment/10 text-earth-dark border border-earth-dark/15 p-3 text-sm font-sans outline-none focus:border-brew-clay focus:bg-parchment/15"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5 bg-parchment/5 border border-earth-dark/10 p-5 shadow-sm">
                    {/* Quiet Meter nodes (From Reference 1) */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="font-sans text-[10px] text-earth-dark/50 font-bold tracking-wider uppercase">
                          QUIET METER PREFERENCE
                        </label>
                        <span className="text-[9px] text-brew-clay italic font-semibold uppercase font-sans">
                          {quietMeter}
                        </span>
                      </div>
                      
                      {/* Quiet nodes horizontal visualization */}
                      <div className="h-[2px] bg-earth-dark/10 w-full relative flex justify-between items-center my-6">
                        <button
                          type="button"
                          onClick={() => setQuietMeter('Meditative')}
                          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 relative z-10 cursor-pointer ${
                            quietMeter === 'Meditative' 
                              ? 'bg-brew-clay border-brew-clay text-mist-cream scale-110 shadow-md' 
                              : 'bg-parchment/10 border-earth-dark/15 hover:border-earth-dark/30 text-earth-dark hover:bg-parchment/20'
                          }`}
                          title="Meditative solitude"
                        >
                          <Activity className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuietMeter('Focused')}
                          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 relative z-10 cursor-pointer ${
                            quietMeter === 'Focused' 
                              ? 'bg-brew-clay border-brew-clay text-mist-cream scale-110 shadow-md' 
                              : 'bg-parchment/10 border-earth-dark/15 hover:border-earth-dark/30 text-earth-dark hover:bg-parchment/20'
                          }`}
                          title="Focused study space"
                        >
                          <Clock className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuietMeter('Social')}
                          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 relative z-10 cursor-pointer ${
                            quietMeter === 'Social' 
                              ? 'bg-brew-clay border-brew-clay text-mist-cream scale-110 shadow-md' 
                              : 'bg-parchment/10 border-earth-dark/15 hover:border-earth-dark/30 text-earth-dark hover:bg-parchment/20'
                          }`}
                          title="Social & interactive discussion"
                        >
                          <User className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex justify-between font-sans text-[8px] text-on-surface-variant font-bold tracking-widest uppercase">
                        <span>MEDITATIVE</span>
                        <span>FOCUSED</span>
                        <span>SOCIAL</span>
                      </div>
                    </div>

                    {/* Special Notes */}
                    <div>
                      <label className="font-sans text-[10px] text-earth-dark/50 font-bold tracking-wider uppercase block mb-1.5">
                        BARISTA SPECIAL NOTES
                      </label>
                      <textarea
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="E.g. pack croissant separately, whole milk, double filter..."
                        rows={2}
                        className="w-full bg-parchment/10 text-earth-dark border border-earth-dark/15 p-2.5 text-xs font-sans outline-none focus:border-brew-clay resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between border-t border-earth-dark/10">
                  <button
                    onClick={handlePrevStep}
                    className="border border-earth-dark text-earth-dark hover:bg-parchment/20 px-6 py-3 font-sans text-xs tracking-widest uppercase flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> BACK
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="bg-brew-clay hover:bg-earth-dark text-mist-cream font-sans font-semibold text-xs tracking-widest px-8 py-3.5 uppercase transition-colors duration-300 flex items-center gap-2 cursor-pointer border-none"
                  >
                    PROCEED TO SECURITY <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Secure Payment Method */}
            {step === 4 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="font-serif text-xl md:text-2xl text-earth-dark mb-1">
                    04. Secure Payment Method
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Securing your pre-order helps ensure freshly prepared elements with zero commercial food waste.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Selector & Details */}
                  <div className="md:col-span-7 space-y-6">
                    {/* Method Toggle Selector */}
                    <div className="space-y-2.5">
                      {/* Card Selection */}
                      <div 
                        onClick={() => setPaymentMethod('card')}
                        className={`border p-4 flex items-center justify-between cursor-pointer transition-all ${
                          paymentMethod === 'card' ? 'border-brew-clay bg-parchment/40 shadow-sm' : 'border-earth-dark/10 bg-parchment/10 hover:bg-parchment/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-brew-clay' : 'text-earth-dark/55'}`} />
                          <div>
                            <p className="font-sans text-xs font-semibold tracking-wider text-earth-dark">CREDIT / DEBIT CARD</p>
                            <p className="font-sans text-[9px] text-on-surface-variant/70">Secure SSL Encrypted Transaction</p>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center p-0.5 ${
                          paymentMethod === 'card' ? 'border-brew-clay' : 'border-earth-dark/25'
                        }`}>
                          {paymentMethod === 'card' && <div className="w-full h-full bg-brew-clay rounded-full" />}
                        </div>
                      </div>

                      {/* Wallet Selection */}
                      <div 
                        onClick={() => setPaymentMethod('wallet')}
                        className={`border p-4 flex items-center justify-between cursor-pointer transition-all ${
                          paymentMethod === 'wallet' ? 'border-brew-clay bg-parchment/40 shadow-sm' : 'border-earth-dark/10 bg-parchment/10 hover:bg-parchment/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Wallet className={`w-5 h-5 ${paymentMethod === 'wallet' ? 'text-brew-clay' : 'text-earth-dark/55'}`} />
                          <div>
                            <p className="font-sans text-xs font-semibold tracking-wider text-earth-dark">DIGITAL WALLET</p>
                            <p className="font-sans text-[9px] text-on-surface-variant/70">Apple Pay, Google Pay, UPI Express</p>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center p-0.5 ${
                          paymentMethod === 'wallet' ? 'border-brew-clay' : 'border-earth-dark/25'
                        }`}>
                          {paymentMethod === 'wallet' && <div className="w-full h-full bg-brew-clay rounded-full" />}
                        </div>
                      </div>
                    </div>

                    {/* Card input forms (Displayed only when card is selected) */}
                    {paymentMethod === 'card' ? (
                      <div className="space-y-4 p-4 bg-parchment/15 border border-earth-dark/15">
                        <div className="relative border-b border-earth-dark/20 pb-1">
                          <label className="font-sans text-[8px] text-earth-dark/50 font-bold uppercase block mb-1">Card Number</label>
                          <input 
                            type="text" 
                            required
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="0000 0000 0000 0000" 
                            className="w-full bg-transparent border-none p-0 text-sm font-mono focus:ring-0 tracking-widest placeholder:opacity-40 text-earth-dark"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="border-b border-earth-dark/20 pb-1">
                            <label className="font-sans text-[8px] text-earth-dark/50 font-bold uppercase block mb-1">MM/YY</label>
                            <input 
                              type="text" 
                              required
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="09 / 28" 
                              className="w-full bg-transparent border-none p-0 text-sm font-sans focus:ring-0 placeholder:opacity-40 text-earth-dark"
                            />
                          </div>
                          <div className="border-b border-earth-dark/20 pb-1">
                            <label className="font-sans text-[8px] text-earth-dark/50 font-bold uppercase block mb-1">CVV</label>
                            <input 
                              type="password" 
                              required
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="•••" 
                              className="w-full bg-transparent border-none p-0 text-sm font-sans focus:ring-0 placeholder:opacity-40 text-earth-dark"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 bg-parchment/15 border border-dashed border-brew-clay/20 text-center font-sans text-xs text-on-surface-variant italic">
                        Digital Wallet flow active. We will redirect to UPI or payment sheet upon confirmation.
                      </div>
                    )}
                  </div>

                  {/* Right Column: Pre-order Summary & Checkout */}
                  <div className="md:col-span-5 bg-parchment p-6 md:p-8 flex flex-col justify-between border border-earth-dark/10 h-full">
                    <div>
                      <h5 className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] text-brew-clay border-b border-earth-dark/10 pb-3 mb-4">
                        RITUAL SUMMARY
                      </h5>
                      
                      <div className="space-y-4 text-xs font-sans">
                        <div className="flex justify-between items-baseline border-b border-earth-dark/5 pb-2">
                          <span className="opacity-60 font-semibold">METHOD</span>
                          <span className="font-serif text-sm font-medium text-earth-dark">
                            {isCartActive ? 'Active Cart Batch' : selectedRitual}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-start border-b border-earth-dark/5 pb-2">
                          <span className="opacity-60 font-semibold">PROVENANCE</span>
                          <span className="font-serif text-xs font-medium text-earth-dark text-right max-w-[130px]">
                            {isCartActive ? 'Cart Micro-lot Sourcing' : selectedLot}
                          </span>
                        </div>

                        <div className="flex justify-between items-baseline pt-4 font-serif text-sm italic text-earth-dark">
                          <span>Subtotal Cost</span>
                          <span className="font-sans font-bold text-base">₹{basePrice}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 space-y-4">
                      <button
                        onClick={handleConfirmRitual}
                        className="w-full bg-brew-clay hover:bg-earth-dark text-mist-cream font-sans font-bold text-xs tracking-widest py-4 uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer border-none"
                      >
                        PAY & SECURE RITUAL <ShieldCheck className="w-4 h-4" />
                      </button>

                      <div className="flex justify-center items-center gap-1.5 opacity-60 text-[9px] font-sans font-bold tracking-wider uppercase text-on-surface-variant">
                        <ShieldCheck className="w-3.5 h-3.5 text-brew-clay" /> SSL SECURE ENCRYPTED SESSION
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between border-t border-earth-dark/10">
                  <button
                    onClick={handlePrevStep}
                    className="border border-earth-dark text-earth-dark hover:bg-parchment/20 px-6 py-3 font-sans text-xs tracking-widest uppercase flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> BACK
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Coffee Brewing Animation Step */}
            {step === 5 && currentOrder && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-6 text-center select-none"
              >
                {/* Immersive Audio visual indicator */}
                <div className="mb-4">
                  <span className="font-sans text-[10px] uppercase font-bold text-brew-clay tracking-[0.25em]">
                    Atelier Brewing Queue Active
                  </span>
                </div>

                <h4 className="font-serif text-2xl md:text-3xl text-earth-dark font-medium mb-1">
                  Extracting Your Ritual...
                </h4>
                <p className="font-sans text-xs text-on-surface-variant max-w-md mx-auto mb-6">
                  Our roasters are active. Your order is secured and the extraction has begun.
                </p>

                {/* GORGEOUS Minimalist SVG Coffee Brewer */}
                <div className="relative w-48 h-60 flex items-center justify-center bg-parchment/15 border border-earth-dark/10 p-4 mb-6 shadow-sm rounded-none">
                  {/* Digital active clock display at bottom/top */}
                  <div className="absolute top-2.5 right-3 font-mono text-[9px] text-brew-clay font-bold tracking-wider">
                    {brewingProgress}%
                  </div>
                  <div className="absolute top-2.5 left-3 font-mono text-[8px] text-earth-dark/50 tracking-wider">
                    EST_FLOW_93.5°C
                  </div>

                  <svg width="180" height="220" viewBox="0 0 180 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <style>{`
                      @keyframes flow-water {
                        to {
                          stroke-dashoffset: -20;
                        }
                      }
                      @keyframes drip-drop {
                        0% {
                          transform: translateY(0) scale(1);
                          opacity: 0;
                        }
                        15% {
                          opacity: 1;
                        }
                        85% {
                          transform: translateY(44px) scale(0.9);
                          opacity: 1;
                        }
                        100% {
                          transform: translateY(48px) scale(0.3);
                          opacity: 0;
                        }
                      }
                      @keyframes gentle-steam {
                        0% {
                          stroke-dashoffset: 0;
                          opacity: 0;
                        }
                        25% {
                          opacity: 0.35;
                        }
                        75% {
                          opacity: 0.35;
                        }
                        100% {
                          stroke-dashoffset: -16;
                          opacity: 0;
                        }
                      }
                      @keyframes coffee-pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                      }
                      .anim-water-flow {
                        animation: flow-water 1.2s linear infinite;
                      }
                      .anim-drop-1 {
                        animation: drip-drop 1.5s infinite cubic-bezier(0.4, 0.4, 0.7, 0.4);
                      }
                      .anim-drop-2 {
                        animation: drip-drop 1.5s infinite cubic-bezier(0.4, 0.4, 0.7, 0.4);
                        animation-delay: 0.75s;
                      }
                      .anim-steam-1 {
                        animation: gentle-steam 3s linear infinite;
                        stroke-dasharray: 6, 6;
                      }
                      .anim-steam-2 {
                        animation: gentle-steam 3.8s linear infinite;
                        animation-delay: 1.2s;
                        stroke-dasharray: 6, 6;
                      }
                      .anim-pulse-bed {
                        transform-origin: 90px 115px;
                        animation: coffee-pulse 4s ease-in-out infinite;
                      }
                    `}</style>

                    <defs>
                      {/* Carafe Container Definition */}
                      <path id="server-interior-shape" d="M 76,168 L 104,168 L 115,212 H 65 Z" />
                      <clipPath id="server-interior-clip">
                        <use href="#server-interior-shape" />
                      </clipPath>
                    </defs>

                    {/* 1. STEAM LINES (Rising above the filter) */}
                    <path d="M 82,90 Q 77,75 84,65 T 79,48" fill="none" stroke="#2B2623" strokeWidth="1.2" strokeLinecap="round" className="anim-steam-1" />
                    <path d="M 98,90 Q 103,75 96,65 T 101,48" fill="none" stroke="#2B2623" strokeWidth="1.2" strokeLinecap="round" className="anim-steam-2" />

                    {/* 2. GOOSENECK KETTLE SPOUT (Top left to center-pour) */}
                    <path d="M 20,38 H 82 Q 90,38 90,52" fill="none" stroke="#2B2623" strokeWidth="3.5" strokeLinecap="round" />
                    {/* Tiny tip detail on spout */}
                    <circle cx="90" cy="52" r="1.5" fill="#C16646" />

                    {/* 3. WATER STREAM (Pouring down into center of coffee bed) */}
                    {brewingProgress > 15 && brewingProgress < 90 && (
                      <line x1="90" y1="52" x2="90" y2="108" stroke="#A5D8F3" strokeWidth="1.8" strokeDasharray="5,5" className="anim-water-flow" strokeLinecap="round" />
                    )}

                    {/* 4. THE V60 DRIPPER CONE & FILTER */}
                    {/* Glass outline of V60 */}
                    <polygon points="56,100 124,100 102,144 78,144" fill="none" stroke="#2B2623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Paper Filter inside */}
                    <polygon points="61,102 119,102 100,142 80,142" fill="#E8D9C5" opacity="0.5" />
                    {/* Coffee Grounds Bed inside paper filter */}
                    {brewingProgress > 10 && (
                      <ellipse cx="90" cy="115" rx="19" ry="7" fill="#422F25" className="anim-pulse-bed" />
                    )}

                    {/* 5. DRIPPING COFFEE DROPS (Falling from the dripper outlet into the server) */}
                    {brewingProgress > 22 && brewingProgress < 95 && (
                      <>
                        <g className="anim-drop-1">
                          <circle cx="90" cy="144" r="2.2" fill="#C16646" />
                        </g>
                        <g className="anim-drop-2">
                          <circle cx="90" cy="144" r="2.2" fill="#C16646" />
                        </g>
                      </>
                    )}

                    {/* 6. GLASS CARAFE SERVER (Bottom container) */}
                    {/* Handle details on the left */}
                    <path d="M 64,175 H 48 V 205 H 64" fill="none" stroke="#2B2623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Carafe Body Outer Ring */}
                    <path d="M 68,165 H 78 V 160 H 102 V 165 H 112 L 123,214 A 2,2 0 0 1 121,216 H 59 A 2,2 0 0 1 57,214 Z" fill="none" stroke="#2B2623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                    {/* RISING COFFEE LIQUID (Clipped perfectly within the interior shape of carafe) */}
                    <g clipPath="url(#server-interior-clip)">
                      {/* Rich amber/brown coffee rectangle rising */}
                      <rect 
                        x="40" 
                        y={215 - (brewingProgress / 100) * 44} 
                        width="100" 
                        height="50" 
                        fill="#C16646" 
                        opacity="0.88" 
                      />
                      {/* Dark coffee foam layer on top of liquid */}
                      {brewingProgress > 5 && (
                        <ellipse 
                          cx="90" 
                          cy={215 - (brewingProgress / 100) * 44} 
                          rx="30" 
                          ry="2.5" 
                          fill="#E8D9C5" 
                          opacity="0.6" 
                        />
                      )}
                    </g>
                  </svg>
                </div>

                {/* Status Narrative Logs */}
                <div className="w-full max-w-sm bg-parchment/10 border border-earth-dark/10 p-4 rounded-none min-h-[76px] flex flex-col justify-center mb-6">
                  <span className="font-mono text-[9px] text-brew-clay font-bold tracking-widest uppercase mb-1.5 block">
                    {brewingPhase === 'grinding' && 'PHASE 1: ATELIER GRIND'}
                    {brewingPhase === 'blooming' && 'PHASE 2: HYDRO-BLOOM'}
                    {brewingPhase === 'extracting' && 'PHASE 3: ARTISANAL EXTRACT'}
                    {brewingPhase === 'swirling' && 'PHASE 4: CARAFE SWIRL & POUR'}
                    {brewingPhase === 'done' && 'EXTRACTION COMPLETED'}
                  </span>
                  <p className="font-sans text-xs text-earth-dark font-medium leading-relaxed">
                    {brewingPhase === 'grinding' && `Grinding organic ${selectedLot} beans to medium-coarse (28 clicks) for optimal extraction clarity...`}
                    {brewingPhase === 'blooming' && `Saturating ground bed with 50ml hot water at 93.5°C to release locked-in CO₂ gases (the bloom)...`}
                    {brewingPhase === 'extracting' && `Initiating concentric spirals with water. Extracting sweet oils and dynamic ${selectedLot} terroir brightness...`}
                    {brewingPhase === 'swirling' && `Filter drawdown complete. Aerating your fresh brew to disperse fragrant fruit and chocolate aromatics...`}
                    {brewingPhase === 'done' && `Order authenticated. Logging your receipt and secure pickup code: ${currentOrder.id}...`}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full max-w-xs bg-earth-dark/10 h-1.5 relative rounded-none mb-2 overflow-hidden">
                  <div 
                    className="bg-brew-clay h-full transition-all duration-100 ease-out"
                    style={{ width: `${brewingProgress}%` }}
                  />
                </div>
                <div className="text-[10px] font-mono text-on-surface-variant/70 tracking-widest uppercase">
                  {brewingProgress}% COMPLETED
                </div>
              </motion.div>
            )}

            {/* Step 6: Success Receipt Panel (From Reference 1 & 2) */}
            {step === 6 && currentOrder && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-6"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-7 h-7 text-emerald-600" />
                </div>
                <h4 className="font-serif text-2.5xl text-earth-dark font-medium mb-1">
                  Ritual Prepared.
                </h4>
                <p className="font-sans text-xs text-on-surface-variant mb-8 text-center max-w-sm">
                  Your selection has been secured and logged into our artisan's queue. We look forward to your presence.
                </p>

                {/* Stunning Physical Receipt Mockup */}
                <div className="w-full max-w-md bg-parchment/20 border border-earth-dark/15 p-6 md:p-8 font-sans shadow-md relative border-b-dashed border-b-4">
                  {/* Header */}
                  <div className="text-center border-b border-earth-dark/10 pb-4 mb-4">
                    <span className="font-serif text-xl tracking-[0.25em] text-earth-dark block">FRAGMENTO</span>
                    <span className="text-[9px] tracking-widest text-earth-dark/60 block">RAJPUR ROAD · DEHRADUN</span>
                    <span className="text-[8px] text-earth-dark/40 block mt-1">CONCIERGE RECEIPT</span>
                  </div>

                  {/* Metadata block */}
                  <div className="grid grid-cols-2 gap-y-3 text-xs border-b border-earth-dark/10 pb-4 mb-4 text-earth-dark/70">
                    <div>
                      <span className="text-[9px] text-earth-dark/40 uppercase block">SECURE CODE</span>
                      <span className="font-mono font-bold text-sm text-brew-clay">{currentOrder.id}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-earth-dark/40 uppercase block">PICKUP MOMENT</span>
                      <span className="font-bold">{currentOrder.pickupTime}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-earth-dark/40 uppercase block">GUEST SPOT</span>
                      <span className="font-medium text-earth-dark">{currentOrder.customerName}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-earth-dark/40 uppercase block">ATMOSPHERE</span>
                      <span className="font-medium text-earth-dark">{quietMeter}</span>
                    </div>
                  </div>

                  {/* List Items */}
                  <div className="space-y-3 border-b border-earth-dark/10 pb-4 mb-4">
                    {currentOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start text-xs">
                        <div>
                          <span className="font-semibold text-earth-dark">{item.menuItem.name}</span>
                          <span className="text-earth-dark/45 ml-1">x{item.quantity}</span>
                        </div>
                        <span className="font-bold text-earth-dark">₹{item.menuItem.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Grand total */}
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-serif text-base text-earth-dark font-medium italic">Grand Total Paid</span>
                    <span className="text-base font-bold text-earth-dark">₹{currentOrder.totalPrice}</span>
                  </div>

                  {/* Barcode effect mockup */}
                  <div className="mt-8 flex flex-col items-center opacity-70">
                    <div className="flex gap-[1.5px] h-8 bg-earth-dark w-44 opacity-85 select-none overflow-hidden justify-center items-stretch">
                      {Array.from({ length: 32 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="bg-mist-cream flex-grow" 
                          style={{ width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1 : 2)}px` }} 
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[8px] tracking-[0.2em] text-earth-dark/50 mt-1 uppercase">
                      SECURE-AUTHENTICATED
                    </span>
                  </div>
                </div>

                {/* Receipt Actions */}
                <div className="mt-8 flex gap-4 w-full max-w-md justify-center">
                  <button
                    onClick={handlePrint}
                    className="border border-earth-dark text-earth-dark hover:bg-parchment/20 px-6 py-3 font-sans text-xs tracking-widest uppercase flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" /> PRINT RECEIPT
                  </button>
                  <button
                    onClick={handleReset}
                    className="bg-brew-clay hover:bg-earth-dark text-mist-cream px-8 py-3 font-sans text-xs tracking-widest uppercase flex items-center gap-1.5 cursor-pointer border-none"
                  >
                    DONE <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
