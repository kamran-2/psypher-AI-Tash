'use client'

import { useEffect, useState } from 'react'
import { Event } from '@/lib/db'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function TestPage() {
    const [eventsData, setEventsData] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch('/api/events')

            if (!response.ok) {
                throw new Error('Failed to fetch events')
            }

            const data = await response.json()
            setEventsData(data.events || [])
        } catch (err) {
            setError('Failed to fetch events')
            console.error('Error fetching events:', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Database Test Page</h1>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                        <p className="text-red-800">{error}</p>
                    </div>
                )}

                {eventsData.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                        <p className="text-gray-600">Please check your database setup and run the SQL script.</p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">All Events ({eventsData.length})</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {eventsData.map((event) => (
                                <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-semibold text-gray-900 flex-1 mr-3">
                                            {event.title}
                                        </h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.tier === 'free' ? 'bg-gray-100 text-gray-800' :
                                                event.tier === 'silver' ? 'bg-gray-200 text-gray-800' :
                                                    event.tier === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-purple-100 text-purple-800'
                                            }`}>
                                            {event.tier}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        📅 {new Date(event.eventDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-700 text-sm">{event.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 