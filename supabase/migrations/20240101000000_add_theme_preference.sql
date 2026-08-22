-- 1. Add theme_preference column to profiles
ALTER TABLE public.profiles 
ADD COLUMN theme_preference text DEFAULT 'system';

-- 2. Update existing rows if any
UPDATE public.profiles 
SET theme_preference = 'system' 
WHERE theme_preference IS NULL;
