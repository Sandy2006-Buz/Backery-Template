import { useState, useEffect } from 'react';
import { Cake, ShoppingCart, Menu, X, ShieldCheck } from 'lucide-react';
import { BAKERY_NAME } from '@/constants';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onAdminClick: () => void;
  isAdmin: boolean;
}

export default function Navbar({ cartCount, onCartClick, onAdminClick, isAdmin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Cakes', href: '#menu' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-creme-50/95 glass shadow-lg py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-berry-400 to-creme-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Cake className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-mint-400 rounded-full animate-pulse" />
            </div>
            <div className="text-left">
              <h1 className={`font-display font-bold text-lg sm:text-xl transition-colors ${scrolled ? 'text-cocoa-800' : 'text-cocoa-900'}`}>
                {BAKERY_NAME}
              </h1>
              <p className={`text-[10px] tracking-widest uppercase ${scrolled ? 'text-berry-500' : 'text-berry-600'} -mt-1`}>
                Bakery
              </p>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-medium relative group transition-colors ${
                  scrolled ? 'text-cocoa-600 hover:text-berry-500' : 'text-cocoa-700 hover:text-berry-500'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-berry-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onAdminClick}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isAdmin
                  ? 'bg-mint-400 text-white shadow-lg'
                  : scrolled
                    ? 'text-cocoa-600 hover:bg-cocoa-100'
                    : 'text-cocoa-700 hover:bg-cocoa-100'
              }`}
              title={isAdmin ? 'Admin Panel' : 'Admin Login'}
            >
              <ShieldCheck className="w-5 h-5" />
            </button>

            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full bg-gradient-to-br from-berry-400 to-berry-500 text-white shadow-lg hover:scale-110 hover:shadow-berry-400/50 transition-all duration-300 group"
              title="Cart"
            >
              <ShoppingCart className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-mint-400 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce-in shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ${
                scrolled ? 'text-cocoa-700 hover:bg-cocoa-100' : 'text-cocoa-800 hover:bg-cocoa-100'
              }`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-cocoa-900/40 animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-64 bg-creme-50 shadow-2xl animate-slide-in-right pt-20 px-6 flex flex-col gap-4">
            {navLinks.map((link, i) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-cocoa-700 font-medium py-3 border-b border-creme-200 hover:text-berry-500 hover:translate-x-2 transition-all duration-300"
                style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.08}s both` }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
