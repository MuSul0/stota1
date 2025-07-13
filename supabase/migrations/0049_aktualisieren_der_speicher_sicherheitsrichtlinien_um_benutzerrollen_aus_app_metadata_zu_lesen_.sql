-- Drop existing policies for storage.objects to recreate them with the correct role check
DROP POLICY IF EXISTS "Admins can upload media." ON storage.objects;
DROP POLICY IF EXISTS "Admins can update media." ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete media." ON storage.objects;

-- Recreate policies with the correct role check (using app_metadata)

-- Allow admins to upload media
CREATE POLICY "Admins can upload media."
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'media' AND (auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text );

-- Allow admins to update media
CREATE POLICY "Admins can update media."
ON storage.objects FOR UPDATE
USING ( bucket_id = 'media' AND (auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text );

-- Allow admins to delete media
CREATE POLICY "Admins can delete media."
ON storage.objects FOR DELETE
USING ( bucket_id = 'media' AND (auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text );