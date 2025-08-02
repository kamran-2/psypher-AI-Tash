'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { Event, UserTier } from '@/lib/db'
import EventCard from '@/components/EventCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import TierUpgradeButton from '@/components/TierUpgradeButton'
import { useRouter } from 'next/navigation'

export default function EventsPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [eventsData, setEventsData] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userTier, setUserTier] = useState<UserTier>('free')

  useEffect(() => {
    if (isLoaded && !user) {
      // Redirect to home if not authenticated (client-side protection)
      router.push('/')
      return
    }

    if (isLoaded && user) {
      // Get user tier from Clerk metadata
      const tier = (user.publicMetadata.tier as UserTier) || 'free'
      setUserTier(tier)
      fetchEvents(tier)
    }
  }, [isLoaded, user, router])

  const fetchEvents = async (tier: UserTier) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/events/tier?tier=${tier}`)

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

  const handleTierUpgrade = async (newTier: UserTier) => {
    if (!user) return

    try {
      await user.update({
        publicMetadata: { tier: newTier }
      })
      setUserTier(newTier)
      fetchEvents(newTier)
    } catch (err) {
      console.error('Error upgrading tier:', err)
    }
  }

  if (!isLoaded) {
    return <LoadingSpinner />
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view events</h1>
          <p className="text-gray-600">You need to be authenticated to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Event Showcase
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress}!
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Your tier:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTierBadgeColor(userTier)}`}>
                {userTier.charAt(0).toUpperCase() + userTier.slice(1)}
              </span>
              <TierUpgradeButton currentTier={userTier} onUpgrade={handleTierUpgrade} />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && (
          <>
            {eventsData.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No events available</h3>
                <p className="text-gray-600">There are no events available for your current tier.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsData.map((event) => (
                  <EventCard key={event.id} event={event} userTier={userTier} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function getTierBadgeColor(tier: UserTier): string {
  switch (tier) {
    case 'free':
      return 'bg-gray-100 text-gray-800'
    case 'silver':
      return 'bg-gray-200 text-gray-800'
    case 'gold':
      return 'bg-yellow-100 text-yellow-800'
    case 'platinum':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
} 