-- Create the supabase_auth database for GoTrue
SELECT 'CREATE DATABASE supabase_auth'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'supabase_auth')\gexec

-- Grant permissions on supabase_auth
GRANT ALL PRIVILEGES ON DATABASE supabase_auth TO faggin;
