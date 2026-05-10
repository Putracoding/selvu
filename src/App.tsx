import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-brand-black text-white selection:bg-brand-orange selection:text-white">
            <Navbar />
            <main className="">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </main>
            
            <footer className="bg-brand-black py-24 border-t border-white/5">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-20">
                  <div className="max-w-md">
                    <p className="text-4xl font-black tracking-tighter text-white mb-6 uppercase">SELVI AYU.</p>
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] leading-loose mb-10">
                      XI TKJ 1 - KOLEKSI PORTFOLIO SPESIAL. MENGABADIKAN SETIAP MOMEN BERHARGA ANDA DALAM CETAKAN BERKUALITAS TINGGI DENGAN SENTUHAN ESTETIKA MODERN.
                    </p>
                    <div className="flex space-x-8 text-[9px] font-black uppercase tracking-[0.3em] text-white">
                      <a href="#" className="hover:text-brand-orange transition-colors">INSTAGRAM</a>
                      <a href="#" className="hover:text-brand-orange transition-colors">WHATSAPP</a>
                      <a href="#" className="hover:text-brand-orange transition-colors">EMAIL</a>
                    </div>
                  </div>
                  
                  <div className="lg:text-right">
                    <p className="text-[10px] text-white/20 uppercase font-black tracking-[0.4em] mb-4">
                      DESIGNED FOR THE BOLD
                    </p>
                    <p className="text-8xl font-black tracking-tighter opacity-10 uppercase select-none">
                      EST. 2024
                    </p>
                  </div>
                </div>
                
                <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                  <p className="text-[9px] text-white/30 uppercase font-black tracking-[0.4em]">
                    © 2024 SELVI AYU PHOTOBOOK. ALL RIGHTS RESERVED.
                  </p>
                  <p className="text-[9px] text-brand-orange uppercase font-black tracking-[0.4em]">
                    FROM XI TKJ 1 WITH PASSION
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
