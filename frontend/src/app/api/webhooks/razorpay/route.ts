import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET

    if (!webhookSecret) {
      console.error('Razorpay Webhook Error: Missing RAZORPAY_WEBHOOK_SECRET in environment.')
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    const signature = request.headers.get('x-razorpay-signature')
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature header' }, { status: 400 })
    }

    const rawBody = await request.text()
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex')

    if (expectedSignature !== signature) {
      console.error('Razorpay Webhook Error: Invalid signature')
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
    }

    const payload = JSON.parse(rawBody)
    const event = payload.event

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = payload.payload?.payment?.entity || payload.payload?.order?.entity
      const razorpayOrderId = paymentEntity?.order_id
      const razorpayPaymentId = paymentEntity?.id

      if (razorpayOrderId) {
        const supabase = await createClient()
        
        // Update order status if order already exists
        const { data: existingOrder } = await supabase
          .from('orders')
          .select('id')
          .eq('razorpay_order_id', razorpayOrderId)
          .single()

        if (existingOrder) {
          await supabase
            .from('orders')
            .update({ 
              status: 'Processing',
              razorpay_payment_id: razorpayPaymentId 
            })
            .eq('id', existingOrder.id)
        }
      }
    }

    return NextResponse.json({ status: 'success' }, { status: 200 })
  } catch (error: any) {
    console.error('Razorpay Webhook exception:', error)
    return NextResponse.json({ error: error.message || 'Webhook processing failed' }, { status: 500 })
  }
}
