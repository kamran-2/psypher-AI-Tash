import type { Config } from 'drizzle-kit'

export default {
    schema: './src/lib/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL!.replace('https://', 'postgresql://postgres:').replace('.supabase.co', '.supabase.co:5432/postgres'),
        ssl: true,
    },
} satisfies Config 