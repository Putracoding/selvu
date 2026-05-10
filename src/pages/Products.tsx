import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Photobook } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Products() {
  const [products, setProducts] = useState<Photobook[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const { addToCart } = useCart();

  const categories = ['All', 'Wedding', 'Travel', 'Baby', 'General'];

  // Mock data for initial fill
  const mockProducts: Photobook[] = [
    {
      id: '1',
      title: 'The Eternal White',
      description: 'Our flagship wedding photobook with premium silk pages.',
      price: 1500000,
      imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800',
      category: 'Wedding',
      pages: 40,
      coverType: 'Hardcover'
    },
    {
      id: '2',
      title: 'Nomad Chronicles',
      description: 'Perfect for your road trips and overseas adventures.',
      price: 850000,
      imageUrl: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=800',
      category: 'Travel',
      pages: 30,
      coverType: 'Softcover'
    },
    {
      id: '3',
      title: 'First Steps',
      description: 'Linen bound soft-touch book for your little ones.',
      price: 950000,
      imageUrl: 'https://images.unsplash.com/photo-1519689689378-b0a5c4883495?auto=format&fit=crop&q=80&w=800',
      category: 'Baby',
      pages: 24,
      coverType: 'Hardcover'
    },
    {
       id: '4',
       title: 'Vintage Soul',
       description: 'Classic black and white inspired layout for timeless beauty.',
       price: 1200000,
       imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
       category: 'General',
       pages: 32,
       coverType: 'Hardcover'
    }
  ];

  useEffect(() => {
    // In a real app, we'd fetch from Firestore
    // For now using mock data
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-brand-black min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12 border-b border-white/10 pb-20">
          <div className="space-y-6">
            <h1 className="text-7xl lg:text-[9rem] font-black tracking-tighter leading-[0.8] uppercase">
              GALLERY<br /><span className="text-stroke">KOLEKSI</span>
            </h1>
            <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold">
              KUMPULAN BESPOKE PHOTOBOOK KARYA SELVI AYU.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 font-black text-[10px] uppercase tracking-widest transition-all ${
                  filter === cat ? 'bg-white text-black' : 'bg-neutral-900 text-white/40 border border-white/5 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group bg-neutral-900 border border-white/5 p-8 flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-800 mb-8 border border-white/5">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-brand-orange/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-orange mb-2 block">{product.category}</span>
                    <h3 className="text-2xl font-black tracking-tighter uppercase mb-1">{product.title}</h3>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest leading-none mb-4">{product.coverType} • {product.pages} Pages</p>
                  </div>
                  
                  <p className="text-2xl font-black tracking-tighter border-t border-white/5 pt-4">
                    RP {product.price.toLocaleString('id-ID')}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-px mt-6">
                    <Link 
                      to={`/products/${product.id}`}
                      className="bg-neutral-800 text-white py-3 text-center text-[10px] font-black uppercase tracking-widest hover:bg-neutral-700 transition-colors"
                    >
                      DETAIL
                    </Link>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-white text-black py-3 text-[10px] font-black uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                    >
                      ADD TO BAG
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-white/20 font-black text-6xl uppercase tracking-tighter opacity-10">NO ITEMS FOUND</p>
          </div>
        )}
      </div>
    </div>
  );
}
