import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminClient from './AdminClient'
import GlobalNav from '@/components/layout/GlobalNav'
import { getAllOrders, getAllSupportTickets } from '@/app/actions/admin'

export default async function AdminPage() {
  const supabase = await createClient()
  
  // 1. Check Auth & Email
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user || user.email?.toLowerCase() !== 'mayankrajdto@gmail.com') {
    redirect('/')
  }

  // 2. Fetch Existing Products, Orders, and Tickets
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  const orders = await getAllOrders()
  const supportTickets = await getAllSupportTickets()

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <header className="w-full bg-white border-b border-gray-100 hidden lg:block relative z-40">
        <GlobalNav />
      </header>
      
      <main className="flex-1 w-full bg-[#faf9f6]">
        <AdminClient initialProducts={products || []} initialOrders={orders} initialTickets={supportTickets} />
      </main>
    </div>
  )
}

