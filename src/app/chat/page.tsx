"use client"

import Image from "next/image"

const demoConversations = [
    { id: 1, name: "Alice", lastMessage: "See you tomorrow!", avatar: "https://i.pravatar.cc/100?img=1" },
    { id: 2, name: "Bob", lastMessage: "Typing...", avatar: "https://i.pravatar.cc/100?img=2" },
]

const demoMessages = [
    { from: "Alice", text: "Hey! How are you?", time: "10:30 AM" },
    { from: "me", text: "I’m good, working on the app 🚀", time: "10:32 AM" },
    { from: "Alice", text: "That’s awesome!", time: "10:35 AM" },
]

export default function ChatPage() {
    return (
        <div className="grid grid-cols-[250px_1fr] h-[80vh] border rounded-lg overflow-hidden">
            {/* Sidebar */}
            <div className="border-r p-2 space-y-2">
                {demoConversations.map((c) => (
                    <div key={c.id} className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg cursor-pointer">
                        <Image src={c.avatar} alt={c.name} width={40} height={40} className="rounded-full" />
                        <div>
                            <p className="font-medium">{c.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{c.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Pane */}
            <div className="flex flex-col">
                <div className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {demoMessages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`p-2 rounded-lg max-w-xs ${msg.from === "me" ? "ml-auto bg-primary text-white" : "bg-muted"}`}
                        >
                            {msg.text}
                            <div className="text-xs opacity-70">{msg.time}</div>
                        </div>
                    ))}
                </div>

                {/* Input box */}
                <div className="flex gap-2 border-t p-2">
                    <input className="flex-1 border rounded-lg px-3 py-2" placeholder="Type a message..." />
                    <button className="bg-primary text-white rounded-lg px-4">Send</button>
                </div>
            </div>
        </div>
    )
}
