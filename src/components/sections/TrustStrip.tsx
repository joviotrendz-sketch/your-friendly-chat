import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Shield, Clock } from 'lucide-react';

const trustItems = [
  {
    icon: Award,
    text: '20+ Years',
    subtext: 'Industry Experience',
  },
  {
    icon: Shield,
    text: 'Certified',
    subtext: 'Authenticity Guaranteed',
  },
  {
    icon: Users,
    text: '5000+',
    subtext: 'Satisfied Members',
  },
  {
    icon: Clock,
    text: '24/7',
    subtext: 'Premium Support',
  },
];

export function TrustStrip() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-y border-amber-600/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <Icon className="w-6 h-6 text-amber-500" />
                </div>
                <p className="text-lg font-bold text-white mb-1">{item.text}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider">{item.subtext}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
