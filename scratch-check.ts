import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_APP_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, category, sub_category, title')
    .eq('is_sold', false)
    .limit(1000);

  console.log(data);
}
main();
