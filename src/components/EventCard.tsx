'use client'

import { Event, UserTier } from '@/lib/db'

interface EventCardProps {
    event: Event
    userTier: UserTier
}

const tierOrder: UserTier[] = ['free', 'silver', 'gold', 'platinum']

export default function EventCard({ event, userTier }: EventCardProps) {
    const userTierIndex = tierOrder.indexOf(userTier)
    const eventTierIndex = tierOrder.indexOf(event.tier)
    const canAccess = eventTierIndex <= userTierIndex

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    const getTierBadgeColor = (tier: UserTier): string => {
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

    if (!canAccess) {
        return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-dashed border-gray-300 relative">
                <div className="absolute inset-0 bg-gray-50 bg-opacity-90 flex items-center justify-center">
                    <div className="text-center p-6">
                        <div className="text-4xl mb-4">🔒</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {event.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Upgrade to {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)} to access this event
                        </p>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTierBadgeColor(event.tier)}`}>
                            {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Event Image */}
            <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                {event.image_url ? (
                    <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="text-white text-4xl">🎪</div>
                )}
            </div>

            {/* Event Content */}
            <div className="p-6">
                {/* Title and Tier Badge */}
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 flex-1 mr-3">
                        {event.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTierBadgeColor(event.tier)}`}>
                        {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)}
                    </span>
                </div>

                {/* Date */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        📅 {formatDate(event.event_date)}
                    </p>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed">
                    {event.description}
                </p>

                {/* Action Button */}
                <div className="mt-6">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    )
} 