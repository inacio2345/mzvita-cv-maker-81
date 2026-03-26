
-- Enable Row Level Security on tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_cvs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "user_profiles_policy" ON user_profiles;
DROP POLICY IF EXISTS "saved_cvs_policy" ON saved_cvs;

-- User Profiles RLS Policies
CREATE POLICY "user_profiles_select_own" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "user_profiles_insert_own" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "user_profiles_update_own" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "user_profiles_delete_own" ON user_profiles
    FOR DELETE USING (auth.uid() = id);

-- Saved CVs RLS Policies
CREATE POLICY "saved_cvs_select_own" ON saved_cvs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "saved_cvs_insert_own" ON saved_cvs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "saved_cvs_update_own" ON saved_cvs
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "saved_cvs_delete_own" ON saved_cvs
    FOR DELETE USING (auth.uid() = user_id);

-- Secure the increment_downloads function
CREATE OR REPLACE FUNCTION increment_downloads(user_uuid uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE user_profiles 
  SET downloads_realizados = downloads_realizados + 1 
  WHERE id = user_uuid AND id = auth.uid();
$$;

-- Add security functions for validation
CREATE OR REPLACE FUNCTION validate_cv_data(cv_data jsonb)
RETURNS boolean
LANGUAGE plpgsql
AS $$
BEGIN
  -- Basic validation checks
  IF cv_data->>'personalData'->>'fullName' IS NULL OR 
     length(cv_data->>'personalData'->>'fullName') = 0 THEN
    RETURN false;
  END IF;
  
  IF cv_data->>'personalData'->>'email' IS NULL OR 
     cv_data->>'personalData'->>'email' !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RETURN false;
  END IF;
  
  IF cv_data->>'about' IS NOT NULL AND 
     length(cv_data->>'about') > 2000 THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;

-- Add trigger to validate CV data on insert/update
CREATE OR REPLACE FUNCTION validate_cv_trigger()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NOT validate_cv_data(NEW.cv_data) THEN
    RAISE EXCEPTION 'Invalid CV data format or content';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_cv_data_trigger ON saved_cvs;
CREATE TRIGGER validate_cv_data_trigger
  BEFORE INSERT OR UPDATE ON saved_cvs
  FOR EACH ROW EXECUTE FUNCTION validate_cv_trigger();
