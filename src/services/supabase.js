import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://fwoqjdxsmoabhbyhhjfk.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3b3FqZHhzbW9hYmhieWhoamZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg3MzExNTUsImV4cCI6MjAwNDMwNzE1NX0.h-zIzSm311SdLzW5t-HrcpspEHW70X_b_pCZFyEYTwI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
