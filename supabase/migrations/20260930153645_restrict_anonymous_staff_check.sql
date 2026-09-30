-- Supabase grants new public functions to API roles by default in some projects.
-- Keep the staff-status endpoint available only after authentication.
revoke execute on function public.current_user_is_store_staff() from anon;
