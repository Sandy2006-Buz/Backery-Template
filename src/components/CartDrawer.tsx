import { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart, MessageCircle } from 'lucide-react';
import type { CartItem } from '@/types';
import { formatPrice, WHATSAPP_NUMBER } from '@/constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQty, onRemove }: CartDrawerProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? (subtotal >= 1000 ? 0 : 50) : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    const itemList = items
      .map((i) => `• ${i.product.name} x${i.quantity} = ${formatPrice(i.product.price * i.quantity)}`)
      .join('\n');
    const message = `Hello ${'Sweet Crumb Bakery'}! I'd like to place an order:\n\n${itemList}\n\nSubtotal: ${formatPrice(subtotal)}\nDelivery: ${deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}\nTotal: ${formatPrice(total)}\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}`;
    const url = `https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-cocoa-900/60 animate-fade-in" onClick={onClose} />

      <div className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-creme-50 shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-creme-200">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-berry-500" />
            <h2 className="font-display font-bold text-xl text-cocoa-800">
              {showCheckout ? 'Checkout' : 'Your Cart'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-creme-100 hover:bg-berry-400 hover:text-white flex items-center justify-center transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 rounded-full bg-creme-100 flex items-center justify-center mb-4 animate-bounce-in">
              <ShoppingCart className="w-12 h-12 text-creme-400" />
            </div>
            <p className="text-cocoa-500 font-medium text-lg mb-1">Your cart is empty</p>
            <p className="text-cocoa-400 text-sm">Add some delicious treats to get started!</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-3 bg-berry-500 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300"
            >
              Browse Cakes
            </button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 bg-white rounded-2xl p-3 shadow-sm animate-fade-in-up"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-cocoa-800 text-sm line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-berry-500 font-bold mt-1">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-creme-100 rounded-full p-1">
                        <button
                          onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-white hover:bg-berry-400 hover:text-white flex items-center justify-center transition-all active:scale-90"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-cocoa-800 text-sm w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-white hover:bg-berry-400 hover:text-white flex items-center justify-center transition-all active:scale-90"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(item.product.id)}
                        className="text-cocoa-400 hover:text-berry-500 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-bold text-cocoa-800">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-creme-200 p-4 space-y-3 bg-white/60">
              <div className="space-y-1.5">
                <div className="flex justify-between text-cocoa-500 text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-cocoa-500 text-sm">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
                </div>
                {subtotal < 1000 && subtotal > 0 && (
                  <p className="text-mint-600 text-xs">
                    Add {formatPrice(1000 - subtotal)} more for FREE delivery!
                  </p>
                )}
                <div className="flex justify-between font-bold text-cocoa-800 text-lg pt-1.5 border-t border-creme-200">
                  <span>Total</span>
                  <span className="text-berry-500">{formatPrice(total)}</span>
                </div>
              </div>

              {showCheckout ? (
                <div className="space-y-3 animate-fade-in-up">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-creme-200 bg-white text-cocoa-800 placeholder:text-cocoa-300 focus:outline-none focus:ring-2 focus:ring-berry-400 transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-creme-200 bg-white text-cocoa-800 placeholder:text-cocoa-300 focus:outline-none focus:ring-2 focus:ring-berry-400 transition-all"
                  />
                  <textarea
                    placeholder="Delivery Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-creme-200 bg-white text-cocoa-800 placeholder:text-cocoa-300 focus:outline-none focus:ring-2 focus:ring-berry-400 transition-all resize-none"
                  />
                  <button
                    onClick={handleCheckout}
                    disabled={!name.trim() || !phone.trim() || !address.trim()}
                    className="w-full py-3.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Send Order on WhatsApp
                  </button>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="w-full py-2 text-cocoa-500 text-sm font-medium hover:text-berry-500 transition-colors"
                  >
                    Back to Cart
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-berry-400 to-berry-500 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-lg hover:shadow-berry-400/40 transition-all duration-300 active:scale-95"
                >
                  Proceed to Checkout
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
