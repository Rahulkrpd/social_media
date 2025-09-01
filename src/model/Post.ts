import { Schema, model, models, Types } from "mongoose";

export interface IPost {
    _id: Types.ObjectId;
    title: string;
    description?: string;
    mediaUrl?: string;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}


const PostSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        mediaUrl: { type: String },   // uploaded to Cloudinary
        user: { type: Schema.Types.ObjectId, ref: "User", required: true }
    },
    { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);
export default Post;