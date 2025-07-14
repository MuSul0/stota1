CREATE OR REPLACE FUNCTION public.get_user_role(user_id_to_check uuid)
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role FROM public.profiles WHERE id = user_id_to_check;
$$;