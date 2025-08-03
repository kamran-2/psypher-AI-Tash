"use client";

import { useUser, useClerk, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

export default function LayoutHeader() {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <header className="w-full border-b border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight">
                    Tier Event Showcase
                </Link>
                <div className="flex items-center gap-1">
                    {isLoaded && user ? (
                        <>
                            <Link
                                href="/events"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto text-center block sm:inline-block"
                                style={{ minWidth: '120px' }}
                            >
                                <span className="block sm:hidden">Events</span>
                                <span className="hidden sm:inline">View Events</span>
                            </Link>
                            <button
                                onClick={() => setProfileOpen(true)}
                                className="ml-2 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full text-sm font-medium focus:outline-none"
                            >
                                {user.imageUrl ? (
                                    <img src={user.imageUrl} alt="avatar" className="object-cover" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                                ) : (
                                    <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">👤</span>
                                )}
                                <span className="hidden sm:inline">Profile</span>
                            </button>
                            {/* Profile Drawer */}
                            {profileOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 bg-opacity-30 z-40"
                                        onClick={() => setProfileOpen(false)}
                                        aria-label="Close profile drawer"
                                    />
                                    <aside className="fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-lg z-50 flex flex-col p-6 animate-slide-in">
                                        <div className="flex flex-col items-center mt-4">
                                            {user.imageUrl ? (
                                                <img src={user.imageUrl} alt="avatar" className="object-cover mb-4" style={{ width: 80, height: 80, borderRadius: '50%' }} />
                                            ) : (
                                                <span className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-4xl text-gray-600 mb-4">👤</span>
                                            )}
                                            <div className="text-lg font-semibold text-gray-900 mb-1">{user.firstName || user.emailAddresses[0]?.emailAddress}</div>
                                            <div className="text-sm text-gray-500 mb-6">{user.emailAddresses[0]?.emailAddress}</div>
                                            <button
                                                onClick={() => { signOut(); setProfileOpen(false); }}
                                                className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 text-sm font-medium mb-2"
                                            >
                                                Log out
                                            </button>
                                            <button
                                                onClick={() => setProfileOpen(false)}
                                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </aside>
                                    <style>{`
                    @keyframes slide-in {
                      from { transform: translateX(100%); }
                      to { transform: translateX(0); }
                    }
                    .animate-slide-in {
                      animation: slide-in 0.2s cubic-bezier(0.4,0,0.2,1);
                    }
                  `}</style>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <SignInButton mode="modal">
                                <button className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                    Sign In
                                </button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                                    Sign Up
                                </button>
                            </SignUpButton>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
