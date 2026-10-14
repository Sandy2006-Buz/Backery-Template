import { useEffect, useState } from 'react';
import { Sparkles, ChevronDown, Star, Cake, Cookie, Croissant } from 'lucide-react';
import { BAKERY_NAME, BAKERY_TAGLINE } from '@/constants';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToMenu = () => {
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cocoa-900/70 via-cocoa-800/50 to-creme-50/90" />

      {/* Floating decorative icons */}
      <div className="absolute top-1/4 left-[10%] hidden lg:block animate-float">
        <Cake className="w-16 h-16 text-creme-200/30" />
      </div>
      <div className="absolute top-1/3 right-[12%] hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
        <Cookie className="w-12 h-12 text-creme-200/30" />
      </div>
      <div className="absolute bottom-1/4 left-[15%] hidden lg:block animate-float" style={{ animationDelay: '2s' }}>
        <Croissant className="w-14 h-14 text-creme-200/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-creme-50/15 glass border border-creme-200/30 mb-6 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <Sparkles className="w-4 h-4 text-creme-300 animate-wiggle" />
          <span className="text-creme-100 text-xs sm:text-sm font-medium tracking-wide">
            Freshly Baked Every Morning
          </span>
        </div>

        <h1
          className={`font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-creme-50 mb-4 leading-tight transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="block">{BAKERY_NAME}</span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-creme-300 via-berry-300 to-creme-400 bg-clip-text text-transparent mt-2">
            Bakery
          </span>
        </h1>

        <p
          className={`text-creme-200 text-lg sm:text-xl md:text-2xl mb-2 font-body font-light transition-all duration-700 delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {BAKERY_TAGLINE}
        </p>

        {/* Rating stars */}
        <div
          className={`flex items-center justify-center gap-1 mb-8 transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-5 h-5 text-creme-300 fill-creme-300"
              style={{ animation: mounted ? `bounceIn 0.5s ease-out ${0.4 + i * 0.1}s both` : '' }}
            />
          ))}
          <span className="text-creme-200 text-sm ml-2">Loved by 500+ happy customers</span>
        </div>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={scrollToMenu}
            className="group px-8 py-4 bg-gradient-to-r from-berry-400 to-berry-500 text-creme-50 font-semibold rounded-full shadow-2xl hover:shadow-berry-400/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
          >
            Explore Our Cakes
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-creme-50/15 glass border-2 border-creme-200/40 text-creme-50 font-semibold rounded-full hover:bg-creme-50/25 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Our Story
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-creme-200/50 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-creme-200 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
