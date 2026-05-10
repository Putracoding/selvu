import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-brand-black">
        <h1 className="text-7xl lg:text-9xl font-black tracking-tighter mb-8 uppercase text-stroke">EMPTY</h1>
        <p className="text-white/40 font-bold uppercase tracking-[0.3em] mb-12 max-w-sm text-xs">KERANJANG ANDA MASIH KOSONG.</p>
        <Link 
          to="/products"
          className="bg-white text-black px-12 py-5 font-black uppercase tracking-widest text-xs hover:bg-neutral-200 transition-all"
        >
          BELANJA SEKARANG
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-black min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24">
        <h1 className="text-7xl lg:text-9xl font-black tracking-tighter mb-20 uppercase">KERANJANG.</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
          <div className="lg:col-span-2 space-y-1">
            {cart.map((item) => (
              <motion.div 
                layout
                key={item.id} 
                className="flex flex-col sm:flex-row gap-8 p-10 bg-neutral-900 border border-white/5"
              >
                <div className="w-full sm:w-48 aspect-[3/4] shrink-0 border border-white/10 overflow-hidden bg-neutral-800">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover grayscale" />
                </div>
                
                <div className="flex-grow flex flex-col justify-between py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase font-black tracking-widest text-brand-orange">{item.category}</span>
                      <h3 className="text-4xl font-black tracking-tighter uppercase mt-2">{item.title}</h3>
                      <p className="text-white/40 text-xs uppercase tracking-widest mt-4">
                        {item.pages} PAGES • {item.coverType}
                      </p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-white/20 hover:text-red-500 transition-colors uppercase font-black text-[10px] tracking-widest"
                    >
                      [ REMOVE ]
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-12">
                    <div className="flex items-center space-x-6 border border-white/10 p-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-all text-xl font-bold"
                      >
                        -
                      </button>
                      <span className="font-black text-lg w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-all text-xl font-bold"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-1">SUBTOTAL</p>
                      <p className="text-2xl font-black tracking-tighter">RP {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white text-black p-10 lg:sticky lg:top-32 h-fit">
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-40 mb-2 underline underline-offset-4 decoration-black/10">RINGKASAN BELANJA</p>
              <h3 className="text-3xl font-black tracking-tighter mb-10">TOTAL BAYAR</h3>
              
              <div className="space-y-4 mb-12">
                <div className="flex justify-between items-end">
                  <span className="text-5xl lg:text-7xl font-black tracking-tighter">RP {total.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex flex-col gap-2 pt-6 opacity-30 text-[9px] font-black uppercase tracking-[0.2em]">
                   <p>• Pajak Pertambahan Nilai disertakan</p>
                   <p>• Biaya pengiriman dihitung diproses selanjutnya</p>
                </div>
              </div>
              
              <Link 
                to="/checkout"
                className="w-full bg-black text-white py-6 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all group"
              >
                PROSES CHECKOUT <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
