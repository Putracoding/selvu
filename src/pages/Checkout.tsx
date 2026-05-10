import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle, ShieldCheck, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [orderComplete, setOrderComplete] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) return;
    setLoading(true);
    
    try {
      const orderData = {
        userId: user.uid,
        customerEmail: user.email,
        items: cart,
        totalAmount: total,
        status: 'paid', // For demo we assume instant success
        shippingAddress: address,
        createdAt: serverTimestamp(),
      };
      
      await addDoc(collection(db, 'orders'), orderData);
      setOrderComplete(true);
      clearCart();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-brand-black">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-xl w-full bg-white text-black p-16 text-center"
        >
          <div className="w-24 h-24 bg-brand-orange text-white flex items-center justify-center mx-auto mb-10">
            <CheckCircle size={48} />
          </div>
          <h1 className="text-5xl font-black tracking-tighter mb-4 uppercase">PEMBAYARAN BERHASIL</h1>
          <p className="text-black/60 font-bold uppercase tracking-widest text-[10px] mb-12 leading-relaxed">
            Terima kasih telah memilih Selvi Ayu Photobook. Kenangan Anda sedang dalam proses cetak berkualitas tinggi.
          </p>
          <div className="space-y-2">
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-black text-white py-6 font-black uppercase tracking-widest text-xs hover:bg-neutral-800 transition-all"
            >
              KEMBALI KE BERANDA
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-brand-black min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-20">
            <div>
              <h1 className="text-7xl lg:text-9xl font-black tracking-tighter mb-4 uppercase">CHECKOUT.</h1>
              <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold">SELESAIKAN PESANAN ANDA DENGAN AMAN.</p>
            </div>

            <div className="space-y-4">
               {/* Step 1: Authentication */}
              <div className={`p-10 border transition-all ${step >= 1 ? 'border-white/20 bg-neutral-900' : 'border-white/5 opacity-50'}`}>
                <div className="flex items-center gap-6 mb-10">
                  <span className="text-4xl font-black tracking-tighter text-brand-orange">01</span>
                  <h3 className="text-3xl font-black tracking-tighter uppercase">IDENTITAS</h3>
                </div>
                
                {user ? (
                  <div className="flex items-center gap-6 bg-white/5 p-6 border border-white/10">
                    <div className="w-12 h-12 bg-neutral-800 flex items-center justify-center font-black">SA</div>
                    <div>
                      <p className="font-black text-white uppercase tracking-tighter text-lg">{user.displayName}</p>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{user.email}</p>
                    </div>
                    <div className="ml-auto">
                      <CheckCircle className="text-brand-orange" size={24} />
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={handleLogin}
                    className="w-full bg-white text-black py-6 font-black flex items-center justify-center gap-3 uppercase tracking-widest text-xs hover:bg-neutral-200 transition-all"
                  >
                    LOGIN DENGAN GOOGLE
                  </button>
                )}
              </div>

              {/* Step 2: Shipping */}
              <div className={`p-10 border transition-all ${user && step >= 1 ? 'border-white/20 bg-neutral-900' : 'border-white/5 opacity-50'}`}>
                <div className="flex items-center gap-6 mb-10">
                  <span className="text-4xl font-black tracking-tighter text-brand-orange">02</span>
                  <h3 className="text-3xl font-black tracking-tighter uppercase">ALAMAT PENGIRIMAN</h3>
                </div>
                
                <div className="relative">
                  <textarea 
                    placeholder="MASUKKAN ALAMAT LENGKAP ANDA..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={!user}
                    className="w-full h-40 bg-white/5 border border-white/10 px-8 py-8 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-brand-orange disabled:cursor-not-allowed resize-none transition-all placeholder:text-white/10"
                  />
                </div>
              </div>

              {/* Step 3: Payment */}
              <div className={`p-10 border transition-all ${user && address.length > 5 ? 'border-white/20 bg-neutral-900' : 'border-white/5 opacity-50'}`}>
                <div className="flex items-center gap-6 mb-10">
                  <span className="text-4xl font-black tracking-tighter text-brand-orange">03</span>
                  <h3 className="text-3xl font-black tracking-tighter uppercase">PAYMENT GATEWAY</h3>
                </div>
                
                <div className="space-y-4">
                  <div 
                    onClick={() => user && address.length > 5 && setPaymentMethod('credit_card')}
                    className={`flex items-center gap-6 p-8 border cursor-pointer transition-all ${paymentMethod === 'credit_card' ? 'border-brand-orange bg-brand-orange/5' : 'border-white/5 hover:border-white/20'}`}
                  >
                    <div className={`w-6 h-6 border-2 flex items-center justify-center transition-all ${paymentMethod === 'credit_card' ? 'border-brand-orange' : 'border-white/20'}`}>
                      <div className={`w-2 h-2 bg-brand-orange transition-all ${paymentMethod === 'credit_card' ? 'scale-100' : 'scale-0'}`}></div>
                    </div>
                    <div className="flex-grow">
                      <p className="font-black text-white text-lg tracking-tighter uppercase">PEMBAYARAN ONLINE</p>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">CC, VIRTUAL ACCOUNT, E-WALLET</p>
                    </div>
                    <Lock size={16} className="text-white/20" />
                  </div>
                  
                  <div className="pt-8 flex flex-col gap-6">
                    <div className="flex items-center gap-2 text-[9px] text-white/20 font-black uppercase tracking-[0.3em] justify-center">
                      <ShieldCheck size={14} /> SECURED BY MIDTRANS GATEWAY
                    </div>
                    <button 
                      onClick={handlePlaceOrder}
                      disabled={!user || address.length < 5 || loading}
                      className="w-full bg-white text-black py-8 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 disabled:opacity-10 disabled:cursor-not-allowed hover:bg-neutral-200 transition-all"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                      ) : (
                        <>BAYAR SEKARANG • RP {total.toLocaleString('id-ID')}</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-32 h-fit space-y-1">
             <div className="bg-neutral-900 p-12 border border-white/5">
                <h3 className="text-3xl font-black tracking-tighter uppercase mb-12">PESANAN ANDA</h3>
                <div className="space-y-4 max-h-[40vh] overflow-y-auto mb-12 pr-4 scrollbar-hide">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-8 items-center border-b border-white/5 pb-4">
                      <div className="w-16 h-20 overflow-hidden shrink-0 border border-white/10">
                        <img src={item.imageUrl} alt="" className="w-full h-full object-cover grayscale" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-black text-white uppercase tracking-tighter">{item.title}</p>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">QTY: {item.quantity}</p>
                      </div>
                      <p className="font-black text-white tracking-tighter">RP {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-6 pt-10 border-t border-white/10">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                     <span>SUBTOTAL</span>
                     <span className="text-white">RP {total.toLocaleString('id-ID')}</span>
                   </div>
                   <div className="flex justify-between items-end pt-10">
                     <div className="w-full">
                       <p className="text-[10px] text-brand-orange uppercase font-black tracking-[0.3em] mb-2 underline underline-offset-4 decoration-brand-orange/20">TOTAL PEMBAYARAN</p>
                       <p className="text-5xl lg:text-7xl font-black tracking-tighter">RP {total.toLocaleString('id-ID')}</p>
                     </div>
                   </div>
                </div>
             </div>
             
             <div className="bg-white text-black p-8 flex justify-between items-center grayscale group">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">Payment Partners</p>
                <div className="flex gap-6 opacity-40 group-hover:opacity-100 transition-opacity">
                   <span className="font-black italic">VISA</span>
                   <span className="font-black italic">MASTERCARD</span>
                   <span className="font-black italic">MIDTRANS</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
