'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function submitCheckout(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to checkout' }
  }

  const orderData = {
    user_id: user.id,
    recipient_name: formData.get('recipient_name') as string,
    recipient_email: formData.get('recipient_email') as string,
    recipient_address: formData.get('recipient_address') as string,
    total_amount: Number(formData.get('total_amount')),
    status: 'Processing'
  }

  const { error } = await supabase.from('orders').insert(orderData)

  if (error) {
    return { error: error.message }
  }

  redirect('/checkout/success')
}

export async function submitConcierge(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const ticketData = {
    user_id: user?.id || null, // Allow guest submissions
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
  }

  const { error } = await supabase.from('support_tickets').insert(ticketData)

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to update profile' }
  }

  const profileData = {
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    phone: formData.get('phone') as string,
  }

  const { error } = await supabase.from('profiles').update(profileData).eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/manage-info')
  return { success: true }
}

export async function submitPrivacyRequest(formData: FormData) {
  // Simulate an async request to a privacy endpoint
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return { success: true };
}
