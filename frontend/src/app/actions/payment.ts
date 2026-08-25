'use server'

import Razorpay from 'razorpay'
import crypto from 'crypto'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { validateCoupon } from '@/app/actions/store'

export async function createRazorpayOrder(amountInINR: number, cartItems: any[] = [], promoCode?: string) {
  try {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keyId || !keySecret) {
      console.error('Razorpay Error: Missing NEXT_PUBLIC_RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET environment variables.')
      return { error: 'Razorpay API credentials not configured in environment.' }
    }

    let verifiedAmount = amountInINR;

    // Server-side Price & Stock Availability Verification
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      const supabase = await createClient()
      const productIds = cartItems
        .map(i => i.productId || i.id)
        .filter(Boolean)

      if (productIds.length > 0) {
        const { data: dbProducts } = await supabase
          .from('products')
          .select('id, name, price, stock')
          .in('id', productIds)

        // Check for out-of-stock items
        for (const item of cartItems) {
          const pid = item.productId || item.id
          const dbProd = (dbProducts || []).find((p: any) => p.id === pid)
          if (dbProd && dbProd.stock !== undefined && dbProd.stock !== null) {
            const reqQty = Number(item.quantity || 1)
            if (dbProd.stock < reqQty) {
              return { error: `Sorry, "${dbProd.name}" is currently out of stock (only ${dbProd.stock} available). Please adjust your cart quantity.` }
            }
          }
        }

        const productMap = new Map<string, number>((dbProducts || []).map((p: any) => [p.id, Number(p.price)]))

        let serverTotal = 0
        for (const item of cartItems) {
          const pid = item.productId || item.id
          const dbPrice = productMap.get(pid) ?? Number(item.price || 0)
          let itemTotal = Number(dbPrice) * Number(item.quantity || 1)
          if (item.giftingOptions?.giftWrap) itemTotal += 250
          if (item.giftingOptions?.greetingCard) itemTotal += 150
          serverTotal += itemTotal
        }

        if (promoCode) {
          const promoRes = await validateCoupon(promoCode, serverTotal)
          if (promoRes.success && promoRes.netTotal !== undefined) {
            serverTotal = promoRes.netTotal
          }
        }

        if (serverTotal > 0) {
          verifiedAmount = serverTotal
        }
      }
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    })

    const options = {
      amount: Math.max(100, Math.round(verifiedAmount * 100)), // Amount in paise (min 100 paise = ₹1)
      currency: 'INR',
      receipt: `rcpt_${Date.now().toString().slice(-8)}`
    }

    const order = await razorpay.orders.create(options)
    return { 
      success: true, 
      orderId: order.id, 
      amount: order.amount, 
      currency: order.currency 
    }
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error)
    return { error: error?.message || 'Failed to initialize payment.' }
  }
}

