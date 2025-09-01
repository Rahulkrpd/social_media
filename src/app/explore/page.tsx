"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ExplorePage = () => {
    const [text, setText] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        // Example: send to /chat with query param
        router.push(`/chat?msg=${encodeURIComponent(text)}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Explore</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-md flex gap-2">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type something..."
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Go Chat
                </button>
            </form>

            <button
                onClick={() => router.push("/home")}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
                Go Home
            </button>
        </div>
    );
};

export default ExplorePage;
