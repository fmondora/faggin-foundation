#!/bin/bash
set -e

# Create the supabase_auth database for GoTrue
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create postgres role if it doesn't exist (GoTrue connects as postgres)
    DO \$\$
    BEGIN
      IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'postgres') THEN
        CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD '$POSTGRES_PASSWORD';
      ELSE
        ALTER ROLE postgres WITH LOGIN SUPERUSER PASSWORD '$POSTGRES_PASSWORD';
      END IF;
    END
    \$\$;

    -- Create supabase_auth database
    SELECT 'CREATE DATABASE supabase_auth OWNER postgres'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'supabase_auth')\gexec
EOSQL

# Set up the auth schema in supabase_auth database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "supabase_auth" <<-EOSQL
    CREATE SCHEMA IF NOT EXISTS auth AUTHORIZATION postgres;
    GRANT ALL ON SCHEMA auth TO postgres;
    GRANT ALL ON SCHEMA auth TO $POSTGRES_USER;
    GRANT ALL ON SCHEMA public TO postgres;
    -- Set default search_path so GoTrue finds auth tables at runtime
    ALTER DATABASE supabase_auth SET search_path TO public, auth;
EOSQL
