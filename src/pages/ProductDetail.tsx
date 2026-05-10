import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Photobook } from '../types';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowLeft, Check, Ruler, BookOpen, Layers, Heart } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Photobook | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Mock data match
  const mockProducts: Photobook[] = [
    {
      id: '1',
      title: 'The Eternal White',
      description: 'Our flagship wedding photobook with premium silk pages. Every detail preserved in high-fidelity color on 200gsm museum-grade paper. Designed to last generations, this book features a hand-stitched linen cover with silver foil embossing. Perfect for wedding photography that demands elegance and sophistication.',
      price: 1500000,
      imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800',
      category: 'Wedding',
      pages: 40,
      coverType: 'Hardcover'
    },
    {
      id: '2',
      title: 'Nomad Chronicles',
      description: 'Perfect for your road trips and overseas adventures. A lightweight yet durable softcover book that captures the grit and beauty of travel. Printed on eco-friendly recycled paper with a matte finish that reduces glare, highlighting the textures of landscapes and street photography.',
      price: 850000,
      imageUrl: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=800',
      category: 'Travel',
      pages: 30,
      coverType: 'Softcover'
    },
    {
      id: '3',
      title: 'First Steps',
      description: 'Linen bound soft-touch book for your little ones. Capture every milestone from ultrasound to their first birthday. Using non-toxic inks and child-safe rounded corners, this book is as safe as it is beautiful. Subtle pastel layouts that make baby portraits pop.',
      price: 950000,
      imageUrl: 'https://images.unsplash.com/photo-1519689689378-b0a5c4883495?auto=format&fit=crop&q=80&w=800',
      category: 'Baby',
      pages: 24,
      coverType: 'Hardcover'
    },
    {
       id: '4',
       title: 'Vintage Soul',
       description: 'Classic black and white inspired layout for timeless beauty. High-contrast monochromatic printing on textured ivory paper. This edition focuses on shadows, light, and composition, turning your portfolio into a work of art. Ideal for architectural, portrait, or street photography.',
       price: 1200000,
       imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
       category: 'General',
       pages: 32,
       coverType: 'Hardcover'
    }
  ];

  useEffect(() => {
    const found = mockProducts.find(p => p.id === id);
    if (found) {
      setProduct(found);
    }
    setLoading(false);
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div></div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-400 italic">Book not found.</p></div>;

  return (
    <div className="bg-brand-black min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24">
        <Link to="/products" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors mb-20 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Kembali ke Galeri
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 relative group"
          >
            <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute top-10 left-10">
              <span className="bg-brand-orange text-white px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl">
                {product.category} SERIES
              </span>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="space-y-12"
          >
            <div>
              <h1 className="text-7xl lg:text-9xl font-black text-white leading-none tracking-tighter uppercase">{product.title}</h1>
              <p className="text-4xl font-black text-brand-orange mt-6 tracking-tighter uppercase">RP {product.price.toLocaleString('id-ID')}</p>
            </div>
            
            <div className="h-px bg-white/10"></div>
            
            <p className="text-white/60 font-medium text-xs leading-relaxed uppercase tracking-widest max-w-xl">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-1 border border-white/5 bg-white/5">
              <div className="bg-neutral-900 p-8 flex items-center gap-6">
                 <BookOpen size={24} className="text-white/20" />
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">BINDING</p>
                   <p className="font-black text-white text-sm uppercase">{product.coverType}</p>
                 </div>
              </div>
              <div className="bg-neutral-900 p-8 flex items-center gap-6">
                 <Layers size={24} className="text-white/20" />
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">VOLUME</p>
                   <p className="font-black text-white text-sm uppercase">{product.pages} PAGES</p>
                 </div>
              </div>
              <div className="bg-neutral-900 p-8 flex items-center gap-6">
                 <Ruler size={24} className="text-white/20" />
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">DIMENSIONS</p>
                   <p className="font-black text-white text-sm uppercase">20 X 20 CM</p>
                 </div>
              </div>
              <div className="bg-neutral-900 p-8 flex items-center gap-6">
                 <Check size={24} className="text-white/20" />
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">PAPER</p>
                   <p className="font-black text-white text-sm uppercase">ART PAPER 150G</p>
                 </div>
              </div>
            </div>

            <div className="flex gap-1 bg-white/5">
              <button 
                onClick={() => addToCart(product)}
                className="flex-grow bg-white text-black py-8 font-black uppercase tracking-[0.2em] text-xs hover:bg-neutral-200 transition-all group"
              >
                TAMBAHKAN KE KERANJANG
              </button>
              <button className="bg-neutral-900 px-10 border border-white/5 hover:text-brand-orange transition-all text-white/20">
                <Heart size={24} />
              </button>
            </div>

            <div className="flex flex-wrap gap-10 text-[9px] font-black uppercase tracking-[0.3em] text-white/20 pt-10 border-t border-white/5">
               <div className="flex items-center gap-3">✓ FREE SHIPPING</div>
               <div className="flex items-center gap-3">✓ 2-DAY PRINTING</div>
               <div className="flex items-center gap-3">✓ VERIFIED QUALITY</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
