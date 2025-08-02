'use client'

import { useState } from 'react'
import { UserTier } from '@/lib/db'

interface TierUpgradeButtonProps {
    currentTier: UserTier
    onUpgrade: (tier: UserTier) => void
}

const tierOrder: UserTier[] = ['free', 'silver', 'gold', 'platinum']

export default function TierUpgradeButton({ currentTier, onUpgrade }: TierUpgradeButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [upgrading, setUpgrading] = useState(false)

    const currentTierIndex = tierOrder.indexOf(currentTier)
    const availableUpgrades = tierOrder.slice(currentTierIndex + 1)

    const handleUpgrade = async (newTier: UserTier) => {
        setUpgrading(true)
        try {
            await onUpgrade(newTier)
            setIsOpen(false)
        } catch (error) {
            console.error('Upgrade failed:', error)
        } finally {
            setUpgrading(false)
        }
    }

    if (availableUpgrades.length === 0) {
        return (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Max Tier
            </span>
        )
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={upgrading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium disabled:opacity-50"
            >
                {upgrading ? 'Upgrading...' : 'Upgrade Tier'}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                    <div className="py-1">
                        {availableUpgrades.map((tier) => (
                            <button
                                key={tier}
                                onClick={() => handleUpgrade(tier)}
                                disabled={upgrading}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                            >
                                Upgrade to {tier.charAt(0).toUpperCase() + tier.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Click outside to close */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    )
} 