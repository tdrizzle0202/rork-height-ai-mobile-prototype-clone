import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mbxczvculaayodnnpatf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ieGN6dmN1bGFheW9kbm5wYXRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NjE0NTEsImV4cCI6MjA3NDQzNzQ1MX0.lRhrewIUmZeQneTd6aehQsff82kfe-FMyN6BkbMUUL8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
        