ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_seller boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS store_name text,
  ADD COLUMN IF NOT EXISTS store_slug text UNIQUE,
  ADD COLUMN IF NOT EXISTS store_description text,
  ADD COLUMN IF NOT EXISTS store_category text,
  ADD COLUMN IF NOT EXISTS contact_email text,
  ADD COLUMN IF NOT EXISTS contact_phone text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS website_url text,
  ADD COLUMN IF NOT EXISTS seller_onboarded_at timestamptz;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_store_slug_format CHECK (store_slug IS NULL OR store_slug ~ '^[a-z0-9-]{3,40}$'),
  ADD CONSTRAINT profiles_website_url_format CHECK (website_url IS NULL OR website_url ~* '^https?://');
