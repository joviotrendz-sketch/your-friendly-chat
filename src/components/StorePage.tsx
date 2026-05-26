import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Filter, Star, Truck, Award } from 'lucide-react';
import { storeMockData } from '@/data/store';

export function StorePage() {
  const [cart, setCart] = useState<Array<{ id: string; quantity: number }>>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const filteredProducts = selectedCategory === 'all' 
    ? storeMockData.products 
    : storeMockData.products.filter(p => p.category === selectedCategory);

  const addToCart = (productId: string) => {
    const existing = cart.find(item => item.id === productId);
    if (existing) {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { id: productId, quantity: 1 }]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-amber-600/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            JovioTrendz Store
          </h1>
          <button className="relative p-2 border border-amber-600/30 rounded-lg hover:bg-amber-600/10 transition">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Features Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg border border-amber-600/20">
            <Truck className="w-6 h-6 text-amber-500" />
            <div>
              <p className="font-semibold">Free Shipping</p>
              <p className="text-sm text-slate-400">On orders above $500</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg border border-amber-600/20">
            <Award className="w-6 h-6 text-amber-500" />
            <div>
              <p className="font-semibold">Certified Authentic</p>
              <p className="text-sm text-slate-400">100% genuine items</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg border border-amber-600/20">
            <Star className="w-6 h-6 text-amber-500" />
            <div>
              <p className="font-semibold">Verified Sellers</p>
              <p className="text-sm text-slate-400">Trusted by 5000+ members</p>
            </div>
          </div>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === 'all'
                  ? 'bg-amber-600 text-white'
                  : 'border border-amber-600/30 text-amber-400 hover:bg-amber-600/10'
              }`}
            >
              All Products
            </button>
            {storeMockData.categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white'
                    : 'border border-amber-600/30 text-amber-400 hover:bg-amber-600/10'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-amber-600/30 rounded-lg text-white"
          >
            <option value="latest">Latest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-slate-800/50 rounded-xl border border-amber-600/30 overflow-hidden hover:border-amber-600 transition"
            >
              {/* Product Image */}
              <div className="relative h-64 bg-gradient-to-br from-amber-900/20 to-slate-900 flex items-center justify-center overflow-hidden">
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {product.emoji}
                </div>
                {product.rarity && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-amber-600/20 border border-amber-600 rounded-full text-amber-400 text-xs font-bold">
                    {product.rarity}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {product.name}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-slate-400">({product.reviews})</span>
                </div>

                {/* Price & Stock */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-2xl font-bold text-amber-400">${product.price}</p>
                    <p className="text-xs text-slate-500">{product.stock} in stock</p>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product.id)}
                  className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
