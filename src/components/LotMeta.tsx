/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CURRENT_LOT } from '../data';
import { ShieldCheck, HelpCircle } from 'lucide-react';

export default function LotMeta() {
  return (
    <section className="py-20 md:py-28 bg-surface-container-low/60 border-y border-earth-dark/5">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <div className="mb-12 md:mb-16 text-center">
          <span className="font-sans text-[10px] uppercase font-semibold text-brew-clay tracking-[0.25em] mb-3 block">
            THE ROASTER NOTES
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-earth-dark font-medium mb-2">
            Ritual Notes
          </h2>
          <p className="font-sans text-xs tracking-widest text-earth-dark/50 uppercase">
            CURRENT FEATURE LOT
          </p>
        </div>

        {/* Technical Lot Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border border-earth-dark/10 p-8 md:p-12 bg-surface">
          
          {/* Origin Card */}
          <div className="flex flex-col items-center text-center p-4 border-r border-earth-dark/10 last:border-0 md:border-r">
            <span className="font-sans text-[10px] text-on-surface-variant font-semibold tracking-wider uppercase mb-3">
              ORIGIN
            </span>
            <span className="font-serif text-xl md:text-2xl text-earth-dark font-medium">
              {CURRENT_LOT.origin}
            </span>
            <span className="font-sans text-xs text-on-surface-variant italic mt-1">
              {CURRENT_LOT.subRegion}
            </span>
          </div>

          {/* Elevation Card */}
          <div className="flex flex-col items-center text-center p-4 border-r border-earth-dark/10 last:border-0 md:border-r">
            <span className="font-sans text-[10px] text-on-surface-variant font-semibold tracking-wider uppercase mb-3">
              ELEVATION
            </span>
            <span className="font-serif text-xl md:text-2xl text-earth-dark font-medium">
              {CURRENT_LOT.elevation}
            </span>
            <span className="font-sans text-xs text-on-surface-variant italic mt-1">
              Above Sea Level
            </span>
          </div>

          {/* Process Card */}
          <div className="flex flex-col items-center text-center p-4 last:border-0 md:border-r border-earth-dark/10">
            <span className="font-sans text-[10px] text-on-surface-variant font-semibold tracking-wider uppercase mb-3">
              PROCESS
            </span>
            <span className="font-serif text-xl md:text-2xl text-earth-dark font-medium">
              Hybrid
            </span>
            <span className="font-sans text-xs text-on-surface-variant italic mt-1">
              Natural & Washed
            </span>
          </div>

          {/* Score Card */}
          <div className="flex flex-col items-center text-center p-4 last:border-0">
            <span className="font-sans text-[10px] text-on-surface-variant font-semibold tracking-wider uppercase mb-3">
              SCORE
            </span>
            <span className="font-serif text-xl md:text-2xl text-brew-clay font-semibold">
              {CURRENT_LOT.score}
            </span>
            <span className="font-sans text-xs text-on-surface-variant italic mt-1">
              Specialty Grade
            </span>
          </div>

        </div>

        {/* Bottom Additional Lot Specs */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left border-t border-earth-dark/10 pt-8">
          <div>
            <span className="font-sans text-[9px] font-semibold text-earth-dark/40 tracking-wider uppercase block">
              VARIETAL
            </span>
            <span className="font-sans text-sm text-earth-dark font-medium">
              {CURRENT_LOT.varietal} · Arabica Heritage
            </span>
          </div>
          <div>
            <span className="font-sans text-[9px] font-semibold text-earth-dark/40 tracking-wider uppercase block">
              ROAST STYLE
            </span>
            <span className="font-sans text-sm text-earth-dark font-medium">
              {CURRENT_LOT.roastLevel} · High Clarity Finish
            </span>
          </div>
          <div>
            <span className="font-sans text-[9px] font-semibold text-earth-dark/40 tracking-wider uppercase block">
              LOT TASTING NOTES
            </span>
            <span className="font-sans text-sm text-earth-dark font-medium">
              {CURRENT_LOT.notes.join(', ')}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
