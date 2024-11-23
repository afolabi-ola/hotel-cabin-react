import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://mzfimxeobcppdggjnpmg.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16ZmlteGVvYmNwcGRnZ2pucG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwODU2MzksImV4cCI6MjA0NjY2MTYzOX0.scgYcPsmNPDEgAc37bQ3ijF7lBU712moQ96gzgWfts8';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
