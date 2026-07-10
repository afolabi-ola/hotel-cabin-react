import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = process.env.ADMIN_SUPABASE_URL;
const supabaseKey = process.env.ADMIN_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
