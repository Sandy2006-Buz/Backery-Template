import { useEffect, useRef } from 'react';
import { Cake, Heart, Cookie, Croissant, CakeSlice, Utensils, type LucideIcon } from 'lucide-react';
import type { Category } from '@/types';

interface CategoryBarProps {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Cake,
  Heart,
  Cookie,
  Croissant,
  CakeSlice,
};

export default function CategoryBar({ categories, selectedId, onSelect }: CategoryBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div className="sticky top-16 z-30 bg-creme-50/90 glass py-4 shadow-sm">
      <div
        ref={scrollRef}
        className="flex items-center gap-3 px-4 sm:px-6 overflow-x-auto scrollbar-hide max-w-7xl mx-auto"
      >
        <button
          onClick={() => onSelect(null)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium whitespace-nowrap transition-all duration-300 hover:scale-105 ${
            selectedId === null
              ? 'bg-gradient-to-r from-berry-400 to-berry-500 text-white shadow-lg'
              : 'bg-white text-cocoa-600 border border-creme-200 hover:border-berry-300'
          }`}
        >
          <Utensils className="w-4 h-4" />
          All Items
        </button>

        {categories.map((cat, i) => {
          const Icon = iconMap[cat.icon] ?? Cookie;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium whitespace-nowrap transition-all duration-300 hover:scale-105 ${
                selectedId === cat.id
                  ? 'bg-gradient-to-r from-berry-400 to-berry-500 text-white shadow-lg'
                  : 'bg-white text-cocoa-600 border border-creme-200 hover:border-berry-300'
              }`}
              style={{ animation: `fadeInRight 0.4s ease-out ${i * 0.05}s both` }}
            >
              <Icon className="w-4 h-4" />
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
