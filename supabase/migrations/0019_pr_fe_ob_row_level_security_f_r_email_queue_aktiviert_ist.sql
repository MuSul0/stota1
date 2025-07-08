SELECT relrowsecurity
FROM pg_class
WHERE relname = 'email_queue';