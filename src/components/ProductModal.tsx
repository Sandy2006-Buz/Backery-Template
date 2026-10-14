import { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingCart, Star, Flame, Leaf, Check } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice } from '@/constants';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setAdded(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-cocoa-900/70 animate-fade-in" onClick={onClose} />

      <div className="relative bg-creme-50 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:bg-berry-500 hover:text-white transition-all duration-300"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden md:rounded-l-3xl">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isBestseller && (
                <span className="flex items-center gap-1 px-3 py-1 bg-berry-500 text-white text-xs font-bold rounded-full shadow-lg">
                  <Flame className="w-3 h-3" /> Bestseller
                </span>
              )}
              {product.isVeg && (
                <span className="flex items-center justify-center w-7 h-7 bg-white/90 rounded-md border-2 border-mint-500 shadow-md">
                  <Leaf className="w-4 h-4 text-mint-600" />
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col">
            <h2 className="font-display font-bold text-2xl text-cocoa-800 mb-2">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-creme-500 fill-creme-500" />
                ))}
              </div>
              <span className="text-cocoa-400 text-sm">(124 reviews)</span>
            </div>

            <p className="text-cocoa-600 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-bold text-3xl text-berry-500">
                  {formatPrice(product.price)}
                </span>

                {/* Quantity selector */}
                <div className="flex items-center gap-3 bg-white rounded-full p-1 shadow-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full bg-creme-100 hover:bg-berry-400 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-cocoa-800 w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full bg-creme-100 hover:bg-berry-400 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 text-cocoa-500 text-sm">
                <span>Total</span>
                <span className="font-bold text-cocoa-800 text-lg">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>

              <button
                onClick={handleAdd}
                disabled={!product.available || added}
                className={`w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${
                  added
                    ? 'bg-mint-500 text-white'
                    : 'bg-gradient-to-r from-berry-400 to-berry-500 text-white hover:shadow-lg hover:shadow-berry-400/40 hover:scale-[1.02]'
                } disabled:opacity-50`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    {product.available ? 'Add to Cart' : 'Out of Stock'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
