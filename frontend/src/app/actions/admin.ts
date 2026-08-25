'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

async function checkAdminAccess(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false;

  if (user.email?.toLowerCase() === 'mayankrajdto@gmail.com') return true;

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  return Boolean(profile?.is_admin);
}

export async function uploadProduct(formData: FormData) {
  const supabase = await createClient()
  
  // Verify Admin Access
  if (!(await checkAdminAccess(supabase))) {
    return { error: 'Unauthorized. Admin access required.' }
  }

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const compareAtPrice = formData.get('compare_at_price') ? parseFloat(formData.get('compare_at_price') as string) : null
  const stock = parseInt(formData.get('stock') as string) || 0
  const sku = formData.get('sku') as string || null
  const intent = formData.get('intent') as string
  
  const features = formData.getAll('features').filter(f => f.toString().trim() !== '') as string[]
  const images = formData.getAll('images') as File[]

  if (!name || !description || isNaN(price) || !intent || images.length === 0) {
    return { error: 'Required fields (Name, Description, Price, Intent, at least 1 Image) are missing.' }
  }

  try {
    const imageUrls: string[] = []

    // Upload each image
    for (const image of images) {
      if (image.size === 0) continue
      
      const fileExt = image.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, image)

      if (uploadError) {
        console.error('Upload error:', uploadError)
        return { error: 'Failed to upload image. Make sure the products bucket exists and is public.' }
      }

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(fileName)
        
      imageUrls.push(publicUrl)
    }

    if (imageUrls.length === 0) {
      return { error: 'No valid images were uploaded.' }
    }

    // Insert into Database
    const { error: dbError } = await supabase
      .from('products')
      .insert({
        name,
        description,
        price,
        compare_at_price: compareAtPrice,
        stock,
        sku,
        intent,
        features,
        images: imageUrls
      })

    if (dbError) {
      console.error('Database error:', dbError)
      return { error: 'Failed to save product details to database.' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
    
  } catch (error) {
    console.error('Unexpected error:', error)
    return { error: 'An unexpected error occurred.' }
  }
}

export async function getProducts() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    
  if (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
  
  return data || []
}

export async function getAllOrders() {
  const supabase = await createClient()
  
  if (!(await checkAdminAccess(supabase))) {
    return []
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch orders:', error)
    return []
  }

  return data || []
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
  const supabase = await createClient()
  
  if (!(await checkAdminAccess(supabase))) {
    return { error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  return { success: true }
}

export async function updateOrderCourierTracking(orderId: string, courierName: string, trackingNumber: string) {
  const supabase = await createClient()
  
  if (!(await checkAdminAccess(supabase))) {
    return { error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('orders')
    .update({ 
      courier_name: courierName, 
      tracking_number: trackingNumber,
      status: 'Shipped' 
    })
    .eq('id', orderId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  return { success: true }
}

export async function getAllSupportTickets() {
  const supabase = await createClient()
  
  if (!(await checkAdminAccess(supabase))) {
    return []
  }

  const { data, error } = await supabase
    .from('support_tickets')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch support tickets:', error)
    return []
  }

  return data || []
}

export async function updateTicketStatus(ticketId: string, newStatus: string) {
  const supabase = await createClient()
  
  if (!(await checkAdminAccess(supabase))) {
    return { error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('support_tickets')
    .update({ status: newStatus })
    .eq('id', ticketId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  return { success: true }
}

export async function deleteProduct(productId: string) {
  const supabase = await createClient()
  
  if (!(await checkAdminAccess(supabase))) {
    return { error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function updateProductDetails(productId: string, updates: { price?: number, stock?: number }) {
  const supabase = await createClient()
  
  if (!(await checkAdminAccess(supabase))) {
    return { error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', productId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function getAllCoupons() {
  const supabase = await createClient()
  
  if (!(await checkAdminAccess(supabase))) {
    return []
  }

  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch coupons:', error)
    return []
  }

  return data || []
}

export async function createNewCoupon(formData: FormData) {
  const supabase = await createClient()
  
  if (!(await checkAdminAccess(supabase))) {
    return { error: 'Unauthorized' }
  }

  const code = formData.get('code')?.toString().trim().toUpperCase()
  const discountType = formData.get('discount_type')?.toString() || 'percent'
  const discountValue = Number(formData.get('discount_value'))
  const minOrderAmount = Number(formData.get('min_order_amount')) || 0

  if (!code || isNaN(discountValue) || discountValue <= 0) {
    return { error: 'Please enter a valid coupon code and discount amount.' }
  }

  const { error } = await supabase
    .from('coupons')
    .insert({
      code,
      discount_type: discountType,
      discount_value: discountValue,
      min_order_amount: minOrderAmount,
      is_active: true
    })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  return { success: true }
}

export async function toggleCouponStatus(couponId: string, isActive: boolean) {
  const supabase = await createClient()
  
  if (!(await checkAdminAccess(supabase))) {
    return { error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('coupons')
    .update({ is_active: isActive })
    .eq('id', couponId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  return { success: true }
}


