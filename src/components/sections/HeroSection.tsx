import React from 'react';
import { motion } from 'framer-motion';
import { Crown, ChevronDown } from 'lucide-react';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-900/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Crown Icon */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <div className="p-3 bg-amber-600/10 rounded-full border border-amber-600/30">
            <Crown className="w-8 h-8 text-amber-500" />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          <span className="text-white">Luxury</span>
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
            Redefined
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto"
        >
          Experience the pinnacle of sophistication. Curated collections for the discerning elite.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <button className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors duration-300">
            Explore Collection
          </button>
          <button className="px-8 py-3 border border-amber-600 text-amber-500 hover:bg-amber-600/10 font-semibold rounded-lg transition-colors duration-300">
            Join Elite Club
          </button>
        </motion.div>

        {/* Featured Piece Preview */}
        <motion.div
          variants={itemVariants}
          className="relative mx-auto max-w-md h-96 rounded-xl overflow-hidden border border-amber-600/30 bg-gradient-to-br from-slate-800 to-slate-900"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent"></div>
          <div className="absolute top-4 right-4 px-3 py-1 bg-amber-600/20 border border-amber-600/50 rounded-full text-amber-400 text-sm font-semibold">
            Limited Edition
          </div>
          <div className="flex items-center justify-center h-full text-6xl">✨</div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 to-transparent p-4">
            <p className="text-amber-400 text-sm font-semibold">Signature Collection</p>
            <p className="text-white text-lg font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>The Obsidian Crown</p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-amber-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
