'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  const rawRedirectTo = formData.get('redirectTo') as string | null;
  const redirectTo = (rawRedirectTo && rawRedirectTo.startsWith('/') && !rawRedirectTo.startsWith('//')) ? rawRedirectTo : '/discover';
  revalidatePath('/', 'layout');
  redirect(redirectTo);
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const headersList = await headers()
  const host = headersList.get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const origin = headersList.get('origin') || (host ? `${protocol}://${host}` : null) || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const email = formData.get('email') as string
  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string

  const data = {
    email,
    password: formData.get('password') as string,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`.trim(),
        newsletter: formData.get('newsletter') === 'on',
      },
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent('/account?tab=profile')}`,
    }
  }

  const { data: authData, error } = await supabase.auth.signUp(data)

  if (error) {
    if (error.message.toLowerCase().includes('already registered') || error.message.toLowerCase().includes('user already exists')) {
      return { error: 'An account with this email already exists. Please sign in instead.' }
    }
    return { error: error.message }
  }

  // Supabase returns an empty identities array when a pre-existing user attempts to register again
  if (authData?.user && authData.user.identities && authData.user.identities.length === 0) {
    return { error: 'An account with this email already exists. Please sign in instead.' }
  }

  // If no immediate session was returned, Supabase dispatched an email verification link
  if (!authData?.session) {
    return { success: true, email }
  }

  const rawRedirectTo = formData.get('redirectTo') as string | null;
  const redirectTo = (rawRedirectTo && rawRedirectTo.startsWith('/') && !rawRedirectTo.startsWith('//')) ? rawRedirectTo : '/account?tab=profile';
  revalidatePath('/', 'layout');
  redirect(redirectTo);
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function requestPasswordReset(formData: FormData) {
  const supabase = await createClient()
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = host?.includes('localhost') ? 'http' : 'https'
  const origin = headersList.get('origin') || (host ? `${protocol}://${host}` : null) || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const email = formData.get('email') as string
  if (!email || !email.includes('@')) {
    return { error: 'Please enter a valid email address.' }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=${encodeURIComponent('/reset-password')}`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || password.length < 6) {
    return { error: 'Password must be at least 6 characters long.' }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/login?resetSuccess=true')
}

