/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Compass, Leaf, Award, ArrowRight, Heart, Sparkles, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../types';

interface ChikmagalurSectionProps {
  onAddToCart: (item: MenuItem, qty: number) => void;
  onOpenPreOrder: () => void;
}

export default function ChikmagalurSection({ onAddToCart, onOpenPreOrder }: ChikmagalurSectionProps) {
  const [added, setAdded] = useState(false);

  // Define Chikmagalur Single Origin coffee item
  const chikmagalurItem: MenuItem = {
    id: 'chikmagalur-single-origin',
    name: 'Chikmagalur Single Origin',
    description: 'SLN.795 varietal from the Western Ghats. Notes of wild jasmine, dark honey acidity, and a crisp cacao finish.',
    price: 480,
    category: 'pour',
    tags: ['Micro-lot', 'Single-Origin', '87.5 SCA'],
    elevation: '1,100M',
    origin: 'Chikmagalur, Karnataka',
    tastingNotes: ['Wild Jasmine', 'Dark Honey', 'Cacao Finish'],
    customizable: true
  };

  const handleAcquire = () => {
    onAddToCart(chikmagalurItem, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2500);
  };

  return (
    <section id="chikmagalur-section" className="bg-background border-t border-earth-dark/5 overflow-hidden">
      
      {/* 1. Cinematic Hero Section */}
      <div className="relative w-full h-[65vh] md:h-[80vh] overflow-hidden flex items-end">
        {/* Editorial overlay */}
        <div className="absolute inset-0 bg-earth-dark/25 z-10" />
        
        <img 
          className="absolute inset-0 w-full h-full object-cover grayscale-[10%]"
          id="hero-image-chikmagalur"
          alt="Terraced green coffee estates in the misty hills of Chikmagalur"
          src="https://lh3.googleusercontent.com/aida/AP1WRLuyOAzsD9pjKlxXpYN9yRdb0xm7TJTneO58drPEQ404kkCNju7jC-MViQPGsdZjfWxcdM0do6QE2zts9Xl3CZHMJsANL5eWi34Q-aFnvDOUd9BgnicQjsvNQXWYixxsfZXV5opVK7e43wIaFzLMue-zwGahuCwR7nsWhJ2kfSGq-H2lgdYuJMmbEqhLbqvQMGf5xHbgXKzBAruyBqLr0uE7cP4me4MYNaXhq6junutCHVTozE0zwiIBnA"
          referrerPolicy="no-referrer"
        />

        {/* Narrative layout overlay */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-6 md:px-12 pb-16 md:pb-24 text-mist-cream">
          <span className="font-sans text-[10px] uppercase font-bold tracking-[0.25em] mb-4 block text-parchment">
            ISSUE NO. 04 / ORIGINS
          </span>
          <h2 className="font-serif text-4xl md:text-7xl font-medium leading-[1.1] tracking-tight max-w-4xl">
            The Hills of <br />
            <span className="italic">Chikmagalur</span>
          </h2>
        </div>
      </div>

      {/* 2. Technical Data Blocks (Bento Fragment Grid) */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 -mt-10 md:-mt-14 relative z-30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-[0.5px] border-earth-dark/10 bg-mist-cream shadow-lg">
          <div className="p-6 md:p-8 border-r border-b md:border-b-0 border-earth-dark/10 flex flex-col gap-1 md:gap-2">
            <span className="font-sans text-[9px] font-bold text-brew-clay tracking-widest uppercase">
              ALTITUDE
            </span>
            <span className="font-sans text-xl md:text-2.5xl font-medium text-earth-dark tracking-tight">
              1,100M
            </span>
          </div>
          <div className="p-6 md:p-8 border-b md:border-r md:border-b-0 border-earth-dark/10 flex flex-col gap-1 md:gap-2">
            <span className="font-sans text-[9px] font-bold text-brew-clay tracking-widest uppercase">
              PROCESS
            </span>
            <span className="font-sans text-xl md:text-2.5xl font-medium text-earth-dark tracking-tight">
              WASHED
            </span>
          </div>
          <div className="p-6 md:p-8 border-r border-earth-dark/10 flex flex-col gap-1 md:gap-2">
            <span className="font-sans text-[9px] font-bold text-brew-clay tracking-widest uppercase">
              VARIETAL
            </span>
            <span className="font-sans text-xl md:text-2.5xl font-medium text-earth-dark tracking-tight">
              SLN.795
            </span>
          </div>
          <div className="p-6 md:p-8 flex flex-col gap-1 md:gap-2">
            <span className="font-sans text-[9px] font-bold text-brew-clay tracking-widest uppercase">
              HARVEST
            </span>
            <span className="font-sans text-xl md:text-2.5xl font-medium text-earth-dark tracking-tight">
              JAN '24
            </span>
          </div>
        </div>
      </div>

      {/* 3. Poetic Narrative Section (Dropcap Block) */}
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <article className="space-y-10 text-center md:text-left">
          <div className="text-left font-serif text-lg md:text-2.5xl leading-relaxed text-earth-dark relative">
            {/* Elegant large dropcap character */}
            <span className="float-left text-7xl md:text-8xl font-serif text-brew-clay font-medium leading-[0.8] pr-4 pt-1 select-none">
              W
            </span>
            here the Western Ghats curve like the spine of a sleeping giant, the mist of Chikmagalur begins its daily ascent. Here, coffee is not merely a crop; it is a persistent dialogue between the red volcanic soil and the monsoon rains that define this ancient landscape. The terraces, carved with architectural precision into the slopes, hold the secrets of generations who have whispered to the shade-grown trees under the canopy of silver oaks.
          </div>

          <div className="h-[0.5px] w-24 bg-brew-clay/40 mx-auto my-12" />

          <p className="font-serif text-xl md:text-2xl text-brew-clay italic leading-relaxed text-center max-w-2xl mx-auto">
            "The cherry arrives in silence, ripening only when the cool mountain air grants it permission."
          </p>

          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed text-left opacity-95">
            The harvest is a ritual of patience. Unlike the industrial cadence of lowland estates, here the rhythm is dictated by the tactile verification of each bean. Collectors move through the groves like ghosts in the morning fog, their movements fluid and practiced, ensuring that only the berries at the absolute peak of sugar concentration are selected for the mill.
          </p>
        </article>
      </div>

      {/* 4. Tasting Notes (Bento Style) */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-24 md:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-4 bg-parchment p-10 md:p-12 flex flex-col justify-between border-[0.5px] border-earth-dark/5 relative overflow-hidden group">
            {/* Subtle design element */}
            <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            
            <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-brew-clay mb-12 block">
              NOTE 01 / AROMATICS
            </span>
            <div>
              <h3 className="font-serif text-2.5xl text-earth-dark font-medium mb-4">
                Wild Jasmine
              </h3>
              <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed opacity-90">
                A fleeting floral aroma that introduces the cup, reminiscent of the white blossoms that blanket the estate in March.
              </p>
            </div>
            <div className="mt-8 border-t border-earth-dark/10 pt-4 flex justify-between items-center text-[9px] font-sans text-earth-dark/50 tracking-widest uppercase">
              <span>EXTRACTION NOTE</span>
              <span>LIGHT FLIGHT</span>
            </div>
          </div>

          <div className="lg:col-span-8 bg-earth-dark text-mist-cream p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Diagonal overlay styling */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F9F6F0 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-parchment mb-12 block">
              CORE PROFILE / CUP PROFILE
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-3">
                <h3 className="font-serif text-2xl text-mist-cream font-medium">
                  Dark Honey Acidity
                </h3>
                <p className="font-sans text-xs md:text-sm text-mist-cream/75 leading-relaxed">
                  A thick, syrupy sweetness that lingers on the mid-palate, characteristic of the prolonged slow-ripening process in these high-altitude shaded groves.
                </p>
              </div>
              <div className="border-t md:border-t-0 md:border-l-[0.5px] border-mist-cream/20 pt-8 md:pt-0 md:pl-8 space-y-3">
                <h3 className="font-serif text-2xl text-mist-cream font-medium">
                  Cacao Finish
                </h3>
                <p className="font-sans text-xs md:text-sm text-mist-cream/75 leading-relaxed">
                  The finale is clean yet profound—a dry cocoa bitterness that grounds the brighter floral and fruit notes into a cohesive whole.
                </p>
              </div>
            </div>
            <div className="mt-12 border-t border-mist-cream/10 pt-4 flex justify-between items-center text-[9px] font-sans text-mist-cream/40 tracking-widest uppercase">
              <span>SPECIAL SOURCING PROFILE</span>
              <span>SLN.795 ARCHIVE</span>
            </div>
          </div>

        </div>
      </div>

      {/* 5. The Custodian Section (Ravi's Story) */}
      <div className="bg-surface-container-low border-t border-b border-earth-dark/5 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 relative group">
              {/* Image Border Outline Accents */}
              <div className="absolute -inset-4 border-[0.5px] border-brew-clay/20 pointer-events-none translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
              
              <div className="aspect-[4/3] w-full overflow-hidden bg-surface-container-high border border-primary/5 p-1">
                <img
                  className="w-full h-full object-cover grayscale transition-all duration-[1200ms] group-hover:grayscale-0 group-hover:scale-102"
                  alt="Ravi holding freshly picked rich red coffee cherries in his hands"
                  src="https://lh3.googleusercontent.com/aida/AP1WRLs83-3fvahBCDfetS2WU3VPt73b_ABYSdL67s4zd50m3PklubmEd-X2fHJbcXpIpmi6BIDnyWtfvGAtwJZAM4MOZgylS8J0gSWgVf1h9zuVseaMpdbSVvs1i9Qp1jgZrUw724nNzFMGK1-Yty9e4f6M6_mnLu9xn_U3uuRblHMxFPE3tkmPi6tpycuA8Y_J0f740o37B18V5FEaS5kQ3K4nGZOVxEzg3Ujh2RP4dZo16YU_J4S4iwCC0w"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-6 flex justify-between items-center border-b border-earth-dark/10 pb-4 font-sans text-[10px] tracking-widest text-earth-dark/50">
                <span className="font-semibold">IMAGE REF 12.A // THE CUSTODIAN</span>
                <span className="font-mono">CHIKMAGALUR</span>
              </div>
            </div>

            <div className="lg:col-start-8 lg:col-span-5 flex flex-col justify-center">
              <span className="font-sans text-[10px] uppercase font-bold text-brew-clay tracking-[0.25em] mb-4 block">
                THE CUSTODIAN OF CHERRY
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-earth-dark font-medium leading-tight mb-6">
                The Hands that <br />
                Hold the Origin
              </h2>
              <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed mb-8">
                Meet Ravi, a third-generation grower who views the estate not as land he owns, but as a biological clock he must meticulously wind every season. His hands, stained by the tannin of a thousand harvests, possess a sensory library of ripeness that no machine can replicate.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b border-earth-dark/10 pb-4">
                  <span className="font-mono text-xs font-bold text-brew-clay">01</span>
                  <span className="font-sans text-[10px] font-semibold tracking-widest text-earth-dark uppercase">
                    INDIVIDUAL BATCH TRACING
                  </span>
                </div>
                <div className="flex items-center gap-4 border-b border-earth-dark/10 pb-4">
                  <span className="font-mono text-xs font-bold text-brew-clay">02</span>
                  <span className="font-sans text-[10px] font-semibold tracking-widest text-earth-dark uppercase">
                    SOLAR-DRIED PROCESSING
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-bold text-brew-clay">03</span>
                  <span className="font-sans text-[10px] font-semibold tracking-widest text-earth-dark uppercase">
                    SHADE-GROWN CERTIFIED
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 6. Interactive CTA Acquisition Section */}
      <div className="max-w-4xl mx-auto text-center py-24 px-6">
        <Sparkles className="w-6 h-6 text-brew-clay mx-auto mb-6" />
        <h4 className="font-serif text-2.5xl md:text-3.5xl text-earth-dark font-medium mb-4">
          Ready to experience the ritual?
        </h4>
        <p className="font-sans text-xs md:text-sm text-on-surface-variant/80 max-w-lg mx-auto mb-10 leading-relaxed">
          Acquire our fresh micro-lot of Chikmagalur single origin beans (SLN.795). Curated, small-batch roasted weekly at our Rajpur Road roastery.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleAcquire}
            className={`font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-10 py-5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md w-full sm:w-auto border-none ${
              added 
                ? 'bg-emerald-600 text-mist-cream' 
                : 'bg-brew-clay hover:bg-earth-dark text-mist-cream hover:-translate-y-[1px]'
            }`}
          >
            {added ? (
              <>
                ADDED TO RITUAL <CheckCircle className="w-4 h-4 animate-bounce" />
              </>
            ) : (
              <>
                ACQUIRE THE BEANS <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          
          <button
            onClick={onOpenPreOrder}
            className="border border-earth-dark text-earth-dark hover:bg-earth-dark hover:text-mist-cream font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-10 py-5 transition-all duration-300 w-full sm:w-auto cursor-pointer bg-transparent"
          >
            PRE-ORDER BREW
          </button>
        </div>
      </div>

    </section>
  );
}
