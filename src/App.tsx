import { useState, useMemo, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import type { Product, Category, Review, CartItem } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { initialProducts, initialCategories, initialReviews } from '@/data/initialData';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryBar from '@/components/CategoryBar';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import CartDrawer from '@/components/CartDrawer';
import ReviewsSection from '@/components/ReviewsSection';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import AdminPanel from '@/components/AdminPanel';

function App() {
  const [products, setProducts] = useLocalStorage<Product[]>('sc_products', initialProducts);
  const [categories, setCategories] = useLocalStorage<Category[]>('sc_categories', initialCategories);
  const [reviews, setReviews] = useLocalStorage<Review[]>('sc_reviews', initialReviews);
  const [cart, setCart] = useLocalStorage<CartItem[]>('sc_cart', []);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((p) => p.categoryId === selectedCategory);
  }, [products, selectedCategory]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`${product.name} added to cart!`);
  }, [setCart, showToast]);

  const updateCartQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity: qty } : item
        )
      );
    }
  }, [setCart]);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, [setCart]);

  // Product CRUD
  const handleAddProduct = useCallback((data: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...data, id: `prod-${Date.now()}` };
    setProducts((prev) => [...prev, newProduct]);
    showToast('Product added!');
  }, [setProducts, showToast]);

  const handleUpdateProduct = useCallback((id: string, data: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    showToast('Product updated!');
  }, [setProducts, showToast]);

  const handleDeleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted.');
  }, [setProducts, showToast]);

  // Category CRUD
  const handleAddCategory = useCallback((data: Omit<Category, 'id'>) => {
    const newCat: Category = { ...data, id: `cat-${Date.now()}` };
    setCategories((prev) => [...prev, newCat]);
    showToast('Category added!');
  }, [setCategories, showToast]);

  const handleDeleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Category deleted.');
  }, [setCategories, showToast]);

  // Review management
  const handleAddReview = useCallback((data: Omit<Review, 'id' | 'date' | 'reply' | 'repliedAt'>) => {
    const newReview: Review = {
      ...data,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      reply: null,
      repliedAt: null,
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Review submitted! Thank you.');
  }, [setReviews, showToast]);

  const handleReplyReview = useCallback((id: string, reply: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, reply, repliedAt: new Date().toISOString().split('T')[0] }
          : r
      )
    );
    showToast('Reply sent!');
  }, [setReviews, showToast]);

  const handleDeleteReview = useCallback((id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Review deleted.');
  }, [setReviews, showToast]);

  const handleNavClick = useCallback((href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-creme-50">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onAdminClick={() => setAdminOpen(true)}
        isAdmin={isAdmin}
      />

      <Hero />

      {/* Menu section */}
      <section id="menu" className="py-16 bg-creme-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-berry-500 font-medium tracking-widest text-sm uppercase flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Our Menu
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-cocoa-800 mt-2">
              Delicious Treats for Every Occasion
            </h2>
            <p className="text-cocoa-500 mt-3 max-w-xl mx-auto">
              Browse our selection of freshly baked cakes, cupcakes, and pastries. All items are baked fresh daily with premium ingredients.
            </p>
          </div>
        </div>
      </section>

      <CategoryBar
        categories={categories}
        selectedId={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <section className="py-10 bg-creme-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onClick={setModalProduct}
                index={index}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-cocoa-400 text-lg">No products in this category yet.</p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="mt-4 px-6 py-2.5 bg-berry-500 text-white font-semibold rounded-full hover:scale-105 transition-all"
              >
                View All Items
              </button>
            </div>
          )}
        </div>
      </section>

      <ReviewsSection reviews={reviews} onSubmit={handleAddReview} />

      <Footer onNavClick={handleNavClick} />

      {/* Overlays */}
      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onAddToCart={addToCart}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateCartQty}
        onRemove={removeFromCart}
      />

      <FloatingButtons />

      <AdminPanel
        isOpen={adminOpen}
        isAdmin={isAdmin}
        onLogin={setIsAdmin}
        onClose={() => setAdminOpen(false)}
        products={products}
        categories={categories}
        reviews={reviews}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        onReplyReview={handleReplyReview}
        onDeleteReview={handleDeleteReview}
      />

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] px-6 py-3 bg-cocoa-800 text-creme-50 rounded-full shadow-2xl animate-bounce-in flex items-center gap-2 text-sm font-medium">
          <Sparkles className="w-4 h-4 text-creme-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
