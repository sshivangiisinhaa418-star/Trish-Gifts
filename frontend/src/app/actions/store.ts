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
