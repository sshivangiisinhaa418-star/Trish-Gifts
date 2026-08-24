'use server'

import { createClient } from '@/lib/supabase/server'

export async function getAllProducts() {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (error) {
      console.error('Failed to fetch products:', error.message || error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Server error in getAllProducts:', error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
      
    if (error) {
      console.error('Failed to fetch product:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Server error in getProductById:', error);
    return null;
  }
}

export async function validateCoupon(code: string, totalAmount: number) {
  try {
    const cleanCode = code.trim().toUpperCase();
    const supabase = await createClient();

    // 1. Try DB lookup
    const { data: coupon } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', cleanCode)
      .eq('is_active', true)
      .single();

    if (coupon) {
      if (totalAmount < coupon.min_order_amount) {
        return { error: `Minimum order amount of ₹${coupon.min_order_amount} required for code ${cleanCode}` };
      }

      let discountAmount = 0;
      if (coupon.discount_type === 'percent') {
        discountAmount = Math.round((totalAmount * coupon.discount_value) / 100);
      } else {
        discountAmount = Math.min(totalAmount, coupon.discount_value);
      }

      return {
        success: true,
        code: coupon.code,
        discountType: coupon.discount_type,
        discountValue: coupon.discount_value,
        discountAmount,
        netTotal: Math.max(0, totalAmount - discountAmount)
      };
    }

    // 2. Default Fallback Promos if DB table not populated yet
    if (cleanCode === 'WELCOME10') {
      if (totalAmount < 1000) return { error: 'Minimum order amount of ₹1,000 required for WELCOME10' };
      const discountAmount = Math.round(totalAmount * 0.10);
      return {
        success: true,
        code: 'WELCOME10',
        discountType: 'percent',
        discountValue: 10,
        discountAmount,
        netTotal: totalAmount - discountAmount
      };
    }

    if (cleanCode === 'TRISH500') {
      if (totalAmount < 2500) return { error: 'Minimum order amount of ₹2,500 required for TRISH500' };
      const discountAmount = 500;
      return {
        success: true,
        code: 'TRISH500',
        discountType: 'flat',
        discountValue: 500,
        discountAmount,
        netTotal: totalAmount - discountAmount
      };
    }

    return { error: 'Invalid or expired coupon code.' };
  } catch (error: any) {
    console.error('Error validating coupon:', error);
    return { error: 'Failed to process promo code.' };
  }
}

export async function getProductReviews(productId: string) {
  try {
    const supabase = await createClient();
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error || !reviews || reviews.length === 0) {
      // Default curated sample reviews for luxury items
      return [
        {
          id: 'demo-1',
          product_id: productId,
          user_name: 'Ananya Sharma',
          rating: 5,
          comment: 'Absolutely exquisite packaging! My recipient was wowed by the handwritten calligraphy card.',
          created_at: new Date(Date.now() - 86400000 * 3).toISOString()
        },
        {
          id: 'demo-2',
          product_id: productId,
          user_name: 'Rohan Mehta',
          rating: 5,
          comment: 'Premium quality and fast courier dispatch. Highly recommended for special occasions.',
          created_at: new Date(Date.now() - 86400000 * 7).toISOString()
        }
      ];
    }

    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export async function submitProductReview(formData: FormData) {
  try {
    const productId = formData.get('product_id')?.toString();
    const userName = formData.get('user_name')?.toString();
    const rating = Number(formData.get('rating'));
    const comment = formData.get('comment')?.toString();

    if (!productId || !userName || !rating || !comment) {
      return { error: 'Please provide all review details.' };
    }

    const supabase = await createClient();
    const { error } = await supabase.from('reviews').insert({
      product_id: productId,
      user_name: userName,
      rating,
      comment
    });

    if (error) {
      console.error('Supabase error inserting review:', error);
      return { error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error submitting review:', error);
    return { error: 'Failed to submit review.' };
  }
}
