import { useState } from 'react';
import {
  X, Lock, LayoutDashboard, Package, Tag, Star, Plus, Edit2, Trash2,
  Save, ArrowLeft, Search, Reply, Eye, EyeOff, Check,
} from 'lucide-react';
import type { Product, Category, Review } from '@/types';
import { formatPrice, ADMIN_PASSWORD } from '@/constants';

interface AdminPanelProps {
  isOpen: boolean;
  isAdmin: boolean;
  onLogin: (success: boolean) => void;
  onClose: () => void;
  products: Product[];
  categories: Category[];
  reviews: Review[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (id: string, product: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onDeleteCategory: (id: string) => void;
  onReplyReview: (id: string, reply: string) => void;
  onDeleteReview: (id: string) => void;
}

type Tab = 'dashboard' | 'products' | 'categories' | 'reviews';

export default function AdminPanel(props: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<Tab>('dashboard');

  if (!props.isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      props.onLogin(true);
      setError('');
    } else {
      setError('Incorrect password. Try again.');
    }
  };

  if (!props.isAdmin) {
    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-cocoa-900/70 animate-fade-in" onClick={props.onClose} />
        <div className="relative bg-creme-50 rounded-3xl shadow-2xl p-8 max-w-md w-full animate-scale-in">
          <button
            onClick={props.onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-creme-100 hover:bg-berry-400 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-berry-400 to-creme-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-display font-bold text-2xl text-cocoa-800">Admin Login</h2>
            <p className="text-cocoa-400 text-sm mt-1">Enter password to manage your bakery</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Admin password"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-creme-200 bg-white text-cocoa-800 placeholder:text-cocoa-300 focus:outline-none focus:ring-2 focus:ring-berry-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cocoa-400 hover:text-berry-500 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && <p className="text-berry-500 text-sm text-center animate-fade-in">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-berry-400 to-berry-500 text-white font-semibold rounded-xl hover:scale-[1.02] hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              Login
            </button>
            <p className="text-cocoa-300 text-xs text-center">Default password: admin123</p>
          </form>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'reviews', label: 'Reviews', icon: Star },
  ];

  return (
    <div className="fixed inset-0 z-[70] bg-creme-50 animate-fade-in overflow-y-auto">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-cocoa-900 text-creme-50 px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-berry-400 to-creme-500 flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <h2 className="font-display font-bold text-lg sm:text-xl">Admin Panel</h2>
        </div>
        <button
          onClick={() => { props.onLogin(false); props.onClose(); }}
          className="flex items-center gap-2 px-4 py-2 bg-cocoa-700 hover:bg-berry-500 rounded-full text-sm font-medium transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Exit
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar tabs */}
        <div className="md:w-56 flex-shrink-0">
          <div className="flex md:flex-col gap-2 bg-white rounded-2xl p-2 shadow-md overflow-x-auto scrollbar-hide">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                  tab === t.id
                    ? 'bg-gradient-to-r from-berry-400 to-berry-500 text-white shadow-lg'
                    : 'text-cocoa-600 hover:bg-creme-100'
                }`}
              >
                <t.icon className="w-5 h-5" />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {tab === 'dashboard' && <DashboardTab {...props} />}
          {tab === 'products' && <ProductsTab {...props} />}
          {tab === 'categories' && <CategoriesTab {...props} />}
          {tab === 'reviews' && <ReviewsTab {...props} />}
        </div>
      </div>
    </div>
  );
}

// ---------- Dashboard ----------
function DashboardTab({ products, categories, reviews }: AdminPanelProps) {
  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'from-berry-400 to-berry-500' },
    { label: 'Categories', value: categories.length, icon: Tag, color: 'from-creme-400 to-creme-500' },
    { label: 'Reviews', value: reviews.length, icon: Star, color: 'from-mint-400 to-mint-500' },
    { label: 'Avg Rating', value: reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '5.0', icon: Star, color: 'from-cocoa-400 to-cocoa-500' },
  ];

  const pendingReplies = reviews.filter(r => !r.reply);

  return (
    <div className="space-y-6">
      <h3 className="font-display font-bold text-2xl text-cocoa-800">Dashboard Overview</h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300"
            style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.1}s both` }}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="font-display font-bold text-3xl text-cocoa-800">{stat.value}</p>
            <p className="text-cocoa-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {pendingReplies.length > 0 && (
        <div className="bg-berry-50 border border-berry-200 rounded-2xl p-5">
          <h4 className="font-semibold text-berry-700 mb-2 flex items-center gap-2">
            <Reply className="w-5 h-5" />
            {pendingReplies.length} review{pendingReplies.length !== 1 ? 's' : ''} awaiting your reply
          </h4>
          <p className="text-berry-600 text-sm">Head to the Reviews tab to respond to your customers.</p>
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h4 className="font-display font-semibold text-lg text-cocoa-800 mb-4">Recent Reviews</h4>
        <div className="space-y-3">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="border-l-4 border-creme-300 pl-4 py-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-cocoa-700 text-sm">{review.name}</span>
                <span className="text-creme-500 text-sm">{'★'.repeat(review.rating)}</span>
              </div>
              <p className="text-cocoa-500 text-xs mt-1 line-clamp-1">{review.comment}</p>
              {!review.reply && (
                <span className="text-berry-500 text-xs font-medium mt-1 inline-block">Needs reply</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Products ----------
function ProductsTab({ products, categories, onAddProduct, onUpdateProduct, onDeleteProduct }: AdminPanelProps) {
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const blankProduct: Omit<Product, 'id'> = {
    name: '', description: '', price: 0, categoryId: categories[0]?.id ?? '',
    image: '', isVeg: true, isBestseller: false, available: true,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="font-display font-bold text-2xl text-cocoa-800">Manage Products</h3>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-berry-400 to-berry-500 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300"
        >
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cocoa-300" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-creme-200 bg-white text-cocoa-800 placeholder:text-cocoa-300 focus:outline-none focus:ring-2 focus:ring-berry-400 transition-all"
        />
      </div>

      {showForm && (
        <ProductForm
          product={editing}
          categories={categories}
          onSave={(data) => {
            if (editing) {
              onUpdateProduct(editing.id, data);
            } else {
              onAddProduct(data);
            }
            setShowForm(false);
            setEditing(null);
          }}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => {
          const cat = categories.find(c => c.id === product.categoryId);
          return (
            <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all">
              <div className="relative h-36">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {!product.available && (
                  <div className="absolute inset-0 bg-cocoa-900/60 flex items-center justify-center">
                    <span className="text-creme-50 text-sm font-bold">Unavailable</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-medium text-cocoa-800 text-sm line-clamp-1">{product.name}</h4>
                <p className="text-berry-500 font-bold mt-1">{formatPrice(product.price)}</p>
                <p className="text-cocoa-400 text-xs">{cat?.name ?? 'No category'}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => { setEditing(product); setShowForm(true); }}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-creme-100 hover:bg-creme-200 text-cocoa-700 text-sm font-medium rounded-lg transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => { if (confirm(`Delete "${product.name}"?`)) onDeleteProduct(product.id); }}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-berry-50 hover:bg-berry-100 text-berry-600 text-sm font-medium rounded-lg transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-cocoa-400 py-12">No products found.</p>
      )}
    </div>
  );
}

function ProductForm({ product, categories, onSave, onCancel }: {
  product: Product | null;
  categories: Category[];
  onSave: (data: Omit<Product, 'id'>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(product?.name ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [price, setPrice] = useState(product?.price ?? 0);
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? categories[0]?.id ?? '');
  const [image, setImage] = useState(product?.image ?? '');
  const [isVeg, setIsVeg] = useState(product?.isVeg ?? true);
  const [isBestseller, setIsBestseller] = useState(product?.isBestseller ?? false);
  const [available, setAvailable] = useState(product?.available ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, description, price, categoryId, image, isVeg, isBestseller, available });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg space-y-4 animate-scale-in">
      <h4 className="font-display font-bold text-lg text-cocoa-800">
        {product ? 'Edit Product' : 'Add New Product'}
      </h4>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-cocoa-600 text-sm font-medium mb-1">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required
            className="w-full px-3 py-2 rounded-lg border border-creme-200 bg-creme-50 focus:outline-none focus:ring-2 focus:ring-berry-400" />
        </div>
        <div>
          <label className="block text-cocoa-600 text-sm font-medium mb-1">Price (₹)</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required min={0}
            className="w-full px-3 py-2 rounded-lg border border-creme-200 bg-creme-50 focus:outline-none focus:ring-2 focus:ring-berry-400" />
        </div>
      </div>
      <div>
        <label className="block text-cocoa-600 text-sm font-medium mb-1">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={2}
          className="w-full px-3 py-2 rounded-lg border border-creme-200 bg-creme-50 focus:outline-none focus:ring-2 focus:ring-berry-400 resize-none" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-cocoa-600 text-sm font-medium mb-1">Category</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-creme-200 bg-creme-50 focus:outline-none focus:ring-2 focus:ring-berry-400">
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-cocoa-600 text-sm font-medium mb-1">Image URL</label>
          <input value={image} onChange={(e) => setImage(e.target.value)} required placeholder="https://..."
            className="w-full px-3 py-2 rounded-lg border border-creme-200 bg-creme-50 focus:outline-none focus:ring-2 focus:ring-berry-400" />
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={isVeg} onChange={(e) => setIsVeg(e.target.checked)}
            className="w-4 h-4 accent-mint-500" />
          <span className="text-cocoa-600 text-sm">Veg</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={isBestseller} onChange={(e) => setIsBestseller(e.target.checked)}
            className="w-4 h-4 accent-berry-500" />
          <span className="text-cocoa-600 text-sm">Bestseller</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)}
            className="w-4 h-4 accent-creme-500" />
          <span className="text-cocoa-600 text-sm">Available</span>
        </label>
      </div>
      <div className="flex gap-3">
        <button type="submit"
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-mint-400 to-mint-500 text-white font-semibold rounded-xl hover:scale-105 transition-all">
          <Save className="w-4 h-4" /> Save
        </button>
        <button type="button" onClick={onCancel}
          className="px-6 py-2.5 bg-creme-100 hover:bg-creme-200 text-cocoa-700 font-medium rounded-xl transition-all">
          Cancel
        </button>
      </div>
    </form>
  );
}

// ---------- Categories ----------
function CategoriesTab({ categories, products, onAddCategory, onDeleteCategory }: AdminPanelProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Cookie');

  const iconOptions = ['BirthdayCake', 'Heart', 'Cookie', 'Croissant', 'CakeSlice'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddCategory({ name: name.trim(), description: description.trim(), icon });
    setName('');
    setDescription('');
    setIcon('Cookie');
  };

  return (
    <div className="space-y-6">
      <h3 className="font-display font-bold text-2xl text-cocoa-800">Manage Categories</h3>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-md space-y-4">
        <h4 className="font-display font-semibold text-lg text-cocoa-800">Add New Category</h4>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-cocoa-600 text-sm font-medium mb-1">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Donuts"
              className="w-full px-3 py-2 rounded-lg border border-creme-200 bg-creme-50 focus:outline-none focus:ring-2 focus:ring-berry-400" />
          </div>
          <div>
            <label className="block text-cocoa-600 text-sm font-medium mb-1">Icon</label>
            <select value={icon} onChange={(e) => setIcon(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-creme-200 bg-creme-50 focus:outline-none focus:ring-2 focus:ring-berry-400">
              {iconOptions.map(ic => <option key={ic} value={ic}>{ic}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-cocoa-600 text-sm font-medium mb-1">Description</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description"
              className="w-full px-3 py-2 rounded-lg border border-creme-200 bg-creme-50 focus:outline-none focus:ring-2 focus:ring-berry-400" />
          </div>
        </div>
        <button type="submit"
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-berry-400 to-berry-500 text-white font-semibold rounded-xl hover:scale-105 transition-all">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, i) => {
          const count = products.filter(p => p.categoryId === cat.id).length;
          return (
            <div key={cat.id}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all"
              style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.08}s both` }}>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-display font-semibold text-cocoa-800">{cat.name}</h4>
                  <p className="text-cocoa-400 text-xs mt-1">{cat.description}</p>
                  <p className="text-berry-500 text-sm font-medium mt-2">{count} product{count !== 1 ? 's' : ''}</p>
                </div>
                <button
                  onClick={() => {
                    if (count > 0) { alert('Cannot delete: products exist in this category.'); return; }
                    if (confirm(`Delete category "${cat.name}"?`)) onDeleteCategory(cat.id);
                  }}
                  className="p-2 text-berry-400 hover:bg-berry-50 rounded-lg transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Reviews ----------
function ReviewsTab({ reviews, onReplyReview, onDeleteReview }: AdminPanelProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleReply = (id: string) => {
    if (!replyText.trim()) return;
    onReplyReview(id, replyText.trim());
    setReplyingTo(null);
    setReplyText('');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-display font-bold text-2xl text-cocoa-800">Customer Reviews & Feedback</h3>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-berry-400 to-creme-500 flex items-center justify-center text-white font-bold">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-cocoa-800">{review.name}</h4>
                    <p className="text-cocoa-400 text-xs">{formatDate(review.date)}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className={`w-4 h-4 ${idx < review.rating ? 'text-creme-500 fill-creme-500' : 'text-creme-200'}`} />
                ))}
              </div>
            </div>

            <p className="text-cocoa-600 text-sm mb-3">{review.comment}</p>

            {review.reply && (
              <div className="bg-mint-50 border border-mint-200 rounded-xl p-3 mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <Check className="w-4 h-4 text-mint-600" />
                  <span className="text-mint-700 font-semibold text-xs">Your reply</span>
                </div>
                <p className="text-mint-800 text-xs">{review.reply}</p>
              </div>
            )}

            {replyingTo === review.id ? (
              <div className="space-y-2 animate-fade-in">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={2}
                  placeholder="Type your reply..."
                  className="w-full px-3 py-2 rounded-lg border border-creme-200 bg-creme-50 text-cocoa-800 text-sm focus:outline-none focus:ring-2 focus:ring-berry-400 resize-none"
                />
                <div className="flex gap-2">
                  <button onClick={() => handleReply(review.id)}
                    className="flex items-center gap-1 px-4 py-1.5 bg-mint-500 text-white text-sm font-medium rounded-lg hover:scale-105 transition-all">
                    <Reply className="w-3.5 h-3.5" /> Send Reply
                  </button>
                  <button onClick={() => { setReplyingTo(null); setReplyText(''); }}
                    className="px-4 py-1.5 bg-creme-100 text-cocoa-600 text-sm font-medium rounded-lg hover:bg-creme-200 transition-all">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                {!review.reply && (
                  <button onClick={() => { setReplyingTo(review.id); setReplyText(''); }}
                    className="flex items-center gap-1 px-4 py-1.5 bg-berry-50 hover:bg-berry-100 text-berry-600 text-sm font-medium rounded-lg transition-all">
                    <Reply className="w-3.5 h-3.5" /> Reply
                  </button>
                )}
                <button onClick={() => { if (confirm('Delete this review?')) onDeleteReview(review.id); }}
                  className="flex items-center gap-1 px-4 py-1.5 bg-creme-100 hover:bg-berry-50 text-cocoa-500 hover:text-berry-600 text-sm font-medium rounded-lg transition-all">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <p className="text-center text-cocoa-400 py-12">No reviews yet.</p>
      )}
    </div>
  );
}
