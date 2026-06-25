/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Flame, Compass, ChevronRight, X, Clock, HelpCircle, ArrowUpRight, FlameKindling, Info } from 'lucide-react';

interface Article {
  id: string;
  category: string;
  title: string;
  description: string;
  readTime: string;
  image: string;
  content: string;
  meta?: { label: string; value: string }[];
}

export default function Journal() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const articles: Article[] = [
    {
      id: 'provenance',
      category: 'Provenance',
      title: 'Chikmagalur: The High-Altitude Harvest',
      description: 'Tracing the heritage of the 1,100m wash processed beans. How elevation and micro-climate dictate the profile of our flagship roast.',
      readTime: '08 Min Read',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqbWmEVyZdlYn16A-XXM61WVzCBupODeSRtnqCy4oQ9MIx4IG_8yBUEq904vx0CoayQ7cl9teNFEI3WLlLEBHGWUb4dg8KxI01hyt9KopRj1qc_-_NkicXYVd9VsVTuIgkzT0B4xm7NI4VJqORsyf11j5fS4U18NegZOnPgyKNGgsdAMuoG3pRvdcW548T2BfBmEvZQxJEC7KVgXnl9zOGhK9QFbSfFhdoWyCQl8xgGWhOXwv1M2dyQ2u_SiPQ4B1g4HUDZZwcLww',
      meta: [
        { label: 'Region', value: 'Chikmagalur, Karnataka' },
        { label: 'Elevation', value: '1,200M - 1,450M' },
        { label: 'Variety', value: '86.5 SCA Quality Arabica' },
      ],
      content: `
        Our journey begins in the high-altitude canopy of the Baba Budan Giri hills of Chikmagalur. We partner with legacy estates that treat the coffee cherry not as a commodity, but as a vintage.
        
        High above the monsoon clouds of Karnataka, our single-origin arabica finds its voice. Here, the shade-grown cherries mature slowly under ancient canopies of massive shade trees, surrounded by wild orange orchards and black pepper vines, developing the complex sugars and sparkling acidity that define the Fragmento profile.
        
        We work exclusively with small-hold farmers who view their land as an heirloom, practicing regenerative agriculture that feeds the soil as much as it feeds the soul. Excellence is binary. We only curate micro-lots that exceed an 86-point cupping score (our flagship lot sits at a pristine 86.5 score), ensuring each fragment of your morning is distinct in its complexity.
      `
    },
    {
      id: 'science',
      category: 'Science',
      title: 'The Physics of the Small Batch',
      description: 'Thermal stability and the precise Maillard reaction. Why we roast only 5kg at a time to lock in volatile terroir aromatics.',
      readTime: '12 Min Read',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBndiKIrY9JYPMyigSKpM3JlXUoj9fZIrJOhFqXJwnkknD57QpY5Y-E1fyUCF-Hx-dyMhPBcnP_TsgQAXl9spa5JhqxB_k3p1qItYae5qxVk33L-BDC6V03UWnyXI4C3sbw602wMY17h013pLwJqP61mxOLybB1oG8MW3sNjvJ4M9MxEEHrjfJ5oG0NdvX9MPP__zhYAErP8f4NEYO-hDqMzEq6Go6jpUXpjGPHN6L4S4ogCgaZFROwPqj6XyspWOMBUqcyt2ZpjLk',
      meta: [
        { label: 'Batch Lot', value: 'Batch No. 42' },
        { label: 'Roaster', value: 'Giesen Cast-Iron 5kg' },
        { label: 'Heat Rate', value: 'Custom Flame Induction' },
      ],
      content: `
        We roast in fragments. Small quantities, meticulously monitored, to preserve the terroir's volatile aromatics that mass-roasting destroys. Every roast is a dialogue between the bean and the flame. 
        
        For Batch No. 42, we pursued a light-medium roast profile that emphasizes floral clarity without sacrificing body. This requires thermal stability and a precise Maillard reaction. By roasting only 5kg at a time, we maintain absolute control over the thermal inertia of the drum, preventing any scorching and allowing the origin's delicate jasmine and cocoa notes to blossom beautifully.
      `
    },
    {
      id: 'rituals',
      category: 'Rituals',
      title: 'The Meditative 4-Minute Bloom',
      description: 'A slow-pouring guide to the extraction process. Breaking down the exact temperature, weight, and timing for a perfect brew.',
      readTime: '06 Min Read',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCt2haeaee7nFXsMFSnqNc9TVP-Tk-U43g0c96zuf64Rb-R80aateZpxCARf1w-K9DpyxkXiOf22ldmo6CeT77B7Id5-qk8xOrrXHqPBDiVW1CJQBQMV2n4wGtKkKMWwoJSqy3xeqHVJ5__nKEPCaSwxmMCnjtR38Qoc5z-LMECbhGsfcTXcjSUUJPWTMrK79hVJhRXKyXJpCE4qbqXfYfyudJ97FcNsgpZdD-BhvyDK1IyA2EaWljCNivFbe6hxflkU2SxwGQJVd8',
      meta: [
        { label: 'Water Temp', value: '93.5°C' },
        { label: 'Ratio', value: '1:16 (15g Coffee / 240g Water)' },
        { label: 'Grind Profile', value: 'Medium-Coarse (Sand)' },
      ],
      content: `
        "In the silence of the morning, the water's contact with the grounds is the only sound that matters."
        
        The bloom is where the coffee wakes up. By pouring exactly 45g of water at 93.5°C over 15g of medium-coarse grounds and waiting exactly 45 seconds, we allow trapped carbon dioxide to escape. This opens up the dry channels, ensuring that the subsequent main pours extract the sweetness and delicate fruit acids evenly. The total pour time is targeted at exactly 3 minutes and 45 seconds, resulting in a cup defined by outstanding clarity and balanced sweetness.
      `
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      setEmail('');
    }, 1200);
  };

  return (
    <section id="journal-section" className="py-24 md:py-36 bg-surface-container-low border-t border-earth-dark/5 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-earth-dark/10 pb-10">
          <div>
            <span className="font-sans text-[10px] uppercase font-semibold text-brew-clay tracking-[0.25em] mb-4 block">
              THE FRAGMENTO CHRONICLES
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-earth-dark font-medium tracking-tight">
              The Journal
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Current Edition — 01 / <span className="italic font-serif">The Architecture of Stillness</span>. Exploring coffee, slow craftsmanship, and the quiet, deliberate moments that define our ritual.
            </p>
          </div>
        </div>

        {/* Hero Cover Fragment */}
        <div className="relative w-full aspect-[4/5] md:aspect-[21/9] mb-16 overflow-hidden border border-earth-dark/10 shadow-sm group">
          <img 
            alt="Atelier slow coffee brewing" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-[2000ms]" 
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1800"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20 md:bg-gradient-to-r md:from-black/90 md:via-black/55 md:to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 text-[#F9F6F0] flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
            <div className="max-w-xl">
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8D9C5] mb-2 block">
                MAIN FEATURE
              </span>
              <h3 className="font-serif text-3xl md:text-5xl text-[#F9F6F0] leading-tight mb-4 text-shadow-elegant font-medium">
                The Art of the Slow Pour
              </h3>
              <p className="font-sans text-xs md:text-sm text-[#F9F6F0]/90 leading-relaxed font-light">
                In a world obsessed with speed, we find solace in the ritual of the fragment—each single drop a testament to patience. Read our deep study on Dehradun's quietest brewing bar.
              </p>
            </div>
            <button 
              onClick={() => setSelectedArticle(articles[0])}
              className="bg-brew-clay hover:bg-[#2B2623] hover:text-[#E8D9C5] text-[#F9F6F0] border-none font-sans font-semibold text-[10px] tracking-[0.15em] px-6 py-3.5 uppercase transition-all duration-300 active:scale-95 whitespace-nowrap cursor-pointer self-start md:self-end shadow-md"
            >
              ENTER NARRATIVE
            </button>
          </div>
        </div>

        {/* Editorial Intro Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 border-b border-earth-dark/10 mb-20 items-start">
          <div className="lg:col-span-5">
            <h4 className="font-serif text-2xl md:text-3.5xl italic text-earth-dark leading-tight text-shadow-elegant">
              "A cup of coffee is an intimate dialogue between the bean and the water."
            </h4>
          </div>
          <div className="lg:col-start-7 lg:col-span-6">
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed mb-6">
              In this inaugural edition, we trace the origins of our single-origin harvests back to the mineral-rich slopes of Karnataka. We sit with the roasters who define small-batch precision, analyze the technical curves of Batch No. 42, and invite you to participate in the quiet, meditative choreography of the morning pour.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-4 font-sans text-[10px] tracking-widest text-on-surface-variant/60 uppercase font-semibold">
              <span>Published Bi-Monthly</span>
              <span>•</span>
              <span>No. 0042</span>
              <span>•</span>
              <span>A/W 2024</span>
            </div>
          </div>
        </div>

        {/* Feature Grid (Editorial Fragments) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {articles.map((article, index) => (
            <div 
              key={article.id}
              className="bg-surface border border-earth-dark/10 p-5 shadow-sm hover:shadow-md hover:border-earth-dark/25 transition-all duration-300 flex flex-col justify-between group relative"
            >
              {/* Image box */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-parchment/15 relative border border-earth-dark/5 mb-6">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 font-mono font-bold text-xs text-brew-clay bg-surface px-2 py-0.5 border border-earth-dark/10">
                  0{index + 1}
                </span>
              </div>

              {/* Text content */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <span className="font-sans text-[9px] uppercase font-bold tracking-[0.2em] text-brew-clay block mb-2">
                    {article.category}
                  </span>
                  <h4 className="font-serif text-xl text-earth-dark font-medium leading-snug mb-3 group-hover:text-brew-clay transition-colors">
                    {article.title}
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-6">
                    {article.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-earth-dark/5 flex justify-between items-center">
                  <span className="font-sans text-[10px] text-earth-dark/50 font-semibold uppercase tracking-wider">
                    {article.readTime}
                  </span>
                  <button 
                    onClick={() => setSelectedArticle(article)}
                    className="text-[10px] font-sans font-bold tracking-widest text-brew-clay hover:text-earth-dark underline uppercase transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
                  >
                    READ ARTICLE <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Interactive: Roasting Notes Batch No. 42 (From Reference 2) */}
        <div className="bg-earth-dark text-parchment p-8 md:p-12 border border-parchment/10 relative overflow-hidden mb-24">
          <div className="absolute top-0 right-0 opacity-5 pointer-events-none select-none">
            <span className="font-serif text-[18vw] leading-none">B.42</span>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="font-sans text-[10px] uppercase font-bold text-brew-clay tracking-[0.2em] mb-3 block">
                02 / TECHNICAL ANALYSIS
              </span>
              <h3 className="font-serif text-3xl md:text-4.5xl text-mist-cream leading-tight mb-6">
                Batch No. 42<br />Roasting Log
              </h3>
              <p className="font-sans text-sm text-parchment/80 leading-relaxed mb-8">
                Explore the technical log of our small-batch vintage roaster. For Batch 42, we targeted a signature profile that maximizes floral aromatics and fruit clarity without sacrificing caramelized sweetness.
              </p>
              
              {/* Dial stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-parchment/15 p-4 bg-earth-dark/35">
                  <span className="font-sans text-[9px] uppercase tracking-wider opacity-60 block mb-1">DRUM TEMP</span>
                  <span className="font-mono text-lg font-semibold text-mist-cream">204.5°C</span>
                </div>
                <div className="border border-parchment/15 p-4 bg-earth-dark/35">
                  <span className="font-sans text-[9px] uppercase tracking-wider opacity-60 block mb-1">ROAST DURATION</span>
                  <span className="font-mono text-lg font-semibold text-mist-cream">11:42 Min</span>
                </div>
                <div className="border border-parchment/15 p-4 bg-earth-dark/35">
                  <span className="font-sans text-[9px] uppercase tracking-wider opacity-60 block mb-1">DEVELOPMENT RATIO</span>
                  <span className="font-mono text-lg font-semibold text-mist-cream">18%</span>
                </div>
                <div className="border border-parchment/15 p-4 bg-earth-dark/35">
                  <span className="font-sans text-[9px] uppercase tracking-wider opacity-60 block mb-1">ESTATE ALTITUDE</span>
                  <span className="font-mono text-lg font-semibold text-mist-cream">1,450 Meters</span>
                </div>
              </div>
            </div>

            {/* Side illustration showing master taster and roaster craft */}
            <div className="lg:col-start-7 lg:col-span-6">
              <div className="aspect-[4/3] w-full overflow-hidden bg-earth-dark/50 border border-parchment/15 relative p-1.5 group">
                <img 
                  src="https://lh3.googleusercontent.com/aida/AP1WRLunDGOJ6T24AoxzTlWGGVuvCg1R96zQW6jb1a-8gJNItkJJE3P33iYIqt_I2RGkxhVZMVKIEHfbinjt1uHCJjInMJHBfwT81QtHvfUjQEmF3wwroaMzJr-DHQPzNx5FwLBcYL7se_ia5ryiEWPOMAVzALetNCOmGUm8iUsvHP0G3LE0nTG3FQlsq9bSfp-qeARxjdpVecGkOaJUu9G7ML5nsq_C_NPsPvM7xkBEHuHlGbGnvJ4L4H1Q6rc" 
                  alt="Monitoring coffee roaster" 
                  className="w-full h-full object-cover filter brightness-85 group-hover:brightness-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 bg-brew-clay text-mist-cream px-3 py-1.5 text-[9px] font-sans font-bold uppercase tracking-wider">
                  GIESEN 5KG CAST-IRON DRUM
                </div>
              </div>
              <p className="font-sans text-xs text-parchment/60 mt-4 italic leading-relaxed text-center">
                *Roasting in Dehradun at our Rajpur Road facility ensures zero shipping delays between flame and cup.
              </p>
            </div>
          </div>
        </div>

        {/* Master Taster Spotlight (From Reference 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 border-t border-earth-dark/10 pt-20">
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-2 border-[0.5px] border-earth-dark/10 pointer-events-none translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
            <div className="aspect-[3/4] w-full overflow-hidden bg-parchment/10 relative p-1.5 border border-earth-dark/5">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbQDLHSGR433n43-amUg-GPVBqj7XDf1hKYDa-2FiBL7vKeI1WjvAEQkfyaT2xz7fNO3Ytyen5fVnGweZ7EjDRNM-JN7_bSP43aloQxlAy7lnxmmyi_fnl4wlqBscNkmQZvCU0RtpSlSeHV0_Ta17nACLnpfBI9PNLO0UFLGf6Up98NCSnw2MhRv-1FERWqLa807-fdBBQ6ao1hlehpBuhx0RpBordxUDPr4iq2hd9J9CdE0nzkDpXfy9zJ-WfsKrGHy5Q-gvO_zM" 
                alt="Ramesh Master Taster portrait" 
                className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-mist-cream/95 backdrop-blur px-3 py-1.5 border border-earth-dark/5 text-[9px] font-sans font-bold tracking-wider text-earth-dark">
                CUSTODIAN OF RITUAL
              </div>
            </div>
          </div>

          <div className="lg:col-start-7 lg:col-span-6 flex flex-col justify-center">
            <span className="font-sans text-[10px] uppercase font-bold text-brew-clay tracking-[0.25em] mb-4 block">
              03 / THE PEOPLE
            </span>
            <h3 className="font-serif text-3xl md:text-5xl text-earth-dark font-medium leading-tight mb-6">
              Ramesh, Master Taster
            </h3>
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed mb-6">
              For Ramesh, coffee isn't a commodity; it's a sensory cartography. Having spent thirty years surveying the high estates, his palate is a finely tuned instrument. He can pinpoint the subtle shift in a harvest’s flavor profile down to a single week of unexpected monsoon rain or the maturity of shade canopies.
            </p>
            <p className="font-sans text-xs md:text-sm text-on-surface-variant/80 italic leading-relaxed border-l-2 border-brew-clay/40 pl-4 py-1.5 mb-8">
              "We do not simply roast and brew. We survey, we analyze, and we document. Each cup is a slow dialogue of patient elements, poured with presence."
            </p>
            <button 
              onClick={() => {
                setSelectedArticle({
                  id: 'ramesh',
                  category: 'The People',
                  title: 'Ramesh, Master Taster: Palate Cartography',
                  description: 'A study in patience. 30 years at our legacy Indian estate partners.',
                  readTime: '10 Min Read',
                  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbQDLHSGR433n43-amUg-GPVBqj7XDf1hKYDa-2FiBL7vKeI1WjvAEQkfyaT2xz7fNO3Ytyen5fVnGweZ7EjDRNM-JN7_bSP43aloQxlAy7lnxmmyi_fnl4wlqBscNkmQZvCU0RtpSlSeHV0_Ta17nACLnpfBI9PNLO0UFLGf6Up98NCSnw2MhRv-1FERWqLa807-fdBBQ6ao1hlehpBuhx0RpBordxUDPr4iq2hd9J9CdE0nzkDpXfy9zJ-WfsKrGHy5Q-gvO_zM',
                  content: `
                    Ramesh's hands bear the weathering of three decades of harvest. Sitting in the tasting room of our partner estate, he cupped a fresh single-origin arabica.
                    
                    He explains how the micro-climate at 1,450 meters elevation creates an entirely different cell structure inside the seed. "A faster maturing bean has less time to absorb the character of the soil. But here, with slow mist and deep shade, the bean develops density. You taste Dehradun's mountain fresh water combined with the high canopy forest."
                    
                    Every batch of coffee served at Fragmento is cupped and verified against Ramesh's sensory map, making sure that what makes it into your cup represents the peak of modern artisanal provenance.
                  `
                });
              }}
              className="border border-earth-dark hover:bg-earth-dark hover:text-mist-cream px-6 py-3 font-sans font-semibold text-[10px] tracking-widest transition-colors cursor-pointer self-start uppercase"
            >
              READ HIS FULL INTERVIEW
            </button>
          </div>
        </div>

        {/* Newsletter Subscription Box (From Reference 1) */}
        <div className="bg-[#2B2623] text-[#F9F6F0] p-8 md:p-16 border border-[#F9F6F0]/10 shadow-lg text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <span className="font-sans text-[10px] uppercase font-bold text-[#E8D9C5] tracking-[0.25em] mb-4 block">
              THE INNER FRAGMENT
            </span>
            <h3 className="font-serif text-3xl md:text-5xl text-[#F9F6F0] leading-tight mb-6">
              Receive the journal in your mailbox
            </h3>
            <p className="font-sans text-xs md:text-sm text-[#F9F6F0]/85 leading-relaxed mb-12">
              Subscribe to receive physical and digital chronicles of our coffee provenance journey, technical roasting profiles, and first early-access keys to rare micro-lots.
            </p>

            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe} 
                  className="flex flex-col sm:flex-row gap-4 items-end max-w-md mx-auto"
                >
                  <div className="flex-grow w-full text-left">
                    <label className="font-sans text-[9px] uppercase tracking-wider font-semibold text-[#E8D9C5]/85 block mb-2">
                      Electronic Mail
                    </label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="YOU@EMAIL.COM" 
                      className="w-full bg-transparent border-0 border-b border-[#F9F6F0]/30 focus:border-brew-clay focus:ring-0 text-[#F9F6F0] font-mono text-xs pb-3 uppercase tracking-wider placeholder-[#F9F6F0]/40"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto bg-brew-clay hover:bg-mist-cream hover:text-[#2B2623] text-mist-cream border-none font-sans font-semibold text-[10px] tracking-[0.15em] px-8 py-3.5 uppercase transition-colors cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    {submitting ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-brew-clay/20 border border-brew-clay/35 py-4 px-6 max-w-md mx-auto text-[#F9F6F0]"
                >
                  <p className="font-serif text-lg italic text-[#F9F6F0] mb-1">
                    Your presence has been registered.
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-[#E8D9C5] opacity-90">
                    We respect the sanctity of your mailbox. Issue 01 is on its way.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Article Detail overlay modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-earth-dark/65 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-mist-cream w-full max-w-3xl max-h-[85vh] overflow-y-auto border border-earth-dark/15 shadow-2xl relative z-10 flex flex-col p-6 md:p-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 p-2 hover:bg-earth-dark/5 hover:text-brew-clay transition-colors duration-300 z-10 cursor-pointer border-none bg-transparent"
                aria-label="Close article"
              >
                <X className="w-5 h-5 text-earth-dark" />
              </button>

              {/* Cover Image inside article detail */}
              <div className="aspect-video w-full overflow-hidden bg-parchment/10 relative border border-earth-dark/5 mb-8">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 bg-earth-dark text-parchment py-1 px-3 text-[10px] font-sans font-bold uppercase tracking-widest">
                  {selectedArticle.category}
                </div>
              </div>

              {/* Title & Stats */}
              <div className="mb-6">
                <span className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] text-brew-clay block mb-2">
                  ISSUE 01 / FEATURE
                </span>
                <h3 className="font-serif text-2xl md:text-3.5xl text-earth-dark font-medium leading-snug mb-4">
                  {selectedArticle.title}
                </h3>

                {/* Meta details horizontal strip */}
                {selectedArticle.meta && (
                  <div className="flex flex-wrap gap-x-6 gap-y-2 py-3 border-y border-earth-dark/10 font-sans text-[10px] tracking-wider uppercase font-semibold text-on-surface-variant">
                    {selectedArticle.meta.map((m, idx) => (
                      <span key={idx}>
                        {m.label}: <span className="text-earth-dark">{m.value}</span>
                      </span>
                    ))}
                    <span>• {selectedArticle.readTime}</span>
                  </div>
                )}
              </div>

              {/* Rich Text Paragraphs */}
              <div className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed space-y-6 max-w-none prose">
                {selectedArticle.content.trim().split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-justify">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-12 pt-6 border-t border-earth-dark/10 flex justify-between items-center">
                <span className="font-serif text-sm italic text-earth-dark">FRAGMENTO Chronicles</span>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="bg-brew-clay hover:bg-earth-dark hover:text-parchment text-mist-cream border-none font-sans font-semibold text-[10px] tracking-widest px-6 py-2.5 uppercase transition-colors cursor-pointer"
                >
                  CLOSE READING
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
