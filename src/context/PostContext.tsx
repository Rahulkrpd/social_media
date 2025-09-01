"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";



export interface Post {
    _id: string,
    title: string;
    description?: string;
    mediaUrl?: string;
    user: {
        name: string,
        username: string
    }
    createdAt: Date;
    updatedAt: Date;
}

interface CreatePostData {
    title: string;
    description: string;
    media?: string;
    mediaType?: "image" | "video";
    tags?: string[];
}

type PostContextType = {
    allPosts: Post[];
    postsByUser: Post[];
    setAllPosts: (posts: Post[]) => void;
    setPostsByUser: (posts: Post[]) => void;
    getPosts: () => Promise<Post[]>;
    getPostsByUser: (userId: string) => Promise<Post[]>;
    createPost: (postData: CreatePostData) => Promise<Post>;
    loading: boolean;
    setLoading: (loading: boolean) => void;
};

const PostContext = createContext<PostContextType | undefined>(undefined);


export function PostProvider({ children }: { children: ReactNode }) {
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [postsByUser, setPostsByUser] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const getPosts = async (): Promise<Post[]> => {
        try {
            setLoading(true);
            const response = await fetch('/api/post');
            if (!response.ok) throw new Error('Failed to fetch posts');
            const posts = await response.json();
            setAllPosts(posts);
            return posts;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getPostsByUser = async (userId: string): Promise<Post[]> => {
        try {
            setLoading(true);
            const response = await fetch(`/api/post/user/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch user posts');
            const userPosts = await response.json();
            setPostsByUser(userPosts);
            return userPosts;
        } catch (error) {
            console.error('Error fetching user posts:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (user) {
            getPosts();
        }
    }, [user]);


    const createPost = async (postData: CreatePostData): Promise<Post> => {
        try {
            setLoading(true);
            const response = await fetch('/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
            if (!response.ok) throw new Error('Failed to create post');
            const newPost = await response.json();

            // Update the posts list with the new post
            setAllPosts(prev => [newPost, ...prev]);
            return newPost;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <PostContext.Provider
            value={{
                allPosts,
                postsByUser,
                setAllPosts,
                setPostsByUser,
                getPosts,
                getPostsByUser,
                createPost,
                loading,
                setLoading
            }}
        >
            {children}
        </PostContext.Provider>
    );
}

// Custom hook
export function usePost() {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error("usePost must be used within PostProvider");
    }
    return context;
}
