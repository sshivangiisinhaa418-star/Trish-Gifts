"use client";

import { useState } from "react";
import { Star, MessageSquare, CheckCircle2, User } from "lucide-react";
import { submitProductReview } from "@/app/actions/store";

export default function ProductReviews({ productId, initialReviews }: { productId: string; initialReviews: any[] }) {
  const [reviews, setReviews] = useState<any[]>(initialReviews);
  const [rating, setRating] = useState(5);
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + Number(r.rating || 5), 0) / reviews.length).toFixed(1)
    : "5.0";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("user_name", userName);
    formData.append("rating", rating.toString());
    formData.append("comment", comment);

    const res = await submitProductReview(formData);
    if (res?.success) {
      setReviews([
        {
          id: `new-${Date.now()}`,
          product_id: productId,
          user_name: userName,
          rating,
          comment,
          created_at: new Date().toISOString()
        },
        ...reviews
      ]);
      setUserName("");
      setComment("");
      setRating(5);
      setSuccessMessage("Thank you! Your verified review has been published.");
    } else {
      alert(res?.error || "Failed to submit review.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="mt-16 pt-12 border-t border-stone-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl text-gray-900 font-semibold" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Customer Reviews & Ratings
          </h2>
          <p className="text-xs text-gray-500 font-light mt-1">Authentic feedback from verified luxury gift buyers</p>
        </div>

        <div className="flex items-center gap-4 bg-stone-50 border border-stone-200 p-4 rounded-2xl">
          <div className="flex items-center gap-1.5">
            <span className="text-3xl font-bold text-gray-900">{avgRating}</span>
            <div className="flex items-center text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`w-4 h-4 ${s <= Math.round(Number(avgRating)) ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}`} />
              ))}
            </div>
          </div>
          <div className="h-8 w-px bg-stone-200"></div>
          <span className="text-xs text-gray-500 font-medium">{reviews.length} Verified {reviews.length === 1 ? 'Review' : 'Reviews'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Reviews List */}
        <div className="lg:col-span-2 space-y-6">
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <div key={rev.id} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-[#500000] font-bold text-xs">
                      {rev.user_name?.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-1.5">
                        {rev.user_name}
                        <span className="text-[10px] text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-medium inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-green-600" /> Verified Buyer
                        </span>
                      </h4>
                      <p className="text-[10px] text-gray-400 font-light mt-0.5">
                        {new Date(rev.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-500 gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}`} />
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-700 font-normal leading-relaxed italic font-serif bg-stone-50/60 p-3.5 rounded-xl border border-stone-100">
                  "{rev.comment}"
                </p>
              </div>
            ))
          ) : (
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 text-center text-gray-500 font-light text-sm">
              No reviews yet for this product. Be the first to share your experience!
            </div>
          )}
        </div>

        {/* Right Column: Write a Review Form */}
        <div>
          <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 sticky top-6">
            <h3 className="text-xl text-gray-900 font-semibold" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              Write a Review
            </h3>

            {successMessage && (
              <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs font-medium leading-relaxed">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-700 uppercase tracking-widest block mb-2">Overall Rating *</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${s <= rating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-800 ml-2">{rating} / 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-700 uppercase tracking-widest block mb-1.5">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm text-black font-semibold placeholder:text-gray-400 focus:outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-700 uppercase tracking-widest block mb-1.5">Your Experience / Feedback *</label>
                <textarea
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about the unboxing, fragrance, or recipient's reaction..."
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm font-serif text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-900 h-28 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#500000] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-colors shadow-md disabled:opacity-50"
              >
                {isSubmitting ? "Submitting Review..." : "Publish Review"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
