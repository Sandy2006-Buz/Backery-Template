import { Cake, Heart, Sparkles, Clock, MapPin, Phone, Mail, Instagram, MessageCircle } from 'lucide-react';
import { BAKERY_NAME, BAKERY_TAGLINE, WHATSAPP_NUMBER, INSTAGRAM_URL, formatPrice } from '@/constants';

interface FooterProps {
  onNavClick: (href: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const stats = [
    { label: 'Happy Customers', value: '500+' },
    { label: 'Cakes Baked', value: '10,000+' },
    { label: 'Years of Love', value: '8' },
    { label: 'Daily Fresh Items', value: '50+' },
  ];

  return (
    <>
      {/* About section */}
      <section id="about" className="py-20 bg-gradient-to-b from-creme-100 to-creme-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-berry-200 rounded-3xl -rotate-3" />
              <img
                src="https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=900&h=700"
                alt="Our bakery"
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[400px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-creme-400 to-berry-400 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-2xl text-cocoa-800">100%</p>
                    <p className="text-cocoa-400 text-xs">Made with Love</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-berry-500 font-medium tracking-widest text-sm uppercase">Our Story</span>
              <h2 className="font-display font-black text-4xl md:text-5xl text-cocoa-800 mt-2 mb-6 leading-tight">
                Baking Happiness Since 2018
              </h2>
              <p className="text-cocoa-600 leading-relaxed mb-4">
                At {BAKERY_NAME} Bakery, every cake tells a story. What started as a small home kitchen
                has grown into a beloved bakery serving our community with the finest artisan cakes,
                cupcakes, and pastries.
              </p>
              <p className="text-cocoa-600 leading-relaxed mb-6">
                We use only the freshest ingredients, bake everything daily, and pour our hearts into
                every creation. From birthday celebrations to wedding dreams, we are here to make
                your special moments unforgettable.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-2xl p-4 shadow-md text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both` }}
                  >
                    <p className="font-display font-bold text-2xl text-berry-500">{stat.value}</p>
                    <p className="text-cocoa-400 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="bg-cocoa-900 text-creme-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-berry-400 to-creme-500 flex items-center justify-center">
                  <Cake className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-creme-50">{BAKERY_NAME}</h3>
                  <p className="text-creme-300 text-[10px] tracking-widest uppercase -mt-1">Bakery</p>
                </div>
              </div>
              <p className="text-creme-300 text-sm leading-relaxed mb-4">
                {BAKERY_TAGLINE}. Freshly baked treats for every occasion.
              </p>
              <div className="flex items-center gap-1 text-creme-300">
                <Sparkles className="w-4 h-4 text-creme-400" />
                <span className="text-sm">Award-winning bakery</span>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-display font-semibold text-creme-50 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'Our Cakes', href: '#menu' },
                  { label: 'Reviews', href: '#reviews' },
                  { label: 'About Us', href: '#about' },
                ].map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => onNavClick(link.href)}
                      className="text-creme-300 text-sm hover:text-berry-400 hover:translate-x-1 transition-all duration-300"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="font-display font-semibold text-creme-50 mb-4">Get in Touch</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-creme-300 text-sm">
                  <MapPin className="w-5 h-5 text-berry-400 flex-shrink-0 mt-0.5" />
                  <span>123 Cake Street, Bakery Lane, Mumbai, India 400001</span>
                </li>
                <li className="flex items-center gap-3 text-creme-300 text-sm">
                  <Phone className="w-5 h-5 text-berry-400 flex-shrink-0" />
                  <span>+91 {WHATSAPP_NUMBER}</span>
                </li>
                <li className="flex items-center gap-3 text-creme-300 text-sm">
                  <Mail className="w-5 h-5 text-berry-400 flex-shrink-0" />
                  <span>hello@sweetcrumb.in</span>
                </li>
                <li className="flex items-center gap-3 text-creme-300 text-sm">
                  <Clock className="w-5 h-5 text-berry-400 flex-shrink-0" />
                  <span>Open daily: 8 AM - 9 PM</span>
                </li>
              </ul>
            </div>

            {/* Social + delivery */}
            <div>
              <h4 className="font-display font-semibold text-creme-50 mb-4">Connect With Us</h4>
              <div className="flex items-center gap-3 mb-6">
                <a
                  href={`https://wa.me/91${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-all duration-300"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] via-[#d62976] via-[#962fbf] to-[#4f5bd5] flex items-center justify-center hover:scale-110 transition-all duration-300"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              </div>
              <div className="bg-cocoa-800 rounded-2xl p-4">
                <p className="text-creme-300 text-xs mb-1">Free delivery on orders above</p>
                <p className="font-display font-bold text-2xl text-creme-50">{formatPrice(1000)}</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-cocoa-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-creme-400 text-sm">
              © 2026 {BAKERY_NAME} Bakery. All rights reserved.
            </p>
            <p className="text-creme-400 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-berry-400 fill-berry-400" /> in India
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
