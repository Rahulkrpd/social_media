"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, UserPlus } from "lucide-react"; // shadcn uses lucide-react

export function TopNav() {
    const pathname = usePathname();

    const links = [
        { href: "/home", label: "Home", icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" /> },
        { href: "/chat", label: "Chat", icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" /> },
        { href: "/requests", label: "Requests", icon: <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" /> },
    ];

    return (
        <nav className="w-full border-b border-gray-300 bg-base-200">
            <div className="max-w-4xl mx-auto flex justify-center gap-2 sm:gap-4 p-2 sm:p-4">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center justify-center gap-2 flex-1 sm:flex-none px-3 sm:px-5 py-2 rounded-lg text-sm sm:text-base font-medium transition ${pathname === link.href
                                ? "bg-green-600 text-white shadow-md"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
