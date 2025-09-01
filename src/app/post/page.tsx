"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
    const [posts, setPosts] = useState(
        [
            {
                "id": 101,
                "title": "Morning Vibes",
                "description": "Enjoying my morning coffee while coding!",
                "media": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500",
                "mediaType": "image",
                "tags": [
                    "#coffee",
                    "#coding"
                ],
                "createdAt": "2025-08-20T09:30:00Z"
            },
            {
                "id": 102,
                "title": "My New Project",
                "description": "Just deployed my first Next.js app 🚀",
                "media": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
                "mediaType": "video",
                "tags": [
                    "#nextjs",
                    "#webdev"
                ],
                "createdAt": "2025-08-22T15:10:00Z"
            },
            {
                "id": 103,
                "title": "Evening Walk",
                "description": "Sunset walks hit differently 🌅",
                "media": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500",
                "mediaType": "image",
                "tags": [
                    "#sunset",
                    "#relax"
                ],
                "createdAt": "2025-08-23T18:45:00Z"
            },
            {
                "id": 104,
                "title": "Coding Marathon",
                "description": "Pulled an all-nighter to finish this project 💻☕",
                "media": "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=500",
                "mediaType": "image",
                "tags": [
                    "#hustle",
                    "#developerlife"
                ],
                "createdAt": "2025-08-24T04:10:00Z"
            },
            {
                "id": 105,
                "title": "Workout Mode",
                "description": "Staying healthy even during deadlines 💪",
                "media": "https://images.unsplash.com/photo-1571019613914-85f342c8a22e?w=500",
                "mediaType": "image",
                "tags": [
                    "#fitness",
                    "#balance"
                ],
                "createdAt": "2025-08-25T06:00:00Z"
            },
            {
                "id": 106,
                "title": "Weekend Trip",
                "description": "Short getaway to the mountains 🏔️",
                "media": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500",
                "mediaType": "image",
                "tags": [
                    "#travel",
                    "#nature"
                ],
                "createdAt": "2025-08-26T11:20:00Z"
            },
            {
                "id": 107,
                "title": "Cooking Time",
                "description": "Tried a new pasta recipe 🍝",
                "media": "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500",
                "mediaType": "image",
                "tags": [
                    "#foodie",
                    "#homechef"
                ],
                "createdAt": "2025-08-26T20:00:00Z"
            },
            {
                "id": 108,
                "title": "Late Night Debugging",
                "description": "Why do bugs only appear at 2 AM? 🐛",
                "media": "https://images.unsplash.com/photo-1581091870622-9dbe2c27b2a9?w=500",
                "mediaType": "image",
                "tags": [
                    "#bugfixing",
                    "#devlife"
                ],
                "createdAt": "2025-08-27T02:30:00Z"
            },
            {
                "id": 109,
                "title": "Beach Day",
                "description": "Relaxing by the sea 🌊",
                "media": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
                "mediaType": "image",
                "tags": [
                    "#beachvibes",
                    "#relaxation"
                ],
                "createdAt": "2025-08-27T16:40:00Z"
            },
            {
                "id": 110,
                "title": "Gaming Night",
                "description": "Multiplayer madness with friends 🎮",
                "media": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
                "mediaType": "video",
                "tags": [
                    "#gaming",
                    "#fun"
                ],
                "createdAt": "2025-08-28T21:00:00Z"
            },
            {
                "id": 111,
                "title": "Morning Jog",
                "description": "Running through the park to start the day 🏃‍♂️",
                "media": "https://images.unsplash.com/photo-1526401485004-2fda9f6d2a1d?w=500",
                "mediaType": "image",
                "tags": [
                    "#jogging",
                    "#morningroutine"
                ],
                "createdAt": "2025-08-29T06:15:00Z"
            },
            {
                "id": 112,
                "title": "Book Time",
                "description": "Reading my favorite sci-fi novel 📚",
                "media": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
                "mediaType": "image",
                "tags": [
                    "#reading",
                    "#chill"
                ],
                "createdAt": "2025-08-29T19:30:00Z"
            }
        ]
    );

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    const [newPost, setNewPost] = useState({
        title: "",
        description: "",
        media: "",
        mediaType: "image",
    });

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        media: "",
        mediaType: "image",
    });

    // Create Post
    const handleCreatePost = () => {
        setPosts([
            ...posts,
            {
                id: Date.now(),
                ...newPost,
                tags: ["#new"],
                createdAt: new Date().toISOString(),
            },
        ]);
        setShowForm(false);
        setNewPost({ title: "", description: "", media: "", mediaType: "image" });
    };

    // Open edit modal
    const handleEditClick = (post: any) => {
        setEditId(post.id);
        setFormData({
            title: post.title,
            description: post.description,
            media: post.media,
            mediaType: post.mediaType,
        });
    };

    // Save changes
    const handleSave = () => {
        setPosts((prev) =>
            prev.map((post) =>
                post.id === editId ? { ...post, ...formData } : post
            )
        );
        setEditId(null);
    };

    // Discard changes
    const handleDiscard = () => {
        setEditId(null);
    };

    // Delete Post
    const handleDelete = (id: number) => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
    };

    return (
        <div className="w-full min-h-screen bg-black text-white p-6">
            {/* Header */}
            <div className="w-full flex border-b border-gray-700 justify-between items-center pb-4">
                <Link href="/home" className="border-1px-4 py-2 p-2 bg-purple-600 rounded-lg hover:bg-purple-700">Home</Link>
                <h1 className="text-2xl font-bold text-center flex-1">📢 User Posts</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                    Create Post
                </button>
            </div>

            {/* Post Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-gray-900 rounded-lg p-4 shadow-lg hover:scale-105 transition-transform duration-300"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h2 className="text-lg font-semibold">{post.title}</h2>
                                <p className="text-sm">{post.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEditClick(post)}
                                    className="px-2 py-1 bg-yellow-600 rounded hover:bg-yellow-700 text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="px-2 py-1 bg-red-600 rounded hover:bg-red-700 text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        {post.mediaType === "image" ? (
                            <div className="relative w-full h-48 rounded-lg mb-3 overflow-hidden">
                                <Image
                                    src={post.media}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                        ) : (
                            <video
                                controls
                                src={post.media}
                                className="w-full h-48 object-cover rounded-lg mb-3"
                            />
                        )}
                        <p className="text-xs text-gray-400">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>

            {/* Create Post Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Create New Post</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newPost.title}
                            onChange={(e) =>
                                setNewPost({ ...newPost, title: e.target.value })
                            }
                            className="w-full mb-3 p-2 rounded bg-gray-900 border border-gray-600"
                        />
                        <textarea
                            placeholder="Description"
                            value={newPost.description}
                            onChange={(e) =>
                                setNewPost({ ...newPost, description: e.target.value })
                            }
                            className="w-full mb-3 p-2 rounded bg-gray-900 border border-gray-600"
                        />
                        <input
                            type="text"
                            placeholder="Media URL"
                            value={newPost.media}
                            onChange={(e) =>
                                setNewPost({ ...newPost, media: e.target.value })
                            }
                            className="w-full mb-3 p-2 rounded bg-gray-900 border border-gray-600"
                        />
                        <select
                            value={newPost.mediaType}
                            onChange={(e) =>
                                setNewPost({ ...newPost, mediaType: e.target.value })
                            }
                            className="w-full mb-3 p-2 rounded bg-gray-900 border border-gray-600"
                        >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreatePost}
                                className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Post Modal */}
            {editId && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Edit Post</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            className="w-full mb-3 p-2 rounded bg-gray-900 border border-gray-600"
                        />
                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            className="w-full mb-3 p-2 rounded bg-gray-900 border border-gray-600"
                        />
                        <input
                            type="text"
                            placeholder="Media URL"
                            value={formData.media}
                            onChange={(e) =>
                                setFormData({ ...formData, media: e.target.value })
                            }
                            className="w-full mb-3 p-2 rounded bg-gray-900 border border-gray-600"
                        />
                        <select
                            value={formData.mediaType}
                            onChange={(e) =>
                                setFormData({ ...formData, mediaType: e.target.value })
                            }
                            className="w-full mb-3 p-2 rounded bg-gray-900 border border-gray-600"
                        >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleDiscard}
                                className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
                            >
                                Discard
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
