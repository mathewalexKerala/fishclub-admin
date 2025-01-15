import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { Database } from '@/supabase/types';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
 'https://wdqpbxfarvugnafbsxgk.supabase.co',
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcXBieGZhcnZ1Z25hZmJzeGdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzNDUzODIsImV4cCI6MjA1MTkyMTM4Mn0.cEodPGzCvBXrB5bijqSGhpCfNskNI2hb_zkixDkSgN8',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
