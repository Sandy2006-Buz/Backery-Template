import { useState } from 'react';
import { Star, Quote, MessageSquarePlus, Check, X, Reply } from 'lucide-react';
import type { Review } from '@/types';

interface ReviewsSectionProps {
  reviews: Review[];
  onSubmit: (review: Omit<Review, 'id' | 'date' | 'reply' | 'repliedAt'>) => void;
}

export default function ReviewsSection({ reviews, onSubmit }: ReviewsSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    onSubmit({ name: name.trim(), rating, comment: comment.trim() });
    setSubmitted(true);
    setName('');
    setComment('');
    setRating(5);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 2000);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const displayName = (i: number) => String.fromCharCode(65 + (i % 26));

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-creme-50 to-creme-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-berry-500 font-medium tracking-widest text-sm uppercase">Testimonials</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-cocoa-800 mt-2">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-creme-500 fill-creme-500" />
              ))}
            </div>
            <span className="text-cocoa-700 font-bold text-2xl">{avgRating}</span>
            <span className="text-cocoa-400">({reviews.length} reviews)</span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both` }}
            >
              <Quote className="absolute top-4 right-4 w-12 h-12 text-creme-200" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-berry-400 to-creme-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {displayName(i)}
                </div>
                <div>
                  <h4 className="font-semibold text-cocoa-800">{review.name}</h4>
                  <p className="text-cocoa-400 text-xs">{formatDate(review.date)}</p>
                </div>
              </div>

              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-4 h-4 ${
                      idx < review.rating
                        ? 'text-creme-500 fill-creme-500'
                        : 'text-creme-200'
                    }`}
                  />
                ))}
              </div>

              <p className="text-cocoa-600 text-sm leading-relaxed mb-4">
                "{review.comment}"
              </p>

              {review.reply && (
                <div className="bg-mint-50 border border-mint-200 rounded-2xl p-4 ml-4 relative animate-fade-in">
                  <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-mint-200 border-b-8 border-b-transparent" />
                  <div className="flex items-center gap-2 mb-1">
                    <Reply className="w-4 h-4 text-mint-600" />
                    <span className="text-mint-700 font-semibold text-xs">
                      Sweet Crumb replied
                    </span>
                  </div>
                  <p className="text-mint-800 text-xs leading-relaxed">{review.reply}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add review button / form */}
        {!showForm ? (
          <div className="text-center">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-berry-400 to-berry-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-berry-400/40 transition-all duration-300"
            >
              <MessageSquarePlus className="w-5 h-5" />
              Write a Review
            </button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 animate-scale-in">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-mint-100 flex items-center justify-center mx-auto mb-4 animate-bounce-in">
                  <Check className="w-10 h-10 text-mint-600" />
                </div>
                <h3 className="font-display font-bold text-2xl text-cocoa-800 mb-2">
                  Thank You!
                </h3>
                <p className="text-cocoa-500">Your review has been submitted.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-bold text-2xl text-cocoa-800">
                    Share Your Experience
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="w-9 h-9 rounded-full bg-creme-100 hover:bg-berry-400 hover:text-white flex items-center justify-center transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-cocoa-600 font-medium text-sm mb-2">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl border border-creme-200 bg-creme-50 text-cocoa-800 placeholder:text-cocoa-300 focus:outline-none focus:ring-2 focus:ring-berry-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-cocoa-600 font-medium text-sm mb-2">Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="transition-all duration-200 hover:scale-125 active:scale-90"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= (hoverRating || rating)
                                ? 'text-creme-500 fill-creme-500'
                                : 'text-creme-200'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-cocoa-600 ml-2 font-medium">
                        {rating} star{rating !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-cocoa-600 font-medium text-sm mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                      rows={4}
                      placeholder="Tell us about your experience..."
                      className="w-full px-4 py-3 rounded-xl border border-creme-200 bg-creme-50 text-cocoa-800 placeholder:text-cocoa-300 focus:outline-none focus:ring-2 focus:ring-berry-400 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-berry-400 to-berry-500 text-white font-semibold rounded-xl hover:scale-[1.02] hover:shadow-lg transition-all duration-300 active:scale-95"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
