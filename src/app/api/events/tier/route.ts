import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db'
import { events } from '@/lib/schema'
import { inArray, asc } from 'drizzle-orm'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const tier = searchParams.get('tier')

        if (!tier) {
            return NextResponse.json(
                { error: 'Tier parameter is required' },
                { status: 400 }
            )
        }

        const tierOrder = ['free', 'silver', 'gold', 'platinum']
        const tierIndex = tierOrder.indexOf(tier)
        const availableTiers = tierOrder.slice(0, tierIndex + 1)

        const db = getDatabase()
        const result = await db
            .select()
            .from(events)
            .where(inArray(events.tier, availableTiers))
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