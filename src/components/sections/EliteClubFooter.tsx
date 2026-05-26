import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export function EliteClubFooter() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="bg-slate-950 border-t border-amber-600/20 relative">
      {/* Elite Club Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-900/20 to-slate-900/50 rounded-2xl border border-amber-600/30 p-12 mb-16"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div>
                <h2
                  className="text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Join the Elite Club
                </h2>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Gain exclusive access to limited editions, private viewings, and VIP events. Members receive curated collections and personalized concierge service.
                </p>
                <ul className="space-y-3 mb-8 text-slate-300 text-sm">
                  <li className="flex items-center gap-2">✓ First access to new releases</li>
                  <li className="flex items-center gap-2">✓ Exclusive member pricing</li>
                  <li className="flex items-center gap-2">✓ Personal shopping assistant</li>
                  <li className="flex items-center gap-2">✓ Invitation to private events</li>
                </ul>
                <button className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2">
                  Become a Member <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-6 border border-amber-600/20 text-center">
                  <p className="text-3xl font-bold text-amber-400 mb-2">5000+</p>
                  <p className="text-slate-400 text-sm">Active Members</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-6 border border-amber-600/20 text-center">
                  <p className="text-3xl font-bold text-amber-400 mb-2">150+</p>
                  <p className="text-slate-400 text-sm">Curated Items</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-6 border border-amber-600/20 text-center">
                  <p className="text-3xl font-bold text-amber-400 mb-2">12</p>
                  <p className="text-slate-400 text-sm">Annual Events</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-6 border border-amber-600/20 text-center">
                  <p className="text-3xl font-bold text-amber-400 mb-2">∞</p>
                  <p className="text-slate-400 text-sm">Lifetime Access</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Links & Contact */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <motion.div variants={itemVariants}>
              <h3
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                JovioTrendz
              </h3>
              <p className="text-slate-400 text-sm">Luxury redefined for the discerning elite.</p>
            </motion.div>

            {/* Collections */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-semibold mb-4">Collections</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    Limited Edition
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    Signature Series
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    Bespoke Custom
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    Seasonal Releases
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    Craftsmanship
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-500" />
                  <a href="mailto:info@joviotrendz.com" className="hover:text-amber-400 transition-colors">
                    info@joviotrendz.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-500" />
                  <a href="tel:+1234567890" className="hover:text-amber-400 transition-colors">
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>Luxury District, Metropolitan City</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-6 py-8 border-t border-slate-800"
          >
            {[
              { icon: Facebook, label: 'Facebook' },
              { icon: Instagram, label: 'Instagram' },
              { icon: Twitter, label: 'Twitter' },
              { icon: Linkedin, label: 'LinkedIn' },
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href="#"
                  className="p-2 rounded-full border border-amber-600/30 text-slate-400 hover:text-amber-400 hover:border-amber-600 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </motion.div>

          {/* Copyright */}
          <motion.div variants={itemVariants} className="text-center text-sm text-slate-500 pt-8">
            <p>© 2024 JovioTrendz. All rights reserved. | Crafted with excellence for the elite.</p>
          </motion.div>
        </div>
      </motion.section>
    </footer>
  );
}
