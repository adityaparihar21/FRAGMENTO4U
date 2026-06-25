/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RITUAL_STEPS } from '../data';
import { Sparkles, HelpCircle } from 'lucide-react';

export default function RitualBento() {
  return (
    <section id="ritual-section" className="py-24 md:py-36 bg-mist-cream px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <span className="font-sans text-[10px] uppercase font-semibold text-brew-clay tracking-[0.25em] mb-4 block">
            02 / THE PROCESS
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-earth-dark font-medium leading-tight">
            The Ritual.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
          
          {/* Step 1: Sourcing (Large image-based block) */}
          <div className="md:col-span-8 group relative overflow-hidden h-[400px] border border-earth-dark/10">
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-103">
              <img
                src={RITUAL_STEPS[0].image}
                alt="Coffee plantation estate in Coorg"
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 brightness-75"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-mist-cream">
              <span className="font-sans text-sm tracking-wider font-semibold opacity-70">01</span>
              <div>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-parchment mb-2 block font-semibold">
                  {RITUAL_STEPS[0].label}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-medium mb-3">{RITUAL_STEPS[0].title}</h3>
                <p className="font-sans text-xs md:text-sm text-mist-cream/85 max-w-xl leading-relaxed">
                  {RITUAL_STEPS[0].description}
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Selection (Parchment text block) */}
          <div className="md:col-span-4 bg-parchment/40 p-8 flex flex-col justify-between h-[400px] border border-earth-dark/10">
            <span className="font-sans text-sm tracking-wider font-semibold text-brew-clay">02</span>
            <div>
              <span className="font-sans text-[10px] tracking-[0.2em] text-on-surface-variant mb-2 block font-semibold">
                {RITUAL_STEPS[1].label}
              </span>
              <h3 className="font-serif text-2xl text-earth-dark font-medium mb-4">{RITUAL_STEPS[1].title}</h3>
              <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
                {RITUAL_STEPS[1].description}
              </p>
            </div>
            
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-mist-cream text-[10px] font-sans font-bold tracking-wider border border-earth-dark/5">
                TRACEABLE
              </span>
              <span className="px-3 py-1 bg-mist-cream text-[10px] font-sans font-bold tracking-wider border border-earth-dark/5">
                86+ SCORE
              </span>
            </div>
          </div>

          {/* Step 3: Roasting (Earth Dark solid box with horizontal scrolling marquee text) */}
          <div className="md:col-span-4 bg-earth-dark text-parchment p-8 flex flex-col justify-between h-[400px] border border-earth-dark/15 relative overflow-hidden">
            <span className="font-sans text-sm tracking-wider font-semibold opacity-50">03</span>
            <div>
              <span className="font-sans text-[10px] tracking-[0.2em] opacity-60 mb-2 block font-semibold">
                {RITUAL_STEPS[2].label}
              </span>
              <h3 className="font-serif text-2xl text-parchment font-medium mb-4">{RITUAL_STEPS[2].title}</h3>
              <p className="font-sans text-xs md:text-sm opacity-80 leading-relaxed">
                {RITUAL_STEPS[2].description}
              </p>
            </div>

            {/* Marquee Container */}
            <div className="w-full h-12 overflow-hidden relative border-t border-parchment/10 pt-4 flex items-center">
              <div className="whitespace-nowrap font-serif text-brew-clay opacity-45 italic text-sm tracking-widest animate-marquee absolute">
                COORG · CHIKMAGALUR · ARAKU · NILGIRIS · ANAMALLAIS · COORG · CHIKMAGALUR · ARAKU · NILGIRIS · ANAMALLAIS ·
              </div>
            </div>
          </div>

          {/* Step 4: Final Pour (Barista pouring V60) */}
          <div className="md:col-span-8 group relative overflow-hidden h-[400px] border border-earth-dark/10">
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-103">
              <img
                src={RITUAL_STEPS[3].image}
                alt="Barista brewing V60 pour over"
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 brightness-75"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-mist-cream">
              <span className="font-sans text-sm tracking-wider font-semibold opacity-70">04</span>
              <div>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-parchment mb-2 block font-semibold">
                  {RITUAL_STEPS[3].label}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-medium mb-3">{RITUAL_STEPS[3].title}</h3>
                <p className="font-sans text-xs md:text-sm text-mist-cream/85 max-w-xl leading-relaxed">
                  {RITUAL_STEPS[3].description}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
