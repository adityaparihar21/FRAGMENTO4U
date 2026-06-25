/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MapPin, Compass, Clock, Play, Pause, Send, Check, Volume2, Music, ArrowRight } from 'lucide-react';

interface VisitProps {
  onOpenPreOrder?: () => void;
}

export default function Visit({ onOpenPreOrder }: VisitProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [pulseWidth, setPulseWidth] = useState(35); // Meditative atmosphere default is 35%

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const playlist = [
    { id: 'pink-white', title: 'Pink + White — Frank Ocean', genre: 'NEO-SOUL / VIBE • 03:04' },
    { id: 'about-you', title: 'About You — The 1975', genre: 'DREAM POP / VIBE • 05:26' },
    { id: 'white-ferrari', title: 'White Ferrari — Frank Ocean', genre: 'AMBIENT R&B • 04:41' },
    { id: 'always-caesar', title: 'Always — Daniel Caesar', genre: 'R&B / SOUL • 03:45' },
    { id: 'who-knows-caesar', title: 'Who Knows — Daniel Caesar', genre: 'SOUL / R&B • 03:40' },
    { id: 'equinox', title: 'Equinox (In Doon)', genre: 'MODULAR AMBIENT • 08:42' },
    { id: 'shadow', title: 'Shadow Rituals', genre: 'MINIMALIST SERIF • 06:15' },
    { id: 'coffee', title: 'Coffee & Stone', genre: 'FOUND SOUNDS • 12:00' },
  ];

  useEffect(() => {
    // Subtle real-time pulse meter simulation
    const interval = setInterval(() => {
      setPulseWidth((prev) => {
        const delta = Math.floor(Math.random() * 11) - 5; // -5% to +5%
        const next = prev + delta;
        return Math.max(20, Math.min(50, next)); // keep around meditative range
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3');
      audioRef.current.loop = true;
    }
  }, []);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.warn("Audio playback failed:", e));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const handlePlayToggle = (id: string) => {
    if (isPlaying === id) {
      setIsPlaying(null);
    } else {
      setIsPlaying(id);
    }
  };

  return (
    <section id="visit-section" className="bg-background border-t border-earth-dark/5 overflow-hidden">
      
      {/* 1. Introductory Hero Image + Space Description (Editorial Layout) */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-16 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-5">
            <span className="font-sans text-[10px] uppercase font-semibold text-brew-clay tracking-[0.25em] mb-4 block">
              THE DEHRADUN ATELIER
            </span>
            <h2 className="font-serif text-3.5xl md:text-5xl text-earth-dark font-medium leading-tight mb-8">
              A space for <span className="italic">intentional</span> presence.
            </h2>
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed mb-6">
              Our Rajpur Road location is a living manifestation of minimalist modularism. Nestled in the foothills of Dehradun, the architecture follows a rigid grid where every single fragment—from the raw concrete counters to the floating teakwood shelving—serves a structural and narrative purpose.
            </p>
            <p className="font-sans text-xs md:text-sm text-on-surface-variant/85 leading-relaxed">
              We have designed this environment to evoke a sense of deep slowness. Here, the hum of the roaster acts as the only metronome, and our expansive glass frames invite the changing light of the Doon Valley to paint the space in shifting tones of ochre and mist.
            </p>
          </div>

          <div className="lg:col-start-7 lg:col-span-6 relative group">
            {/* Outline accent layer */}
            <div className="absolute -inset-4 border-[0.5px] border-earth-dark/15 pointer-events-none translate-x-4 -translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
            
            <div className="relative aspect-[4/5] md:aspect-[4/3] w-full overflow-hidden bg-surface-container-high border border-primary/5 p-1">
              <img
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-102 grayscale-[15%]"
                alt="Minimalist coffee counter architecture with sharp geometric layout"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeJZ_ykiFgLYOFRgHxjhdriqLHHr8o1ZhqF-zKmEc9V_TjxV9Wu3RrhcaIYIDbgwjOAuTMKUjmw662AUP2xD4z4T6AMNNZT389UHdPgw0Ys2TQCLn-o7m2IQta61Zynhr0jr0rqlIRoKIvJyb2uBlQltEW_Tosr1zJZdOnUDz2HPM0IfI_hffEs2lpU5HCDJsLPuY_UvAQLaJoR6orCLtjUkZEWrg5jtVx7-SR_FPHscZ8StrhWg6hSpZNF73tkH6i39OoQxhpS_o"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 md:p-6 bg-parchment/90 backdrop-blur-md border border-earth-dark/10">
                <span className="font-sans text-[9px] font-bold text-primary tracking-[0.2em] mb-1 block uppercase">
                  CURRENTLY BREWING
                </span>
                <h4 className="font-serif text-lg md:text-xl text-earth-dark font-medium">
                  Highland Wash, Batch 04
                </h4>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-center border-b border-primary/10 pb-4 font-sans text-[10px] tracking-widest text-earth-dark/50">
              <span className="font-semibold">FRAGMENT 08: ARCHITECTURAL VOID</span>
              <span className="font-mono">DEHRADUN, IN</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Logistics & Quiet Meter Section (Grounded Sand/Cream Palette) */}
      <div className="bg-surface-container-low border-y border-earth-dark/5 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Logistics Card Grid */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <span className="font-sans text-[10px] font-bold text-brew-clay tracking-[0.2em] uppercase block mb-3">
                  01. LOCATION
                </span>
                <p className="font-serif text-xl md:text-2xl text-earth-dark leading-tight mb-3">
                  112/B Rajpur Road,<br />
                  Aura Estate, Dehradun 248001
                </p>
                <a
                  href="https://maps.google.com/?q=112B+Rajpur+Road,+Aura+Estate,+Dehradun,+248001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-widest text-brew-clay hover:text-earth-dark font-bold transition-colors uppercase border-b border-brew-clay pb-0.5"
                >
                  OPEN IN MAPS <Compass className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-earth-dark/10 pt-8">
                <div>
                  <span className="font-sans text-[10px] font-bold text-brew-clay tracking-[0.2em] uppercase block mb-3">
                    02. OPERATING HOURS
                  </span>
                  <div className="space-y-3 font-sans text-xs text-on-surface-variant">
                    <div>
                      <p className="opacity-60 uppercase font-semibold text-[9px] tracking-wider mb-0.5">WEEKDAYS</p>
                      <p className="font-mono text-sm font-semibold text-earth-dark">07:30 — 19:00</p>
                    </div>
                    <div>
                      <p className="opacity-60 uppercase font-semibold text-[9px] tracking-wider mb-0.5">WEEKENDS</p>
                      <p className="font-mono text-sm font-semibold text-earth-dark">08:00 — 20:00</p>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="font-sans text-[10px] font-bold text-brew-clay tracking-[0.2em] uppercase block mb-3">
                    03. INQUIRIES
                  </span>
                  <div className="space-y-1 font-sans text-xs text-earth-dark">
                    <p className="font-medium">+91 0135 274 9000</p>
                    <p className="opacity-85">atelier@fragmento.co</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized Map Mockup & Interactive Quiet Pulse Meter */}
            <div className="lg:col-start-7 lg:col-span-6 space-y-8">
              
              {/* Minimalist Map Canvas */}
              <div className="aspect-[16/10] sm:aspect-[21/10] lg:aspect-[16/9] w-full bg-parchment/40 relative border border-earth-dark/10 shadow-sm overflow-hidden p-1">
                {/* Dot grid lines simulation */}
                <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#16120f 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                
                {/* Simulated Roads */}
                <div className="absolute top-[45%] left-0 w-full h-[0.5px] bg-earth-dark/15 -translate-y-1/2 rotate-6" />
                <div className="absolute top-0 left-[40%] w-[0.5px] h-full bg-earth-dark/15 -translate-x-1/2 -rotate-12" />
                <div className="absolute bottom-[30%] left-0 w-full h-8 bg-earth-dark/[0.03] flex items-center justify-center -rotate-3 select-none">
                  <span className="font-sans text-[8px] tracking-[0.3em] font-semibold text-earth-dark/30 uppercase">
                    RAJPUR ROAD GRID
                  </span>
                </div>

                {/* Animated map pin marker */}
                <div className="absolute top-[42%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-15 flex flex-col items-center">
                  <span className="absolute inline-flex h-10 w-10 rounded-full bg-brew-clay/20 animate-ping" />
                  <div className="relative bg-brew-clay text-mist-cream p-2 shadow-md">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>

                {/* Map Floating coordinates */}
                <div className="absolute bottom-4 left-4 bg-mist-cream/90 backdrop-blur border border-earth-dark/5 p-1.5 text-[8px] font-sans font-semibold tracking-widest text-earth-dark/60">
                  30.3601° N · 78.0617° E
                </div>
              </div>

              {/* High-Fidelity Quiet Meter (From Reference 2) */}
              <div className="bg-mist-cream border border-earth-dark/10 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-sans text-[9px] font-bold text-brew-clay tracking-[0.2em] uppercase">
                      02. THE QUIET METER
                    </span>
                    <span className="font-sans text-[9px] text-on-surface-variant italic uppercase font-semibold tracking-wider">
                      Optimal Atmosphere: Meditative
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-baseline mb-4">
                    <h4 className="font-serif text-lg text-earth-dark font-medium">
                      Current Atelier Pulse
                    </h4>
                    <span className="font-mono text-xs font-bold text-brew-clay uppercase">
                      Quiet / Focused
                    </span>
                  </div>

                  {/* Meter Bar */}
                  <div className="h-[2px] w-full bg-earth-dark/10 relative overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full bg-brew-clay transition-all duration-[1500ms] cubic-bezier(0.65, 0, 0.35, 1)" 
                      style={{ width: `${pulseWidth}%` }} 
                    />
                  </div>

                  <div className="flex justify-between font-sans text-[8px] text-on-surface-variant/70 tracking-widest uppercase font-semibold mt-2.5">
                    <span>Solitude (Mellow)</span>
                    <span>Social (Active)</span>
                  </div>
                </div>

                <p className="font-sans text-xs text-on-surface-variant leading-relaxed mt-4 italic border-l-2 border-brew-clay/20 pl-3">
                  Our baristas are conducting slow-brewing sessions. Recommended for deep creative work, quiet reading, or mindful contemplation.
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* 3. Playlist & Interactive Sourcing Concierge Call to Action */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Vol. 14 Playlist (With interactive sound playing emulation!) */}
          <div className="lg:col-span-5 bg-surface border border-earth-dark/10 p-8 md:p-10 shadow-sm relative overflow-hidden group">
            <span className="font-sans text-[9px] font-bold text-on-surface-variant tracking-[0.2em] uppercase block mb-6">
              ATELIER PLAYLIST: VOL. 14
            </span>
            
            <div className="space-y-4">
              {playlist.map((track) => (
                <div 
                  key={track.id}
                  onClick={() => handlePlayToggle(track.id)}
                  className={`flex items-center gap-4 p-4 border transition-all duration-300 cursor-pointer ${
                    isPlaying === track.id 
                      ? 'bg-parchment/30 border-brew-clay/40 shadow-sm' 
                      : 'bg-transparent border-earth-dark/5 hover:border-earth-dark/15 hover:bg-parchment/10'
                  }`}
                >
                  <div className={`w-10 h-10 flex items-center justify-center transition-colors ${
                    isPlaying === track.id ? 'bg-brew-clay text-mist-cream' : 'bg-surface-container-high text-earth-dark/80'
                  }`}>
                    {isPlaying === track.id ? <Pause className="w-4 h-4 animate-pulse" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </div>

                  <div className="flex-grow">
                    <p className={`font-sans text-xs font-semibold leading-tight ${
                      isPlaying === track.id ? 'text-brew-clay' : 'text-earth-dark'
                    }`}>
                      {track.title}
                    </p>
                    <p className="font-sans text-[8px] font-semibold text-on-surface-variant/60 tracking-wider uppercase mt-1">
                      {track.genre}
                    </p>
                  </div>

                  {isPlaying === track.id && (
                    <Volume2 className="w-4 h-4 text-brew-clay animate-bounce" />
                  )}
                </div>
              ))}
            </div>

            {isPlaying && (
              <div className="mt-6 flex items-center gap-2 justify-center font-sans text-[9px] text-brew-clay font-bold tracking-widest uppercase">
                <Music className="w-3.5 h-3.5 animate-spin" /> STREAMING FRAGMENT TO YOUR MIND
              </div>
            )}
          </div>

          {/* Sourcing & Concierge CTA (Launches the gorgeous new modal) */}
          <div className="lg:col-start-7 lg:col-span-6 flex flex-col justify-center">
            <span className="font-sans text-[10px] uppercase font-semibold text-brew-clay tracking-[0.25em] mb-4 block">
              03. RITUAL CONCIERGE
            </span>
            <h3 className="font-serif text-3xl md:text-5xl text-earth-dark font-medium leading-none mb-6">
              Experience the Slow Brew.
            </h3>
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed mb-8">
              To maintain the sensory integrity of our space and maximize your connection to the harvest, we invite you to register a "Presence Pre-order". 
            </p>
            <p className="font-sans text-xs md:text-sm text-on-surface-variant/80 leading-relaxed mb-10">
              Select your extraction method, indicate your exact moment of arrival, and our baristas will orchestrate the slow brew to be completed at the split-second of your entry, skipping standard commercial queues.
            </p>

            <button
              onClick={onOpenPreOrder}
              className="bg-brew-clay hover:bg-earth-dark text-mist-cream font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-10 py-5 transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl hover:translate-y-[-1px] active:scale-95 self-start border-none"
            >
              PRE-ORDER FOR PRESENCE <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* 4. Integrated Newsletter Subscription (From Reference 1) */}
      <div className="bg-primary text-parchment py-16 px-6 md:px-12 border-t border-earth-dark/5">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-sans text-xs uppercase font-bold tracking-[0.25em] text-parchment block mb-4">
            THE CHRONICLES OF PROVENANCE
          </span>
          <h3 className="font-serif text-2xl md:text-4xl text-mist-cream font-medium mb-6">
            Receive the physical & digital journal.
          </h3>
          <p className="font-sans text-sm text-mist-cream/90 leading-relaxed mb-10 max-w-lg mx-auto">
            Subscribe to our bi-monthly circular detailing our single-origin farm partners in Karnataka, Giesen roasting curves, and early reservation links to rare, high-SCA micro-lots.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 items-end max-w-md mx-auto">
            <div className="flex-grow w-full text-left">
              <label className="font-sans text-[10px] uppercase tracking-widest font-bold text-mist-cream block mb-2">
                Electronic Mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR@EMAIL.COM"
                className="w-full bg-transparent border-0 border-b border-parchment/60 focus:border-parchment focus:ring-0 text-mist-cream placeholder:text-parchment/40 font-mono text-sm pb-3 uppercase tracking-wider outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-brew-clay hover:bg-mist-cream hover:text-earth-dark text-mist-cream border-none font-sans font-bold text-[11px] tracking-[0.15em] px-8 py-3.5 uppercase transition-colors cursor-pointer whitespace-nowrap active:scale-95"
            >
              {subscribed ? 'REGISTERED' : 'SUBSCRIBE'}
            </button>
          </form>
          {subscribed && (
            <p className="text-xs uppercase tracking-widest text-parchment font-bold mt-4 animate-pulse">
              SUCCESS / GUEST SPOT RECOGNIZED
            </p>
          )}
        </div>
      </div>

    </section>
  );
}
