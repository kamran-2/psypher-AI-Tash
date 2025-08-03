import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db'

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
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