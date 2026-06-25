/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Leaf, Award, Shield, HeartHandshake, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export default function OurStory() {
  return (
    <section id="our-story-section" className="bg-mist-cream/50 text-earth-dark py-24 md:py-36 px-6 md:px-12 border-t border-b border-earth-dark/5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <span className="font-sans text-[10px] uppercase font-bold text-brew-clay tracking-[0.25em] mb-4 block">
            SINCE MMXXI / THE CHRONICLES OF PERSISTENCE
          </span>
          <h2 className="font-serif text-4xl md:text-5.5xl text-earth-dark font-medium leading-tight mb-6">
            A Narrative of Persistence.
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed opacity-90">
            Fragmento is more than a roastery. It is a slow pursuit of the singular moment where craft meets provenance. We reduce the process to its essential, highest-quality fragments to allow the true essence of the bean to speak.
          </p>
        </div>

        {/* 01 Sourcing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center mb-24 md:mb-32">
          {/* Chapter & Title */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-sans text-xl font-bold text-brew-clay tracking-wider">01</span>
              <div className="h-[0.5px] flex-grow bg-earth-dark/20"></div>
            </div>
            <h3 className="font-serif text-2.5xl md:text-4xl text-earth-dark font-medium leading-tight mb-6">
              Sourcing: Indian Estate
            </h3>
            
            <div className="flex gap-2.5 mb-6">
              <span className="bg-parchment/55 border border-earth-dark/10 px-3 py-1 font-sans text-[10px] uppercase tracking-widest font-semibold text-earth-dark">
                CHIKMAGALUR
              </span>
              <span className="bg-parchment/55 border border-earth-dark/10 px-3 py-1 font-sans text-[10px] uppercase tracking-widest font-semibold text-earth-dark">
                1,200M
              </span>
            </div>

            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              Our journey begins in the high-altitude canopy of the Baba Budan Giri hills in Karnataka. We partner with legacy estates that treat the coffee cherry not as a commodity, but as a vintage, shade-growing our lots under lush tropical forests.
            </p>
          </div>

          {/* Image Block */}
          <div className="lg:col-start-7 lg:col-span-6 relative group">
            <div className="absolute -inset-2 border-[0.5px] border-earth-dark/10 pointer-events-none translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
            <div className="aspect-[4/3] w-full overflow-hidden bg-parchment/10 relative p-1.5 border border-earth-dark/5">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVxdFsvqW7HZpgjDo1f26-4xlKtwc222rjwC0HjQxBT4p0TrtC-ya5vOuBSRuXJXN_TYWVbyiQMjckOxUi-G2aZIoqRBpNusU1PBPfgazSVuX2MPK5fFQ03FoN9MMHugD-XUWi8DFiheJNz8gRcZ501FjbEysEy8r0ZO4yY8AGDieHlqGgf2URWl7wu-UDKoCMhZmAKZQ4fykgZiq8XoxzzM6vAbOVixodImXv_YEmpH8Cex6a7rr2120_EB29HNNUtsfcqRi0vF0"
                alt="Green terraced coffee plantations in misty hills"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
              />
              <div className="absolute top-4 right-4 bg-mist-cream/90 backdrop-blur px-3 py-2 flex items-center gap-1.5 border border-earth-dark/5">
                <Compass className="w-3.5 h-3.5 text-brew-clay" />
                <span className="font-sans text-[9px] uppercase tracking-wider font-semibold text-earth-dark">
                  Misty Valleys · South India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 02 Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center mb-24 md:mb-32">
          {/* Image Block (First on Desktop) */}
          <div className="lg:col-span-6 relative group order-2 lg:order-1">
            <div className="absolute -inset-2 border-[0.5px] border-earth-dark/10 pointer-events-none -translate-x-3 translate-y-3 transition-transform duration-500 group-hover:-translate-x-1.5 group-hover:translate-y-1.5" />
            <div className="grid grid-cols-2 gap-4 bg-parchment/10 p-1.5 border border-earth-dark/5">
              <div className="aspect-square overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBznuPaElwbjq1z1vFRER2IK0OQTr2lajqDjqKPz6GReBkKoDx39ARdOe7LnYQFFDivXzehb5KqqteR3tKCuSSlFQ9COWHImLH5GAXGryst7gM5z_IHhLtrnyUb4ofBdswCUJjTPmVU-OniiKMSgAO6QvxgtXmtJ2sA5eACM5O3v3SK4g4Yrm2DJBvgn1t1GghLY5GcUcc4jZC3ElFSVh3t12QJwd-3Z7QrS-MRIOc4CdItc0KH0-5cjczUb-iPbnqwWld1YM-JHYQ"
                  alt="Professional grading session with cupping spoon"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
                />
              </div>
              <div className="aspect-square bg-mist-cream flex flex-col justify-center items-center p-6 border border-earth-dark/5 text-center">
                <span className="font-serif text-5xl md:text-6xl text-brew-clay font-semibold">86.5</span>
                <span className="font-sans text-[9px] font-bold tracking-[0.2em] text-earth-dark/70 uppercase mt-3">
                  SCA QUALITY SCORE
                </span>
              </div>
            </div>
          </div>

          {/* Chapter & Title */}
          <div className="lg:col-start-8 lg:col-span-5 flex flex-col justify-center order-1 lg:order-2">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-sans text-xl font-bold text-brew-clay tracking-wider">02</span>
              <div className="h-[0.5px] flex-grow bg-earth-dark/20"></div>
            </div>
            <h3 className="font-serif text-2.5xl md:text-4xl text-earth-dark font-medium leading-tight mb-6">
              Selection: 86+ Score
            </h3>
            
            <div className="flex gap-2.5 mb-6">
              <span className="bg-parchment/55 border border-earth-dark/10 px-3 py-1 font-sans text-[10px] uppercase tracking-widest font-semibold text-earth-dark">
                EXCELLENCE IS BINARY
              </span>
            </div>

            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              Excellence is binary. We only curate rare micro-lots that exceed an 86-point cupping score. Every single lot undergoes precise grading, ensuring each fragment of your morning is distinct in its sensory complexity.
            </p>
          </div>
        </div>

        {/* 03 Roasting */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center mb-24 md:mb-32">
          {/* Chapter & Title */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-sans text-xl font-bold text-brew-clay tracking-wider">03</span>
              <div className="h-[0.5px] flex-grow bg-earth-dark/20"></div>
            </div>
            <h3 className="font-serif text-2.5xl md:text-4xl text-earth-dark font-medium leading-tight mb-6">
              Roasting: Small-batch
            </h3>
            
            <div className="flex gap-2.5 mb-6">
              <span className="bg-parchment/55 border border-earth-dark/10 px-3 py-1 font-sans text-[10px] uppercase tracking-widest font-semibold text-earth-dark">
                PROFILE: LIGHT-MEDIUM
              </span>
              <span className="bg-parchment/55 border border-earth-dark/10 px-3 py-1 font-sans text-[10px] uppercase tracking-widest font-semibold text-earth-dark">
                BATCH SIZE: 12KG
              </span>
            </div>

            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              We roast in fragments. Small quantities, meticulously monitored by our roasters, to preserve the terroir's volatile aromatics and unique acids that mass-roasting destroys.
            </p>
          </div>

          {/* Image Block */}
          <div className="lg:col-start-7 lg:col-span-6 relative group">
            <div className="absolute -inset-2 border-[0.5px] border-earth-dark/10 pointer-events-none translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
            <div className="aspect-[16/10] w-full overflow-hidden bg-parchment/10 relative p-1.5 border border-earth-dark/5">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUYwLf24o9zNBbOf_7doZRdcuVt4z4uAfCuOmLjJ4rPiDe5o3zLDsn548ASlmAMtEqyhnHFtfeuWHFv9r6_Fz6H7ajZS4xrydq8q-z43VywME-KMxSw1QPENhjfRVFQxndMhDeGTd6Oqb3Mt3p8jkpIftrdNNjJ7mlzp-BtQ87Sp1xO6pVwLltHq4AwHgMuK-rIm01Mm8Zzhc2cYHV2YlyQb3kvSv5N0wYYG5sJJpJMyNya7l6x62cfKXPcJMWRZ8FFnQ-VOeQYsc"
                alt="Focused roaster monitoring the vintage Giesen roaster"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
              />
              <div className="absolute bottom-4 left-4 bg-earth-dark/95 backdrop-blur px-3 py-2 flex items-center gap-1.5 border border-parchment/20">
                <Award className="w-3.5 h-3.5 text-parchment" />
                <span className="font-sans text-[9px] uppercase tracking-wider font-semibold text-parchment">
                  Vintage Giesen drum
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 04 Service */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Image Block (First on Desktop) */}
          <div className="lg:col-span-6 relative group order-2 lg:order-1">
            <div className="absolute -inset-2 border-[0.5px] border-earth-dark/10 pointer-events-none -translate-x-3 translate-y-3 transition-transform duration-500 group-hover:-translate-x-1.5 group-hover:translate-y-1.5" />
            <div className="aspect-[16/10] w-full overflow-hidden bg-parchment/10 relative p-1.5 border border-earth-dark/5">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr2l5AFCYXny-wfm-gjhIKPJPD6EaOuUCRAeLJCPkcdj46GsO0JancTEwE38przr3_wGkJF5sOtJ2pqxojU0XmxjYGU5NgywAqJ-W4kRW1sodOvOBaLNzXXP0RC3ciTFiKSajd-5P2MJGGk9Tn-J4-ZjbXn163wboCSsyX4kd5MXIbxTahev1lX4x-sehJhSxVPuakn4x4trHXPIavwxtiC-NyTPtGQyUqNIqNhR06IeR0edL1Se5Aroj5xeYOkpeR0j1OKm2nVq4"
                alt="Pour over coffee blooming"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
              />
            </div>
          </div>

          {/* Chapter & Title */}
          <div className="lg:col-start-8 lg:col-span-5 flex flex-col justify-center order-1 lg:order-2">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-sans text-xl font-bold text-brew-clay tracking-wider">04</span>
              <div className="h-[0.5px] flex-grow bg-earth-dark/20"></div>
            </div>
            <h3 className="font-serif text-2.5xl md:text-4xl text-earth-dark font-medium leading-tight mb-6">
              Service: Poured with Presence
            </h3>

            <div className="border border-earth-dark/10 p-6 bg-parchment/15 relative mb-6">
              <blockquote className="font-serif text-base md:text-lg italic text-earth-dark mb-3 leading-relaxed">
                "We do not serve coffee; we offer a temporary refuge in the form of a ritual."
              </blockquote>
              <p className="font-sans text-[10px] font-bold text-brew-clay tracking-widest uppercase">
                — THE FRAGMENTO MANIFESTO
              </p>
            </div>

            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
              Every cup we serve on the Rajpur Road bar is brewed with absolute intention. We measure, dial in, and pour slowly to ensure that your experience is unhurried and restorative.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
