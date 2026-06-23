import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qzprfgrwbvajkuxcyxvh.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6cHJmZ3J3YnZhamt1eGN5eHZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNTQ0MzUsImV4cCI6MjA5NzYzMDQzNX0.DBWH_uBiOjG2IUCO0MJTabnUbw1KgGEurYXUU9JUyxk";

export const supabase = createClient(supabaseUrl, supabaseKey);