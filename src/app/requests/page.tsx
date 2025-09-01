// app/requests/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import { TopNav } from "@/components/top-nav";

interface User {
    id: number;
    name: string;
    username: string;
    mutualFriends: number;
    avatar: string;
}

export default function RequestsPage() {
    const [incoming, setIncoming] = useState<User[]>([
        { id: 1, name: "Mia Chen", username: "@mia", mutualFriends: 3, avatar: "https://i.pravatar.cc/150?img=47" },
        { id: 2, name: "Jhon Chen", username: "@mia", mutualFriends: 3, avatar: "https://i.pravatar.cc/150?img=47" },
    ]);

    const [sent, setSent] = useState<User[]>([
        { id: 2, name: "Sara Khan", username: "@sara", mutualFriends: 3, avatar: "https://i.pravatar.cc/150?img=32" },
        { id: 3, name: "Sara ", username: "@sara", mutualFriends: 3, avatar: "https://i.pravatar.cc/150?img=32" },
    ]);

    const [suggestions] = useState<User[]>([
        { id: 3, name: "Nina Patel", username: "@nina", mutualFriends: 5, avatar: "https://i.pravatar.cc/150?img=56" },
        { id: 4, name: "Arjun Rao", username: "@arjun", mutualFriends: 2, avatar: "https://i.pravatar.cc/150?img=21" },
        { id: 5, name: "Leo Martins", username: "@leo", mutualFriends: 1, avatar: "https://i.pravatar.cc/150?img=15" },
    ]);

    const acceptRequest = (id: number) => {
        setIncoming((prev) => prev.filter((u) => u.id !== id));
    };

    const declineRequest = (id: number) => {
        setIncoming((prev) => prev.filter((u) => u.id !== id));
    };

    const cancelRequest = (id: number) => {
        setSent((prev) => prev.filter((u) => u.id !== id));
    };

    return (
        <>
            <TopNav />
            <div className="p-6 space-y-6 h-screen">
                <h1 className="text-2xl font-bold">Friend Requests</h1>

                {/* Search */}
                <Input placeholder="Search people" className="max-w-sm" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Incoming Requests */}
                    <Card>
                        <CardContent className="p-4 space-y-4">
                            <h2 className="font-semibold">Incoming ({incoming.length})</h2>
                            {incoming.length === 0 && <p className="text-sm text-muted-foreground">No requests</p>}
                            {incoming.map((user) => (
                                <div key={user.id} className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <Image src={user.avatar} alt={user.name} width={40} height={40} className="rounded-full" />
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {user.username} • {user.mutualFriends} mutual friends
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" onClick={() => acceptRequest(user.id)}>Accept</Button>
                                        <Button size="sm" variant="outline" onClick={() => declineRequest(user.id)}>Decline</Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Sent Requests */}
                    <Card>
                        <CardContent className="p-4 space-y-4">
                            <h2 className="font-semibold">Sent ({sent.length})</h2>
                            {sent.length === 0 && <p className="text-sm text-muted-foreground">No sent requests</p>}
                            {sent.map((user) => (
                                <div key={user.id} className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <Image src={user.avatar} alt={user.name} width={40} height={40} className="rounded-full" />
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {user.username} • {user.mutualFriends} mutual friends
                                            </p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline" onClick={() => cancelRequest(user.id)}>Cancel</Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* People you may know */}
                    <Card>
                        <CardContent className="p-4 space-y-4">
                            <h2 className="font-semibold">People you may know</h2>
                            {suggestions.map((user) => (
                                <div key={user.id} className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <Image src={user.avatar} alt={user.name} width={40} height={40} className="rounded-full" />
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-sm text-muted-foreground">{user.username}</p>
                                        </div>
                                    </div>
                                    <Button size="sm">Add</Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
