import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config()

const superbase_key=process.env.SuperBase_Api_Key
const superbase_url=process.env.SuperBase_Url
const supabase = createClient(superbase_url, superbase_key)

export default supabase