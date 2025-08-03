import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/db'

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

        const { data, error } = await supabase
            .from('events')
            .select('*')
            .in('tier', availableTiers)
            .order('event_date', { ascending: true })

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json(
                { error: 'Failed to fetch events' },
                { status: 500 }
            )
        }

        return NextResponse.json({ events: data })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
} 