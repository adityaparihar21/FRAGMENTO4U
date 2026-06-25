/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Leaf, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function Provenance() {
  return (
    <section id="provenance-section" className="py-24 md:py-36 bg-surface px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Row 1: A Study in Provenance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center mb-24 md:mb-36">
          
          {/* Text block */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="font-sans text-[10px] uppercase font-semibold text-brew-clay tracking-[0.25em] mb-4 block">
              01 / PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-earth-dark font-medium leading-tight mb-6">
              A Study in Provenance
            </h2>
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed mb-8">
              We view coffee not as a commodity, but as a series of intentional fragments. Each bean tells the story of its soil, the hands that picked it, and the flame that defined its character. 
            </p>
            <p className="font-sans text-sm text-on-surface-variant/80 leading-relaxed italic border-l-2 border-parchment pl-4 py-1">
              Shade-grown under massive forest canopies in Coorg, Karnataka, surrounded by orange orchards and wild pepper vines.
            </p>
          </div>
          
          {/* Image Block */}
          <div className="lg:col-start-7 lg:col-span-6 relative group">
            {/* Outline accent layer */}
            <div className="absolute -inset-2 border-[0.5px] border-earth-dark/10 pointer-events-none translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
            <div className="aspect-[4/3] w-full overflow-hidden bg-parchment/10 relative p-1.5 border border-earth-dark/5">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaZvLxb2X241HpHz1ptcm3cwWlsblKNctLg4bK_MkSrHVuL2xvtGEOt0wgq8WBoGLr7Jp-0YOSfEBiThvuKSmhjFVuYy9xxDgR60FRyG29qLRjSLR3Xa4oE9afmJj7YWOj4OsY2FhjHhhgYW6wqLRAfhFk6uP16e7GOo2K26WviQZTQyhZ-Me4I_sKv9_TJmyi8s-MLbg5ofb-MDw_tU29DYxgYDjiHpP5cHWTi293SRVZuLn9LT-Z5dGTFUXMWq6H1iAUZWTB6QU"
                alt="Green high-altitude Indian coffee beans"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
              />
              <div className="absolute top-4 right-4 bg-mist-cream/90 backdrop-blur px-3 py-2 flex items-center gap-1.5 border border-earth-dark/5">
                <Leaf className="w-3.5 h-3.5 text-brew-clay" />
                <span className="font-sans text-[9px] uppercase tracking-wider font-semibold text-earth-dark">
                  Indian Estate · Direct
                </span>
              </div>
            </div>
          </div>
          
        </div>

        {/* Row 2: The Small Batch Ritual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Image Block (Order first on desktop) */}
          <div className="lg:col-span-7 relative group order-2 lg:order-1">
            <div className="absolute -inset-2 border-[0.5px] border-earth-dark/10 pointer-events-none -translate-x-3 translate-y-3 transition-transform duration-500 group-hover:-translate-x-1 group-hover:translate-y-1" />
            <div className="aspect-[16/10] w-full overflow-hidden bg-parchment/10 relative p-1.5 border border-earth-dark/5">
              <img
                src="https://lh3.googleusercontent.com/aida/AP1WRLunKP4eWuIylWG4Tjt_V2Ya2DipTy6lIw8-qhFaIIa8xp8XgFMGnHgQWbge-iA2jeuOPJ0f--pu4_i1yT_D-lN7ny0r47Go4Unz7Xme75XkiNb-9V9MXLMTERq31ByRn6gi7dMlqw_PuhKR8dw6i587Bqcx2Y41-rUP8A0sTIoOVRNZLDlyEfWPJOIpEld1VMFgr1RCel8fCZGl7P3IFZTgy0BjGHwuoB8L3NqAagz92Z-XR-Tj9HFfNw"
                alt="Small-batch coffee drum roaster cooling tray"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
              />
              <div className="absolute bottom-4 left-4 bg-earth-dark/95 px-3 py-2 flex items-center gap-1.5 border border-parchment/20">
                <Award className="w-3.5 h-3.5 text-parchment" />
                <span className="font-sans text-[9px] uppercase tracking-wider font-semibold text-parchment">
                  12kg Vintage Drum Roaster
                </span>
              </div>
            </div>
          </div>

          {/* Text block */}
          <div className="lg:col-start-9 lg:col-span-4 flex flex-col justify-center order-1 lg:order-2">
            <span className="font-sans text-[10px] uppercase font-semibold text-brew-clay tracking-[0.25em] mb-4 block">
              02 / CRAFT
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-earth-dark font-medium leading-tight mb-6">
              The Small Batch Ritual
            </h2>
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed mb-6">
              Our roasting is a delicate dialogue with the beans. We roast in limited quantities to ensure that every fragment of flavor is captured at its peak intensity.
            </p>
            <p className="font-sans text-sm text-on-surface-variant/80 leading-relaxed">
              Every profile is custom-curated, roasting just enough for the week's service to guarantee absolute freshness on the Rajpur Road bar.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
