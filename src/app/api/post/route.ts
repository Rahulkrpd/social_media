import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/model/Post";

export async function GET() {
    await connectDB();

    try {
        // Fetch all posts and populate the 'user' field
        const posts = await Post.find()
            .sort({ createdAt: -1 }) // newest first
            .populate("user", "name username avatar bio email"); // pick fields you want

        // Send posts with populated user info
        return NextResponse.json(posts);
    } catch (err: unknown) {
        const error = err as Error;
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
