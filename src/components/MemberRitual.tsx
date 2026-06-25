/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Award, 
  CheckCircle, 
  ArrowUpRight, 
  ChevronRight, 
  Compass, 
  Leaf, 
  History, 
  Gift, 
  User, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { UserProfile } from '../types';

interface MemberRitualProps {
  userProfile: UserProfile | null;
  onOpenLogin: () => void;
  onOpenPreOrder: () => void;
}

export default function MemberRitual({ userProfile, onOpenLogin, onOpenPreOrder }: MemberRitualProps) {
  const [points, setPoints] = useState(1240);
  const [redeemedReward, setRedeemedReward] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Rewards catalog from reference files
  const rewards = [
    {
      id: 'reward-1',
      title: 'The Single Origin Pour',
      subtitle: 'Ethiopian Yirgacheffe • Washed',
      points: 400,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6f4NbV32CnXHM0DSF3tSURo086d9OSe-NTZf5EDGIrsvFt-njtPz9aKDI5z2hLgatf_zZoueY-5Fqro-PVbzz-YoMkvmIc-KCLxyrAEFSxyr5FnzRKRl2ge5Ax-9i0SwWuFWsf1_2IRPeG4eHjEqDXMX3hzCeDmRYGfkrR4z_jeTUumcL92ZcuMdifsPjEBb66piW8e-Yt2lRpSEa6nnKj8UqPEgCi3SS8OQfrLLQoxMJnqMtcu_yEH3hgh4V2i3dN95AZ-KrfpI'
    },
    {
      id: 'reward-2',
      title: 'Hand-Laminated Croissant',
      subtitle: 'Seasonal Butter • 72-Hour Ferment',
      points: 350,
      image: 'https://lh3.googleusercontent.com/aida/AP1WRLuZMkwZQlKuCm8bNw2sqirkeZc3PlKj89V9bdGDEdHAuNV2bLOnN9bg0B-M60lzptT1P-hHxMJlRzHlg32TfWAhltqYow8hegLbYAKlU_efTSqpgCl1nEC-zqHoSdDZPisDD4nHxIDtLCfU16BRSef1DMdpMx39iDE3eN7xQxvV4GC2towrJ745s0FEyFmR0Xzs5enX8TrhceRg3Ud8QCFM_syYc0znrccOxOEZtBJGzQuMc4F9ZX4Z2Q'
    },
    {
      id: 'reward-3',
      title: 'V60 Brewing Kit',
      subtitle: 'Copper Dripper & Textured Carafe',
      points: 1200,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxVSRAworDTG7hz4MEyFzhaimEn0ZqvRI3GeavcyF5dASxMqriAuQs6-ibGRZoP6mdG0yjo6bP5Kf6po8yFLJA4sk2Cci9S4U5FDQBn8BoTboKTnX-iQ1rDG8vL-6BbJ396PWY30utPKyoVvsNWojMYZqghulxh5ot2IqlevyBrB_bRrLVbDHrP_beTJ9yLoWUOeCmGfFwS6qcJakDU-0O7eMst3mZ7-ikQsCHaJcVQDLNyEejz1FT7TL8UDxv4PsPLPJYrLLvuaY'
    }
  ];

  const recentRituals = [
    {
      id: 'ritual-1',
      idx: '01',
      title: 'Coorg Estate Pour',
      date: 'OCTOBER 12, 2024',
      points: '+45 pts',
      isPositive: true
    },
    {
      id: 'ritual-2',
      idx: '02',
      title: 'Redemption: Hand-Laminated Croissant',
      date: 'OCTOBER 08, 2024',
      points: '-350 pts',
      isPositive: false
    },
    {
      id: 'ritual-3',
      idx: '03',
      title: 'Atelier Batch Ritual',
      date: 'OCTOBER 01, 2024',
      points: '+30 pts',
      isPositive: true
    }
  ];

  const handleRedeem = (rewardId: string, cost: number) => {
    if (!userProfile?.isLoggedIn) {
      onOpenLogin();
      return;
    }

    if (points < cost) {
      setErrorMsg('Insufficient accumulated essence to redeem this reward.');
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }

    setPoints((prev) => prev - cost);
    setRedeemedReward(rewardId);
    setTimeout(() => {
      setRedeemedReward(null);
    }, 4000);
  };

  const currentUserName = userProfile?.isLoggedIn ? userProfile.name : 'Guest Contemplator';
  const displayPoints = userProfile?.isLoggedIn ? points : 1240;

  if (!userProfile?.isLoggedIn) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-[70vh] flex items-center justify-center pt-28 pb-36 px-6"
      >
        <div className="bg-parchment/10 border border-earth-dark/15 p-10 md:p-16 shadow-lg max-w-xl w-full relative overflow-hidden text-earth-dark text-center">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-brew-clay" />
          <div className="flex justify-center mb-6">
            <div className="relative p-5 bg-parchment/10 border border-earth-dark/10 rounded-none text-brew-clay">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
          </div>

          <span className="font-sans text-[10px] uppercase font-bold tracking-[0.25em] text-brew-clay mb-3 block">
            THE ATELIER REGISTRY
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-4 text-earth-dark">
            Exclusive Member Ritual
          </h1>
          <p className="font-sans text-sm text-earth-dark/70 leading-relaxed mb-8 max-w-md mx-auto">
            The Fragmento Member room is reserved for our community of specialty coffee appreciators. Create a guest pass or log in with any phone number & OTP to view accumulated essence, track rewards, and explore private blends.
          </p>

          <button
            onClick={onOpenLogin}
            className="w-full bg-brew-clay text-mist-cream font-sans text-xs font-bold tracking-widest uppercase px-8 py-4 hover:bg-earth-dark transition-colors duration-300 flex items-center justify-center gap-2 border-none cursor-pointer"
          >
            LOG IN / REGISTER <ArrowRight className="w-4 h-4" />
          </button>

          {/* Background subtle marks */}
          <div className="absolute -bottom-10 -right-10 text-[120px] text-earth-dark/[0.02] select-none pointer-events-none">
            <Coffee className="w-32 h-32 stroke-[0.3]" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-background text-on-surface min-h-screen pt-28 pb-36 px-6 md:px-12 max-w-6xl mx-auto"
    >
      {/* 1. Hero Section: Profile Card */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end border-b border-earth-dark/10 pb-12 mb-16">
        <div className="lg:col-span-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 bg-parchment overflow-hidden border border-earth-dark/10 relative shadow-inner">
            <img 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              alt="Sophisticated portrait of coffee lover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Qk2BLqjVCmkhtHLISbbvNUR99mGgFUwlsx0oIKCWhfd_hs1ew3hZ65b8QZ_gt8A8SJdwmaHcL27X5qENeOlmxmsBQNw3rNDMNNWcrWvll96IUtTie51prmV_AF7phO_F0WPYMJ7V7zF3EZ43WydH1MtsVxpl8eSjuCSiCnbdSuD2Z4GWd209sP5iAkdtZq4fSpKXiK9UqMKkF0AF08fQQBT6x9khdXpVdzKNoQI0d-S_CQXg2ColTFqwWJRYDwK65iraBl508m0"
            />
          </div>
          <div>
            <span className="font-sans text-[10px] uppercase font-bold tracking-[0.25em] text-brew-clay mb-2 block">
              FRAGMENT RITUAL TIER
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-earth-dark font-medium tracking-tight">
              {userProfile?.isLoggedIn ? userProfile.name : 'Member 0821'}
            </h1>
            <p className="font-sans text-xs text-on-surface-variant mt-2 max-w-md">
              Your presence contributes to the collective story of craft and precision at Fragmento.
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
          <span className="font-sans text-[9px] uppercase tracking-widest font-bold text-on-surface-variant/70 mb-1">
            ACCUMULATED ESSENCE
          </span>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-serif text-4xl md:text-5xl font-medium text-earth-dark">
              {displayPoints.toLocaleString()}
            </span>
            <span className="font-sans text-[10px] tracking-widest text-on-surface-variant font-bold uppercase">
              PTS
            </span>
          </div>
          <p className="font-serif text-sm italic text-on-surface-variant mb-6">
            Equivalent to {Math.floor(displayPoints / 300)} Ritual Pours
          </p>

          <div className="flex gap-4 w-full md:w-auto">
            <button 
              onClick={() => {
                if (!userProfile?.isLoggedIn) {
                  onOpenLogin();
                } else {
                  // Scroll to rewards section
                  document.getElementById('rewards-catalog')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex-1 md:flex-none bg-brew-clay text-mist-cream font-sans text-[10px] font-bold tracking-widest uppercase px-6 py-4 transition-colors hover:bg-earth-dark border-none cursor-pointer"
            >
              REDEEM POINTS
            </button>
            <button 
              onClick={onOpenPreOrder}
              className="flex-1 md:flex-none border border-earth-dark text-earth-dark font-sans text-[10px] font-bold tracking-widest uppercase px-6 py-4 hover:bg-earth-dark hover:text-mist-cream transition-colors bg-transparent cursor-pointer"
            >
              EARN MORE
            </button>
          </div>
        </div>
      </section>

      {/* Error / Success Toast Area */}
      <AnimatePresence>
        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8 p-4 bg-red-50 text-red-700 font-sans text-xs flex items-center gap-2 border-l-2 border-red-500"
          >
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Rewards Catalog: Horizontal Gallery */}
      <section id="rewards-catalog" className="mb-24">
        <div className="flex justify-between items-baseline mb-8">
          <h2 className="font-serif text-2.5xl md:text-3.5xl text-earth-dark font-medium">
            Ritual Rewards
          </h2>
          <span className="font-sans text-[10px] tracking-wider text-on-surface-variant/70 uppercase">
            CURATED SELECTION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rewards.map((reward) => (
            <div 
              key={reward.id} 
              className="flex flex-col gap-4 group relative"
            >
              <div className="aspect-[4/5] bg-mist-cream overflow-hidden border border-earth-dark/5 relative">
                <img 
                  className="w-full h-full object-cover grayscale-[15%] group-hover:scale-102 transition-transform duration-700"
                  alt={reward.title}
                  src={reward.image}
                />
                <div className="absolute top-4 left-4 bg-earth-dark text-mist-cream px-3 py-1 font-sans text-[9px] font-bold tracking-widest uppercase">
                  {reward.points} PTS
                </div>

                <AnimatePresence>
                  {redeemedReward === reward.id && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-earth-dark/95 flex flex-col justify-center items-center p-6 text-center text-mist-cream"
                    >
                      <CheckCircle className="w-12 h-12 text-brew-clay mb-3 animate-bounce" />
                      <h4 className="font-serif text-xl mb-1">Redeemed Successfully</h4>
                      <p className="font-sans text-[10px] tracking-wider text-parchment/85 uppercase">
                        Present code to barista: FRAG-{Math.floor(Math.random() * 9000 + 1000)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <span className="font-sans text-[9px] font-bold text-brew-clay tracking-widest uppercase block mb-1">
                    {reward.subtitle}
                  </span>
                  <h3 className="font-serif text-xl text-earth-dark font-medium">
                    {reward.title}
                  </h3>
                </div>
                <button 
                  onClick={() => handleRedeem(reward.id, reward.points)}
                  disabled={redeemedReward !== null}
                  className="border border-earth-dark/20 hover:border-brew-clay hover:text-brew-clay p-2.5 transition-colors cursor-pointer bg-transparent rounded-none"
                  aria-label="Redeem reward"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Activity History & Secondary Bento info box */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Recent Rituals List */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-serif text-2xl text-earth-dark/30 font-medium">01</span>
            <h2 className="font-serif text-2.5xl md:text-3xl text-earth-dark font-medium">
              Recent Rituals
            </h2>
          </div>

          <div className="flex flex-col border-t border-earth-dark/10">
            {recentRituals.map((ritual) => (
              <div 
                key={ritual.id} 
                className="flex justify-between items-center py-6 border-b border-earth-dark/10 group cursor-default"
              >
                <div className="flex gap-8 items-center">
                  <span className="font-mono text-xs text-on-surface-variant/40">
                    {ritual.idx}
                  </span>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-earth-dark">
                      {ritual.title}
                    </h4>
                    <p className="font-sans text-[9px] text-on-surface-variant/60 tracking-wider uppercase">
                      {ritual.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 font-mono text-sm font-bold">
                  <span className={ritual.isPositive ? 'text-brew-clay' : 'text-earth-dark/50'}>
                    {ritual.points}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats/Context Bento Card */}
        <div className="lg:col-span-5">
          <div className="bg-parchment/25 border border-earth-dark/10 p-8 md:p-10 flex flex-col justify-between h-full relative overflow-hidden">
            <div className="relative z-10">
              <span className="font-sans text-[9px] font-bold text-brew-clay tracking-widest uppercase block mb-4">
                MEMBER SINCE
              </span>
              <h4 className="font-serif text-2.5xl text-earth-dark font-medium mb-6">
                Fragmento Season 01
              </h4>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed opacity-95">
                You are among the first 1,000 members to join our collective. Your loyalty contributes directly to our direct-trade partnerships with independent estates.
              </p>
            </div>

            <div className="mt-12 relative z-10">
              <div className="flex justify-between font-sans text-[9px] text-on-surface-variant/80 tracking-widest uppercase font-semibold mb-2.5">
                <span>TIER 02 PROGRESS</span>
                <span>620 / 1,000 PTS</span>
              </div>
              
              <div className="w-full bg-earth-dark/10 h-[2px]">
                <div className="bg-brew-clay h-full transition-all duration-1000" style={{ width: '62%' }} />
              </div>
            </div>

            {/* Subtle brand icon mark in background */}
            <div className="absolute -bottom-12 -right-12 text-[180px] text-earth-dark/[0.03] select-none pointer-events-none">
              <Coffee className="w-48 h-48 stroke-[0.3]" />
            </div>
          </div>
        </div>

      </section>

    </motion.div>
  );
}
