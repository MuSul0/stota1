CREATE OR REPLACE FUNCTION public.calculate_total_revenue()
RETURNS numeric AS $$
DECLARE
  total numeric;
BEGIN
  SELECT SUM(amount) INTO total FROM invoices WHERE status = 'bezahlt';
  RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql STABLE;