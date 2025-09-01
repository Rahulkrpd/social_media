"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import Image from "next/image";
import { usePost } from "@/context/PostContext";
import { IPost } from "@/model/Post";

const Page = () => {
    const { allPosts, loading } = usePost();

    console.log('All Posts:', allPosts);
    console.log('Loading:', loading);


    return (
        <div className="min-h-screen ">
            <Navbar />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 p-5 h-screen">
                {loading ? (
                    <div className="col-span-full text-center text-white">Loading posts...</div>
                ) : allPosts.length === 0 ? (
                    <div className="col-span-full text-center text-white">No posts found</div>
                ) : (
                    allPosts.map((post: IPost) => (
                    <div
                        key={post._id.toString()}
                        className="bg-gray-900 rounded-lg p-4 shadow-lg hover:scale-105 transition-transform duration-300"
                    >
                        <div className="flex justify-between items-start mb-3 text-white">
                            <div>
                                <h2 className="text-lg font-semibold">{post.title}</h2>
                                <p className="text-sm">{post.description}</p>
                            </div>

                        </div>

                        {post.mediaUrl && (
                            <div className="relative w-full h-48 rounded-lg mb-3 overflow-hidden">
                                <Image
                                    src={post.mediaUrl}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                        )}
                        <p className="text-xs text-gray-400">
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                ))
                )}
            </div>
        </div>
    );
};

export default Page;
