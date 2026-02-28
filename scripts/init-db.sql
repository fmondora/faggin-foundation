-- Create the supabase_auth database for GoTrue
CREATE DATABASE supabase_auth;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE supabase_auth TO faggin;

-- Connect to supabase_auth and create the auth schema
\c supabase_auth;
CREATE SCHEMA IF NOT EXISTS auth;
GRANT ALL ON SCHEMA auth TO faggin;
