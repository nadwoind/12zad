import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fxvqfsxpmnwnenzztlel.supabase.co'  
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4dnFmc3hwbW53bmVuenp0bGVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MTY0ODYsImV4cCI6MjA2NDk5MjQ4Nn0.TYKW--AfJzYHsEQgodcA2o2VKUoRvMdKM5KeHm-eZvY' 

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
