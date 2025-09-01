import  { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    bio?: string;
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }];
    friendRequests: [{ type: Schema.Types.ObjectId, ref: "FriendRequest" }];
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }];
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }];
}

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        avatar: String,
        bio: String,
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
        friendRequests: [{ type: Schema.Types.ObjectId, ref: "FriendRequest" }],
        posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
        messages: [{ type: Schema.Types.ObjectId, ref: "Message" }]
    },
    { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
