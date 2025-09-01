import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadToCloudinary(localPath: string, folder = "social_app") {
    try {
        const result = await cloudinary.uploader.upload(localPath, {
            folder,
            resource_type: "auto",
        });

        // ✅ Delete local temp file after upload
        fs.unlinkSync(localPath);

        return result; // contains secure_url, public_id, etc.
    } catch (error) {
        // cleanup file if upload fails
        if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
        throw error;
    }
}

export async function deleteFromCloudinary(publicId: string, type: "image" | "video" | "raw" = "image") {
    return cloudinary.uploader.destroy(publicId, { resource_type: type });
}
