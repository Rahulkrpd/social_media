import { NextResponse } from "next/server";
import connectDB  from "@/lib/db";
import Post from "@/model/Post";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    await connectDB();
    try {
        const posts = await Post.find({ user: params.id })
            .populate("user", "name avatar email")
            .sort({ createdAt: -1 });

        return NextResponse.json(posts);
    } catch (err: unknown) {
        const error = err as Error;
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}   
