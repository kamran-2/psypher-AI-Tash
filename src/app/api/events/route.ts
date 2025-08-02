import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db'
import { events } from '@/lib/schema'
import { asc } from 'drizzle-orm'

export async function GET() {
    try {
        const db = getDatabase()
        const result = await db
            .select()
            .from(events)
            .orderBy(asc(events.eventDate))

        return NextResponse.json({ events: result })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
} 