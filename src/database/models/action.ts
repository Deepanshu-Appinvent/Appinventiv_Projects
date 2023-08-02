import mongoose, { Schema, Document, Types } from "mongoose";

interface Comment {
  commentId: Types.ObjectId;
  content: string;
}

interface Reply {
  replyId: Types.ObjectId;
  content: string;
}

interface ActionType {
  action: "comment" | "like";
  ref: Types.ObjectId;
  content: string;
  comment?: Comment;
  reply?: Reply;
}

export interface ActionRequest extends Document {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  actionType: ActionType;
  createdAt: Date;
}

const commentSchema: Schema = new Schema({
  commentId: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
});

const replySchema: Schema = new Schema({
  replyId: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
});

const actionTypeSchema: Schema = new Schema({
  action: { type: String, enum: ["comment", "like"], required: true },
  ref: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  comment: { type: commentSchema },
  reply: { type: replySchema },
});

const actionRequestSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  actionType: { type: actionTypeSchema, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ActionRequest>(
  "ActionRequest",
  actionRequestSchema
);
