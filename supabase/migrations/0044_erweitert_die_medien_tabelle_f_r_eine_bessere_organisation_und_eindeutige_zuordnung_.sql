-- Add columns for better organization
ALTER TABLE public.media
ADD COLUMN IF NOT EXISTS page_context TEXT,
ADD COLUMN IF NOT EXISTS description TEXT;

-- Add a unique constraint to the title to prevent duplicates and allow upserts
-- First, remove duplicate titles if they exist, keeping the most recent one.
DELETE FROM public.media a USING (
  SELECT MIN(ctid) as ctid, title
  FROM public.media 
  GROUP BY title HAVING COUNT(*) > 1
) b
WHERE a.title = b.title 
AND a.ctid <> b.ctid;

-- Now, add the unique constraint
ALTER TABLE public.media
ADD CONSTRAINT media_title_key UNIQUE (title);