import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = 'https://mmhrgtgolpnrqiemlhog.supabase.co';
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1taHJndGdvbHBucnFpZW1saG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxNTYwNjUsImV4cCI6MjA0MzczMjA2NX0.rDFHa6aIrxTxs1nzRrh6uaOxIA9i7nimHaF--PoBIYk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
