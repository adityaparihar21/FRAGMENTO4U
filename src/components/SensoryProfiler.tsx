import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sliders, Music, Coffee, Timer, Bookmark, RotateCcw, Check, Compass, Flame, Leaf, Eye, ShoppingBag } from 'lucide-react';
import { MenuItem } from '../types';

interface SensoryResult {
  name: string;
  description: string;
  elevation: string;
  roastProfile: string;
  primaryNotes: string[];
  brewingSpecs: {
    waterTemp: string;
    ratio: string;
    grindProfile: string;
    bloomTime: string;
    pourSteps: string[];
  };
  vibeMatch: string;
}

interface SensoryProfilerProps {
  onAddToCart?: (item: MenuItem, quantity: number, customizations?: any) => void;
  onOpenCart?: () => void;
}

export default function SensoryProfiler({ onAddToCart, onOpenCart }: SensoryProfilerProps) {
  // Input states
  const [bodyDensity, setBodyDensity] = useState(50);
  const [acidityLevel, setAcidityLevel] = useState(50);
  const [roastIntensity, setRoastIntensity] = useState(40);
  const [floralClar, setFloralClar] = useState(60);
  const [sweetnessScale, sweetnessSet] = useState(70);
  const [musicVibe, setMusicVibe] = useState('Dream Pop & Shoegaze');

  // Logic states
  const [isDistilling, setIsDistilling] = useState(false);
  const [calibrationStep, setCalibrationStep] = useState(0);
  const [result, setResult] = useState<SensoryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<SensoryResult[]>([]);
  const [recipeSaved, setRecipeSaved] = useState(false);

  // Brewing timer states
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const timerIntervalRef = useRef<any>(null);

  // Calibration messages list for latency masking
  const calibrationMessages = [
    "Analyzing tactile density and elevation curves...",
    "Pre-heating virtual Giesen small-batch thermal drum...",
    "Extracting volatile terroir aromatics and flower compounds...",
    "Synthesizing pour choreography & acoustic alignment...",
    "Perfecting sensory bloom values..."
  ];

  // Load saved bespoke recipes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('fragmento_bespoke_recipes');
    if (saved) {
      try {
        setSavedRecipes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load bespoke recipes", e);
      }
    }
  }, []);

  // Cycle calibration messages during distillation to keep user engaged
  useEffect(() => {
    let interval: any = null;
    if (isDistilling) {
      setCalibrationStep(0);
      interval = setInterval(() => {
        setCalibrationStep((prev) => (prev + 1) % calibrationMessages.length);
      }, 1800);
    } else {
      setCalibrationStep(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDistilling]);

  // Brew timer logic
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          const next = prev + 1;
          // Step indices based on elapsed time (e.g., Bloom first 45s, then main pours)
          if (next <= 45) {
            setCurrentStepIndex(0); // Bloom
          } else if (next <= 120) {
            setCurrentStepIndex(1); // Pour step 1
          } else if (next <= 180) {
            setCurrentStepIndex(2); // Pour step 2
          } else {
            setCurrentStepIndex(3); // Pour step 3 / completed
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning]);

  const startBrewingTimer = () => {
    setTimerSeconds(0);
    setCurrentStepIndex(0);
    setIsTimerRunning(true);
  };

  const stopBrewingTimer = () => {
    setIsTimerRunning(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  const resetBrewingTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
    setCurrentStepIndex(-1);
  };

  const formatTimerTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleDistill = async () => {
    setIsDistilling(true);
    setResult(null);
    setError(null);
    setRecipeSaved(false);
    resetBrewingTimer();

    try {
      const response = await fetch('/api/sensory-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bodyDensity,
          acidityLevel,
          roastIntensity,
          floralClar,
          sweetnessScale,
          musicVibe
        })
      });

      if (!response.ok) {
        throw new Error("Distillation failed. The specialty beans got slightly overheated.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Sensory distillation failed.");
    } finally {
      setIsDistilling(false);
    }
  };

  const saveRecipe = () => {
    if (!result) return;
    const exists = savedRecipes.some(r => r.name === result.name);
    if (exists) return;

    const updated = [result, ...savedRecipes].slice(0, 5); // Keep up to 5 recipes
    setSavedRecipes(updated);
    localStorage.setItem('fragmento_bespoke_recipes', JSON.stringify(updated));
    setRecipeSaved(true);
  };

  const deleteSavedRecipe = (index: number) => {
    const updated = savedRecipes.filter((_, idx) => idx !== index);
    setSavedRecipes(updated);
    localStorage.setItem('fragmento_bespoke_recipes', JSON.stringify(updated));
  };

  const loadSavedRecipe = (recipe: SensoryResult) => {
    setResult(recipe);
    setRecipeSaved(true);
    resetBrewingTimer();
  };

  const handleAddToCartBespoke = () => {
    if (!result || !onAddToCart) return;
    
    const bespokeItem: MenuItem = {
      id: `bespoke-lot-${result.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: `Bespoke: ${result.name}`,
      description: `Bespoke specialty coffee lot crafted by AI Sensory Sommelier. Provenance: ${result.elevation}. Tasting notes: ${result.primaryNotes.join(', ')}.`,
      price: 680,
      category: 'pour',
      tags: ['Bespoke', 'Sensory Lot'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxVSRAworDTG7hz4MEyFzhaimEn0ZqvRI3GeavcyF5dASxMqriAuQs6-ibGRZoP6mdG0yjo6bP5Kf6po8yFLJA4sk2Cci9S4U5FDQBn8BoTboKTnX-iQ1rDG8vL-6BbJ396PWY30utPKyoVvsNWojMYZqghulxh5ot2IqlevyBrB_bRrLVbDHrP_beTJ9yLoWUOeCmGfFwS6qcJakDU-0O7eMst3mZ7-ikQsCHaJcVQDLNyEejz1FT7TL8UDxv4PsPLPJYrLLvuaY',
      elevation: result.elevation,
      origin: result.elevation,
      tastingNotes: result.primaryNotes,
      customizable: false
    };

    const customizations = {
      notes: `Roast: ${result.roastProfile}. Ratio: ${result.brewingSpecs.ratio}. Temp: ${result.brewingSpecs.waterTemp}. Grind: ${result.brewingSpecs.grindProfile}. Sonic: ${musicVibe}`,
      grind: result.brewingSpecs.grindProfile as any,
      milk: 'None' as any
    };

    onAddToCart(bespokeItem, 1, customizations);
    if (onOpenCart) {
      onOpenCart();
    }
  };

  return (
    <section id="sensory-profiler-section" className="py-20 md:py-28 bg-mist-cream border-t border-earth-dark/10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-[10px] uppercase font-bold tracking-[0.25em] text-brew-clay block mb-3">
            08 / SENSORY ARCHITECTURE
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-earth-dark tracking-tight mb-4">
            Atelier Sensory Profiler
          </h2>
          <p className="font-serif text-sm italic text-earth-dark/70 leading-relaxed">
            Calibrate the physical and atmospheric parameters of your cup. Our AI Sensory Sommelier will distill a custom Indian micro-lot profile, roast level, and extraction timeline matching your exact space of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sliders Control Panel */}
          <div className="lg:col-span-5 bg-parchment/15 border border-earth-dark/10 p-6 md:p-8 space-y-8 relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-brew-clay" />
            
            <div className="flex justify-between items-center pb-4 border-b border-earth-dark/10">
              <span className="font-sans text-[10px] uppercase font-semibold text-earth-dark tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-brew-clay" /> CALIBRATE ATTRIBUTES
              </span>
              <button 
                onClick={() => {
                  setBodyDensity(50);
                  setAcidityLevel(50);
                  setRoastIntensity(40);
                  setFloralClar(60);
                  sweetnessSet(70);
                  setMusicVibe('Dream Pop & Shoegaze');
                }}
                className="text-earth-dark/40 hover:text-brew-clay transition-colors flex items-center gap-1.5 text-[11px] font-sans font-bold uppercase tracking-[0.15em] border-none bg-transparent cursor-pointer"
                title="Reset sliders"
              >
                <RotateCcw className="w-3.5 h-3.5" /> RESET
              </button>
            </div>

            {/* Slider 1: Body */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] font-sans font-semibold tracking-[0.15em] text-earth-dark uppercase">
                <span className="flex items-center gap-1"><Coffee className="w-3.5 h-3.5 text-brew-clay" /> Tactile Weight (Body)</span>
                <span className="font-mono text-brew-clay">{bodyDensity}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={bodyDensity} 
                onChange={(e) => setBodyDensity(Number(e.target.value))}
                className="w-full accent-brew-clay h-1 bg-earth-dark/10 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-sans text-earth-dark/50 tracking-[0.12em] uppercase font-medium">
                <span>Silky / Tea-like</span>
                <span>Dense / Velvet</span>
              </div>
            </div>

            {/* Slider 2: Acidity */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] font-sans font-semibold tracking-[0.15em] text-earth-dark uppercase">
                <span className="flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-brew-clay" /> Brightness (Acidity)</span>
                <span className="font-mono text-brew-clay">{acidityLevel}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={acidityLevel} 
                onChange={(e) => setAcidityLevel(Number(e.target.value))}
                className="w-full accent-brew-clay h-1 bg-earth-dark/10 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-sans text-earth-dark/50 tracking-[0.12em] uppercase font-medium">
                <span>Soft / Rounded</span>
                <span>Sparkling / Citric</span>
              </div>
            </div>

            {/* Slider 3: Roast Intensity */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] font-sans font-semibold tracking-[0.15em] text-earth-dark uppercase">
                <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-brew-clay" /> Roast Intensity</span>
                <span className="font-mono text-brew-clay">{roastIntensity}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={roastIntensity} 
                onChange={(e) => setRoastIntensity(Number(e.target.value))}
                className="w-full accent-brew-clay h-1 bg-earth-dark/10 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-sans text-earth-dark/50 tracking-[0.12em] uppercase font-medium">
                <span>Nordic Light</span>
                <span>Dark Chocolate</span>
              </div>
            </div>

            {/* Slider 4: Floral Clarity */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] font-sans font-semibold tracking-[0.15em] text-earth-dark uppercase">
                <span className="flex items-center gap-1"><Leaf className="w-3.5 h-3.5 text-brew-clay" /> Floral Clarities</span>
                <span className="font-mono text-brew-clay">{floralClar}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={floralClar} 
                onChange={(e) => setFloralClar(Number(e.target.value))}
                className="w-full accent-brew-clay h-1 bg-earth-dark/10 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-sans text-earth-dark/50 tracking-[0.12em] uppercase font-medium">
                <span>Earthy / Wooded</span>
                <span>Jasmine / Jasmine Bloom</span>
              </div>
            </div>

            {/* Slider 5: Sweetness */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] font-sans font-semibold tracking-[0.15em] text-earth-dark uppercase">
                <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-brew-clay" /> Sweetness Scale</span>
                <span className="font-mono text-brew-clay">{sweetnessScale}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={sweetnessScale} 
                onChange={(e) => sweetnessSet(Number(e.target.value))}
                className="w-full accent-brew-clay h-1 bg-earth-dark/10 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-sans text-earth-dark/50 tracking-[0.12em] uppercase font-medium">
                <span>Raw / Crisp</span>
                <span>Honey / Toffee caramel</span>
              </div>
            </div>

            {/* Music Vibe dropdown picker */}
            <div className="space-y-3 pt-2">
              <label className="font-sans text-[10px] uppercase font-bold tracking-wider text-earth-dark block">
                <Music className="w-3.5 h-3.5 text-brew-clay inline mr-1.5" /> Ambient Sonic Resonance
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Dream Pop & Shoegaze',
                  'Ambient & Slow R&B',
                  'Neo-Soul & Acoustic',
                  'Minimalist Lo-Fi & Rain'
                ].map((vibe) => (
                  <button
                    key={vibe}
                    type="button"
                    onClick={() => setMusicVibe(vibe)}
                    className={`p-2.5 text-left border text-[10px] font-sans font-semibold uppercase tracking-wider transition-all duration-300 ${
                      musicVibe === vibe 
                        ? 'border-brew-clay bg-brew-clay/10 text-brew-clay' 
                        : 'border-earth-dark/15 hover:border-earth-dark/40 text-earth-dark/70'
                    }`}
                  >
                    {vibe}
                  </button>
                ))}
              </div>
            </div>

            {/* Distill Action Button */}
            <button
              onClick={handleDistill}
              disabled={isDistilling}
              className="w-full bg-brew-clay hover:bg-earth-dark text-mist-cream font-sans font-semibold text-[10px] tracking-[0.2em] py-4 uppercase transition-all duration-300 shadow-md active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border-none"
            >
              <Sparkles className="w-4 h-4" /> {isDistilling ? 'DISTILLING SENSORY ATOM...' : 'DISTILL BESPOKE PROFILE'}
            </button>

            {/* Saved Recipes Shelf */}
            {savedRecipes.length > 0 && (
              <div className="pt-6 border-t border-earth-dark/10">
                <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-earth-dark/40 block mb-3">
                  SAVED BESPOKE ARCHIVES
                </span>
                <div className="space-y-2">
                  {savedRecipes.map((recipe, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white/50 p-2.5 border border-earth-dark/5 shadow-sm text-xs">
                      <button 
                        onClick={() => loadSavedRecipe(recipe)}
                        className="font-serif italic font-medium hover:text-brew-clay text-left text-earth-dark border-none bg-transparent cursor-pointer truncate pr-2 flex-grow"
                      >
                        {recipe.name}
                      </button>
                      <button 
                        onClick={() => deleteSavedRecipe(idx)}
                        className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-red-500/70 hover:text-red-600 border-none bg-transparent cursor-pointer"
                      >
                        DELETE
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Screen & Antigravity Load State */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              
              {/* Load State - Advanced Motion Design for AI Latency */}
              {isDistilling && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="bg-[#211E1C] text-[#F9F6F0] p-8 md:p-16 border border-earth-dark/15 shadow-xl text-center flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden"
                >
                  {/* Slow moving ambient gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-brew-clay/10 via-transparent to-brew-clay/5 animate-pulse" />

                  {/* Organic Breathing Extraction Circle */}
                  <div className="relative mb-12 flex items-center justify-center">
                    {/* Ripple 1 */}
                    <motion.div
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.15, 0.05, 0.15],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute w-36 h-36 rounded-full border border-brew-clay/30"
                    />
                    {/* Ripple 2 */}
                    <motion.div
                      animate={{
                        scale: [1, 1.25, 1],
                        opacity: [0.2, 0.1, 0.2],
                      }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                      className="absolute w-28 h-28 rounded-full border border-brew-clay/40"
                    />
                    {/* Core Coffee Drop */}
                    <motion.div
                      animate={{
                        scale: [1, 1.12, 1],
                        boxShadow: ["0 0 10px rgba(181, 126, 88, 0.2)", "0 0 25px rgba(181, 126, 88, 0.5)", "0 0 10px rgba(181, 126, 88, 0.2)"]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-16 h-16 rounded-full bg-[#1A1816] border-2 border-brew-clay flex items-center justify-center z-10"
                    >
                      <Coffee className="w-6 h-6 text-brew-clay animate-bounce [animation-duration:2.5s]" />
                    </motion.div>
                  </div>

                  {/* Anticipation / Deliberate calibration progress message */}
                  <div className="max-w-md space-y-4">
                    <span className="font-mono text-[11px] tracking-[0.25em] text-[#E8D9C5] uppercase font-bold block animate-pulse">
                      EXTRACTING SENSORY VECTOR
                    </span>
                    
                    {/* Calibration phrase reveal with beautiful sliding easing */}
                    <div className="h-8 overflow-hidden relative">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={calibrationStep}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1] }}
                          className="font-serif italic text-base md:text-lg text-[#F9F6F0]/90 absolute inset-x-0"
                        >
                          "{calibrationMessages[calibrationStep]}"
                        </motion.p>
                      </AnimatePresence>
                    </div>

                    <div className="w-48 bg-[#F9F6F0]/10 h-[2px] mx-auto overflow-hidden relative">
                      <motion.div 
                        animate={{
                          left: ["-100%", "100%"]
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="bg-brew-clay absolute top-0 bottom-0 w-1/2"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Distillation Success Output */}
              {!isDistilling && result && (
                <motion.div
                  key="success-result"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#211E1C] text-[#F9F6F0] p-6 md:p-10 border border-[#F9F6F0]/10 shadow-xl space-y-8 relative overflow-hidden"
                >
                  {/* Subtle top branding border line */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-brew-clay" />

                  {/* Success Header details */}
                  <div className="flex justify-between items-start flex-wrap gap-4 pb-6 border-b border-[#F9F6F0]/10">
                    <div>
                      <span className="font-sans text-[11px] font-bold tracking-[0.25em] text-[#E8D9C5] uppercase block mb-1">
                        BESPOKE DISTILLATION LOT
                      </span>
                      <h3 className="font-serif text-3xl md:text-4xl text-[#F9F6F0] font-medium tracking-tight">
                        {result.name}
                      </h3>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={saveRecipe}
                        className={`px-4 py-2 border font-sans text-[11px] tracking-[0.15em] uppercase font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          recipeSaved 
                            ? 'border-brew-clay bg-brew-clay/20 text-[#E8D9C5]' 
                            : 'border-[#F9F6F0]/20 hover:border-[#F9F6F0]/40 text-[#F9F6F0]'
                        }`}
                      >
                        {recipeSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                        {recipeSaved ? 'ARCHIVED' : 'ARCHIVE'}
                      </button>
                      <button
                        onClick={handleAddToCartBespoke}
                        className="px-5 py-2 bg-brew-clay hover:bg-white hover:text-black border border-brew-clay font-sans text-[11px] tracking-[0.15em] text-[#F9F6F0] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        PRE-ORDER LOT (₹680)
                      </button>
                    </div>
                  </div>

                  {/* Lot Metadata Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-b border-[#F9F6F0]/10 font-mono text-[11px] tracking-[0.12em] text-[#E8D9C5] uppercase">
                    <div>
                      <span className="block opacity-40 mb-1">PROVENANCE</span>
                      <span className="block font-sans font-semibold text-[#F9F6F0] text-xs truncate" title={result.elevation}>
                        {result.elevation}
                      </span>
                    </div>
                    <div>
                      <span className="block opacity-40 mb-1">ROAST SPEC</span>
                      <span className="block font-sans font-semibold text-[#F9F6F0] text-xs truncate" title={result.roastProfile}>
                        {result.roastProfile}
                      </span>
                    </div>
                    <div>
                      <span className="block opacity-40 mb-1">SONIC SYNC</span>
                      <span className="block font-sans font-semibold text-[#F9F6F0] text-xs truncate" title={musicVibe}>
                        {musicVibe}
                      </span>
                    </div>
                    <div>
                      <span className="block opacity-40 mb-1">VOLATILITY</span>
                      <span className="block font-sans font-semibold text-[#F9F6F0] text-xs">
                        {Math.floor(acidityLevel * 0.7 + floralClar * 0.3)}% SCORE
                      </span>
                    </div>
                  </div>

                  {/* Flavor Descriptor Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {result.primaryNotes.map((note, idx) => (
                      <span 
                        key={idx} 
                        className="bg-brew-clay/15 border border-brew-clay/30 text-[#E8D9C5] px-3 py-1 font-sans text-[10px] tracking-widest font-bold uppercase rounded-none"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Main sensory narrative with smooth progressive text presentation */}
                  <div className="space-y-4">
                    <span className="font-mono text-[11px] tracking-[0.15em] opacity-40 uppercase block">
                      SENSORY PROFILE NARRATIVE
                    </span>
                    <p className="font-serif italic text-base md:text-lg text-[#F9F6F0]/90 leading-relaxed text-justify border-l-2 border-brew-clay/40 pl-4 py-1">
                      {result.description}
                    </p>
                  </div>

                  {/* Scientific Brewing Parameters & Interactive Timer */}
                  <div className="bg-black/35 p-5 md:p-6 border border-[#F9F6F0]/5 space-y-6">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                      <div>
                        <span className="font-sans text-[10px] font-bold tracking-wider text-[#E8D9C5] uppercase block mb-1">
                          TECHNICAL EXTRACTION
                        </span>
                        <h4 className="font-serif text-lg text-[#F9F6F0] font-medium">
                          Choreography Specs
                        </h4>
                      </div>
                      
                      {/* Interactive Brewing Assistant Timer */}
                      <div className="flex items-center gap-3 bg-black/40 px-4 py-2 border border-[#F9F6F0]/10">
                        <Timer className="w-4 h-4 text-brew-clay shrink-0" />
                        <span className="font-mono text-sm font-semibold tracking-widest text-[#F9F6F0] min-w-[45px]">
                          {formatTimerTime(timerSeconds)}
                        </span>
                        {!isTimerRunning ? (
                          <button
                            onClick={startBrewingTimer}
                            className="bg-brew-clay hover:bg-white hover:text-black text-mist-cream px-2.5 py-1 text-[8px] font-sans font-bold tracking-widest uppercase cursor-pointer border-none"
                          >
                            START POUR
                          </button>
                        ) : (
                          <button
                            onClick={stopBrewingTimer}
                            className="bg-red-500/70 hover:bg-red-600 text-white px-2.5 py-1 text-[8px] font-sans font-bold tracking-widest uppercase cursor-pointer border-none"
                          >
                            PAUSE
                          </button>
                        )}
                        {timerSeconds > 0 && (
                          <button
                            onClick={resetBrewingTimer}
                            className="text-[#F9F6F0]/40 hover:text-[#F9F6F0] p-1 cursor-pointer border-none bg-transparent"
                            title="Reset timer"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[10px] tracking-wider text-[#E8D9C5] uppercase">
                      <div className="bg-[#1A1816] p-3 border border-[#F9F6F0]/5">
                        <span className="opacity-40 block mb-1">WATER TEMP</span>
                        <span className="text-[#F9F6F0] font-sans font-bold text-xs">{result.brewingSpecs.waterTemp}</span>
                      </div>
                      <div className="bg-[#1A1816] p-3 border border-[#F9F6F0]/5">
                        <span className="opacity-40 block mb-1">EXTRACTION RATIO</span>
                        <span className="text-[#F9F6F0] font-sans font-bold text-xs">{result.brewingSpecs.ratio}</span>
                      </div>
                      <div className="bg-[#1A1816] p-3 border border-[#F9F6F0]/5">
                        <span className="opacity-40 block mb-1">GRIND COARSE</span>
                        <span className="text-[#F9F6F0] font-sans font-bold text-xs">{result.brewingSpecs.grindProfile}</span>
                      </div>
                    </div>

                    {/* Sequential Pour steps showing active state based on active timer */}
                    <div className="space-y-3 pt-2">
                      <span className="font-mono text-[9px] tracking-wider opacity-40 uppercase block mb-1">
                        POUR SEPARATION CHOREOGRAPHY
                      </span>
                      
                      {/* Step 0: Bloom */}
                      <div className={`p-3 border transition-colors duration-300 ${
                        currentStepIndex === 0 
                          ? 'border-brew-clay bg-brew-clay/10 text-[#F9F6F0]' 
                          : 'border-[#F9F6F0]/5 text-[#F9F6F0]/70'
                      }`}>
                        <div className="flex justify-between items-center text-[10px] font-sans font-bold tracking-wider uppercase mb-1">
                          <span>BLOOMING PHASE (0:00 - 0:45)</span>
                          {currentStepIndex === 0 && <span className="text-brew-clay animate-pulse">ACTIVE BLOOM</span>}
                        </div>
                        <p className="font-sans text-xs leading-relaxed opacity-90">{result.brewingSpecs.bloomTime}</p>
                      </div>

                      {/* Timeline pours */}
                      {result.brewingSpecs.pourSteps.map((step, idx) => {
                        const stepIndex = idx + 1;
                        const isActive = currentStepIndex === stepIndex;
                        const isCompleted = currentStepIndex > stepIndex;
                        const durationRangeStr = stepIndex === 1 ? "(0:45 - 2:00)" : stepIndex === 2 ? "(2:00 - 3:00)" : "(3:00 - 3:45)";

                        return (
                          <div 
                            key={idx} 
                            className={`p-3 border transition-colors duration-300 ${
                              isActive 
                                ? 'border-brew-clay bg-brew-clay/10 text-[#F9F6F0]' 
                                : isCompleted
                                  ? 'border-green-500/25 bg-green-500/5 text-[#F9F6F0]/50'
                                  : 'border-[#F9F6F0]/5 text-[#F9F6F0]/70'
                            }`}
                          >
                            <div className="flex justify-between items-center text-[10px] font-sans font-bold tracking-wider uppercase mb-1">
                              <span>PHASE 0{stepIndex} {durationRangeStr}</span>
                              {isActive && <span className="text-brew-clay animate-pulse">ACTIVE POUR</span>}
                              {isCompleted && <span className="text-green-500 text-[8px]">COMPLETED</span>}
                            </div>
                            <p className="font-sans text-xs leading-relaxed opacity-90">{step}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sonic resonance breakdown */}
                  <div className="space-y-3 pt-2">
                    <span className="font-mono text-[9px] tracking-wider opacity-40 uppercase block">
                      SONIC ACOUSTIC RESONANCE
                    </span>
                    <p className="font-sans text-xs md:text-sm text-[#F9F6F0]/80 leading-relaxed text-justify bg-black/20 p-4 border border-[#F9F6F0]/5 italic">
                      {result.vibeMatch}
                    </p>
                  </div>

                </motion.div>
              )}

              {/* Initial Blank State (Before distill) */}
              {!isDistilling && !result && (
                <motion.div
                  key="blank"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-parchment/10 border border-earth-dark/15 p-8 md:p-16 shadow-sm flex flex-col items-center justify-center text-center min-h-[500px]"
                >
                  <div className="w-16 h-16 rounded-full bg-brew-clay/5 border border-brew-clay/20 flex items-center justify-center mb-6">
                    <Sliders className="w-6 h-6 text-brew-clay" />
                  </div>
                  <h3 className="font-serif text-2xl text-earth-dark font-medium mb-3">
                    Awaiting Calibration
                  </h3>
                  <p className="font-sans text-sm text-earth-dark/60 max-w-sm leading-relaxed mb-6">
                    Calibrate your sensory tactile parameters on the left and hit distill to awaken your bespoke custom coffee lot.
                  </p>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-earth-dark/40 uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-brew-clay" /> GEMINI SPECIALTY AGENT READY
                  </div>
                </motion.div>
              )}

              {/* Error State */}
              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-500/5 border border-red-500/15 p-8 text-center"
                >
                  <p className="text-red-500 text-sm font-sans mb-4">{error}</p>
                  <button
                    onClick={handleDistill}
                    className="bg-brew-clay text-[#F9F6F0] px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider border-none cursor-pointer"
                  >
                    RETRY DISTILLATION
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
