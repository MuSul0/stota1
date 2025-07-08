SELECT policyname, cmd, permissive
FROM pg_policies
WHERE tablename = 'email_queue';