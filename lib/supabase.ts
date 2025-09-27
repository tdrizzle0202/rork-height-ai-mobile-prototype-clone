import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

console.log('Environment variables:')
console.log('- EXPO_PUBLIC_SUPABASE_URL:', supabaseUrl || 'MISSING')
console.log('- EXPO_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'MISSING')
console.log('- All env vars:', Object.keys(process.env).filter(key => key.startsWith('EXPO_PUBLIC')))

if (!supabaseUrl) {
  throw new Error(`Missing EXPO_PUBLIC_SUPABASE_URL environment variable. Available env vars: ${Object.keys(process.env).filter(key => key.startsWith('EXPO_PUBLIC')).join(', ')}`)
}

if (!supabaseAnonKey) {
  throw new Error('Missing EXPO_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Test connection
supabase.from('height_results').select('count', { count: 'exact', head: true })
  .then(({ error }) => {
    if (error) {
      console.error('Supabase connection test failed:', error.message)
    } else {
      console.log('Supabase connection test successful')
    }
  })
        