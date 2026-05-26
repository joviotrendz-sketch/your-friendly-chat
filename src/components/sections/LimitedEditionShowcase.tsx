import React from 'react';
import { motion } from 'framer-motion';
import { Star, Zap } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const items = [
  {
    id: 1,
    name: 'The Obsidian Crown',
    rarity: 'Ultra Rare',
    price: '$45,000',
    count: '1 of 5',
    description: 'Handcrafted with obsidian and 24K gold',
    emoji: '👑',
  },
  {
    id: 2,
    name: 'Midnight Essence',
    rarity: 'Rare',
    price: '$28,000',
    count: '3 of 8',
    description: 'Exclusive fragrance collection',
    emoji: '🧴',
  },
  {
    id: 3,
    name: 'Golden Sentinel',
    rarity: 'Limited',
    price: '$15,000',
    count: '12 of 50',
    description: 'Bespoke timepiece with diamond setting',
    emoji: '⌚',
  },
];

export function LimitedEditionShowcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Limited Edition Collection
          </h2>
          <p className="text-slate-400 text-lg">Handpicked treasures for the discerning collector</p>
        </motion.div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group"
            >
              {/* Card */}
              <div className="relative rounded-xl overflow-hidden border border-amber-600/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 hover:border-amber-600/60 transition-colors duration-300 h-full flex flex-col">
                {/* Rarity Badge */}
                <div className="mb-4 flex items-center gap-2">
                  {item.rarity === 'Ultra Rare' && (
                    <Zap className="w-4 h-4 text-amber-500" />
                  )}
                  {item.rarity === 'Rare' && (
                    <Star className="w-4 h-4 text-amber-400" />
                  )}
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {item.rarity}
                  </span>
                </div>

                {/* Emoji / Icon */}
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </div>

                {/* Item Name */}
                <h3
                  className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm mb-4 flex-grow">{item.description}</p>

                {/* Availability */}
                <div className="mb-4 text-xs text-amber-500 font-semibold">{item.count} Available</div>

                {/* Price */}
                <p className="text-2xl font-bold text-amber-400 mb-4">{item.price}</p>

                {/* Action Button */}
                <Link to="/store">
                  <button className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors duration-300 text-sm">
                    View in Store
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Store CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/store">
            <button className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors duration-300">
              Browse Full Collection
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
