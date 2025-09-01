import { Schema, model, models, Types } from "mongoose";

export interface IMessage {
    _id: Types.ObjectId;
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    message: string;
    time: Date;
}

const MessageSchema = new Schema(
    {
        sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
        receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
        time: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

const Message = models.Message || model("Message", MessageSchema);
export default Message;