/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, ArrowRight, Shield, CheckCircle, Info, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [view, setView] = useState<'phone' | 'otp' | 'email' | 'register'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(45);
  const [isResending, setIsResending] = useState(false);

  // OTP focus handler refs
  const otpRefs = [
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (view === 'otp' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [view, countdown]);

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setError('');
    setView('otp');
    setCountdown(45);
    // Autofocus first input
    setTimeout(() => {
      otpRefs[0].current?.focus();
    }, 100);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 4) {
      setError('Please enter the full 4-digit verification code.');
      return;
    }

    // Success login mock
    const mockUser: UserProfile = {
      name: name || 'Guest Contemplator',
      phone: phone,
      email: email || undefined,
      isLoggedIn: true,
    };

    onLoginSuccess(mockUser);
    onClose();
    resetState();
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) {
      setError('Please fill in both name and email.');
      return;
    }

    const mockUser: UserProfile = {
      name: name,
      phone: phone || '9999999999',
      email: email,
      isLoggedIn: true,
    };

    onLoginSuccess(mockUser);
    onClose();
    resetState();
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setCountdown(45);
      setOtp(['', '', '', '']);
      otpRefs[0].current?.focus();
    }, 1000);
  };

  const resetState = () => {
    setView('phone');
    setPhone('');
    setOtp(['', '', '', '']);
    setEmail('');
    setName('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-earth-dark/45 backdrop-blur-sm"
        />

        {/* Dynamic Panel (Two-pane split screen style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative w-full max-w-4xl bg-mist-cream shadow-2xl z-10 grid grid-cols-1 lg:grid-cols-12 overflow-hidden max-h-[92vh]"
        >
          {/* Close button top right */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-30 p-1.5 hover:text-brew-clay transition-colors cursor-pointer bg-mist-cream/80 backdrop-blur-sm lg:bg-transparent"
            aria-label="Close login"
          >
            <X className="w-5 h-5 text-earth-dark" />
          </button>

          {/* Left Column: Visual Anchor */}
          <div className="hidden lg:block lg:col-span-6 relative min-h-[550px] bg-earth-dark overflow-hidden">
            <div className="absolute inset-0 bg-earth-dark/15 z-10 pointer-events-none" />
            <img
              src="https://lh3.googleusercontent.com/aida/AP1WRLvPq2sThLLtXCWWg1KB58ndexhhCEdvQ2iHKFOmwCcrvbawufiGpTSlWTWDjoAtKcARyYnPS0n3Enlh-4PsFRmxIKIgXFi64uCgGr5GazHH989EpClp1gez5JCD1cbm0HtKxVl0vzCW1fK9hQnrGbHCcJK_-p1ZCYwdiR8irW5NtVhLDMZs0D9BHHduMgj-eKGy1v2ihZfQAOC3HfRZ7Fk_Dnq4RQyO2OpRuFjdqcE3SHVawVd0HTeExBA"
              alt="Artisanal counter layout of specialty coffee bar"
              className="absolute inset-0 w-full h-full object-cover grayscale-[25%] opacity-90 transition-transform duration-[12000ms] hover:scale-105"
            />
            {/* Soft Editorial Overlay / vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent z-15" />
            
            {/* Narrative Info Overlay */}
            <div className="absolute bottom-12 left-10 right-10 z-20 text-mist-cream">
              <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-parchment uppercase block mb-3">
                THE ORIGIN & THE SPACE
              </span>
              <h2 className="font-serif text-2.5xl italic leading-tight mb-4">
                "Every fragment of a second holds the essence of the craft."
              </h2>
              <div className="w-12 h-[1px] bg-parchment/35" />
            </div>
          </div>

          {/* Right Column: Functional Canvas */}
          <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between bg-mist-cream overflow-y-auto">
            {/* Header Identity */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-wider text-primary">FRAGMENTO</span>
                <div className="w-8 h-[0.5px] bg-earth-dark/30 mt-0.5" />
              </div>
              <button
                type="button"
                onClick={() => setView(view === 'register' ? 'phone' : 'register')}
                className="font-sans text-[10px] tracking-widest text-brew-clay font-bold hover:text-earth-dark transition-colors uppercase border-none bg-transparent cursor-pointer"
              >
                {view === 'register' ? 'LOG IN' : 'REGISTER'}
              </button>
            </div>

            {/* Main Flow Form Containers */}
            <div className="my-auto py-4">
              
              <AnimatePresence mode="wait">
                
                {/* 1. Phone View */}
                {view === 'phone' && (
                  <motion.div
                    key="phone"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="font-serif text-2.5xl text-earth-dark font-medium mb-1">
                        Your Presence Awaits
                      </h3>
                      <p className="font-serif text-sm italic text-on-surface-variant">
                        Enter the sacred space of the brew.
                      </p>
                    </div>

                    <form onSubmit={handleRequestOtp} className="space-y-6">
                      <div className="space-y-2">
                        <label className="font-sans text-[10px] text-earth-dark/50 font-bold tracking-wider uppercase block">
                          PHONE NUMBER
                        </label>
                        <div className="flex items-center border-b border-earth-dark/20 focus-within:border-brew-clay transition-all py-1.5">
                          <span className="font-sans text-sm font-semibold text-earth-dark/60 mr-3">+91</span>
                          <input
                            type="tel"
                            required
                            placeholder="98765 43210"
                            value={phone}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, '');
                              if (v.length <= 10) setPhone(v);
                            }}
                            className="bg-transparent border-none p-0 focus:ring-0 w-full font-mono text-sm tracking-widest text-earth-dark outline-none"
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="bg-red-50 text-red-700 text-xs p-3 font-sans border-l-2 border-red-500 flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5" /> {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-brew-clay hover:bg-earth-dark text-mist-cream py-4 font-sans text-xs font-bold tracking-widest uppercase transition-colors duration-300 flex items-center justify-center gap-2 border-none cursor-pointer"
                      >
                        REQUEST OTP <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* 2. OTP View */}
                {view === 'otp' && (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="font-serif text-2.5xl text-earth-dark font-medium mb-1">
                        Verify Identity
                      </h3>
                      <p className="font-serif text-sm italic text-on-surface-variant">
                        We have sent a 4-digit code to +91 {phone.replace(/(\d{5})(\d{5})/, '$1 $2')}.
                      </p>
                    </div>

                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                      <div className="space-y-4">
                        <label className="font-sans text-[10px] text-earth-dark/50 font-bold tracking-wider uppercase block">
                          VERIFICATION CODE
                        </label>
                        
                        <div className="flex gap-4 justify-between max-w-xs mx-auto md:mx-0">
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              ref={otpRefs[index]}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange(index, e.target.value)}
                              onKeyDown={(e) => handleKeyDown(index, e)}
                              className="w-12 h-14 bg-transparent border-0 border-b border-earth-dark/20 focus:border-brew-clay text-center font-serif text-xl focus:ring-0 outline-none transition-colors"
                            />
                          ))}
                        </div>

                        <div className="flex justify-end max-w-xs">
                          <button
                            type="button"
                            disabled={countdown > 0}
                            onClick={handleResendOtp}
                            className={`font-sans text-[9px] uppercase tracking-wider font-bold border-none bg-transparent cursor-pointer transition-colors ${
                              countdown > 0 ? 'text-earth-dark/45 cursor-not-allowed' : 'text-brew-clay hover:text-earth-dark'
                            }`}
                          >
                            {isResending 
                              ? 'RESENDING...' 
                              : countdown > 0 
                                ? `RESEND CODE IN 0:${countdown.toString().padStart(2, '0')}` 
                                : 'RESEND CODE NOW'}
                          </button>
                        </div>
                      </div>

                      {error && (
                        <div className="bg-red-50 text-red-700 text-xs p-3 font-sans border-l-2 border-red-500 flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5" /> {error}
                        </div>
                      )}

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setView('phone')}
                          className="flex-1 bg-transparent hover:bg-parchment/10 text-earth-dark border border-earth-dark/25 py-4 font-sans text-xs font-bold tracking-widest uppercase transition-colors duration-300"
                        >
                          BACK
                        </button>
                        <button
                          type="submit"
                          className="flex-[2] bg-brew-clay hover:bg-earth-dark text-mist-cream py-4 font-sans text-xs font-bold tracking-widest uppercase transition-colors duration-300 flex items-center justify-center gap-2 border-none cursor-pointer"
                        >
                          ENTER ATELIER <CheckCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* 3. Email View */}
                {view === 'email' && (
                  <motion.div
                    key="email"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="font-serif text-2.5xl text-earth-dark font-medium mb-1">
                        Narrative Log In
                      </h3>
                      <p className="font-serif text-sm italic text-on-surface-variant">
                        Connect with your physical & digital journal archives.
                      </p>
                    </div>

                    <form onSubmit={handleEmailLogin} className="space-y-4">
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] text-earth-dark/50 font-bold tracking-wider uppercase block">
                          FULL NAME / IDENTITY
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-white border border-earth-dark/15 p-3 text-sm font-sans outline-none focus:border-brew-clay"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-sans text-[10px] text-earth-dark/50 font-bold tracking-wider uppercase block">
                          EMAIL ADDRESS
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white border border-earth-dark/15 p-3 text-sm font-sans outline-none focus:border-brew-clay"
                        />
                      </div>

                      {error && (
                        <div className="bg-red-50 text-red-700 text-xs p-3 font-sans border-l-2 border-red-500 flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5" /> {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-brew-clay hover:bg-earth-dark text-mist-cream py-4 font-sans text-xs font-bold tracking-widest uppercase transition-colors duration-300 flex items-center justify-center gap-2 border-none cursor-pointer mt-2"
                      >
                        LOG IN SECURELY <LogIn className="w-4 h-4" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* 4. Register View */}
                {view === 'register' && (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="font-serif text-2.5xl text-earth-dark font-medium mb-1">
                        Create Guest Spot
                      </h3>
                      <p className="font-serif text-sm italic text-on-surface-variant">
                        Join our community of intentional coffee contemplators.
                      </p>
                    </div>

                    <form onSubmit={handleEmailLogin} className="space-y-4">
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] text-earth-dark/50 font-bold tracking-wider uppercase block">
                          YOUR FULL IDENTITY
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="E.g. Aditya Parihar"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-white border border-earth-dark/15 p-3 text-sm font-sans outline-none focus:border-brew-clay"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-sans text-[10px] text-earth-dark/50 font-bold tracking-wider uppercase block">
                          CONTACT PHONE NUMBER
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="E.g. 9876543210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          className="w-full bg-white border border-earth-dark/15 p-3 text-sm font-sans outline-none focus:border-brew-clay"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-sans text-[10px] text-earth-dark/50 font-bold tracking-wider uppercase block">
                          EMAIL FOR SPECIAL ARCHIVES (OPTIONAL)
                        </label>
                        <input
                          type="email"
                          placeholder="name@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white border border-earth-dark/15 p-3 text-sm font-sans outline-none focus:border-brew-clay"
                        />
                      </div>

                      {error && (
                        <div className="bg-red-50 text-red-700 text-xs p-3 font-sans border-l-2 border-red-500 flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5" /> {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-brew-clay hover:bg-earth-dark text-mist-cream py-4 font-sans text-xs font-bold tracking-widest uppercase transition-colors duration-300 flex items-center justify-center gap-2 border-none cursor-pointer mt-2"
                      >
                        REGISTER ATELIER PASS <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Alternative Login Methods Divider */}
            {view !== 'otp' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-[0.5px] flex-1 bg-earth-dark/10" />
                  <span className="font-sans text-[10px] text-earth-dark/40 font-bold tracking-wider uppercase">
                    OR NARRATIVE LOGIN
                  </span>
                  <div className="h-[0.5px] flex-1 bg-earth-dark/10" />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {view !== 'email' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setError('');
                        setView('email');
                      }}
                      className="w-full border border-earth-dark/20 hover:border-brew-clay hover:text-brew-clay py-4 font-sans text-[10px] font-bold uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2 cursor-pointer bg-transparent"
                    >
                      <Mail className="w-4 h-4 text-earth-dark/65" /> CONTINUE WITH EMAIL
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setError('');
                        setView('phone');
                      }}
                      className="w-full border border-earth-dark/20 hover:border-brew-clay hover:text-brew-clay py-4 font-sans text-[10px] font-bold uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2 cursor-pointer bg-transparent"
                    >
                      <Phone className="w-4 h-4 text-earth-dark/65" /> CONTINUE WITH PHONE / OTP
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Privacy footer info block */}
            <div className="mt-8 text-center">
              <p className="font-sans text-[9px] text-earth-dark/50 leading-relaxed max-w-xs mx-auto">
                By entering the ritual, you agree to our commitments to{' '}
                <a href="#provenance-section" className="underline hover:text-brew-clay">
                  Provenance
                </a>{' '}
                and{' '}
                <span className="underline cursor-help">
                  Privacy Policy
                </span>
                .
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
