import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  'https://feqykhbsmflxevsgdyxb.supabase.co';

const supabaseAnonKey = 
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlcXlraGJzbWZseGV2c2dkeXhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxMzg0MzMsImV4cCI6MjEwMDcxNDQzM30.B4gKjbS3GCVWUrXW1lYNtM9QRYL_s6fQTM1Q0p7UYOA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
