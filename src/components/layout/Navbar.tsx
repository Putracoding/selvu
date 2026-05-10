import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { cart } = useCart();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/#categories' },
    { name: 'About', path: '/#about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between h-24 items-end pb-6">
          <div className="flex-shrink-0">
            <Link to="/" className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter leading-none text-brand-white">
                SELVI AYU
              </span>
              <span className="text-[10px] font-light tracking-[0.3em] text-white/50 underline underline-offset-4">
                STUDIO XI TKJ 1
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10 text-[10px] uppercase tracking-[0.2em] font-bold">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white/60 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-6 border-l border-white/10 pl-8">
              <Link to="/cart" className="relative text-white/60 hover:text-white transition-colors">
                <span className={location.pathname === '/cart' ? 'text-brand-orange underline underline-offset-4' : ''}>
                  Keranjang ({cartCount})
                </span>
              </Link>

              {user ? (
                <div className="flex items-center space-x-4">
                  <button onClick={() => signOut(auth)} className="text-white/40 hover:text-white">
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleLogin}
                  className="bg-white text-black px-6 py-2 hover:bg-white/80 transition-all font-black"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-gray-600">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-black focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-lg font-medium text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-50 flex flex-col gap-4">
                 {user ? (
                   <button onClick={() => { signOut(auth); setIsOpen(false); }} className="w-full text-left text-red-500 font-medium">
                     Logout
                   </button>
                 ) : (
                   <button onClick={() => { handleLogin(); setIsOpen(false); }} className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                     <User size={18} /> Login with Google
                   </button>
                 )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
