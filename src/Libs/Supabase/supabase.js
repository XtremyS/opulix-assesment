import { createClient } from "@supabase/supabase-js";

const SupaBaseUrl = process.env.NEXT_PUBLIC_APP_SUPABASE_URL;
const SupaBaseKey = process.env.NEXT_PUBLIC_APP_SUPABASE_KEY;
const SupaBase = createClient(SupaBaseUrl, SupaBaseKey);

export default SupaBase;
