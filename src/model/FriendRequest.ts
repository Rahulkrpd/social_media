import { Schema, model, models, Types } from "mongoose";

export interface IFriendRequest {
    _id: Types.ObjectId;
    from: Types.ObjectId;
    to: Types.ObjectId;
    status: "pending" | "accepted" | "rejected";
}


const FriendRequestSchema = new Schema(
    {
        from: { type: Schema.Types.ObjectId, ref: "User", required: true },
        to: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending"
        }
    },
    { timestamps: true }
);

const FriendRequest =
    models.FriendRequest || model("FriendRequest", FriendRequestSchema);
export default FriendRequest;