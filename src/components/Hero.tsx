/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenPreOrder: () => void;
}

export default function Hero({ onOpenPreOrder }: HeroProps) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('provenance-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image with Parallax & Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-earth-dark"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      >
        <img
          src="/screen.png"
          alt="Barista pouring V60 in warm sunlit cafe"
          className="w-full h-full object-cover scale-105 opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-earth-dark/40 via-earth-dark/20 to-mist-cream/95 md:from-earth-dark/30 md:via-earth-dark/10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="w-8 h-px bg-parchment/60" />
          <span className="font-sans text-[10px] uppercase font-semibold text-parchment tracking-[0.3em]">
            01 / SPECIALTY COFFEE ATELIER
          </span>
          <div className="w-8 h-px bg-parchment/60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
          className="font-serif text-5xl md:text-7xl text-mist-cream font-medium tracking-tight leading-tight mb-6"
        >
          Artisanal coffee. <br />
          <span className="italic">Sensory fragments.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-serif text-lg md:text-2xl text-mist-cream/90 italic max-w-xl mb-12 leading-relaxed"
        >
          An immersive specialty cafe and slow-roasted ritual in Dehradun, combining curated seasonal single-origins with modular pastry designs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => {
              const menuSection = document.getElementById('menu-ritual-section');
              if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-brew-clay text-mist-cream font-label-caps text-xs tracking-widest px-8 py-4.5 hover:bg-earth-dark transition-all duration-300 w-64 sm:w-auto hover:shadow-lg hover:translate-y-[-2px] active:scale-95 cursor-pointer"
          >
            EXPLORE THE MENU
          </button>
          
          <button
            onClick={onOpenPreOrder}
            className="border border-mist-cream text-mist-cream bg-transparent font-label-caps text-xs tracking-widest px-8 py-4.5 hover:bg-mist-cream hover:text-earth-dark transition-all duration-300 w-64 sm:w-auto hover:shadow-lg hover:translate-y-[-2px] active:scale-95 cursor-pointer"
          >
            PRE-ORDER FOR PICKUP
          </button>
        </motion.div>
      </div>

      {/* Floating Meta tags */}
      <div className="absolute bottom-24 left-10 hidden lg:flex flex-col gap-1 items-start text-left z-10 text-mist-cream/60 font-sans text-[10px] tracking-widest border-l border-parchment/30 pl-4">
        <span>EST. 2024</span>
        <span>RAJPUR ROAD · DEHRADUN</span>
      </div>

      <div className="absolute bottom-24 right-10 hidden lg:flex flex-col gap-1 items-end text-right z-10 text-mist-cream/60 font-sans text-[10px] tracking-widest border-r border-parchment/30 pr-4">
        <span>SLOW ROASTED</span>
        <span>SMALL BATCH RITUALS</span>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 group opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
        aria-label="Scroll to content"
      >
        <span className="font-sans text-[9px] font-semibold text-mist-cream/70 tracking-[0.25em] transition-transform group-hover:translate-y-1 duration-300">
          SCROLL TO EXPLORE
        </span>
        <ChevronDown className="w-4 h-4 text-mist-cream/80 animate-bounce" />
      </button>
    </section>
  );
}
