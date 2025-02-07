import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://pmxvowexrntcjobtgjzk.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBteHZvd2V4cm50Y2pvYnRnanprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0NTE5MDYsImV4cCI6MjA1NDAyNzkwNn0.TqXCVbW4a1Mp05Hv-8DjONOLz1rZX4gEBMCVI3bXY5I'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
