'use client'

import { useUser, SignInButton, SignUpButton, useClerk } from '@clerk/nextjs'
import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const { user, isLoaded } = useUser()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Access exclusive events based on your membership tier. From free community events to premium platinum experiences,
            there's something for everyone.
          </p>

          {isLoaded && user ? (
            <Link
              href="/events"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Browse Events
            </Link>
          ) : (
            <div className="space-x-4">
              <SignUpButton mode="modal">
                <button className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                  Get Started
                </button>
              </SignUpButton>
              <SignInButton mode="modal">
                <button className="inline-block bg-gray-200 text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-300 transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Authentication</h3>
            <p className="text-gray-600">
              Sign in securely with Clerk.dev and manage your account with ease.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tier-Based Access</h3>
            <p className="text-gray-600">
              Access events based on your membership tier - Free, Silver, Gold, or Platinum.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Updates</h3>
            <p className="text-gray-600">
              Get instant access to new events and upgrade your tier anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Tier Information */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Membership Tiers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { tier: 'Free', color: 'gray', description: 'Access to basic community events' },
              { tier: 'Silver', color: 'gray', description: 'Enhanced events and early access' },
              { tier: 'Gold', color: 'yellow', description: 'Premium events and exclusive content' },
              { tier: 'Platinum', color: 'purple', description: 'VIP access to all events' }
            ].map(({ tier, color, description }) => (
              <div key={tier} className="text-center p-6 rounded-lg border border-gray-200">
                <div className={`text-2xl font-bold mb-2 ${color === 'gray' ? 'text-gray-700' :
                  color === 'yellow' ? 'text-yellow-600' :
                    'text-purple-600'
                  }`}>
                  {tier}
                </div>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
