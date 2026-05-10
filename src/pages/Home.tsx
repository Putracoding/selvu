import { motion } from 'motion/react';
import { ArrowRight, Star, Heart, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const categories = [
    { name: 'PERNIKAHAN', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600', description: 'Abadikan janji suci Anda dalam album premium.' },
    { name: 'PERJALANAN', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600', description: 'Petualangan Anda dalam setiap lembar kertas.' },
    { name: 'KELUARGA', img: 'https://images.unsplash.com/photo-1519689689378-b0a5c4883495?auto=format&fit=crop&q=80&w=600', description: 'Momen berharga bersama orang tercinta.' },
  ];

  return (
    <div className="bg-brand-black text-brand-white">
      {/* Hero Section */}
      <main className="flex min-h-[90vh] border-b border-white/10">
        <div className="w-full lg:w-1/2 p-10 lg:p-20 flex flex-col justify-between border-r border-white/10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-7xl md:text-[10rem] font-black leading-[0.8] tracking-tighter">
              ABADI<br />DALAM<br /><span className="text-stroke">CETAK.</span>
            </h2>
            <p className="max-w-xs text-xs leading-relaxed text-white/40 uppercase tracking-[0.2em] font-medium">
              Layanan pembuatan photobook premium dengan kualitas kertas terbaik. 
              Setiap lembar menceritakan kisah yang tak akan pernah pudar oleh waktu.
            </p>
            <div className="flex gap-6 pt-8">
              <Link to="/products" className="bg-white text-black px-10 py-4 font-black text-xs uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors">
                JELAJAHI KOLEKSI
              </Link>
            </div>
          </motion.div>
          
          <div className="mt-20 lg:mt-0 p-8 border border-white/5 bg-neutral-900 group cursor-pointer relative overflow-hidden">
             <div className="absolute inset-0 bg-neutral-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
             <div className="relative z-10">
               <p className="text-[10px] uppercase tracking-widest text-brand-orange font-black mb-2">PRODUK TERLARIS</p>
               <p className="text-2xl font-black tracking-tighter">YEARBOOK MEMORIES 2024</p>
             </div>
             <ArrowRight className="absolute right-8 top-1/2 -translate-y-1/2 text-white/20 group-hover:translate-x-2 transition-all" size={32} />
          </div>
        </div>

        <div className="hidden lg:block w-1/2 relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1544866092-159c99187ec9?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-110"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </main>

      {/* Categories Grid */}
      <section className="p-10 lg:p-20 border-b border-white/10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-10">
          <h2 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none max-w-2xl">
            KATEGORI<br /><span className="text-brand-orange">UNGGULAN.</span>
          </h2>
          <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold max-w-xs text-right">
            PILIHAN TERBAIK UNTUK SETIAP<br />CERITA BERHARGA ANDA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-neutral-900 border border-white/5 group relative overflow-hidden aspect-[4/5] p-10 flex flex-col justify-end"
            >
              <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-100 group-hover:scale-105">
                <img src={cat.img} className="w-full h-full object-cover" alt={cat.name} />
              </div>
              <div className="relative z-10">
                <h3 className="text-4xl font-black tracking-tighter mb-4 text-white group-hover:text-brand-orange transition-colors">{cat.name}</h3>
                <p className="text-xs text-white/60 mb-6 uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">{cat.description}</p>
                <Link to="/products" className="bg-white text-black px-6 py-2 inline-block font-black text-[10px] uppercase tracking-widest shadow-2xl">
                  LIHAT PRODUK
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Marquee or Large Banner */}
      <section className="bg-white text-black py-20 overflow-hidden group">
        <div className="flex whitespace-nowrap animate-marquee group-hover:pause">
          {[1,2,3].map(i => (
            <p key={i} className="text-[12rem] font-black tracking-tighter leading-none mx-20">
              PREMIUM QUALITY • bespoke design • HANDCRAFTED • SELVI AYU •
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