export async function verifyAndCreateOrder(data: {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
  shippingDetails: {
    recipient_name: string
    recipient_email: string
    recipient_phone?: string
    recipient_alternate_phone?: string
    recipient_address: string
    landmark?: string
    city?: string
    state?: string
    pincode?: string
    delivery_instructions?: string
    sender_name?: string
    sender_phone?: string
    sender_email?: string
    billing_address?: string
    total_amount: number
  }
  cartItems: any[]
}) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keySecret) {
      return { error: 'Payment secret not configured in environment.' }
    }

    // 1. Cryptographic HMAC-SHA256 Signature Verification
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`)
      .digest('hex')

    if (expectedSignature !== data.razorpay_signature) {
      return { error: 'Payment verification failed: Invalid transaction signature.' }
    }

    // 2. Insert verified order into Supabase
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'User session expired. Please log in.' }
    }

    const { shippingDetails, cartItems } = data

    const rawAddress = shippingDetails.recipient_address || ''
    const landmark = shippingDetails.landmark || ''
    const city = shippingDetails.city || ''
    const state = shippingDetails.state || ''
    const pincode = shippingDetails.pincode || ''
    const fullRecipientAddress = city && pincode && !rawAddress.includes(pincode)
      ? `${rawAddress}${landmark ? `, Near ${landmark}` : ''}, ${city}, ${state ? `${state} ` : ''}- ${pincode}`
      : rawAddress

    // GST Tax Calculation (18% inclusive tax breakdown)
    const totalAmount = Number(shippingDetails.total_amount)
    const subtotal = Math.round((totalAmount / 1.18) * 100) / 100
    const gstAmount = Math.round((totalAmount - subtotal) * 100) / 100

    const orderData: any = {
      user_id: user.id,
      recipient_name: shippingDetails.recipient_name,
      recipient_email: shippingDetails.recipient_email,
      recipient_phone: shippingDetails.recipient_phone || null,
      recipient_alternate_phone: shippingDetails.recipient_alternate_phone || null,
      recipient_address: fullRecipientAddress,
      landmark: landmark || null,
      city: city || null,
      state: state || null,
      pincode: pincode || null,
      delivery_instructions: shippingDetails.delivery_instructions || null,
      sender_name: shippingDetails.sender_name || null,
      sender_phone: shippingDetails.sender_phone || null,
      sender_email: shippingDetails.sender_email || null,
      billing_address: shippingDetails.billing_address || fullRecipientAddress,
      razorpay_order_id: data.razorpay_order_id,
      razorpay_payment_id: data.razorpay_payment_id,
      subtotal: subtotal,
      gst_amount: gstAmount,
      total_amount: totalAmount,
      status: 'Processing'
    }

    let { data: insertedOrder, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select('id')
      .single()

    if (orderError) {
      // Fallback for legacy columns
      const legacyOrderData = {
        user_id: user.id,
        recipient_name: orderData.recipient_name,
        recipient_email: orderData.recipient_email,
        recipient_address: `${orderData.recipient_address} | Phone: ${orderData.recipient_phone || 'N/A'} (Alt: ${orderData.recipient_alternate_phone || 'N/A'}) | Sender: ${orderData.sender_name || 'N/A'} (${orderData.sender_phone || 'N/A'}) | Instructions: ${orderData.delivery_instructions || 'None'}`,
        total_amount: orderData.total_amount,
        status: 'Processing'
      }
      const retry = await supabase.from('orders').insert(legacyOrderData).select('id').single()
      if (retry.error) {
        return { error: retry.error.message }
      }
      insertedOrder = retry.data
    }

    if (insertedOrder && Array.isArray(cartItems) && cartItems.length > 0) {
      const orderItemsData = cartItems.map((item: any) => ({
        order_id: insertedOrder.id,
        product_id: (item.productId || item.id) ? (item.productId || item.id).toString() : null,
        product_name: item.title || 'Luxury Gift Item',
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
        const fallbackItems = orderItemsData.map(({ image, greeting_card, ...rest }) => rest)
        await supabase.from('order_items').insert(fallbackItems)
      }

      // Automatic Inventory Stock Deduction
      for (const item of cartItems) {
        const pid = item.productId || item.id
        const qtyPurchased = Number(item.quantity || 1)
        if (pid) {
          const { data: pData } = await supabase
            .from('products')
            .select('stock')
            .eq('id', pid)
            .single()

          if (pData && pData.stock !== undefined && pData.stock !== null) {
            const updatedStock = Math.max(0, Number(pData.stock) - qtyPurchased)
            await supabase
              .from('products')
              .update({ stock: updatedStock })
              .eq('id', pid)
          }
        }
      }
    }

    revalidatePath('/account')
    revalidatePath('/admin')

    return { 
      success: true, 
      orderId: insertedOrder?.id 
    }

  } catch (error: any) {
    console.error('Error verifying payment and saving order:', error)
    return { error: error?.message || 'Failed to complete order after payment.' }
  }
}


