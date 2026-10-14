import { Star, Plus, Flame, Leaf } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice } from '@/constants';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClick: (product: Product) => void;
  index: number;
}

export default function ProductCard({ product, onAddToCart, onClick, index }: ProductCardProps) {
  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
      style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both` }}
      onClick={() => onClick(product)}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isBestseller && (
            <span className="flex items-center gap-1 px-3 py-1 bg-berry-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
              <Flame className="w-3 h-3" />
              Bestseller
            </span>
          )}
          {product.isVeg && (
            <span className="flex items-center justify-center w-7 h-7 bg-white/90 rounded-md border-2 border-mint-500 shadow-md">
              <Leaf className="w-4 h-4 text-mint-600" />
            </span>
          )}
        </div>

        {!product.available && (
          <div className="absolute inset-0 bg-cocoa-900/60 flex items-center justify-center">
            <span className="text-creme-50 font-bold text-lg">Out of Stock</span>
          </div>
        )}

        {/* Quick add button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={!product.available}
          className="absolute bottom-3 right-3 w-11 h-11 bg-berry-500 text-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 hover:scale-110 hover:bg-berry-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Add to cart"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-cocoa-800 text-lg leading-tight mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-cocoa-500 text-sm line-clamp-2 mb-3 h-10">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-creme-500 fill-creme-500" />
            <span className="text-cocoa-400 text-sm font-medium">4.{Math.floor(Math.random() * 4) + 5}</span>
          </div>
          <span className="font-display font-bold text-xl text-berry-500">
            {formatPrice(product.price)}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={!product.available}
          className="w-full mt-3 py-2.5 bg-gradient-to-r from-creme-400 to-creme-500 text-cocoa-900 font-semibold rounded-xl hover:from-berry-400 hover:to-berry-500 hover:text-white transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
