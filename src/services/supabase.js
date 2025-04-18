import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jxlxyqmonpgfsfsumyvv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4bHh5cW1vbnBnZnNmc3VteXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MTE1NTUsImV4cCI6MjA2MDQ4NzU1NX0.l8KHelRmrrLG6GRYCFnoxSIG0VMI77lQmR_DZZAApt8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
