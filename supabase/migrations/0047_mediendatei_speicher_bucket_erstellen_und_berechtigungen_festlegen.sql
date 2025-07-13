-- Create media bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public media is viewable by everyone." ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload media." ON storage.objects;
DROP POLICY IF EXISTS "Admins can update media." ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete media." ON storage.objects;

-- Allow public read access to the media bucket
CREATE POLICY "Public media is viewable by everyone."
ON storage.objects FOR SELECT
USING ( bucket_id = 'media' );

-- Allow admins to upload media
CREATE POLICY "Admins can upload media."
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'media' AND (auth.jwt() ->> 'role') = 'admin' );

-- Allow admins to update media
CREATE POLICY "Admins can update media."
ON storage.objects FOR UPDATE
USING ( bucket_id = 'media' AND (auth.jwt() ->> 'role') = 'admin' );

-- Allow admins to delete media
CREATE POLICY "Admins can delete media."
ON storage.objects FOR DELETE
USING ( bucket_id = 'media' AND (auth.jwt() ->> 'role') = 'admin' );