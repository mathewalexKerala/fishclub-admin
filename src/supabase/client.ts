import { createBrowserClient } from '@supabase/ssr';

import { Database } from '@/supabase/types';

export function createClient() {
  return createBrowserClient<Database>(
   'https://wdqpbxfarvugnafbsxgk.supabase.co',
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcXBieGZhcnZ1Z25hZmJzeGdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzNDUzODIsImV4cCI6MjA1MTkyMTM4Mn0.cEodPGzCvBXrB5bijqSGhpCfNskNI2hb_zkixDkSgN8'
  );
}
