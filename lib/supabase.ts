import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = 'https://kjiaqvlasjyjggswljgc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqaWFxdmxhc2p5amdnc3dsamdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzMDUxNDUsImV4cCI6MjA1MDg4MTE0NX0.Ps_xvlOJpFB7iv3JiORwGE_F-_NH0VugS_EB56Zg9PA'

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

