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

  const rawAddress = formData.get('recipient_address') as string;
  const landmark = (formData.get('landmark') as string) || '';
  const city = (formData.get('city') as string) || '';
  const state = (formData.get('state') as string) || '';
  const pincode = (formData.get('pincode') as string) || '';
  const fullRecipientAddress = city && pincode && !rawAddress.includes(pincode)
    ? `${rawAddress}${landmark ? `, Near ${landmark}` : ''}, ${city}, ${state ? `${state} ` : ''}- ${pincode}`
    : rawAddress;

  const orderData: any = {
    user_id: user.id,
    recipient_name: formData.get('recipient_name') as string,
    recipient_email: formData.get('recipient_email') as string,
    recipient_phone: (formData.get('recipient_phone') as string) || null,
    recipient_alternate_phone: (formData.get('recipient_alternate_phone') as string) || null,
    recipient_address: fullRecipientAddress,
    landmark: landmark || null,
    city: city || null,
    state: state || null,
    pincode: pincode || null,
    delivery_instructions: (formData.get('delivery_instructions') as string) || null,
    sender_name: (formData.get('sender_name') as string) || null,
    sender_phone: (formData.get('sender_phone') as string) || null,
    sender_email: (formData.get('sender_email') as string) || null,
    billing_address: (formData.get('billing_address') as string) || fullRecipientAddress,
    total_amount: Number(formData.get('total_amount')),
    status: 'Processing'
  }

  // Attempt insert with all fields; if schema lacks new columns yet, fallback gracefully
  let { data: insertedOrder, error } = await supabase.from('orders').insert(orderData).select('id').single()

  if (error) {
    // Graceful fallback for basic legacy schema
    const legacyOrderData = {
      user_id: user.id,
      recipient_name: orderData.recipient_name,
      recipient_email: orderData.recipient_email,
      recipient_address: `${orderData.recipient_address} | Phone: ${orderData.recipient_phone || 'N/A'} (Alt: ${orderData.recipient_alternate_phone || 'N/A'}) | Sender: ${orderData.sender_name || 'N/A'} (${orderData.sender_phone || 'N/A'}) | Instructions: ${orderData.delivery_instructions || 'None'}`,
      total_amount: orderData.total_amount,
      status: 'Processing'
    };
    const retry = await supabase.from('orders').insert(legacyOrderData).select('id').single();
    if (retry.error) {
      return { error: retry.error.message };
    }
    insertedOrder = retry.data;
  }

  const cartItemsRaw = formData.get('cart_items') as string | null
  if (cartItemsRaw && insertedOrder) {
    try {
      const items = JSON.parse(cartItemsRaw)
      if (Array.isArray(items) && items.length > 0) {
        const orderItemsData = items.map((item: any) => ({
          order_id: insertedOrder.id,
          product_id: (item.productId || item.id) ? (item.productId || item.id).toString() : null,
          product_name: item.title || 'Gift Item',
          image: item.image || null,
          price: item.price || 0,
          quantity: item.quantity || 1,
          gift_wrap: Boolean(item.giftingOptions?.giftWrap),
          greeting_card: Boolean(item.giftingOptions?.greetingCard),
          gift_message: item.giftingOptions?.giftMessage || null,
          delivery_date: item.giftingOptions?.deliveryDate || null
        }))

        const itemsRes = await supabase.from('order_items').insert(orderItemsData)
        if (itemsRes.error) {
          // Fallback without image/greeting_card if columns not yet added
          const fallbackItems = orderItemsData.map(({ image, greeting_card, ...rest }) => rest);
          await supabase.from('order_items').insert(fallbackItems);
        }
      }
    } catch (err) {
      console.error('Failed to parse and record cart items:', err)
    }
  }

  revalidatePath('/account');
  redirect(`/checkout/success${insertedOrder?.id ? `?orderId=${encodeURIComponent(insertedOrder.id)}` : ''}`);
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
