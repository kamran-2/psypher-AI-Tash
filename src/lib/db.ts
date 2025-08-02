import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Only create the database connection on the server side
let db: ReturnType<typeof drizzle> | null = null

function getDatabase() {
    if (typeof window !== 'undefined') {
        throw new Error('Database client cannot be used in the browser')
    }

    if (!db) {
        // Create postgres connection for Supabase
        const connectionString = process.env.NEXT_PUBLIC_SUPABASE_URL!


        const client = postgres(connectionString, {
            ssl: 'require',
        })

        // Create drizzle instance
        db = drizzle(client, { schema })
    }

    return db
}

// Export types for convenience
export type { Event, NewEvent, UserTier } from './schema'

// Export the database getter
export { getDatabase } 