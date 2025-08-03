'use client'

import { useUser, useClerk } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { UserTier } from '@/lib/db'

// Event type matching the new schema
type Event = {
  id: string
  title: string
  description: string
  event_date: string // ISO string from API
  image_url: string
  tier: UserTier
}
import EventCard from '@/components/EventCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import TierUpgradeButton from '@/components/TierUpgradeButton'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'

const TIER_ORDER: UserTier[] = ['free', 'silver', 'gold', 'platinum']

export default function EventsPage() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [eventsData, setEventsData] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userTier, setUserTier] = useState<UserTier>('free')
  const [selectedTier, setSelectedTier] = useState<UserTier>('free')

  useEffect(() => {
    if (isLoaded && !user) {
      // Redirect to home if not authenticated (client-side protection)
      router.push('/')
      return
    }

    if (isLoaded && user) {
      // Get user tier from Clerk metadata (prefer unsafeMetadata for custom fields)
      const tier = (user.unsafeMetadata?.tier as UserTier) || 'free'
      setUserTier(tier)
      setSelectedTier(tier)
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
      // Clerk recommends using update({ unsafeMetadata }) for custom fields
      await user.update({ unsafeMetadata: { tier: newTier } })
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

  // Only allow toggling up to the user's tier
  const availableTiers = useMemo(() => {
    const idx = TIER_ORDER.indexOf(userTier)
    return TIER_ORDER.slice(0, idx + 1)
  }, [userTier])

  // Filter events by selected tier
  const filteredEvents = useMemo(() => {
    return eventsData.filter(e => e.tier === selectedTier)
  }, [eventsData, selectedTier])

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
              <button
                onClick={() => signOut()}
                className="ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 text-sm font-medium"
              >
                Log out
              </button>
            </div>
          </div>
        </div>

        {/* Tier Toggle Bar */}
        <div className="mb-8 flex gap-2">
          {availableTiers.map(tier => (
            <button
              key={tier}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-150 ${selectedTier === tier ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}`}
              onClick={() => setSelectedTier(tier)}
            >
              {tier.charAt(0).toUpperCase() + tier.slice(1)}
            </button>
          ))}
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
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No events available</h3>
                <p className="text-gray-600">There are no events available for this tier.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
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