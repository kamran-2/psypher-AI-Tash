# Quick Setup Guide

## 🚀 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 🔐 Clerk Setup

1. Go to [Clerk.dev](https://clerk.dev)
2. Create a new application
3. Copy your keys from the dashboard
4. Add them to `.env.local`

## 🗄️ Supabase Setup

### Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Wait for the project to be ready

### Step 2: Get Your Keys

1. Go to Settings > API in your Supabase dashboard
2. Copy the following:
   - Project URL
   - anon/public key
   - service_role key (keep this secret!)
3. Add them to your `.env.local` file

### Step 3: Create Database Table

1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the entire contents of `supabase-setup.sql`
3. Click "Run" to execute the SQL

**OR** use the seed script:

```bash
npm run db:seed
```

## 🎯 Test Your Setup

1. Start the development server:

```bash
npm run dev
```

2. Visit `http://localhost:3000` (or the port shown)

3. Test the database connection by visiting `/test`

## 🔧 Troubleshooting

### Database Connection Issues

- Verify your Supabase URL and keys are correct
- Ensure the `events` table exists (run the SQL script)
- Check that your environment variables are loaded

### Clerk Issues

- Verify your Clerk keys are correct
- Restart the dev server after adding environment variables

### Common Errors

- `relation "public.events" does not exist` → Run the SQL script in Supabase
- `Invalid API key` → Check your Supabase keys
- `Clerk not configured` → Check your Clerk keys
