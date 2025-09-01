"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    const handleProfile = () => {
        router.push('/profile')
    }

    // Get first letter of user's name for the logo
    const getUserInitial = () => {
        if (!user?.name) return 'U';
        return user.name.charAt(0).toUpperCase();
    };

    return (
        <nav className="w-full sticky top-0 z-50 bg-grey-800 backdrop-blur supports-[backdrop-filter]:bg-gray-950 border-b border-gray-200 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center justify-between">
                    {/* Left: Brand + Desktop Nav */}
                    <div className="flex items-center gap-6">
                        <Link href="/home" className="inline-flex items-center gap-2">
                            <span className="text-xl font-bold tracking-tight text-white">
                                LinkUp
                            </span>
                        </Link>
                        <ul className="hidden md:flex items-center gap-4 text-sm text-white">
                            <li>
                                <Link
                                    href="/post"
                                    className="hover:text-gray-900 transition-colors"
                                >
                                    Post
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/chat"
                                    className="hover:text-gray-900 transition-colors"
                                >
                                    Chat
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Center: Search (md+) */}
                    <div className="hidden md:block flex-1 max-w-md">
                        <div className="relative">
                            <input
                                className="w-full rounded-full border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                                placeholder="Search LinkUp"
                            />
                            <svg
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </div>
                    </div>

                    {/* Right: Avatar + Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsMobileOpen((v) => !v)}
                            aria-expanded={isMobileOpen}
                            aria-controls="mobile-menu"
                            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMobileOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                        <div className="hidden md:block">
                            {user && (
                                <button
                                    onClick={handleProfile}
                                    className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center text-white font-semibold text-lg cursor-pointer"
                                    title={`${user.name}'s Profile`}
                                >
                                    {getUserInitial()}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileOpen && (
                    <div id="mobile-menu" role="menu" className="md:hidden pb-4">
                        <div className="pt-2 pb-3 space-y-1">
                            <Link
                                href="/home"
                                onClick={() => setIsMobileOpen(false)}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Home
                            </Link>
                            <Link
                                href="/explore"
                                onClick={() => setIsMobileOpen(false)}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Explore
                            </Link>
                            <Link
                                href="/chat"
                                onClick={() => setIsMobileOpen(false)}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Messages
                            </Link>
                            {user && (
                                <button
                                    onClick={() => {
                                        handleProfile();
                                        setIsMobileOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                                >
                                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                        {getUserInitial()}
                                    </div>
                                    <span>{user.name}&apos;s Profile</span>
                                </button>
                            )}
                            <div className="px-3 pt-2">
                                <input
                                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                                    placeholder="Search LinkUp"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
