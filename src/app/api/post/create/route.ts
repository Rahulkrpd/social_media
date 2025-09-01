import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/model/Post";
import User from "@/model/User";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
    await connectDB();

    try {
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const userId = formData.get("userId") as string;
        const file = formData.get("file") as File | null;

        let mediaUrl = "";
        let publicId = "";

        if (file) {
            // save to temp
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const tempFilePath = path.join(process.cwd(), "public/temp", file.name);
            await writeFile(tempFilePath, buffer);

            // upload to cloudinary
            const uploadRes = await uploadToCloudinary(tempFilePath);
            mediaUrl = uploadRes.secure_url;
            publicId = uploadRes.public_id;
        }

        // save in DB
        const newPost = await Post.create({
            title,
            description,
            mediaUrl,
            publicId,
            user: userId,
        });

        await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } });

        return NextResponse.json({ message: "Post created", post: newPost });
    } catch (err: unknown) {
        const error = err as Error;
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
