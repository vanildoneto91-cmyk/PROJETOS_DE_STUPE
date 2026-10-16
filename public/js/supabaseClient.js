const SUPABASE_URL = 'https://krwrdpzpvyfvyoqpuvmm.supabase.co';

const SUPABASE_ANON_KEY = 'sb_publishable_-EGzvVtuBnMiolzkcySL-w_PM9KxTNr';

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);