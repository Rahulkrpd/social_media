import { NextResponse } from "next/server";
import  connectDB  from "@/lib/db";
import Post from "@/model/Post";
import { uploadToCloudinary, deleteFromCloudinary } from "@/utils/cloudinary";
import { writeFile } from "fs/promises";
import path from "path";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    await connectDB();

    try {
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const file = formData.get("file") as File | null;

        const post = await Post.findById(params.id);
        if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

        let mediaUrl = post.mediaUrl;
        let publicId = post.publicId;

        if (file) {
            // if old media exists, remove from cloudinary
            if (publicId) {
                    await deleteFromCloudinary(publicId, "image");
            }

            // save to temp
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const tempFilePath = path.join(process.cwd(), "public/temp", file.name);
            await writeFile(tempFilePath, buffer);

            // upload new file
            const uploadRes = await uploadToCloudinary(tempFilePath);
            mediaUrl = uploadRes.secure_url;
            publicId = uploadRes.public_id;
        }

        // update fields
        post.title = title || post.title;
        post.description = description || post.description;
        post.mediaUrl = mediaUrl;
        post.publicId = publicId;

        await post.save();

        return NextResponse.json({ message: "Post updated", post });
    } catch (err: unknown) {
        const error = err as Error;
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
